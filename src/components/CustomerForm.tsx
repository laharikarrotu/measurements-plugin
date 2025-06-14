import React, { useState } from 'react';

interface CustomerFormProps {
  onSubmit: (data: { customer_name: string; address: string; phone_number: string; wall_color: string }) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [wallColor, setWallColor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ customer_name: customerName, address, phone_number: phoneNumber, wall_color: wallColor });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          id="customerName"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="wallColor" className="block text-sm font-medium text-gray-700">Wall Color</label>
        <input
          type="text"
          id="wallColor"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={wallColor}
          onChange={(e) => setWallColor(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Customer Info
      </button>
    </form>
  );
};

export default CustomerForm; 