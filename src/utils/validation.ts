import * as yup from "yup";
import { CardProps } from "../domain/entities/card";

// Generate Validation

const generateValidation = async (data: CardProps) => {
  const schema = yup.object().shape({
    title: yup.string().min(3).required(),
    number_of_cards: yup.number().min(1).required(),
    unit_price: yup.number().min(0.5).required(),
    min: yup.number().required(),
    max: yup.number().min(1).required(),
    amount_random_number: yup.number().min(1).required(),
    client_id: yup.string().uuid().required(),
    date_sort: yup.date().required(),
  });

  await schema.validate(data);
};

// Update Validation
type UpdateStatusCardRequestProps = {
  new_status: string;
};

const updateValidation = async (data: UpdateStatusCardRequestProps) => {
  const schema = yup.object().shape({
    new_status: yup.string().min(3).required(),
  });

  await schema.validate(data);
};

export { generateValidation, updateValidation };
