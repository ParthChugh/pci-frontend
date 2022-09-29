import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
function Category(props) {
  return (
    <>
    </>
  )
}

export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      contentAssets: data || [],
      userData: JSON.parse(req.cookies.userData || '{}')
    }, // will be passed to the page component as props

  }
}
export default Category