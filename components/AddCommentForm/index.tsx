import classes from "./index.module.css";
const { container, inputGroup, buttonsGroup, acceptButton, declineButton } =
  classes;
import { useForm } from "react-hook-form";

interface Comment {
  authorName: string;
  id: string;
  productId: string;
  text: string;
}

interface AddCommentFormProps {
  productId: string;
  setRefetchedCommentsHandler: (refetchedComments: Comment[]) => void;
}

export default function AddCommentForm({
  productId,
  setRefetchedCommentsHandler,
}: AddCommentFormProps): JSX.Element {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      authorName: "",
      id: "",
      productId,
      text: "",
    } as Comment,
  });

  const onSubmit = async (formData: Comment) => {
    formData.id = `comment-${Math.random().toString().split("").slice(2).join("")}`;

    const response = await fetch(
      "http://localhost:3000/api/comments/new-comment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.status !== 201) {
      alert("Error heppened while posting new product!");
    } else {
      const commentsList = JSON.parse(
        await (
          await fetch(`http://localhost:3000/api/comments/${productId}`)
        ).json()
      );

      setRefetchedCommentsHandler(commentsList);
      reset();
    }
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
        <button type="submit" className={acceptButton}>
          Write a comment
        </button>
      </div>
    </form>
  );
}
