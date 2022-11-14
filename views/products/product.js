import React from "react";
import { Card, CardActionArea, CardMedia, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { CategoryCard, ProductCard } from "components/common";

const Product = props => {
	const { 
		products, 
	} = props;

	const productsLength = products.length > 0;

	return (
		<React.Fragment>
			<Typography variant='h4' fontWeight="bold">Produk</Typography>
			<Grid container sx={{ marginTop: 2 }} spacing={2}>
				{
					productsLength && products.map(prod => (
						<Grid item xs={6} md={products.length > 3 ? 3 : (12 / products.length)} key={prod.id}>
							<ProductCard prod={prod} />
						</Grid>
					))
				}
			</Grid>
		</React.Fragment>
	)
}

export default Product;
