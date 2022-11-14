import 'styles/globals.scss'
import 'styles/bootstrap.css'
import { ThemeProvider } from '@mui/material/styles'
import Footer from 'components/layout/footer';
import styles from 'styles/Home.module.scss'
import { SnackbarProvider } from 'notistack';
import { UserProvider } from 'context/users/reducer';
import dynamic from "next/dynamic";
import WhatsappFloat from 'components/common/whatsapp'
import { appWithTranslation } from 'next-i18next';
import { Container, Grid } from '@mui/material';
import { theme } from 'utils/theme';

const Header = dynamic(() => import("components/layout/header"), { ssr: false });
function MyApp(props) {
  const { Component, pageProps, props: { footer, header } } = props;

  return (
    <UserProvider>
      <SnackbarProvider
        maxSnack={3}
      >
        <ThemeProvider theme={theme}>
          <Header header={header} />
          <Container maxWidth="lg">
            <Grid container className={styles.main} rowSpacing={5}>
              <Component {...pageProps} />
            </Grid>
          </Container>
            {/* <WhatsappFloat /> */}
          <Container maxWidth="lg" className='mt-5'>
            <Footer footer={footer} />
          </Container>
        </ThemeProvider>
      </SnackbarProvider>
    </UserProvider>
  );
}


MyApp.getInitialProps = async (props) => {
  const route = props.router.route;
  const footerResp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/footer`);
  const dataFooter = await footerResp.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api${route}`);
  const data = await response.json();
  return {
    props: {
      footer: dataFooter,
      header: data.header,
    }, // will be passed to the page component as props
  }
}
export default appWithTranslation(MyApp)
