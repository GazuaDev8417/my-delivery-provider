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
console.log(user)

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
                        <span className="properties">Phone:</span> {user ? formatPhoneNumber(user?.phone) : null} <br />
                        <span className="properties">Address:</span> {user?.address}
                    </div>
                    <MdEdit className="icon" onClick={() => navigate(ProviderRoutes.EDIT_PROFILE)} />
                </div>  
            </Container>
        </>
    )    
}


export default Profile