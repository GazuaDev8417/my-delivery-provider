import { useEffect, useState, useMemo, type FC } from "react"
import { useNavigate } from "react-router-dom"
import { IoMdHome } from "react-icons/io";
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import Header from "../../components/Header"
import { useGlobal } from "../../hooks/useGlobal"
import { ProviderRoutes } from "../../routes/paths"
import type { Order, GroupedProducts } from "../../types/types"
import { Container } from "./styled"




const Orders:FC = ()=>{
    const navigate = useNavigate()
    const { providerToken, getProfile, user } = useGlobal()
    const [orders, setOrders] = useState<Order[]>([])
    const [openState, setOpenState] = useState<string | null>(null)
    const [isUiLoading, setIsUiLoading] = useState<boolean>(true)



    const requestConfig = useMemo(()=>({
        headers: { Authorization: providerToken || '' }
    }), [providerToken])


    const fetchDashboardData = async()=>{
        try{
            setIsUiLoading(true)

            getProfile()
            
            const ordersRes = await axios.get<Order[]>(`${BASE_URL}/orders/all`, requestConfig)
            setOrders(ordersRes.data)

            if(ordersRes.data.length > 0 && !openState){
                setOpenState(ordersRes.data[0].state)
            }
        }catch(e:any){
            console.error(e?.response?.data?.message || e?.response?.data || e)
        }finally{
            setIsUiLoading(false)
        }
    }


    useEffect(()=>{
        fetchDashboardData()
    }, [requestConfig])


    const handleRemoveOrder = async(order:Order)=>{
        const confirmDelete = window.confirm(`Are you sure you want to remove ${order.product} from order's list?`)
        if(!confirmDelete) return

        try{
            await axios.delete(`${BASE_URL}/orders/${order.id}`, requestConfig)
            await fetchDashboardData()
        }catch(e:any){
            console.error(e?.response?.data?.message || e?.response?.data || e)
        }
    }


    const groupedOrders = useMemo(()=>{
        const grouped = orders.reduce((acc, order)=>{
            if(!acc[order.state]){
                acc[order.state] = {
                    state: order.state,
                    items: [],
                    total: 0
                }
            }
            acc[order.state].items.push(order)
            acc[order.state].total += Number(order.price) * Number(order.quantity)
            return acc
        }, {} as Record<string, GroupedProducts>)

        return Object.values(grouped)
    }, [orders])


    const activeGroup = useMemo(()=>{
        return groupedOrders.find(group => group.state === openState) || null
    }, [groupedOrders, openState])

    if(isUiLoading){
        return <div style={{ textAlign: 'center', marginTop: '20vh' }}>Updataing orders dashboard...</div>
    }




    return(
        <>
            <Header
                rightIcon={
                <IoMdHome 
                    className="header-icon" 
                    onClick={() => navigate(ProviderRoutes.HOME)} 
                    style={{ cursor: 'pointer' }}
                />
                }
                leftIcon={<div />}
            />

            <Container>
                <h1>{user?.name || 'Loading Place...'}</h1>
                <hr style={{ width: '100%', marginBottom: '15px', background: 'lightgray', border: 'none', height: '1px' }} />
                
                <div style={{textAlign:'center'}}>
                    <div id="history" className="order-history">Orders List</div> <br />
                    <small>By clicking on Pending or Completed, you can view the corresponding orders.</small>
                </div>

                <div className="categories-bar">
                    {groupedOrders.map(group => (
                        <h3
                        title={group.state === 'REQUESTED' ? "Click to see the pending orders" : "Click to see the completed orders"}
                        key={group.state}
                        onClick={() => setOpenState(group.state)}
                        style={{
                            color: openState === group.state ? "red" : "black",
                            cursor: 'pointer',
                            margin: '0 15px'
                        }}>
                        {group.state === 'REQUESTED' ? 'Pending' : 'Completed'}
                        </h3>
                    ))}
                </div>
                <hr style={{ width: '100%', marginBottom: '15px', background: 'lightgray', border: 'none', height: '1px' }} />

                <div className="card-container">
                    {activeGroup ? (
                        <>
                            <h3 className="total-title">Total R$ {activeGroup.total.toFixed(2)}</h3>
                            {activeGroup.items.map(order=>(
                                <div className="card" key={order.id}>
                                    <div className="card-content">
                                        <div className="rest-name">{order.product}</div>
                                        R$ {Number(order.price).toFixed(2)} <br />
                                        <b>Order placed on:</b> {order.moment} <br />
                                        <b>Quantity:</b> {order.quantity} <br />
                                        <b>Total:</b> {Number(order.total).toFixed(2)} <br />
                                        <b>Address:</b> {order.address} <br />
                                        <b>Status:</b> {order.state === 'REQUESTED' ? 'To delivery' : 'Completed'} <br />

                                        {order.state === 'FINISHED' && order.paymentmethod && (
                                            <><b>Payment method:</b> {order.paymentmethod}</>
                                        )}
                                    </div>
                                    <div className="btn-container">
                                        <button
                                        onClick={() => {
                                            localStorage.setItem('userId', order.client);
                                            navigate(ProviderRoutes.CLIENT_DATA);
                                        }}
                                        className="check-client-btn"
                                        >
                                        See customer
                                        </button>
                                        
                                        {order.state === 'FINISHED' && (
                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemoveOrder(order)}
                                        >
                                            Remove
                                        </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        orders.length === 0 && <div>No orders registered</div>
                    )}
                </div>
            </Container>
        </>
    )


}


export default Orders