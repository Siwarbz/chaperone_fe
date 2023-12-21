import {useDispatch} from 'react-redux';
import {Logout} from '../store/actions';

export const Signout = async () => {
  const dispatch = useDispatch();

  dispatch(Logout());
};
