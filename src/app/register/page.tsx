'use client';

import Button from "@/components/Button";
import ImageField from "@/components/Form/ImageField";
import RadioGroup from "@/components/Form/RadioGroup";
import TextField from "@/components/Form/TextField";
import Link from "@/components/Link";
import { signup } from "../api/auth/sinup/route";
import PasswordFields from "./PasswordFields";
import { useFormState } from "react-dom";
import Alert from "@/components/Alert";

const initialState = { error: false, message: "" };

const RegisterPage = () => {
  const [state, formAction] = useFormState(signup, initialState);
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span className="mb-4"> Login or Register </span>
      {state.error && <Alert type="danger">{state.message}</Alert>}
      <form action={formAction} className="w-full">
        <ImageField name="avatar" label="Select the photo" id="avatar" />
        <TextField
          label="Enter your full name"
          type="text"
          name="name"
          id="name"
          className="mt-3"
          required
        />
        <TextField
          label="E-mail"
          type="email"
          name="email"
          id="email"
          className="mt-3"
          required
        />
        <PasswordFields />
        <RadioGroup
          options={[
            { label: "Yes", value: "ADMIN", id: "yes" },
            { label: "No", value: "USER", id: "no" },
          ]}
          name="role"
          label="Would you like to list accommodations?"
          className="flex justify-center mt-3"
        />
        <Button type="submit" appearance="primary" className="mt-5">
          Register
        </Button>
      </form>
      <span className="mt-3"> or </span>
      <Link href="/login" className="mt-3">
        I already have an account
      </Link>
    </section>
  );
};

export default RegisterPage;
