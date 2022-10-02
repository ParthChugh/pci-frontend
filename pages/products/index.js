import React from 'react';
import { useTranslation } from 'next-i18next';
import Categories from 'views/categories'
import Products from 'views/products'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Search from 'components/header/search'

function RenderProducts(props) {
  const { t } = useTranslation('common', { keyPrefix: "categories" });
  const { contentAssets, products } = props
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
      <Search classToggle={classToggle} />
      {contentAssets?.content_assets.map((asset, index) => {
        switch (asset.type) {
          case "category":
            return (
              <Categories
                key={index}
                productCategories={products?.data?.rows.filter((product, index) => index < 4)}
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
                readMoreHref={asset.data.readMoreHref}
              />
            )
          case "promotion":
            return <div key={index} />
          default:
            return <div key={index} />
        }
      })}
    </>
  )
}

export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`)
  const products = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/website/homeScreen/productCategory`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      contentAssets: data || [],
      userData: JSON.parse(req.cookies.userData || '{}'),
      products: await products.json()
    }, // will be passed to the page component as props

  }
}
export default RenderProducts