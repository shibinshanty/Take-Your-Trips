

const ShimmerUi = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
      {Array(10).fill("").map((_, index) => (
        <div
          key={index}
          className="w-64 h-64 bg-gray-200 rounded-2xl animate-pulse shadow-md"
        >
          <div className="h-44 bg-gray-300 rounded-t-2xl"></div>
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerUi;
