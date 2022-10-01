import classes from "./index.module.css";
const { container, inputGroup, buttonsGroup, acceptButton, declineButton } =
  classes;
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { productsActions } from "../../store/products-slice";

interface Inputs {
  image: string;
  title: string;
  description: string;
  id: string;
}

interface AddProductFormProps {
  closeModalHandler: () => void;
}

export default function AddProductForm({
  closeModalHandler,
}: AddProductFormProps): JSX.Element {
  const dispatch = useDispatch();
  const currentSortingOption = useSelector<RootState>(
    (state) => state.productsSlice.sortingOption
  );

  const { register, handleSubmit } = useForm({
    defaultValues: {
      image: "",
      title: "",
      description: "",
      id: "",
    } as Inputs,
  });

  const onSubmit = async (formData: Inputs) => {
    formData.id = `e${Math.random().toString().split("").slice(2).join("")}`;

    const response = await fetch(
      "http://localhost:3000/api/product/new-product",
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
      closeModalHandler();
      const productsList = JSON.parse(
        await (await fetch("http://localhost:3000/api/products-data")).json()
      );

      dispatch(
        productsActions.setData({
          products: productsList,
          sortingOption: currentSortingOption,
        })
      );
    }
  };

  return (
    <form className={container} onSubmit={handleSubmit(onSubmit)}>
      <div className={inputGroup}>
        <label htmlFor="image">Image URL:</label>
        <input
          {...register("image", {
            required: true,
            pattern:
              /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          })}
          id="image"
          name="image"
          type="text"
        />
      </div>

      <div className={inputGroup}>
        <label htmlFor="title">Title:</label>
        <input
          {...register("title", { required: true, minLength: 2 })}
          id="title"
          name="title"
          type="text"
        />
      </div>

      <div className={inputGroup}>
        <label htmlFor="description">Description:</label>
        <textarea
          {...register("description")}
          id="description"
          name="description"
          rows={8}
        />
      </div>
      <div className={buttonsGroup}>
        <button type="submit" className={acceptButton}>
          Accept
        </button>
        <button
          onClick={closeModalHandler}
          type="button"
          className={declineButton}
        >
          Decline
        </button>
      </div>
    </form>
  );
}
