import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useTranslation } from 'next-i18next';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TitleSeeMore from 'components/common/titleSeeMore'
import styles from 'styles/header.module.scss'
import breadcrumbStyles from 'styles/breadcrumb.module.scss'
import Products from 'views/products'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ProductDetails(props) {
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
      <Typography className={styles['label-sub-heading-1']}>{name}</Typography>
      <Typography className={breadcrumbStyles['price-product-details']}>Rp. {parseFloat(price) * (100 - parseFloat(discount)) / 100}</Typography>
      <div className='d-flex flex-row'>
        <Typography className={styles.typography} component="div">
          Rp. {parseFloat(price)}
        </Typography>
        <Typography component="div" className={`ml-2 ${styles["discount-button"]}`}>
          {`${discount} %`}
        </Typography>
      </div>
      <Typography component="div" className={`${styles["discount-descrption"]} mr-3`}>
        {discountMessage}
      </Typography>
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
      <Typography component="div" className={`${styles['buy-now-button']} mb-3 mt-3`}>
        {buyNowButton}
      </Typography>
      <Typography component="div" className={`${styles['buy-now-button']} mb-3`}>
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
    </div>
  );
}