import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ReplyIcon from '@mui/icons-material/Reply';
import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@mui/material';

import axios from 'axios';

import Message from '@/components/Message';
import Toast from '@/components/Toast/Toast';
import { API_BASE_URL } from '@/config/config';
import { getCookie } from '@/utils/cookie';

import { PostItem } from '../TreeHole/TreeHole';

interface Comment {
  ID: number;
  NickName: string;
  Content: string;
  Children: Comment[];
}

const DetailMessage: React.FC = () => {
  const { pid } = useParams<{ pid: string }>();

  // const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<PostItem>();
  const [newComment, setNewComment] = useState<string>('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyToNickname, setReplyToNickname] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('error');

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() != '') {
      var post_id = 0;
      if (pid != undefined) {
        post_id = +pid;
      }
      var postData = {
        pid: post_id,
        reply_to_cid: 0,
        content: newComment,
      };

      if (replyTo != null) {
        postData.reply_to_cid = replyTo;
      }

      let config = {
        headers: {
          token: getCookie('token'),
        },
      };
      axios
        .post(`${API_BASE_URL}/comment/create`, postData, config)
        .then((res) => {
          // console.log("RESPONSE RECEIVED: ", res);
          listCommentsById();
          setNewComment('');
          setReplyTo(null);
          setMessage('发表成功！');
          setSeverity('success');
          setOpen(true);
        })
        .catch((err) => {
          // console.log("AXIOS ERROR: ", err);
          // TODO: Toast Error
          setMessage(err);
          setSeverity('error');
          setOpen(true);
        });
    }
  };

  const getPostById = () => {
    axios
      .get(`${API_BASE_URL}/post/get`, {
        params: {
          id: pid,
        },
        headers: { token: getCookie('token') },
      })
      .then(
        (response) => {
          // console.log(response.data)
          setPost(response.data);
        },
        (error) => {
          console.log('[DEBUG] TODO', error);
        },
      );
  };

  const listCommentsById = () => {
    axios
      .get(`${API_BASE_URL}/comment/list`, {
        params: {
          id: pid,
        },
        headers: { token: getCookie('token') },
      })
      .then(
        (response) => {
          console.log(response.data);
          setComments(response.data.data);
        },
        (error) => {
          console.log('[DEBUG] TODO', error);
        },
      );
  };

  useEffect(() => {
    getPostById();
    listCommentsById();
  }, []);

  // const addNestedComment = (
  //   comments: Comment[],
  //   parentId: number,
  //   newComment: Comment,
  // ): Comment[] => {
  //   return comments.map((comment) => {
  //     if (comment.id === parentId) {
  //       return { ...comment, children: [...comment.children, newComment] };
  //     } else if (comment.children.length > 0) {
  //       return { ...comment, children: addNestedComment(comment.children, parentId, newComment) };
  //     }
  //     return comment;
  //   });
  // };

  const handleReply = (id: number, nickname: string) => {
    setReplyTo(id);
    setReplyToNickname(nickname);
  };

  const renderComments = (comments: Comment[], replyTo: string): React.ReactNode => {
    return comments.map((comment) => (
      <List key={comment.ID} style={{ marginLeft: replyTo != '' ? '20px' : '0' }}>
        <ListItem>
          <ListItemText
            primary={comment.NickName + (replyTo == '' ? '' : ' Reply ' + replyTo)}
            secondary={comment.Content}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="reply"
              onClick={() => handleReply(comment.ID, comment.NickName)}
            >
              <ReplyIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {comment.Children &&
          comment.Children.length > 0 &&
          renderComments(comment.Children, comment.NickName)}
      </List>
    ));
  };

  return (
    <React.Fragment>
      {post && (
        <Container>
          <Box sx={{ paddingTop: '20px' }} />
          <Message
            post={post}
            handleClick={() => {
              console.log(replyTo);
              setReplyTo(null);
            }}
          />
          <Card>{renderComments(comments, '')}</Card>
          <TextField
            label={replyTo ? 'Reply to ' + replyToNickname : 'Say something'}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={newComment}
            onChange={handleCommentChange}
            style={{ marginTop: '20px' }}
          />
          <Button variant="contained" color="info" fullWidth onClick={handleCommentSubmit}>
            Submit
          </Button>
        </Container>
      )}
      <Toast open={open} message={message} severity={severity} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default DetailMessage;
