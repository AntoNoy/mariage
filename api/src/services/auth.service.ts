import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EntitiesService } from "src/entities/entities.service";
import { Users } from "src/entities/schemas/users";
import { ConfigService } from "@nestjs/config";
import { omit } from "lodash";
import { Guests } from "src/entities/schemas/guests";

@Injectable()
export class AuthService {
  private usersRepo = this.daoService.getRepository(Users);
  private guestsRepo = this.daoService.getRepository(Guests);
  constructor(
    private readonly daoService: EntitiesService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    // this.initDataTest();
  }

  // async initDataTest() {
  //   console.log("initDataTest");
  //   const users = [
  //     { email: "test@aa.a", password: "azerty", userName: "aa" },
  //     { email: "test@aa.a", password: "azerty", userName: "bb" },
  //     { email: "test@aa.a", password: "azerty", userName: "cc" },
  //   ];

  //   await Promise.all(users.map((user) => this.addUser(user)));
  // }

  private userBasic(user, omitMore?: string[]) {
    return omit(user, [
      "password",
      "withDinner",
      "role",
      "createTime",
      "updateTime",
      ...omitMore,
    ]);
  }

  async initUser(uuid: string) {
    const user = await this.daoService
      .getRepository(Users)
      .findOne({ where: { uuid }, relations: ["guests"] });

    if (!user) {
      throw new NotFoundException("Cette clé n'est pas valide");
    }

    if (user.isFull) {
      return this.createTokens(user);
    }

    return this.userBasic(user);
  }

  async validUser(userPayload: Users) {
    const user = await this.usersRepo.findOne({
      where: { id: userPayload.id, uuid: userPayload.uuid },
      relations: ["guests"],
    });

    if (!user) {
      throw new BadRequestException("Pas cool, lache l'affaire");
    }

    if (
      user.guests.length !== userPayload.guests.length ||
      user.withDinner !== userPayload.withDinner
    ) {
      throw new BadRequestException("N'abuses pas");
    }

    if (user.role !== userPayload.role) {
      throw new BadRequestException("T'as tjr pas compris ?");
    }

    await this.daoService.manager
      .createQueryBuilder(Users, "user")
      .update()
      .where("user.id = :userId", { userId: user.id })
      .set(this.userBasic({ ...user, ...userPayload }, ["guests"]))
      .execute();

    await Promise.all(
      user.guests.map((guest) => this.guestsRepo.update(guest.id, guest))
    );

    return this.createTokens(user);
  }

  async createTokens(user: Users) {
    return {
      accessToken: await this.jwtService.signAsync(
        {
          userId: user.id,
          username: user.username,
          withDinner: user.withDinner,
          role: user.role,
        },
        {
          secret: this.configService.get<string>("JWT_SECRET"),
          expiresIn: this.configService.get("JWT_TIME"),
        }
      ),
    };
  }
}
