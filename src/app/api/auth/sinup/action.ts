"use server";

import axios from "@/api";
import { redirect } from "next/navigation";

type AccessToken = {
  access_token?: string;
};

interface FormState {
  message?: string;
  success?: boolean;
  result?: Promise<FormState>;
}

export async function signup(
  prevState: FormState, formData: FormData
){
  try {
        const avatar = formData.get('avatar') as File;
        const formDataAvatar = new FormData()
        formDataAvatar.set('avatar', avatar)
    
        const payload = {
            "name": formData.get('name'),
            "email": formData.get('email'),
            "password":  formData.get('password'),
            "role":  formData.get('role')
        }
    
        const { data } = await axios.post<AccessToken>("/auth/register", payload);
    
        const access_token = data?.access_token;
    
        if (avatar.size) {
            await axios.post('/users/avatar', formDataAvatar, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
        }
    } catch (error) {
        console.log('Register sinup error: ', {error})
        
        return { ...prevState, error: true, message: 'Não foi possível cadastrar usuário' }
    }
    
    redirect('/login')
    
}
