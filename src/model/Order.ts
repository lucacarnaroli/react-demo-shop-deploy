import { CartItem } from "./CartItem";
import { OrderStatus, OrderUser } from "./OrderForm";

export interface Order {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  order: CartItem[]
  status: OrderStatus;
  total: number;
  updated: string;
  user: OrderUser;
}
