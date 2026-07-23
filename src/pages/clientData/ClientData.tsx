import { type FC, useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdFeed } from "react-icons/md"
import axios from 'axios'
import { Container } from './styled'
import { BASE_URL } from '../../constants/url'
import Header from "../../components/Header"
import type { Order, User } from '../../types/types'
import { useGlobal } from '../../hooks/useGlobal'
import { ProviderRoutes } from '../../routes/paths'



const ClientData:FC = ()=>{
    const navigate = useNavigate()
    const { providerToken } = useGlobal()
    const userId = localStorage.getItem('userId')
    const [user, setUser] = useState<User | null>(null)
    const [orders, setOrders] = useState<Order[]>([])
    const [isUiLoading, setIsUiLoading] = useState<boolean>(true)
    const [isMutating, setIsMutating] = useState<boolean>(false)

    
    // 🛡️ Memoized authorization headers to safeguard dependency cycles
    const requestConfig = useMemo(() => ({
        headers: { Authorization: providerToken || '' }
    }), [providerToken])


    const fetchClientWorkspace = useCallback(async()=>{
        if(!userId){
            console.error("Missing valid target client identification identity.")
            navigate(ProviderRoutes.ORDERS)
            return
        }

        try{
            const [profileRes, historyRes] = await Promise.all([
                axios.get<User>(`${BASE_URL}/users/profile/${userId}`, requestConfig),
                axios.get<Order[]>(`${BASE_URL}/orders/user/${userId}`, requestConfig)
            ]);

            setUser(profileRes.data)
            setOrders(historyRes.data)
        }catch(e:any){
            console.error(e?.response?.data?.message || e?.response?.data || e)
        }finally{
            setIsUiLoading(false)
        }
    }, [userId, requestConfig, navigate])



    useEffect(() => {
        fetchClientWorkspace()
    }, [fetchClientWorkspace])


    const handleUpdateOrderStatus = async(orderId:string, targetState:'finish' | 'return')=>{
        if(isMutating) return

        const endpointPath = targetState === 'finish'
        ? `${BASE_URL}/orders/${orderId}/finish`
        : `${BASE_URL}/orders/${orderId}/revert`

        try{
            setIsMutating(true)
            await axios.patch(endpointPath, {}, requestConfig)

            const refreshOrders = await axios.get<Order[]>(`${BASE_URL}/orders/user/${userId}`, requestConfig)
            setOrders(refreshOrders.data)
        }catch(e:any){
            console.error(e?.response?.data?.message || e?.response?.data || e)
        }finally{
            setIsMutating(false)
        }
    }


    if (isUiLoading) {
        return <div style={{ textAlign: 'center', marginTop: '20vh' }}>Retrieving the customer's registration details...</div>;
    }



    return(
        <>
            <Header
                rightIcon={<div />}
                leftIcon={
                <MdFeed 
                    className="header-icon" 
                    onClick={() => navigate(ProviderRoutes.ORDERS)}
                    style={{ cursor: 'pointer' }}
                />
                }
            />        
            
            <Container>    
                <h1 style={{textAlign:'center'}}>User Profile</h1>            
                <hr style={{ width: '100%', marginBottom: '15px', backgroundColor: '#e2e8f0', border: 'none', height: '1px' }} />
                
                {user && (
                <>
                    <div className="user-section">
                    <div>
                        <strong>{user.username}</strong> <br />
                        <span style={{ color: '#64748b' }}>{user.email}</span>
                    </div>
                    </div>

                    <div className="address-section">
                    <div>
                        <strong>Address:</strong> <br />
                        {user.street}, Nº {user.number}
                        {user.complement && ` (${user.complement})`} <br />
                        {user.neighbourhood}, {user.city} - {user.state}
                    </div>
                    </div>
                </>
                )}

                <div className="addressAndName">
                <div className="rest-name"></div>
                <div></div>
                </div>

                <div className='sticky-title'>
                    <div id="history" className="order-history">Active orders from {user?.username}</div>
                    <hr style={{ width: '100%', marginBottom: '15px', backgroundColor: '#e2e8f0', border: 'none', height: '1px' }} />
                </div>
                
                {orders.length === 0 && (
                <div style={{ color: '#64748b', padding: '1rem 0' }}>This customer doesn't have active orders.</div>
                )}

                <div className="card-container">
                {orders.map(order => (
                    <div className="card" key={order.id}>
                        <div className="card-content">
                            <div className="rest-name">
                            {order.product} — R$ {Number(order.price).toFixed(2)}
                            </div>
                            <b>Order place on:</b> {order.moment} <br/>
                            <b>Quantity:</b> {order.quantity}<br/>
                            <b>Total:</b> R$ {Number(order.total).toFixed(2)}<br/>
                            <b>Status:</b> {order.state === 'FINISHED' ? 'Completed' : 'Pending'} <br />
                            
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            {order.state === 'REQUESTED' ? (
                                <button 
                                disabled={isMutating}
                                onClick={() => handleUpdateOrderStatus(order.id, 'finish')}
                                >
                                {isMutating ? 'Atualizando...' : 'Complete Order'}
                                </button>
                            ) : (
                                <button 
                                disabled={isMutating}
                                onClick={() => handleUpdateOrderStatus(order.id, 'return')}
                                style={{ backgroundColor: '#475569' }} // Darker slate override for reversing actions
                                >
                                {isMutating ? 'Atualizando...' : 'Back to Pending'}
                                </button>
                            )}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </Container>
        </>
    )
}


export default ClientData