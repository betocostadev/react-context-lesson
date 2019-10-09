import { createContext } from 'react'

// Since there is no current user when the app starts, we set it to undefined
const CurrentUserContext = createContext(undefined)

export default CurrentUserContext