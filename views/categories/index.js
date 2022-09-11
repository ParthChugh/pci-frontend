import { Grid, Typography, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Link from "next/link";
import styles from 'styles/header.module.scss'
import TitleSeeMore from 'components/common/titleSeeMore'

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


export const RenderCategory = ({ productCategories, heading, readMoreText, readMoreHref }) => {
  if (!productCategories?.length) return null;

  return (
    <Box component="div" margin={`30px 0 0px 0`}>
      <Box className="container">
        <TitleSeeMore heading={heading} readMoreText={readMoreText} href={readMoreHref} />
        {productCategories?.length ? (
          <Container className="mt-3">
            {productCategories?.map((item, index) => {
              if (!item.title) {
                return null;
              }
              const { title, image_url, href, background } = item;
              return (
                <Link key={index} href={href} passHref>
                  <StyledGrid>
                    <StyledMenuGrid style={{ background }}>
                      <img loading={"lazy"} className={styles["menu-avatar"]} alt={title} src={image_url} />
                    </StyledMenuGrid>
                    <TypographyStyled variant={"body2"} className="mt-2 text-center max-w-md">
                      {title}
                    </TypographyStyled>
                  </StyledGrid>
                </Link>
              );
            })}
          </Container>
        ) : (
          <Typography>No Data</Typography>
        )}
      </Box>
    </Box>
  );
};

export default function Category(props) {
  const { productCategories } = props
  return <RenderCategory {...props} productCategories={productCategories?.item || []} />;
}
