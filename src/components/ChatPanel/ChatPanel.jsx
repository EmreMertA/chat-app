import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import {
  Button,
  Comment,
  Form,
  Header,
  Icon,
  Input,
  Segment,
} from "semantic-ui-react";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";

const ChatPanel = ({ currentChannel }) => {
  const firebase = useFirebase();

  useFirebaseConnect([
    { path: `/messages/${currentChannel.key}`, storeAs: "channelMessages" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState("");

  const channelMessages = useSelector(
    (state) => state.firebase.ordered.channelMessages
  );

  const currentUserUid = useSelector((state) => state.firebase.auth.uid);
  const profile = useSelector((state) => state.firebase.profile);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content !== "") {
      const message = {
        content,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          id: currentUserUid,
          name: profile.name,
          avatar: profile.avatar,
        },
      };

      firebase.push(`messages/${currentChannel.key}`, message).then(() => {
        setContent("");
      });
    }
  };

  const uploadMedia = (e) => {
    const file = e.target.files[0];

    if (file) {
      const storageRef = firebase.storage().ref();

      const fileRef = storageRef.child(`chat/public/${uuidv4()}.jpg`);

      return fileRef
        .put(file)
        .then((snap) => {
          fileRef.getDownloadURL().then((downloadURL) => {
            sendMediaMessage(downloadURL);
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const sendMediaMessage = (url) => {
    const message = {
      image: url,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUserUid,
        name: profile.name,
        avatar: profile.avatar,
      },
    };

    firebase.push(`messages/${currentChannel.key}`, message).then(() => {
      console.log("Media Message Sent");
    });
  };

  const filterMessages = () => {
    const regex = new RegExp(searchTerm, "gi");
    const searchResult = [...channelMessages].reduce((acc, message) => {
      if (
        (message.value.content && message.value.content.match(regex)) ||
        (message.value.user && message.value.user.name.match(regex))
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    return searchResult;
  };

  const renderedMessages =
    searchTerm !== "" ? filterMessages() : channelMessages;

  return (
    <>
      {/* Header */}
      <Segment clearing>
        <Header as="h3" floated="left">
          <span>
            <Icon name="hashtag" />
            {currentChannel.name}
          </span>
        </Header>
        {/* Search */}
        <Header as="h3" floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Header>
      </Segment>

      <Segment
        style={{
          position: "fixed",
          top: 55,
          bottom: 70,
          width: "calc(100% - 260px)",
          height: "81%",
        }}
      >
        <Comment.Group
          style={{ height: "80vh", overflowY: "auto", maxWidth: "100%" }}
        >
          {renderedMessages &&
            renderedMessages.map(({ key, value }) => (
              <Message key={key} message={value} />
            ))}

          <div ref={messagesEndRef} />
        </Comment.Group>
      </Segment>

      {/* Message Input */}

      <Segment
        style={{
          position: "fixed",
          bottom: 0,
          width: "calc(100% - 260px)",
          diplay: "flex",
        }}
      >
        <Button icon onClick={() => fileInputRef.current.click()}>
          <Icon name="add" />
          <input
            type="file"
            name="file"
            ref={fileInputRef}
            onChange={uploadMedia}
          />
        </Button>
        <Form onSubmit={handleSubmit} style={{ flexdirection: "column" }}>
          <Input
            fluid
            value={content}
            name="message"
            labelPosition="left"
            placeholder={`Message #${currentChannel.name}`}
            onChange={(event) => setContent(event.target.value)}
          />
        </Form>
      </Segment>
    </>
  );
};

export default ChatPanel;
