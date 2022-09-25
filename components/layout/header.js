import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Image from 'next/image'
import Container from '@mui/material/Container';
import Link from 'next/link'
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import styles from 'styles/header.module.scss'
import { useTheme } from '@mui/material/styles';
import {getUserDetails} from 'helpers/user'

const ResponsiveAppBar = (props) => {
  const { header } = props;
  const theme = useTheme();
  const isLoggedIn = !(getUserDetails()).error
  const icons = (header?.icons || []).filter(el => el.isLoggedIn === isLoggedIn)
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

  return (
    <HideOnScroll {...props}>
      <AppBar className={styles['header-root']} id="header-wrapper ">
        <Container className={'main-content'} id="__next" >
          <Toolbar disableGutters className={'d-flex justify-content-between'} style={{ flex: 1 }}>
            <div className='d-flex'>
              <div className={`mr-2 ml-2`}>
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
            <div className='d-flex flex-row '>
              {(icons || []).map((page, index) => {
                return (
                  <Link href={page.href} key={index}>
                    <a style={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: 16, marginRight: 10 }} >
                      {
                        page.icon ?
                          <Badge color="primary" variant="dot" badgeContent={page.showBadge || 0} >
                            <Image src={page.icon} alt={page.name} width={20} height={20} style={{ cursor: 'pointer' }} />
                          </Badge>
                          :
                          page.name
                      }
                    </a>
                  </Link>
                )
              })}
            </div>

          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
export default ResponsiveAppBar;