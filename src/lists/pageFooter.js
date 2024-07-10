import Row from 'react-bootstrap/Row';

const PageFooter = (props) => {
    return (
        <Row className="d-flex justify-content-evenly">
            {
                !props.pageFirst ?
                (
                    <button onClick={ props.clickPrev } className="w-25">
                        {props.pageNumber}
                    </button>
                ) :
                ""
            }
            <button className="w-25 no-pointer">
                <strong>{props.pageNumber + 1}</strong>
            </button>
            {
                !props.pageLast ?
                (
                    <button onClick={ props.clickNext } className="w-25">
                        {props.pageNumber + 2}
                    </button>
                ) :
                ""
            }
        </Row>
    );
}

export default PageFooter;