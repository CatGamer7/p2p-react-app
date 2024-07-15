import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

const OfferLi = (props) => {
    const humanize = (stringStatus) => {
        switch (stringStatus) {
            case "available":
                return "Доступно";

            case "matched":
                return "Подобрано";
        }
    }

    return (<Row>
        <Col sm={2}>
            <Link to={"/offer/" + props.offer["offerId"]}>{props.offer["offerId"]}</Link>
        </Col>
        <Col sm={2}>
            {props.offer["amount"]}
        </Col>
        <Col sm={2}>
            {props.offer["interestRate"]}
        </Col>
        <Col sm={2}>
            {humanize(props.offer["status"])}
        </Col>
        <Col sm={2}>
            {props.offer["durationDays"]}
        </Col>
        <Col sm={2}>
            {new Date(props.offer["createdTimestamp"]).toLocaleTimeString("ru", {hour12: false})}
        </Col>
        <hr/>
    </Row>)
};

export default OfferLi;