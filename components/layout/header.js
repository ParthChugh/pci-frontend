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
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();
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
              <div className={`mr-2`}>
                <Link href={'/'}>
                  <Image src="/icons/logo.svg" alt="Vercel Logo" width={48} height={48} style={{ cursor: 'pointer' }} />
                </Link>
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
            {(header.icons || []).map((page, index) => (
              <Link href={page.href} key={index}>
                <a style={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: 16, }} >
                  {page.name}
                </a>

              </Link>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
export default ResponsiveAppBar;