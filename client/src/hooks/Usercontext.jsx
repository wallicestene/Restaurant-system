/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useReducer } from "react";
import userReducer, { initialState } from "./userReducer";

const userContext = createContext()

export const UserDataContext = ({children}) => {
    return (
        <userContext.Provider value={useReducer(userReducer, initialState)}>
            {children}
        </userContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
    return  useContext(userContext)
}