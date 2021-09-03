import { RoleType } from "../../middleware/RoleGuard";

export interface RegisterUser {
  first_name: string;
  email: string;
  password: string;
  last_name: string;
  add_data: {
    is_married: boolean;
    address: string;
  };
  role?: RoleType;
}
export interface LoginUser {
  email: string;
  password: string;
}
