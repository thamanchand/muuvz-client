import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import Icon from 'react-icons-kit';
import {heartO} from 'react-icons-kit/fa/heartO'
import {ic_euro_symbol as euroSymbol} from 'react-icons-kit/md/ic_euro_symbol'

// import { formatNumber } from '../../utils';

const { uuid } = require('uuidv4');

// import VanGallery from './VanGallery';
const iconStyles = {
  fontFamily: 'flaticon',
  fontStyle: 'normal',
  color: '#70C1B3'
};

const VanListing = ({ vanList }) => (
  <div className="listing__wrapper">
    <Container>
      <Row>
        <section className="vanlist">
          <div className="van__content">
            {vanList && vanList.map(item => (
              <div className="media" key={uuid()}>
                <div className="fav-box">
                  <Icon icon={heartO} size={15} />

                </div>
                <div className="pricing__content">
                  <span className="price__icon"><Icon icon={euroSymbol} size={25} /></span>
                  {item.pricings.map((cost) => (
                    <span className="price-large" key={uuid()}>
                      {cost.price}
                    </span>
                  ))}
                  <span className="hr-small">,hr</span>
                  <button type="button" className="square btn btn-danger">Book</button>
                </div>
                {/* item.vanmedias.map(img => (
                    <img className="d-flex align-self-start" src={img.filename[0.].name} alt={item.brand} />
                  )) */}
                <div className="media-body pl-3">
                  <div className="price">{item.brand}<small>{item.model}</small></div>
                  <div className="stats">
                    <span>
                      <i className="flaticon-049-gasoline" style={iconStyles}></i>
                      {item.fueltype}
                    </span>
                    <span>
                      <i className="flaticon-015-gear" style={iconStyles}></i>
                      {item.transmission}
                    </span>
                    <span>
                      <i className="flaticon-037-wristwatch" style={iconStyles}></i>
                      {item.mileage}
                    </span>
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
  vanList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      createdAt: PropTypes.string,
      brand: PropTypes.string,
      cruisecontrol: PropTypes.bool,
      exteriordimensions: PropTypes.string,
      features: PropTypes.bool,
      fueltype: PropTypes.string,
      interiordimensions: PropTypes.string,
      licensetype: PropTypes.string,
      located: PropTypes.string,
      mileage: PropTypes.number,
      model: PropTypes.string,
      passengernum: PropTypes.string,
      transmission: PropTypes.string,
      year: PropTypes.string,
      pricings: PropTypes.shape({
        id: PropTypes.number,
        unit: PropTypes.number,
        price: PropTypes.number,
        resource: PropTypes.number,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
      })
    }).isRequired
  ),
}

export default VanListing;
