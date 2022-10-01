import type { NextApiRequest, NextApiResponse } from "next";

export default async function getProductsDataApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const productsResponse = await fetch(`${process.env.DB_HOST}/products`);
  const products = await productsResponse.json();
  const productsJSON = JSON.stringify(products);

  res.status(200).json(productsJSON);
}
