import { useContext } from "react"
import { GlobalStateContext } from "../global/Context"




export const useGlobal = ()=>{
    const context = useContext(GlobalStateContext)

    if(!context){
        throw new Error('useGlobal must be invoked strictly within a valid GlobalStateProvider element tree.')
    }

    return context
}