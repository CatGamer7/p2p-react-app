import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

const RequestLi = (props) => (
    <Row>
        <Col sm={2}>
            <Link to={"/request/" + props.request["requestId"]}>{props.request["requestId"]}</Link>
        </Col>
        <Col sm={2}>
            {props.request["requestedAmount"]}
        </Col>
        <Col sm={4}>
            {
                props.request["reason"].length > 40 ? 
                props.request["reason"].substring(0, 37) + "..." :
                props.request["reason"]
            }

        </Col>
        <Col sm={2}>
            {props.request["status"]}
        </Col>
        <Col sm={2}>
            {new Date(props.request["createdTimestamp"]).toLocaleTimeString("ru", {hour12: false})}
        </Col>
        <hr/>
    </Row>
);

export default RequestLi;