import axios from 'axios';

// Define the interface for your Blind Measurements data
// Ensure these types and field names exactly match your Baserow table
export interface BlindMeasurement {
  id: number; // Baserow generates this, so it's always present on retrieved records
  "S.No": number;
  "Fabric Code": string;
  "Blind Type": string;
  "Control": string;
  "Mount": string;
  "Window Description": string;
  "Comments": string;
  "Width (Cm)": number;
  "Height (Cm)": number;
  "Sq.mt": number;
  "Customer Name": string;
  "Contact": string;
  "Date": string; // Baserow dates are typically returned as ISO 8601 strings
}

// Interface for data sent to create (excluding id which is auto-generated by Baserow)
export type CreateBlindMeasurementPayload = Omit<BlindMeasurement, 'id'>;

// Baserow API Configuration
const BASEROW_API_URL = process.env.REACT_APP_BASEROW_API_URL || 'https://api.baserow.io';
const BASEROW_TOKEN = process.env.REACT_APP_BASEROW_TOKEN;
const MEASUREMENTS_TABLE_ID = process.env.REACT_APP_MEASUREMENTS_TABLE_ID;

if (!BASEROW_TOKEN || !MEASUREMENTS_TABLE_ID) {
  console.error('Baserow API Token or Table ID is not set in environment variables.');
  // You might want to throw an error or handle this more gracefully in a real application
}

const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${BASEROW_TOKEN}`,
};

const BASE_URL = `${BASEROW_API_URL}/api/database/rows/table/${MEASUREMENTS_TABLE_ID}/`;

export const getBlindMeasurements = async (): Promise<BlindMeasurement[]> => {
  try {
    const response = await axios.get<{ results: BlindMeasurement[] }>(BASE_URL, { headers: API_HEADERS });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching blind measurements:', error);
    throw error;
  }
};

export const createBlindMeasurement = async (data: CreateBlindMeasurementPayload): Promise<BlindMeasurement> => {
  try {
    // Baserow expects data under a 'fields' key for creation/update
    const payload = { fields: data };
    const response = await axios.post<BlindMeasurement>(BASE_URL, payload, { headers: API_HEADERS });
    return response.data;
  } catch (error) {
    console.error('Error creating blind measurement:', error);
    throw error;
  }
};

export const updateBlindMeasurement = async (id: number, data: Partial<CreateBlindMeasurementPayload>): Promise<BlindMeasurement> => {
  try {
    // Baserow expects data under a 'fields' key for creation/update
    const payload = { fields: data };
    const response = await axios.patch<BlindMeasurement>(`${BASE_URL}${id}/`, payload, { headers: API_HEADERS });
    return response.data;
  } catch (error) {
    console.error('Error updating blind measurement:', error);
    throw error;
  }
};

export const deleteBlindMeasurement = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}${id}/`, { headers: API_HEADERS });
  } catch (error) {
    console.error('Error deleting blind measurement:', error);
    throw error;
  }
}; 