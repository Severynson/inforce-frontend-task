import Image from "next/image";
import classes from "./index.module.css";
const { container, imageContainer, descriptionPart } = classes;

export interface CardProps {
  title: string;
  image: string; // url
  description: string;
}

export default function Card({
  title,
  image,
  description,
}: CardProps): JSX.Element {
  return (
    <li className={container}>
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
      <div className={descriptionPart}></div>
    </li>
  );
}
