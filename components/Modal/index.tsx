import { MouseEvent, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./index.module.css";
const { modal, modalContent, modalActiveClass, modalContentActiveClass } =
  classes;

interface ModalProps {
  isOpen: boolean;
  setActive: (status: boolean) => void;
  children?: JSX.Element | JSX.Element[];
}

const stopPropagation = (event: MouseEvent<HTMLElement>) => {
  event.stopPropagation();
};

let nearRootElement: HTMLElement;

export default function Modal({
  isOpen,
  setActive,
  children,
}: ModalProps): JSX.Element | null {
  useEffect(() => {
    nearRootElement = document.createElement("div");
    document.body.appendChild(nearRootElement);

    // on document unmount:
    return () => {
      if (document.body.contains(nearRootElement))
        document.body.removeChild(nearRootElement);
    };
  }, [isOpen]);

  return nearRootElement
    ? ReactDOM.createPortal(
        <div
          className={`${modal} ${isOpen ? modalActiveClass : ""}`}
          onClick={() => void setActive(false)}
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
