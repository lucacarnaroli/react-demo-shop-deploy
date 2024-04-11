import { CartState } from "./useCart";

export const selectCartList = (state: CartState) => state.list
export const selectCartIsEmpty = (state: CartState) => state.list.length === 0
export const selectTotalCartCost = (state: CartState) => state.list.reduce((acc, p) => { return acc + (p.qty * p.product.cost) },0)
export const selectTotalCartItems = (state: CartState) => state.list.reduce((acc, p) => { return acc + p.qty },0)