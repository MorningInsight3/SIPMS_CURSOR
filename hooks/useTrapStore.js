import { create } from 'zustand';
import axios from 'axios';

const useTrapStore = create((set) => ({
  isLoading: false,
  postTrapData: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axios.post('https://glamsipms.com/api/v2/newTrap', data); // Replace with your API endpoint
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error posting trap data:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTrapStore;
