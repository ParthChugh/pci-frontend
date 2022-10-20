import React from 'react';
import { useTranslation } from 'next-i18next';
import Container from '@mui/material/Container';
import Categories from 'views/categories'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Homepage(props) {
  const { t } = useTranslation('common', { keyPrefix: "categories" });
  const { categories } = props

  return (
    <Container component="main" maxWidth="xs">
      <Categories
        productCategories={categories?.data?.rows}
        heading={"Kategori Produk"}
      />
    </Container>
  )
}

export async function getServerSideProps(appContext) {
  const { locale } = appContext
  const categories = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/homeScreen/productCategory`)
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      categories: await categories.json(),
    }, // will be passed to the page component as props

  }
}
export default Homepage