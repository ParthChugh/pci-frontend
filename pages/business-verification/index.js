import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss';
import Tabform from 'components/common/tabform';
import { useTranslation } from 'next-i18next';
import { withSnackbar } from 'notistack';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
const BasicTabs = dynamic(() => import('components/common/tabview'), { ssr: false, })

function SignUp(props) {
  const [selectedTab, setSelectedTab] = useState(0)
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });

  const handleSubmitForm = async (values) => {
    const params = new URLSearchParams();
    Object.keys(values).forEach((key) => {
      params.append(key, values[key]);
    })

    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/v1/website/auth/register?${props?.tabs[selectedTab].extraFields.apiQuery}`, params)
      .then((response) => {
        console.log("response12321", response)
        props.enqueueSnackbar("Successfully loggedIn")
      })
      .catch((error) => {
        props.enqueueSnackbar(error?.response?.data?.message || "Wrong Password")
      });;
  };

  const changeTab = (value) => {
    setSelectedTab(value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" className={styles['page-heading']}>
        {t('register')}
      </Typography>
      <Typography component="h1" variant="h5" className={styles['page-sub-heading']}>
        {t('your-account-type')}
      </Typography>
      <BasicTabs
        tabs={(props?.tabs || []).map(tab => ({
          heading: tab.heading,
          component: (
            <Tabform
              keyPrefix={"registerParent"}
              form={tab.form}
              buttonText={tab.button}
              handleSubmitForm={handleSubmitForm}
              preButton={<div />}
            />
          )
        }))}
        changeTab={changeTab}
      />
    </Container>
  );
}

export async function getServerSideProps({ locale }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/business-verfication`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      tabs: data.tabs || [],
    }, // will be passed to the page component as props

  }
}
export default withSnackbar(SignUp)