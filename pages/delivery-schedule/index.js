import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { withSnackbar } from 'notistack';
import Tabform from 'components/common/tabform';
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getUserDetails } from 'helpers/user'
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import styles from 'styles/header.module.scss'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TitleSeeMore from 'components/common/titleSeeMore'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


function DeliverySchedule(props) {
  const [value, setValue] = useState(null);
  const theme = useTheme();
  const router = useRouter()
  console.log("props?.pics12321", props?.pics)
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
              }}

            />
          </LocalizationProvider>
        </Box>

        <Box style={{ backgroundColor: theme.palette.neutralLight.main_700 }} >
          <TitleSeeMore heading={"PIC"} readMoreText={"Tambah PIC"} href={'/delivery-schedule/add-pic'} showPlus hideArrow />
          <Box className="mt-4" >
            {(props?.pics || []).map((pic) => (
              <Box key={`pics-${pic.id}`} className={"d-flex flex-wrap align-items-start"} style={{ backgroundColor: 'white', margin: 20, borderRadius: 10, cursor: 'pointer'}} onClick={() => {
                router.push(`delivery-schedule/add-pic/${pic.id}`)
              }} >
                {Object.values(props?.pic?.form || {}).map((field, index) => {
                  return (
                    <Box key={`pic-${index}`} style={{ width: '45%' }} className="mb-3">
                      <Typography className={styles['pic-label']}>
                        {field.name}
                      </Typography>
                      <Typography className={styles['subtotal']}>
                        {pic[field.id]}
                      </Typography>
                    </Box>
                  )
                })}
                <IconButton
                  className="ml-2"

                  style={{ height: 16, width: 16 }}
                >
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            )
            )}
          </Box>
        </Box>
      </Box>
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