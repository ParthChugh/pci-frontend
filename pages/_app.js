import 'styles/globals.scss'
import 'styles/bootstrap.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from 'components/layout/header'
import Footer from 'components/layout/footer';
import styles from '../styles/Home.module.css'

const MyApp = (props) => {
  const { Component, pageProps, props: { footer, header } } = props;
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
      <Header header={header} />
      <div className={styles.container}>
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </div>
      <Footer footer={footer} />
    </ThemeProvider>
  )

}

MyApp.getInitialProps = async (appContext) => {
  console.log("`${process.env.NEXT_PUBLIC_BASE_URL}/api/page_details`", `${process.env.NEXT_PUBLIC_BASE_URL}/api/page_details`)
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page_details`)
  const data = await response.json()
  return {
    props: {
      footer: data.footer || [],
      header: data.header
    }, // will be passed to the page component as props

  }
}
export default MyApp
