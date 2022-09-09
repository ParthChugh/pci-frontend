import React, { useState } from 'react';
import Tabform from 'components/common/tabform';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss'
import { useRouter } from "next/router";
import OtpInput from 'react-otp-input';

function ResetPassword(props) {
  const { form } = props;
  const [showOtp, setShowSetup] = useState(false)
  const [otp, setOtp] = useState('')
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setShowSetup(true)
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
          {"Ubah Password"}
        </Typography>
        {showOtp ?
          <>
            <Typography component="h1" variant="h5" className={styles["label-sub-heading-1"]}>
              Verifikasi Kode
            </Typography>
            <Typography component="h1" variant="h5" className={styles["label-sub-heading-2"]}>
              Silakan masukkan kode 6 digit anda
            </Typography>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={form.otp.numInputs}
              inputStyle={styles.inputStyle}
              separator={<span></span>}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {form.otp.button}
            </Button>
          </>
          :
          <>
            <Tabform
              form={form.form}
              buttonText={form.button}
              handleSubmit={handleSubmit}
            />
          </>

        }


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