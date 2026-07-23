export const formatPhoneNumber = (phone:string)=>{
    const digits = phone.replace(/\D/g, '')

    if(digits.length <= 10){
        return digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3')
    }

    return digits.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3')
}


export const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'Home',
        'End'
    ]

    if(allowedKeys.includes(e.key)) return

    if(e.ctrlKey || e.metaKey) return

    if(!/^[0-9]$/.test(e.key)) e.preventDefault()
}