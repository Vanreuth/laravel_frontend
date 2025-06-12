
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContaxtProvider from "./context/ShopContext.jsx";
import CartContextProvider from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext'; 


createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
  <ShopContaxtProvider>
    <CartContextProvider>
      <AuthProvider>
    <App />
    </AuthProvider>
    </CartContextProvider>
  </ShopContaxtProvider>
</BrowserRouter>
)
