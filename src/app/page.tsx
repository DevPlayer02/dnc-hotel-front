import Button from "../components/Button";
import Link from "../components/Link";
import TextField from "../components/Form/TextField";
import ImageField from "../components/Form/ImageField";
import Pagination from "../components/Pagination";
import Alert from "../components/Alert";

export default function Home() {
  return (
    <section>
      PRINCIPAL PAGE
      <Button>clique here</Button>
      <Button appearance="secondary">clique here</Button>
      <Link href="teste"> Ir para teste </Link>
      <TextField label="Full name" id="full_name" name="full_name" />
      <ImageField name="profile_picture" label="Select the photo" id="profile_picture" />
      <Pagination currentPage={7} destination="/" totalPages={100} />
      <Alert type="success" >This is feedback for my user.</Alert>
    </section>
  );
}
