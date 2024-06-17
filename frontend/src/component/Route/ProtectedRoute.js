import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../layout/loader/loader';

const ProtectedRoute = ({ element: Element }) => {
  const { loading , isAuthenticated } = useSelector((state) => state.user);

  if (loading) {
    
    return <Loader />;
  }
 
  

  return (
    isAuthenticated ? <Element /> : <Navigate to="/login" />
  );
};

export default ProtectedRoute;