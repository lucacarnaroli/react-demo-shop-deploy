import { selectCartIsEmpty, selectCartList, selectTotalCartCost, useCart } from "@/services/cart"
import { NavLink } from "react-router-dom"

export function CartPage() {
    const list = useCart(selectCartList)
    const totalCost = useCart(selectTotalCartCost)
    const increaseQty = useCart(state => state.increaseQty)
    const decreaseQty = useCart(state => state.decreaseToCart)
    const isEmpty = useCart(selectCartIsEmpty)
    return (
        <div className="px-5 lg:px-0">
            <h1 className="text-3xl">Cart</h1>

            <ul>
                {
                    list.map(p => (
                        <li key={p.product.id} className="flex justify-between flex-col sm:flex-row">
                            <div className="flex">
                                <div className="my-5">
                                    <img src={p.product.tmb} alt={p.product.name} className="w-16 h-14 sm:h-16 rounded-full"/>
                                </div>
                                <div className="flex flex-col justify-center ml-3">
                                    <div className="text-xl">{ p.product.name }</div>
                                    <p className="text-xs">{ p.product.description }</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <div className="flex items-center gap-3">
                                    <button className="btn outline" onClick={() => decreaseQty(p.product.id)}>-</button>
                                    <span className="text-nowrap">Quantity: {p.qty}</span>
                                    <button className="btn outline" onClick={() => increaseQty(p.product.id)}>+</button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span>€{ p.qty * p.product.cost }</span>
                                </div>
                            </div>
                        </li>
                        
                    ))
                    
                }
            </ul>

            <hr className="my-4"/>

            <div className="text-center sm:text-right text-xl font-semibold">
                Total: €{totalCost}
            </div>
            {
                !isEmpty && 
                <div className="flex justify-center my-14 ">
                    <NavLink to={"/checkout"} className="btn success lg">Confirm order</NavLink>
                </div>
            }
            
        </div>
    )
}