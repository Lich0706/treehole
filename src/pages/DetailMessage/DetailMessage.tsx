import React, { useState } from 'react';
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

import Message from '@/components/Message';

interface Comment {
  id: number;
  nickname: string;
  content: string;
  children: Comment[];
}

const DetailMessage: React.FC = () => {
  // const { pid } = useParams<{ pid: string }>();
  const cardInfo = { pid: 2, content: 'This is the second content', date: '2024-06-01' };

  // const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyToNickname, setReplyToNickname] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      nickname: 'A',
      content: 'This is the first comment.',
      children: [
        {
          id: 2,
          nickname: 'AA',
          content: 'This is a reply to the first comment.',
          children: [
            {
              id: 3,
              content: 'This is a nested reply to the first reply.',
              children: [],
              nickname: 'AAA',
            },
          ],
        },
      ],
    },
    {
      id: 4,
      nickname: 'B',
      content: 'This is the second top-level comment.',
      children: [],
    },
    {
      id: 5,
      nickname: 'C',
      content: 'This is the third top-level comment.',
      children: [
        {
          id: 6,
          nickname: 'CA',
          content: 'This is a reply to the third top-level comment.',
          children: [],
        },
      ],
    },
  ]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      const newCommentObj: Comment = {
        id: Date.now(),
        nickname: 'Random',
        content: newComment,
        children: [],
      };

      if (replyTo === null) {
        setComments([...comments, newCommentObj]);
      } else {
        setComments(addNestedComment(comments, replyTo, newCommentObj));
      }

      setNewComment('');
      setReplyTo(null);
    }
  };

  const addNestedComment = (
    comments: Comment[],
    parentId: number,
    newComment: Comment,
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, children: [...comment.children, newComment] };
      } else if (comment.children.length > 0) {
        return { ...comment, children: addNestedComment(comment.children, parentId, newComment) };
      }
      return comment;
    });
  };

  const handleReply = (id: number, nickname: string) => {
    setReplyTo(id);
    setReplyToNickname(nickname);
  };

  const renderComments = (comments: Comment[], level: number): React.ReactNode => {
    return comments.map((comment) => (
      <List key={comment.id} style={{ marginLeft: `${20 * level}px` }}>
        <ListItem>
          <ListItemText
            primary={comment.nickname}
            secondary={comment.content + ' ' + comment.children.length}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="reply"
              onClick={() => handleReply(comment.id, comment.nickname)}
            >
              <ReplyIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {comment.children.length > 0 && renderComments(comment.children, level + 1)}
      </List>
    ));
  };

  return (
    <React.Fragment>
      <Container>
        <Box sx={{ paddingTop: '20px' }} />
        <Message
          post={cardInfo}
          handleClick={() => {
            console.log(replyTo);
            setReplyTo(null);
          }}
        />
        <Card>{renderComments(comments, 0)}</Card>
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
    </React.Fragment>
  );
};

export default DetailMessage;
