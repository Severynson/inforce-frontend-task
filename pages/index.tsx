import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import Layout, { LayoutProps } from "../components/Layout";

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
        <h2>Something in main</h2>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      layoutProps: {
        headerProps: {
          mainIconImage: "https://freesvg.org/img/1540442875.png",
          sitePagesLinks: [
            {
              pageName: "Home",
              link: "/",
            },
            {
              pageName: "About Us",
              link: "/#about-us",
            },
            {
              pageName: "Frequently asked questions",
              link: "/#faq",
            },
          ],
          linkButton: {
            text: "Contact Us",
            link: "https://www.instagram.com/peanutbutter_ua/",
          },

          primaryColor: "#fff",
          secondaryColor: "#f59f00",
          textMainColor: "#222",
        },
        footerProps: {},
      },
    },
  };
};

export default Home;
