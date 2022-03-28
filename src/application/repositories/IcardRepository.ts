import { Card } from "../../domain/entities/card";

export interface CardRepository {
  generate(student: Card): Promise<any>;
  read(): Promise<any>;
  delete(id: string): Promise<any>;
}
