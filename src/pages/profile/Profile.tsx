import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobal } from "../../hooks/useGlobal"
import axios from "axios"
import { BASE_URL } from "../../constants/url"
import { MdEdit } from "react-icons/md"
import { AiOutlineLogout } from "react-icons/ai"
import { FaListAlt } from "react-icons/fa";
import Header from "../../components/Header"
import { ProviderRoutes } from "../../routes/paths"
import { Container } from "./styled"
import { formatPhoneNumber } from "../../utils/inputsAndKeys"
import type { Restaurant } from "../../types/types"




const Profile = ()=>{
    const navigate = useNavigate()
    const { logoutProvider, providerToken } = useGlobal()
    const [user, setUser] = useState<Restaurant | null>(null)




    const getProfile = ()=>{
        axios.get(`${BASE_URL}/restaurants/profile`, {
            headers: { Authorization: providerToken }
        }).then(res => setUser(res.data))
        .catch(e => console.error('Failed to load restaurant: ', e))
    }


    useEffect(()=>{
        getProfile()
    }, [navigate, getProfile])


    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logoutProvider();
            navigate(ProviderRoutes.LOGIN);
        }
    }


    return(
        <>
            <Header
                leftIcon={ <FaListAlt className="header-icon" onClick={() => navigate(ProviderRoutes.ORDERS)} /> }
                rightIcon={ <AiOutlineLogout className="header-icon" onClick={handleLogout} /> }
            />
            <Container>
                <h1>Restaurant Data</h1>
                <hr style={{ width: '100%', marginBottom: '15px', backgroundColor: 'lightgray', border: 'none', height: '1px' }} />

                <div className="user-section">
                    <div>
                        <span className="properties">Name:</span> {user?.name} <br />
                        <span className="properties">Email:</span> {user?.email} <br />
                        <span className="properties">Phone:</span> {user?.phone}
                    </div>
                    <MdEdit className="icon" onClick={() => navigate('/edit-profile')} />
                </div>
                <div className="address-section">
                    <div style={{ width: '100%' }}>
                        <div className="registered-address">Registered address:</div>
                        <div style={{ maxWidth: '90%' }}>
                            <span className="properties">Local:</span> {user?.address}
                        </div>
                    </div>
                    <MdEdit 
                        className="icon" 
                        onClick={() => navigate('/user-address', { state: { mode: 'update' } })}
                    />
                </div>    
            </Container>
        </>
    )    
}


export default Profile