import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobal } from "../../hooks/useGlobal"
import { MdEdit } from "react-icons/md"
import { AiOutlineLogout } from "react-icons/ai"
import { FaListAlt } from "react-icons/fa";
import Header from "../../components/Header"
import { ProviderRoutes } from "../../routes/paths"
import { Container } from "./styled"
import { formatPhoneNumber } from "../../utils/inputsAndKeys"
import axios from "axios"




const BASE_URL = import.meta.env.VITE_BASE_URL


const Profile = ()=>{
    const navigate = useNavigate()
    const { logoutProvider, getProfile, user } = useGlobal()




    useEffect(()=>{
        getProfile()
    }, [navigate, getProfile])


    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logoutProvider();
            navigate(ProviderRoutes.LOGIN);
        }
    }


    const handleDeleteAccount = async()=>{
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.')
        if(!confirmDelete) return

        const config = {
            headers: { Authorization: localStorage.getItem('@MyDeliveryProvider:token') }
        }

        try{
            await axios.delete(`${BASE_URL}/providers/account`, config)
            localStorage.clear()
            navigate('/', { replace: true })
        }catch(e:any){
            alert(e?.response?.data?.message || e?.response?.data || 'An error occurred while trying to delete your account.')
        }
    }





    return(
        <>
            <Header
                leftIcon={ <FaListAlt className="header-icon" onClick={() => navigate(ProviderRoutes.ORDERS)} /> }
                rightIcon={ <AiOutlineLogout className="header-icon" onClick={handleLogout} /> }
            />
            <Container>
                <h1>Provider Data</h1>
                <hr style={{ width: '100%', marginBottom: '15px', backgroundColor: 'lightgray', border: 'none', height: '1px' }} />

                <div className="user-section">
                    <div>
                        <span className="properties">Name:</span> {user?.name} <br />
                        <span className="properties">Email:</span> {user?.email} <br />
                        <span className="properties">Phone:</span> {user ? formatPhoneNumber(user?.phone) : null} <br />
                        <span className="properties">Address:</span> {user?.address}
                    </div>
                    <MdEdit className="icon" onClick={() => navigate(ProviderRoutes.EDIT_PROFILE)} />
                </div>  
                <div className="danger-zone">
                    <button
                        type="button"
                        className="btn-delete-subtle"
                        onClick={handleDeleteAccount}>
                        Delete Account
                    </button>
                </div>
            </Container>
        </>
    )    
}


export default Profile