import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {NextUIProvider} from '@nextui-org/react'

import App from './App.jsx'
import './../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TokenContextProvider from './Context/TokenContext.jsx'
import ProductContextProvider from './Context/RelatedProductContext.jsx'
import CategoryContextProvider from './Context/CategoryContext.jsx'
import CartContextProvider from './Context/Cartcontext.jsx'
import WishListProvider from './Context/WishListContext.jsx'

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <CartContextProvider>
  <WishListProvider>
  <TokenContextProvider>
  <ProductContextProvider>
  <CategoryContextProvider>
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </StrictMode>
  </QueryClientProvider>
  </CategoryContextProvider>
  </ProductContextProvider>
  </TokenContextProvider>
  </WishListProvider>
  </CartContextProvider>
)
