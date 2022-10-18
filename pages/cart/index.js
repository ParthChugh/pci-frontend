import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from "next/router";
import { UserContext } from 'context/users/reducer';
import { IconButton } from '@mui/material';
import ActionSheet from "actionsheet-react";
import Image from "next/image";
import { useTranslation } from 'next-i18next';
import Box from '@mui/material/Box';
import TopContent from 'components/common/topContent'
import dynamic from "next/dynamic";
import CheckoutButton from 'views/products/checkoutButton'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from 'styles/header.module.scss'
import { withSnackbar } from 'notistack';
import { updateCart, getUserDetails, deleteCart, createCheckoutProcess } from 'helpers/user';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Cookies from 'js-cookie'
import * as UserActions from 'context/users/actions'

const ShowContent = dynamic(() => import("views/showContent"), { ssr: false });

function Cart(props) {
  const { cart } = props;
  const [products, setProducts] = useState([])
  const {
    userDispatch
  } = useContext(UserContext);
  let cartProducts = products.length > 0 ? products : (cart?.data?.Products?.rows || [])

  const userData = getUserDetails()
  const cartId = cart?.data?.id
  const [isDelActionSheetOpened, setDelActionSheet] = useState(false)
  const delRef = useRef()
  const myAddress = JSON.parse(Cookies.get('defaultAddress') || '{}')
  const { t } = useTranslation('common', { keyPrefix: 'registerParent' });
  const router = useRouter();
  useEffect(() => {
    setProducts(cart?.data?.Products?.rows || [])
  }, [cart?.data?.Products?.rows])

  const totalAmount = ((cartProducts || []).reduce(function (sum, product) {
    return (sum + ((product.Price) * product.qty));
  }, 0)).toFixed(3)

  const handleOpen = async (product, index) => {
    products.splice(index, 1);
    delRef.current.open();
    setDelActionSheet(true)
    setProducts(products)
    const response = await deleteCart({ productId: product.id, userData, cartId })
    const data = response.data

    if (data?.error && data.name !== "AlreadyExists") {
      router.push('/login')
    } else {
      props.enqueueSnackbar(data.message)
    }
    userDispatch(UserActions.setLoading(false))

  };

  const handleClose = () => {
    delRef.current.close();
    setDelActionSheet(false)
  }
  // console.log("delRef.current", delRef.current)
  useEffect(() => {
    if (isDelActionSheetOpened && delRef.current) {
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
        <ShowContent
          heading={'Alamat Pengiriman'}
          onClickHandler={() => {
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
            (<Box>
              <Typography className={styles['total-amount']}>
                Please enter an address
              </Typography>

            </Box>)
          }
        />
        {(cartProducts || []).length === 0 &&
          <Typography component="h1" variant="h5" className={styles['page-heading']}>
            Cart is Empty
          </Typography>
        }


        {(cartProducts || []).map((product, index) => {
          return (
            <div className={`d-flex justify-content-between ${styles['product_cart']} mb-2 p-2 align-items-center`} key={`cart-${index}`}>
              <TopContent
                imgUrl={product?.Files[0]?.url || "/icons/logo.svg"}
                name={product.name}
                price={product.Price}
                postDiv={
                  <div className='d-flex mt-2 align-items-center'>
                    <Typography
                      className={styles["minus"]}
                      onClick={async () => {
                        userDispatch(UserActions.setLoading(true))
                        if (product.qty !== 1) {

                          products[index] = { ...products[index], qty: product.qty - 1 }
                          setProducts(products)
                          const response = await updateCart({ productId: product.id, userData, cartId, quantity: product.qty - 1 })
                          const data = response.data
                          if (data?.error && data.name !== "AlreadyExists") {
                            router.push('/login')
                          } else {
                            props.enqueueSnackbar(data.message)
                          }

                        } else {
                          products.splice(index, 1);
                          setProducts(products)
                          const response = await deleteCart({ productId: product.id, userData, cartId })
                          const data = response.data
                          if (data?.error && data.name !== "AlreadyExists") {
                            router.push('/login')
                          } else {
                            props.enqueueSnackbar(data.message)
                          }
                        }
                        userDispatch(UserActions.setLoading(false))
                      }}
                    >
                      -</Typography>
                    <input type="text" className={styles['input']} value={product.qty} disabled />
                    <Typography
                      className={styles["plus"]}
                      onClick={async () => {
                        // updateCart(product.qty + 1)
                        userDispatch(UserActions.setLoading(true))
                        products[index] = { ...products[index], qty: product.qty + 1 }
                        setProducts(products)
                        const response = await updateCart({ productId: product.id, userData, cartId, quantity: product.qty + 1 })
                        const data = response.data
                        if (data?.error && data.name !== "AlreadyExists") {
                          router.push('/login')
                        } else {
                          props.enqueueSnackbar(data.message)
                        }
                        userDispatch(UserActions.setLoading(false))

                      }}
                    >
                      +
                    </Typography>
                    <IconButton
                      className="ml-2"
                      onClick={() => handleOpen(product, index)}
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
              {/* <div style={{ backgroundColor: 'white', height: 30, width: 30, borderRadius: '50%' }} className="d-flex align-items-center justify-content-center">
                <Image src="/icons/heart.svg" alt="upload" height={12} width={12} />
              </div> */}
            </div>
          )
        })}
        {/* <Products
          products={{ item: product.data.details.products.rows }}
          heading={product.data.details.products.name}
          readMoreText={""}
          readMoreHref={''}
        /> */}
        <hr />
        {/* <ShowContent
          heading={'Jadwal Pengiriman'}
          onClickHandler={() => {

          }}
          postDiv={
            <Box>
              <Typography className={styles['total-amount']}>
                Silahkan atur pengiriman Anda kembali.
              </Typography>
            </Box>
          }
        /> */}
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
        <CheckoutButton
          totalHeading={"Total Harga"}
          currency={"Rp"}
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
                router.push('/checkout-shipping')
              }

            } else {
              props.enqueueSnackbar("Cart is empty, please add something in the cart")
              router.push('/products')
            }

          }}
          totalItems={`Checkout (${products.length})`}
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