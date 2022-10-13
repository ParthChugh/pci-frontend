import { Grid, Typography, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Link from "next/link";
import Image from "next/image";
import styles from 'styles/header.module.scss'
import Skeleton from '@mui/material/Skeleton';

const StyledGrid = styled(Grid)(({ theme }) => ({
  // margin: "0px 8px",
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


const Product = ({ product = {}, skeleton = false }) => {
  const { name, currency = "Rp.", id, Files, Price, ProductCategoryId } = product;
  // console.log('product123213-', product)
  return (
    <Link href={`/products/${ProductCategoryId}/${id}`} passHref>
      <StyledGrid>

        {skeleton ? <Box component={"div"}><Skeleton width={137} height={100} /> </Box>
          :
          <Image src={Files?.[0]?.url || "/icons/logo.svg"} alt="Vercel Logo" layout="responsive" width={150} height={150} className={styles["product-image"]} />
        }

        <TypographyStyled className={"mt-2"}>
          {skeleton ? <Skeleton /> : name}
        </TypographyStyled>
        <TypographyStyled color="primary" className="mt-1">
          {skeleton ? <Skeleton /> : `${currency} ${Price}`}
        </TypographyStyled>
      </StyledGrid>
    </Link>
  );
};

export default Product