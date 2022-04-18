import * as yup from "yup";
import { CardProps } from "../domain/entities/card";
import { UserProps } from "../domain/entities/user";

// Generate Card Validation

const generateCardValidation = async (data: CardProps) => {
  const schema = yup.object().shape({
    title: yup.string().min(3).required(),
    number_of_cards: yup.number().min(1).required(),
    unit_price: yup.number().min(0.5).required(),
    min: yup.number().required(),
    max: yup.number().positive().min(1).required(),
    amount_random_number: yup.number().min(1).required(),
    client_id: yup.string().uuid().required(),
    date_sort: yup.date().required(),
  });

  await schema.validate(data);
};

// Update Card Validation
type UpdateStatusCardRequestProps = {
  new_status: string;
};

const updateCardValidation = async (data: UpdateStatusCardRequestProps) => {
  const schema = yup.object().shape({
    new_status: yup.string().min(3).required(),
    value_sorted: yup.number(),
  });

  await schema.validate(data);
};

// User Register Validation
const userLoginValidation = async (data: UserProps) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
  });

  return schema.validate(data);
};

// User Register Validation
const userRegisterValidation = async (data: UserProps) => {
  const schema = yup.object().shape({
    user_name: yup.string().min(3).max(250).required(),
    enterprise_name: yup.string().min(3).max(250).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
    permissions: yup.array().required(),
    roles: yup.array().required(),
  });

  return schema.validate(data);
};

// Exporting All validations
export {
  generateCardValidation,
  updateCardValidation,
  userLoginValidation,
  userRegisterValidation,
};
