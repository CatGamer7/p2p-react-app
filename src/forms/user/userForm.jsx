import baseApiUrl from '../../globals/importVars';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const UserForm = (props) => {
    const [name, setName] = useState(props.user ? props.user["name"] : 0);
    const [email, setEmail] = useState(props.user ? props.user["email"] : 0);
    const [passwordDigest, setPasswordDigest] = useState(props.user ? props.user["passwordDigest"] : 0);

    const navigate = useNavigate();

    var userId = null;
    var staff = false;
    var active = true;
    
    if (props.user) {
        userId = props.user["userId"] ? props.user["userId"] : null;
        staff = props.user["staff"] ? props.user["staff"] : null;
        active = props.user["active"] ? props.user["active"] : null;
    }

    const send = async () => {
        await fetch(
            baseApiUrl + "/user", 
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(packValues())
            })
        .then((res) => res.json())
        .then((data) => navigate("/user/" + data["userId"]));

        if (props.callback) {
            props.callback();
        }
    };

    const packValues = () => {
        return {
            "userId": userId,
            "name": name,
            "email": email,
            "passwordDigest": passwordDigest,
            "staff": staff,
            "active": active
        }
    }

    return (
        <Container className="d-flex justify-content-center">
            <Container fluid className="border rounded">
                <Row>
                    <Col>
                        <label htmlFor="name">Name</label>
                    </Col>
                    <Col>
                        <input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            name="name" 
                            id="name" 
                            type="text" 
                        >
                        </input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label htmlFor="email">Email</label>
                    </Col>
                    <Col>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            name="email" 
                            id="email" 
                            type="text" 
                        >
                        </input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label htmlFor="passwordDigest">Password</label>
                    </Col>
                    <Col>
                        <input 
                            value={passwordDigest} 
                            onChange={(e) => setPasswordDigest(e.target.value)} 
                            name="passwordDigest" 
                            id="passwordDigest" 
                            type="text" 
                        >
                        </input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={send}>
                            Submit
                        </button>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default UserForm;