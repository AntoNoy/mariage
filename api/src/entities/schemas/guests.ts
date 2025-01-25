import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./users";

export enum TypeGuest {
  ADULT = "adult",
  CHILD = "child",
  BABY = "baby",
}

export enum MenuEnum{
  POISSON= "poisson",
  VIANDE= "viande",
  ENFANT= "enfant",
  AUCUN= "aucun"
}

@Entity("guests")
export class Guests {
  @PrimaryGeneratedColumn({ name: "id", type: "int" })
  id: number;

  @Column({ name: "firstname", type: "varchar", length: 255, nullable: true })
  firstname: string | null;

  @Column({ name: "lastname", type: "varchar", length: 255, nullable: true })
  lastname: string | null;

  @Column({ name: "age", type: "int", nullable: true })
  age: number | null;

  @Column({
    name: "type",
    type: "enum",
    enum: TypeGuest,
    default: TypeGuest.ADULT,
  })
  type: TypeGuest;

  @Column({ type: "boolean", name: "reception", default: false })
  reception: boolean | null;

  @Column({ type: "boolean", name: "dinner", default: false })
  dinner: boolean | null;

  @Column({
    name: "food_allergies",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  foodAllergies: string[];

  @Column('enum', {
    enum: MenuEnum,
    nullable: true
  })
  menu: MenuEnum

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updated_at: Date;

  @Column({ name: "user_id", type: "int" })
  userId: number;

  @ManyToOne(() => Users, (users) => users.guests)
  @JoinColumn({ name: "user_id" })
  user: Users[];
}
