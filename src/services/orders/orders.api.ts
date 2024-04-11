import { Order } from "@/model/Order";
import { OrderStatus } from "@/model/OrderForm";
import { pb } from "@/pocketbase";

export function get(){
    return pb.collection('orders').getList<Order>()
}

export function remove(id: string){
    return pb.collection('orders').delete(id)
}

export function create(order: Partial<Order>){
    return pb.collection('orders').create<Order>(order)
}

export function toggleStatus(id: string, status: OrderStatus){
    return pb.collection('orders').update<Order>(id, {status})
}