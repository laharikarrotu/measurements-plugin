import React, { useState } from 'react';
import { createBlindMeasurement, BlindMeasurement, CreateBlindMeasurementPayload } from '../api/baserow';

interface WindowMeasurementFormProps {
  customerId: number;
  onSubmit: (data: BlindMeasurement) => void;
}

const WindowMeasurementForm: React.FC<WindowMeasurementFormProps> = ({ customerId, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<CreateBlindMeasurementPayload>>({
    "S.No": undefined,
    "Fabric Code": '',
    "Blind Type": '',
    "Control": '',
    "Mount": '',
    "Window Description": '',
    "Comments": '',
    "Width (Cm)": undefined,
    "Height (Cm)": undefined,
    "Sq.mt": undefined,
    "Customer Name": '',
    "Contact": '',
    "Date": new Date().toISOString().split('T')[0], // Default to current date
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (e.target.type === 'number' ? parseFloat(value) : value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Ensure all required fields are present and correctly typed
      const dataToSubmit: CreateBlindMeasurementPayload = {
        "S.No": formData["S.No"] || 0, // Provide a default or handle validation
        "Fabric Code": formData["Fabric Code"] || '',
        "Blind Type": formData["Blind Type"] || '',
        "Control": formData["Control"] || '',
        "Mount": formData["Mount"] || '',
        "Window Description": formData["Window Description"] || '',
        "Comments": formData["Comments"] || '',
        "Width (Cm)": formData["Width (Cm)"] || 0,
        "Height (Cm)": formData["Height (Cm)"] || 0,
        "Sq.mt": formData["Sq.mt"] || 0,
        "Customer Name": formData["Customer Name"] || '',
        "Contact": formData["Contact"] || '',
        "Date": formData["Date"] || new Date().toISOString().split('T')[0],
      };

      const newMeasurement = await createBlindMeasurement(dataToSubmit);
      onSubmit(newMeasurement);
      // Clear form after successful submission
      setFormData({
        "S.No": undefined,
        "Fabric Code": '',
        "Blind Type": '',
        "Control": '',
        "Mount": '',
        "Window Description": '',
        "Comments": '',
        "Width (Cm)": undefined,
        "Height (Cm)": undefined,
        "Sq.mt": undefined,
        "Customer Name": '',
        "Contact": '',
        "Date": new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Failed to submit measurement:', error);
      alert('Failed to submit measurement. Please check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">Window Measurement Details</h2>

      {/* S.No */}
      <div>
        <label htmlFor="S.No" className="block text-sm font-medium text-gray-700">S.No</label>
        <input
          type="number"
          id="S.No"
          name="S.No"
          value={formData["S.No"] || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      {/* Fabric Code */}
      <div>
        <label htmlFor="Fabric Code" className="block text-sm font-medium text-gray-700">Fabric Code</label>
        <input
          type="text"
          id="Fabric Code"
          name="Fabric Code"
          value={formData["Fabric Code"] || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      {/* Blind Type */}
      <div>
        <label htmlFor="Blind Type" className="block text-sm font-medium text-gray-700">Blind Type</label>
        <select
          id="Blind Type"
          name="Blind Type"
          value={formData["Blind Type"] || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
          required
        >
          <option value="">Select Blind Type</option>
          <option value="Zebra">Zebra</option>
          <option value="Roller">Roller</option>
          <option value="Dream Blinds">Dream Blinds</option>
        </select>
      </div>

      {/* Control */}
      <div>
        <label htmlFor="Control" className="block text-sm font-medium text-gray-700">Control</label>
        <select
          id="Control"
          name="Control"
          value={formData["Control"] || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
          required
        >
          <option value="">Select Control</option>
          <option value="Motorized">Motorized</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      {/* Mount */}
      <div>
        <label htmlFor="Mount" className="block text-sm font-medium text-gray-700">Mount</label>
        <select
          id="Mount"
          name="Mount"
          value={formData["Mount"] || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
          required
        >
          <option value="">Select Mount</option>
          <option value="Inside">Inside</option>
          <option value="Outside">Outside</option>
        </select>
      </div>

      {/* Window Description */}
      <div>
        <label htmlFor="Window Description" className="block text-sm font-medium text-gray-700">Window Description</label>
        <input
          type="text"
          id="Window Description"
          name="Window Description"
          value={formData["Window Description"] || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      {/* Comments */}
      <div>
        <label htmlFor="Comments" className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea
          id="Comments"
          name="Comments"
          value={formData.Comments || ''}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>

      {/* Width (Cm) */}
      <div>
        <label htmlFor="Width (Cm)" className="block text-sm font-medium text-gray-700">Width (Cm)</label>
        <input
          type="number"
          id="Width (Cm)"
          name="Width (Cm)"
          value={formData["Width (Cm)"] || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          step="0.01"
          required
        />
      </div>

      {/* Height (Cm) */}
      <div>
        <label htmlFor="Height (Cm)" className="block text-sm font-medium text-gray-700">Height (Cm)</label>
        <input
          type="number"
          id="Height (Cm)"
          name="Height (Cm)"
          value={formData["Height (Cm)"] || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          step="0.01"
          required
        />
      </div>

      {/* Sq.mt (Calculated or input, for now, let's allow input) */}
      <div>
        <label htmlFor="Sq.mt" className="block text-sm font-medium text-gray-700">Sq.mt</label>
        <input
          type="number"
          id="Sq.mt"
          name="Sq.mt"
          value={formData["Sq.mt"] || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          step="0.01"
          required
        />
      </div>

      {/* Customer Name (pre-filled or fetched based on customerId) */}
      <div>
        <label htmlFor="Customer Name" className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          id="Customer Name"
          name="Customer Name"
          value={formData["Customer Name"] || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      {/* Contact (pre-filled or fetched based on customerId) */}
      <div>
        <label htmlFor="Contact" className="block text-sm font-medium text-gray-700">Contact</label>
        <input
          type="text"
          id="Contact"
          name="Contact"
          value={formData.Contact || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      {/* Date */}
      <div>
        <label htmlFor="Date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="Date"
          name="Date"
          value={formData.Date || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Add Measurement'}
      </button>
    </form>
  );
};

export default WindowMeasurementForm; 