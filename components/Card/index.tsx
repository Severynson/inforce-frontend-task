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
    const response = await fetch(`http://localhost:3000/api/product/${id}`, {
      method: "DELETE",
    });

    if (response.status !== 200) {
      alert(
        "Error happened while trying to delete this product: " + response.json()
      );
    } else {
      setIsDeleteModalOpen(false);
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

  const openProductPage: MouseEventHandler<HTMLLIElement> = (event) => {
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
        <Image layout="fill" objectFit="contain" alt="nut butter" src={image} />
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
