import { useState } from "react";
import Router from "next/router";
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
import { connect } from "react-redux";
import Cookies from "js-cookie";
import PublicLayout from "../components/PublicLayout";
import { verifyEmailAction } from "../store/actions/metaActions";
import { version } from "joi";

const EmailVerify = (props) => {
  const [state, setState] = useState({
    code: "",
    email: "",
  });

  const changeHandler = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("code", state.code);
    formData.append("email", state.email);
    props.verifyEmailAction(formData);
  };

  const logoutHandler = () => {
    Cookies.remove("auth_token");
    Router.replace("/login");
  };

  return (
    <PublicLayout>
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card className="mt-5 p-5">
              <CardBody>
                <h1 className="mb-5 text-center">Verify Email</h1>
                <Form onSubmit={onSubmit}>
                  <FormGroup>
                    <Label for="code">Code</Label>
                    <Input
                      type="code"
                      value={state.code}
                      onChange={changeHandler}
                      name="code"
                      id="code"
                      placeholder="code"
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
                  <div className="submit mb-3">
                    <Button type="submit" color="primary" className="mr-3 px-4">
                      Verify
                    </Button>
                    <Button color="danger" onClick={logoutHandler}>
                      Logout
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
};

export default connect(null, { verifyEmailAction })(EmailVerify);
