import Image from "next/image";
import { useEffect, useState } from "react";
import AddCommentForm, { Comment } from "../AddOrEditCommentForm";
import classes from "./index.module.css";
const {
  root,
  container,
  imageContainer,
  productClass,
  commentsSection,
  commentsListClass,
  commentClass,
  commentButtons,
  deleteButton,
  editButton,
} = classes;

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
  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);

  useEffect(() => {
    getComments(id).then((commentsList) => {
      setComments(commentsList);
    });
    // eslint-disable-next-line
  }, []);

  const deleteCommentHandler = async (commentId: string) => {
    const response = await fetch(
      `http://localhost:3000/api/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (response.status !== 200) {
      alert(
        "Error happened while trying to delete this comment: " + response.json()
      );
    } else {
      getComments(id).then((commentsList) => {
        setComments(commentsList);
      });
    }
  };

  const editCommentHandler = (comment: Comment) => {
    setCommentToEdit(comment);
  };

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

          {description && <p>{description}</p>}
        </div>

        <section className={commentsSection}>
          {!commentToEdit && <h2>Add comment:</h2>}
          {commentToEdit && <h2>Edit comment:</h2>}
          <AddCommentForm
            commentToEdit={commentToEdit}
            clearCommentToEditStateHandler={() => void setCommentToEdit(null)}
            productId={id}
            setRefetchedCommentsHandler={(refetchedCommentsList) =>
              void setComments(refetchedCommentsList)
            }
          />
          <h2>Comments:</h2>
          <div className={commentsListClass}>
            {comments?.map((comment) => {
              const { authorName, text, id: currentCommentId } = comment;
              return (
                <div className={commentClass} key={text}>
                  <p>
                    <strong>{authorName}</strong>: {text}
                  </p>
                  <div className={commentButtons}>
                    <svg
                      onClick={() =>
                        void deleteCommentHandler(currentCommentId)
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={deleteButton}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>

                    <svg
                      onClick={() => void editCommentHandler(comment)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={editButton}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
            {!comments.length && <h4>No comments yet</h4>}
          </div>
        </section>
      </div>
    </div>
  );
}
