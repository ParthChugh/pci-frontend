import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss'
import Image from 'next/image'
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import { getUserDetails } from 'helpers/user'
import { Box, Typography, Button } from '@mui/material';
import dynamic from "next/dynamic";

const ShowContent = dynamic(() => import("views/showContent"), { ssr: false });
function Profile() {
  const userData = getUserDetails()
  const router = useRouter();
  const data = [
    {
      heading: "Lengkapi Data Diri",
      hideDivider: true,
      icon: "/icons/personal-details.svg",
    },
    {
      heading: "Daftar Alamat",
      hideDivider: true,
      icon: "/icons/address-list.svg",
      href: "/my-addresses"
    },
    {
      heading: "Keamanan Akun",
      hideDivider: true,
      icon: "/icons/security.svg",
    },
    {
      heading: "Feedback Aplikasi Kami",
      hideDivider: true,
      icon: "/icons/feedback.svg",
    },
    {
      heading: "Keluar",
      hideDivider: true,
      icon: "/icons/logout.svg",
      logout: true,
      hideNextIcon: true
    },
  ]
  return (
    <>
      <Box className={`${styles['profile-name-container']} p-5`}>
        <Box className={`d-flex justify-content-between `}>
          <Typography className={styles["label-profile"]}>
            Akun Saya
          </Typography>
          <Image src={"/icons/edit.svg"} alt="image" height={20} width={20} />
        </Box>
        <Typography className={`${styles["label-profile"]} text-center`}>
          {userData.user.fullName}
        </Typography>
        <Typography className={`${styles["label-sub-heading"]} text-center`}>
          {userData.user.email}
        </Typography>
        <Typography className={`${styles["label-sub-heading"]} text-center`}>
          {userData.isBisnis ? "Bisnis" : "Umum"}
        </Typography>
        <Box className='d-flex justify-content-center'>
          <Button
            type="submit"
            fullWidth
            className={styles["profile-button"]}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {userData.isBisnis ? "Bisnis" : "Umum"}
          </Button>
        </Box>

      </Box>
      <Container component="main" maxWidth="xs">

        <label className={`${styles["label-profile"]}`}>{`Pengaturan Akun`}</label>

        {data.map((item, index) => {
          return (
            <Box className='pt-2'>
              <ShowContent
                {...item}
                key={`show-content-profile-${index}`}

                onClickHandler={() => {
                  if (item.logout) {
                    Object.keys(Cookies.get()).forEach(key => Cookies.remove(key));
                    router.push('/')
                  } else {
                    if (item.href) {
                      router.push(item.href)
                    }
                  }

                }}
              />
            </Box>

          )
        })}
      </Container>
    </>
  )
}
export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  if (!req.cookies.userData) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      userData: JSON.parse(req.cookies.userData || '{}')
    }, // will be passed to the page component as props

  }
}
export default Profile