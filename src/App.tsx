import React from 'react';
import { useMeasurements } from './hooks/useMeasurements';
import MeasurementsTable from './components/MeasurementsTable';
import MeasurementForm from './components/MeasurementForm';
import { motion } from 'framer-motion';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import CustomerDetailsPage from './components/CustomerDetailsPage';
import CustomersPage from './components/CustomersPage';
import Navbar from './components/Navbar';
import BlindBackground from './components/BlindBackground';

// Home Page Component
const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="px-8 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              Professional Window Measurements
            </motion.h1>
            <motion.p
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
              Streamline your window measurement process with our comprehensive solution.
              Perfect for blinds, curtains, and window treatments.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
            >
              <Link
                to="/customers"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Customers
              </Link>
              <Link
                to="/add"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                Add New Measurement
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        >
          <div className="text-blue-500 text-4xl mb-4">📐</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Precise Measurements</h3>
          <p className="text-gray-600">
            Capture detailed window dimensions with support for sloped ceilings and special requirements.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        >
          <div className="text-green-500 text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Management</h3>
          <p className="text-gray-600">
            Organize measurements by customer with detailed profiles and contact information.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
        >
          <div className="text-purple-500 text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Reports</h3>
          <p className="text-gray-600">
            Generate comprehensive reports with area calculations and installation details.
          </p>
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <p className="flex items-center text-gray-600">
                <span className="text-blue-500 mr-2">📞</span>
                +1 (555) 123-4567
              </p>
              <p className="flex items-center text-gray-600">
                <span className="text-blue-500 mr-2">✉️</span>
                support@measurements.com
              </p>
              <p className="flex items-center text-gray-600">
                <span className="text-blue-500 mr-2">📍</span>
                123 Measurement Street, Suite 100<br />
                City, State 12345
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
            <div className="space-y-2 text-gray-600">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600 italic mb-4">
              "This system has revolutionized how we handle window measurements. The attention to detail is impressive!"
            </p>
            <p className="font-semibold text-gray-900">- John Smith, Interior Designer</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600 italic mb-4">
              "The customer management features are excellent. We can now track all our clients' measurements in one place."
            </p>
            <p className="font-semibold text-gray-900">- Sarah Johnson, Window Treatment Specialist</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// All Measurements Page Component
const AllMeasurementsPage: React.FC = () => {
  const { measurements, editMeasurement, removeMeasurement } = useMeasurements();

  return (
    <motion.div
      className="bg-white shadow-2xl rounded-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-800">All Measurements</h2>
      <MeasurementsTable
        measurements={measurements}
        onEdit={editMeasurement}
        onDelete={removeMeasurement}
      />
    </motion.div>
  );
};

// Add Measurement Page Component
const AddMeasurementPage: React.FC = () => {
  const { addMeasurement } = useMeasurements();

  return (
    <motion.div
      className="bg-white shadow-2xl rounded-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Add New Measurement</h2>
      <MeasurementForm onSubmit={addMeasurement} />
    </motion.div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BlindBackground />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customer/:customerName" element={<CustomerDetailsPage />} />
          <Route path="/all" element={<AllMeasurementsPage />} />
          <Route path="/add" element={<AddMeasurementPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App; 