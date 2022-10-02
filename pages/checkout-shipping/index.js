import { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/router";
import { IconButton } from '@mui/material';
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
  const shippingCost = 18

  const handleOpen = () => {
    delRef.current.open();
    setDelActionSheet(true)
  };

  const handleClose = () => {
    delRef.current.close();
    setDelActionSheet(false)
  }
  console.log("delRef.current", delRef.current)
  useEffect(() => {
    if (isDelActionSheetOpened) {
      console.log("delRef.current123123", delRef)
      setTimeout(() => {
        handleClose()
      }, 5000)
    }
  }, [delRef.current])

  const Amount = () => {
    return (
      <Box component="div">
        <Typography component="span" className={styles['page-sub-heading']}>{'Buat Pesanan'}</Typography>
        <Box className='d-flex justify-content-between mt-2'>
          <Typography component="span" className={styles["total-amount"]}>{'Total Harga'}</Typography>
          <Typography component="span" className={styles["total-amount"]}>{`Rp. ${totalAmount}`}</Typography>
        </Box>
        <Box className='d-flex justify-content-between mt-2'>
          <Typography component="span" className={styles["total-amount"]}>{'Biaya Pengiriman'}</Typography>
          <Typography component="span" className={styles["total-amount"]}>{`Rp. ${shippingCost}`}</Typography>
        </Box>
        <Box className='d-flex justify-content-between mt-2 mb-4'>
          <Typography component="span" className={styles["total-amount"]}>{'Total Pembayaran'}</Typography>
          <Typography component="span" className={styles["total-amount"]} color="primary">{`Rp. ${parseFloat(totalAmount) + parseFloat(shippingCost)}`}</Typography>
        </Box>
      </Box>
    )
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
          {t("Pesanan Anda")}
        </Typography>
        {items.map((product, index) => {
          return (
            <div className={`d-flex justify-content-between ${styles['product_cart']} mb-2 p-2 align-items-center`} key={`cart-${index}`}>
              <TopContent
                variant={product.categoryName}
                imgUrl={product.image}
                name={product.name}
                price={product.price}
                discount={product.discount}
                postDiv={
                  <Box className='d-flex mt-2 align-items-center'>
                    <Typography className={styles['category-name-checkout']}>{product.categoryName}</Typography>
                  </Box>
                }
              />
              <Box className="d-flex align-items-center justify-content-center">
                <Typography className={styles["cart-product-name"]}>x{product.totalItems}</Typography>
              </Box>

            </div>

          )
        })}
        <Amount />
        <CheckoutButton
          totalHeading={"Total Harga"}
          currency={"Rp"}
          totalItems={`Buat Pesanan`}
          totalAmount={totalAmount}
          // actionSheetDiv={
          //   <Amount />
          // }
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