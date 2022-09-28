import Link from "next/link";
import classes from "./index.module.css";
const { footer, linksClass, socialLinkIconsClass, copyrightClass } = classes;
// import { IonIcon } from "@ionic/react";

interface LinkInterface {
  text: string;
  link: string;
}

interface SocialMediaIconLink {
  iconName: string;
  iconLink: string;
  copyright: string;
}

export interface FooterProps {
  links: LinkInterface[];
  socialLinkIconLinks: SocialMediaIconLink[];
  copyright: string;
  // Styles:
  PrimaryBgColor: string;
  SecondaryBgColor: string;
  textColor: string;
}

export default function Footer({
  links = [
    {
      text: "write us on email",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=peanut.paradise@gmail.com&su=Lets-work-together",
    },
  ],
  socialLinkIconLinks = [],
  copyright = "NuttyParadise",
}: FooterProps): JSX.Element {
  return (
    <footer className={footer}>
      <div className={linksClass}>
        {links?.map(({ text, link }) => (
          <Link key={link} href={link}>
            {text}
          </Link>
        ))}
      </div>
      <div className={socialLinkIconsClass}>
        {socialLinkIconLinks?.map(({ iconName, iconLink }) => (
          <Link key={iconLink} href={iconLink}>
            {/* <IonIcon name={iconName} /> */}
          </Link>
        ))}
      </div>
      <div className={copyrightClass}>
        <p>&copy; {copyright}</p>
      </div>
    </footer>
  );
}
