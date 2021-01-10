import Link from "next/link";
import { Button, Card, CardBody, Container } from "reactstrap";

const Singup = () => {
  return (
    <Container>
      <Card className="mt-5 text-center p-5">
        <CardBody>
          <Button color="primary">
            <a href="http://localhost:5000/auth/google">
              Singup with Google Account
            </a>
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Singup;
