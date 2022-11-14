import React from 'react';
import dynamic from "next/dynamic";
import { Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getUserDetails } from 'helpers/user'
import { AboutHome, Advantages, Category, Product } from 'views/home';

const SlideCarousel = dynamic(() => import("components/common/slide-carousel"), { ssr: false });

function Homepage(props) {
  const router = useRouter();
  const { t } = useTranslation('common', { keyPrefix: "categories" });
  const isLoggedIn = Object.values(props.userData || {}).length > 0 ? !!props.userData : !(getUserDetails()).error

  const { carousel, about, categories = [], products = [], advantages: { items, img } } = props

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

  return (
    <>
      <Grid item xs={12}>
        <SlideCarousel
          key={`carousel-1`}
          CAROUSEL={carousel}
        />
      </Grid>
      <Grid item xs={12} sx={{ marginTop: -5 }}>
        <AboutHome about={about} />
      </Grid>
      <div style={{ marginTop: '2rem', width: "100%", borderBottom: '1px solid #01020666' }} />
      <Grid item xs={12}>
        <Category categories={categories} />
      </Grid>
      <div style={{ marginTop: '2rem', width: "100%", borderBottom: '1px solid #01020666' }} />
      <Grid item xs={12}>
        <Advantages items={items} img={img} />
      </Grid>
      <div style={{ marginTop: '2rem', width: "100%", borderBottom: '1px solid #01020666' }} />
      <Grid item xs={12}>
        <Product products={products} />
      </Grid>
      <div style={{ marginTop: '2rem', width: "100%", borderBottom: '1px solid #01020666' }} />
    </>
  )
}

export async function getServerSideProps(appContext) {
  const { locale, req } = appContext
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v2/customer/home`);
  const json = await response.json();

  const data = json.data;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      ...data,
      userData: JSON.parse(req.cookies.userData || '{}'),
      // products: await products.json()
    }, // will be passed to the page component as props

  }
}
export default Homepage