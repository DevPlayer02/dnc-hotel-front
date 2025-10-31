"use client";

import PasswordFields from "@/app/register/PasswordFields";
import Alert from "../Alert";
import ImageField from "../Form/ImageField";
import TextField from "../Form/TextField";
import RadioGroup from "../Form/RadioGroup";
import Button from "../Button";
import { useActionState } from "react";
import { User } from "@/types/User";
import { updateProfile } from "@/app/api/users/actions";
import { ActionResponse } from "@/types/api";
import { signup } from "@/app/api/auth/sinup/action";

const initialState = { error: false, message: "" };

type UserFormProps = {
  user?: User;
};

const UserForm = ({ user }: UserFormProps) => {
  const action = (user ? updateProfile : signup) as (state: ActionResponse | undefined, payload: FormData) => Promise<ActionResponse>;
  const [state, formAction] = useActionState(action, initialState);

  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const filename = user?.image;
  const srcUrl = filename
    ? `${base}/uploads/${encodeURIComponent(filename)}`
    : "/default-profile.jpg";
  
  return (
    <>
      {state.error && <Alert type="danger">{state.message}</Alert>}
      <form action={formAction} className="w-full mt-3">
        <ImageField
          name="avatar"
          label="Select the photo"
          id="avatar"
          defaultValue={srcUrl}
        />
        <TextField
          label="Enter your full name"
          type="text"
          name="name"
          id="name"
          className="mt-3"
          defaultValue={user?.name}
          required
        />
        <TextField
          label="E-mail"
          type="email"
          name="email"
          id="email"
          className="mt-3"
          defaultValue={user?.email}
          required
        />
        {!user && (
          <>
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
          </>
        )}
        <Button type="submit" appearance="primary" className="mt-5">
          {user ? "Edit" : "Register"}
        </Button>
      </form>
    </>
  );
};

export default UserForm;
