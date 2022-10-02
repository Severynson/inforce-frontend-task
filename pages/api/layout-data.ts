import type { NextApiRequest, NextApiResponse } from "next";
import { DbBasicRoutes } from "../../routes/DB-routes";

export default async function getLayoutDataApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const layoutPropsResponse = await fetch(`${process.env.DB_HOST}/${DbBasicRoutes.LAYOUT_PROPS}`);
  const layoutProps = await layoutPropsResponse.json();
  const layoutPropsJSON = JSON.stringify(layoutProps);

  res.status(200).json(layoutPropsJSON);
}
