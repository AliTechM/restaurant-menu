import React from "react";

const ItemCard = ({ item, onClick }) => {
  return (
    <div
      className='bg-white rounded-lg shadow-md grid grid-cols-3 min-h-52 common-glow relative'
      onClick={onClick}>
      <div className='col-span-1'>
        <img
          src={item.image}
          alt={item.name}
          className='w-full h-full object-cover rounded-lg'
        />
      </div>
      <div className='px-10 py-6 col-span-2'>
        <h3 className='font-semibold text-lg uppercase mb-5'>{item.name}</h3>
        <p className='text-gray-600 text-sm font-semibold mb-5'>
          {item.description}
        </p>
        <div className='flex justify-between items-center'>
          <span className='font-medium text-primary'>AED {item.price}</span>
          <button
            className='bg-primary text-white px-4 py-1 hover:bg-blue-600 transition-colors rounded-md'
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
