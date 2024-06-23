import React from 'react';

import { PostItem } from '@/pages/TreeHole/TreeHole';

import Message from '../Message';

interface Props {
  results: PostItem[];
}

const MessageList: React.FC<Props> = ({ results }) => {
  return (
    <React.Fragment>
      {results.map((item: PostItem) => (
        <Message key={item.ID} post={item} />
      ))}
    </React.Fragment>
  );
};

export default MessageList;
