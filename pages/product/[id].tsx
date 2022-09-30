import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Product, { ProductProps } from "../../components/Product";

export default function ProductPage(props: ProductProps) {
  return <Product {...props} />;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  console.log(params?.id);

  const response = await (
    await fetch(`http://localhost:3000/api/product/${params?.id}`)
  ).json();

  const product = JSON.parse(response)[0] as ProductProps;

  return {
    props: product,
  };
};
