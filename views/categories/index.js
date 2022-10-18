import { Grid, Typography, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Link from "next/link";
import Image from "next/image";
import styles from 'styles/header.module.scss'
import TitleSeeMore from 'components/common/titleSeeMore'

const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: "0px 4px"
}));

const StyledMenuGrid = styled(Grid)(({ theme }) => ({
  // margin: "0 auto",
  // borderRadius: "50%",
  // border: "1px solid #C4C4C4",
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  cursor: "pointer",
  // width: '100%',
  position: 'absolute',

}));
const Container = styled(Grid)(({ theme }) => ({
  // display: 'flex',

}));
const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "15px",
  textAlign: 'center',
  wordWrap: "break-word",
  width: '153px',
  fontFamily: 'Montserrat',
  position: 'absolute',
  zIndex: 999,
}));


export const RenderCategory = ({ productCategories, heading, readMoreText, readMoreHref }) => {
  if (!productCategories?.length) return null;

  return (
    <Box component="div" margin={`30px 0 0px 0`}>
      <Box className="container">
        <TitleSeeMore heading={heading} readMoreText={readMoreText} href={readMoreHref} />
        {productCategories?.length ? (
          <Container className="d-flex flex-wrap justify-content-around mt-4">
            {productCategories?.map((item, index) => {
              if (!item.name) {
                return null;
              }
              const { name, Files, id } = item;
              return (
                <Link key={index} href={`/products/${id}`} passHref>
                  <StyledGrid>
                    <Box style={{ width: 153, height: 79, marginBottom: 20 }} >
                      <StyledMenuGrid >
                        <TypographyStyled variant={"body2"}  className={`${styles['product-name']} text-white`}>
                          {name}
                        </TypographyStyled>
                        <Image
                          src={Files?.[0]?.url || "/icons/logo.svg"}
                          alt="Vercel Logo"
                          width={153}
                          height={73}
                          style={{ cursor: 'pointer', borderRadius: '8px', }}
                        />
                      </StyledMenuGrid>
                    </Box>

                  </StyledGrid>
                </Link>
              );
            })}
          </Container>
        ) : (
          <Typography>No Data</Typography>
        )
        }
      </Box >
    </Box >
  );
};

export default function Category(props) {
  const { productCategories } = props
  return <RenderCategory {...props} productCategories={productCategories || []} />;
}
