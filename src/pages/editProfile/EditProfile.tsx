import type { ChangeEvent, FC, SubmitEvent } from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useGlobal } from "../../hooks/useGlobal"
import { handleKeyPress } from "../../utils/inputsAndKeys"
import { Container } from "./styled"




interface FormData {
    name: string
    phone: string
    address:string
}


const BASE_URL = import.meta.env.VITE_BASE_URL



const EditProfile:FC = ()=>{
    const navigate = useNavigate()
    const { user, getProfile } = useGlobal()
    const [form, setForm] = useState<FormData>({
        name: '',
        phone: '',
        address:''
    })


    useEffect(() => {
        getProfile()
    }, [])

    
    useEffect(() => {
        if (user && user.name) {
            setForm({
                name: user.name,
                phone: user.phone,
                address: user.address
            })
        }
    }, [user])
    

    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        const updatedValue = name === 'phone' ? value.replace(/\D/g, '') : value

        setForm(prevForm => ({ ...prevForm, [name]: updatedValue }))
    }


    const updateRestaurant = async (e:SubmitEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault()

        const body = {
            name: form.name,
            phone: form.phone.replace(/\D/g, ''),
            address: form.address,
        }

        const config = {
            headers: { Authorization: localStorage.getItem('@MyDeliveryProvider:token') }
        }
        
        try {
            await axios.put(`${BASE_URL}/restaurants/update`, body, config)
            alert("Restaurant data updated successfully!")
            navigate('/profile')
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.response?.data || "An unexpected error occurred."
            alert(`Failed to update restaurant: ${errorMessage}`)
        }
    }


    const clearForm = (): void => {
        setForm({
            name: '',
            phone: '',
            address: ''
        })
    }



    return(
        <Container>
            <div className="title">Update Restaurant Data</div>
            <small className="obs-container">
                You won't can change the email <br /> because it's a credential to access the application.
            </small>
            <form onSubmit={updateRestaurant}>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                    id="name"
                    type="text"
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="First and last name" 
                    autoComplete="name"
                    aria-label="User Full Name"
                    required
                />

                <label htmlFor="tel" className="sr-only">Phone Number</label>
                <input
                    id="tel"
                    type="text"
                    className="form-input"
                    name="phone"
                    onKeyDown={handleKeyPress} /* Swapped obsolete onKeyPress for modern standard onKeyDown */
                    maxLength={11}
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Phone number" 
                    autoComplete="tel"
                    aria-label="Phone Number"
                    required
                />

                <label htmlFor="address" className="sr-only">E-mail</label>
                <input
                    id="address"
                    type="text"
                    className="form-input"
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    placeholder="Street address, apartment, suite, unit, etc." 
                    autoComplete="address"
                    aria-label="address"
                    required
                />

                <div className="btn-container">
                    <div className="submit-btn">
                        <button className="signup-button" type="button" onClick={clearForm}>Clear</button>
                        <button className="signup-button" type="submit">Update</button>
                    </div>
                    <button 
                        className="signup-button signup-button-exception"
                        type="button"
                        onClick={() => navigate('/profile')}
                    >
                        Back to Profile
                    </button>
                </div>
            </form>
        </Container>
    )
}


export default EditProfile