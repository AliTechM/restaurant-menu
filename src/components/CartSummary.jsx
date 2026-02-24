import {useState} from "react";
 
import { useSelector } from "react-redux";
import {
  selectTotalItems,
  selectTotalPrice,
} from "../store/reducers/cartSlice";
 import CartModal from "../components/CartModal";

const CartSummary = () => {
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
   const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
      <div className='bg-primary text-white p-4 flex justify-between items-center rounded-t-3xl'>
        <div className='flex items-center'>
          <p className='text-base bg-white text-primary w-6 h-6 rounded-sm flex items-center justify-center'>
            {totalItems}
          </p>
          <button
            onClick={() => setIsCartOpen(true)}
            className='text-white px-4 py-2 rounded font-medium hover:scale-105 '>
            View Cart
          </button>
        </div>
        <p className='font-semibold'>AED {totalPrice.toFixed(2)}</p>
      </div>
      <p className='text-primary w-full px-8 text-base font-semibold text-center'>
        Prices are in AED and are inclusive of 10% service charges, 5% VAT & 7%
        Municipality fee.
      </p>
      <CartModal open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default CartSummary;
