import Typography from '@mui/material/Typography';
import breadcrumbStyles from 'styles/breadcrumb.module.scss'
import Image from "next/image";
import styles from 'styles/header.module.scss'

export default function TopContent({ name, discount, price, discountMessage, variant, imgUrl, postDiv }) {
  return (
    <div className='d-flex align-items-center'>
      {imgUrl &&
        <div className='mr-4'>
          <Image
            src={imgUrl}
            alt="BRIK"
            width={"100px"}
            height={"100px"}
          />
        </div>
      }
      <div>
        {variant && <Typography className={styles['variant']}>{variant}</Typography>}
        <div>
          <Typography className={styles['label-sub-heading-1']}>{name}</Typography>
          <Typography className={breadcrumbStyles['price-product-details']}>Rp. {parseFloat(price) * (100 - parseFloat(discount)) / 100}</Typography>
        </div>

        <div className='d-flex flex-row'>
          <Typography className={styles.typography} component="div">
            Rp. {parseFloat(price)}
          </Typography>
          <Typography component="div" className={`ml-2 ${styles["discount-button"]}`}>
            {`${discount}%`}
          </Typography>
        </div>
        <Typography component="div" className={`${styles["discount-descrption"]} mr-3`}>
          {discountMessage}
        </Typography>
        {postDiv}
      </div>

    </div>
  )
}