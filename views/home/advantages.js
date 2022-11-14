import React from 'react';
import { Card, CardMedia, Grid, Typography } from '@mui/material';

const Advantages = props => {
	const { items = [], img = "" } = props;
	return (
		<Grid container>
			<Grid item xs={12} md={6}>
				<Typography variant='h4' fontWeight="bold" sx={{ marginBottom: 4 }}>Keunggulan BRIK</Typography>
				<Grid container gap={5}>
					{items.map((item, key) => (
						<Grid item xs={12} key={key}>
							<CardAdvantages item={item} />
						</Grid>
					))}
				</Grid>
			</Grid>
			<Grid item md={6} sx={{ display: { xs: "none", md: "block" } }}>
				<img
					width="550"
					height="500"
					src={img}
					alt="benefit"
					style={{
						objectFit: 'cover',
						borderRadius: 10,
						float: 'right'
					}}
				/>
			</Grid>
		</Grid>
	)
}

const CardAdvantages = props => {
	const { item: { title, content, icon } } = props;

	return (
		<Card sx={{ padding: 2, boxShadow: "0px 0px 24px 0px rgba(0,0,0,0.10);" }}>
			<Grid container sx={{ alignItems: 'flex-start' }} gap={1}>
				<Grid item xs={1} sx={{ marginRight: 1 }}>
					<CardMedia
						component="img"
						image={icon}
						alt="advantages"
						sx={{ borderRadius: 0.5 }}
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography fontWeight="bold" >{title}</Typography>
					<Typography>{content}</Typography>
				</Grid>
			</Grid>
		</Card>
	);
}

export default Advantages;
