import { useParams } from 'react-router-dom';
import UserDetail from '../user/userDetail';

const UserDetailWrapper = () => {

  const { id } = useParams();

  return <UserDetail id={id} />;
};

export default UserDetailWrapper;