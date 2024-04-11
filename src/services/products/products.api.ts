import { Product } from "@/model/Product";
import { pb } from "@/pocketbase";

export function get(){
    return pb.collection('products').getList<Product>()
}

export function remove(id: string){
    return pb.collection('products').delete(id)
}

export function create(product: Partial<Product>){
    return pb.collection('products').create<Product>(product)
}

export function edit(product: Partial<Product>){
    return pb.collection('products').update<Product>(product.id!, product)
}



