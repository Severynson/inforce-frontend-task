import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, CSSProperties, useEffect, useState } from "react";
import { SortingOptions, productsActions } from "../../store/products-slice";
import classes from "./index.module.css";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import AddOrEditProductForm from "../AddOrEditProductForm";
import { useRouter } from "next/router";

const {
  container,
  content,
  sitePageLinkClass,
  navigationPanel,
  mainIconContainerClass,
  addProductButtonClass,
  buttonsBox,
  typesOfSorting,
} = classes;

interface SitePageLink {
  pageName: string;
  link: string;
}

interface LinkButton {
  text: string;
  link: string;
}

export interface HeaderProps {
  mainIconImage: string; // has to be a web-link
  sitePagesLinks: SitePageLink[];
  addProductButton: LinkButton;

  background?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textMainColor?: string;
}

export default function Header({
  mainIconImage,
  sitePagesLinks,
  addProductButton,

  background = "https://previews.123rf.com/images/fernati2007/fernati20071706/fernati2007170600079/80754478-peeled-peanuts-background-food-photography-in-studio.jpg",
  primaryColor = "#fff",
  secondaryColor = "#f59f00",
  textMainColor = "#222",
}: HeaderProps): JSX.Element {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const [isAddProductModalOpen, setIsAddProductModalOpen] =
    useState<boolean>(false);

  const [cssVariables, setCssVariables] = useState({
    "--header-bg-image": `url(${background})`,
    "--primary-color": primaryColor,
    "--secondary-color": secondaryColor,
    "--text-main-color": textMainColor,
  } as CSSProperties);

  useEffect(() => {
    setCssVariables({
      "--header-bg-image": `url(${background})`,
      "--primary-color": primaryColor,
      "--secondary-color": secondaryColor,
      "--text-main-color": textMainColor,
    } as CSSProperties);
  }, [background, primaryColor, secondaryColor, textMainColor]);

  const addProductModalToggle = () =>
    void setIsAddProductModalOpen((prevState) => !prevState);

  const closeModalHandler = () => void setIsAddProductModalOpen(false);

  const onSelectSortingOptionsHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(productsActions.sortData(event.target.value));
  };

  return (
    <header className={container} style={cssVariables}>
      <div className={content}>
        <div className={mainIconContainerClass}>
          <Image
            src={mainIconImage}
            alt="site logo"
            width="36px"
            height="36px"
          />
        </div>
        <nav className={navigationPanel}>
          {sitePagesLinks?.map(({ pageName, link }) => (
            <Link href={link} key={link}>
              <a className={sitePageLinkClass}>{pageName}</a>
            </Link>
          ))}
        </nav>
        <div className={buttonsBox}>
          <button
            onClick={() => void setIsAddProductModalOpen(true)}
            className={addProductButtonClass}
          >
            {addProductButton.text}
          </button>
          {asPath === "/" && (
            <select
              className={typesOfSorting}
              onChange={onSelectSortingOptionsHandler}
            >
              <option selected disabled>
                {SortingOptions.TYPE_OF_SORTING}
              </option>
              <option>{SortingOptions.SORTED_BY_ALPHABET}</option>
              <option>{SortingOptions.SORTED_BY_DEFAULT_ORDER}</option>
            </select>
          )}
        </div>
      </div>
      <Modal toggleModal={addProductModalToggle} isOpen={isAddProductModalOpen}>
        <AddOrEditProductForm {...{ closeModalHandler }} />
      </Modal>
    </header>
  );
}
