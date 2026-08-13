import axios from 'axios'


const BASE_URL = import.meta.env.VITE_BASE_URL

export interface ProviderNotifications{
    id:string
    notification:string
    is_read:boolean
    created_at:string
}


const token = localStorage.getItem('@MyDeliveryProvider:token')

export const notifificationService = {
    //YOU NEED TO BUILD THE ROUTES HERE IN EVERY REQUEST
    getNofifications: async():Promise<ProviderNotifications[]>=>{
        const response = await axios.get<ProviderNotifications[]>(`${BASE_URL}/provider-notifications`, {
            headers: { Authorization: token }
        })
        return response.data
    },

    updateNotification: async(id:string):Promise<void>=>{
        const response = await axios.put(`${BASE_URL}/provider-notifications/update/${id}`, {}, {
            headers: { Authorization: token }
        })
        return response.data
    },

    updateAllNotifications: async():Promise<void>=>{
        const response = await axios.put(`${BASE_URL}/provider-notifications/update/all`, {}, {
            headers: { Authorization: token }
        })
        return response.data
    }
}