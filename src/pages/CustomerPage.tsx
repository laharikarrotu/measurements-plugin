import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMeasurements } from '../hooks/useMeasurements';
import CustomerCard from '../components/CustomerCard';
import { motion } from 'framer-motion';

const CustomerPage: React.FC = () => {
  const { customerName } = useParams<{ customerName: string }>();
  const navigate = useNavigate();
  const { customers, editMeasurement, removeMeasurement } = useMeasurements();

  if (!customerName || !customers[customerName]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Customer not found</div>
      </div>
    );
  }

  const customer = customers[customerName];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>
        </div>

        <CustomerCard
          customer={customer}
          onEdit={editMeasurement}
          onDelete={removeMeasurement}
        />
      </div>
    </motion.div>
  );
};

export default CustomerPage; 