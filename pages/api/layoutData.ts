// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getLayoutDataApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const layoutProps = await (
    await fetch(`${process.env.DB_HOST}/layoutProps`)
  ).json();

  res.status(200).json(JSON.stringify(layoutProps));
}
