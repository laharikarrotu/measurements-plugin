import React from 'react';
import { MeasurementFilter } from '../types/measurement';

interface FilterControlsProps {
  filter: MeasurementFilter;
  onFilterChange: (filter: MeasurementFilter) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filter, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filter,
      [name]: name.includes('Value') ? parseFloat(value) || undefined : value || undefined,
    });
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Filter Measurements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filter.startDate || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filter.endDate || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={filter.category || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minValue">
            Min Value
          </label>
          <input
            type="number"
            id="minValue"
            name="minValue"
            value={filter.minValue || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxValue">
            Max Value
          </label>
          <input
            type="number"
            id="maxValue"
            name="maxValue"
            value={filter.maxValue || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => onFilterChange({})}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterControls; 