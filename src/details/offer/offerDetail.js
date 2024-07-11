import baseApiUrl from '../../globals/importVars';
import OfferForm from '../../forms/offer/offerForm';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const OfferDetail = (props) => {
    const [offer, setOffer] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    const load = async (id) => {
        await fetch(baseApiUrl + "/offer/" + id)
        .then((res) => res.json())
        .then((data) => {
            setOffer(data);
            setLoading(false);
        });
    };

    const deleteFn = async () => {
        await fetch(baseApiUrl + "/offer/" + props.id, {method: 'DELETE'})

        navigate("/offer");
    };

    useEffect(() => {
        load(props.id);
    }, [props.id, editing]);

    return (
        editing ?
        <OfferForm offer={offer} callback={() => {setEditing(false)}}/> :

        <Container className="d-flex justify-content-center">
            {
                loading ?
                <Spinner animation="border" variant="primary" /> :
                (<Container fluid className="border rounded">
                    <Row>
                        <table className="table table-bordered table-striped">
                            <tr>
                                <th>
                                    Offer ID
                                </th>
                                <td>
                                    {offer["offerId"]}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Amount
                                </th>
                                <td>
                                    {offer["amount"]} ₽
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Interest rate
                                </th>
                                <td>
                                    {offer["interestRate"]} %
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Duration
                                </th>
                                <td>
                                    {offer["durationDays"]} days
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Status
                                </th>
                                <td>
                                    {offer["status"]}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Created timestamp
                                </th>
                                <td>
                                    {offer["createdTimestamp"]}
                                </td>
                            </tr>
                        </table>
                    </Row>
                    <Row>
                        {offer["lender"]["name"]}
                    </Row>
                    <Row className="d-flex justify-content-evenly my-3">
                        <button onClick={deleteFn} className="w-25">
                            Delete
                        </button>
                       
                        <button onClick={() => setEditing(true)} className="w-25">
                            Edit
                        </button>
                    </Row>
                </Container>)
            }
        </Container>
    );
}

export default OfferDetail;