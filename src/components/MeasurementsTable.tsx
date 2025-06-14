import React, { useState } from 'react';
import { Measurement } from '../types/measurement';
import { exportToCsv } from '../utils/csv';

interface MeasurementsTableProps {
  measurements: Measurement[];
  onUpdate: (id: number, data: Partial<Measurement>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const MeasurementsTable: React.FC<MeasurementsTableProps> = ({
  measurements,
  onUpdate,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Measurement>>({});

  const handleEdit = (measurement: Measurement) => {
    setEditingId(measurement.id);
    setEditForm(measurement);
  };

  const handleSave = async (id: number) => {
    await onUpdate(id, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleExport = () => {
    const csv = exportToCsv(measurements);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'measurements.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Measurements</h2>
        <button
          onClick={handleExport}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Notes</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {measurements.map((measurement) => (
              <tr key={measurement.id} className="border-b">
                <td className="px-4 py-2">
                  {new Date(measurement.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  {editingId === measurement.id ? (
                    <input
                      type="number"
                      value={editForm.value}
                      onChange={(e) =>
                        setEditForm({ ...editForm, value: parseFloat(e.target.value) })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    measurement.value
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === measurement.id ? (
                    <input
                      type="text"
                      value={editForm.unit}
                      onChange={(e) =>
                        setEditForm({ ...editForm, unit: e.target.value })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    measurement.unit
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === measurement.id ? (
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    measurement.category
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === measurement.id ? (
                    <input
                      type="text"
                      value={editForm.notes}
                      onChange={(e) =>
                        setEditForm({ ...editForm, notes: e.target.value })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    measurement.notes
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === measurement.id ? (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleSave(measurement.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(measurement)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(measurement.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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
    </div>
  );
};

export default MeasurementsTable; 