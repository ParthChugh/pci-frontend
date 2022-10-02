import { useRef } from 'react';
import Typography from '@mui/material/Typography';
import ActionSheet from "actionsheet-react";
import { useTranslation } from 'next-i18next';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TitleSeeMore from 'components/common/titleSeeMore'
import styles from 'styles/header.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Products from 'views/products'
import TopContent from 'components/common/topContent'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ProductDetails(props) {
  const ref = useRef();

  const handleOpen = () => {
    ref.current.open();
  };

  const handleClose = () => {
    ref.current.close();
  };
  const { productDetails: {
    name,
    price,
    discount,
    discountMessage,
    details: {
      variants,
      buyNowButton,
      addToCart,
      descriptionHeading,
      categoryName,
      description,
      variantsHeading,
      minimum
    },
    products
  } } = props;
  console.log('products-----', products.rows)
  const total = 64.000
  const { t } = useTranslation('common', { keyPrefix: "categories" });
  return (
    <div className='ml-3 mr-3'>

      <TopContent
        name={name}
        price={price}
        discount={discount}
        discountMessage={discountMessage}
      />
      <TitleSeeMore heading={variantsHeading} readMoreText={t("see-more")} href={'/variants'} />
      <div className={`d-flex ${styles["variant-container"]}`}>
        {variants.map((el, index) => (
          <Typography key={`variants-${index}`} className={styles["variant-button"]}>{el.name}</Typography>
        ))}
      </div>
      <div className={`${styles["number"]} mt-4 mb-4 align-items-center`}>
        <Typography className={styles["minus"]}>-</Typography>
        <input type="text" className={styles['input']} value="1" />
        <Typography className={styles["plus"]}>+</Typography>
        <Typography className={styles["minimum"]}>Pesanan minimal: {minimum}</Typography>
      </div>
      <div className='d-flex justify-content-between'>
        <Typography component="div" className={styles["subtotal"]}>
          {"Subtotal"}
        </Typography>
        <Typography component="div" className={styles["total"]}>
          Rp. {total}
        </Typography>
      </div>
      <Typography component="div" className={`${styles['buy-now-button']} mb-3 mt-3`} style={{ cursor: 'pointer' }}>
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
      <Products
        products={{ item: products.rows }}
        heading={products.name}
        readMoreText={""}
        readMoreHref={''}
      />
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
              imgUrl="https://s3-ap-southeast-1.amazonaws.com/zenius-zenfeed/feed/media-9af6547f-c49b-4a54-a19a-9d81398b55f9-file.png"
              variant={"Default"}
              name={name}
              price={price}
              discount={discount}
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
          <TitleSeeMore heading={variantsHeading} readMoreText={""} />
          <div className={`d-flex ${styles["variant-container"]}`}>
            {variants.map((el, index) => (
              <Typography key={`variants-${index}`} className={styles["variant-button"]}>{el.name}</Typography>
            ))}
          </div>
          <div className={`${styles["number"]} mt-4 align-items-center justify-content-between`}>
            <Typography className={styles["subtotal"]}>Jumlah Produk</Typography>

            <div className='d-flex'>
              <Typography className={styles["minus"]}>-</Typography>
              <input type="text" className={styles['input']} value="1" />
              <Typography className={styles["plus"]}>+</Typography>
            </div>

          </div>
          <Typography className={styles["minimum"]}>Pesanan minimal: {minimum}</Typography>
          <Typography component="div" className={`${styles['buy-now-button']} mb-3 mt-3`} style={{ cursor: 'pointer' }}>
            {"Masukkan Keranjang"}
          </Typography>
        </div>
      </ActionSheet>
    </div>
  );
}