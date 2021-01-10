import Link from "next/link";
import { Button, Jumbotron } from "reactstrap";

export default function Custom404() {
  return (
    <Jumbotron className="container my-5 py-5 text-center">
      <h1 className="mb-5">404 - Page Not Found</h1>
      <Link href="/">
        <a>
          <Button color="primary">Go Back Home</Button>
        </a>
      </Link>
    </Jumbotron>
  );
}
