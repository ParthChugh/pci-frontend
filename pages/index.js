import React from 'react';
import dynamic from "next/dynamic";
import { Button, Box, Link } from '@mui/material';
import { Typography } from '@mui/material'
import styles from 'styles/header.module.scss'
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import Search from 'components/header/search'
import Categories from 'views/categories'
import Products from 'views/products'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getUserDetails } from 'helpers/user'

const SlideCarousel = dynamic(() => import("components/common/slide-carousel"), { ssr: false });

function Homepage(props) {
  const router = useRouter();
  const { t } = useTranslation('common', { keyPrefix: "categories" });
  const isLoggedIn = Object.values(props.userData || {}).length > 0 ? !!props.userData : !(getUserDetails()).error
  const { contentAssets, products, categories } = props

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
  // console.log('products123123', products)

  return (
    <>
      {/* {isLoggedIn ? */}
        <>
          <Search classToggle={classToggle} />
          {contentAssets?.content_assets.map((asset, index) => {
            switch (asset.type) {
              // case "carousel":
              //   return (
              //     <SlideCarousel
              //       key={index}
              //       CAROUSEL={asset.data.item}
              //       style={{ width: '75%' }}
              //     />
              //   )
              case "category":
                return (
                  <Categories
                    key={index}
                    productCategories={categories?.data?.rows.filter((product, index) => index < 5)}
                    heading={asset.data.heading}
                    readMoreText={t("see-more")}
                    readMoreHref={asset.data.readMoreHref}
                  />
                )
              case "product":
                return (
                  <Products
                    key={index}
                    products={{ item: products?.data?.rows }}
                    heading={asset.data.heading}
                    readMoreText={t("see-more")}
                    readMoreHref={"/products/"}
                  />
                )
              case "promotion":
                return <div key={index} />
              default:
                return <div key={index} />
            }
          })}

        </>
        {/* :
        <>
          {(contentAssets?.content_assets || []).filter(asset => asset.type === "carousel").map((carousel, index) => {
            return (
              <SlideCarousel
                key={`carousel-${index}`}
                CAROUSEL={carousel.data.item}
                style={{ width: '75%' }}
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
        </> */}
      {/* } */}
    </>
  )
}

export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`)
  const data = await response.json()
  const categories = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/homeScreen/productCategory`)

  const products = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/homeScreen/product`)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      contentAssets: data || [],
      userData: JSON.parse(req.cookies.userData || '{}'),
      categories: await categories.json(),
      products: await products.json()
    }, // will be passed to the page component as props

  }
}
export default Homepage