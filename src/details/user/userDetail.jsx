import baseApiUrl from '../../globals/importVars';
import UserForm from '../../forms/user/userForm';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const UserDetail = (props) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    const load = async (id) => {
        await fetch(baseApiUrl + "/user/" + id)
        .then((res) => res.json())
        .then((data) => {
            setUser(data);
            setLoading(false);
        });
    };

    const deleteFn = async () => {
        await fetch(baseApiUrl + "/user/" + props.id, {method: 'DELETE'})

        navigate("/user");
    };

    useEffect(() => {
        load(props.id);
    }, [props.id, editing]);

    return (
        editing ?
        <UserForm user={user} callback={() => {setEditing(false)}}/> :

        <Container className="d-flex justify-content-center">
            {
                loading ?
                <Spinner animation="border" variant="primary" /> :
                (<Container fluid className="border rounded">
                    <Row>
                        <table className="table table-bordered table-striped">
                            <tr>
                                <th>
                                    User ID
                                </th>
                                <td>
                                    {user["userId"]}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <td>
                                    {user["name"]}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    email
                                </th>
                                <td>
                                    {user["email"]}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Created timestamp
                                </th>
                                <td>
                                    {user["createdTimestamp"]}
                                </td>
                            </tr>
                        </table>
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

export default UserDetail;