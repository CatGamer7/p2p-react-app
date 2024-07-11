import { useParams } from 'react-router-dom';
import UserDetail from './userDetail';

const UserDetail = () => {

  const { id } = useParams();

  return <UserDetail id={id} />;
};

export default UserDetail;