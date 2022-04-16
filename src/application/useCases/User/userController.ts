import { UserProps } from "../../../domain/entities/user";
import { UserRepository } from "../../repositories/IuserRepository";

import { supabase } from "../../../utils/connect_db";

export class UserController implements UserRepository {
  async login(props: UserProps): Promise<any> {
    // Implement the logic of user login

    const result = await supabase.auth.signIn({
      email: props.email,
      password: props.password,
    });

    return result;
  }

  async register(props: UserProps): Promise<any> {
    // Implement the logic of user register

    const result = supabase.auth.api.createUser({
      email: props.email,
      password: props.password,
      email_confirm: true,
      user_metadata: {
        name: props.user_name,
        enterprise_name: props.enterprise_name,
      },
    });

    return result;
  }

  async actualSession(access_token: string): Promise<any> {
    // getting actual session by using access_token

    const result = await supabase.auth.api.getUser(access_token);

    return result;
  }

  async signOut(access_token: string): Promise<any> {
    const result = await supabase.auth.api.signOut(access_token);

    return result;
  }

  async refreshToken(access_token: string): Promise<any> {
    const result = await supabase.auth.setAuth(access_token);

    return result;
  }
}
