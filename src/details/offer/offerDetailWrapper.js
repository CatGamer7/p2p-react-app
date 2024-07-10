import { useParams } from 'react-router-dom';
import OfferDetail from './offerDetail';

const OfferDetailWrapper = () => {

  const { id } = useParams();

  return <OfferDetail id={id} />;
};

export default OfferDetailWrapper;