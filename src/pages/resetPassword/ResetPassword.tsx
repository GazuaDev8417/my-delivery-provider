import { type FC, type SubmitEvent, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProviderRoutes } from '../../routes/paths'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userForm } from '../../hooks/useForm'
import { Container } from './styled'



const BASE_URL = import.meta.env.VITE_BASE_URL




const ResetPassword:FC = ()=>{
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { onChange, clear, form } = userForm({
        newPassword: '',
        confirmNewPassword: ''
    })
    

    const token = searchParams.get('anything')

    useEffect(()=>{
        if(!token){
            navigate(ProviderRoutes.HOME, { replace: true })
        }
    }, [token, navigate])


    const handleLoginSubmit = async(e:SubmitEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault()

        const body = {
            newPassword: form.newPassword,
            confirmNewPassword: form.confirmNewPassword
        }

        try{
            const response = await axios.patch(`${BASE_URL}/providers/password/update`, body, {
                headers: { Authorization: token }
            })

            alert(response.data.message)
            navigate(ProviderRoutes.LOGIN)
        }catch(e:any){
            const errorMessage = e?.response?.data?.message || e?.response?.data || e?.message
            alert(errorMessage === 'jwt expired' ? 'You need to repeat the process because your time is expired' : errorMessage)
        }
    }


    return(
        <Container>
            <div className="title">New Password</div>
            <form onSubmit={handleLoginSubmit}>               
                <div className="input-container">
                    <label htmlFor="newPassword" className="sr-only">New Password</label>
                    <input
                        id="newPassword"
                        type="password"
                        className="form-input"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={onChange}
                        placeholder="Type your new password"
                        aria-label="New password"
                        autoFocus 
                        required
                        />
                    <label htmlFor="confirmNewPassword" className="sr-only">Confirm Password</label>
                    <input
                        id="confirmNewPassword"
                        type='password'
                        name="confirmNewPassword"
                        className="form-input"
                        value={form.confirmNewPassword}
                        onChange={onChange} 
                        placeholder="Confirm you password"
                        aria-label="Confirm password"
                        required
                        />
                </div>
                <div className="btn-container">
                    {/* 4. Specified type="button" so this button won't submit the form */}
                    <button className="login-button" type="button" onClick={clear}>Clear</button>
                    <button className="login-button" type="submit">Update</button>
                </div>
            </form>
        </Container>
    )
}


export default ResetPassword