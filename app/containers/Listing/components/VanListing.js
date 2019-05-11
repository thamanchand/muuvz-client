import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import Icon from 'react-icons-kit';
import {car} from 'react-icons-kit/fa/car';
import {heartO} from 'react-icons-kit/fa/heartO'

// import VanGallery from './VanGallery';

import vanImage from '../../../assets/images/dummy-list/1.png';

const VanListing = ({ vanList }) => (
  <div className="listing__wrapper">
    <Container>
      <Row>
        <section className="vanlist">
          <div className="van__content">
            {vanList && vanList.map(item => (
              <div className="media">
                <div className="fav-box">
                  <Icon icon={heartO} size={15} />
                </div>
                <img className="d-flex align-self-start" src={vanImage} alt="van1"/>
                <div className="media-body pl-3">
                  <div className="price">{item.brand}<small>{item.model}</small></div>
                  <div className="stats">
                    <span><Icon icon={car} size={15} />{item.licensetype}</span>
                    <span><Icon icon={car} size={15} /> {item.transmission}</span>
                  </div>
                  <div className="address">{item.features}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Row>
    </Container>
  </div>
);

VanListing.propTypes = {
  vanList: PropTypes.object,
};

export default VanListing;
