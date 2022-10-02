import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { productsActions } from "../../store/products-slice";
import ConfirmAction from "../ConfirmAction";
import Modal from "../Modal";
import classes from "./index.module.css";
const { container, imageContainer, descriptionPart, deleteButton } = classes;

export interface CardProps {
  title: string;
  image: string; // url
  id: string;
}

export default function Card({ title, image, id }: CardProps): JSX.Element {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const currentSortingOption = useSelector<RootState>(
    (state) => state.productsSlice.sortingOption
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const deleteItem = async () => {
    const response = await fetch(`${process.env.API_HOST}/product/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      setIsDeleteModalOpen(false);
      const productsList = JSON.parse(
        await (await fetch(`${process.env.API_HOST}/products-data`)).json()
      );

      dispatch(
        productsActions.setData({
          products: productsList,
          sortingOption: currentSortingOption,
        })
      );
    } else {
      alert(
        "Error happened while trying to delete this product: " + response.json()
      );
    }
  };

  const openProductPage: MouseEventHandler<HTMLLIElement> = () => {
    push("/product/" + id);
  };

  const deleteHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  return (
    <li className={container} onClick={openProductPage}>
      <Modal
        isOpen={isDeleteModalOpen}
        toggleModal={() => void setIsDeleteModalOpen((prevState) => !prevState)}
      >
        <ConfirmAction
          text="Continue product deleting"
          confirmButtonCallback={deleteItem}
          declineButtonCallback={() => void setIsDeleteModalOpen(false)}
        />
      </Modal>
      <div className={imageContainer}>
        {/* dont using NextJS Image tag
            because url can be unpredictable
            (can't preset domains passed by
            forms) */}
        {/* eslint-disable-next-line */}
        <img alt="nut butter" src={image} />
      </div>
      <div className={descriptionPart}>
        <h3>{title}</h3>
        <button className={deleteButton} onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </li>
  );
}
