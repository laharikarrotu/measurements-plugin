import React, { useState } from 'react';
import { BaserowRecord } from '../api/baserowClient';

interface MeasurementsTableProps {
  measurements: BaserowRecord[];
  onEdit: (id: number, data: Partial<BaserowRecord>) => Promise<BaserowRecord>;
  onDelete: (id: number) => Promise<void>;
}

const MeasurementsTable: React.FC<MeasurementsTableProps> = ({
  measurements,
  onEdit,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<BaserowRecord>>({});

  const handleEdit = (measurement: BaserowRecord) => {
    setEditingId(measurement.id);
    setEditForm(measurement);
  };

  const handleSave = async (id: number) => {
    await onEdit(id, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fabric Code</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blind Type</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mount</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Window Description</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Width (Cm)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height (Cm)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sq.mt</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {measurements.map((measurement) => (
            <tr key={measurement.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === measurement.id ? (
                  <input
                    type="text"
                    value={editForm.Fabric_Code || ''}
                    onChange={(e) => setEditForm({ ...editForm, Fabric_Code: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{measurement.Fabric_Code}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === measurement.id ? (
                  <select
                    value={editForm.Blind_Type || ''}
                    onChange={(e) => setEditForm({ ...editForm, Blind_Type: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Zebra">Zebra</option>
                    <option value="Roller">Roller</option>
                    <option value="Honeycomb">Honeycomb</option>
                    <option value="Shangrila">Shangrila</option>
                    <option value="Dream">Dream</option>
                  </select>
                ) : (
                  <div className="text-sm text-gray-900">{measurement.Blind_Type}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === measurement.id ? (
                  <select
                    value={editForm.Control || ''}
                    onChange={(e) => setEditForm({ ...editForm, Control: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Motorized">Motorized</option>
                    <option value="Manual">Manual</option>
                  </select>
                ) : (
                  <div className="text-sm text-gray-900">{measurement.Control}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === measurement.id ? (
                  <select
                    value={editForm.Mount || ''}
                    onChange={(e) => setEditForm({ ...editForm, Mount: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Inside">Inside</option>
                    <option value="Outside">Outside</option>
                  </select>
                ) : (
                  <div className="text-sm text-gray-900">{measurement.Mount}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === measurement.id ? (
                  <input
                    type="text"
                    value={editForm.Window_Description || ''}
                    onChange={(e) => setEditForm({ ...editForm, Window_Description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{measurement.Window_Description}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === measurement.id ? (
                  <input
                    type="number"
                    value={editForm.Width_Cm || ''}
                    onChange={(e) => setEditForm({ ...editForm, Width_Cm: parseFloat(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{measurement.Width_Cm}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === measurement.id ? (
                  <input
                    type="number"
                    value={editForm.Height_Cm || ''}
                    onChange={(e) => setEditForm({ ...editForm, Height_Cm: parseFloat(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{measurement.Height_Cm}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{measurement.Sq_mt}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === measurement.id ? (
                  <input
                    type="text"
                    value={editForm.Customer_Name || ''}
                    onChange={(e) => setEditForm({ ...editForm, Customer_Name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{measurement.Customer_Name}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === measurement.id ? (
                  <input
                    type="text"
                    value={editForm.Contact || ''}
                    onChange={(e) => setEditForm({ ...editForm, Contact: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{measurement.Contact}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === measurement.id ? (
                  <input
                    type="date"
                    value={editForm.Date || ''}
                    onChange={(e) => setEditForm({ ...editForm, Date: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="text-sm text-gray-900">{new Date(measurement.Date).toLocaleDateString()}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {editingId === measurement.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(measurement.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(measurement)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(measurement.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeasurementsTable; 