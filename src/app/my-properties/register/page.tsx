import HotelForm from "@/components/HotelForm";
import Link from "@/components/Link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterHotelPage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span className="mb-4"> New Properties </span>
      <HotelForm />
      <Link href="/my-properties" className="mt-3 text-red-500">
        Cancel
      </Link>
    </section>
  );
};

export default RegisterHotelPage;
