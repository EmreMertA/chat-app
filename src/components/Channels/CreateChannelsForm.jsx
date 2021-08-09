import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";

const CreateChannelForm = ({ open, onClose, onOpen }) => {
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);

  const [name, setName] = useState();
  const [description, setDescription] = useState();

  // useEffect(() => {
  //   register({ name: "name" }, { required: true });
  //   register({ name: "description" }, { required: true, minLength: 20 });
  // }, []);

  const onSubmit = () => {
    firebase.push("channels", {
      name,
      description,
      createdBy: {
        name: profile.name,
        avatar: profile.avatar,
      },
    });
    onClose();
  };
  return (
    <Modal onClose={onClose} onOpen={onOpen} open={open}>
      <Modal.Header>Create Channel</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            name="name"
            // error={errors.name ? true : false}
            placeholder="#General"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            // error={errors.description ? true : false}
            placeholder="#description"
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => onClose()}>
          Cencel
        </Button>
        <Button
          content="Oluştur"
          labelPosition="right"
          icon="checkmark"
          positive
          onClick={() => onSubmit()}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CreateChannelForm;
