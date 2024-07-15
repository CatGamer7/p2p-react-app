import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"

const Footer = () => {
    return (
        <Container fluid className="bottom-footer bg-secondary">
            <Row className="d-flex justify-content-center">
                Конец.
            </Row>
            <Row className="d-flex justify-content-center">
                some.contact@email.net
            </Row>
        </Container>
    )
};

export default Footer;