import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useEffect, useState } from "react";
import classes from "./index.module.css";
const { footer, linksClass, socialLinkIconsClass, copyrightClass } = classes;

interface LinkInterface {
  text: string;
  link: string;
}

interface SocialMediaIconLink {
  socialMediaName: string;
  icon: string;
  link: string;
}

export interface FooterProps {
  links: LinkInterface[];
  socialLinkIconLinks: SocialMediaIconLink[];
  copyright: string;
  // Styles:
  background: string; // url;
  textColor: string;
}

export default function Footer({
  links,
  socialLinkIconLinks,
  copyright,

  background = "https://previews.123rf.com/images/fernati2007/fernati20071706/fernati2007170600079/80754478-peeled-peanuts-background-food-photography-in-studio.jpg",
  textColor = "#222",
}: FooterProps): JSX.Element {
  const [cssVariables, setSccVariables] = useState({
    "--footer-bg-image": `url(${background})`,
    "--text-color": textColor,
  } as CSSProperties);

  useEffect(() => {
    setSccVariables({
      "--footer-bg-image": `url(${background})`,
      "--text-color": textColor,
    } as CSSProperties);
  }, [background, textColor]);

  return (
    <footer className={footer} style={cssVariables}>
      <div className={linksClass}>
        {links?.map(({ text, link }) => (
          <Link key={link} href={link}>
            {text}
          </Link>
        ))}
      </div>
      <div className={socialLinkIconsClass}>
        {socialLinkIconLinks?.map(({ socialMediaName, link, icon }) => (
          <Link key={link} href={link}>
            <Image
              alt={socialMediaName}
              src={icon}
              height="24px"
              width="24px"
            />
          </Link>
        ))}
      </div>
      <div className={copyrightClass}>
        <p>&copy; {copyright}</p>
      </div>
    </footer>
  );
}
