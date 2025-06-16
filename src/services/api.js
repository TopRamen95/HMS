import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Adjust if using a different port

export const fetchOTSchedule = () => axios.get(`${API_BASE_URL}/ot`);
export const fetchInventory = () => axios.get(`${API_BASE_URL}/inventory`);
export const fetchAlerts = () => axios.get(`${API_BASE_URL}/alerts`);
