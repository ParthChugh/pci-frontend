import { useEffect, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import Categories from 'views/categories'
import Products from 'views/products'
import { UserContext } from 'context/users/reducer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Search from 'components/header/search'
import Filter from 'components/common/filter'
import { Box, Typography, Container } from '@mui/material';
import Link from "next/link";
import styles from 'styles/header.module.scss'
import { useRouter } from "next/router";
import ProductSkeleton from 'components/common/skeleton'
import * as UserActions from 'context/users/actions'

function RenderProducts(props) {
  const { t } = useTranslation('common', { keyPrefix: "categories" });
  const router = useRouter()
  const { contentAssets, products, categories } = props

  const {
    userState,
    userDispatch,
  } = useContext(UserContext);
  const cachedProducts = userState.products[router.query.categoryId] || products[router.query.categoryId]
  // console.log("cachedProducts1231232112321", userState.products)
  // console.log("cachedProducts12312321", products[router.query.categoryId])

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
  useEffect(() => {
    if (JSON.stringify(products?.[router.query.categoryId] || {}).length > 0) {
      userDispatch(UserActions.updateProducts({ products: products[router.query.categoryId], categoryId: router.query.categoryId }))
    }
  }, [JSON.stringify(products?.[router.query.categoryId] || {})])
  console.log("cachedProducts?.[router?.query?.page || 1]?.total_page", cachedProducts?.[router?.query?.page || 1]?.total_page)
  return (
    <Container component="main" maxWidth="xs">
      <Search classToggle={classToggle} />
      <Filter />
      {contentAssets?.content_assets.map((asset, index) => {
        switch (asset.type) {
          case "category":
            return (
              <Categories
                key={index}
                productCategories={categories?.data?.rows}
                heading={asset.data.heading}
                readMoreText={t("see-more")}
                readMoreHref={asset.data.readMoreHref}
                isScroll
              />
            )
          case "product":
            return (
              <Box component={"div"} margin={`30px 20px 0px 20px`}>
                <Box>
                  {typeof cachedProducts?.[1] === 'undefined' &&
                    <Typography>
                      {`You've arrived in the middle of a list! You can scroll as normal or `}<Link
                        href={router.pathname}
                        style={{ textDecoration: 'underline' }}
                        onClick={() => {
                          userDispatch(UserActions.updateProducts({ categoryId: router.query.categoryId, clear: true }))
                        }}
                      >
                        {`browse from the start`}
                      </Link>
                    </Typography>
                  }
                </Box>
                <Box component={"div"}>
                  {Object.values(cachedProducts || {}).map((pageProducts, elindex) => (
                    <Products
                      key={elindex}
                      products={{ item: pageProducts?.data?.rows }}
                      heading={elindex === 0 ? asset.data.heading : ""}
                    />
                  ))}
                </Box>
                {typeof cachedProducts?.[router?.query?.page || 1] === 'undefined' &&
                  <Box component={"div"}>
                    <ProductSkeleton data={Array.from(new Array(20))} />
                  </Box>
                }
                {typeof cachedProducts?.[router?.query?.page || 1] !== 'undefined' && cachedProducts?.[router?.query?.page || 1]?.data?.total_page > (router?.query?.page || 1) &&
                  <Typography component="div" className={`${styles['buy-now-button']} mb-3 mt-3`} style={{ cursor: 'pointer' }} onClick={() => {
                    router.replace({
                      pathname: router.pathname,
                      query: { ...router.query, page: (parseInt(router.query.page) || 1) + 1 }
                    }, undefined, { scroll: false })
                  }}>
                    Load More
                  </Typography>
                }
              </Box>

            )
          case "promotion":
            return <div key={index} />
          default:
            return <div key={index} />
        }
      })}
    </Container>
  )
}
export async function getServerSideProps(appContext) {
  const { locale, req, query, params } = appContext
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
  const categories = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/homeScreen/productCategory`)
  const products = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/homeScreen/product?page=${query?.page || 1}${params.categoryId ? `&query=ProductCategoryId=${params.categoryId}` : ""}`)
  const productsResponse = await products.json()
  const data = await response.json()
  if (productsResponse?.data?.rows?.length === 0 || products?.data?.total_page < (query?.page || 1)) {
    return {
      redirect: {
        permanent: false,
        destination: "/products/"
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      contentAssets: data || [],
      userData: JSON.parse(req.cookies.userData || '{}'),
      categories: await categories.json(),
      products: { [params.categoryId]: { [query?.page || 1]: productsResponse } }
    }, // will be passed to the page component as props

  }
}
export default RenderProducts