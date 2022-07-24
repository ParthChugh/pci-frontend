import { useState, useEffect, useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Image from 'next/image'
import InputBase from '@mui/material/InputBase';
import HeaderSearchDropdown from './headerSearchDropdown';
import IconButton from '@mui/material/IconButton';
import styles from 'styles/search.module.scss'

export default function Search(props) {
  const [showSearch, setShowSearch] = useState('none')
  const [searchText, setSearchText] = useState('')
  const wrapperRef = useRef(null);
  const onSearchFocus = () => {
    setShowSearch('')
    props.classToggle(false)
  }
  const onClick = (event) => {
    console.log('asdasd')
  }
  useEffect(() => {
    const handleClickOutsideForHeaderDropdown = (event) => {
      try {
        if (event.offsetX <= event.target.clientWidth && !wrapperRef?.current?.contains(event.target)) {
          setShowSearch('none')
        }
      } catch (error) {
        console.log('asdasdasd')
      }
    }
    document.addEventListener('click', handleClickOutsideForHeaderDropdown)

    return () => {
      document.removeEventListener('click', handleClickOutsideForHeaderDropdown)
    }
  })
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
    height: '48px',
    width: "100%",
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      width: '100%',
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),

    },
  }));
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    borderRadius: 12,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '60%',
    },
  }));

  const onTextChange = (event) => {
    setSearchText(event.target.value)
    // if (event.target.value.length > 3) {
    //   setShowSearch('')

    // } else {
    //   setShowSearch('none')
    // }
  }

  return (
    <Search className={styles['search-wrapper']}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <div className={styles["search-bar"]}>
        <StyledInputBase
          placeholder="I'm searching for…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchText}
          onChange={onTextChange}
          onFocus={onSearchFocus}
          endAdornment={
            searchText && <IconButton aria-label="delete" className={styles["search-button"]} onClick={onClick} disabled={!searchText}>
              <Image src="/icons/search.svg" alt="Instatram" width={24} height={24} />
            </IconButton>
          }
        />
        <HeaderSearchDropdown display={showSearch} headerRef={wrapperRef} />
      </div>

    </Search>
  )
}