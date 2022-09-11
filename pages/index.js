import React from 'react';
import dynamic from "next/dynamic";
import { Button, Box, Link } from '@mui/material';
import { Typography } from '@mui/material'
import styles from 'styles/header.module.scss'
// import { useTheme } from '@mui/material/styles';
import { useRouter } from "next/router";
import BottomBar from 'components/common/bottomNavigation'
import Search from 'components/header/search'
import Categories from 'views/categories'
import Products from 'views/products'

const SlideCarousel = dynamic(() => import("components/common/slide-carousel"), { ssr: false });

function Homepage(props) {
  const router = useRouter();
  const isLoggedIn = true
  const { contentAssets } = props
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
    <>
      {isLoggedIn ?
        <>
          <Search classToggle={classToggle} />
          {contentAssets?.content_assets.map(asset => {
            console.log('asset.type12321', asset.type, asset.data)
            switch (asset.type) {
              case "carousel":
                return (
                  <SlideCarousel
                    CAROUSEL={asset.data}
                  />
                )
              case "category":
                return (
                  <Categories
                    productCategories={asset.data}
                    heading={asset.data.heading}
                    readMoreText={"Lihat semua"}
                    readMoreHref={asset.data.readMoreHref}
                  />
                )
              case "product":
                return (
                  <Products
                    products={asset.data}
                    heading={asset.data.heading}
                    readMoreText={"Lihat semua"}
                    readMoreHref={asset.data.readMoreHref}
                  />
                )
              case "promotion":
                return <div />
              default:
                return <div />

            }
          })}
          <BottomBar />
        </>
        :
        <>
          {(contentAssets?.content_assets || []).filter(asset => asset.type === "carousel").map(carousel => {
            return (
              <SlideCarousel
                CAROUSEL={carousel.data}
              />
            )
          })}

          <Typography component="h1" variant="h5" className={`${styles["compelete-heading"]} mt-3`}>
            Bangun properti impian Anda <br />
            dengan pengalaman baru
          </Typography>
          <Typography component="h1" variant="h5" className={`${styles['compelete-sub-heading']} mt-3`}>
            Tidak perlu lagi menghubungi berbagai<br />
            macam pemasok dan kirim berbagai barang
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Button
              onClick={() => { router.replace('/products') }}
              fullWidth
              className={'button-button'}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Belanja Sekarang
            </Button>
          </Box>
          <Typography component="h1" variant="h5" className={`${styles['compelete-sub-heading']} mt-3`}>
            Sudah punya akun?
            <Link color="primary" href="/login/" style={{ textDecoration: 'none' }}>{" Masuk"}</Link>
          </Typography>
          <BottomBar />
        </>
      }
    </>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`)
  const data = await response.json()
  return {
    props: {
      contentAssets: data || [],
    }, // will be passed to the page component as props

  }
}
export default Homepage