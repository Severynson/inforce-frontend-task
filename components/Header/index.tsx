import Image from "next/image";
import Link from "next/link";
import React, { CSSProperties, useEffect, useState } from "react";
import classes from "./index.module.css";
const {
  container,
  content,
  sitePageLinkClass,
  navigationPanel,
  mainIconContainerClass,
  linkButtonClass,
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
  linkButton: LinkButton;

  primaryColor?: string;
  secondaryColor?: string;
  textMainColor?: string;
}

export default function Header({
  mainIconImage,
  sitePagesLinks,
  linkButton,

  primaryColor = "#fff",
  secondaryColor = "#f59f00",
  textMainColor = "#222",
}: HeaderProps): JSX.Element {
  const [cssVariables, setCssVariables] = useState({
    "--primary-color": primaryColor,
    "--secondary-color": secondaryColor,
    "--text-main-color": textMainColor,
  } as CSSProperties);

  useEffect(() => {
    setCssVariables({
      "--primary-color": primaryColor,
      "--secondary-color": secondaryColor,
      "--text-main-color": textMainColor,
    } as CSSProperties);
  }, [primaryColor, secondaryColor, textMainColor]);

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
        <Link href={linkButton.link}>
          <a className={linkButtonClass}>{linkButton.text}</a>
        </Link>
      </div>
    </header>
  );
}
