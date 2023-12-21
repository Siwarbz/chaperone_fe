/* eslint-disable prettier/prettier */
import client from '../client';
import axios from 'axios';
import {azure} from '../client';

export const verifyEmail = async (userId, otp) => {
  try {
    const {data} = await axios.post(`${azure}/api/user/verify-email`, {
      userId,
      otp,
    });
    return data;
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const forgotPassword = async email => {
  try {
    const {data} = await axios.post(`${azure}/api/user/forgot-password`, {
      email,
    });
    return data;
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};
export const resetPassword = async password => {
  try {
    const {data} = await axios.post(`${azure}/api/user/reset-password`, {
      password,
    });
    return data;
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};
