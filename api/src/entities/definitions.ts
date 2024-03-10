import { Guests, TypeGuest } from "./schemas/guests";

export interface UsersCreate {
  userName: string;
  email: string;
  password: string;
}

export type GuestCreate = Partial<Guests> & {
  type: TypeGuest;
  withDinner: boolean;
};

export enum RolesEnum {
  ADMIN = "admin",
  GUEST = "guest",
}
