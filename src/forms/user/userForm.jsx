import baseApiUrl from '../../globals/importVars';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const UserForm = (props) => {
    const [name, setName] = useState(props.user ? props.user["name"] : "");
    const [email, setEmail] = useState(props.user ? props.user["email"] : "");
    const [passwordDigest, setPasswordDigest] = useState(props.user ? props.user["passwordDigest"] : "");

    const [emailInvalid, setEmailInvalid] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [nameEmpty, setNameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

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
        const data = packValues();

        if (!data) {
            return;
        }

        await fetch(
            baseApiUrl + "/user", 
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        .then((res) => res.json())
        .then((data) => {
            if (data["status"] && data["message"].includes("email")) {
                setEmailInvalid(true);
            }
            else if (data["status"]) {
                setEmailEmpty(true);
            }
            else {
                navigate("/user/" + data["userId"])
            }
        });

        if (props.callback) {
            props.callback();
        }
    };

    const packValues = () => {

        setNameEmpty(false);
        setEmailEmpty(false);
        setPasswordEmpty(false);

        if (!name.trim()) {
            setNameEmpty(true);
            return false;
        }
        if (!email.trim()) {
            setEmailEmpty(true);
            return false;
        }
        if (!passwordDigest.trim()) {
            setPasswordEmpty(true);
            return false;
        }

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
            <Container fluid className="border rounded border-secondary border-3">
                <Row className="my-2">
                    <Col sm={4}>
                    </Col>
                    <Col sm={2}>
                        <label htmlFor="name">Имя</label>
                    </Col>
                    <Col sm={2}>
                        <input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            name="name" 
                            id="name" 
                            type="text" 
                        >
                        </input>
                    </Col>
                    <Col sm={4}>
                        {
                            nameEmpty ? 
                            <div className="border border-danger text-center">
                                Имя не может быть пустым.
                            </div> :
                            ""
                        }
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col sm={4}>
                    </Col>
                    <Col sm={2}>
                        <label htmlFor="email">Электронная почта</label>
                    </Col>
                    <Col sm={2}>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            name="email" 
                            id="email" 
                            type="email"
                        >
                        </input>
                    </Col>
                    <Col sm={4}>
                        {
                            emailInvalid ? 
                            <div className="border border-danger text-center">
                                Почта уже используется.
                            </div> :
                            (emailEmpty ?
                                <div className="border border-danger text-center">
                                    Неверный формат почты.
                                </div> :
                                ""
                            )
                        }
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col sm={4}>
                    </Col>
                    <Col sm={2}>
                        <label htmlFor="passwordDigest">Пароль</label>
                    </Col>
                    <Col sm={2}>
                        <input 
                            value={passwordDigest} 
                            onChange={(e) => setPasswordDigest(e.target.value)} 
                            name="passwordDigest" 
                            id="passwordDigest" 
                            type="password" 
                        >
                        </input>
                    </Col>
                    <Col sm={4}>
                        {
                            passwordEmpty ? 
                            <div className="border border-danger text-center">
                                Пароль не может быть пустым.
                            </div> :
                            ""
                        }
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <button onClick={send} className="w-25 my-2 btn btn-outline-success">
                        Отправить
                    </button>
                </Row>
            </Container>
        </Container>
    );
}

export default UserForm;