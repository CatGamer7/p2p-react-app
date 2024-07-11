import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom';

const Navbar = () => (
    <Nav>
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">
                    <NavDropdown title="Offers" id="OffersDropdown">
                        <NavDropdown.Item>
                            <Link to="/offer">All offers</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/offer">My offers</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/offer/edit">New offer</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Col>
                <Col className="d-flex justify-content-center" >
                    <NavDropdown title="Requests" id="RequestsDropdown">
                        <NavDropdown.Item>
                            <Link to="/request">All requests</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/request">My requests</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/request/edit">New request</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Col>
                <Col className="d-flex justify-content-center">
                    <NavDropdown title="Users" id="UsersDropdown">
                        <NavDropdown.Item>
                            <Link to="/user">All users</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/user/edit">New user</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Col>
            </Row>
        </Container>
    </Nav>
);

export default Navbar;