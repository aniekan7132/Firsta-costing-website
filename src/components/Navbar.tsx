import React from 'react';
import './Nav.css';

type NavProps = {
  totalPrice: number;
  onCheckout: () => void;
};

const Nav: React.FC<NavProps> = ({ totalPrice, onCheckout }) => {
  return (
    <nav>
      <div className="logo">Firsta<span className='gold'>Tech</span></div>
      <div className="checkout">
        <button onClick={onCheckout}>Checkout</button>
        <span className="total-price">Total: ₦{totalPrice.toFixed(2)}</span>
      </div>
    </nav>
  );
};

export default Nav;
