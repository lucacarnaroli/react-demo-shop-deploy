import { Order } from "@/model/Order";
import { OrdersActions } from "./orders.actions";

type OrdersState = {
    orders: Order[]
    pending: boolean
    error: string | null
}

export const initialState: OrdersState = {
    orders: [],
    pending: false,
    error: null
}

export function ordersReducer(state: OrdersState, action: OrdersActions) {
    switch (action.type) {
        case 'ordersGetSuccess':
            return { ...state, orders: action.payload, pending: false, error: null }
        case 'orderDeleteSuccess':
            return { ...state, orders: state.orders.filter(order => order.id !== action.payload), pending: false, error: null }
        case 'orderToggleStatusSuccess':
            return { 
                ...state, 
                orders: state.orders.map(order => 
                    order.id === action.payload.id ? 
                    action.payload :
                    order
                ),     
                pending: false, 
                error: null}
        case 'error':
            return { ...state, pending: false, error: action.payload}
        case 'pending':
            return { ...state, pending: true, error: null }
    }

    return state
}