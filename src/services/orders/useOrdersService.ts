import { useReducer } from "react";
import { ordersReducer, initialState } from "./orders.reducer";
import { OrderForm, OrderStatus } from "@/model/OrderForm";
import * as OrdersService from './orders.api'


export function useOrdersService() {

    const [state, dispatch] = useReducer(ordersReducer, initialState)

    async function getOrders(){
        dispatch({ type:'pending', payload: true })

        try {
            const res = await OrdersService.get()
            dispatch({ type: 'ordersGetSuccess', payload: res.items})
        } catch (error) {
            dispatch({ type:'error', payload: 'Orders not loaded' })
        }
    }

    async function deleteOrders(id: string){
        dispatch({ type:'pending', payload: true })

        try {
            await OrdersService.remove(id)
            dispatch({ type: 'orderDeleteSuccess', payload: id})
        } catch (error) {
            dispatch({ type:'error', payload: 'Orders not deleted' })
        }
    }

    async function addOrder(order: OrderForm){
        dispatch({ type:'pending', payload: true })

        try {
            return await OrdersService.create(order)
        } catch (error) {
            dispatch({ type:'error', payload: 'Orders not added' })
            return error
        }
    }

    async function toggleOrderStatus(id: string, status: OrderStatus){
        dispatch({ type:'pending', payload: true })

        try {
            const res = await OrdersService.toggleStatus(id, status)
            dispatch({ type: 'orderToggleStatusSuccess', payload: res })
        } catch (error) {
            dispatch({ type:'error', payload: 'Orders not loaded' })
        }
    }

    return {
        actions:{
            getOrders,
            deleteOrders,
            addOrder,
            toggleOrderStatus
        },
        state
    }
    
}