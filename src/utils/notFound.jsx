import Container from "react-bootstrap/esm/Container"

const NotFound = () => {
    return (
        <Container fluid className="d-flex justify-content-center my-5">
            <div className="w-75 border border-danger border-3 display-6 text-center p-2">
                Could not find the resource.
            </div>
        </Container>
    )
}

export default NotFound;