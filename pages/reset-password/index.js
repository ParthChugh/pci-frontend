import React, { useState } from 'react';
import Tabform from 'components/common/tabform';
import CountDown from 'components/common/countdown';
import Box from '@mui/material/Box';
import Image from 'next/image'
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss'
import { useRouter } from "next/router";
import OtpInput from 'react-otp-input';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function ResetPassword(props) {
  const { form } = props;
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  const [showOtp, setShowSetup] = useState(false)
  const [otp, setOtp] = useState('')
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setShowSetup(true)
  };

  const sendOtp = (resetTimer) => {
    resetTimer(true)
  }

  const onClickRequest = () => {
    router.push('/change-password/')
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
          {t('change-password')}
        </Typography>
        {showOtp ?
          <>
            <Typography component="h1" variant="h5" className={styles["label-sub-heading-1"]}>
              {t('code-verfication')}
            </Typography>
            <Typography component="h1" variant="h5" className={styles["label-sub-heading-2"]}>
              {t('enter-code')}
            </Typography>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={form.otp.numInputs}
              inputStyle={styles.inputStyle}
              separator={<span></span>}
            />
            <div className="d-flex flex-row flex-start mt-3">
              <Image src="/icons/info.svg" alt="Info" width={24} height={24} />
              <Typography component="h1" variant="h5" color={"primary"} className={`${styles["info-error"]} ml-1`}>
                {t('incorrect-code')}
              </Typography>
            </div>
            <CountDown
              buttonClass={styles["buttonClass"]}
              seconds={parseInt(form.otp.otpResendTime || 0)}
              buttonCB={cb => sendOtp(cb)}
              buttonLabel={t("send-otp-again")}
              startText={t("didnt-recieve-otp")}
              endText={""}
            />
            <Button
              fullWidth
              className={'button-button'}
              variant="contained"
              onClick={onClickRequest}
              sx={{ mt: 3, mb: 2 }}
            >
              {form.otp.button}
            </Button>
          </>
          :
          <>
            <Tabform
              keyPrefix={"registerParent"}
              form={form.form}
              buttonText={form.button}
              handleSubmitForm={handleSubmit}
            />
          </>
        }
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
export default ResetPassword