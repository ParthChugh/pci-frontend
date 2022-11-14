import React from "react";
import { Box, Button, Card, CardActionArea, CardMedia, Divider, Grid, IconButton, ImageList, ImageListItem, Typography, useMediaQuery } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';

const Content = props => {
	const matches = useMediaQuery('(min-width:600px)');
	const { product } = props;
	const { name, description } = product;
	const [uri, setUri] = React.useState("");

	const href = () => {
		if (typeof window !== 'undefined') {
			const location = window.location.href;
			const message = `Cek Produk ${name} di BRIK dengan link berikut: 

${location}`;
			setUri(encodeURIComponent(message));
		}
	}

	React.useEffect(href, []);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box display="flex" justifyContent="space-between">
					<Box>
						<Typography variant="h5" fontWeight="bold">{name}</Typography>
						<Typography color="red">Cek Harga </Typography>
					</Box>
					<IconButton href={`whatsapp://send?text=${uri}`} data-action="share/whatsapp/share">
						<ShareIcon />
					</IconButton>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={12} container spacing={2}>
				<Grid item xs={12}>
					<Typography variant="h6">Deskripsi Produk</Typography>
				</Grid>
				{/* <Grid item xs={12}>
					<Typography fontWeight="bold">Kategori: Pasir & Agregat</Typography>
				</Grid> */}
				<Grid item xs={12}>
					<Typography sx={{ whiteSpace: "pre-wrap" }}>
						{description}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Content;
