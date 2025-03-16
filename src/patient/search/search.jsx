import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search'; 
import { Input, Box, IconButton } from '@mui/material';

const SearchComponent = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={toggleSearch} >
        <SearchIcon  style={{color:'#ffff'}}/>
      </IconButton>

      {showSearch && (
        <Input
          type="text"
          placeholder="search..."
          sx={{
            marginLeft: '10px',
            padding: '5px',
            border: '1px  #ff5d22',
            borderRadius: '5px',
            background: 'rgba(0.9, 0, 0, 0)'
          }}
        />
      )}
    </Box>
  );
};

export default SearchComponent;
