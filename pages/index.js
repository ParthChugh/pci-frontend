import React from 'react';
import dynamic from "next/dynamic";
import { Button, Box, Link } from '@mui/material';
import { Typography } from '@mui/material'
import styles from 'styles/header.module.scss'
// import { useTheme } from '@mui/material/styles';
import BottomBar from 'components/common/bottomNavigation'

const SlideCarousel = dynamic(() => import("components/common/slide-carousel"), { ssr: false });

export default function Example(props) {
  // const theme = useTheme()
  const ONOBOARDING_CAROUSEL_CONFIG = {
    "onboardingType": "done_auto",
    "autoScrollSpeed": 1500,
    "btn_skip_en": "SKIP",
    "btn_skip_ba": "Skip ba",
    "btn_next_en": "Next",
    "btn_next_ba": "Next ba",
    "btn_done_en": "Done",
    "btn_done_ba": "Done ba",
    "item": [
      {
        "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png"
      },
      {
        "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-a443312f-41ee-4c4b-920b-2fc780d4fec7-file.png"
      },
      {
        "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-c8d8dcd4-670a-405d-8183-5c8463429fc4-file.png"
      },
      {
        "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-c13f159e-1f0c-4832-94bf-a3c657872b68-file.png"
      },
      {
        "image_url": "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-856f8aad-0738-413a-9df9-1431c3e86953-file.png"
      }
    ]
  }

  return (
    <>
      <SlideCarousel
        CAROUSEL={ONOBOARDING_CAROUSEL_CONFIG}
      />
      <Typography component="h1" variant="h5" className={`${styles["compelete-heading"]} mt-3`}>
        Bangun properti impian Anda <br />
        dengan pengalaman baru
      </Typography>
      <Typography component="h1" variant="h5" className={`${styles['compelete-sub-heading']} mt-3`}>
        Tidak perlu lagi menghubungi berbagai<br />
        macam pemasok dan kirim berbagai barang
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Button
          onClick={() => { router.replace('/login') }}
          fullWidth
          className={'button-button'}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Belanja Sekarang
        </Button>
      </Box>
      <Typography component="h1" variant="h5" className={`${styles['compelete-sub-heading']} mt-3`}>
        Sudah punya akun?
        <Link color="primary" href="/login/" style={{ textDecoration: 'none' }}>{" Masuk"}</Link>
      </Typography>
      <BottomBar />
    </>
  )
}

