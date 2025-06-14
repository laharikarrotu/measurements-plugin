import axios from 'axios';

const BASEROW_API_URL = process.env.REACT_APP_BASEROW_API_URL;
const BASEROW_TOKEN = process.env.REACT_APP_BASEROW_TOKEN;
const TABLE_ID = process.env.REACT_APP_TABLE_ID;

// Validate environment variables
if (!BASEROW_API_URL || !BASEROW_TOKEN || !TABLE_ID) {
  console.error('Missing required environment variables:', {
    BASEROW_API_URL: !BASEROW_API_URL,
    BASEROW_TOKEN: !BASEROW_TOKEN,
    TABLE_ID: !TABLE_ID
  });
  throw new Error('Missing required environment variables. Please check your .env file.');
}

const baserowClient = axios.create({
  baseURL: BASEROW_API_URL,
  headers: {
    'Authorization': `Token ${BASEROW_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface BaserowRecord {
  id: number;
  Fabric_Code: string;
  Blind_Type: string;
  Control: string;
  Mount: string;
  Window_Description: string;
  Comments: string;
  Width_Cm: number;
  Height_Cm: number;
  Sq_mt: number;
  Customer_Name: string;
  Contact: string;
  Date: string;
}

export const fetchMeasurements = async (): Promise<BaserowRecord[]> => {
  try {
    console.log('Fetching measurements from table:', TABLE_ID);
    const response = await baserowClient.get(`/api/database/rows/table/${TABLE_ID}/`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching measurements:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
    }
    throw error;
  }
};

export const createMeasurement = async (data: Omit<BaserowRecord, 'id'>): Promise<BaserowRecord> => {
  try {
    const response = await baserowClient.post(`/api/database/rows/table/${TABLE_ID}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating measurement:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        requestData: data
      });
    }
    throw error;
  }
};

export const updateMeasurement = async (id: number, data: Partial<BaserowRecord>): Promise<BaserowRecord> => {
  try {
    const response = await baserowClient.patch(`/api/database/rows/table/${TABLE_ID}/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating measurement:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        requestData: data
      });
    }
    throw error;
  }
};

export const deleteMeasurement = async (id: number): Promise<void> => {
  try {
    await baserowClient.delete(`/api/database/rows/table/${TABLE_ID}/${id}/`);
  } catch (error) {
    console.error('Error deleting measurement:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data
      });
    }
    throw error;
  }
}; 