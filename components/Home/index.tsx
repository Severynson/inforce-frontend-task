import Card from "../Card";
import classes from "./index.module.css";
import { useSelector } from "react-redux";
const { container } = classes;

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string; // url
}

interface HomeProps {
  productsList: Product[];
}

export default function Home({ productsList }: HomeProps): JSX.Element {
  const sortedProducts = useSelector<string, Product[]>(
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
