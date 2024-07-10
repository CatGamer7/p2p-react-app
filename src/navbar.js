import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Nav from 'react-bootstrap/Nav';

const Navbar = () => (
    <Nav>
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Nav.Link href="#">Offers</Nav.Link>
                </Col>
                <Col className="d-flex justify-content-center" >
                    <Nav.Link href="#">Requests</Nav.Link>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Nav.Link href="#">User</Nav.Link>
                </Col>
            </Row>
        </Container>
    </Nav>
);

export default Navbar;