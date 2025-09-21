import Link from "@/components/Link";
import ForgotPassword from "./ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Enter or register</span>
      <ForgotPassword />
      <span className="mt-2">or</span>
      <Link href="/login" className="my-2">
        Cancel
      </Link>
    </section>
  );
};

export default ForgotPasswordPage;