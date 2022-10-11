import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Image from 'next/image'
import Container from '@mui/material/Container';
import Link from 'next/link'
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import styles from 'styles/header.module.scss'
import { useTheme } from '@mui/material/styles';
import { getUserDetails } from 'helpers/user'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from "next/router";
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie'
import { useEffect } from 'react';

const ResponsiveAppBar = (props) => {
  const { header } = props;
  const theme = useTheme();
  const router = useRouter();
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
  const myAddress = JSON.parse(Cookies.get('defaultAddress') || '{}')
  const userData = getUserDetails()
  const getMyAddresses = () => {
    // const addresses = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/address`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     "Authorization": `Bearer ${userData?.accessToken}`
    //   },
    // })
    console.log('dqwdqwdwq')
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/address`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userData.accessToken}`
      },
    })
      .then((response) => {
        console.log('response213123', response?.data?.data?.rows)
        if (typeof response?.data?.data?.rows?.[0] !== 'undefined') {
          Cookies.set('defaultAddress', JSON.stringify(response?.data?.data?.rows?.[0]), { expires: new Date(userData.accessTokenExpiry) })
        }
      })
      .catch((error) => {
        props.enqueueSnackbar(error?.response?.data?.message)
      });;
  }
  useEffect(() => {
    if (isLoggedIn && typeof Cookies.get('defaultAddress') === 'undefined') {
      getMyAddresses()
    }
  }, [JSON.stringify(isLoggedIn)])

  return (
    <HideOnScroll {...props}>
      <AppBar className={styles['header-root']} id="header-wrapper ">
        <Container className={'main-content'} id="__next" >
          <Toolbar disableGutters className={'d-flex justify-content-between'} style={{ flex: 1 }}>
            <div className='d-flex'>
              <div className={`mr-2 ml-2 d-flex align-items-center`}>
                <Link href={'/'}>
                  <Image src="/icons/logo.svg" alt="Vercel Logo" width={48} height={48} style={{ cursor: 'pointer' }} />
                </Link>
                {isLoggedIn &&
                  <Typography component="div" className={`${styles['delivers-to-component']} d-flex flex-column ml-2`} >
                    <Typography component="span" className={`${styles['delivers-to-heading']}`}>Antar ke</Typography>
                    <Typography component="div" className='d-flex flex-row align-items-center'>
                      <Typography component="span" className={`${styles['delivers-to-sub-heading']}`} style={{ cursor: 'pointer' }} onClick={() => {
                        if (Object.values(myAddress).length > 0) {
                          router.push('/my-addresses')
                        } else {
                          router.push('/my-addresses/new')
                        }
                      }}>
                        {Object.values(myAddress).length > 0 ? `${myAddress.name} - ${myAddress.line1}` : "Please enter an address"}

                      </Typography>
                      <IconButton
                        aria-label="open-address"
                        onClick={() => {
                          if (Object.values(myAddress).length > 0) {
                            router.push('/my-addresses')
                          } else {
                            router.push('/my-addresses/new')
                          }
                        }}
                        className="ml-2"
                        style={{ width: 10, height: 5 }}
                        sx={{
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Typography>

                  </Typography>
                }

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
export default withSnackbar(ResponsiveAppBar)