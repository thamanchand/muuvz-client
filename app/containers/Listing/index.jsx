import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import VanListing from './components/VanListing';
import Search from '../HomePage/components/Search';

const VanListPage = () => (
  <div className="Listing__page">
    <Container>
      <Row>
        <Col md={3}>
          <div className="van__list-nav">
            <Search />
          </div>
        </Col>
        <Col md={9}>
          <div className="van__list">
            <VanListing />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default VanListPage;
