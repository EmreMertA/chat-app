import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";
import styles from "./login.module.css";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
  };
  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      className={styles.container}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <h1 className={styles.formHeader}>Chat-App</h1>
        <Form
          size="large"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Segment>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              name="email"
              refs={register("email", { required: true })}
              onChange={(event, { name, value }) => {
                setValue(name, value);
              }}
              type="email"
              placeholder="E-mail address"
              error={errors.email ? true : false}
            />
            <Form.Input
              fluid
              icon="lock"
              name="password"
              refs={register("password", { required: true, minLength: 8 })}
              onChange={(event, { name, value }) => {
                setValue(name, value);
              }}
              iconPosition="left"
              placeholder="Password"
              type="password"
              error={errors.password ? true : false}
            />

            <Button color="violet" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/signup">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
