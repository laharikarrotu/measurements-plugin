export interface Customer {
  id: number;
  customer_name: string;
  address: string;
  phone_number: string;
  wall_color: string;
  created_at: string;
  updated_at: string;
}

export interface WindowMeasurement {
  id: number;
  customer_id: number;
  room_name: string;
  window_name: string;
  is_high_ceiling: boolean;
  blind_type: 'Zebra' | 'Roller' | 'Honeycomb' | 'Shangrila' | 'Dream';
  blind_model: string;
  mount_type: 'Inside' | 'Outside';
  mechanism: 'Motor' | 'Manual';
  operation_type?: 'Chains' | 'Rod' | 'Spring';
  height_left: number;
  height_middle: number;
  height_right: number;
  width_bottom: number;
  width_middle: number;
  width_top: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface WindowMeasurementFormData {
  customer_id: number;
  room_name: string;
  window_name: string;
  is_high_ceiling: boolean;
  blind_type: 'Zebra' | 'Roller' | 'Honeycomb' | 'Shangrila' | 'Dream';
  blind_model: string;
  mount_type: 'Inside' | 'Outside';
  mechanism: 'Motor' | 'Manual';
  operation_type: 'Chains' | 'Rod' | 'Spring';
  height_left: number;
  height_middle: number;
  height_right: number;
  width_bottom: number;
  width_middle: number;
  width_top: number;
  notes: string;
}

export interface CustomerFormData {
  customer_name: string;
  address: string;
  phone_number: string;
  wall_color: string;
}

export interface MeasurementFilter {
  customer_id?: number;
  room_name?: string;
  blind_type?: WindowMeasurement['blind_type'];
  mount_type?: WindowMeasurement['mount_type'];
  mechanism?: WindowMeasurement['mechanism'];
  startDate?: string;
  endDate?: string;
  minValue?: number;
  maxValue?: number;
  category?: string;
}

export interface MeasurementFormData {
  value: number;
  unit: string;
  category: string;
  notes: string;
}

export interface Measurement {
  id: number;
  timestamp: string;
  value: number;
  unit: string;
  category: string;
  notes: string;
} 