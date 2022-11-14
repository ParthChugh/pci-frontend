import Image from 'next/image'
import Link from 'next/link'
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTheme } from '@mui/material/styles';
import {getUserDetails} from 'helpers/user'
import * as React from 'react';

import {
  Container,
  Tooltip,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Slide,
  InputBase,
  Menu,
  MenuItem,
  Drawer,
} from '@mui/material';
import SearchBar from 'components/header/search-bar';

const ResponsiveAppBar = (props) => {
  console.log(props, 'hjeader')
  const { header = {} } = props;
  const {
    location = false,
    search = false,
    wishlist = false,
    cart = false,
    profile = false,
  } = header;
  const theme = useTheme();
  const isLoggedIn = !(getUserDetails()).error

  function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <a>
              <Image src="/icons/logo-v4.png" alt="Vercel Logo" width={86} height={42}  style={{ cursor: "pointer" }} />
            </a>
          </Link>
          
          <BurgerIcon handleOpenNavMenu={handleOpenNavMenu} anchorElNav={anchorElNav} handleCloseNavMenu={handleCloseNavMenu} />
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginX: 5 }}>
            {/* { location && <Location />}
            { search && 
              <Box sx={{ paddingY: 1, width: "75%", mx: 5 }}>
                <SearchBar />
              </Box>
            } */}
          </Box>

          {/* <User 
            handleOpenUserMenu={handleOpenUserMenu}     
            wishlist={wishlist}
            cart={cart}
            profile={profile}
          /> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const Location = () => {
  return (
    <Box sx={{ alignSelf: "center" }}>
      <Typography>Antar ke</Typography>
      <Typography fontWeight="bold">Jakarta Timuer</Typography>
    </Box>
  )
}

const User = (props) => {
  const { handleOpenUserMenu, wishlist, profile, cart } = props;
  return (
    <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row" }}>
      {
        wishlist &&
        <Tooltip title="wishlist">
          <IconButton sx={{ p: 0, display: { xs: 'none', md: 'flex' } }}>
            <Image src='/icons/heart.png' width={32} height={32}/>
          </IconButton>
        </Tooltip>
      }
      {
        cart && 
        <Tooltip title="cart">
          <IconButton sx={{ p: 0, marginX: 2, display: { xs: 'none', md: 'flex' } }}>
            <Image src='/icons/shopping-cart.png' width={32} height={32}/>
          </IconButton>
        </Tooltip>
      }
      {
        profile && 
        <Tooltip title="profile">
          <IconButton sx={{ p: 0 }}>
            <Image src="/icons/user.png" width={32} height={32} />
          </IconButton>
        </Tooltip>
      }
    </Box>
  )
}

const BurgerIcon = (props) => {
  const { handleOpenNavMenu, anchorElNav, handleCloseNavMenu } = props;
  const pages = ['Products', 'Pricing', 'Blog'];

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      {/* <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton> */}

      <Drawer
        id="menu-appbar"
        anchor="left"
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Drawer>
    </Box>
  )
}

export default ResponsiveAppBar;
