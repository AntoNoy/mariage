import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Users } from "./schemas/users";
import { DataSource } from "typeorm";
import { Guests } from "./schemas/guests";
import * as argon2 from "argon2";
import { GuestCreate, UsersCreate } from "./definitions";

@Injectable()
export class EntitiesService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async createUser(payload: UsersCreate, guests: GuestCreate[]) {
    const hashedPassword = await argon2.hash(payload.password, {
      type: argon2.argon2id,
    });
    const user = await this.dataSource.manager.save(Users, {
      ...payload,
      password: hashedPassword,
    });
    await this.dataSource.manager.save(
      Guests,
      guests.map((guest) => ({
        ...guest,
        userId: user.id,
        firstname: guest.firstname ? guest.firstname : user.userName,
      }))
    );
  }

  async addGuestsToUser(userId: number, guests: GuestCreate[]) {
    await this.dataSource.manager.insert(
      Guests,
      guests.map((guest) => ({ ...guest, userId }))
    );
  }
}
