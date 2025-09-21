import RecoverPassword from "./ResetPassword";

const RecuperarSenhaPage = () => {
  return (
    <section className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Enter or register</span>
      <RecoverPassword />
    </section>
  );
};

export default RecuperarSenhaPage;