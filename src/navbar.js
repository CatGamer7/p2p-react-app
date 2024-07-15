import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, NavLink } from 'react-router-dom';
import Logout from './auth/logout';

const Navbar = (props) => (
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
                        (props.login === null) ?
                        (
                            <div className="d-flex justify-content-evenly bigger-font w-100">
                                <NavLink to="/user/edit" className="py-2">Register</NavLink>
                                <NavLink to="/login" className="py-2">Login</NavLink>
                            </div>
                        ) :
                        (
                            <div className="d-flex justify-content-evenly bigger-font w-100">
                                <NavLink to={"/user/" + props.login} className="py-2">My page</NavLink>
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