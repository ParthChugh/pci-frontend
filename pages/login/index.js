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
    // console.log('dqdqwdqwdqwdwqd')
    const params = new URLSearchParams();
    params.append('email', values.email);
    params.append('password', values.password);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/auth/login`, params)
      .then((response) => {
        props.enqueueSnackbar("Successfully loggedIn")
        userDispatch(UserActions.updateUserDetails(response.data.data))
        Cookies.set('userData', JSON.stringify(response.data.data), { expires: new Date(response.data.data.accessTokenExpiry) })
        router.push('/')
      })
      .catch((error) => {
        props.enqueueSnackbar(error?.response?.data?.message || "Wrong Password")
      });;

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
        <Typography component="h1" variant="h5" className={styles['page-heading']}>
          {t("login")}
        </Typography>
        <Tabform
          keyPrefix={"registerParent"}
          form={form.form}
          buttonText={form.button}
          handleSubmitForm={handleSubmitForm}
          preButton={<Grid container alignItems="center">
            <Grid item xs>
              <FormControlLabel
                control={<Checkbox value="remember" color={"secondary"} />}
                label={t("terms-and-condition")}
              />
            </Grid>
            <Grid item>
              <Link href="/reset-password/" variant="body2">
                {t("forget-password")}
              </Link>
            </Grid>
          </Grid>}
          postButton={<Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register/" variant="body2">
                {t("register-account")}
              </Link>
            </Grid>
          </Grid>}
        />
      </Box>
    </Container>

  );
}
export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  // console.log("req.cookies.userData12312", req.cookies.userData)
  if (req.cookies.userData) {
    // console.log('-awdwadwdawdwa')
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  } else {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`)
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