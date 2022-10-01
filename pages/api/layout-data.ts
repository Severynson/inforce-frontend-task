import type { NextApiRequest, NextApiResponse } from "next";

export default async function getLayoutDataApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const layoutPropsResponse = await fetch(`${process.env.DB_HOST}/layoutProps`);
  const layoutProps = await layoutPropsResponse.json();
  const layoutPropsJSON = JSON.stringify(layoutProps);

  res.status(200).json(layoutPropsJSON);
}
