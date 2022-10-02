import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Profile() {
  return (
    <>
    </>
  )
}
export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      userData: JSON.parse(req.cookies.userData || '{}')
    }, // will be passed to the page component as props

  }
}
export default Profile