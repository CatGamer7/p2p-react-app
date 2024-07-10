import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const OfferLi = (props) => (
    <Row>
        <Col sm={2}>
            {props.offer["offerId"]}
        </Col>
        <Col sm={2}>
            {props.offer["amount"]}
        </Col>
        <Col sm={2}>
            {props.offer["interestRate"]}
        </Col>
        <Col sm={2}>
            {props.offer["status"]}
        </Col>
        <Col sm={2}>
            {props.offer["durationDays"]}
        </Col>
        <Col sm={2}>
            {new Date(props.offer["createdTimestamp"]).toLocaleTimeString("ru", {hour12: false})}
        </Col>
        <hr/>
    </Row>
);

export default OfferLi;