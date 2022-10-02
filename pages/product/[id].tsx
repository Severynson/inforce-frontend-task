import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Layout, { LayoutProps } from "../../components/Layout";
import ProductComponent, { Product } from "../../components/Product";
import { ApiBasicRoutes } from "../../routes/api-routes";

interface ProductPageProps {
  productProps: Product;
  layoutProps: LayoutProps;
}

export default function ProductPage({
  productProps,
  layoutProps,
}: ProductPageProps) {
  return (
    <Layout {...layoutProps}>
      <ProductComponent {...productProps} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  const responseProductProps = await fetch(
    `${process.env.API_HOST}/${ApiBasicRoutes.PRODUCT}/${params?.id}`
  );

  const responseProductPropsJSON = await responseProductProps.json();

  const productProps = JSON.parse(responseProductPropsJSON)[0] as Product;

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
