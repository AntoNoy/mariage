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
  menu:string
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
  return axiosInstance
    .patch<Guests[]>("/guests", payload)
    .then((res) => res.data);
}

export function getAllGests() {
  return axiosInstance.get("/guests/all").then((res) => res.data);
}

export function getUserRepliedAt(): Promise<boolean> {
  return axiosInstance.get("/users/alreadyReplied").then((res) => res.data);
}

export function getUserCampingCount(): Promise<number> {
  return axiosInstance.get("/users/camping").then((res) => res.data);
}

export function patchUserCampingCount(count:number): Promise<void> {
  return axiosInstance.patch(`/users/camping/${count}`).then((res) => res.data);
}