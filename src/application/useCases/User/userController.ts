import { UserProps } from "../../../domain/entities/user";
import { UserRepository } from "../../repositories/IuserRepository";

import { supabase } from "../../../utils/connect_db";

export class UserController implements UserRepository {
    async login(props: UserProps): Promise<any> {
        // Implement the logic of user login

        const result = await supabase.auth.signIn({
            email: props.email,
            password: props.password
        })

        return result;
    }

    async register(props: UserProps): Promise<any> {
        // Implement the logic of user register

        const result = supabase.auth.api.createUser({
            email: props.email,
            password: props.password,
            email_confirm: true,
            data: {
                name: props.user_name,
                enterprise_name: props.enterprise_name
            }
        })

        return result;
    }
}