import { useProductsService } from "@/services/products"
import { ServerError, Spinner } from "@/shared/"

import { useEffect } from "react"
import { CmsProductsList } from "./components/CmsProductsList"
import { CmsProductForm } from "./components/CmsProductForm"

export function CmsProductPage() {

    const {state, actions } = useProductsService()
    
    useEffect(() => {
        actions.getProducts()
    }, [])

    return (
        <div>
            { state.pending && <Spinner />}
            { state.error && <div><ServerError message={state.error}/></div>}
            
            <CmsProductForm 
                activeItem={state.activeItem}
                onCLose={actions.resetActiveItem}
                createItem={actions.createProducts}
                editItem={actions.editProducts}
            />
        
            <CmsProductsList 
                items={state.products} 
                activeItem={state.activeItem} 
                onEditItem={actions.setActiveItem} 
                onDeleteItem={actions.deleteProducts} 
            />

            <button 
                className="btn accent mt-8" 
                onClick={() => actions.setActiveItem({})}
            >
                Add new
            </button>
         </div>
    )
}