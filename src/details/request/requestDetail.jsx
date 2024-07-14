import baseApiUrl from '../../globals/importVars';
import RequestForm from '../../forms/request/requestForm';
import OfferForm from '../../forms/offer/offerForm';
import ProposalDetail from '../proposal/proposalDetail';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/esm/Collapse';
import UserDetail from '../user/userDetail';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthFetch from '../../utils/authFetch';

const RequestDetail = (props) => {
    const [request, setRequest] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const authFetch = useAuthFetch();

    const load = async (id) => {
        await authFetch(baseApiUrl + "/request/" + id, {method: 'GET'})
        .then((data) => {
            setRequest(data);
            setLoading(false);
        })
        .catch(error => {
            if (error instanceof TypeError) {
                navigate("/no-connection");
            }
        })
    };

    const deleteFn = async () => {
        await authFetch(baseApiUrl + "/request/" + props.id, {method: 'DELETE'})

        navigate("/request");
    };

    const newOffer = async (newOffer) => {
        const payload = {
            "offer": newOffer,
            "requestId": props.id
        };

        await authFetch(baseApiUrl + "/proposal", 
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
        .then((res) => res.json());

        setLoading(true);
    };

    useEffect(() => {
        load(props.id);
    }, [props.id, editing, loading]);

    return (
        editing ?
        <RequestForm request={request} callback={() => {setEditing(false)}}/> :

        <Container className="d-flex justify-content-center mb-6">
            {
                loading ?
                <Spinner animation="border" variant="primary" /> :
                (<Container fluid className="border rounded border border-secondary border-3">
                    <Row className="mt-2">
                        <Col sm={2}>
                        </Col>
                        <Col sm={8}>
                            <table className="table table-bordered table-striped">
                                <tr>
                                    <th>
                                        Request ID
                                    </th>
                                    <td>
                                        {request["requestId"]}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Amount
                                    </th>
                                    <td>
                                        {request["requestedAmount"]} ₽
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Reason
                                    </th>
                                    <td>
                                        {request["reason"]}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Status
                                    </th>
                                    <td>
                                        {request["status"]}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Created timestamp
                                    </th>
                                    <td>
                                        {request["createdTimestamp"]}
                                    </td>
                                </tr>
                            </table>
                        </Col>
                        <Col sm={2}>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-evenly my-3">
                        <button onClick={deleteFn} className="w-25 btn btn-outline-danger">
                            Delete
                        </button>
                       
                        <button onClick={() => setEditing(true)} className="w-25 btn btn-outline-primary">
                            Edit
                        </button>
                    </Row>
                    <Row className="my-1">
                        <button onClick={() => setOpen(!open)} className="btn btn-outline text-primary">
                            Toggle user info
                        </button>
                        <hr></hr>
                    </Row>
                    <Collapse in={open}>
                        <div>
                            <UserDetail id={request["borrower"]["userId"]} readOnly={true}/>
                        </div>
                    </Collapse>
                    {
                        (request["status"] === "matched") ?
                        <Row className="mt-5">
                            <div className="d-flex justify-content-center">
                                <p>
                                    Proposals will be listed below
                                </p>
                            </div>
                            <ProposalDetail id={props.id} deleteCallback={() => setLoading(true)}/>
                        </Row> :
                        <Row className="mt-5 mb-3">
                            <div className="d-flex justify-content-center">
                                This request has no offers yet. You may submit your own.
                            </div>
                            <OfferForm dataCallback={(data) => newOffer(data)} />
                        </Row>
                    }   
                </Container>)
            }
        </Container>
    );
}

export default RequestDetail;