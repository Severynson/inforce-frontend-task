import type { NextApiRequest, NextApiResponse } from "next";

export default async function deleteProductApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { productId } = req.query;

  if (req.method === "DELETE") {
    const response = await fetch(
      `${process.env.DB_HOST}/products/${productId}`,
      {
        method: "DELETE",
      }
    );
    //
    if (response.status === 200) res.status(200).send(`${productId}`);
    else res.status(400).json('{ "error": "connection with db failed"}');
    //
  }
  //
  else if (req.method === "POST" && productId === "new-product") {
    const response = await fetch(`${process.env.DB_HOST}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    //
    if ((await response.status) === 201)
      res.status(201).send(await response.json());
    else res.status(400).json('{ "error": "connection with db failed"}');
    //
  }

  res.status(400).json('{ "error": "INVALID REQUEST"}');
}
