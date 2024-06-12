import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface Props {
  post: any;
  handleClick?: () => void;
}

const Message: React.FC<Props> = ({ post, handleClick }) => {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/post/${id}`);
  };
  const regex = /#(\d+)(?=\s|$)/g;
  const parts = post.content.split(regex);

  const card = (
    <React.Fragment>
      <CardContent onClick={handleClick}>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          onClick={() => handleCardClick(post.pid)}
        >
          #{post.pid}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {parts.map((part: string, index: number) => {
            // Check if the part matches the digit pattern
            if (/^\d+$/.test(part)) {
              // If it matches, return a link
              return (
                <Link key={index} to={`/post/${part}`}>
                  #{part}
                </Link>
              );
            } else {
              // Otherwise, return the text part
              return part;
            }
          })}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {post.date}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return <Card variant="outlined">{card}</Card>;
};

export default Message;
