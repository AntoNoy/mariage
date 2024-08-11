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
import { AccessToken } from "../services/auth.definitions";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  private usersRepo = this.daoService.getRepository(Users);
  private guestsRepo = this.daoService.getRepository(Guests);
  constructor(
    private readonly daoService: EntitiesService,
    private jwtService: JwtService,
    private configService: ConfigService<{
      JWT_SECRET: string,
      JWT_TIME: number
    }, true>
  ) {
  }

  private userBasic(user, omitMore = []) {
    return omit(user, [
      "password",
      "createTime",
      "updateTime",
      ...omitMore,
    ]);
  }

  async initUser(uuid: string): Promise<AccessToken | Partial<Users>> {
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

  async validUser(userPayload: Users): Promise<AccessToken> {
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
    const hashedPassword = await argon2.hash(userPayload.password, {
      type: argon2.argon2id,
    })
    await this.daoService.manager
      .createQueryBuilder(Users, "user")
      .update()
      .where("id = :userId", { userId: user.id })
      .set({
        username: userPayload.username,
        email: userPayload.email,
        phone: userPayload.phone,
        password: hashedPassword
      })
      .execute();

    await Promise.all(
      userPayload.guests.map((guest) => this.guestsRepo.update({ id: guest.id }, {
        firstname: guest.firstname || null,
        lastname: guest.lastname || null,
        birthyear: guest.birthyear || null,
        reception: guest.reception,
        dinner: guest.dinner,
        foodAllergies: guest.foodAllergies || null,
      }))
    );

    return this.createTokens(userPayload);
  }

  async createTokens(user: Users): Promise<AccessToken> {
    return {
      accessToken: await this.jwtService.signAsync(
        {
          userId: user.id,
          username: user.username,
          withDinner: user.withDinner,
          role: user.role,
          repliedAt: user.repliedAt
        },
        {
          secret: this.configService.get<string>("JWT_SECRET"),
          expiresIn: this.configService.get("JWT_TIME"),
        }
      ),
    };
  }

  async login({ username, password}: { username: string, password: string }){
   const user = await this.daoService.getRepository(Users).findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException("Utilisateur introuvable");
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      throw new BadRequestException("Mot de passe incorrect");
    }

    return this.createTokens(user);
  }

  async loginWithUuid(uuid: string) {
    const user = await this.daoService.getRepository(Users).findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException("Utilisateur introuvable");
    }
    return this.createTokens(user);
  }
}
