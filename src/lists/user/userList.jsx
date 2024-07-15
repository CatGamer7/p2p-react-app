import UserLi from './userLi';
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

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageLast, setpageLast] = useState(true);
    const [pageFirst, setpageFirst] = useState(true);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchActive, setSearchActive] = useState("");
    const [searchCreatedTimestamp, setSearchCreatedTimestamp] = useState("");

    const navigation = useNavigate();
    const authFetch = useAuthFetch();
    const postFilters = usePostFilters();
    
    const load = async (page) => {
        const filters = extractFilterList()

        if (filters.length < 1) {
            await authFetch(baseApiUrl + "/user?page=" + page, {method: 'GET'})
            .then((data) => {
                setUsers(data["content"]);
                setPageNumber(data["pageable"]["pageNumber"]);
                setpageLast(data["last"]);
                setpageFirst(data["first"]);
                setLoading(false);
            })
            .catch(error => {
                if (error instanceof TypeError) {
                    navigation("/no-connection");
                }
            })
        }
        else {
            await postFilters(baseApiUrl + "/user?page=" + page, filters)
            .then((data) => {
                if ("content" in data) {
                    setUsers(data["content"]);
                    setPageNumber(data["pageable"]["pageNumber"]);
                    setpageLast(data["last"]);
                    setpageFirst(data["first"]);
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
        
        possibleFilter = makeFilter("userId", searchId);
        if (possibleFilter) {
            out.push(possibleFilter);
        }
            
        possibleFilter = makeFilter("name", searchName);
        if (possibleFilter) {
            out.push(possibleFilter);
        }

        possibleFilter = makeFilter("email", searchEmail);
        if (possibleFilter) {
            out.push(possibleFilter);
        }
        
        possibleFilter = makeFilter("active", searchActive);
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
        setSearchName("");
        setSearchEmail("");
        setSearchActive("");
        setSearchCreatedTimestamp("");

        load(pageNumber);
    }

    useEffect(() => {
        load(pageNumber);
    }, [pageNumber]);

    const header = (
        <Row className="border rounded">
            <Col sm={2}>
                <p className="fw-bold">
                    User ID
                </p>
            </Col>
            <Col sm={3}>
                <p className="fw-bold">
                    Name
                </p>
            </Col>
            <Col sm={3}>
                <p className="fw-bold">
                    Email
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Is active
                </p>
            </Col>
            <Col sm={2}>
                <p className="fw-bold">
                    Created at
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
                    name="userID" 
                    id="userID" 
                    type="text"
                    placeholder="(>=/<=/=)(operand)"
                >
                </input>
            </Col>
            <Col sm={3}>
                <input 
                    value={searchName} 
                    onChange={(e) => setSearchName(e.target.value)} 
                    name="name" 
                    id="name" 
                    type="text"
                    placeholder="(=)(operand)"
                >
                </input>
            </Col>
            <Col sm={3}>
                <input 
                    value={searchEmail} 
                    onChange={(e) => setSearchEmail(e.target.value)} 
                    name="email" 
                    id="email" 
                    type="text"
                    placeholder="(=)(operand)"
                >
                </input>
            </Col>
            <Col sm={2}>
                <input 
                    value={searchActive} 
                    onChange={(e) => setSearchActive(e.target.value)} 
                    name="active" 
                    id="active" 
                    type="text"
                    placeholder="(=)(operand)"
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
                Apply
            </button>
            <button onClick={reset} className="w-25 btn btn-outline-danger">
                Reset
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
                        Toggle filters
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
                    users.map((u) => <UserLi user = {u} />)
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

export default UserList;