import baseApiUrl from '../../globals/importVars';
import UserForm from '../../forms/user/userForm';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthFetch from '../../utils/authFetch';

const UserDetail = (props) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    
    const navigate = useNavigate();
    const authFetch = useAuthFetch();

    const readOnly = props.readOnly
    const authUserId = localStorage.getItem("userId");
    const authUserStaff = localStorage.getItem("staff") === "true";

    const load = async (id) => {
        await authFetch(baseApiUrl + "/user/" + id, {method: 'GET'})
        .then((data) => {
            setUser(data);
            setLoading(false);
        })
        .catch(error => {
            if (error instanceof TypeError) {
                navigate("/no-connection");
            }
        });
    };

    const deleteFn = async () => {
        await authFetch(baseApiUrl + "/user/" + props.id, {method: 'DELETE'})

        navigate("/user");
    };

    useEffect(() => {
        load(props.id);
    }, [props.id, editing, loading]);

    return (
        editing ?
        <UserForm user={user} callback={() => {setEditing(false)}}/> :

        <Container className="d-flex justify-content-center">
            {
                loading ?
                <Spinner animation="border" variant="primary" /> :
                (<Container fluid className="border rounded border border-secondary border-3">
                    <Row className="mt-2">
                        <Col sm={2}>
                        </Col>
                        <Col sm={8}>
                            <table className="table table-bordered">
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <td>
                                        {user["userId"]}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Имя
                                    </th>
                                    <td>
                                        {user["name"]}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Почта
                                    </th>
                                    <td>
                                        {user["email"]}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Время создания
                                    </th>
                                    <td>
                                        {user["createdTimestamp"]}
                                    </td>
                                </tr>
                            </table>
                        </Col>
                        <Col sm={2}>
                        </Col>
                    </Row>
                    {
                        readOnly ? 
                        "" :
                        <Row className="d-flex justify-content-evenly my-3">
                            {
                                ((authUserId === props.id) || authUserStaff) ?
                                <button onClick={deleteFn} className="w-25 btn btn-outline-danger">
                                    Удалить
                                </button> :
                                ""
                            }
                            {
                                (authUserId === props.id) ?
                                <button onClick={() => setEditing(true)} className="w-25 btn btn-outline-primary">
                                    Редактировать
                                </button> :
                                ""
                            }
                        </Row>
                    }
                </Container>)
            }
        </Container>
    );
}

export default UserDetail;