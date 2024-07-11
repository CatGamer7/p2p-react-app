import baseApiUrl from '../../globals/importVars';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RequestForm = (props) => {
    const [amount, setAmount] = useState(props.request ? props.request["requestedAmount"] : 0);
    const [reason, setReason] = useState(props.request ? props.request["reason"] : 0);

    const navigate = useNavigate();

    var borrowerId = 1;
    var requestId = null;
    var status = 1;
    
    if (props.request) {
        requestId = props.request["requestId"] ? props.request["requestId"] : null;
        status = props.request["status"];
    }

    const send = async () => {
        await fetch(
            baseApiUrl + "/request", 
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(packValues())
            })
        .then((res) => res.json())
        .then((data) => navigate("/request/" + data["requestId"]));

        if (props.callback) {
            props.callback();
        }
    };

    const packValues = () => {
        return {
            "requestId": requestId,
            "borrowerId": borrowerId,
            "requestedAmount": Number(amount),
            "reason": reason,
            "status": status
        }
    }

    return (
        <Container className="d-flex justify-content-center">
            <Container fluid className="border rounded">
                <Row>
                    <Col>
                        <label htmlFor="amount">Amount</label>
                    </Col>
                    <Col>
                        <input 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            name="amount" 
                            id="amount" 
                            type="number" 
                            step="0.01" 
                            min="0"
                        >
                        </input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label htmlFor="interestRate">Reason</label>
                    </Col>
                    <Col>
                        <textarea
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)} 
                            name="reason" 
                            id="reason" 
                            rows="6"
                            cols="50"
                            maxlength="255"
                        >
                        </textarea>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={send}>
                            Submit
                        </button>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default RequestForm;