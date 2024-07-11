import { useParams } from 'react-router-dom';
import UserDetail from './userDetail';

const UserDetailWrapper = () => {

  const { id } = useParams();

  return <UserDetail id={id} />;
};

export default UserDetailWrapper;