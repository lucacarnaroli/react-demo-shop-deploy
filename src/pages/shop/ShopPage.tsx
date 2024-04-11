import { ProductCard } from './component/ProductCard';
import { ServerError, Spinner } from '@/shared/';
import { useCart, useCartPanel } from '@/services/cart';
import { useProductsService } from '@/services/products';
import { useEffect } from 'react';



export function ShopPage(){

    const openCartPanel = useCartPanel(s => s.openOverlay)
    const addToCart = useCart(s => s.addToCart)
    const { actions, state } = useProductsService()

    useEffect(()=>{
        actions.getProducts()
    }, [])

    return (
        <>
            { state.pending && <Spinner/> }
            { state.error && <ServerError/> }
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {state.products.map((product) => (
                        <ProductCard key={product.id} product={product} title={product.name} onAddToCart={() => {openCartPanel(), addToCart(product)}} />
                    ))}
                </div>
            </div>
        </>
    )
}