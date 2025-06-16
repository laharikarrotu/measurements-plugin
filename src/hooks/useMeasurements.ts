import { useState, useEffect } from 'react';
import { BaserowRecord, fetchMeasurements, createMeasurement, updateMeasurement, deleteMeasurement } from '../api/baserowClient';

interface UseMeasurementsReturn {
  measurements: BaserowRecord[];
  customers: { [key: string]: { name: string; contact: string; measurements: BaserowRecord[] } };
  loading: boolean;
  error: string | null;
  addMeasurement: (data: Omit<BaserowRecord, 'id'>) => Promise<BaserowRecord>;
  editMeasurement: (id: number, data: Partial<BaserowRecord>) => Promise<BaserowRecord>;
  removeMeasurement: (id: number) => Promise<void>;
  refreshMeasurements: () => Promise<void>;
}

export const useMeasurements = (): UseMeasurementsReturn => {
  const [measurements, setMeasurements] = useState<BaserowRecord[]>([]);
  const [customers, setCustomers] = useState<{ [key: string]: { name: string; contact: string; measurements: BaserowRecord[] } }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshMeasurements = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMeasurements();
      setMeasurements(data);

      // Group measurements by customer
      const customerGroups = data.reduce((acc: { [key: string]: { name: string; contact: string; measurements: BaserowRecord[] } }, measurement: BaserowRecord) => {
        const customerName = measurement.Customer_Name;
        if (!acc[customerName]) {
          acc[customerName] = {
            name: customerName,
            contact: measurement.Contact,
            measurements: [],
          };
        }
        acc[customerName].measurements.push(measurement);
        return acc;
      }, {});

      setCustomers(customerGroups);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch measurements');
      console.error('Error fetching measurements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshMeasurements();
  }, []);

  const addMeasurement = async (data: Omit<BaserowRecord, 'id'>) => {
    try {
      setError(null);
      const newMeasurement = await createMeasurement(data);
      setMeasurements(prev => [...prev, newMeasurement]);
      
      // Update customers state
      setCustomers(prev => {
        const customerName = newMeasurement.Customer_Name;
        const customer = prev[customerName] || {
          name: customerName,
          contact: newMeasurement.Contact,
          measurements: [],
        };
        return {
          ...prev,
          [customerName]: {
            ...customer,
            measurements: [...customer.measurements, newMeasurement],
          },
        };
      });

      return newMeasurement;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add measurement');
      throw err;
    }
  };

  const editMeasurement = async (id: number, data: Partial<BaserowRecord>) => {
    try {
      setError(null);
      const updatedMeasurement = await updateMeasurement(id, data);
      setMeasurements(prev =>
        prev.map(m => (m.id === id ? updatedMeasurement : m))
      );

      // Update customers state
      setCustomers(prev => {
        const oldCustomer = Object.values(prev).find(c => 
          c.measurements.some(m => m.id === id)
        );
        const newCustomerName = data.Customer_Name || oldCustomer?.name;

        if (!oldCustomer || !newCustomerName) return prev;

        // Remove from old customer if name changed
        if (oldCustomer.name !== newCustomerName) {
          const updatedOldCustomer = {
            ...oldCustomer,
            measurements: oldCustomer.measurements.filter(m => m.id !== id),
          };

          // Add to new customer
          const newCustomer = prev[newCustomerName] || {
            name: newCustomerName,
            contact: data.Contact || oldCustomer.contact,
            measurements: [],
          };

          return {
            ...prev,
            [oldCustomer.name]: updatedOldCustomer,
            [newCustomerName]: {
              ...newCustomer,
              measurements: [...newCustomer.measurements, updatedMeasurement],
            },
          };
        }

        // Update within same customer
        return {
          ...prev,
          [oldCustomer.name]: {
            ...oldCustomer,
            measurements: oldCustomer.measurements.map(m =>
              m.id === id ? updatedMeasurement : m
            ),
          },
        };
      });

      return updatedMeasurement;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update measurement');
      throw err;
    }
  };

  const removeMeasurement = async (id: number) => {
    try {
      setError(null);
      await deleteMeasurement(id);
      setMeasurements(prev => prev.filter(m => m.id !== id));

      // Update customers state
      setCustomers(prev => {
        const customer = Object.values(prev).find(c => 
          c.measurements.some(m => m.id === id)
        );
        if (!customer) return prev;

        const updatedCustomer = {
          ...customer,
          measurements: customer.measurements.filter(m => m.id !== id),
        };

        // Remove customer if no measurements left
        if (updatedCustomer.measurements.length === 0) {
          const { [customer.name]: _, ...rest } = prev;
          return rest;
        }

        return {
          ...prev,
          [customer.name]: updatedCustomer,
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete measurement');
      throw err;
    }
  };

  return {
    measurements,
    customers,
    loading,
    error,
    addMeasurement,
    editMeasurement,
    removeMeasurement,
    refreshMeasurements,
  };
}; 