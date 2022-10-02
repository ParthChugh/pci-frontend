import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from 'styles/header.module.scss'

const CustomerService = (props) => {
  const { data } = props;
  const router = useRouter()
  console.log('data123123', router.query)

  return (
    <Box component={"div"}>
      <Typography component={"span"} className={`${styles['page-sub-heading']} capitalize`} variant={"h3"}>
        {router.query.id.replaceAll('-', " ")}
      </Typography>
    </Box>
  )
}


export async function getServerSideProps(appContext) {
  const { locale, req, params } = appContext
  // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${params.id}`)
  // const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // data: data || {}
    }, // will be passed to the page component as props

  }

}

export default CustomerService