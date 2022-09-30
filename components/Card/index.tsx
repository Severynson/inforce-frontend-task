import Image from "next/image";
import Modal from "../Modal";
import classes from "./index.module.css";
const { container, imageContainer, descriptionPart } = classes;

export interface CardProps {
  title: string;
  image: string; // url
}

export default function Card({ title, image }: CardProps): JSX.Element {
  return (
    <li className={container}>
      <Modal active={true} setActive={() => {}} />
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
        <button>Delete</button>
      </div>
    </li>
  );
}
