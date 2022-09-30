import Image from "next/image";
import { useEffect, useState } from "react";
import classes from "./index.module.css";
const { root, container, imageContainer, productClass, commentsSection } =
  classes;

export interface ProductProps {
  id: string;
  image: string; // url
  title: string;
  description: string;
}

const getComments = async (id: string) => {
  return JSON.parse(
    await (await fetch(`http://localhost:3000/api/comments/${id}`)).json()
  );
};

export default function Product({
  id,
  image,
  title,
  description,
}: ProductProps) {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    getComments(id).then((commentsList) => {
      setComments(commentsList);
      console.log(comments);
    });
  }, []);

  return (
    <div className={root}>
      <div className={container}>
        <div className={productClass}>
          <div className={imageContainer}>
            <Image
              src={image}
              alt={`Image of ${title}`}
              layout="fill"
              objectFit="contain"
            />
          </div>

          <h1>{title}</h1>

          <p>{description}</p>
        </div>

        <section className={commentsSection}>
          <h2>Comments:</h2>
          {comments?.map(({ authorName, text }) => {
            return (
              <p key={text}>
                <strong>{authorName}</strong>: {text}
              </p>
            );
          })}
        </section>
      </div>
    </div>
  );
}
