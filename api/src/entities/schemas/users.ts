import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Guests } from "./guests";
import { Roles } from "../definitions";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  id: number;

  @Column({ name: "uuid", type: "varchar" })
  @Generated("uuid")
  uuid: string;

  @Column({ name: "username", type: "varchar", length: 255 })
  userName: string;

  @Column({ name: "email", type: "varchar", length: 255, nullable: true })
  email: string;

  @Column({ name: "phone", type: "varchar", length: 255, nullable: true })
  phone: string;

  @Column({ name: "password", type: "varchar", length: 255, nullable: true })
  password: string;

  @Column({ name: "role", type: "enum", enum: Roles, default: Roles.GUEST })
  role: Roles;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updated_at: Date;

  @OneToMany(() => Guests, (guest) => guest.user)
  guest: Guests[];

  get isFull() {
    return this.userName && this.email && this.password && this.phone;
  }
}
