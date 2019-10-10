import React, { createContext, useState, useEffect } from 'react'
import {
  addItemToCart, removeItemFromCart, filterItemFromCart, getCartItemsCount, getCartTotal
} from './cart.utils'

// Same as our CartContext from the Context folder, but now, we are adding more to also
// keep the cart items.
export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0
})

// Now, to send it to be used as our provider
const CartProvider = ({ children }) => {
  // We write our toggleHidden here - Notice that we will pass it as the provider.
  // Our context will receive the hidden value and the hidden function with the corrent values.
  const [ hidden, setHidden ] = useState(true)
  const [ cartItems, setCartItems ] = useState([])
  const [ cartItemsCount, setCartItemsCount ] = useState(0)
  const [ cartTotal, setCartTotal ] = useState(0)

  const toggleHidden = () => setHidden(!hidden)
  const addItem = item => setCartItems(addItemToCart(cartItems, item))
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item))
  const clearItemFromCart = item => setCartItems(filterItemFromCart(cartItems, item))
  // We need to use the effect to make sure that when the other functions run, our effect
  // fires the function to update the cart icon number.
  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems))
    setCartTotal(getCartTotal(cartItems))
  }, [cartItems, cartTotal])

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        cartItemsCount,
        clearItemFromCart,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider