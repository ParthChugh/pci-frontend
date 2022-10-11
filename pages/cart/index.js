import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabform from 'components/common/tabform';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Button, IconButton } from '@mui/material';
import ActionSheet from "actionsheet-react";
import Image from "next/image";
import Products from 'views/products'
import { useTranslation } from 'next-i18next';
import Box from '@mui/material/Box';
import TopContent from 'components/common/topContent'
import CheckoutButton from 'views/products/checkoutButton'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss'
import { withSnackbar } from 'notistack';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserContext } from 'context/users/reducer';
import * as UserActions from 'context/users/actions'

function Cart(props) {
  const { product } = props;
  const [isDelActionSheetOpened, setDelActionSheet] = useState(false)
  const delRef = useRef()
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  const router = useRouter();
  const items = [
    {
      name: "Pasir Rangkas",
      price: 42,
      currency: "Rp",
      image: "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
      discount: 20,
      categoryName: "Kategori: Pasir & Agregat",
      totalItems: 2
    },
    {
      name: "Batu Belah",
      price: 54,
      currency: "Rp",
      image: "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
      discount: 20,
      categoryName: "Kategori: Pasir & Agregat",
      totalItems: 2
    },
    {
      name: "Batu Kapur",
      price: 66,
      currency: "Rp",
      image: "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
      discount: 20,
      categoryName: "Kategori: Pasir & Agregat",
      totalItems: 2
    }
  ]
  const totalAmount = (items.reduce(function (sum, product) {
    return (sum + ((product.price) * product.totalItems - (100 - parseFloat(product.discount)) / 100));
  }, 0)).toFixed(3)

  const handleOpen = () => {
    delRef.current.open();
    setDelActionSheet(true)
  };

  const handleClose = () => {
    delRef.current.close();
    setDelActionSheet(false)
  }
  // console.log("delRef.current", delRef.current)
  useEffect(() => {
    if (isDelActionSheetOpened) {
      // console.log("delRef.current123123", delRef)
      setTimeout(() => {
        handleClose()
      }, 5000)
    }
  }, [delRef.current])
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
          {t("Pilih semua")}
        </Typography>
        {items.map((product, index) => {
          return (
            <div className={`d-flex justify-content-between ${styles['product_cart']} mb-2 p-2 align-items-center`} key={`cart-${index}`}>
              <TopContent
                imgUrl={product.image}
                name={product.name}
                price={product.price}
                discount={product.discount}
                postDiv={
                  <div className='d-flex mt-2 align-items-center'>
                    <Typography className={styles["minus"]}>-</Typography>
                    <input type="text" className={styles['input']} value="1" />
                    <Typography className={`${styles["plus"]} `}>+</Typography>
                    <IconButton
                      className="ml-2"
                      onClick={handleOpen}
                    >
                      <Image src="/icons/trash.svg" alt="upload" height={16} width={16} />
                    </IconButton>
                    <ActionSheet
                      ref={delRef}
                      closeOnBgTap
                      mouseEnable
                      touchEnable
                      sheetStyle={{
                        background: "linear-gradient(90deg, #16222A 0%, #3A6073 100%)"
                      }}
                      bgStyle={{
                        backgroundColor: "rgba(1, 1, 1, 0.8)"
                      }}
                    >
                      <Box id="__next" className='px-4 d-flex flex-column align-items-center'>
                        <Box className="mt-3 mb-3">
                          <Image src="/icons/check.svg" alt="Checkbox" width={62} height={62} />
                        </Box>
                        <Typography className={`${styles['delete-cart-item']} mb-8`}>
                          {"Anda berhasil menghapus \n produk dari keranjang!"}
                        </Typography>
                      </Box>
                    </ActionSheet>
                  </div>
                }
              />
              <div style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: '50%' }} className="d-flex align-items-center justify-content-center">
                <Image src="/icons/heart.svg" alt="upload" height={12} width={12} />
              </div>
            </div>
          )
        })}
        <Products
          products={{ item: product.data.details.products.rows }}
          heading={product.data.details.products.name}
          readMoreText={""}
          readMoreHref={''}
        />
        <CheckoutButton
          totalHeading={"Total Harga"}
          currency={"Rp"}
          onClickButton={() => {
            router.push('/checkout-shipping')
          }}
          totalItems={`Checkout (${items.length})`}
          totalAmount={totalAmount}
          actionSheetDiv={
            <Box component="div">
              <Typography component="span" className={styles['page-sub-heading']}>{'Detail Pembayaran'}</Typography>
              <Box className='d-flex justify-content-between mt-2'>
                <Typography component="span" className={styles["total-amount"]}>{'Total Harga'}</Typography>
                <Typography component="span" className={styles["total-amount"]}>{`Rp. ${totalAmount}`}</Typography>
              </Box>
              <Box className='d-flex justify-content-between mt-2 mb-4'>
                <Typography component="span" className={styles["total-amount"]}>{'Total Pembayaran'}</Typography>
                <Typography component="span" className={styles["total-amount"]} color="primary">{`Rp. ${totalAmount}`}</Typography>
              </Box>
            </Box>
          }
        />
      </Box>
    </Container>

  );
}
export async function getServerSideProps(appContext) {
  const { locale } = appContext
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product_details`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      product: data || []
    }, // will be passed to the page component as props

  }

}
export default withSnackbar(Cart)