import axios from "axios"
import { useState } from "react"

export function useChat(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const sendMessage = async (receiverId: string, content: string) => {
        try {
            await axios.post(`${BACKEND_URL}/message/send`, {
                receiverId,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

        } catch (error) {
            setError("error sending message")
        } finally{
            setLoading(false)
        }
    }

    return {
        sendMessage,
        loading,
        error
    }
}