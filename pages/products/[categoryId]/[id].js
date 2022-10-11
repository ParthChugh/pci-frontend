import dynamic from "next/dynamic";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import Breadcrumbs from 'components/common/breadcrumbs'
import Details from 'components/common/productDetails'
const SlideCarousel = dynamic(() => import("components/common/slide-carousel"), { ssr: false });

const RenderProducts = ({ product, categoryProduct }) => {
  if (!product) return null;
  // console.log('categoryProduct123213', categoryProduct)
  return (
    <>
      <SlideCarousel
        CAROUSEL={categoryProduct?.Files || {}}
      />
      <div className="mt-5">
        {/* <Breadcrumbs items={product?.parentCategory} /> */}
      </div>
      <Details productDetails={product?.details} categoryProduct={categoryProduct} />
    </>
  );
};

function Products(props) {
  const { product } = props

  return <RenderProducts {...props} product={product?.data} />;
}

export async function getServerSideProps(appContext) {
  const { locale, req, params } = appContext
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product_details`)
  const productResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/v1/customer/homeScreen/product?query=id=${params.id}`)
  const product = await productResponse.json()
  const data = await response.json()
  if(product.data.count !== 1) {
    return {
      redirect: {
        permanent: false,
        destination: "/products/"
      }, // will be passed to the page component as props
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      product: data || [],
      userData: JSON.parse(req.cookies.userData || '{}'),
      categoryProduct: product.data.rows[0]
    }, // will be passed to the page component as props

  }
}
export default Products