import cn from "classnames";
import "./index.css";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Modal = ({ activeModal, children, setShowModal }) => {
  const location = useLocation();
  const onModalKeyDown = useCallback(
    (e) => {
      console.log({ e });
      console.log({ location });
      if (e.key === "Escape") {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", onModalKeyDown);
    return () => {
      document.removeEventListener("keydown", onModalKeyDown);
    };
  }, [onModalKeyDown]);

  return (
    <>
      <div
        className={cn("modal", { ["active"]: activeModal })}
        // onClick={() => setShowModal(false)}
        // onKeyDown={(e) => onModalKeyDown(e)}
        // tabIndex={1}
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
