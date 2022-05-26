import React from 'react';
import moment from 'moment';
import styles from './messages.module.css';
import { Comment, Image } from 'semantic-ui-react';

const Message = ({ message }) => {
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  const isMedia = (message) => message.hasOwnProperty('image');

  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content>
        <Comment.Author as='a'>{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        {isMedia(message) ? (
          <a href={message.image} target='_blank' className={styles.image}>
            <Image src={message.image} style={{ width: '250px' }} />
          </a>
        ) : (
          <Comment.Text>{message.content}</Comment.Text>
        )}
      </Comment.Content>
    </Comment>
  );
};

export default Message;
