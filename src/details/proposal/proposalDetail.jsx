import baseApiUrl from '../../globals/importVars';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import OfferLi from '../../lists/offer/offerLi';
import useAuthFetch from '../../utils/authFetch';
import usePostFilters from '../../utils/filterPost';

const ProposalDetail = (props) => {
    const [proposals, setProposals] = useState({});
    const [loading, setLoading] = useState(true);
    const [proposalIndex, setProposalIndex] = useState(0);

    const authFetch = useAuthFetch();
    const postFilters = usePostFilters();
    
    const authUserId = Number(localStorage.getItem("userId"));

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
        await authFetch(baseApiUrl + "/proposal/" + proposals[proposalIndex]["proposalId"], {method: 'DELETE'})

        if (props.deleteCallback) {
            props.deleteCallback();
        }
    };

    const acceptFn = async () => {
        await authFetch(baseApiUrl + "/proposal/" + proposals[proposalIndex]["proposalId"], 
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
                    Подобранная сумма, ₽
                </Col>
                <Col sm={2}>
                    Статус кредитора
                </Col>
                <Col sm={8}>
                    <Row>
                        <Col sm={2}>
                            ID
                         </Col>
                        <Col sm={2}>
                            Сумма, ₽
                        </Col>
                        <Col sm={2}>
                            Годовой процент, %
                        </Col>
                        <Col sm={2}>
                            Статус
                        </Col>
                        <Col sm={2}>
                            Срок, дни
                        </Col>
                        <Col sm={2}>
                            Время создания
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
                    {(props.match["status"] === "created") ? "Подобран" : "Принял"}
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
                            Демонстрируется предложение {proposalIndex + 1} из {proposals.length} 
                        </p>
                    </Row>
                    <Row className="mb-3">
                        <p className={proposals[proposalIndex]["status"] === "accepted" ? "text-success": ""}>
                            Ваш статус: {proposals[proposalIndex]["status"] === "created" ? "подобрано" : "принято"}
                        </p> 
                    </Row>
                    <MatchHeader />
                    {proposals[proposalIndex]["matches"].map((m) => <Match match={m} />)}
                    {
                        (authUserId === props.userId) ?
                        <Row className="d-flex justify-content-evenly">
                            <button onClick={deleteFn} className="w-25 btn btn-outline-danger">
                                Отказать
                            </button>
                            <button onClick={acceptFn} className="w-25 btn btn-outline-success">
                                Принять
                            </button> 
                        </Row>:
                        ""
                    }
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