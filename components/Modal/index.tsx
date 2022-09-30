import { MouseEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./index.module.css";
const { modal, modalContent, modalActiveClass, modalContentActiveClass } =
  classes;

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  children?: JSX.Element | JSX.Element[];
}

const stopPropagation = (event: MouseEvent<HTMLElement>) => {
  event.stopPropagation();
};

export default function Modal({
  isOpen,
  toggleModal,
  children,
}: ModalProps): JSX.Element | null {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalJSX = (
    <div
      className={`${modal} ${isOpen ? modalActiveClass : null}`}
      onClick={() => void toggleModal()}
    >
      <div
        className={`${modalContent} ${isOpen ? modalContentActiveClass : ""}`}
        onClick={stopPropagation}
      >
        {children}
      </div>
    </div>
  );

  return isOpen && isBrowser
    ? ReactDOM.createPortal(
        modalJSX,
        document.getElementById("modal-root") as HTMLElement
      )
    : null;
}
