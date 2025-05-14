// Custom hook to handle logout logic
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAuthState } from '../../../../redux/slice/super_admin/auth/authSlice';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(resetAuthState());
    localStorage.clear();
    navigate('/super_admin/login');
  };

  return handleLogout;
};

export default useLogout;
