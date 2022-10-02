import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { productsActions, SortingOptions } from "../store/products-slice";

import Layout, { LayoutProps } from "../components/Layout";
import Home from "../components/Home";
import { useEffect } from "react";

interface HomePageProps {
  layoutProps: LayoutProps;
  productsList: any[];
}

const HomePage: NextPage<HomePageProps> = ({
  layoutProps,
  productsList,
}): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      productsActions.setData({
        products: productsList,
        sortingOption: SortingOptions.TYPE_OF_SORTING,
      })
    );
    // fetch on the first render;
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Head>
        <title>NuttyParadise</title>
        <meta
          name="Nut paste shop"
          content="All types of nut pastes that you could imagine"
        />
        <link rel="icon" href="/peanut-main-logo.svg" />
      </Head>

      <Layout {...layoutProps}>
        <Home productsList={productsList} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const layoutPropsResponse = await fetch(`${process.env.DB_HOST}/layoutProps`);
  const layoutProps = await layoutPropsResponse.json();

  const productsListResponse = await fetch(`${process.env.DB_HOST}/products`);
  const productsList = await productsListResponse.json();

  return {
    props: {
      layoutProps,
      productsList,
    },
  };
};

export default HomePage;
