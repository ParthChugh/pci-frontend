import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabform from 'components/common/tabform';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'next-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


function SignIn(props) {
  const { form } = props;
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
          handleSubmit={handleSubmit}
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
export async function getServerSideProps({ locale }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      form: data || [],
    }, // will be passed to the page component as props

  }
}
export default SignIn