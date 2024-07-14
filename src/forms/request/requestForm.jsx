import baseApiUrl from '../../globals/importVars';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RequestForm = (props) => {
    const [amount, setAmount] = useState(props.request ? props.request["requestedAmount"] : 0);
    const [reason, setReason] = useState(props.request ? props.request["reason"] : "");

    const [amountEmpty, setAmountEmpty] = useState(false);
    const [reasonEmpty, setReasonEmpty] = useState(false);

    const navigate = useNavigate();

    var borrowerId = 1;
    var requestId = null;
    var status = 1;
    
    if (props.request) {
        requestId = props.request["requestId"] ? props.request["requestId"] : null;
        status = props.request["status"];
    }

    const send = async () => {
        const data = packValues();

        if (!data) {
            return;
        } 

        await fetch(
            baseApiUrl + "/request", 
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        .then((res) => res.json())
        .then((data) => navigate("/request/" + data["requestId"]));

        if (props.callback) {
            props.callback();
        }
    };

    const packValues = () => {

        setAmountEmpty(false);
        setReasonEmpty(false);

        if (!(amount && (Number(amount) > 0))) {
            setAmountEmpty(true);
            return false;
        }
        if (!reason.trim()) {
            setReasonEmpty(true);
            return false;
        }

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
            <Container fluid className="border rounded border-secondary border-3">
                <Row className="my-2">
                    <Col sm={4}>
                    </Col>
                    <Col sm={2}>
                        <label htmlFor="amount">Amount, ₽</label>
                    </Col>
                    <Col sm={3}>
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
                    <Col sm={3}>
                        {
                            amountEmpty ?
                            <div className="border border-danger text-center">
                                Amount must be positive.
                            </div> :
                            ""
                        }
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col sm={4}>
                    </Col>
                    <Col sm={2}>
                        <label htmlFor="reason">Reason</label>
                    </Col>
                    <Col sm={3}>
                        <textarea
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)} 
                            name="reason" 
                            id="reason" 
                            rows="8"
                            cols="35"
                            maxlength="255"
                        >
                        </textarea>
                    </Col>
                    <Col sm={3}>
                        {
                            reasonEmpty ?
                            <div className="border border-danger text-center">
                                Must provide a reason for loan.
                            </div> :
                            ""
                        }
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <button onClick={send} className="w-25 my-2 btn btn-outline-success">
                        Submit
                    </button>
                </Row>
            </Container>
        </Container>
    );
}

export default RequestForm;