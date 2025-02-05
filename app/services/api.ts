import axios from 'axios';

export const getPokemon = async (name: string) => {
  try {
    const response = await axios.get(`/api/pokemon?name=${name}`);
    return response.data;
  } catch (error) {
    console.error('Network Error:', error);
    return null;
  }
};
