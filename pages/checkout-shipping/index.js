import { useContext } from 'react';
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import Box from '@mui/material/Box';
import dynamic from "next/dynamic";
import TopContent from 'components/common/topContent'
import { UserContext } from 'context/users/reducer';
import CheckoutButton from 'views/products/checkoutButton'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss'
import Cookies from 'js-cookie'
import { withSnackbar } from 'notistack';
import { createCheckoutProcess } from 'helpers/user';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ShowContent = dynamic(() => import("views/showContent"), { ssr: false });

function Cart(props) {
  const { cart } = props;
  let cartProducts = (cart?.data?.Products?.rows || [])
  const myAddress = JSON.parse(Cookies.get('defaultAddress') || '{}')
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  const router = useRouter();

  const totalAmount = ((cartProducts || []).reduce(function (sum, product) {
    return (sum + ((product.Price) * product.qty));
  }, 0)).toFixed(3)
  const shippingCost = 0

  const {
    userDispatch
  } = useContext(UserContext);

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
          <Typography component="span" className={styles["total-amount"]} color="primary">{`Rp. ${(parseFloat(totalAmount) + parseFloat(shippingCost)).toFixed(3)}`}</Typography>
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
        <ShowContent
          heading={'Alamat Pengiriman'}
          onClickHandler={() => {
            console.log("myAddress13213", myAddress)
            if (Object.values(myAddress).length > 0) {
              router.push('/my-addresses')
            } else {
              router.push('/my-addresses/new')
            }
          }}
          postDiv={myAddress ? (
            <Box>
              <Typography className={styles['total-amount']}>
                {myAddress.name}
              </Typography>
              <Typography className={`${styles['delivers-to-heading']} mt-2`}>
                {myAddress.line1}, {myAddress.line2}
              </Typography>
              <Typography className={`${styles['delivers-to-heading']}`}>
                {myAddress.PostalId}
              </Typography>
            </Box>
          )
            :
            (
              <Box>
                <Typography className={styles['total-amount']}>
                  Please enter an address
                </Typography>
              </Box>
            )
          }
        />
        <Typography component="h1" variant="h5" className={styles['page-heading']}>
          {t("Pesanan Anda")}
        </Typography>
        {(cartProducts || []).map((product, index) => {
          return (
            <div className={`d-flex justify-content-between ${styles['product_cart']} mb-2 p-2 align-items-center`} key={`cart-${index}`}>
              <TopContent
                variant={"Default"}
                imgUrl={product?.Files[0]?.url || "/icons/logo.svg"}
                name={product.name}
                price={product.Price}
                discount={product.discount}
              // postDiv={
              //   <Box className='d-flex mt-2 align-items-center'>
              //     <Typography className={styles['category-name-checkout']}>{"product.categoryName"}</Typography>
              //   </Box>
              // }
              />
              <Box className="d-flex align-items-center justify-content-center">
                <Typography className={styles["cart-product-name"]}>x{product.qty}</Typography>
              </Box>

            </div>

          )
        })}
        <ShowContent
          heading={'Tipe Pembayaran'}
          onClickHandler={() => {
            router.push('/mode-of-payment')
          }}
          postDiv={
            <Box>
              <Typography className={styles['total-amount']}>
                Cash Before Delivery
              </Typography>
            </Box>
          }
        />
        <ShowContent
          heading={'Tipe Pembayaran'}
          onClickHandler={() => {
            router.push('/delivery-schedule')
          }}
          postDiv={
            <Box>
              <Typography className={styles['total-amount']}>
                Silahkan pilih tipe pembayaran Anda dahulu.
              </Typography>
            </Box>
          }
        />
        <Amount />
        <CheckoutButton
          totalHeading={"Total Harga"}
          currency={"Rp"}
          totalItems={`Buat Pesanan`}
          totalAmount={totalAmount}
          onClickButton={async () => {
            if (Object.values(JSON.parse(Cookies.get('defaultAddress') || '{}')).length === 0) {
              props.enqueueSnackbar("Please add an address, to continue the process")
              router.push('/my-addresses/new')
            } else if (JSON.parse(Cookies.get('pics') || '[]').length === 0 || typeof Cookies.get('scheduleTime') === 'undefined') {
              props.enqueueSnackbar("Please add atleast one PIC and also add schedule time for delivery")
              router.push('/delivery-schedule')
            } else if (cartProducts.length > 0) {
              userDispatch(UserActions.setLoading(true))
              const data = {
                checkout: (cartProducts || []).map((product, index) => {
                  return { ProductId: product.id, qty: `${product.qty}` }
                }),
                AddressId: JSON.parse(Cookies.get('defaultAddress') || '{}')?.id || "",
                typePayment: "Cash Before Delivery",
                notes: "",
                CartId: cart?.data?.id,
                schedule: {
                  date: new Date(Cookies.get('scheduleTime')).toISOString(),
                  PIC: JSON.parse(Cookies.get('pics') || '[]').map((pic, index) => {
                    if (index === 0) {
                      return { ...pic, default: `${true}` }
                    }
                    return { ...pic }
                  })
                }
              }

              const response = await createCheckoutProcess({ data, userData })
              console.log('response123123', response)
              userDispatch(UserActions.setLoading(false))
              if (!response.error) {
                // router.push('/checkout-shipping')
              }

            } else {
              props.enqueueSnackbar("Cart is empty, please add something in the cart")
              router.push('/products')
            }

          }}
        // actionSheetDiv={
        //   <Amount />
        // }
        />
      </Box>
    </Container>

  );
}
export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  const userData = JSON.parse(req.cookies.userData || '{}')
  if (!req.cookies.userData) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  const cartProductsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/cart`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${userData.accessToken}`

    },
  })
  const cart = await cartProductsResponse.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      cart
    }, // will be passed to the page component as props

  }
}
export default withSnackbar(Cart)