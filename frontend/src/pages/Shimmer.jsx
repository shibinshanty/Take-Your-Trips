const Shimmer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 px-4">
      {Array(10).fill("").map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-pulse"
        >
        
          <div className="h-44 bg-gray-300 w-full"></div>

         
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;



