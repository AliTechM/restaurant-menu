import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../queries/menuQueries";
import CategoryCard from "../components/CategoryCard";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoMenu, IoSearch } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: categories = [], isLoading } = useCategories();

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredCategories = categories.filter((category) =>
    category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className='text-center py-8'>Loading...</div>;

  return (
    <div className='p-2 border bg-[#F0F0F0]'>
      {/* Search */}
      <div className='bg-[#E9ECEF] border-2 border-primary w-10/12 h-16 mx-auto mb-8 mt-10 rounded-md flex-center gap-5 px-7'>
        <IoSearch className='text-primary text-3xl' />
        <input
          className='w-full bg-transparent outline-0 border-none text-center text-xl font-semibold'
          placeholder='Search for Categories...'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* List */}
      <div className='grid grid-cols-2 gap-4 justify-items-center'>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => navigate(`/category/${category.id}`)}
            />
          ))
        ) : (
          <div className='col-span-2 text-center py-4'>No categories found</div>
        )}
      </div>

      {/* Bottom nav */}
      <div className='flex justify-around items-center bg-primary py-4 mx-2 my-1 rounded-xl'>
        <IoMenu className='text-white text-3xl' />
        <BiHomeAlt2 className='text-white text-3xl' />
        <IoSearch className='text-white text-3xl' />
        <FaWhatsapp className='text-white text-3xl' />
      </div>
    </div>
  );
};

export default CategoriesPage;
