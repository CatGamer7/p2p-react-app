import baseApiUrl from '../../globals/importVars';
import RequestForm from '../../forms/request/requestForm';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const RequestDetail = (props) => {
    const [request, setRequest] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    const load = async (id) => {
        await fetch(baseApiUrl + "/request/" + id)
        .then((res) => res.json())
        .then((data) => {
            setRequest(data);
            setLoading(false);
        });
    };

    const deleteFn = async () => {
        await fetch(baseApiUrl + "/request/" + props.id, {method: 'DELETE'})

        navigate("/request");
    };

    useEffect(() => {
        load(props.id);
    }, [props.id, editing]);

    return (
        editing ?
        <RequestForm request={request} callback={() => {setEditing(false)}}/> :

        <Container className="d-flex justify-content-center">
            {
                loading ?
                <Spinner animation="border" variant="primary" /> :
                (<Container fluid className="border rounded">
                    <Row>
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
                                    {request["reason"]} %
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
                    </Row>
                    <Row>
                        {request["borrower"]["name"]}
                    </Row>
                    <Row>
                        <Col>
                            <button onClick={deleteFn}>
                                Delete
                            </button>
                        </Col>
                        <Col>
                            <button onClick={() => setEditing(true)}>
                                Edit
                            </button>
                        </Col>
                    </Row>
                </Container>)
            }
        </Container>
    );
}

export default RequestDetail;