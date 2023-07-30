import { User } from "./User";

export interface Article {
  readonly id: string;
  title: string;
  content: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}
