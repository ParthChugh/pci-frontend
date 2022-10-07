import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
        {variant && <Typography className={`${styles['variant']} mb-2`}>{variant}</Typography>}
        <div>
          <Typography className={styles['cart-product-name']}>{name}</Typography>
          <Box className='d-flex'>
            <Typography className={`${styles['cart-product-price']} mt-1`}>Rp. {parseFloat(price) * (100 - parseFloat(discount || 0)) / 100}</Typography>
            {discount && <Typography className={`${styles.typography} ml-2`} component="div">
              Rp. {parseFloat(price)}
            </Typography>}
          </Box>
        </div>

        <div className='d-flex flex-row'>
          {discount &&
            <Typography component="div" className={`${styles["discount-button"]}`}>
              {`${discount}%`}
            </Typography>
          }
        </div>
        <Typography component="div" className={`${styles["discount-descrption"]} mr-3`}>
          {discountMessage}
        </Typography>
        {postDiv}
      </div>

    </div>
  )
}