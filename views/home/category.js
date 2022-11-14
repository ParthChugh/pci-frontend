import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CategoryCard } from "components/common";

const Category = props => {
	const { categories } = props;
	return (
		<React.Fragment>
			<Box display="flex" justifyContent="space-between" sx={{ marginBottom: 4 }}>
				<Typography variant='h4' fontWeight="bold">Kategori Produk</Typography>
				<Button href="/products">
					<Typography fontWeight="bold">Lihat Semua &gt; </Typography>
				</Button>			</Box>
			<Grid container spacing={{ xs: 2, md: 4 }} sx={{ marginTop: 2, boxShadow: "none" }}>
				{
					categories.length > 0 && categories.map(cat => (
						<Grid item xs={6} md={4} key={cat.id}>
							<CategoryCard cat={cat} />
						</Grid>
					))
				}
			</Grid>
		</React.Fragment>
	)
}

export default Category;
