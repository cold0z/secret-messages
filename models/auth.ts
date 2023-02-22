import { User } from "./user";

export interface Locals {
  user: User;
  refreshed?: boolean;
  expires_in: number;

}
