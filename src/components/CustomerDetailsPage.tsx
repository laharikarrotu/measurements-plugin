import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaserowRecord } from '../api/baserowClient';
import MeasurementsTable from './MeasurementsTable';
import MeasurementForm from './MeasurementForm';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { useMeasurements } from '../hooks/useMeasurements';

// Simple Toast Component (can be moved to its own file later if needed)
interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-between z-50`}
    >
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-4 font-bold text-white leading-none text-xl">&times;</button>
    </motion.div>
  );
};

const CustomerDetailsPage: React.FC = () => {
  const { customerName } = useParams<{ customerName: string }>();
  const { customers, editMeasurement, removeMeasurement, addMeasurement } = useMeasurements();
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const customer = customerName ? customers[customerName] : null;
  const customerMeasurements = customer?.measurements || [];

  const groupedMeasurements = useMemo(() => {
    return customerMeasurements.reduce((acc, measurement) => {
      const windowDesc = measurement.Window_Description || 'Unspecified Window';
      if (!acc[windowDesc]) {
        acc[windowDesc] = [];
      }
      acc[windowDesc].push(measurement);
      return acc;
    }, {} as Record<string, BaserowRecord[]>);
  }, [customerMeasurements]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000); // Dismiss toast after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!customerName || !customer) {
    return (
      <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <h2 className="text-3xl font-bold text-red-600">Customer not found.</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to All Measurements</Link>
      </div>
    );
  }

  const handleAddMeasurement = async (data: Omit<BaserowRecord, 'id'>) => {
    try {
      const newData = { ...data, Customer_Name: customerName };
      if (!newData.Contact && customer.contact) {
        newData.Contact = customer.contact;
      }
      const result = await addMeasurement(newData);
      setShowAddForm(false);
      setToast({ message: 'Measurement added successfully!', type: 'success' });
      return result;
    } catch (error) {
      console.error('Error adding measurement:', error);
      setToast({ message: `Error adding measurement: ${(error as Error).message || 'Unknown error'}`, type: 'error' });
      throw error;
    }
  };

  const handleEditMeasurement = async (id: number, data: Partial<BaserowRecord>) => {
    try {
      const result = await editMeasurement(id, data);
      setToast({ message: 'Measurement updated successfully!', type: 'success' });
      return result;
    } catch (error) {
      console.error('Error updating measurement:', error);
      setToast({ message: `Error updating measurement: ${(error as Error).message || 'Unknown error'}`, type: 'error' });
      throw error;
    }
  };

  const handleDeleteMeasurement = async (id: number) => {
    try {
      await removeMeasurement(id);
      setToast({ message: 'Measurement deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting measurement:', error);
      setToast({ message: `Error deleting measurement: ${(error as Error).message || 'Unknown error'}`, type: 'error' });
      throw error;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } as Transition },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: "easeIn" } as Transition },
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen relative">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-auto"
          >
            <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to All Measurements</Link>
      
      <motion.div
        className="bg-white rounded-lg shadow-xl p-6 mb-8 border-l-8 border-blue-600"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="flex items-center mb-2">
          <span className="text-blue-600 text-3xl mr-3">&#128100;</span>
          <h1 className="text-4xl font-extrabold text-gray-900">{customer.name}</h1>
        </div>
        {customer.contact && (
          <p className="text-lg text-gray-700 ml-10">Contact: {customer.contact}</p>
        )}
        <p className="text-md text-gray-500 mt-2 ml-10">Total Measurements: {customer.measurements.length}</p>
      </motion.div>

      <motion.div
        className="bg-white rounded-lg shadow-xl p-6 mb-8 border-l-8 border-green-600"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Add New Measurement for {customer.name}</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mb-4 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {showAddForm ? 'Hide Form' : 'Add New Measurement'}
        </button>
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <MeasurementForm onSubmit={handleAddMeasurement} initialCustomerName={customer.name} initialContact={customer.contact} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Measurements by Window</h2>
      <div className="space-y-8">
        {Object.keys(groupedMeasurements).length > 0 ? (
          Object.keys(groupedMeasurements).map((windowDesc) => (
            <motion.div
              key={windowDesc}
              className="bg-white rounded-lg shadow-xl p-6 border-l-8 border-indigo-600"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="flex items-center mb-4">
                <span className="text-indigo-600 text-2xl mr-3">&#127912;</span>
                <h3 className="text-2xl font-bold text-gray-900">{windowDesc}</h3>
              </div>
              <MeasurementsTable
                measurements={groupedMeasurements[windowDesc]}
                onEdit={handleEditMeasurement}
                onDelete={handleDeleteMeasurement}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6 border-l-8 border-yellow-600"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <p className="text-lg text-gray-700">No measurements found for this customer.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetailsPage; 