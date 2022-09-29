import Card from "../Card";
import classes from "./index.module.css";
import { useSelector } from "react-redux";
const { container } = classes;

interface HomeProps {
  productsList: any[];
}

export default function Home({ productsList }: HomeProps): JSX.Element {
  const sortedProducts = useSelector<any, any[]>(
    (state) => state.productsSlice.sortedProducts
  );

  return (
    <ul className={container}>
      {(!sortedProducts.length ? productsList : sortedProducts)?.map(
        ({ title, image, id }) => (
          <Card key={id} {...{ title, image }} />
        )
      )}
    </ul>
  );
}
