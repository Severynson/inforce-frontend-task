import Footer, { FooterProps } from "../Footer";
import Header, { HeaderProps } from "../Header";

export interface LayoutProps {
  headerProps: HeaderProps;
  footerProps: FooterProps;
  children: JSX.Element | JSX.Element[];
}

export default function Layout({
  headerProps,
  footerProps,
  children,
}: LayoutProps) {
  return (
    <>
      <Header {...headerProps} />
      <main>{children}</main>
      <Footer {...footerProps} />
    </>
  );
}
