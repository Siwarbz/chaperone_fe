/* eslint-disable prettier/prettier */
import axios from 'axios';
import client from '../client';
import {azure} from '../client';

export const updateNotifications = async (
  id,
  seenNotifications,
  unseenNotifications,
) => {
  try {
    const {data} = axios.post(`${azure}/api/user/updateNotifications`, {
      id,
      seenNotifications,
      unseenNotifications,
    });

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const sendInvitation = async (patientId, chaperonEmail) => {
  try {
    console.log('utils client', {patientId, chaperonEmail});
    const {data} = await axios.post(
      `${azure}/api/patient/sendContactInvitation`,
      {
        patientId,
        chaperonEmail,
      },
    );

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const createTranscription = async patientId => {
  try {
    const {data} = await axios.post(`${azure}/api/transcription/create`, {
      patientId,
    });

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const changeHeartbeat = async (userId, heartbeat) => {
  try {
    const {data} = await axios.post(`${azure}/api/patient/modifyHeartbeat`, {
      userId,
      heartbeat,
    });

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const changeGlycemia = async (userId, glycemia) => {
  try {
    const {data} = await axios.post(`${azure}/api/patient/modifyGlycemia`, {
      userId,
      glycemia,
    });

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const changeHeight = async (userId, height) => {
  try {
    const {data} = await axios.post(`${azure}/api/patient/modifyHeight`, {
      userId,
      height,
    });

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const changeWeight = async (userId, weight) => {
  try {
    const {data} = await axios.post(`${azure}/api/patient/modifyWeight`, {
      userId,
      weight,
    });

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const changeAge = async (userId, age) => {
  try {
    const {data} = axios.post(`${azure}/api/patient/modifyAge`, {
      userId,
      age,
    });

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const changeTemperature = async (userId, temperature) => {
  try {
    const {data} = axios.post(`${azure}/api/patient/modifyTemperature`, {
      userId,
      temperature,
    });

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const changeContactStatus = async (trustContactId, status) => {
  try {
    const {data} = axios.post(`${azure}/api/patient/changeContactStatus`, {
      trustContactId,
      status,
    });

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};
export const deleteContact = async trustContactId => {
  try {
    const {data} = axios.post(`${azure}/api/patient/deleteContact`, {
      trustContactId,
    });

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};
