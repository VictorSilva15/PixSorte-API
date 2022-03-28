import { Card } from "../../domain/entities/card";

export interface CardRepository {
  save(student: Card): Promise<any>;
  read(): Promise<any>;
  delete(id: string): Promise<any>;
}
