import baseApiUrl from '../../globals/importVars';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const OfferForm = (props) => {
    const [amount, setAmount] = useState(props.offer ? props.offer["amount"] : 0);
    const [interestRate, setInterestRate] = useState(props.offer ? props.offer["interestRate"] : 0);
    const [durationDays, setDurationDays] = useState(props.offer ? props.offer["durationDays"] : 0);

    const navigate = useNavigate();

    var lenderId = 1;
    var offerId = null;
    var status = 1;
    
    if (props.offer) {
        offerId = props.offer["offerId"] ? props.offer["offerId"] : null;
        status = props.offer["status"];
    }

    const send = async () => {
        await fetch(
            baseApiUrl + "/offer", 
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(packValues())
            })
        .then((res) => res.json())
        .then((data) => navigate("/offer/" + data["offerId"]));

        if (props.callback) {
            props.callback();
        }
    };

    const packValues = () => {
        return {
            "offerId": offerId,
            "lenderId": lenderId,
            "amount": Number(amount),
            "interestRate": Number(interestRate),
            "durationDays": Number(durationDays),
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
                            min="0">
                        </input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label htmlFor="interestRate">Interest rate</label>
                    </Col>
                    <Col>
                        <input 
                            value={interestRate} 
                            onChange={(e) => setInterestRate(e.target.value)} 
                            name="interestRate" 
                            id="interestRate" 
                            type="number" 
                            step="0.01" 
                            min="0">
                        </input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label htmlFor="durationDays">Duration in days</label>
                    </Col>
                    <Col>
                        <input 
                            value={durationDays} 
                            onChange={(e) => setDurationDays(e.target.value)} 
                            name="durationDays" 
                            id="durationDays" 
                            type="number" 
                            step="1" 
                            min="0">
                        </input>
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

export default OfferForm;