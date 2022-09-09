import * as React from 'react';
import dynamic from 'next/dynamic'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss';
import Tabform from 'components/common/tabform';
const BasicTabs = dynamic(() => import('components/common/tabview'), { ssr: false, })

function SignUp(props) {
  console.log('propqwds12321', props)
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
        Daftar
      </Typography>
      <Typography component="h1" variant="h5" className={styles['page-sub-heading']}>
        Jenis Akun Anda
      </Typography>
      <BasicTabs
        tabs={(props?.tabs || []).map(tab => ({
          heading: tab.heading,
          component: <Tabform form={tab.form} buttonText={tab.button} handleSubmit={handleSubmit} />
        }))}
      />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`)
  const data = await response.json()
  console.log("dqwqwd", data)
  return {
    props: {
      tabs: data.tabs || [],
    }, // will be passed to the page component as props

  }
}
export default SignUp