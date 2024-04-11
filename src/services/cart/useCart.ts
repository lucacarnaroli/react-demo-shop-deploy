import { CartItem } from "@/model/CartItem";
import { Product } from "@/model/Product";
import { create } from "zustand";

export interface CartState {
    list: CartItem[]
    addToCart: (product: Product) => void
    deleteToCart: (productId: string) => void
    clearToCart: () => void
    increaseQty: (productId: string) => void
    decreaseToCart: (productId: string) => void
}

export const useCart = create<CartState>((set, get) => ({
    list: [],
    addToCart: (product: Product) => {
        const found = get().list.find(item => item.product.id === product.id)
        
        if(found){
            get().increaseQty(product.id)
        }else{
            const item = { product, qty: 1 }
            set(state => ({ list: [...state.list, item] }))
        }
        
    },
    deleteToCart: (productId: string) => {
        set(state => ({ list: state.list.filter(p => p.product.id !== productId)}))
    },
    clearToCart: () => { set({ list: [] })},
    increaseQty: (productId: string) => {
        const found = get().list.find(item => item.product.id === productId)
        if(found){
            found.qty++
            set(state => ({ 
                list: state.list.map(p => {
                    return p.product.id === found.product.id ? found : p
                })
            }))
        }
        
    },
    decreaseToCart: (productId: string) => {
        const found = get().list.find(item => item.product.id === productId)
        if(found?.qty === 1){
            get().deleteToCart(productId)
        }
        if(found && found.qty > 0){
            found.qty--
            set(state => ({ 
                list: state.list.map(p => {
                    return p.product.id === found.product.id ? found : p
                })
            }))
        }
    }
})) 