/* eslint-disable prettier/prettier */
import client from '../client';

export const createDoctorSchedule = async (
  doctorId,
  dayOfWeek,
  freeDay,
  workStartTime,
  pauseStartTime,
  pauseEndTime,
  workEndTime,
  slot,
  consultationDuration,
) => {
  try {
    const {data} = await client.post('/appointment/createDoctorSchedule', {
      doctorId,
      dayOfWeek,
      freeDay,
      workStartTime,
      pauseStartTime,
      pauseEndTime,
      workEndTime,
      slot,
      consultationDuration,
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

export const getDoctorInfos = async doctorId => {
  try {
    const {data} = await client.get(`/doctor/getAllInfos/${doctorId}`);

    console.log(data);

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};

export const updateScheduleSystem = async (doctorId, freeSchedule) => {
  try {
    const {data} = await client.post(`/doctor/updateScheduleSystem`, {
      doctorId,
      freeSchedule,
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

export const updateNotifications = async (
  id,
  seenNotifications,
  unseenNotifications,
) => {
  try {
    const {data} = await client.post(`/user/updateNotifications`, {
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

export const updateStatus = async (appointmentId, status) => {
  try {
    const {data} = await client.post(`/appointment/changeAppointmentStatus`, {
      appointmentId,
      status,
    });

    return {data: data, success: true};
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data;
    }
    return {success: false, error: error.message};
  }
};
