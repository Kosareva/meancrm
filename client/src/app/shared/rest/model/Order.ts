import {OrderPosition} from "./OrderPosition";

export interface Order {
  date?: Date;
  order?: number;
  list: OrderPosition[];
  user?: string;
  _id?: string;
}
