import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";
import styles from "./signUp.module.css";
import { useForm } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";

const SignUp = () => {
  const firebase = useFirebase();

  const [fbErrors, setFbErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const onSubmit = ({ username, email, password }, e) => {
    setSubmitting(true);
    setFbErrors([]);

    const [first, last] = username.split("");

    firebase
      .createUser(
        { email, password },
        {
          name: username,
          avatar: `https://ui-avatars.com/api/?name=${first}+${last}&background=random&color=fff`,
        }
      )
      .then((user) => {
        console.log(user);
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
              icon="user"
              iconPosition="left"
              name="username"
              refs={register("username", { required: true })}
              onChange={(event, { name, value }) => {
                setValue(name, value);
              }}
              placeholder="Username"
              error={errors.username ? true : false}
            />
            <Form.Input
              fluid
              icon="mail"
              name="email"
              refs={register("email", { required: true })}
              onChange={(event, { name, value }) => {
                setValue(name, value);
              }}
              iconPosition="left"
              type="email"
              placeholder="E-mail address"
              error={errors.email ? true : false}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              name="password"
              refs={register("password", { required: true, minLength: 8 })}
              onChange={(event, { name, value }) => {
                setValue(name, value);
              }}
              placeholder="Password"
              type="password"
              error={errors.password ? true : false}
            />

            <Button color="violet" fluid size="large" disabled={submitting}>
              Sign Up
            </Button>
          </Segment>
        </Form>
        {}
        {fbErrors.length > 0 &&
          fbErrors.map((error, index) => (
            <Message key={index} error>
              {error.message}
            </Message>
          ))}

        <Message>
          Have an account? <Link to="/login"> Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
