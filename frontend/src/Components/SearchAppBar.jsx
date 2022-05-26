import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {useState,useEffect} from 'react';
import {SearchResult} from './SearchResult'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export function SearchAppBar() {

  const navigate = useNavigate()
  const [searchShow , setSearchShow] = useState(false)
  const [value,setValue] = useState([])

  const searchWord = (e) =>{
    // console.log(e.target.value)
     setSearchShow(true)
     axios.get("https://vocabulary-app-065.herokuapp.com/dict").then((response) =>{
      //  console.log(response.data)
       let result = response.data;
       let ans = result.filter((element)=>{
         let word = e.target.value;
         word = word.toLowerCase();
         return element.word.includes(word)
       })
       setValue(ans);
      //  console.log(ans)
     })
  }

  const debounce = (func,delay) =>{
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
          func.apply(this, args);
      }, delay);
    };
  }

  const optimise = debounce(searchWord,500)

  return (
    <>
    {searchShow?<SearchResult searchShow={searchShow} setSearchShow={setSearchShow} value={value} />:""}
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{backgroundColor: '#4d0b43' , position: 'fixed' , top: '0px'}} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() =>{navigate("/")}}
          >
            Vocab
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          
          </Typography>
          <Search onChange={optimise} >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}
