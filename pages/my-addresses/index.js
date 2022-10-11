import { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { Button, Box, Link } from '@mui/material';
import { Typography } from '@mui/material'
import Image from "next/image";
import styles from 'styles/header.module.scss'
import { useTranslation } from 'next-i18next';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import TitleSeeMore from 'components/common/titleSeeMore'
import { useRouter } from "next/router";
import Container from '@mui/material/Container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie'
import RadioGroup from '@mui/material/RadioGroup';
import IconButton from '@mui/material/IconButton';
import ProductSkeleton from 'components/common/skeleton'
import { getUserDetails } from 'helpers/user'
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';

// ArrowForwardIos

function MyAddresses(props) {
  const router = useRouter();
  const [addresses, setAddresses] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [defaultAddressIndex, setDefaultAddress] = useState(0)
  const cachedDefaultAddress = JSON.parse(Cookies.get('defaultAddress') || '{}')
  const userAddress = addresses.findIndex(address => address.id === cachedDefaultAddress.id) > 0 ? addresses.findIndex(address => address.id === cachedDefaultAddress.id) : 0
  const { t } = useTranslation('common', { keyPrefix: "categories" });
  const isLoggedIn = Object.values(props.userData || {}).length > 0 ? !!props.userData : !(getUserDetails()).error
  const userData = getUserDetails()
  console.log('defaultAddressIndex', defaultAddressIndex)
  useEffect(() => {
    setAddresses(props.addresses)
  }, [JSON.stringify(props.addresses || {})])

  useEffect(() => {
    if (cachedDefaultAddress) {
      setDefaultAddress(userAddress)
    }
  }, [JSON.stringify(addresses || []).length > 0, userAddress])
  // console.log('addresses123213', props.addresses)
  const handleChange = (value) => {
    setDefaultAddress(value)
  }
  const getMoreAddress = (newPageNumber) => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/address?page=${newPageNumber}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${userData.accessToken}`
      },
    })
      .then((response) => {
        setAddresses([...addresses, ...response?.data?.rows])
      })
      .catch((error) => {
        props.enqueueSnackbar(error?.response?.data?.message || "Wrong Password")
      });;
  }
  console.log("addresses.findIndex(address => address.id === cachedDefaultAddress.id) || 0", addresses.findIndex(address => address.id === cachedDefaultAddress.id) || 0)

  return (
    <Container component="main" maxWidth="xs">
      <TitleSeeMore heading={"My Addresses"} readMoreText={"Add New"} href={'/my-addresses/new'} />
      {/* <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue={defaultAddressIndex}
        onChange={handleChange}
        name={"radio-addresses"}
      > */}
      {addresses.map((address, index) => {
        return (
          <Box key={`address-${index}`} >
            <Box component={"div"} className='d-flex justify-content-between align-items-center mt-2 mb-2'style={{ cursor: 'pointer' }} onClick={() => { handleChange(index) }}>
              <Box component={"div"} className="d-flex flex-column">
                {/* <FormControlLabel value={index} control={<Radio />} label={address.name} /> */}
                <Box className='d-flex flex-row align-items-center'>
                  {defaultAddressIndex === index && <Image src="/icons/check.svg" alt="Checkbox" width={20} height={20} />}

                  <Typography component={"span"} className={`${styles['name-address']} ml-2`}>
                    {address.name}
                  </Typography>
                </Box>
                <Typography component={"span"} className={`${styles['subheading-address']}`}>
                  {address.line1}
                </Typography>
                <Typography component={"span"} className={`${styles['subheading-address']}`}>
                  {address.line2}
                </Typography>
              </Box>
              <IconButton
                className="ml-2"
                onClick={() => {
                  router.push(`/my-addresses/${address.id}`)
                }}
              >
                <Image src="/icons/edit.svg" alt="upload" height={16} width={16} />
              </IconButton>
            </Box>
            <hr />
          </Box>
        )
      })}
      {/* </RadioGroup> */}
      {typeof addresses?.[pageNumber - 1] === 'undefined' &&
        <Box component={"div"}>
          <ProductSkeleton data={Array.from(new Array(20))} />
        </Box>
      }
      {typeof addresses?.[pageNumber - 1] !== 'undefined' && props?.totalPage < (pageNumber - 1) &&
        <Typography component="div" className={`${styles['buy-now-button']} mb-3 mt-3`} style={{ cursor: 'pointer' }} onClick={() => {
          const newPageNumber = pageNumber + 1
          getMoreAddress(newPageNumber)
          setPageNumber(newPageNumber)
        }}>
          Load More
        </Typography>
      }
      {userAddress.toString() !== defaultAddressIndex.toString() &&
        <Typography component="div" className={`${styles['buy-now-button']} mb-3 mt-3`} style={{ cursor: 'pointer' }} onClick={() => {
          const response = JSON.parse(Cookies.get('userData'))
          Cookies.set('defaultAddress', JSON.stringify(addresses?.[defaultAddressIndex]), { expires: new Date(response.accessTokenExpiry) })
          props.enqueueSnackbar("Default Address Changed")
          router.push('/')
        }}>
          Change Default Password
        </Typography>}
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
  const addresses = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/address`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${userData.accessToken}`
    },
  })
  const addressResponse = (await addresses.json())
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      userData: userData,
      addresses: addressResponse?.data?.rows || [],
      totalPage: addressResponse?.data?.total_page || 1
    }, // will be passed to the page component as props

  }
}
export default withSnackbar(MyAddresses)