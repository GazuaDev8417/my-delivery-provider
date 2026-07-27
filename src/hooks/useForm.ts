import { useState, type ChangeEvent } from "react"



export const userForm = <T>(initialState: T)=>{
    const [form, setForm] = useState<T>(initialState)


    const onChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const clear = ():void=>{
        setForm(initialState)
    }

    return { form, onChange, clear, setForm }
}
