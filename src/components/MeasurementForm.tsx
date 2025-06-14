import React, { useState } from 'react';
import { BaserowRecord } from '../api/baserowClient';

interface MeasurementFormProps {
  onSubmit: (data: Omit<BaserowRecord, 'id'>) => Promise<BaserowRecord>;
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<BaserowRecord, 'id'>>({
    Fabric_Code: '',
    Blind_Type: 'Zebra',
    Control: 'Motorized',
    Mount: 'Inside',
    Window_Description: '',
    Comments: '',
    Width_Cm: 0,
    Height_Cm: 0,
    Sq_mt: 0,
    Customer_Name: '',
    Contact: '',
    Date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        Fabric_Code: '',
        Blind_Type: 'Zebra',
        Control: 'Motorized',
        Mount: 'Inside',
        Window_Description: '',
        Comments: '',
        Width_Cm: 0,
        Height_Cm: 0,
        Sq_mt: 0,
        Customer_Name: '',
        Contact: '',
        Date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('Cm') || name === 'Sq_mt' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Add New Measurement</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Fabric_Code">
            Fabric Code
          </label>
          <input
            type="text"
            id="Fabric_Code"
            name="Fabric_Code"
            value={formData.Fabric_Code}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Blind_Type">
            Blind Type
          </label>
          <select
            id="Blind_Type"
            name="Blind_Type"
            value={formData.Blind_Type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="Zebra">Zebra</option>
            <option value="Roller">Roller</option>
            <option value="Honeycomb">Honeycomb</option>
            <option value="Shangrila">Shangrila</option>
            <option value="Dream">Dream</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Control">
            Control
          </label>
          <select
            id="Control"
            name="Control"
            value={formData.Control}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="Motorized">Motorized</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Mount">
            Mount
          </label>
          <select
            id="Mount"
            name="Mount"
            value={formData.Mount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="Inside">Inside</option>
            <option value="Outside">Outside</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Window_Description">
            Window Description
          </label>
          <input
            type="text"
            id="Window_Description"
            name="Window_Description"
            value={formData.Window_Description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Width_Cm">
            Width (Cm)
          </label>
          <input
            type="number"
            id="Width_Cm"
            name="Width_Cm"
            value={formData.Width_Cm}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Height_Cm">
            Height (Cm)
          </label>
          <input
            type="number"
            id="Height_Cm"
            name="Height_Cm"
            value={formData.Height_Cm}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customer_Name">
            Customer Name
          </label>
          <input
            type="text"
            id="Customer_Name"
            name="Customer_Name"
            value={formData.Customer_Name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Contact">
            Contact
          </label>
          <input
            type="text"
            id="Contact"
            name="Contact"
            value={formData.Contact}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Date">
            Date
          </label>
          <input
            type="date"
            id="Date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Comments">
            Comments
          </label>
          <textarea
            id="Comments"
            name="Comments"
            value={formData.Comments}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Measurement
        </button>
      </div>
    </form>
  );
};

export default MeasurementForm; 