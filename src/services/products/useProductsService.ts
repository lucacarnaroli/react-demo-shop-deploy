import { useReducer } from "react"
import * as ProductsApi from "@/services/products/products.api"
import { productsReducer, initialState } from "./products.reducer"
import { Product } from "@/model/Product"

export function useProductsService(){
    
    const [state, dispatch] = useReducer(productsReducer, initialState)

    async function getProducts(){
        dispatch({ type: 'pending', payload: true})
        try {
            const res = await ProductsApi.get()
            dispatch({ type: 'productsGetSuccess', payload: res.items })
        } catch (error) {
            dispatch({ type: 'error', payload: 'Producrs not loaded'})
        }
    }

    async function createProducts(product: Partial<Product>) {
        dispatch({ type: 'pending', payload: true})
        try {
            const res = await ProductsApi.create(product)
            dispatch({ type: 'productAddSuccess', payload: res })
        } catch (error) {
            dispatch({ type: 'error', payload: 'Products not added' })
        }
    }
    
    async function editProducts(product: Partial<Product>) {
        dispatch({ type: 'pending', payload: true})
        try {
            const res = await ProductsApi.edit(product)
            dispatch({ type: 'productEditSuccess', payload: res })
        } catch (error) {
            dispatch({ type: 'error', payload: 'Producrs not edited' })
        }
    }
    
    async function deleteProducts(id: string){
        dispatch({ type: 'pending', payload: true})
        try {
            await ProductsApi.remove(id)
            dispatch({ type: 'productDeleteSuccess', payload: id })
        } catch (error) {
            dispatch({ type: 'error', payload: 'Producrs not deleted' })
        }
    }

    function setActiveItem(product: Product | {}){
        dispatch({ type: 'productSetActive', payload: product })
    }
    
    function resetActiveItem(){
        dispatch({ type: 'productSetActive', payload: null })
    }

    return { 
        actions: {
            getProducts,
            createProducts,
            editProducts,
            deleteProducts,
            setActiveItem,
            resetActiveItem
        },
        state, 
    }
}