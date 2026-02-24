import { useState } from "react";
import { IoMdCart } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectTotalItems } from "../store/reducers/cartSlice";
import CartModal from "../components/CartModal";

export default function NavBar() {
  const totalItems = useSelector(selectTotalItems);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <nav className='bg-[#DEDEDE] py-8 px-6 flex justify-between items-center capitalize'>
      <button
        className='text-primary border border-primary flex items-center gap-2 capitalize text-xl rounded-md px-4 py-1'
        onClick={handleGoBack}>
        <FaChevronLeft />
        back
      </button>
      <p className='text-primary text-3xl font-bold'>in room dining</p>
      <div className='relative cursor-pointer' onClick={() => setIsCartOpen(true)}>
        <IoMdCart className='text-primary text-6xl' />
        <p className='absolute -right-3 -top-1 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center'>
          {totalItems}
        </p>
      </div>
      <CartModal open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}
