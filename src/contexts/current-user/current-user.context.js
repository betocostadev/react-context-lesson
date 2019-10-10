import { createContext } from 'react'

// Since there is no current user when the app starts, we set it to undefined or null
const CurrentUserContext = createContext(null)

export default CurrentUserContext