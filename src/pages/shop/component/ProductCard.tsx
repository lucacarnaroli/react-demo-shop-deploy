import { Product } from "@/model/Product"

interface ProductCardProps {
    product: Partial<Product>
    title: string
    onAddToCart: (product: Partial<Product>) => void
}


export function ProductCard(props: ProductCardProps) {
    const { product } = props
    
    return (
        <div key={product.id} className="group relative bg-white rounded-md">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                { product.img && <img src={product.img} alt="" className="h-64 w-full object-cover object-center lg:h-full lg:w-full"/> }
            </div>
            <div className='p-3'>
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-base text-gray-700">
                            <span>{product.name}</span>
                        </h3>
                    </div>
                    <p className="text-base font-medium text-gray-900">€{product.cost}</p>
                </div>
                <div className='pt-1'>
                    <p className='text-black text-xs'>{product.description}</p>
                </div>
            </div>
            <button className="btn accent text-white w-full text-center font-bold p-3" onClick={() => props.onAddToCart(product)}>
                Add to cart
            </button>
        </div>
    )
}