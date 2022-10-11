import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { withSnackbar } from 'notistack';
import Tabform from 'components/common/tabform';
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from "next/image";
import ActionSheet from "actionsheet-react";
import Cookies from 'js-cookie'
import styles from 'styles/header.module.scss'
import { getUserDetails } from 'helpers/user'
import Container from '@mui/material/Container';

function AddPic(props) {
  const router = useRouter();
  const picRef = useRef()
  const userData = getUserDetails()
  const { t } = useTranslation('common', { keyPrefix: "categories" });
  const handleSubmitForm = (values) => {
    values["id"] = Math.random().toString(36).slice(2, 7);
    const previousPICS = JSON.parse(Cookies.get('pics') || "[]")
    const newPICS = [...(previousPICS || []), values]
    Cookies.set('pics', JSON.stringify(newPICS), { expires: new Date(userData.accessTokenExpiry) })
    picRef.current.open();
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',

        }}
      >
        <Typography component="h1" variant="h5" className={styles['page-heading']}>
          {t('pic')}
        </Typography>
        <Typography component="h1" variant="h5" className={styles['page-sub-heading']}>
          {t('add-pic')}
        </Typography>
        <Tabform
          keyPrefix={"registerParent"}
          form={props.newAddressFields.form}
          buttonText={props.newAddressFields.button}
          handleSubmitForm={handleSubmitForm}
        />
      </Box>
      <ActionSheet
        ref={picRef}
        closeOnBgTap
        mouseEnable
        touchEnable
        sheetStyle={{
          background: "linear-gradient(90deg, #16222A 0%, #3A6073 100%)"
        }}
        bgStyle={{
          backgroundColor: "rgba(1, 1, 1, 0.8)"
        }}
      >
        <Box id="__next" className='px-4 d-flex flex-column align-items-center'>
          <Box className="mt-3 mb-3">
            <Image src="/icons/check.svg" alt="Checkbox" width={62} height={62} />
          </Box>
          <Typography className={`${styles['delete-cart-item']}`}>
            {"Data Detail PIC Anda\nberhasil disimpan!"}
          </Typography>
          <Typography component="div" className={`${styles['buy-now-button']} mb-8 mt-2`} style={{ cursor: 'pointer', width: '80%' }} onClick={() => {
            router.replace('/delivery-schedule')
          }}>
            {"Selesai"}
          </Typography>
        </Box>
      </ActionSheet>
    </Container>
  )
}

export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  const userData = JSON.parse(req.cookies.userData || '{}')
  if (Object.values(userData || {}).length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add-pic`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      userData: userData,
      newAddressFields: data
    }, // will be passed to the page component as props

  }
}
export default withSnackbar(AddPic)