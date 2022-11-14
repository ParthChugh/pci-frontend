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

  }
  useEffect(() => {
    const handleClickOutsideForHeaderDropdown = (event) => {
      if (event.offsetX <= event.target.clientWidth && !wrapperRef?.current?.contains(event.target)) {
        setShowSearch('none')
      }
    }
    document.addEventListener('click', handleClickOutsideForHeaderDropdown)
    return () => {
      document.removeEventListener('click', handleClickOutsideForHeaderDropdown)
    }
  })

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    height: '48px',
    width: "100%",
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      width: '100%',
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
  }

  return (
    <div className='d-flex' style={{ width: '90%' }}>
      <Search className={styles['search-wrapper']}>
        <div className={styles["search-bar"]}>
          <StyledInputBase
            autoFocus={!showSearch}
            placeholder="Saya sedang mencari"
            
            inputProps={{ 'aria-label': 'search' }}
            value={searchText}
            onChange={onTextChange}
            onFocus={onSearchFocus}
            startAdornment={
              <IconButton aria-label="delete" className={styles["search-button"]} onClick={onClick} disabled={!searchText}>
                <Image src="/icons/search.svg" alt="search" width={24} height={24} />
              </IconButton>
            }
          />

          {/* <HeaderSearchDropdown display={showSearch} headerRef={wrapperRef} /> */}
        </div>

      </Search>
      <IconButton aria-label="delete" className={`${styles["filter-button"]} ml-2`} style={{width: '15%'}}>
        <Image src="/icons/filter.svg" alt="filter" width={24} height={24} />
      </IconButton>
    </div>

  )
}