import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { NavBar, PrivateRoute } from '@/shared/'
import { ShopPage, CartPage, CheckoutPage, ThanksPage, LoginPage, CmsPage, CmsProductPage, CmsOrderPage } from "./pages"

function App() {
  
  return (
    <BrowserRouter>
      <NavBar />
      <div className="page">

          <Routes>
            <Route path="shop" element={<ShopPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="thanks" element={<ThanksPage />} />
            <Route path="login" element={<LoginPage />} />

            <Route path="cms" element={ <PrivateRoute><CmsPage /></PrivateRoute> }>
              <Route path="products" element={<CmsProductPage />} />
              <Route path="orders" element={<CmsOrderPage />} />
              <Route index element={<Navigate to='products' />} />
            </Route>

            <Route path="*" element={<Navigate to={'shop'}/>}/>
          </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App


