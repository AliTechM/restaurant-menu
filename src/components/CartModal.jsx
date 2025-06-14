import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
  clearCart,
  removeFromCart,
} from "../store/reducers/cartSlice";
import { FiXCircle } from "react-icons/fi";

const CartModal = ({ open, onClose }) => {
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-xl relative mx-4'>
        {/* Close */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'>
          <FiXCircle className='text-primary' size={24} />
        </button>

        <h2 className='text-2xl font-bold mb-4'>Your Cart</h2>

        {items.length === 0 ? (
          <p className='text-center py-8'>Your cart is empty.</p>
        ) : (
          <div className='space-y-4'>
            {items.map((item, index) => (
              <div
                key={index}
                className='border border-gray-200 rounded-lg p-4 flex flex-col gap-1'>
                <div className='flex justify-between'>
                  <h3 className='font-semibold'>{item.name}</h3>
                  <span className='font-medium'>x{item.quantity}</span>
                </div>

                <p className='text-sm text-gray-600'>
                  AED {item.price.toFixed(2)}
                </p>

                {item.customizations?.options?.length > 0 && (
                  <div className='text-sm text-gray-500'>
                    Options:
                    <ul className='list-disc list-inside'>
                      {item.customizations.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className='text-red-500 text-sm mt-2 underline'>
                  Remove
                </button>
              </div>
            ))}

            <div className='border-t pt-4 mt-4 flex justify-between font-semibold text-lg'>
              <span>Total:</span>
              <span>AED {totalPrice.toFixed(2)}</span>
            </div>

            <div className='flex justify-between mt-4'>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded-lg'
                onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>
              <button
                className='bg-primary text-white px-4 py-2 rounded-lg'
                onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
