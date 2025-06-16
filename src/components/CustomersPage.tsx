import React from 'react';
import { useMeasurements } from '../hooks/useMeasurements';
import CustomerCard from './CustomerCard';
import { motion } from 'framer-motion';

const CustomersPage: React.FC = () => {
  const { customers, loading, error, editMeasurement, removeMeasurement } = useMeasurements();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Customers</h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.values(customers).map((customer) => (
            <motion.div
              key={customer.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CustomerCard
                customer={customer}
                onEdit={editMeasurement}
                onDelete={removeMeasurement}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomersPage; 