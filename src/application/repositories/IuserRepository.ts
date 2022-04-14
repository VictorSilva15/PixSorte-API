import { UserProps } from "../../domain/entities/user";

export interface UserRepository {
  login(props: UserProps): Promise<any>;
  register(props: UserProps): Promise<any>;
  actualSession(access_token: string): Promise<any>;
  signOut(access_token: string): Promise<any>;
}
