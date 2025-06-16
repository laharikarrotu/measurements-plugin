import React, { useState } from 'react';
import { BaserowRecord } from '../api/baserowClient';

interface MeasurementFormProps {
  onSubmit: (data: Omit<BaserowRecord, 'id'>) => Promise<BaserowRecord>;
  initialCustomerName?: string;
  initialContact?: string;
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({
  onSubmit,
  initialCustomerName = '',
  initialContact = '',
}) => {
  const [formData, setFormData] = useState({
    Customer_Name: initialCustomerName,
    Contact: initialContact,
    Window_Description: '',
    Width_Left: '',
    Width_Center: '',
    Width_Right: '',
    Height_Top: '',
    Height_Middle: '',
    Height_Bottom: '',
    Ceiling_Type: 'Flat',
    Mount: 'Inside',
    Blind_Type: 'Zebra',
    Control: 'Manual',
    Fabric_Code: '',
    Notes: '',
    Date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate average width and height
    const widthLeft = parseFloat(formData.Width_Left) || 0;
    const widthCenter = parseFloat(formData.Width_Center) || 0;
    const widthRight = parseFloat(formData.Width_Right) || 0;
    const heightTop = parseFloat(formData.Height_Top) || 0;
    const heightMiddle = parseFloat(formData.Height_Middle) || 0;
    const heightBottom = parseFloat(formData.Height_Bottom) || 0;

    // Calculate averages
    const avgWidth = (widthLeft + widthCenter + widthRight) / 3;
    const avgHeight = (heightTop + heightMiddle + heightBottom) / 3;
    
    // Calculate square meters
    const sqMeters = (avgWidth / 100) * (avgHeight / 100);

    const submitData = {
      ...formData,
      Width_Cm: avgWidth,
      Height_Cm: avgHeight,
      Sq_mt: sqMeters,
    };

    console.log('Submitting form data:', submitData);

    try {
      const result = await onSubmit(submitData);
      console.log('Form submission successful:', result);
      // Reset form after successful submission
      setFormData({
        Customer_Name: initialCustomerName,
        Contact: initialContact,
        Window_Description: '',
        Width_Left: '',
        Width_Center: '',
        Width_Right: '',
        Height_Top: '',
        Height_Middle: '',
        Height_Bottom: '',
        Ceiling_Type: 'Flat',
        Mount: 'Inside',
        Blind_Type: 'Zebra',
        Control: 'Manual',
        Fabric_Code: '',
        Notes: '',
        Date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit measurement. Please check the console for details.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="space-y-4">
          <div>
            <label htmlFor="Customer_Name" className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              id="Customer_Name"
              name="Customer_Name"
              value={formData.Customer_Name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="Contact" className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="text"
              id="Contact"
              name="Contact"
              value={formData.Contact}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Window Information */}
        <div className="space-y-4">
          <div>
            <label htmlFor="Window_Description" className="block text-sm font-medium text-gray-700">
              Window Location/Name
            </label>
            <input
              type="text"
              id="Window_Description"
              name="Window_Description"
              value={formData.Window_Description}
              onChange={handleChange}
              required
              placeholder="e.g., Master Large, Bathroom, Closet Up"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="Fabric_Code" className="block text-sm font-medium text-gray-700">
              Fabric Code
            </label>
            <input
              type="text"
              id="Fabric_Code"
              name="Fabric_Code"
              value={formData.Fabric_Code}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Width Measurements */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Width Measurements (cm)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="Width_Left" className="block text-sm font-medium text-gray-700">
                Left
              </label>
              <input
                type="number"
                step="0.1"
                id="Width_Left"
                name="Width_Left"
                value={formData.Width_Left}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="Width_Center" className="block text-sm font-medium text-gray-700">
                Center
              </label>
              <input
                type="number"
                step="0.1"
                id="Width_Center"
                name="Width_Center"
                value={formData.Width_Center}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="Width_Right" className="block text-sm font-medium text-gray-700">
                Right
              </label>
              <input
                type="number"
                step="0.1"
                id="Width_Right"
                name="Width_Right"
                value={formData.Width_Right}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Height Measurements */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Height Measurements (cm)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="Height_Top" className="block text-sm font-medium text-gray-700">
                Top
              </label>
              <input
                type="number"
                step="0.1"
                id="Height_Top"
                name="Height_Top"
                value={formData.Height_Top}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="Height_Middle" className="block text-sm font-medium text-gray-700">
                Middle
              </label>
              <input
                type="number"
                step="0.1"
                id="Height_Middle"
                name="Height_Middle"
                value={formData.Height_Middle}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="Height_Bottom" className="block text-sm font-medium text-gray-700">
                Bottom
              </label>
              <input
                type="number"
                step="0.1"
                id="Height_Bottom"
                name="Height_Bottom"
                value={formData.Height_Bottom}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Installation Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Installation Details</h3>
          <div>
            <label htmlFor="Ceiling_Type" className="block text-sm font-medium text-gray-700">
              Ceiling Type
            </label>
            <select
              id="Ceiling_Type"
              name="Ceiling_Type"
              value={formData.Ceiling_Type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Flat">Flat</option>
              <option value="Sloped">Sloped</option>
              <option value="High">High Ceiling</option>
              <option value="Patio Door">Patio Door</option>
            </select>
          </div>
          <div>
            <label htmlFor="Mount" className="block text-sm font-medium text-gray-700">
              Mount Type
            </label>
            <select
              id="Mount"
              name="Mount"
              value={formData.Mount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Inside">Inside</option>
              <option value="Outside">Outside</option>
              <option value="Ceiling">Ceiling</option>
            </select>
          </div>
        </div>

        {/* Blind Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Blind Specifications</h3>
          <div>
            <label htmlFor="Blind_Type" className="block text-sm font-medium text-gray-700">
              Blind Type
            </label>
            <select
              id="Blind_Type"
              name="Blind_Type"
              value={formData.Blind_Type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Zebra">Zebra</option>
              <option value="Roller">Roller</option>
              <option value="Honeycomb">Honeycomb</option>
              <option value="Shangrila">Shangrila</option>
              <option value="Dream">Dream</option>
            </select>
          </div>
          <div>
            <label htmlFor="Control" className="block text-sm font-medium text-gray-700">
              Control Type
            </label>
            <select
              id="Control"
              name="Control"
              value={formData.Control}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Manual">Manual</option>
              <option value="Motorized">Motorized</option>
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <label htmlFor="Notes" className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            id="Notes"
            name="Notes"
            value={formData.Notes}
            onChange={handleChange}
            rows={3}
            placeholder="Enter any additional notes about slopes, stack direction, arrows, etc."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Measurement
        </button>
      </div>
    </form>
  );
};

export default MeasurementForm; 