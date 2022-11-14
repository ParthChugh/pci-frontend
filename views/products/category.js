import { Card, CardActionArea, CardMedia, Grid, ImageList, ImageListItem, Typography, useMediaQuery } from "@mui/material";
import { CategoryCard } from "components/common";

import React from "react";

const Category = props => {
	const matches = useMediaQuery('(min-width:600px)');
	const {
		categories,
		cols = matches ? categories?.length / 2 : categories?.length,
	} = props;


	const categoriesLength = categories.length > 0;

	return (
		<React.Fragment>
			<Typography variant='h4' fontWeight="bold">Kategori Produk</Typography>
			<ImageList sx={{ marginTop: 2, overflowX: "auto" }} cols={cols} gap={8}>
				{
					categoriesLength && categories.map(cat => (
						<ImageListItem key={cat.id}>
							<CategoryCard cat={cat} height={150} width={250} />
						</ImageListItem>
					))
				}
			</ImageList>
		</React.Fragment>
	)
}

export default Category;
