const { Card, CardActionArea, CardMedia, CardContent, Typography } = require("@mui/material");

const ProductCard = props => {
	const { prod } = props;

	return (
		<Card sx={{ maxWidth: 270, position: 'relative', backgroundColor: (theme) => theme.palette.neutralLight['main_600'], boxShadow: "none" }}>
			<CardActionArea href={`/products/${prod.id}`}>
				<CardMedia
					component="img"
					sx={{
						height: {
							xs: "200px",
							md: "250px"
						},
						padding: 2, borderRadius: 2
					}}
					image={prod.Files?.[0]?.url}
					alt={prod.name}
				/>
				<CardContent>
					<Typography fontWeight="bold" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{prod.name}</Typography>
					<Typography color="red">Cek Harga</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default ProductCard;
