import axios from "axios";
import { axiosInstance } from "../axios";

export enum TypeGuest {
  ADULT = "adult",
  CHILD = "child",
}

export function translateGuestType(type: TypeGuest) {
  switch (type) {
    case TypeGuest.ADULT:
      return "Adulte";
    case TypeGuest.CHILD:
      return "Enfant";
  }
}

export interface Guests {
  id: number;
  firstname: string | null;
  type: TypeGuest;
  lastname: string | null;
  birthyear: number | null;
  reception: boolean;
  dinner: boolean;
}

export function getGestsApi() {
  return axiosInstance.get("/users/:id/guests").then((res) => res.data);
}

export function setGestsApi(payload: Guests[]): Promise<Guests[]> {
  return axiosInstance
    .post<Guests[]>("/users/:id/guests")
    .then((res) => res.data);
}

export function updateGestsApi(
  payload: any & { guests: Guests[] }
): Promise<Guests[]> {
  return axiosInstance.patch<Guests[]>("/guests", payload).then((res) => res.data);
}

export function getAllGests() {
  return axiosInstance.get("/guests/all").then((res) => res.data);
}
