// src/components/Shimmer.jsx
const Shimmer = () => {
  return (
    <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md animate-pulse w-full overflow-hidden"
        >
          <div className="h-44 bg-gray-300 w-full"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;





