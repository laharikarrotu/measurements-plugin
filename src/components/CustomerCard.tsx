import React from 'react';
import { BaserowRecord } from '../api/baserowClient';
import { motion } from 'framer-motion';

interface CustomerCardProps {
  customer: {
    name: string;
    contact: string;
    measurements: BaserowRecord[];
  };
  onEdit: (id: number, data: Partial<BaserowRecord>) => Promise<BaserowRecord>;
  onDelete: (id: number) => Promise<void>;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onEdit, onDelete }) => {
  const totalArea = customer.measurements.reduce((sum, m) => sum + m.Sq_mt, 0);
  const totalWindows = customer.measurements.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
            <p className="text-gray-600">{customer.contact}</p>
          </div>
          <div className="flex space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalWindows}</div>
              <div className="text-sm text-gray-600">Windows</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalArea.toFixed(2)}</div>
              <div className="text-sm text-gray-600">m² Total</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {customer.measurements.map((measurement) => (
            <motion.div
              key={measurement.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{measurement.Window_Description}</h3>
                  <p className="text-sm text-gray-600">{measurement.Fabric_Code}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {measurement.Width_Cm} × {measurement.Height_Cm} cm
                  </div>
                  <div className="text-sm text-gray-600">{measurement.Sq_mt.toFixed(2)} m²</div>
                </div>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {measurement.Blind_Type}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {measurement.Control}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                  {measurement.Mount}
                </span>
              </div>

              <div className="mt-3 flex justify-end space-x-2">
                <button
                  onClick={() => onEdit(measurement.id, measurement)}
                  className="text-sm text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(measurement.id)}
                  className="text-sm text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerCard; 