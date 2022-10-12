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
  const { address } = props;
  const router = useRouter();
  const userData = getUserDetails()
  const handleSubmitForm = (values) => {
    const params = new URLSearchParams();

    Object.keys(values).forEach((key) => {
      params.append(key, values[key]);
    })
    if (navigator.geolocation) { // the navigator.geolocation object is supported
      navigator.geolocation.getCurrentPosition((position) => {
        params.append("lat", position.coords.latitude)
        params.append("lon", position.coords.longitude)
        axios.put(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/address/${router.query.id}`, params, {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          withCredentials: true
        })
          .then((response) => {
            props.enqueueSnackbar(response.data.message)
            setShowSetup(values)
            router.replace('/my-addresses')
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
          defaultValues={address}
        />
      </Box>
    </Container>
  )
}

export async function getServerSideProps(appContext) {
  const { locale, req, params } = appContext
  const userData = JSON.parse(req.cookies.userData || '{}')
  if (Object.values(userData || {}).length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  const address = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/address/?query=id=${params.id}&limit=50`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${userData.accessToken}`
    },
  })

  const addressResponse = await address.json()
  if (addressResponse?.data?.rows === 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/update-address`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      userData: userData,
      newAddressFields: data,
      address: addressResponse?.data?.rows[0]
    }, // will be passed to the page component as props

  }
}
export default withSnackbar(AddNewAddress)