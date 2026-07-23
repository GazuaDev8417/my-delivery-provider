import { createContext, useState, useEffect, type ReactNode, type FC } from "react"
import axios from "axios"
import { BASE_URL } from "../constants/url"
import type { Restaurant } from "../types/types"



interface GlobalStateContextType {
  providerToken: string | null
  loading: boolean
  loginProvider: (token: string) => void
  logoutProvider: () => void
  user: Restaurant | null  
  getProfile: () => void
}


export const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined)

interface GlobalStateProviderProps {
  children: ReactNode
}


export const GlobalStateProvider:FC<GlobalStateProviderProps> = ({ children })=>{
    const [providerToken, setProviderToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<Restaurant | null>(null)



    useEffect(()=>{
        const initializeAuth = ()=>{
            try{
                const savedToken = localStorage.getItem('@MyDeliveryProvider:token')
                if(savedToken){
                    setProviderToken(savedToken)
                }
            }catch(e){
                console.error('Error recovering provider authentication stream:', e)
            }finally{
                setLoading(false)
            }
        }

        initializeAuth()
    }, [])


    const getProfile = ()=>{
        axios.get(`${BASE_URL}/restaurants/profile`, {
            headers: { Authorization: providerToken }
        }).then(res => setUser(res.data))
        .catch(e => console.error('Failed to load restaurant: ', e))
    }


    const loginProvider = (token:string)=>{
        localStorage.setItem('@MyDeliveryProvider:token', token)
        setProviderToken(token)
    }


    const logoutProvider = ()=>{
        localStorage.removeItem('@MyDeliveryProvider:token')
        setProviderToken(null)
    }



    return(
        <GlobalStateContext.Provider value={{ providerToken, loading, loginProvider, logoutProvider, getProfile, user }}>
            {children}
        </GlobalStateContext.Provider>
    )
}