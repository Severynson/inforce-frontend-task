import type { NextApiRequest, NextApiResponse } from "next";
import { DbBasicRoutes } from "../../../routes/DB-routes";

export default async function getCommentsApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const products = await (
    await fetch(`${process.env.DB_HOST}/${DbBasicRoutes.COMMENTS}`)
  ).json();

  res.status(200).json(JSON.stringify(products));
}
