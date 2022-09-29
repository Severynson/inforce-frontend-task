import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties, useEffect, useState } from "react";
import { SortingOptions } from "../../store/products-slice";
import classes from "./index.module.css";
const {
  container,
  content,
  sitePageLinkClass,
  navigationPanel,
  mainIconContainerClass,
  linkButtonClass,
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
  const [typeOfSorting, setTypeOfSorting] = useState<SortingOptions>(
    SortingOptions.SORTED_BY_ALPHABET
  );

  useEffect(() => {
    // dispatch;
  }, [typeOfSorting]);

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
          <Link href={addProductButton.link}>
            <a className={linkButtonClass}>{addProductButton.text}</a>
          </Link>
          {
            <select
              className={typesOfSorting}
              onChange={(e) => console.log(e.target.value)}
            >
              <option selected disabled>
                type of sorting:
              </option>
              <option>Sorted by alphabet</option>
              <option>Sorted by default order</option>
            </select>
          }
        </div>
      </div>
    </header>
  );
}
