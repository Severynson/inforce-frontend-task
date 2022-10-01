import classes from "./index.module.css";
const { container, inputGroup, buttonsGroup, acceptButton, declineButton } =
  classes;
import { useForm } from "react-hook-form";

export interface Comment {
  authorName: string;
  id: string;
  productId: string;
  text: string;
}

interface AddCommentFormProps {
  commentToEdit?: Comment | null;
  clearCommentToEditStateHandler: () => void;
  productId: string;
  setRefetchedCommentsHandler: (refetchedComments: Comment[]) => void;
}

export default function AddCommentForm({
  commentToEdit,
  clearCommentToEditStateHandler,
  productId,
  setRefetchedCommentsHandler,
}: AddCommentFormProps): JSX.Element {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      authorName: "",
      id: "",
      productId,
      text: "",
    } as Comment,
  });

  setValue("authorName", commentToEdit ? commentToEdit.authorName : "");
  setValue("text", commentToEdit ? commentToEdit.text : "");

  const onSubmit = async (formData: Comment) => {
    formData.id = commentToEdit
      ? commentToEdit.id
      : `comment-${Math.random().toString().split("").slice(2).join("")}`;

    let response;

    if (!commentToEdit)
      response = await fetch("http://localhost:3000/api/comments/new-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    else
      response = await fetch(
        `http://localhost:3000/api/comments/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

    if (response.status !== 200 && response.status !== 201) {
      alert("Error heppened while posting new product!");
    } else {
      const commentsList = JSON.parse(
        await (
          await fetch(`http://localhost:3000/api/comments/${productId}`)
        ).json()
      );

      setRefetchedCommentsHandler(commentsList);
    }
    reset();
    clearCommentToEditStateHandler();
  };

  const editDeclineHandler = () => {
    clearCommentToEditStateHandler();
    reset();
  };

  return (
    <form className={container} onSubmit={handleSubmit(onSubmit)}>
      <div className={inputGroup}>
        <label htmlFor="authorName">Author name:</label>
        <input
          {...register("authorName")}
          id="authorName"
          name="authorName"
          type="text"
        />
      </div>

      <div className={inputGroup}>
        <label htmlFor="text">Comment:</label>
        <textarea {...register("text")} id="text" name="text" rows={8} />
      </div>

      <div className={buttonsGroup}>
        {!commentToEdit && (
          <button type="submit" className={acceptButton}>
            Write a comment
          </button>
        )}
        {commentToEdit && (
          <button type="submit" className={acceptButton}>
            Edit
          </button>
        )}
        {commentToEdit && (
          <button
            type="button"
            onClick={editDeclineHandler}
            className={declineButton}
          >
            Decline
          </button>
        )}
      </div>
    </form>
  );
}