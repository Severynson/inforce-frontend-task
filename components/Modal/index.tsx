import { MouseEvent, useEffect } from "react";
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

let nearRootElement: HTMLElement;

export default function Modal({
  isOpen,
  toggleModal,
  children,
}: ModalProps): JSX.Element | null {
  useEffect(() => {
    nearRootElement = document.createElement("div");
    document.body.appendChild(nearRootElement);

    // on component unmount:
    return () => {
      if (document.body.contains(nearRootElement))
        document.body.removeChild(nearRootElement);
    };
  }, []);

  return isOpen && !!nearRootElement
    ? ReactDOM.createPortal(
        <div
          className={`${modal} ${isOpen ? modalActiveClass : ""}`}
          onClick={() => void toggleModal()}
        >
          <div
            className={`${modalContent} ${
              isOpen ? modalContentActiveClass : ""
            }`}
            onClick={stopPropagation}
          >
            {children}
          </div>
        </div>,
        nearRootElement
      )
    : null;
}
