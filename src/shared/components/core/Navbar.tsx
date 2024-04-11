import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png'
import { CartPanel, IfLogged } from "@/shared/";
import { selectTotalCartItems, selectCartIsEmpty, useCart, useCartPanel } from "@/services/cart";
import { useAuth } from "@/services/auth";



export function NavBar () {

    const isCartPanelOpened = useCartPanel(state => state.open)
    const toggleCartPanel = useCartPanel(state => state.toggle)
    const totalCartItem = useCart(selectTotalCartItems)
    const cartIsEmpty = useCart(selectCartIsEmpty)
    const logout = useAuth(state => state.logout)
    const toLogin = useNavigate()

    const isActive = (obj: {isActive:boolean}) => {
        return obj.isActive ? 
            'underline decoration-2 decoration-sky-100 underline-offset-4 hover:text-sky-200' :
            'no-underline hover:text-sky-200'
    }

    function logoutHandler(){
        logout()
        toLogin('/login')
    }

    return (
        <>
            <div className="fixed z-10 top-0 left-0 right-0">
                <div className="flex items-center justify-between h-20 bg-cyan-400 text-white p-3">
                    {/*Logo*/}
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="" className="w-16" />
                        <NavLink to="shop" className={isActive}>Shop</NavLink>
                    </div>

                    {/* Cart Panel*/}
                    {isCartPanelOpened && <CartPanel/>}

                    {/*Cart Button Badge */}
                    <div>
                        <button className="btn accent" onClick={toggleCartPanel} disabled={cartIsEmpty}>
                            <span className="text-lg">Cart: { totalCartItem }</span>
                        </button>
                    </div>

                </div>


                {/*Login / CMS / Logout buttons*/}
                <div className="fixed bottom-2 right-2 text-white p-5 ">
                    
                    <NavLink to="cms" className='btn accent lg'>cms</NavLink>
                    <IfLogged else={
                        <NavLink to="login" className="btn accent lg">login</NavLink>
                    }>
                        <button className="btn primary lg" onClick={logoutHandler} >Logout</button>
                    </IfLogged>
                     
                </div>
            </div>
        </>
    )
}