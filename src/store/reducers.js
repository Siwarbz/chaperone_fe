const initialState = {
  auth_user_id: null,
  auth_user_type: null,
  auth_notification: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, //copy all previous states
        auth_user_id: action.user_id,
        auth_user_type: action.user_type,
        auth_notification: action.notification,
      };
    case 'LOGOUT':
      return {
        auth_user_id: null,
        auth_user_type: null,
        auth_notification: null,
      };

    default:
      return state;
  }
};
