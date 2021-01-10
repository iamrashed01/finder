import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

const Singup = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Card className="mt-5 text-center p-5">
            <CardBody>
              <h1 className="mb-5 text-center">Login</h1>
              <Form onSubmit={onSubmit}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password placeholder"
                  />
                </FormGroup>
                <div className="submit mb-3">
                  <Button type="submit" className="mr-3">
                    Signup
                  </Button>
                  <Button color="primary">
                    <a href="http://localhost:5000/auth/google">
                      Singup with Google Account
                    </a>
                  </Button>
                </div>
                <Link href="/login">
                  <a>Already have an Account</a>
                </Link>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Singup;
