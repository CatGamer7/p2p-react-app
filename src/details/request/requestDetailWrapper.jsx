import { useParams } from 'react-router-dom';
import RequestDetail from './requestDetail';

const RequestDetailWrapper = () => {

  const { id } = useParams();

  return <RequestDetail id={id} />;
};

export default RequestDetailWrapper;