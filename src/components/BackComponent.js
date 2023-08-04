import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackComponent = () => {
  return (
    <Row className='mb-2'>
        <Col>
            <Link to="/">
                <Button color='dark'>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                </Button>
            </Link>
        </Col>
    </Row>
  )
}

export default BackComponent;