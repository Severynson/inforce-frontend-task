import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Product, { ProductProps } from "../../components/Product";

export default function ProductPage(props: ProductProps) {
  return <Product {...props} />;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  const response = await fetch(
    `http://localhost:3000/api/product/${params?.id}`
  );

  const responseJSON = await response.json();

  const product = JSON.parse(responseJSON)[0] as ProductProps;

  return {
    props: product,
  };
};
