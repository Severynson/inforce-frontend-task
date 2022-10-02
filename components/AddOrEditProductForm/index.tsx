import classes from "./index.module.css";
const { container, inputGroup, buttonsGroup, acceptButton, declineButton } =
  classes;
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { productsActions } from "../../store/products-slice";
import { Product } from "../Product";
import { ApiBasicRoutes } from "../../routes/api-routes";

interface AddOrEditProductFormProps {
  productToEdit?: Product;
  closeModalHandler: () => void;
  refetchProductHandler?: () => void;
}

export default function AddOrEditProductForm({
  productToEdit,
  closeModalHandler,
  refetchProductHandler,
}: AddOrEditProductFormProps): JSX.Element {
  const dispatch = useDispatch();
  const currentSortingOption = useSelector<RootState>(
    (state) => state.productsSlice.sortingOption
  );

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: "",
      title: "",
      description: "",
      image: "",
    } as Product,
  });

  productToEdit && setValue("image", productToEdit.image);
  productToEdit && setValue("title", productToEdit.title);
  productToEdit && setValue("description", productToEdit.description);

  const onSubmit = async (formData: Product) => {
    formData.id = productToEdit
      ? productToEdit.id
      : `e${Math.random().toString().split("").slice(2).join("")}`;

    let response;

    if (!productToEdit)
      response = await fetch(
        `${process.env.API_HOST}/${ApiBasicRoutes.PRODUCT}/${formData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    else
      response = await fetch(
        `${process.env.API_HOST}/${ApiBasicRoutes.PRODUCT}/${productToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

    if ([200, 201].includes(response.status)) {
      const productsListResponse = await fetch(
        `${process.env.API_HOST}/${ApiBasicRoutes.PRODUCTS_DATA}`
      );
      const productsListJSON = await productsListResponse.json();

      const productsList = JSON.parse(productsListJSON);

      dispatch(
        productsActions.setData({
          products: productsList,
          sortingOption: currentSortingOption,
        })
      );

      closeModalHandler();
      refetchProductHandler && refetchProductHandler();
    } else {
      alert("Error heppened while posting new product!");
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
          {productToEdit ? "Edit" : "Accept"}
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
