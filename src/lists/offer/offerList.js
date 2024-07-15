import OfferLi from './offerLi';
import PageFooter from '../pageFooter';
import baseApiUrl from '../../globals/importVars';
import Spinner from 'react-bootstrap/Spinner';
import Collapse from 'react-bootstrap/Collapse';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthFetch from '../../utils/authFetch';
import usePostFilters from '../../utils/filterPost';

const OfferList = () => {
    const [offers, setOffers] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageLast, setpageLast] = useState(true);
    const [pageFirst, setpageFirst] = useState(true);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const [searchId, setSearchId] = useState("");
    const [searchAmount, setSearchAmount] = useState("");
    const [searchInterestRate, setSearchInterestRate] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchDurationDays, setSearchDurationDays] = useState("");
    const [searchCreatedTimestamp, setSearchCreatedTimestamp] = useState("");

    const navigation = useNavigate();
    const authFetch = useAuthFetch();
    const postFilters = usePostFilters();

    const load = async (page) => {
        const filters = extractFilterList()

        if (filters.length < 1) {
            await authFetch(baseApiUrl + "/offer?page=" + page, {method: 'GET'})
            .then((data) => {
                setOffers(data["content"]);
                setPageNumber(data["pageable"]["pageNumber"]);
                setpageLast(data["last"])
                setpageFirst(data["first"])
                setLoading(false);
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    navigation("/no-connection");
                }
            })
        }
        else {
            await postFilters(baseApiUrl + "/offer?page=" + page, filters)
            .then((data) => {
                if ("content" in data) {
                    setOffers(data["content"]);
                    setPageNumber(data["pageable"]["pageNumber"]);
                    setpageLast(data["last"])
                    setpageFirst(data["first"])
                    setLoading(false);
                }
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    navigation("/no-connection");
                }
            })
        }
    };

    const makeFilter = (column, value) => {
        var trimmed = value.trim();

        if (trimmed) {
            var operator = "";
            var operand = "";
            
            if ([">=", "<="].includes(trimmed.substring(0, 2))) {
                operator = trimmed.substring(0, 2);
                operand = trimmed.substring(2).trim();
            }
            else if (trimmed.substring(0, 1) === "=") {
                operator = trimmed.substring(0, 1);
                operand = trimmed.substring(1).trim();
            }

            if (operand) {
                return {
                    "column": column,
                    "operator": operator,
                    "operands": [operand]
                };
            }
        }
    }

    const extractFilterList = () => {
        var out = [];
        var possibleFilter = {};
        
        possibleFilter = makeFilter("offerId", searchId);
        if (possibleFilter) {
            out.push(possibleFilter);
        }
            
        possibleFilter = makeFilter("amount", searchAmount);
        if (possibleFilter) {
            out.push(possibleFilter);
        }

        possibleFilter = makeFilter("interestRate", searchInterestRate);
        if (possibleFilter) {
            out.push(possibleFilter);
        }
        
        possibleFilter = makeFilter("status", searchStatus);
        if (possibleFilter) {
            out.push(possibleFilter);
        }

        possibleFilter = makeFilter("durationDays", searchDurationDays);
        if (possibleFilter) {
            out.push(possibleFilter);
        }
        
        possibleFilter = makeFilter("createdTimestamp", searchCreatedTimestamp);
        if (possibleFilter) {
            out.push(possibleFilter);
        }

        return out;
    }

    const reset = () => { 
        setSearchId("");
        setSearchAmount("");
        setSearchInterestRate("");
        setSearchStatus("");
        setSearchDurationDays("");
        setSearchCreatedTimestamp("");

        load(pageNumber);
    }

    useEffect(() => {
        load(pageNumber);
    }, [pageNumber]);

    const header = (
        <Row className="border rounded mb-3">
            <Col sm={2}>
                <p className="fw-bold">
                    ID
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Сумма, ₽
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Процент, %
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Статус
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Продолжительность, дней
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Время создания
                </p>
            </Col>
        </Row>
    );

    const filterPanel = (
        <Row>
            <Col sm={2}>
                <input 
                    value={searchId} 
                    onChange={(e) => setSearchId(e.target.value)} 
                    name="offerId" 
                    id="offerId" 
                    type="text"
                    placeholder="(>=/<=/=)(операнда)"
                >
                </input>
            </Col>
            <Col sm={2}>
                <input 
                    value={searchAmount} 
                    onChange={(e) => setSearchAmount(e.target.value)} 
                    name="amount" 
                    id="amount" 
                    type="text"
                    placeholder="(>=/<=/=)(операнда)"
                >
                </input>
            </Col>
            <Col sm={2}>
                <input 
                    value={searchInterestRate} 
                    onChange={(e) => setSearchInterestRate(e.target.value)} 
                    name="interestRate" 
                    id="interestRate" 
                    type="text"
                    placeholder="(>=/<=/=)(операнда)"
                >
                </input>
            </Col>
            <Col sm={2}>
                <input 
                    value={searchStatus} 
                    onChange={(e) => setSearchStatus(e.target.value)} 
                    name="status" 
                    id="status" 
                    type="text"
                    placeholder="(>=/<=/=)(операнда)"
                >
                </input>
            </Col>
            <Col sm={2}>
                <input 
                    value={searchDurationDays} 
                    onChange={(e) => setSearchDurationDays(e.target.value)} 
                    name="durationDays" 
                    id="durationDays" 
                    type="text"
                    placeholder="(>=/<=/=)(операнда)"
                >
                </input>
            </Col>
            <Col sm={2}>
                <input 
                    value={searchCreatedTimestamp} 
                    onChange={(e) => setSearchCreatedTimestamp(e.target.value)} 
                    name="createdTimestamp" 
                    id="createdTimestamp" 
                    type="text"
                    disabled
                >
                </input>
            </Col>
        </Row>
    )

    const controls = (
        <Row className="d-flex justify-content-evenly my-3">
            <button onClick={() => load(pageNumber)} className="w-25 btn btn-outline-success">
                Применить
            </button>
            <button onClick={reset} className="w-25 btn btn-outline-danger">
                Сбросить
            </button>
            <hr className="mt-3"/>
        </Row>
    )

    return (
        <Container className="d-flex justify-content-center">
            <Container fluid className="border rounded border-secondary border-3">
                {header}
                <Row className="my-1">
                    <button onClick={() => setOpen(!open)} className="btn btn-outline text-primary">
                        Раскрыть/свернуть фильтры
                    </button>
                    <hr></hr>
                </Row>
                <Collapse in={open}>
                    <div>
                        {filterPanel}
                        {controls}
                    </div>
                </Collapse>
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