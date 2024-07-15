import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

const UserLi = (props) => (
    <Row>
        <Col sm={2}>
            <Link to={"/user/" + props.user["userId"]}>{props.user["userId"]}</Link>
        </Col>
        <Col sm={3}>
            {props.user["name"]}
        </Col>
        <Col sm={3}>
            {props.user["email"]}
        </Col>
        <Col sm={2}>
            {props.user["active"] ? "Активен" : "Неактивен"}
        </Col>
        <Col sm={2}>
            {new Date(props.user["createdTimestamp"]).toLocaleString("ru", {hour12: false})}
        </Col>
        <hr/>
    </Row>
);

export default UserLi;