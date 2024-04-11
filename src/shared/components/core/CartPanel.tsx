import { selectCartList, selectTotalCartCost, useCart, useCartPanel } from "@/services/cart";
import { useNavigate } from "react-router-dom";

export function CartPanel(){

    const navigate = useNavigate()
    const closeCartPanel = useCartPanel(s => s.closeOverlay)
    const list = useCart(selectCartList)
    const totalPrice = useCart(selectTotalCartCost)
    
    function goToCart() {
        navigate('cart')
        closeCartPanel()
    }

    return (
        <div className="fixed bg-cyan-800 right-4 top-24 p-3 rounded-md w-96">
            <ul className="flex flex-col gap-3">
                {
                    list.map( p => {
                        return (
                            <li className="flex justify-between items-center border-b border-slate-500 pb-3" key={p.product.id}>
                                <div>{ p.product.name }</div>
                                <div className="flex gap-3">
                                    <span>({p.qty} x €{p.product.cost})</span>
                                    <span>€{p.qty * p.product.cost }</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="flex justify-end pt-3 font-bold text-lg">
                <span>Total: €{ totalPrice }</span>
            </div>
            {
                list.length>0 && 
                <div className="flex justify-center py-2">
                    <button className="btn primary" onClick={goToCart}>Go to cart</button>
                </div>
            }
            
        </div>
    )
}