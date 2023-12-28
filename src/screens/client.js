/* eslint-disable prettier/prettier */
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.1.7:3000',
});
export default client;

export const IP = 'http://192.168.1.6:3000';
export const azure = 'http://192.168.1.7:3000';
