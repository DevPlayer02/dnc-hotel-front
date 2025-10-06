"use client";

import TextField from "@/components/Form/TextField";
import Link from "../../components/Link";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.ok) {
      router.push("/");
    } else {
      alert("erro na autenticação");
    }
  };

  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Log in or Sign up</span>
      <h3 className="w-full text-left text-xl pt-4 my-3">
        Welcome to DNC Hotel!
      </h3>
      <form className="w-full" onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="E-mail"
          className="mt-3"
          required
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          className="mt-3"
          required
        />
        <Button appearance="primary" type="submit" className="mt-3 cursor-pointer">
          Login
        </Button>
      </form>
      <span className="my-3"> or </span>
      <Link href="/register" className="my-2">
        Register
      </Link>
      <Link href="/forgot-password"> Forgot my password </Link>
    </article>
  );
}
