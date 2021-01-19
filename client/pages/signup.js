import { useState } from "react";
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
import { connect } from 'react-redux';
import { loginAction } from '../store/actions/metaActions';

const Singup = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const changeHandler = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("phone", state.phone);

    console.log(process.env.BASE_URL, 'BASE_URL');
    console.log(state);

    props.loginAction(formData);
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Card className="mt-5 p-5">
            <CardBody>
              <h1 className="mb-5 text-center">Login</h1>
              <Form onSubmit={onSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="name"
                    value={state.name}
                    onChange={changeHandler}
                    name="name"
                    id="name"
                    placeholder="Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={state.email}
                    onChange={changeHandler}
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={changeHandler}
                    id="examplePassword"
                    placeholder="password"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input
                    type="phone"
                    name="phone"
                    value={state.phone}
                    onChange={changeHandler}
                    id="phone"
                    placeholder="phone"
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

export default connect(null, { loginAction })(Singup);
