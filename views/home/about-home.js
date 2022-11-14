import { makeStyles } from '@mui/styles';
import React from 'react';
const { Typography, Box, Grid, Button } = require("@mui/material");

const LINES_TO_SHOW = 6;

const useStyles = makeStyles({
	container: {
		maxWidth: "100%"
	},
	multiLineEllipsis: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "pre-line",
		display: "-webkit-box",
		"-webkit-line-clamp": LINES_TO_SHOW,
		"-webkit-box-orient": "vertical"
	},
	noEllipsis: {
		whiteSpace: "pre-line",
	}
});

const AboutHome = (props) => {
	const { about } = props;
	const [more, setMore] = React.useState(false);
	const classes = useStyles();

	const onMore = () => {
		setMore(!more);
	}

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography textOverflow="ellipsis" className={!more ? classes.multiLineEllipsis : classes.noEllipsis}>{about}</Typography>
				</Grid>
				{
					more &&
					<React.Fragment>
						<Grid item xs={12}>
							<Typography color="primary" variant="h6" fontWeight="bold">Visi</Typography>
							<li>Menjadi pemimpin solusi satu atap untuk material konstruksi di Asia Tenggara.</li>
						</Grid>
						<Grid item xs={12}>
							<Typography color="primary" variant="h6" fontWeight="bold">Misi</Typography>
							<li>Memberikan harga yang transparan, menyediakan material, produk, dan jasa konstruksi dengan kualitas terbaik secara konsisten.</li>
						</Grid>
					</React.Fragment>
				}
				<Grid item xs={12}>
					<Button variant='text' sx={{ padding: 1 }} onClick={onMore}>{!more ? "Baca selengkapnya" : "Tutup"}</Button>
				</Grid>
			</Grid>
		</Box>
	)
}

export default AboutHome;
