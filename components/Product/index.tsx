import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiBasicRoutes } from "../../routes/api-routes";
import AddOrEditCommentForm, { Comment } from "../AddOrEditCommentForm";
import AddOrEditProductForm from "../AddOrEditProductForm";
import Modal from "../Modal";
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
  editProductButtonClass,
} = classes;

export interface Product {
  id: string;
  image: string; // url
  title: string;
  description: string;
}

const getComments = async (id: string) => {
  const response = await fetch(`${process.env.API_HOST}/comments/${id}`);
  const commentsJSON = await response.json();

  return JSON.parse(commentsJSON);
};

export default function ProductComponent(props: Product) {
  const { id, image, title, description } = props;

  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [editProductModalOpen, setEditProductModalOpen] =
    useState<boolean>(false);
  const [commentToEdit, setCommentToEdit] = useState<Comment | null>(null);

  useEffect(() => {
    getComments(id).then((commentsList) => {
      setComments(commentsList);
    });
    // fetch on the first render
    // eslint-disable-next-line
  }, []);

  const deleteCommentHandler = async (commentId: string) => {
    const response = await fetch(
      `${process.env.API_HOST}/${ApiBasicRoutes.COMMENTS}/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      getComments(id).then((commentsList) => {
        setComments(commentsList);
      });
    } else {
      alert(
        "Error happened while trying to delete this comment: " + response.json()
      );
    }
  };

  const editCommentHandler = (comment: Comment) => {
    setCommentToEdit(comment);
  };

  const refetchProductHandler = () => {
    router.replace(router.asPath);
  };

  const setRefetchedCommentsHandler = (refetchedCommentsList: Comment[]) => {
    setComments(refetchedCommentsList);
  };

  return (
    <div className={root}>
      <div className={container}>
        <div className={productClass}>
          <div className={imageContainer}>
            {/* dont using NextJS Image tag
                because url can be unpredictable
                (can't preset domains passed by
                forms) */}
            {/* eslint-disable-next-line */}
            <img src={image} alt={`Image of ${title}`} />
          </div>

          <h1>{title}</h1>

          {description && <p>{description}</p>}
        </div>

        <div
          className={editProductButtonClass}
          onClick={() => {
            setEditProductModalOpen(true);
          }}
        >
          <p>Want to edit product ?</p>
          <svg
            onClick={() => {}}
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
          <Modal
            isOpen={editProductModalOpen}
            toggleModal={() =>
              void setEditProductModalOpen((prevState) => !prevState)
            }
          >
            <AddOrEditProductForm
              closeModalHandler={() => void setEditProductModalOpen(false)}
              productToEdit={props}
              refetchProductHandler={refetchProductHandler}
            />
          </Modal>
        </div>

        <section className={commentsSection}>
          {!commentToEdit && <h2>Add comment:</h2>}
          {commentToEdit && <h2>Edit comment:</h2>}
          <AddOrEditCommentForm
            commentToEdit={commentToEdit}
            clearCommentToEditStateHandler={() => void setCommentToEdit(null)}
            productId={id}
            {...{ setRefetchedCommentsHandler }}
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
