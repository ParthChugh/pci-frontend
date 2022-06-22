import 'styles/globals.css'
import 'styles/bootstrap.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from 'components/layout/header'
import Footer from 'components/layout/footer';

const MyApp = (props) => {
  const { Component, pageProps, props: { footer } } = props;
  const theme = createTheme({
    components: {
      // Name of the component ⚛️
      MuiButtonBase: {
        defaultProps: {
          // The props to apply
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <Footer footer={footer} />
    </ThemeProvider>
  )

}

MyApp.getInitialProps = async (appContext) => {
  const response = await fetch(`${process.env.BASE_URL}/api/footer`)
  const data = await response.json()
  return {
    props: {
      footer: data || []
    }, // will be passed to the page component as props

  }
}
export default MyApp
