import { useRef, useState, useContext } from 'react';
import { UserContext } from 'context/users/reducer';
import Typography from '@mui/material/Typography';
import ActionSheet from "actionsheet-react";
import { useTranslation } from 'next-i18next';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TitleSeeMore from 'components/common/titleSeeMore'
import styles from 'styles/header.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
import { withSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import Products from 'views/products'
import TopContent from 'components/common/topContent'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addProductToBasket, getUserDetails } from 'helpers/user'
import * as UserActions from 'context/users/actions'

function ProductDetails(props) {
  const ref = useRef();
  const router = useRouter()
  const {
    userDispatch
  } = useContext(UserContext);
  const handleOpen = () => {
    ref.current.open();
  };

  const handleClose = () => {
    ref.current.close();
  };
  const {
    productDetails: {
      // name,
      // price,
      // discount,
      discountMessage,
      details: {
        // variants,
        buyNowButton,
        addToCart,
        descriptionHeading,
        categoryName,
        // description,
        // variantsHeading,
        // minimum
      },
      // products
    },
    categoryProduct: {
      id,
      name,
      Price,
      basePercent,
      description,
      SelectedPrices: {
        ProductFixedPriceId
      }
    },
    categoryProduct
  } = props;
  const userData = getUserDetails()
  const price = Price
  const total = price
  const { t } = useTranslation('common', { keyPrefix: "categories" });
  const [orderValue, setOrderValue] = useState(1)
  return (
    <div className='ml-3 mr-3'>
      <TopContent
        name={name}
        price={price}
        discount={basePercent}
        discountMessage={discountMessage}
      />
      {/* <TitleSeeMore heading={variantsHeading} readMoreText={t("see-more")} href={'/variants'} />
      <div className={`d-flex ${styles["variant-container"]}`}>
        {variants.map((el, index) => (
          <Typography key={`variants-${index}`} className={styles["variant-button"]}>{el.name}</Typography>
        ))}
      </div> */}
      <div className={`${styles["number"]} mt-4 mb-4 align-items-center`}>
        <Typography
          className={styles["minus"]}
          onClick={() => {
            if (orderValue !== 1) {
              setOrderValue(orderValue - 1)
            }
          }}
        >
          -</Typography>
        <input type="text" className={styles['input']} value={orderValue} disabled />
        <Typography
          className={styles["plus"]}
          onClick={() => {
            setOrderValue(orderValue + 1)
          }}
        >
          +
        </Typography>
        {/* <Typography className={styles["minimum"]}>Pesanan minimal: {minimum}</Typography> */}
      </div>
      <div className='d-flex justify-content-between'>
        <Typography component="div" className={styles["subtotal"]}>
          {"Subtotal"}
        </Typography>
        <Typography component="div" className={styles["total"]}>
          Rp. {total}
        </Typography>
      </div>
      <Typography
        component="div"
        className={`${styles['buy-now-button']} mb-3 mt-3`}
        style={{ cursor: 'pointer' }}
        onClick={async () => {
          userDispatch(UserActions.setLoading(true))
          const response = await addProductToBasket({ priceId: ProductFixedPriceId, quantity: orderValue, productId: id, enqueueSnackbar: props.enqueueSnackbar, userData })
          if (response?.error && response.name !== "AlreadyExists") {
            router.push('/login')
          } else {
            props.enqueueSnackbar(response.message)
          }
          userDispatch(UserActions.setLoading(false))
          router.push('/cart')
        }}>
        {buyNowButton}
      </Typography>
      <Typography component="div" className={`${styles['buy-now-button']} mb-3`} onClick={handleOpen} style={{ cursor: 'pointer' }}>
        {addToCart}
      </Typography>
      <Accordion elevation={0} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="div" className={styles['label-sub-heading-1']}>
            {descriptionHeading}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div" className={styles['category-name']}>
            {categoryName}
          </Typography>
          <Typography component="div" className={styles["breadcrumb"]}>
            {description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* <Products
        products={{ item: products.rows }}
        heading={products.name}
        readMoreText={""}
        readMoreHref={''}
      /> */}
      <ActionSheet
        ref={ref}
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
        <div id="__next" className='px-4'>
          <div className='d-flex align-items-start justify-content-between mt-4'>
            <TopContent
              imgUrl={categoryProduct?.Files[0]?.url || "/icons/logo.svg"}
              variant={"Default"}
              name={name}
              price={price}
              discount={basePercent}
              discountMessage={''}
            />
            <div>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
                className="mt-2"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          {/* <TitleSeeMore heading={variantsHeading} readMoreText={""} />
          <div className={`d-flex ${styles["variant-container"]}`}>
            {variants.map((el, index) => (
              <Typography key={`variants-${index}`} className={styles["variant-button"]}>{el.name}</Typography>
            ))}
          </div> */}
          <div className={`${styles["number"]} mt-4 align-items-center justify-content-between`}>
            <Typography className={styles["subtotal"]}>Jumlah Produk</Typography>

            <div className='d-flex'>
              <Typography
                className={styles["minus"]}
                onClick={() => {
                  if (orderValue !== 1) {
                    setOrderValue(orderValue - 1)
                  }
                }}
              >
                -</Typography>
              <input type="text" className={styles['input']} value={orderValue} disabled />
              <Typography
                className={styles["plus"]}
                onClick={() => {
                  setOrderValue(orderValue + 1)
                }}
              >
                +
              </Typography>
            </div>
          </div>
          {/* <Typography className={styles["minimum"]}>Pesanan minimal: {minimum}</Typography> */}
          <Typography component="div" className={`${styles['buy-now-button']} mb-3 mt-3 mb-8`} style={{ cursor: 'pointer' }}
            onClick={async () => {
              userDispatch(UserActions.setLoading(true))
              const response = await addProductToBasket({ priceId: ProductFixedPriceId, quantity: orderValue, productId: id, enqueueSnackbar: props.enqueueSnackbar, userData })
              console.log('response?.error12321', response)
              if (response?.error && response.name !== "AlreadyExists") {

                router.push('/login')
              } else {
                props.enqueueSnackbar(response.message)
              }
              userDispatch(UserActions.setLoading(false))
            }}>
            {"Masukkan Keranjang"}
          </Typography>
        </div>
      </ActionSheet>
    </div>
  );
}
export default withSnackbar(ProductDetails)