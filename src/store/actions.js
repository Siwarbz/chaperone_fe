import AsyncStorage from '@react-native-async-storage/async-storage';

export const Init = () => {
  return async dispatch => {
    let user_id = await AsyncStorage.getItem('user_id');
    let user_type = await AsyncStorage.getItem('user_type');
    let notification = await AsyncStorage.getItem('notification');
    if (user_id !== null) {
      console.log('user_id fetched');
      dispatch({
        type: 'LOGIN',
        user_id: user_id,
        user_type: user_type,
        notification: notification,
      });
    }
  };
};

export const Login = (user_id, user_type, notification) => {
  return async dispatch => {
    // here we can use login api to get token and then store it
    await AsyncStorage.setItem('user_id', user_id);
    await AsyncStorage.setItem('user_type', user_type);
    await AsyncStorage.setItem('notification', notification);

    console.log('user_id, user_type, user notification stored');

    dispatch({
      type: 'LOGIN',
      user_id: user_id,
      user_type: user_type,
      notification: notification,
    });
  };
};

export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
  };
};
