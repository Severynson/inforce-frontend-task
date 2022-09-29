import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { productsActions } from "../store/products-slice";

import Layout, { LayoutProps } from "../components/Layout";
import HomeComponent from "../components/Home";
import { useEffect } from "react";

interface HomePageProps {
  layoutProps: LayoutProps;
  productsList: any[];
}

const Home: NextPage<HomePageProps> = ({
  layoutProps,
  productsList,
}): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.setData(productsList));
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
        <HomeComponent productsList={productsList} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const layoutProps = JSON.parse(
    await (await fetch(`${process.env.API_HOST}/layoutData`)).json()
  );
  const productsList = JSON.parse(
    await (await fetch(`${process.env.API_HOST}/productsData`)).json()
  );

  return {
    props: {
      layoutProps,
      productsList,
    },
  };
};

export default Home;
