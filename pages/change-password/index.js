import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image'
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { withSnackbar } from 'notistack';
import InputAdornment from '@mui/material/InputAdornment';
import styles from 'styles/header.module.scss'
import { useTheme } from '@mui/material/styles';
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginTop: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 200,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));
function ChangePassword(props) {
  const router = useRouter();
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const passwordChange = () => {
    if (password.length > 8 && confirmPassword === password) {
      setError('')
      const params = new URLSearchParams();
      Object.keys(router.query).forEach((key) => {
        params.append(key, router.query[key]);
      })
      params.append('newPassword', password);
      axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/auth/forgot-password?uType=newPassword`, params)
        .then((response) => {
          setIsPasswordChanged(true)
          props.enqueueSnackbar(response.data.message)
        })
        .catch((error) => {
          props.enqueueSnackbar(error?.response?.data?.message)
        });;
    } else {
      setError(t("password-equal"))
    }
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
        {isPasswordChanged ?
          <>
            <Image src="/icons/check.svg" alt="Checkbox" width={125} height={125} />
            <Typography component="h1" variant="h5" className={`${styles["compelete-heading"]} mt-3`}>
              {t("password-changed")}
            </Typography>
            <Typography component="h1" variant="h5" className={`${styles['compelete-sub-heading']} mt-3`}>
              {t("password-changed-successfully")}
            </Typography>
            <Button
              onClick={() => { router.replace('/login') }}
              fullWidth
              className={'button-button'}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("login")}
            </Button>
          </>
          :
          <>
            <Typography component="h1" variant="h5" className={styles['page-heading']}>
              {t('change-password')}
            </Typography>
            <Typography component="h1" variant="h5" className={styles["label-sub-heading-1"]}>
              Masukkan Password
            </Typography>
            <div className={styles.container}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label className={styles["label-login"]}>{`${t('new-password')}*`}</label>
                  <TextField
                    name={t('new-password')}
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    value={password}
                    fullWidth={true}
                    InputProps={{ // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ?
                              <Image src="/icons/password-hide.svg" alt="Vercel Logo" width={14} height={14} style={{ cursor: 'pointer' }} />
                              :
                              <Image src="/icons/password-unhide.svg" alt="Vercel Logo" width={14} height={14} style={{ cursor: 'pointer' }} />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    label={""}
                    autoFocus={true}
                    style={{ marginTop: 10, backgroundColor: theme.palette.neutralLight.main_700 }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} className="mt-2">
                <Grid item xs={12}>
                  <label className={styles["label-login"]}>{`${t('repeat-new-password')}}*`}</label>
                  <TextField
                    name={t('repeat-new-password')}
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    id="password-again"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{ // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ?
                              <Image src="/icons/password-hide.svg" alt="Vercel Logo" width={14} height={14} style={{ cursor: 'pointer' }} />
                              :
                              <Image src="/icons/password-unhide.svg" alt="Vercel Logo" width={14} height={14} style={{ cursor: 'pointer' }} />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    fullWidth={true}
                    label={""}
                    style={{ marginTop: 10, backgroundColor: theme.palette.neutralLight.main_700 }}
                  />
                </Grid>
              </Grid>

              {error && <div className="d-flex flex-row align-items-center mt-3">
                <Image src="/icons/info.svg" alt="Info" width={24} height={24} />
                <Typography component="h1" variant="h5" color={"primary"} className={`${styles["info-error"]} ml-1`}>
                  {error}
                </Typography>
              </div>}
              <BorderLinearProgress variant="determinate" value={((password.length / 8) * 100) > 100 ? 100 : (password.length / 8) * 100} />
              <Button
                onClick={passwordChange}
                fullWidth
                className={'button-button'}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('confirm-password')}
              </Button>

            </div>
          </>}
      </Box>
    </Container>

  );
}
export async function getServerSideProps({ locale }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reset-password`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      form: data || [],
    }, // will be passed to the page component as props

  }
}
export default withSnackbar(ChangePassword)