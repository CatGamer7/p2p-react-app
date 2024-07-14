import baseApiUrl from '../../globals/importVars';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthFetch from '../../utils/authFetch';

const OfferForm = (props) => {
    const [amount, setAmount] = useState(props.offer ? props.offer["amount"] : 0);
    const [interestRate, setInterestRate] = useState(props.offer ? props.offer["interestRate"] : 0);
    const [durationDays, setDurationDays] = useState(props.offer ? props.offer["durationDays"] : 0);

    const [amountEmpty, setAmountEmpty] = useState(false);
    const [rateEmpty, setRateEmpty] = useState(false);
    const [durationEmpty, setDurationEmpty] = useState(false);

    const navigate = useNavigate();
    const authFetch = useAuthFetch();

    var lenderId = Number(localStorage.getItem("userId"));
    var offerId = null;
    var status = 1;
    
    if (props.offer) {
        offerId = props.offer["offerId"] ? props.offer["offerId"] : null;
        status = props.offer["status"];
    }

    const send = async () => {
        const data = packValues();

        if (!data) {
            return;
        } 

        await authFetch(
            baseApiUrl + "/offer", 
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        .then((data) => navigate("/offer/" + data["offerId"]));

        if (props.callback) {
            props.callback();
        }
    };

    const dataCallback = () => {
        const data = packValues();

        if (!data) {
            return;
        } 

        props.dataCallback(data)
    }

    const packValues = () => {

        setAmountEmpty(false);
        setRateEmpty(false);
        setDurationEmpty(false);

        if (!(amount && (Number(amount) > 0))) {
            setAmountEmpty(true);
            return false;
        }
        if (!(interestRate && (Number(interestRate) > 0))) {
            setRateEmpty(true);
            return false;
        }
        if (!(durationDays && (Number(durationDays) > 0))) {
            setDurationEmpty(true);
            return false;
        }

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
            <Container fluid className="border rounded border-secondary border-3">
                <Row className="my-2">
                    <Col sm={4}>
                    </Col>
                    <Col sm={2}>
                        <label htmlFor="amount">Amount, ₽</label>
                    </Col>
                    <Col sm={2}>
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
                    <Col sm={4}>
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
                        <label htmlFor="interestRate">Interest rate, %</label>
                    </Col>
                    <Col sm={2}>
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
                    <Col sm={4}>
                        {
                            rateEmpty ?
                            <div className="border border-danger text-center">
                                Interest rate must be positive.
                            </div> :
                            ""
                        }
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col sm={4}>
                    </Col>
                    <Col sm={2}>
                        <label htmlFor="durationDays">Duration in days</label>
                    </Col>
                    <Col sm={2}>
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
                    <Col sm={4}>
                        {
                            durationEmpty ?
                            <div className="border border-danger text-center">
                                Duration must be positive.
                            </div> :
                            ""
                        }
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <button onClick={props.dataCallback ? dataCallback : send} className="w-25 my-2 btn btn-outline-success">
                        Submit
                    </button>
                </Row>
            </Container>
        </Container>
    );
}

export default OfferForm;