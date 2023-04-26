import cn from "classnames";
import "./index.css";
import { useEffect } from "react";

export const Modal = ({ activeModal, children, setShowModal }) => {
  const onModalKeyDown = (e) => {
    console.log({ e });
  };

  useEffect(() => {
    document.addEventListener("keydown", onModalKeyDown);
  }, []);

  return (
    <>
      <div
        className={cn("modal", { ["active"]: activeModal })}
        // onClick={() => setShowModal(false)}
        onKeyDown={(e) => onModalKeyDown(e)}
        tabIndex={1}
      >
        <div
          className={cn("modal_content", { ["active"]: activeModal })}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};
