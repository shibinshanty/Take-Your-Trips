

const Shimmer = () => {
  return (
    <div className="w-full px-4 flex flex-col items-center space-y-10">
    
      <div className="flex flex-wrap justify-center gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`row1-${index}`}
            className="w-64 bg-white rounded-2xl shadow-lg animate-pulse overflow-hidden"
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

     
      <div className="flex flex-wrap justify-center gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`row2-${index}`}
            className="w-64 bg-white rounded-2xl shadow-lg animate-pulse overflow-hidden"
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
    </div>
  );
};

export default Shimmer;





