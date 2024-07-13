import baseApiUrl from '../../globals/importVars';
import postFilters from '../../utils/filterPost';
import RequestLi from '../../lists/requests/requestLi';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';

const MatchDetail = (props) => {
    const [matches, setMatches] = useState({});
    const [loading, setLoading] = useState(true);
    const [matchIndex, setMatchIndex] = useState(0);

    const load = async (id) => {

        let url = baseApiUrl + "/match";
        await postFilters(
            url,
            [{
                "column": "offerId",
                "operator": "=",
                "operands": [id]
            }]
        )
        .then((data) => {
            setMatches(data["content"]);
            setLoading(false);
        })
    };

    const deleteFn = async () => {
        await fetch(baseApiUrl + "/match/" + matches[matchIndex]["matchId"], {method: 'DELETE'})

        if (props.deleteCallback) {
            props.deleteCallback();
        }
    };

    const acceptFn = async () => {
        await fetch(baseApiUrl + "/match/" + matches[matchIndex]["matchId"], 
            {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"status": "accepted"})
            })
            .then(() => setLoading(true))
    };

    useEffect(() => {
        load(props.id);
    }, [props.id, matchIndex, loading]);

    const MatchHeader = () => {
        return (
            <Row>
                <Col sm={2}>
                    Matched amount, ₽
                </Col>
                <Col sm={2}>
                    Borrower status
                </Col>
                <Col sm={8}>
                    <Row>
                        <Col sm={2}>
                            Request ID
                        </Col>
                        <Col sm={2}>
                            Amount, ₽
                        </Col>
                        <Col sm={4}>
                            Reason, %
                        </Col>
                        <Col sm={2}>
                            Status
                        </Col>
                        <Col sm={2}>
                            Created at
                        </Col>
                    </Row>
                </Col>
                <hr className="mb-1"/>
            </Row>
        )
    }

    const Proposal = (props) => {
        return (
            <Row>
                <Col sm={2}>
                    {props.matchedAmount} 
                </Col>
                <Col sm={2}>
                    {props.proposal["status"]}
                </Col>
                <Col sm={8}>
                    <RequestLi request={props.proposal["request"]} />
                </Col>
            </Row>
        )
    }

    return (
        <Container className="d-flex justify-content-center">
            {
                loading ?
                <Spinner animation="border" variant="primary" /> :
                (<Container fluid className="border rounded">
                    <Row>
                        <p>
                            Displaying match {matchIndex + 1} of {matches.length} 
                        </p>
                    </Row>
                    <Row className="mb-3">
                        <p className={matches[matchIndex]["status"] === "accepted" ? "text-primary": ""}>
                            Your status: {matches[matchIndex]["status"]}
                        </p> 
                    </Row>
                    <MatchHeader />
                    <Proposal matchedAmount={matches[matchIndex]["amount"]} proposal={matches[matchIndex]["proposal"]} />
                    <Row className="d-flex justify-content-evenly">
                        <button onClick={deleteFn} className="w-25">
                            Delete
                        </button>
                        <button onClick={acceptFn} className="w-25">
                            Accept
                        </button>
                    </Row>
                    <Row className="d-flex justify-content-evenly my-3">
                        {
                            matchIndex > 0 ? 
                            (<button className="w-25" onClick={() => {setMatchIndex(matchIndex - 1)}}>
                                <strong>{matchIndex}</strong>
                            </button>) :
                            ""
                        }
                        <button className="w-25 no-pointer">
                            <strong>{matchIndex + 1}</strong>
                        </button>
                        {
                            (matchIndex + 1) < matches.length ? 
                            (<button className="w-25" onClick={() => {setMatchIndex(matchIndex + 1)}}>
                                <strong>{matchIndex + 2}</strong>
                            </button>) :
                            ""
                        }
                    </Row>
                </Container>)
            }
        </Container>
    );
}

export default MatchDetail;