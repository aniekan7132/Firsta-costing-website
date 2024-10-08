import React from "react";
import "./Modal.css";

type ModalProps = {
  show: boolean;
  handleClose: () => void;
  items: { productName: string; price: number }[];
  totalPrice: number;
};

const Modal: React.FC<ModalProps> = ({
  show,
  handleClose,
  items,
  totalPrice,
}) => {


  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Order Summary</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.productName}: ₦{item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <b >Total: ₦{totalPrice.toFixed(2)}</b>
        <div className="modalbtn">
          <button onClick={handleClose}>Close</button>
          <button onClick={handleClose}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;