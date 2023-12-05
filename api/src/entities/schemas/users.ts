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
  username: string;

  @Column({ name: "email", type: "varchar", length: 255, nullable: true })
  email: string;

  @Column({ name: "phone", type: "varchar", length: 255, nullable: true })
  phone: string;

  @Column({ name: "password", type: "varchar", length: 255, nullable: true })
  password: string;

  @Column({ name: "role", type: "enum", enum: Roles, default: Roles.GUEST })
  role: Roles;

  @Column({ type: "boolean", name: "with_dinner", default: false })
  withDinner: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updated_at: Date;

  @OneToMany(() => Guests, (guest) => guest.user)
  guests: Guests[];

  get isFull() {
    return this.username && this.email && this.password && this.phone;
  }
}
