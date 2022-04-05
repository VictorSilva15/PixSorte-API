import { Entity } from "../../core/domain/Entity";

export type UserProps = {
    user_name?: string;
    email: string;
    password: string;
    enterprise_name?: string;
}

export class User extends Entity<UserProps> {

    private constructor(props: UserProps) {
        super(props)
    }

    static create(Props: UserProps) {
        const user = new User(Props);

        const result = { user_id: user.id, ...user.props };

        return result;
    }
}