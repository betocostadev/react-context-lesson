// File to store our collections object
import { createContext } from 'react'

import SHOP_DATA from './shop.data'

// This will be the initial value of our context
const CollectionsContext = createContext(SHOP_DATA)

export default CollectionsContext