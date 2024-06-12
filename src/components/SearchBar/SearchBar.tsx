import * as React from 'react';
import { ChangeEvent, FC } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from '@mui/icons-material/Sync';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

interface SearchBoxProps {
  onSearch: (term: string) => void;
  onRefresh: () => void;
}

const SearchBar: FC<SearchBoxProps> = ({ onSearch, onRefresh }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // onSearch(event.target.value);
  };

  return (
    <Paper
      component="form"
      variant="outlined"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '0.8ww' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="搜索"
        value={searchTerm}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={() => onSearch(searchTerm)}
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: '10px' }} aria-label="directions" onClick={() => onRefresh()}>
        <SyncIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
