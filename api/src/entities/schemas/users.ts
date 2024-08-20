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
import { RolesEnum } from "../definitions";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  id: number;

  @Column({ name: "uuid", type: "varchar", unique:true })
  @Generated("uuid")
  uuid: string;

  @Column({ name: "username", type: "varchar", length: 255 })
  username: string;

  @Column({ name: "email", type: "varchar", length: 255, nullable: true })
  email: string;

  @Column({ name: "phone", type: "varchar", length: 255, nullable: true })
  phone: string;

  @Column({ name: "password", type: "varchar", length: 255, default: '$argon2id$v=19$m=16,t=2,p=1$dXAwQzl3Q2lpaG5TMEhmRg$5xwXRYPPTtzzJNKE4N3mZg' })
  password: string;

  @Column({ name: "role", type: "enum", enum: RolesEnum, default: RolesEnum.GUEST })
  role: RolesEnum;

  @Column({name: 'replied_at', type: 'timestamp', nullable: true, default: null})
  repliedAt: Date|null;

  @Column({ type: "boolean", name: "with_dinner", default: false })
  withDinner: boolean;

  @Column({ type: "int", name: "camping_count", default: 0 })
  campingCount: number;

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
