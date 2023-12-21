/* eslint-disable prettier/prettier */
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://chaperonebackend.azurewebsites.net',
});
export default client;

export const IP = 'http://192.168.1.6:3000';
export const azure = 'https://chaperonebackend.azurewebsites.net';
