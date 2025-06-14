import Papa from 'papaparse';
import { Measurement, MeasurementFormData } from '../types/measurement';

export const exportToCsv = (measurements: Measurement[]): string => {
  const csv = Papa.unparse(measurements.map(m => ({
    timestamp: m.timestamp,
    value: m.value,
    unit: m.unit,
    category: m.category,
    notes: m.notes || '',
  })));
  return csv;
};

export const importFromCsv = (csvContent: string): MeasurementFormData[] => {
  const { data, errors } = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length > 0) {
    throw new Error('Error parsing CSV: ' + errors.map(e => e.message).join(', '));
  }

  return data.map((row: any) => ({
    value: parseFloat(row.value),
    unit: row.unit,
    category: row.category,
    notes: row.notes || undefined,
  }));
}; 