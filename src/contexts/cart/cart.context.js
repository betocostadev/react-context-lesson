import { createContext } from 'react'

// In this case we will put it inside and object to have the current state and also the
// function that we will use to update the value
// the function will be defined inside a component's local state
const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {}
})

export default CartContext