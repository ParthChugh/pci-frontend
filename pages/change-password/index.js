import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import styles from 'styles/header.module.scss'
import { useTheme } from '@mui/material/styles';
import { useRouter } from "next/router";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

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
function ResetPassword(props) {
  const router = useRouter();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(true);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const passwordChange = () => {
    if (password.length > 8 && confirmPassword === password) {
      setError('')
      setIsPasswordChanged(true)
    } else {
      setError("Password should be greater than 8 and should be equal")
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
              Password anda <br />
              berhasil diubah!
            </Typography>
            <Typography component="h1" variant="h5" className={`${styles['compelete-sub-heading']} mt-3`}>
              Password anda telah berhasil <br /> diperbarui, Silahkan masuk kembali.
            </Typography>
            <Button
              onClick={() => {router.replace('/login')}}
              fullWidth
              className={'button-button'}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Masuk
            </Button>
          </>
          :
          <>
            <Typography component="h1" variant="h5" className={styles['page-heading']}>
              {"Ubah Password"}
            </Typography>
            <Typography component="h1" variant="h5" className={styles["label-sub-heading-1"]}>
              Masukkan Password
            </Typography>
            <div className={styles.container}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label className={styles["label-login"]}>{`Password Baru*`}</label>
                  <TextField
                    name="Password Baru"
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
                  <label className={styles["label-login"]}>{`Ulangi Password Baru*`}</label>
                  <TextField
                    name="Ulangi Password Baru"
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
                Konfirmasi password
              </Button>

            </div>
          </>}

      </Box>
    </Container>

  );
}
export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reset-password`)
  const data = await response.json()
  console.log("data12321", data)
  return {
    props: {
      form: data || [],
    }, // will be passed to the page component as props

  }
}
export default ResetPassword