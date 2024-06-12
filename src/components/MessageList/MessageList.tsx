import React from 'react';

import Message from '../Message';

interface Props {
  results: any;
}

const MessageList: React.FC<Props> = ({ results }) => {
  return (
    <React.Fragment>
      {results.map((item: any) => (
        <Message key={item.pid} post={item} />
      ))}
    </React.Fragment>
  );
};

export default MessageList;
