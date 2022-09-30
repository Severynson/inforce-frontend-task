import type { NextApiRequest, NextApiResponse } from "next";

export default async function deleteProductApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === "DELETE") {
    const { productId } = req.query;

    const response = await fetch(
      `${process.env.DB_HOST}/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    console.log(response.status);

    if (response.status === 200) res.status(200).send(`${productId}`);
    else res.status(404).send('{ "error": "connection with db failed"}');
  }

  res.status(404).send('{ "error": "connection with db failed"}');
}
