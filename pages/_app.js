import 'styles/globals.css'
import 'styles/bootstrap.css'
import App from "next/app";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from 'components/layout/header'
import Footer from 'components/layout/footer'

class MyApp extends App {
  static async getInitialProps(appContext) {
    const response = await fetch(`${process.env.BASE_URL}/api/footer`)
    const data = await response.json()
    return {
      props: {
        footer: data || []
      }, // will be passed to the page component as props
  
    }
  }
  render() {
    const { Component, pageProps, props: {footer} } = this.props;
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
}

export default MyApp
