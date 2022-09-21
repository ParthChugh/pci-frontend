import React from 'react';
import dynamic from "next/dynamic";
import { Button, Box, Link } from '@mui/material';
import { Typography } from '@mui/material'
import styles from 'styles/header.module.scss'
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import BottomBar from 'components/common/bottomNavigation'
import Search from 'components/header/search'
import Categories from 'views/categories'
import Products from 'views/products'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SlideCarousel = dynamic(() => import("components/common/slide-carousel"), { ssr: false });

function Homepage(props) {
  const router = useRouter();
  const { t } = useTranslation('common', { keyPrefix: "categories" });
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
          {contentAssets?.content_assets.map((asset, index) => {
            switch (asset.type) {
              case "carousel":
                return (
                  <SlideCarousel
                    key={index}
                    CAROUSEL={asset.data}
                  />
                )
              case "category":
                return (
                  <Categories
                    key={index}
                    productCategories={asset.data}
                    heading={asset.data.heading}
                    readMoreText={t("see-more")}
                    readMoreHref={asset.data.readMoreHref}
                  />
                )
              case "product":
                return (
                  <Products
                    key={index}
                    products={asset.data}
                    heading={asset.data.heading}
                    readMoreText={t("see-more")}
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
            {t("main-heading")}
          </Typography>
          <Typography component="h1" variant="h5" className={`${styles['compelete-sub-heading']} mt-3`}>
            {t("sub-heading")}
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
              {t('shop-now')}
            </Button>
          </Box>
          <Typography component="h1" variant="h5" className={`${styles['compelete-sub-heading']} mt-3`}>
            {t('already-have-account')}
            <Link color="primary" href="/login/" style={{ textDecoration: 'none' }}>{" Masuk"}</Link>
          </Typography>
          <BottomBar />
        </>
      }
    </>
  )
}

export async function getServerSideProps({ locale }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      contentAssets: data || [],
    }, // will be passed to the page component as props

  }
}
export default Homepage