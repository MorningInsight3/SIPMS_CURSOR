import { create } from 'zustand';
import axios from 'axios';

const useRepoFindingStore = create((set) => ({
  isLoading: false,
  postRepofindingData: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axios.post('https://glamsipms.com/api/v2/newRepoFinding', data); // Replace with your API endpoint
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error posting finding data:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useRepoFindingStore;
