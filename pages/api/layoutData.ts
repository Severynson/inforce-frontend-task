// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { LayoutProps } from "../../components/Layout";

type Data = {
  layoutProps: LayoutProps;
};

export default async function getLayoutDataApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const layoutProps = await (
    await fetch(`${process.env.DB_HOST}/layoutProps`)
  ).json();

  console.log("fetched props in layoutDataApi", layoutProps);

  res.status(200).json(JSON.stringify(layoutProps));
}
