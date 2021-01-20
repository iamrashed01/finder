import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';
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
} from 'reactstrap';
import PublicLayout from '../components/PublicLayout';
import { useUser } from '../lib/hooks';

export default function LoginPage() {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        const userObj = await res.json();
        // set user to useSWR state
        mutate(userObj.data);
        Cookies.set('auth_token', userObj.auth_token);
        Router.push('/');
      } else {
        setErrorMsg('Incorrect username or password. Try better!');
      }
    } catch (error) {
      setErrorMsg('Server error!');
    }
  }

  return (
    <PublicLayout>
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
                  <div className="submit mb-3">
                    <Button type="submit" className="mr-3">
                      Login
                    </Button>
                    <Button color="primary">
                      <a href="http://localhost:5000/auth/google">
                        Singin with Google
                      </a>
                    </Button>
                  </div>
                  <Link href="/signup">
                    <a>I don't have an account</a>
                  </Link>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
}
