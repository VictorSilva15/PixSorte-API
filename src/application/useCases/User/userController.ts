import { UserProps } from "../../../domain/entities/user";
import { UserRepository } from "../../repositories/IuserRepository";
import { v4 as uuid } from "uuid";
import { supabase } from "../../../utils/config";

export class UserController implements UserRepository {
  async login(props: UserProps): Promise<any> {
    // Implement the logic of user login

    const { email } = props;

    const result = await supabase.from("users").select("*").eq("email", email);

    return result;
  }

  async register(props: UserProps): Promise<any> {
    // Implement the logic of user register

    const { email } = props;

    const alreadyExist = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (alreadyExist.data?.length !== 0) {
      return { error: { message: "User already exists" } };
    }
    const data = {
      id: props.id,
      email: props.email,
      password: props.password,
      metadata: {
        "user_name:": props.user_name,
        enterprise_name: props.enterprise_name,
      },
      permissions: props.permissions,
      roles: props.roles,
    };

    const result = await supabase.from("users").insert([data]);

    return result;
  }

  async session(email: string): Promise<any> {
    // getting actual session by using access_token

    const result = await supabase.from("users").select("*").eq("email", email);

    return result;
  }

  async refreshToken(email: string): Promise<any> {
    const result = await supabase.from("users").select("*").eq("email", email);

    return result;
  }

  async createRefreshToken(email: string): Promise<string> {
    const currentUserTokens = await supabase
      .from("users")
      .select("tokens")
      .match({ email });
    const data = currentUserTokens.data ?? [];
    const refreshToken = uuid();

    const newTokens = [...data, refreshToken];
    supabase.from("users").update({ tokens: newTokens }).match({ email });
    return refreshToken;
  }

  async checkRefreshTokenIsValid(
    email: string,
    refreshToken: string
  ): Promise<boolean> {
    const storedRefreshTokens = await supabase
      .from("users")
      .select("tokens")
      .match({ email });
    const data = storedRefreshTokens.data ?? [];
    return data.some((token: string) => token === refreshToken);
  }

  async invalidateRefreshToken(
    email: string,
    refreshToken: string
  ): Promise<void> {
    const storedRefreshTokens = await supabase
      .from("users")
      .select("tokens")
      .match({ email });
    const data = storedRefreshTokens.data ?? [];

    const newTokens = data.filter((token) => token !== refreshToken);
    supabase.from("users").update({ tokens: newTokens }).match({ email });
  }
}
