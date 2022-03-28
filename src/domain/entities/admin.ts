import { Entity } from "../../core/domain/Entity";

export type AdminProps = {
  full_name?: string;
  email: string;
  password: string;
};

export class Admin extends Entity<AdminProps> {
  // private constructor isn't instantiated from external
  private constructor(props: AdminProps) {
    super(props);
  }

  // Static because the method need to be called without instantiate the class
  static create(props: AdminProps) {
    const admin = new Admin(props);

    return admin;
  }
}
