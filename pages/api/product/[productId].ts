import type { NextApiRequest, NextApiResponse } from "next";

export default async function deleteProductApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { productId } = req.query;

  switch (req.method) {
    case "GET": {
      const response = await fetch(
        `${process.env.DB_HOST}/products?id=${productId}`
      );

      if (response.status === 200)
        res.status(200).json(JSON.stringify(await response.json()));
      else res.status(400).json('{ "error": "connection with db failed"}');

      break;
    }
    case "POST": {
      const response = await fetch(`${process.env.DB_HOST}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      if (response.status === 201) res.status(201).send(await response.json());
      else res.status(400).json('{ "error": "connection with db failed"}');

      break;
    }
    case "PUT": {
      const response = await fetch(
        `${process.env.DB_HOST}/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      console.log(response.status);

      if (response.status === 200) res.status(200).send(await response.json());
      else res.status(400).json('{ "error": "connection with db failed"}');

      break;
    }
    case "DELETE": {
      const response = await fetch(
        `${process.env.DB_HOST}/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) res.status(200).send(`${productId}`);
      else res.status(400).json('{ "error": "connection with db failed"}');

      break;
    }
    default: {
      res.status(400).json('{ "error": "INVALID REQUEST"}');
    }
  }
}
