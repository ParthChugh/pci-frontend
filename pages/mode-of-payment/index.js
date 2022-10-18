import * as React from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabform from 'components/common/tabform';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss'
import { withSnackbar } from 'notistack';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserContext } from 'context/users/reducer';
import * as UserActions from 'context/users/actions'

function SignIn(props) {
  const { form } = props;
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  const {
    userState,
    userDispatch,
  } = React.useContext(UserContext);

  const router = useRouter();
  const handleSubmitForm = async (values) => {
    console.log("defaultValues", values)
    Cookies.set('modeOfPayment', values['modeOfPayment'])
    router.push('/checkout-shipping')
  };

  return (
    <Container component="main" maxWidth="xs" className='d-flex'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Tabform
          keyPrefix={"registerParent"}
          form={form.form}
          buttonText={form.button}
          handleSubmitForm={handleSubmitForm}
          defaultValues={{
            modeOfPayment: Cookies.get('modeOfPayment') || form.defaultValue
          }}
        />
      </Box>
    </Container>

  );
}
export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  // console.log("req.cookies.userData12312", req.cookies.userData)
  if (!req.cookies.userData) {
    // console.log('-awdwadwdawdwa')
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  } else {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mode-of-payment`)
    const data = await response.json()
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        form: data || [],
      }, // will be passed to the page component as props

    }
  }
}
export default withSnackbar(SignIn)