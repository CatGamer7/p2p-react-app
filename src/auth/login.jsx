import baseApiUrl from '../globals/importVars';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {Buffer} from 'buffer';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);

    const navigation = useNavigate();

    const loadUser = () => {
        const filters = [
            {
                "column": "email",
                "operator": "=",
                "operands": [
                    email
                ]
            }
        ]
        
        const authHeader = "Basic " + Buffer.from(email + ":" + password).toString('base64');

        fetch(
            baseApiUrl + "/user",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                },
                body: JSON.stringify(filters)
            })
            .then((res) => res.json())
            .then((data) => {
                if (("content" in data) && (data["content"].length > 0)) {
                    localStorage.setItem("authHeader", authHeader);
                    localStorage.setItem("userId", data["content"][0]["userId"]);
                    localStorage.setItem("staff", data["content"][0]["staff"]);

                    navigation("/");
                    navigation(0);  //Disgusting, but it refreshes navbar
                }
                else {
                    setInvalid(true)
                }
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    navigation("/no-connection");
                }
            })
    }

    useEffect(
        () => {},
        [invalid]
    )

    return (
        <Container className="d-flex justify-content-center">
            <Container fluid className="border rounded border-secondary border-3">
                <Row className="my-2">
                    <Col sm={4}>
                    </Col>
                    <Col sm={2}>
                        <label htmlFor="email">Email</label>
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
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col sm={4}>
                    </Col>
                    <Col sm={2}>
                        <label htmlFor="passwordDigest">Password</label>
                    </Col>
                    <Col sm={2}>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            name="passwordDigest" 
                            id="passwordDigest" 
                            type="password" 
                        >
                        </input>
                    </Col>
                    <Col sm={4}>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <button onClick={loadUser} className="w-25 my-2 btn btn-outline-success">
                        Submit
                    </button>
                </Row>
                {
                    invalid ?
                    <Row className="d-flex justify-content-center my-5">
                        <div className="w-75 border border-danger border-3 display-6 text-center p-2">
                            Invalid email or password.
                        </div>
                    </Row> :
                    ""
                }
            </Container>
        </Container>
    );
}

export default LoginForm;