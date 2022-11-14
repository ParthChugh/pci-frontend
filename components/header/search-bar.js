import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import { useRouter } from 'next/router';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.placeholder,
  // '&:hover': {
  //   backgroundColor: theme.palette.darkPlaceholder,
  // },
	// '&:focust': {
	// 	backgroundColor: theme.palette.darkPlaceholder,
	// },
  width: '100%',
  
  // alignItems: 'center',
  // alignContent: 'center',
  // justifyContent: 'center'
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
  // color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '40px'
    // [theme.breakpoints.up('md')]: {
    //   width: '20ch',
    // },
  },
}));

const SearchBar = () => {
	const [search, setSearch] = React.useState(null);
	const router = useRouter();

	const onKeyPress = (event) => {
		if (event.keyCode == 13){
			router.query.search = search
			router.push(router)  
		}
	}

	const onChange = (e) => {
		setSearch(e.target.value);
	}

	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{ 'aria-label': 'search' }}
				fullWidth
				onKeyDown={onKeyPress}
				onChange={onChange}
			/>
		</Search>
	)
}

export default SearchBar