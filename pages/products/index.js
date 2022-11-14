import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Divider, Grid, Typography } from '@mui/material'
import { Category, Product } from 'views/products'

const Products = props => {
	console.log(props, 'ini apap??')
	const { categories = [], products = {}, params } = props
	const { totalItems, totalPages } = products;

	return (
		<React.Fragment>
			{
				!!categories.length &&
				<Grid item xs={12}>
					<Category categories={categories} cols={params ? categories.length : undefined} />
				</Grid>
			}
			<Grid item xs={12} sx={{ width: "100%" }}>
				<Divider variant="fullWidth" sx={{ marginBottom: 2 }} />
				<Typography>Menampilkan {totalItems} Produk (1-{totalPages * totalItems} dari {totalItems})</Typography>
			</Grid>
			<Grid item xs={12}>
				<Product products={products.data} />
			</Grid>
		</React.Fragment>
	)
}

export async function getServerSideProps(appContext) {
  const { locale, req, query = {} } = appContext

	console.log(appContext, 'ini apapap??')
	const params = query?.category ? `?category=${query?.category ?? undefined}` : null;
	console.log(params, 'ini apaa??')
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v2/customer/categories${params ? params : ""}`);
  const json = await response.json();

  const responseProd = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v2/customer/products${params ? params : ""}`);
  const jsonProd = await responseProd.json();

	console.log(jsonProd, 'asuu apa ini???')
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      categories: json.data,
			products: jsonProd.data,
      userData: JSON.parse(req.cookies.userData || '{}'),
			params,
    },
  }
}

export default Products;
