import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import styles from "./signUp.module.css";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      className={styles.container}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="purple" textAlign="center">
          Chat-App
        </Header>
        <Form size="large" className={styles.form} onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              name="username"
              placeholder="Username"
            />
            <Form.Input
              fluid
              icon="mail"
              name="Email"
              iconPosition="left"
              type="email"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              name="Password"
              placeholder="Password"
              type="password"
            />

            <Button color="vk" fluid size="large">
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Have an account? <Link to="/login"> Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
