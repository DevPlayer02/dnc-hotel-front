import api from "@/api";
import { Role } from "@/types/User";

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export async function signupService(formData: FormData) {
  const payload: SignupPayload = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as Role,
  };

  const avatar = formData.get("avatar") as File;
  const formDataAvatar = new FormData()
  formDataAvatar.set('avatar', avatar)
    
  return { ...payload, formDataAvatar };
}

export async function loginService(payload: {
  email: string;
  password: string;
}) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}
