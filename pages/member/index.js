import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Member = () => {
  return (
    <div>
      {/* <page size="A4"></page> */}
      {/* <page size="A4"></page> */}
      {/* <page size="A4" layout="landscape"></page> */}
    </div>
  )
}

export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // userData: JSON.parse(req.cookies.userData || '{}')
    }, // will be passed to the page component as props

  }
}
export default Member
// export default 