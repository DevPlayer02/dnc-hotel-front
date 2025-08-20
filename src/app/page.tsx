import Button from "./components/Button";
import Link from "./components/Link";
import TextField from "./components/Form/TextField";
import ImageField from "./components/Form/ImageField";

export default function Home() {
  return (
    <section>
      PRINCIPAL PAGE
      <Button>clique here</Button>
      <Button appearance="secondary">clique here</Button>
      <Link href="teste"> Ir para teste </Link>
      <TextField label="Full name" id="full_name" name="full_name" />
      <ImageField label="Select the photo" id="profile_picture"/>
    </section>
  );
}
