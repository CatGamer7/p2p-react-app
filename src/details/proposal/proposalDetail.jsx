import baseApiUrl from '../../globals/importVars';
import postFilters from '../../utils/filterPost';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import OfferLi from '../../lists/offer/offerLi';

const ProposalDetail = (props) => {
    const [proposals, setProposals] = useState({});
    const [loading, setLoading] = useState(true);
    const [proposalIndex, setProposalIndex] = useState(0);

    const load = async (id) => {

        let url = baseApiUrl + "/proposal";
        await postFilters(
            url,
            [{
                "column": "requestId",
                "operator": "=",
                "operands": [id]
            }]
        )
        .then((data) => {
            setProposals(data["content"]);
            setLoading(false);
        })
    };

    const deleteFn = async () => {
        await fetch(baseApiUrl + "/proposal/" + proposals[proposalIndex]["proposalId"], {method: 'DELETE'})

        if (props.deleteCallback) {
            props.deleteCallback();
        }
    };

    const acceptFn = async () => {
        await fetch(baseApiUrl + "/proposal/" + proposals[proposalIndex]["proposalId"], 
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
    }, [props.id, proposalIndex, loading]);

    const MatchHeader = () => {
        return (
            <Row>
                <Col sm={2}>
                    Matched amount, ₽
                </Col>
                <Col sm={2}>
                    Lender Status
                </Col>
                <Col sm={8}>
                    <Row>
                        <Col sm={2}>
                            Offer ID
                         </Col>
                        <Col sm={2}>
                            Amount, ₽
                        </Col>
                        <Col sm={2}>
                            Interest rate, %
                        </Col>
                        <Col sm={2}>
                            Status
                        </Col>
                        <Col sm={2}>
                            Duration, days
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

    const Match = (props) => {
        return (
            <Row>
                <Col sm={2}>
                    {props.match["amount"]}
                </Col>
                <Col sm={2}>
                    {props.match["status"]}
                </Col>
                <Col sm={8}>
                    <OfferLi offer={props.match["offer"]} />
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
                            Displaying proposal {proposalIndex + 1} of {proposals.length} 
                        </p>
                    </Row>
                    <Row className="mb-3">
                        <p className={proposals[proposalIndex]["status"] === "accepted" ? "text-success": ""}>
                            Your status: {proposals[proposalIndex]["status"]}
                        </p> 
                    </Row>
                    <MatchHeader />
                    {proposals[proposalIndex]["matches"].map((m) => <Match match={m} />)}
                    <Row className="d-flex justify-content-evenly">
                        <button onClick={deleteFn} className="w-25 btn btn-outline-danger">
                            Reject
                        </button>
                        <button onClick={acceptFn} className="w-25 btn btn-outline-success">
                            Accept
                        </button>
                    </Row>
                    <Row className="d-flex justify-content-evenly my-3">
                        {
                            proposalIndex > 0 ? 
                            (<button className="w-25 btn btn-outline-primary" onClick={() => {setProposalIndex(proposalIndex - 1)}}>
                                <strong>{proposalIndex}</strong>
                            </button>) :
                            ""
                        }
                        <button className="w-25 no-pointer btn btn-primary">
                            <strong>{proposalIndex + 1}</strong>
                        </button>
                        {
                            (proposalIndex + 1) < proposals.length ? 
                            (<button className="w-25 btn btn-outline-primary" onClick={() => {setProposalIndex(proposalIndex + 1)}}>
                                <strong>{proposalIndex + 2}</strong>
                            </button>) :
                            ""
                        }
                    </Row>
                </Container>)
            }
        </Container>
    );
}

export default ProposalDetail;