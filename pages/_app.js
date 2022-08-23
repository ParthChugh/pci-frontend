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
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/page_details`)
    const data = await response.json()
    return {
      props: {
        footer: data.footer || [],
        header: data.header
      }, // will be passed to the page component as props

    }
  } catch (error) {
    return {
      props: {
        footer: [
          {
            title: "Market Place",
            items: [
              {
                title: "All NFts",
                href: "/search?q=nfts"
              },
              {
                title: "Art",
                href: "/search?q=art"
              },
              {
                title: "Collectibles",
                href: "/search?q=collectibles"
              },
              {
                title: "Domain Names",
                href: "/search?q=domain+names"
              },
              {
                title: "Music",
                href: "/search?q=music",
              },
              {
                title: "Photogrpahy",
                href: "/search?q=photogrpahy",
              },
              {
                title: "Virtual Cards",
                href: "/search?q=virtual+cards",
              },
              {
                title: "Trading Cards",
                href: "/search?q=trading+cards",
              },
              {
                title: "Utilities",
                href: "/search?q=utilities",
              }
            ]
          },
          {
            title: "My Account",
            items: [
              {
                title: "Profile",
                href: "/profile"
              },
              {
                title: "My Favorurites",
                href: "/my+favorurites"
              },
              {
                title: "My Collection",
                href: "/my+collection"
              },
              {
                title: "Settings",
                href: "/settings"
              }
            ]
          },
          {
            title: "Resources",
            items: [
              {
                title: "Help Center",
                href: "/help"
              },
              {
                title: "Platform Status",
                href: "/help/platform-status"
              },
              {
                title: "Gas-Free Marketplace",
                href: "/help/gas-free-Marketplace"
              },
              {
                title: "Blog",
                href: "/help/blog"
              },
              {
                title: "Docs",
                href: "/help/docs"
              },
              {
                title: "Newsletter",
                href: "/help/newsletter"
              },
            ]
          },
          {
            title: "Company",
            items: [
              {
                title: "About",
                href: "/help/about"
              },
              {
                title: "Careers",
                href: "/help/careers"
              },
            ]
          }
        ],
        header: {
          "logo": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png",
          "name": "Open Throne",
          "header_types": {
            "texts": [
              {
                "name": "Resources",
                "isDropdown": true,
                "types": [
                  {
                    "name": "Help Center",
                    "icon": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png",
                    "href": "/help/center/",
                    "tooltip": "Help Center"
                  },
                  {
                    "name": "Platform Status",
                    "icon": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png",
                    "href": "/help/platform-status/",
                    "tooltip": "Platform Status"
                  }
                ]
              },
              {
                "name": "Explore",
                "href": "products/"
              }
            ],
            "icons": [
              {
                "name": "Profile",
                "href": "profile/",
                "tooltip": "Profile check",
                "icon": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png"
              },
              {
                "name": "Wallet",
                "href": "walltet/",
                "tooltip": "Wallet",
                "icon": "https://cdn-icons-png.flaticon.com/512/1336/1336498.png"
              }
            ]
          }
        }
      }, // will be passed to the page component as props
    }
  }

}
export default MyApp
