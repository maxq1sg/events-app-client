
import Role from "../../roles/roles.model";

export interface RegisterUser {
  first_name: string;
  email: string;
  password: string;
  last_name: string;
  add_data?: {
    is_married: boolean;
    address: string;
  };
  role?: Role;
}
export interface LoginUser {
  email: string;
  password: string;
}
export interface TokenPayload {
  email: string;
  role: Role;
  id: number;
}
