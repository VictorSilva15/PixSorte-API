import { UserProps } from "../../domain/entities/user";

export interface UserRepository {
  login(props: UserProps): Promise<any>;
  register(props: UserProps): Promise<any>;
  session(email: string): Promise<any>;
  refreshToken(email: string): Promise<any>;
  createRefreshToken(email: string): Promise<string>;
  checkRefreshTokenIsValid(
    email: string,
    refreshToken: string
  ): Promise<boolean>;
  invalidateRefreshToken(email: string, refreshToken: string): Promise<void>;
}
