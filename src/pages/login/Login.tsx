import { useEffect, useState } from "react";
import type { ChangeEvent, FC, SubmitEvent, MouseEvent } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Container } from "./styled"
import { useGlobal } from "../../hooks/useGlobal";
import { ProviderRoutes } from "../../routes/paths";
import RequestPasswordReset from "../../components/resetPassword/RequestPasswordReset";



interface FormData{
    email:string
    password:string
}


const BASE_URL = import.meta.env.VITE_BASE_URL


const Login:FC = ()=>{
    const navigate = useNavigate();
    const { providerToken, loading, loginProvider } = useGlobal();    
    const [showPass, setShowPass] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form, setForm] = useState<FormData>({
        email: 'admin1@example.com',
        password: 'password123'
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);



    useEffect(()=>{
        if(!loading && providerToken){
            navigate(ProviderRoutes.ORDERS, { replace: true })
        }
    }, [providerToken, loading, navigate])


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }


    const handleClearForm = (e:MouseEvent<HTMLButtonElement>):void=>{
        e.preventDefault()
        setForm({ email: '', password: '' })
    }


    const handleFormSubmit = async(e:SubmitEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault()
        if(isSubmitting) return

        try{
            setIsSubmitting(true)

            const response = await axios.post(`${BASE_URL}/restaurants/login`, {
                email: form.email,
                password: form.password
            })

            loginProvider(response.data)
            navigate(ProviderRoutes.ORDERS)
        }catch(e:any){
            alert(e?.response?.data?.message || e?.message || e?.response?.data)
        }finally{
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return <div style={{ textAlign: "center", marginTop: "20vh" }}>Authenticating workspace...</div>;
    }


    return(
        <Container>
            <RequestPasswordReset isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="title">Login</div>            
            <form onSubmit={handleFormSubmit}>
                <div className="input-icon-container">
                <label htmlFor="login-email" className="sr-only">Email</label>
                <input
                    id="login-email"
                    type="email"
                    className="form-input"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="name@email.com"
                    aria-label="Endereço de email"
                    autoFocus
                    disabled={isSubmitting}
                    required
                />

                <label htmlFor="login-password" className="sr-only">Senha</label>
                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                    id="login-password"
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    className="form-input"
                    value={form.password}
                    onChange={handleInputChange}
                    placeholder="Sua senha"
                    aria-label="Senha"
                    disabled={isSubmitting}
                    required
                    />
                    <div 
                    className="eye-icon-wrapper" 
                    onClick={() => setShowPass(prev => !prev)}
                    style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex' }}
                    >
                    {showPass ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </div>
                </div>
                </div>

                <div className="btn-container">
                <button 
                    type="button" 
                    className="login-button clear-btn" 
                    onClick={handleClearForm}
                    disabled={isSubmitting}
                >
                    Clear
                </button>
                
                <button 
                    type="submit" 
                    className="login-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Loading..." : "Enter"}
                </button>
                </div>
            </form>
            {/* <p 
                style={{cursor:'pointer', color:'blue '}}
                onClick={() => setIsModalOpen(true)}>Forgot my password</p> */}
        </Container>
    )

}


export default Login
