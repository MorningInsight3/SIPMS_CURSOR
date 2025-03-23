import { create } from 'zustand';
import axios from 'axios';

const useMoveTrapData = create((set) => ({
  isLoading: false,
  postMoveTrapData: async (id, data) => {
    set({ isLoading: true });

    try {
      const response = await axios.post(`https://glamsipms.com/api/v2/moveTrap/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error posting trap data:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useMoveTrapData;
