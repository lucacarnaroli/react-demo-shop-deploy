import { CartItem } from "./CartItem"

export type OrderStatus = 'pending' | 'done'

export interface OrderUser {
    name: string,
    email: string
}

export interface OrderForm {
    user: OrderUser,
    order: CartItem[],
    status: OrderStatus,
    total: number
}