import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Layout, { LayoutProps } from "../components/Layout";
import HomeComponent from "../components/Home";

interface HomePageProps {
  layoutProps: LayoutProps;
}

const Home: NextPage<HomePageProps> = ({ layoutProps }): JSX.Element => {
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
        <HomeComponent />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const layoutProps = JSON.parse(
    await (await fetch(`${process.env.API_HOST}/layoutData`)).json()
  );

  return {
    props: {
      layoutProps,
    },
  };
};

export default Home;
