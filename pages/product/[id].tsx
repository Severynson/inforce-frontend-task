import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Layout, { LayoutProps } from "../../components/Layout";
import Product, { ProductProps } from "../../components/Product";

interface ProductPageProps {
  productProps: ProductProps;
  layoutProps: LayoutProps;
}

export default function ProductPage({
  productProps,
  layoutProps,
}: ProductPageProps) {
  return (
    <Layout {...layoutProps}>
      <Product {...productProps} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  const responseProductProps = await fetch(
    `http://localhost:3000/api/product/${params?.id}`
  );

  const responseProductPropsJSON = await responseProductProps.json();

  const productProps = JSON.parse(responseProductPropsJSON)[0] as ProductProps;

  const responseLayoutProps = await fetch(
    `${process.env.API_HOST}/layout-data`
  );

  const responselayoutPropsJSON = await responseLayoutProps.json();

  const layoutProps = JSON.parse(responselayoutPropsJSON);

  return {
    props: {
      productProps,
      layoutProps,
    },
  };
};
