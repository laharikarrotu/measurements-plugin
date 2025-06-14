import { useState, useEffect } from 'react';
import { BaserowRecord, fetchMeasurements, createMeasurement, updateMeasurement, deleteMeasurement } from '../api/baserowClient';

export const useMeasurements = () => {
  const [measurements, setMeasurements] = useState<BaserowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMeasurements();
  }, []);

  const loadMeasurements = async () => {
    try {
      setLoading(true);
      const data = await fetchMeasurements();
      setMeasurements(data);
      setError(null);
    } catch (err) {
      setError('Failed to load measurements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addMeasurement = async (data: Omit<BaserowRecord, 'id'>) => {
    try {
      const newMeasurement = await createMeasurement(data);
      setMeasurements(prev => [...prev, newMeasurement]);
      return newMeasurement;
    } catch (err) {
      setError('Failed to add measurement');
      throw err;
    }
  };

  const editMeasurement = async (id: number, data: Partial<BaserowRecord>) => {
    try {
      const updatedMeasurement = await updateMeasurement(id, data);
      setMeasurements(prev =>
        prev.map(measurement =>
          measurement.id === id ? updatedMeasurement : measurement
        )
      );
      return updatedMeasurement;
    } catch (err) {
      setError('Failed to update measurement');
      throw err;
    }
  };

  const removeMeasurement = async (id: number) => {
    try {
      await deleteMeasurement(id);
      setMeasurements(prev => prev.filter(measurement => measurement.id !== id));
    } catch (err) {
      setError('Failed to delete measurement');
      throw err;
    }
  };

  return {
    measurements,
    loading,
    error,
    addMeasurement,
    editMeasurement,
    removeMeasurement,
    refreshMeasurements: loadMeasurements,
  };
}; 