import * as React from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabform from 'components/common/tabform';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Image from "next/image";
import Products from 'views/products'
import { useTranslation } from 'next-i18next';
import Box from '@mui/material/Box';
import TopContent from 'components/common/topContent'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss'
import { withSnackbar } from 'notistack';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserContext } from 'context/users/reducer';
import * as UserActions from 'context/users/actions'

function Cart(props) {
  const { product } = props;
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  const router = useRouter();
  console.log("props123123", props)
  const items = [
    {
      name: "Pasir Rangkas",
      price: 42,
      currency: "Rp",
      image: "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
      discount: 20
    },
    {
      name: "Batu Belah",
      price: 54,
      currency: "Rp",
      image: "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
      discount: 20
    },
    {
      name: "Batu Kapur",
      price: 66,
      currency: "Rp",
      image: "https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png",
      discount: 20
    }
  ]


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
            <div className={`d-flex justify-content-between ${styles['product_cart']} mb-2 p-2`} key={`cart-${index}`}>
              <TopContent
                imgUrl={product.image}
                name={product.name}
                price={product.price}
                discount={product.discount}
                postDiv={
                  <div className='d-flex'>
                    <Typography className={styles["minus"]}>-</Typography>
                    <input type="text" className={styles['input']} value="1" />
                    <Typography className={styles["plus"]}>+</Typography>
                    <Image src="/icons/trash.svg" alt="upload" height={16} width={16} />
                  </div>
                }
              />
              <Image src="/icons/heart.svg" alt="upload" height={12} width={12} />
            </div>

          )
        })}
        <Products
          products={{ item: product.data.details.products.rows }}
          heading={product.data.details.products.name}
          readMoreText={""}
          readMoreHref={''}
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