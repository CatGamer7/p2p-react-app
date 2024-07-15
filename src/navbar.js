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
                    <NavDropdown title="Предложения" id="OffersDropdown" className="bigger-font">
                        <NavDropdown.Item>
                            <Link to="/offer">Все предложения</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/offer/edit">Новое предложение</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Col>
                <Col className="d-flex justify-content-center" >
                    <NavDropdown title="Запросы" id="RequestsDropdown" className="bigger-font">
                        <NavDropdown.Item>
                            <Link to="/request">Все запросы</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/request/edit">Новый запрос</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Col>
                <Col className="d-flex justify-content-center">
                    <NavDropdown title="Пользователи" id="UsersDropdown" className="bigger-font">
                        <NavDropdown.Item>
                            <Link to="/user">Все пользователи</Link>
                        </NavDropdown.Item>
                        {
                            (props.login === null) ?
                            (<NavDropdown.Item>
                                <Link to="/user/edit">Новый пользователь</Link>
                            </NavDropdown.Item>) :
                            ""
                        }
                    </NavDropdown>
                </Col>
                <Col className="d-flex justify-content-center">
                    {
                        (props.login === null) ?
                        (
                            <div className="d-flex justify-content-evenly bigger-font w-100">
                                <NavLink to="/user/edit" className="py-2">Регистрация</NavLink>
                                <NavLink to="/login" className="py-2">Вход</NavLink>
                            </div>
                        ) :
                        (
                            <div className="d-flex justify-content-evenly bigger-font w-100">
                                <NavLink to={"/user/" + props.login} className="py-2">Мой профиль</NavLink>
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