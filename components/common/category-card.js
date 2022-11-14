import React from 'react';
import { useRouter } from 'next/router';
const { Card, CardActionArea, CardMedia, Typography } = require("@mui/material");

const CategoryCard = props => {
	const router = useRouter();
	const { cat, height, width } = props;

	console.log(cat, 'ini apapap??')
	const generateUri = () => {
		if (typeof window !== 'undefined') {
			router.query.category = cat.id;
			router.push(router)
		}
	}

	return (
		<Card sx={{ position: 'relative', width, height }}>
			<CardActionArea {...cat.hasChildren ? { href: `/products/?category=${cat.id}` } : { onClick: generateUri }}>
				<CardMedia
					component="img"
					image={cat.Files?.[0]?.url}
					// height="230"
					// width="400"
					height={height ?? "180"}
					width={width ?? "400"}
					alt={cat.name}
				/>
				<CardMedia
					component="div"
					height="180"
					width="400"
					sx={{
						position: 'absolute',
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						backgroundColor: "black",
						opacity: "50%",
						height: "180px",
						width: "400px",
					}}
				/>
				<Typography color="white" sx={{
					position: 'absolute',
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
					fontSize: '1.2rem',
					textAlign: 'center',
					width: '100%',
					padding: '0 2rem',
				}}>
					{cat.name}
				</Typography>
			</CardActionArea>
		</Card>
	)
}

export default CategoryCard;
