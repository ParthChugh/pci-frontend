import 'styles/globals.scss'
import 'styles/bootstrap.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import Footer from 'components/layout/footer';
import styles from 'styles/Home.module.css'
import { SnackbarProvider } from 'notistack';
import { UserProvider } from 'context/users/reducer';
import BottomBar from 'components/common/bottomNavigation'
import dynamic from "next/dynamic";
import WhatsappFloat from 'components/common/whatsapp'
import { appWithTranslation } from 'next-i18next';
import Loader from 'components/common/loader'

const Header = dynamic(() => import("components/layout/header"), { ssr: false });
function MyApp(props) {
  const { Component, pageProps } = props;
  const theme = createTheme({
    palette: {
      primary: {
        // main_900: '#620F0F',
        // main_800: "#8D1717",
        // main_700: "#B91E1E",
        // main_600: "#E52525",
        main: "#EA5151",
        // main_400: "#EF7C7C",
        // main_300: "#F5A8A8",
        main_200: "#F7BEBE",
        // main_100: "#FAD3D3",
      },
      secondary: {
        // main_900: '#665300',
        // main_800: "#997C00",
        // main_700: "#CCA600",
        main_600: "#FFCF00",
        main: "#FFD933",
        // main_400: "#FFE266",
        // main_300: "#FFEC99",
        // main_200: "#FFF1B2",
        // main_100: "#EBFCD0",
      },
      neutralLight: {
        // main_900: '#CED1D9',
        // main_800: "#FCFDFE",
        main_700: "#F9FBFD",
        main_600: "#F6F8FC",
        main: "#F3F6FB",
        // main_400: "#ECF2F8",
        // main_300: "#E6EDF6",
        // main_200: "#BCCBDD",
        // main_100: "#98ADC5",
      },
      neutralDark: {
        // main_900: '#1C295D',
        // main_800: "#1C295D",
        // main_700: "#0F1632",
        main_600: "#010206",
        main: "#010205",
        // main_400: "#010104",
        // main_300: "#000102",
        // main_200: "#000001",
        // main_100: "#000000",
      }
    },
    components: {
      // Name of the component ⚛️
      typography: {
        fontFamily: 'Montserrat',
      },

      MuiButtonBase: {
        defaultProps: {
          // The props to apply
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
    },
  });
  return (
    <UserProvider>
      <SnackbarProvider
        maxSnack={3}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Loader />
          <Header header={props?.props?.header || {}} />
          <div className={styles.container} id="root">
            <main className={styles.main}>
              <Component {...pageProps} />
              <WhatsappFloat />
            </main>
          </div>
          <Footer footer={props?.props?.footer || []} />
          <BottomBar />
        </ThemeProvider>
      </SnackbarProvider>
    </UserProvider>

  );
}


MyApp.getInitialProps = async ({ req }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page_details`)
  const data = await response.json()
  return {
    props: {
      footer: data.footer || [],
      header: data.header,
    }, // will be passed to the page component as props

  }
}
export default appWithTranslation(MyApp)
