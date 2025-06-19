export default function FilterSidebar({ filters, setFilters }) {
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="w-64 p-4 bg-gray-100 border-r">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Date Filter */}
      <div className="mb-4">
        <h3 className="font-bold">Date</h3>
        <button
          onClick={() => handleFilterChange("date", "today")}
          className="block w-full text-left px-4 py-2 mt-2 bg-gray-200 rounded"
        >
          Today
        </button>
        <button
          onClick={() => handleFilterChange("date", "tomorrow")}
          className="block w-full text-left px-4 py-2 mt-2 bg-gray-200 rounded"
        >
          Tomorrow
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="font-bold">Categories</h3>
        <button
          onClick={() => handleFilterChange("category", "comedy")}
          className="block w-full text-left px-4 py-2 mt-2 bg-gray-200 rounded"
        >
          Comedy Shows
        </button>
        <button
          onClick={() => handleFilterChange("category", "workshops")}
          className="block w-full text-left px-4 py-2 mt-2 bg-gray-200 rounded"
        >
          Workshops
        </button>
      </div>
    </div>
  );
}
