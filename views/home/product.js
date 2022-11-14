import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ProductCard } from 'components/common';

const Product = props => {
	const { products } = props;
	return (
		<React.Fragment>
			<Box display="flex" justifyContent="space-between" sx={{ marginBottom: 4 }}>
				<Typography variant='h4' fontWeight="bold">Rekomendasi Produk</Typography>
				<Button href="/products">
					<Typography fontWeight="bold">Lihat Semua &gt; </Typography>
				</Button>
			</Box>
			<Grid container spacing={2} sx={{ marginTop: 2 }}>
				{
					products.length > 0 && products.map(prod => (
						<Grid item xs={6} md={3} key={prod.id}>
							<ProductCard prod={prod} />
						</Grid>
					))
				}
			</Grid>
		</React.Fragment>
	)
}

export default Product;
