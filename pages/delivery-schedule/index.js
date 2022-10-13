import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { withSnackbar } from 'notistack';
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getUserDetails } from 'helpers/user'
import Container from '@mui/material/Container';
import Cookies from 'js-cookie'
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import styles from 'styles/header.module.scss'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TitleSeeMore from 'components/common/titleSeeMore'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import PicDetails from 'views/pic'


function DeliverySchedule(props) {
  const [value, setValue] = useState(null);
  const theme = useTheme();
  const userData = getUserDetails()
  const router = useRouter()
  const handleClick = () => {
    if (typeof Cookies.get('scheduleTime') === 'undefined') {
      props.enqueueSnackbar("Please add preferred schedule time for delivery")
    } else if (JSON.parse(Cookies.get('pics') || '[]').length === 0) {
      props.enqueueSnackbar("Please add atleast one PIC")
      router.push('/delivery-schedule/add-pic')
    } else {
      router.push('/cart')
    }
  }
  useEffect(() => {
    if(Cookies.get('scheduleTime')) {
      setValue(Cookies.get('scheduleTime'))
    }
  },[Cookies.get('scheduleTime')])
  return (
    <Container >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',

        }}
      >
        <Box className='mb-5 d-flex flex-column'>
          <label className={`${styles["label-login"]} mb-2`}>{`Atur Pengiriman`}</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} style={{ backgroundColor: theme.palette.neutralLight.main_700 }} />}
              label={''}
              disablePast
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                Cookies.set('scheduleTime', newValue, { expires: new Date(userData.accessTokenExpiry) })
              }}

            />
          </LocalizationProvider>
        </Box>

        <Box style={{ backgroundColor: theme.palette.neutralLight.main_700 }} >
          <TitleSeeMore heading={"PIC"} readMoreText={"Tambah PIC"} href={'/delivery-schedule/add-pic'} showPlus hideArrow />
          <PicDetails {...props} />
        </Box>
      </Box>
      <Button
        type="submit"
        fullWidth
        className={'button-button'}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClick}
      >
        {"Submit"}
      </Button>
    </Container>
  )
}

export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  const userData = JSON.parse(req.cookies.userData || '{}')
  if (Object.values(userData || {}).length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/add-pic`)
  const data = await response.json()

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      userData: userData,
      pic: data,
      pics: JSON.parse(req.cookies.pics || '[]')
    }, // will be passed to the page component as props

  }
}
export default withSnackbar(DeliverySchedule)