import type { NextApiRequest, NextApiResponse } from "next";

export default async function commentApi(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { forProductId } = req.query;

  if (req.method === "GET") {
    const response = await fetch(
      `${process.env.DB_HOST}/comments?productId=${forProductId}`
    );



    //
    if (response.status === 200)
      res.status(200).json(JSON.stringify(await response.json()));
    //
    else res.status(400).json('{ "error": "connection with db failed"}');
    //
  } else if (req.method === "DELETE") {
    const response = await fetch(
      `${process.env.DB_HOST}/comments/${forProductId}`,
      {
        method: "DELETE",
      }
    );
    //
    if (response.status === 200) res.status(200).send(`${forProductId}`);
    else res.status(400).json('{ "error": "connection with db failed"}');
    //
  }
  //
  else if (req.method === "POST" && forProductId === "new-comment") {
    const response = await fetch(`${process.env.DB_HOST}/comments`, {
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
  } else {
    res.status(400).json('{ "error": "INVALID REQUEST"}');
  }
}
