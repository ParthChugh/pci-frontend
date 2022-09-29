import { Grid, Typography, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Link from "next/link";
import Image from "next/image";
import styles from 'styles/header.module.scss'

const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: "0px 8px",
  backgroundColor: theme.palette.neutralLight.main_700,
  padding: 8,
  borderRadius: 8
}));

const StyledMenuGrid = styled(Grid)(() => ({
  margin: "0 auto",
  borderRadius: "50%",
  // border: "1px solid #C4C4C4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));
const TypographyStyled = styled(Typography)(() => ({
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "15px"
}));


const Product = ({ product }) => {
  const { name, currency, price, id, ProductCategoryXFiles} = product;
  return (
    <Link href={`products/${id}`} passHref>
      <StyledGrid>
        {/* <StyledMenuGrid> */}
          {/* <img loading={"lazy"} className={styles["product-image"]} alt={name} src={image_url} /> */}
          <Image src={ProductCategoryXFiles?.[0]?.File?.url ||  "/icons/logo.svg"} alt="Vercel Logo" width={137} height={140} className={styles["product-image"]}/>
          {/* <Image src="/icons/wishlist.svg" alt="Wishlist" className={styles["wishlist-icon"]} width={13} height={13} />
          <Image src="/icons/wishlist-focused.svg" alt="wishlist-focused" className={styles["wishlist-focused-icon"]} width={13} height={13} /> */}
        {/* </StyledMenuGrid> */}
        <TypographyStyled className={"mt-2"}>
          {name}
        </TypographyStyled>
        <TypographyStyled color="primary" className="mt-1">
          {currency} {price}
        </TypographyStyled>
      </StyledGrid>
    </Link>
  );
};

export default Product