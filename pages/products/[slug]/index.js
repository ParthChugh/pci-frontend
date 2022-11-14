import React from 'react';
import dynamic from "next/dynamic";
import { Button, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getUserDetails } from 'helpers/user'
import { AboutHome, Advantages, Category, Product } from 'views/home';
import Image from 'next/image';
import { Content } from 'views/products';

const SlideCarousel = dynamic(() => import("components/common/slide-carousel"), { ssr: false });

function Homepage(props) {
  const router = useRouter();
  const { t } = useTranslation('common', { keyPrefix: "categories" });

  const classToggle = (isMobile) => {
    // const element = document.getElementsByClassName('header-search-container')[0]
    if (isMobile) {
      // ReactDOM.findDOMNode(element).classList.add('search-suggestion-full')
      document.getElementById('header-wrapper').classList.add('stop-scroll')
      document.getElementById('q').focus()
    } else {
      // ReactDOM.findDOMNode(element).classList.remove('search-suggestion-full')
      document.getElementById('header-wrapper').classList.remove('stop-scroll')
    }
  }

	const { product } = props;
	const { Files } = product;

	const onBuy = () => {		
		if (typeof window !== 'undefined') {
			const location = window.location.href;
			const message = `Saya tertarik untuk membeli Produk ${product.name} dengan link berikut: 
			
${location}`;
			const uri = encodeURIComponent(message);
			const url = `https://wa.me/62882000001001?text=${uri}`;
	
			window.open(url, "_blank").focus();
		}
	}

  return (
    <>
      <Grid item xs={12}>
        <SlideCarousel
          key={`carousel-1`}
          CAROUSEL={Files?.length < 2 ? [...Files, ...Files] : Files}
					height="20rem"
					fit="cover"
        />
      </Grid>
			<Grid item xs={12} sx={{ marginTop: -5 }}>
				<img 
					src="/img/call-cs.png" 
					style={{
						width: "100%",
						height: "100%",
						cursor: "pointer"
					}}
					onClick={onBuy}
				/>
			</Grid>
			<Grid item xs={12} sx={{ width: "100%"}}>
				<Content product={product} />
			</Grid>
			<Grid item xs={12} sx={{ width: "100%"}}>
				<Button onClick={onBuy} variant="contained" fullWidth>Pesan Sekarang</Button>
			</Grid>
    </>
  )
}

export async function getServerSideProps(appContext) {
  const { locale, req, params } = appContext

	const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v2/customer/products/${params.slug}`);
  const json = await response.json();
	console.log(json, 'anu')

	console.log(`${params.slug}`);
  // const data = json.data;
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // ...data,
      userData: JSON.parse(req.cookies.userData || '{}'),
			product: json.data,
      // products: await products.json()
    }, // will be passed to the page component as props

  }
}

export default Homepage