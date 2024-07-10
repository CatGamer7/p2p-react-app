import OfferLi from './offerLi';
import PageFooter from '../pageFooter';
import baseApiUrl from '../../globals/importVars';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';

const OfferList = () => {
    const [offers, setOffers] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageLast, setpageLast] = useState(true);
    const [pageFirst, setpageFirst] = useState(true);
    const [loading, setLoading] = useState(true);

    const load = async (page) => {
        await fetch(baseApiUrl + "/offer?page=" + page)
        .then((res) => res.json())
        .then((data) => {
            setOffers(data["content"]);
            setPageNumber(data["pageable"]["pageNumber"]);
            setpageLast(data["last"])
            setpageFirst(data["first"])
            setLoading(false);
        })
    };

    useEffect(() => {
        load(pageNumber);
    }, [pageNumber]);

    const header = (
        <Row className="border rounded mb-3">
            <Col sm={2}>
                <p className="fw-bold">
                    Offer ID
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Amount, ₽
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Interest rate, %
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Status
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Duration, days
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Created at
                </p>
            </Col>
        </Row>
    );

    return (
        <Container className="d-flex justify-content-center">
            <Container fluid className="border rounded">
                {header}
                {
                    loading ?
                    <Spinner animation="border" variant="primary" /> :
                    offers.map((o) => <OfferLi offer = {o} />)
                }
                <PageFooter 
                    pageNumber = {pageNumber}
                    pageFirst = {pageFirst}
                    pageLast = {pageLast}
                    clickPrev = {() => {setPageNumber(pageNumber - 1)}}
                    clickNext = {() => {setPageNumber(pageNumber + 1)}}
                />
            </Container>
        </Container>
    );
}

export default OfferList;