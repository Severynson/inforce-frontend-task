import type { NextApiRequest, NextApiResponse } from "next";
import { DbBasicRoutes } from "../../../routes/DB-routes";

export default async function commentApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { forProductId } = req.query;

  switch (req.method) {
    case "GET": {
      const response = await fetch(
        `${process.env.DB_HOST}/${DbBasicRoutes.COMMENTS}?productId=${forProductId}`
      );

      //
      if (response.status === 200)
        res.status(200).json(JSON.stringify(await response.json()));
      //
      else res.status(400).json('{ "error": "connection with db failed"}');
      //
      break;
    }
    case "POST": {
      const response = await fetch(
        `${process.env.DB_HOST}/${DbBasicRoutes.COMMENTS}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      //
      if ((await response.status) === 201)
        res.status(201).send(await response.json());
      else res.status(400).json('{ "error": "connection with db failed"}');
      //
      break;
    }
    case "PUT": {
      const response = await fetch(
        `${process.env.DB_HOST}/${DbBasicRoutes.COMMENTS}/${forProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );
      //
      if ((await response.status) === 200)
        res.status(200).send(await response.json());
      else res.status(400).json('{ "error": "connection with db failed"}');
      //
      break;
    }
    case "DELETE": {
      const response = await fetch(
        `${process.env.DB_HOST}/${DbBasicRoutes.COMMENTS}/${forProductId}`,
        {
          method: "DELETE",
        }
      );
      //
      if (response.status === 200) res.status(200).send(`${forProductId}`);
      else res.status(400).json('{ "error": "connection with db failed"}');
      //
      break;
    }
    default: {
      res.status(400).json('{ "error": "INVALID REQUEST"}');
      break;
    }
  }
}
