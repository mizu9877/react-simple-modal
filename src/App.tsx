import React, { FC, ReactElement, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";

interface ModalProps {
  isVisible: Boolean;
  title: String;
  content: ReactElement;
  footer: ReactElement;
  onClose: Function;
}

const Modal: FC<ModalProps> = ({
  isVisible = false,
  title,
  content,
  footer,
  onClose,
}) => {
  const keydownHandler = ({ key }: { key: String }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal" onClick={() => onClose()}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

const App = () => {
  const [isModal, setModal] = React.useState(false);
  return (
    <>
      <button onClick={() => setModal(true)}>Click Here</button>
      <Modal
        isVisible={isModal}
        title="Modal Title"
        content={<p>Add your content here</p>}
        footer={<button onClick={() => setModal(false)}>Cancel</button>}
        onClose={() => setModal(false)}
      />
    </>
  );
};

export default App;
