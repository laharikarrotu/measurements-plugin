import React from 'react';
import { Link } from 'react-router-dom';
import { useMeasurements } from '../hooks/useMeasurements';
import CustomerCard from '../components/CustomerCard';
import BlindBackground from '../components/BlindBackground';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
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
      <BlindBackground />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blind Measurements</h1>
          <Link
            to="/add"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Measurement
          </Link>
        </div>

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

export default HomePage; 