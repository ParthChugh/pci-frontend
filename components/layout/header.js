import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Image from 'next/image'
import Search from 'components/header/search'
import MenuIcon from '@mui/icons-material/Menu';
import ReactDOM from 'react-dom'
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link'
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import styles from 'styles/header.module.scss'

const pages = [{
  name: 'Login',
  href: '/login/'
}, {
  name: 'Sign Up',
  href: '/register/'
}, {
  name: 'Member Listing Page',
  href: '/member-page/'
}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = (props) => {
  const { header } = props;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  console.log('header12312', header)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

  const classToggle = (isMobile) => {
    // const element = document.getElementsByClassName('header-search-container')[0]
    if (isMobile) {
        // ReactDOM.findDOMNode(element).classList.add('search-suggestion-full')
        document.getElementById('header-wrapper').classList.add('stop-scroll')
        document.getElementById('q').focus()
    } else {
        // ReactDOM.findDOMNode(element).classList.remove('search-suggestion-full')
        document.getElementById('header-wrapper').classList.remove('stop-scroll')
    }
  }
  return (
    <HideOnScroll {...props}>
      <AppBar className={styles['header-root']} id="header-wrapper">
        <Container className={'main-content'} >
          <Toolbar disableGutters className={'d-flex justify-content-between'} style={{ flex: 1 }}>
            <div className='d-flex'>
              <div className={`mr-2 ${styles["show-on-tablet-or-higher"]}`}>
                <Image src="/icons/logo.svg" alt="Vercel Logo" width={48} height={48} />
              </div>
              <div className={`${styles['show-on-tablet-or-higher']} `}>
                <div className='d-flex align-items-center'>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    className={styles['logo-heading']}

                  >
                    {header.name}
                  </Typography>
                  
                </div>
              </div>
            </div>
            <Search classToggle={classToggle} />
            <div className='d-flex align-items-center'>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Link href={page.href} key={page}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                ))}
              </Box>

              {/* <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box> */}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
export default ResponsiveAppBar;