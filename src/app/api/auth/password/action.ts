"use server"
import axios from "@/api";
import { redirect } from "next/navigation";

interface FormState {
  message?: string;
  success?: boolean;
  result?: Promise<FormState>;
}

export async function forgotPassword(prevState: FormState, formData: FormData) {
    try {
        const payload = { "email": formData.get('email') }
    
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data } = await axios.post('/auth/forgot-password', payload);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { ...prevState, message: 'Error sending the email' }
    }

    redirect('/reset-password')    
}

export async function resetPassword(prevState: FormState, formData: FormData) {
    try {
        const payload = {
            "token": formData.get('token'),
            "password": formData.get('password'),
        }
    
        const { data } = await axios.patch('/auth/reset-password', payload);

        return { success: true, result: data }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { ...prevState, message: 'Error updating the password' }
    }

    redirect('/reset-password')    
}