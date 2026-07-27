import type { SyntheticEvent, SubmitEvent } from "react"
import { useEffect, useRef } from "react"
import axios from 'axios'
import { BASE_URL } from "../../constants/url"
import { userForm } from "../../hooks/useForm"
import { StyledDialog, ModalContent, CloseButton } from "./styled"


interface ModalProps{
    isOpen:boolean
    onClose: () => void
}




const RequestPasswordReset = ({ isOpen, onClose }:ModalProps)=>{
    const dialogRef = useRef<HTMLDialogElement>(null)
    const { clear, onChange, form } = userForm({ email:'disk90@email.com' })



    useEffect(()=>{
        const dialog = dialogRef.current
        if(!dialog) return

        if(isOpen){
            if(!dialog.open){
                dialog.showModal()
            }
        }else{
            if(dialog.open){
                dialog.close()
            }
        }

        return ()=>{
            if(dialog && dialog.open){
                dialog.close()
            }
        }
    }, [isOpen])


    const handleCancel = (e:SyntheticEvent)=>{
        e.preventDefault()
        onClose()
    }


    const isUrl = (str: string) => {
        try {
            new URL(str)
            return true
        } catch (_) {
            return false
        }
    }


    const handleSubmit = async(e:SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()

        try{
            
            const response = await axios.post(`${BASE_URL}/restaurants/password/reset-request`, { email: form.email })
            const responseData = response.data

            if(isUrl(responseData)){
                alert('You will be redirected to a test email to reset your password')

                window.location.href = responseData

                return
            }
            
            alert(responseData)
            
            onClose()
            clear()
        }catch(e:any){
            const errorMessage = e?.response?.data?.message || e?.response?.data || e?.message
            alert(errorMessage)
        }
    }




    return(
        <StyledDialog
            ref={dialogRef}
            onCancel={handleCancel}
        >
            <ModalContent>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>Reset Password</h2>
                <small className="subtitle">A link will be sent to an email account test</small>

                <form onSubmit={handleSubmit}>               
                    <div className="input-container">
                        <label htmlFor="reset-email" className="sr-only">Email</label>
                        <input
                            id="reset-email"
                            type="email"
                            className="form-input"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            placeholder="name@email.com"
                            aria-label="Endereço de email"
                            autoFocus 
                            required
                            />
                    </div>
                    <div className="btn-container">
                        {/* 4. Specified type="button" so this button won't submit the form */}
                        <button className="login-button" type="button" onClick={clear}>Clear</button>
                        <button className="login-button" type="submit">Send</button>
                    </div>
                </form>
            </ModalContent>
        </StyledDialog>
    )
}


export default RequestPasswordReset