import { useEffect, useState } from "react";
import type { ChangeEvent, FC, SubmitEvent, MouseEvent } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEyeSlash, FaEye, FaArrowLeft } from 'react-icons/fa';
import { Container } from "./styled"
import { useGlobal } from "../../hooks/useGlobal";
import { ProviderRoutes } from "../../routes/paths";
import { handleKeyPress } from "../../utils/inputsAndKeys";



interface FormData{
    name:string
    address:string
    phone:string
    email:string
    password:string
    description:string
}


const BASE_URL = import.meta.env.VITE_BASE_URL


const Signup:FC = ()=>{
    const navigate = useNavigate();
    const { providerToken, loading, signupProvider } = useGlobal();    
    const [showPass, setShowPass] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null)
    const [form, setForm] = useState<FormData>({
        name:'',
        address:'',
        phone:'',
        email:'',
        password: '',
        description:''
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


    const handleFileChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        if(e.target.files && e.target.files[0]){
            setImage(e.target.files[0])
        }
    }


    const handleClearForm = (e:MouseEvent<HTMLButtonElement>):void=>{
        e.preventDefault()
        setForm({
            name:'',
            address:'',
            phone:'',
            email:'',
            password: '',
            description:''
        })
    }


    const handleFormSubmit = async(e:SubmitEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault()
        if(isSubmitting) return
        
        const capitalizeFirstLetter = form.name.charAt(0).toUpperCase() + form.name.slice(1)
        const formData = new FormData()

        formData.append('name', capitalizeFirstLetter.trim())
        formData.append('address', form.address.trim())
        formData.append('phone', form.phone)
        formData.append('email', form.email.trim())
        formData.append('password', form.password.trim())
        formData.append('description', form.description.trim())

        if(image){
            formData.append('image', image)
        }

        try{
            setIsSubmitting(true)
            
            const response = await axios.post(`${BASE_URL}/providers/signup`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            signupProvider(response.data)
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
            <button
                type="button"
                className="back-button"
                aria-label="Voltar para Login"
                onClick={() => navigate(ProviderRoutes.LOGIN)}
            >
                <FaArrowLeft aria-hidden="true" />
            </button>
            <div className="title">Signup</div>            
            <form onSubmit={handleFormSubmit}>
                <div className="input-icon-container">
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                    id="name"
                    type="text"
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    aria-label="John Doe"
                    autoFocus
                    disabled={isSubmitting}
                    required
                />

                <label htmlFor="address" className="sr-only">Address</label>
                <input
                    id="address"
                    type="text"
                    className="form-input"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    placeholder="Your address"
                    aria-label="Rua / Av..." 
                    disabled={isSubmitting}
                    required
                />

                <label htmlFor="phone" className="sr-only">Phone</label>
                <input
                    id="phone"
                    type="tel"
                    className="form-input"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Your phone"
                    aria-label="71988776655"
                    maxLength={11} 
                    disabled={isSubmitting}
                    required
                />

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
                    disabled={isSubmitting}
                    required
                />

                <label htmlFor="logourl">Restaurant picture</label>
                <input
                    id="logourl"
                    type="file"
                    name="logourl"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                    />

                <label htmlFor="login-password" className="sr-only">Password</label>
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

                <label htmlFor="description" className="sr-only">Description</label>
                <input
                    id="description"
                    type="text"
                    className="form-input"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    aria-label="Type the description of restaurant"
                    disabled={isSubmitting}
                    required
                />
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
        </Container>
    )

}


export default Signup
