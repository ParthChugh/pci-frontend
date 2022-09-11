import * as React from 'react';
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss';
import Tabform from 'components/common/tabform';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
const BasicTabs = dynamic(() => import('components/common/tabview'), { ssr: false, })

function SignUp(props) {
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
              handleSubmit={handleSubmit}
              preButton={<div />}
            />
          )
        }))}
      />
    </Container>
  );
}

export async function getServerSideProps({locale}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      tabs: data.tabs || [],
    }, // will be passed to the page component as props

  }
}
export default SignUp