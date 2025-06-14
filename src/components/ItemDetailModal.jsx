import React, { useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { FaPlusSquare, FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

const ItemDetailModal = ({ open, onClose, item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [closing, setClosing] = useState(false);

  const optionPrices = {
    option1: 2,
    option2: 3,
    option3: 1,
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = item.price * quantity;
    const optionsPrice =
      selectedOptions.reduce(
        (total, option) => total + (optionPrices[option] || 0),
        0
      ) * quantity;
    return (basePrice + optionsPrice).toFixed(2);
  };

  const handleAddToCart = () => {
    const customizations =
      selectedOptions.length > 0 ? { options: selectedOptions } : {};

    const totalPrice = parseFloat(calculateTotalPrice());

    const itemToCart = {
      ...item,
      quantity,
      customizations,
      totalPrice,
    };

    onAddToCart(itemToCart);

    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
      setQuantity(1);
      setSelectedOptions([]);
    }, 300);
  };

  const handleManualClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
      setQuantity(1);
      setSelectedOptions([]);
    }, 300);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleManualClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white transition-all duration-300 transform ${
          closing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        } w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg p-6 relative mx-4`}>
        {/* Close Button */}
        <button
          onClick={handleManualClose}
          className='absolute top-4 right-4 hover:text-gray-700'>
          <FiXCircle className='text-primary' size={24} />
        </button>

        <img
          src={item.image}
          alt={item.name}
          className='w-11/12 h-48 object-cover rounded-lg mb-4'
        />

        <h2 className='text-2xl font-bold mb-4 pr-8'>{item.name}</h2>

        <p className='text-gray-700 mb-4'>{item.description}</p>

        <div className='flex-b'>
          <h3 className='text-xl font-semibold mb-4 text-primary'>
            AED {item.price}
          </h3>

          {/* Quantity */}
          <div className='flex-b mb-6 p-2 border-2 border-primary rounded-xl'>
            <div className='flex items-center space-x-4 text-primary font-bold'>
              <button onClick={() => handleQuantityChange(quantity - 1)}>
                <FaMinus />
              </button>
              <span className='w-8 text-center'>{quantity}</span>
              <button onClick={() => handleQuantityChange(quantity + 1)}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className='mb-4'>
          <h4 className='font-medium mb-2'>Customization Options</h4>
          <div className='space-y-2'>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={selectedOptions.includes("option1")}
                onChange={() => handleOptionChange("option1")}
              />
              <span>Option 1 (+AED 2)</span>
            </label>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={selectedOptions.includes("option2")}
                onChange={() => handleOptionChange("option2")}
              />
              <span>Option 2 (+AED 3)</span>
            </label>
            <label className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={selectedOptions.includes("option3")}
                onChange={() => handleOptionChange("option3")}
              />
              <span>Option 3 (+AED 1)</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className='sticky bottom-0 py-2 px-6 bg-primary rounded-2xl flex justify-between items-center'>
          <button
            onClick={handleAddToCart}
            className='text-white py-3 rounded-lg font-medium flex items-center gap-2'>
            <FaPlusSquare className='text-white text-lg' />
            Add to Cart
          </button>
          <h3 className='text-lg font-semibold mb-4 text-white'>
            AED {calculateTotalPrice()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;
