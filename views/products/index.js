import { Grid, Typography, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import TitleSeeMore from 'components/common/titleSeeMore'
import Product from 'components/common/product'

const Container = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "1.5rem",
}));

export const RenderCategory = (props) => {
  const { products, heading, readMoreText, readMoreHref } = props;
  if (!products?.length) return null;

  return (
    <Box component="div" margin={`30px 0 0px 0`}>
      <Box className="container">
        <TitleSeeMore heading={heading} readMoreText={readMoreText} href={readMoreHref} />
        {products?.length ? (
          <Container className="mt-3">
            {products?.map((item, index) => {
              if (!item.name) {
                return null;
              }
              return (
                <Box style={{ cursor: 'pointer' }}>
                  <Product
                    key={index}
                    product={item}
                  />
                </Box>

              )
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
  const { products } = props
  return <RenderCategory {...props} products={products?.item || []} />;
}
