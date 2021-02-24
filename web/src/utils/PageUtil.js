import axios from 'axios';
import { serverBaseUrl } from '../utils/config';

export async function getDataFromUrl({ url }) {
  const response = await axios.get(`${serverBaseUrl}/${url}`);
  return response.data;
}

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
