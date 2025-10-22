"use client";
import Button from "@/components/Button";
import TextField from "@/components/Form/TextField";
import Image from "next/image";
import Link from "@/components/Link";
import { resetPassword } from "../../api/auth/password/action";
import Alert from "@/components/Alert";
import PasswordFields from "@/app/register/PasswordFields";
import React from "react";

const initialState = { message: "" };

const ResetPassword = () => {
    const [state, formAction, isPending] = React.useActionState(resetPassword, initialState);

  return (
    <form
      className="w-full flex flex-col items-center justify-center"
      action={formAction}
    >
      {state?.message && <Alert type="danger">{state.message}</Alert>}
      <Image
        src="/recover-password.svg"
        alt="recover password"
        width={172}
        height={167}
        className="mt-6"
      />
      {state?.success ? (
        <>
          <span className="text-xl mt-4">Password updated successfully!</span>
          <Link href="/login" className="my-6">
            Log in
          </Link>
        </>
      ) : (
        <>
          <TextField
            label="confirmation token"
            type="text"
            id="token"
            name="token"
            className="mt-6"
            required
          />
          <PasswordFields />
          <Button
            appearance="primary"
            type="submit"
            className="mt-8"
            disabled={isPending}
          >
            Send e-mail
          </Button>
          <span className="mt-2">or</span>
          <Link href="/login" className="my-2">
            Cancel
          </Link>
        </>
      )}
    </form>
  );
};

export default ResetPassword;