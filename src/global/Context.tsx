import { createContext, useState, useEffect, type ReactNode, type FC } from "react"


interface GlobalStateContextType {
  providerToken: string | null
  loading: boolean
  loginProvider: (token: string) => void
  logoutProvider: () => void
}


export const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined)

interface GlobalStateProviderProps {
  children: ReactNode
}


export const GlobalStateProvider:FC<GlobalStateProviderProps> = ({ children })=>{
    const [providerToken, setProviderToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)



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


    const loginProvider = (token:string)=>{
        localStorage.setItem('@MyDeliveryProvider:token', token)
        setProviderToken(token)
    }


    const logoutProvider = ()=>{
        localStorage.removeItem('@MyDeliveryProvider:token')
        setProviderToken(null)
    }



    return(
        <GlobalStateContext.Provider value={{ providerToken, loading, loginProvider, logoutProvider }}>
            {children}
        </GlobalStateContext.Provider>
    )
}