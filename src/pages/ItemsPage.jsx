import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/reducers/cartSlice";
import ItemCard from "../components/ItemCard";
import CartSummary from "../components/CartSummary";
import ItemDetailModal from "../components/ItemDetailModal";
import { useCategoryItems } from "../queries/menuQueries";
import { IoSearch } from "react-icons/io5";
 
const ItemsPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: items = [], isLoading } = useCategoryItems(categoryId);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

const handleAddToCart = (itemWithDetails) => {
  dispatch(addToCart(itemWithDetails));
};

  const filteredItems = items.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className='text-center py-8'>Loading...</div>;

  return (
    <div className='pb-20'>
      <div className='space-y-4 p-4 bg-[#F0F0F0]'>
        {/* Search */}
        <div className='bg-[#E9ECEF] border-2 border-primary w-10/12 h-16 mx-auto mb-8 mt-10 rounded-md flex-center gap-5 px-7'>
          <IoSearch className='text-primary text-3xl' />
          <input
            className='w-full bg-transparent outline-0 border-none text-center text-xl font-semibold'
            placeholder='Search for Dishes, Drinks ...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        
        <div className='flex-center gap-5 uppercase'>
          <button className='text-white bg-primary basis-1/2 text-2xl font-bold h-12 rounded-xl'>
            MAIN COURSES
          </button>
          <button className='border-2 border-primary text-primary basis-1/2 text-2xl font-bold h-12 rounded-xl'>
            SIDE ORDERS
          </button>
        </div>

        {/*  list */}
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => handleItemClick(item)}
            />
          ))
        ) : (
          <div className='text-center py-4'>No items found</div>
        )}
      </div>

      {selectedItem && (
        <ItemDetailModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={selectedItem}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartSummary />
    </div>
  );
};

export default ItemsPage;
