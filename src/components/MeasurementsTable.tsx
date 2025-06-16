import React, { useState } from 'react';
import { BaserowRecord } from '../api/baserowClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleEdit = async (id: number) => {
    if (editingId === id) {
      try {
        await onEdit(id, editForm);
        setEditingId(null);
        setEditForm({});
      } catch (error) {
        console.error('Error updating measurement:', error);
      }
    } else {
      const measurement = measurements.find(m => m.id === id);
      if (measurement) {
        setEditingId(id);
        setEditForm(measurement);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this measurement?')) {
      setIsDeleting(id);
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Error deleting measurement:', error);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Window
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dimensions
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Blind Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Control
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {measurements.map((measurement) => (
            <motion.tr
              key={measurement.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {measurement.Customer_Name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {measurement.Contact}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{measurement.Window_Description}</div>
                <div className="text-sm text-gray-500">{measurement.Fabric_Code}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {measurement.Width_Cm} × {measurement.Height_Cm} cm
                </div>
                <div className="text-sm text-gray-500">
                  {measurement.Sq_mt.toFixed(2)} m²
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {measurement.Blind_Type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {measurement.Control}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                  {measurement.Mount}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex space-x-2">
                  <Link
                    to={`/customer/${encodeURIComponent(measurement.Customer_Name)}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleEdit(measurement.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {editingId === measurement.id ? 'Save' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDelete(measurement.id)}
                    disabled={isDeleting === measurement.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    {isDeleting === measurement.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeasurementsTable; 