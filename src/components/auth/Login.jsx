import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";
import styles from "./login.module.css";
import { useForm } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";

const Login = () => {
  const firebase = useFirebase();

  const [fbErrors, setFbErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const onSubmit = ({ email, password }, e) => {
    setSubmitting(true);
    setFbErrors([]);

    firebase
      .login({
        email,
        password,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        setFbErrors([{ message: error.message }]);
      })
      .finally(() => setSubmitting(false));
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

            <Button color="violet" fluid size="large" disabled={submitting}>
              Log In
            </Button>
          </Segment>
        </Form>
        {fbErrors.length > 0 &&
          fbErrors.map((error, index) => (
            <Message key={index} error>
              {error.message}
            </Message>
          ))}
        <Message>
          New to us? <Link to="/signup">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
