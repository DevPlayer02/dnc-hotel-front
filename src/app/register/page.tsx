"use client";

import Link from "@/components/Link";
import UserForm from "@/components/UserForm";

const RegisterPage = () => {
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span className="mb-4"> Register </span>
      <UserForm />
      <span className="mt-3"> or </span>
      <Link href="/login" className="mt-3">
        I already have an account
      </Link>
    </section>
  );
};

export default RegisterPage;
