import { Tprd } from "./prd";
import { Tuser } from "./user";

export type Tcmt = {
  _id?: string;
  userId: string;
  productId: string;
  content: string;
  createdAt?: Date;
  user?: Tuser;
  product?:Tprd;
  slug?: string;
};