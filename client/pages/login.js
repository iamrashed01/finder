import { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { useUser } from "../lib/hooks";
import Cookies from "js-cookie";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export default function LoginPage() {
  const [user, { mutate, loading }] = useUser();
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userObj = await res.json();
      // set user to useSWR state
      mutate(userObj.data);
      Cookies.set("auth_token", userObj.auth_token);
    } else {
      setErrorMsg("Incorrect username or password. Try better!");
    }
  }

  useEffect(() => {
    console.log("login page called");
    // redirect to home if user is authenticated
    if (!loading && user.data) Router.push("/");
  }, [user, loading]);

  return (
    <>
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card className="mt-5 p-5">
              <CardBody>
                <h1 className="mb-5 text-center">Login</h1>
                {errorMsg && <p className="error">{errorMsg}</p>}
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
                  <div className="submit">
                    <Button type="submit" className="mr-3">
                      Login
                    </Button>
                    <Link href="/signup">
                      <a>I don't have an account</a>
                    </Link>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
