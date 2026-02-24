const CategoryCard = ({ category, onClick }) => {
  return (
    <div
      className='relative w-11/12 bg-transparent rounded-lg common-glow shadow-md'>
      <div
        onClick={onClick}
        className='relative w-full rounded-lg overflow-hidden cursor-pointer group 
                
                
                 group-hover:before:h-2 group-hover:after:h-2'>
        <img
          src={category.image}
          alt={category.name}
          className='w-full h-52 object-cover transition-transform group-hover:scale-105'
        />

       
        {category.is_closed && (
          <div
            className='absolute top-2 left-0 bg-[#D90000] text-white text-sm font-bold px-4 py-2 shadow-md z-20 leading-none'
            style={{
              clipPath: "polygon(0% 0%, 92% 0%, 102% 50%, 92% 100%, 0% 120%)",
            }}>
            Opens at {category.opens_at}
          </div>
        )}

        {/* Title   */}
        <div className='absolute bottom-0 w-full z-10 text-white text-center'>
          <h3 className='font-bold text-xl tracking-widest uppercase'>
            {category.name}
          </h3>
        </div>

      
        <div className='absolute top-0 w-full h-full bg-black opacity-20 z-0'></div>
      </div>
    </div>
  );
};

export default CategoryCard;
