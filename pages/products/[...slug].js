import dynamic from "next/dynamic";
import { Grid, Typography, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from "next/link";
import Image from "next/image";
import styles from 'styles/header.module.scss'
import TitleSeeMore from 'components/common/titleSeeMore'
import Breadcrumbs from 'components/common/breadcrumbs'
import Details from 'components/common/productDetails'
const SlideCarousel = dynamic(() => import("components/common/slide-carousel"), { ssr: false });

const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: "0px 8px"
}));

const StyledMenuGrid = styled(Grid)(({ theme }) => ({
  margin: "0 auto",
  borderRadius: "50%",
  // border: "1px solid #C4C4C4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));
const Container = styled(Grid)(({ theme }) => ({
  display: 'flex',
}));
const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "15px",
  textAlign: 'center',
  wordWrap: "break-word",
  width: '70px',
}));


const RenderProducts = ({ product, heading, readMoreText, readMoreHref }) => {
  if (!product) return null;

  return (
    <>
      <SlideCarousel
        CAROUSEL={product?.item || {}}
      />
      <div className="mt-5">
        <Breadcrumbs items={product?.parentCategory} />
      </div>
      <Details productDetails={product?.details} />
    </>
  );
};

function Products(props) {
  const { product } = props

  return <RenderProducts {...props} product={product?.data} />;
}

export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product_details`)
  const data = await response.json()
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      product: data || [],
      userData: JSON.parse(req.cookies.userData || '{}')
    }, // will be passed to the page component as props

  }
}
export default Products