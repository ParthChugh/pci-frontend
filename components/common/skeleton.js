import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Product from 'components/common/product'

function Media(props) {
  const { data = [] } = props;

  return (
    <Grid className='d-flex justify-content-center flex-wrap'>
      {data.map((_, index) => (
        <Product
          key={`skeleton-${index}`}
          skeleton
        />
      ))}
    </Grid>
  );
}

export default function ProductsSkeleton(props) {
  return (
    <Box>
      <Media data={props.data} />
    </Box>
  );
}