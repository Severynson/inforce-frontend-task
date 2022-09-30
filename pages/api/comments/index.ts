import type { NextApiRequest, NextApiResponse } from "next";

export default async function getCommentsApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const products = await (
    await fetch(`${process.env.DB_HOST}/comments`)
  ).json();

  res.status(200).json(JSON.stringify(products));
}
