import baseApiUrl from '../../globals/importVars';
import OfferForm from '../../forms/offer/offerForm';
import MatchDetail from '../match/matchDetail';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/esm/Collapse';
import UserDetail from '../user/userDetail';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthFetch from '../../utils/authFetch';

const OfferDetail = (props) => {
    const [offer, setOffer] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    
    const authUserId = Number(localStorage.getItem("userId"));
    const authUserStaff = localStorage.getItem("staff") === "true";

    const humanize = (stringStatus) => {
        switch (stringStatus) {
            case "available":
                return "Доступно";

            case "matched":
                return "Подобрано";
        }
    }

    const load = async (id) => {
        await authFetch(baseApiUrl + "/offer/" + id, {method: 'GET'})
        .then((data) => {
            setOffer(data);
            setLoading(false);
        })
        .catch(error => {
            if (error instanceof TypeError) {
                navigate("/no-connection");
            }
        });
    };

    const deleteFn = async () => {
        await authFetch(baseApiUrl + "/offer/" + props.id, {method: 'DELETE'})

        navigate("/offer");
    };

    useEffect(() => {
        load(props.id);
    }, [props.id, editing, loading]);

    return (
        editing ?
        <OfferForm offer={offer} callback={() => {setEditing(false)}}/> :

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
                                        ID
                                    </th>
                                    <td>
                                        {offer["offerId"]}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Сумма
                                    </th>
                                    <td>
                                        {offer["amount"]} ₽
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Годовой процент
                                    </th>
                                    <td>
                                        {offer["interestRate"]} %
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Срок
                                    </th>
                                    <td>
                                        {offer["durationDays"]} дней
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Статус
                                    </th>
                                    <td>
                                        {humanize(offer["status"])}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Время создания
                                    </th>
                                    <td>
                                        {offer["createdTimestamp"]}
                                    </td>
                                </tr>
                            </table>
                        </Col>
                        <Col sm={2}>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-evenly my-3">
                        {
                            ((authUserId === offer["lender"]["userId"]) || authUserStaff) ?
                            <button onClick={deleteFn} className="w-25 btn btn-outline-danger">
                                Удалить
                            </button> :
                            ""
                        }
                        {
                            (authUserId === offer["lender"]["userId"]) ?
                            <button onClick={() => setEditing(true)} className="w-25 btn btn-outline-primary">
                                Редактировать
                            </button> :
                            ""
                        }
                    </Row>
                    <Row className="my-1">
                        <button onClick={() => setOpen(!open)} className="btn btn-outline text-primary">
                            Раскрыть/свернуть информацию о пользователе
                        </button>
                        <hr></hr>
                    </Row>
                    <Collapse in={open} className="mb-2">
                        <div>
                            <UserDetail id={offer["lender"]["userId"]} readOnly={true}/>
                        </div>
                    </Collapse>
                    {
                        (offer["status"] === "matched") ?
                        <Row className="mt-5">
                            <div className="d-flex justify-content-center">
                                <p>
                                    Подобранные запросы будут приведены снизу.
                                </p>
                            </div>
                            <MatchDetail id={props.id} userId={offer["lender"]["userId"]} deleteCallback={() => setLoading(true)}/>
                        </Row> :
                        ""
                    }   
                </Container>)
            }
        </Container>
    );
}

export default OfferDetail;