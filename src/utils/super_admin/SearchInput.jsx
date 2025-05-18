import React, { useEffect, useState } from 'react'
import { FormControl, InputAdornment, TextField, useTheme } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ searchWord, setSearchWord , phrasePlaceHolder  }) => {

  const [showClearIcon, setShowClearIcon] = useState("none");
  const theme = useTheme()

  const handleChange = (event) => {
    setSearchWord(event.target.value);
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };
  const handleClick = () => {
    setSearchWord("");
    setShowClearIcon("none");
  };


  return (
    <FormControl
    sx={{ mb: "20px", mr: "22px", bgcolor: "#FFF" , width:'100%' , bgcolor: theme.palette.background.default }}
    
  >
    <TextField
      size="small"
      variant="outlined"
      value={searchWord}
      onChange={handleChange}
      sx={{
        width: "100%",
        bgcolor: theme.palette.background.default,
       border: "none",
       outline: "none",
      }}
      className='rounded'
      placeholder={phrasePlaceHolder || "Search..."}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="end"
            style={{ display: showClearIcon, cursor: "pointer" }}
            onClick={handleClick}
          >
            <ClearIcon />
          </InputAdornment>
        ),
      }}
    />
  </FormControl>
  )
}

export default SearchInput