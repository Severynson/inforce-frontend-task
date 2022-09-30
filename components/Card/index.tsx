import Image from "next/image";
import { useState } from "react";
import ConfirmAction from "../ConfirmAction";
import Modal from "../Modal";
import classes from "./index.module.css";
const { container, imageContainer, descriptionPart, deleteButton } = classes;

export interface CardProps {
  title: string;
  image: string; // url
}

export default function Card({ title, image }: CardProps): JSX.Element {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  return (
    <li className={container}>
      <Modal
        isOpen={isDeleteModalOpen}
        toggleModal={() => void setIsDeleteModalOpen((prevState) => !prevState)}
      >
        <ConfirmAction
          text="Decline product deleting"
          confirmButtonCallback={() => {}}
          declineButtonCallback={() => void setIsDeleteModalOpen(false)}
        />
      </Modal>
      <div className={imageContainer}>
        <Image
          layout="fill"
          objectFit="contain"
          alt="nut butter"
          src={image}
          height="100%"
          width="100%"
        />
      </div>
      <div className={descriptionPart}>
        <h3>{title}</h3>
        <button
          className={deleteButton}
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
