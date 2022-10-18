import React from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { withSnackbar } from 'notistack';
import Tabform from 'components/common/tabform';
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getUserDetails } from 'helpers/user'
import Container from '@mui/material/Container';

function AddNewAddress(props) {
  const router = useRouter();
  const userData = getUserDetails()
  const handleSubmitForm = (values) => {
    const params = new URLSearchParams();
    params.append('line1', values.line1.name)
    params.append('line2', values.line2)
    params.append('PostalId', values.line1.id)
    params.append('name', values.name)
    if (navigator.geolocation) { // the navigator.geolocation object is supported
      navigator.geolocation.getCurrentPosition((position) => {
        params.append("lat", position.coords.latitude)
        params.append("lon", position.coords.longitude)
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/address`, params, {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          withCredentials: true
        })
          .then((response) => {
            console.log('qwewqdqwqwdqwdqwd')
            router.replace('/my-addresses')
            props.enqueueSnackbar(response.data.message)
            // setShowSetup(values)
            
          })
          .catch((error) => {
            props.enqueueSnackbar(error?.response?.data?.message)
          });;
      });
    } else {
      alert("Geolocation is not supported by your web browser");
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
        <Tabform
          keyPrefix={"registerParent"}
          form={props.newAddressFields.form}
          buttonText={props.newAddressFields.button}
          handleSubmitForm={handleSubmitForm}
        />
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/new-address`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      userData: userData,
      newAddressFields: data
    }, // will be passed to the page component as props

  }
}
export default withSnackbar(AddNewAddress)