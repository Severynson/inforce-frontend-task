import Card from "../Card";
import classes from "./index.module.css";
import { useSelector } from "react-redux";
const { container } = classes;

export default function Home(): JSX.Element {
  const sortedProducts = useSelector<any, any[]>(
    (state) => state.productsSlice.products
  );

  return (
    <ul className={container}>
      {sortedProducts?.map(({ title, image, id }) => (
        <Card key={id} {...{ title, image }} />
      ))}
    </ul>
  );
}
