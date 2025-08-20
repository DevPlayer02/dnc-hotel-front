import Button from "./components/Button";
import Link from "./components/Link";
import TextField from "./components/Form/TextField";

export default function Home() {
  return (
    <section>
      PAGINA PRINCIPAL
      <Button>clique em mim</Button>
      <Button appearance="secondary">clique em mim</Button>
      <Link href="teste"> Ir para teste </Link>
      <TextField label="Nome completo" id="full_name" name="full_name" />
    </section>
  );
}
