import { Entity } from "../../core/domain/Entity";

export type UserProps = {
  id?: string;
  user_name?: string;
  email: string;
  password: string;
  enterprise_name?: string;
  roles?: string[];
  permissions?: string[];
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  static create(Props: UserProps) {
    const user = new User(Props);

    const result = { id: user.id, ...user.props };

    return result;
  }
}
