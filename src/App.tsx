import React from 'react';
import { useMeasurements } from './hooks/useMeasurements';
import MeasurementsTable from './components/MeasurementsTable';
import MeasurementForm from './components/MeasurementForm';
import { motion, Transition } from 'framer-motion';

function App() {
  const {
    measurements,
    loading,
    error,
    addMeasurement,
    editMeasurement,
    removeMeasurement,
  } = useMeasurements();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } as Transition },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } as Transition },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="text-xl text-gray-700">Loading measurements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        className="container px-4 py-8 mx-auto bg-white shadow-2xl rounded-xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="mb-4 text-5xl font-extrabold text-center text-gray-900"
          variants={itemVariants}
        >
          Measurements for Blinds
        </motion.h1>
        <motion.p
          className="max-w-2xl mx-auto mb-8 text-lg text-center text-gray-600"
          variants={itemVariants}
        >
          Welcome to your personalized solution for tracking and managing window measurements. 
          Seamlessly integrate with Baserow to keep all your project data organized and accessible.
        </motion.p>

        <motion.div className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFig0-xtVF8m4mIcbQqpXyPp1zwodHrJEqJg&s" alt="Blinds Illustration" className="rounded-lg shadow-lg" />
        </motion.div>

        <motion.div className="p-6 mb-12 rounded-lg shadow-inner bg-blue-50" variants={itemVariants}>
          <h2 className="mb-4 text-2xl font-bold text-blue-800">Add New Measurement</h2>
          <MeasurementForm onSubmit={addMeasurement} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">All Measurements</h2>
          <MeasurementsTable
            measurements={measurements}
            onEdit={editMeasurement}
            onDelete={removeMeasurement}
          />
          <div className="flex justify-end mt-6">
            <a
              href="mailto:?subject=Baserow Measurements Table&body=Check out our measurements table: https://baserow.io/public/grid/6pBD_vhD2EKIoiV8qcYLA_czrWCrhg-Ns4VSXYen85Y"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Share Table via Email
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App; 