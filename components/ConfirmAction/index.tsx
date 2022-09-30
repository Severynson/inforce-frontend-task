import classes from "./index.module.css";
const { container, buttonsContainer, confirmButton, declineButton } = classes;

interface ConfirmActionProps {
  text?: string;
  confirmButtonCallback: () => void;
  declineButtonCallback: () => void;
}

export default function ConfirmAction({
  text,
  confirmButtonCallback,
  declineButtonCallback,
}: ConfirmActionProps): JSX.Element {
  return (
    <div className={container}>
      <h2>{text}</h2>
      <h3>Confirm actions ?</h3>
      <div className={buttonsContainer}>
        <button onClick={confirmButtonCallback} className={confirmButton}>
          Confirm
        </button>
        <button onClick={declineButtonCallback} className={declineButton}>
          Decline
        </button>
      </div>
    </div>
  );
}
