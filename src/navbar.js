import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom';
import Logout from './auth/logout';

const Navbar = () => (
    <Nav className="mb-3 border border-primary border-3">
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">
                    <NavDropdown title="Offers" id="OffersDropdown" className="bigger-font">
                        <NavDropdown.Item>
                            <Link to="/offer">All offers</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/offer/edit">New offer</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Col>
                <Col className="d-flex justify-content-center" >
                    <NavDropdown title="Requests" id="RequestsDropdown" className="bigger-font">
                        <NavDropdown.Item>
                            <Link to="/request">All requests</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/request/edit">New request</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Col>
                <Col className="d-flex justify-content-center">
                    <NavDropdown title="Users" id="UsersDropdown" className="bigger-font">
                        <NavDropdown.Item>
                            <Link to="/user">All users</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/user/edit">New user</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Col>
                <Col className="d-flex justify-content-center">
                    {
                        (localStorage.getItem("authHeader") === null) ?
                        (
                            <div className="d-flex justify-content-evenly">
                                <Link to="/user/edit">Register</Link>
                                <Link to="/login">Login</Link>
                            </div>
                        ) :
                        (
                            <div className="d-flex justify-content-evenly">
                                <Link to={"/user/" + localStorage.getItem("userId")}>My page</Link>
                                <Logout />
                            </div>
                        )
                    }
                </Col>
            </Row>
        </Container>
    </Nav>
);

export default Navbar;