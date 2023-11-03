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
export const useUserContext = () => {
    return  useContext(userContext)
}