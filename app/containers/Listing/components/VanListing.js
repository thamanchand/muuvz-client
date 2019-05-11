import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import Icon from 'react-icons-kit';
import {car} from 'react-icons-kit/fa/car';
import {heartO} from 'react-icons-kit/fa/heartO'
import {ic_euro_symbol as euroSymbol} from 'react-icons-kit/md/ic_euro_symbol'

// import VanGallery from './VanGallery';

const VanListing = ({ vanList }) => (
  <div className="listing__wrapper">
    <Container>
      <Row>
        <section className="vanlist">
          <div className="van__content">
            {vanList && vanList.map(item => (
              <div className="media" key={item.id}>
                <div className="fav-box">
                  <Icon icon={heartO} size={15} />

                </div>
                <div className="pricing__content">
                  <span className="price__icon"><Icon icon={euroSymbol} size={25} /></span>
                  {item.pricings.map(cost => (
                    <span className="price-large">
                      {cost.price}
                    </span>
                  ))}
                  <span className="hr-small">,hr</span>
                  <button type="button" className="square btn btn-danger">Book</button>
                </div>
                {item.vanmedias.map(img => (
                  <img className="d-flex align-self-start" src={img.filename[0.].name} alt="" />
                ))}
                <div className="media-body pl-3">
                  <div className="price">{item.brand}<small>{item.model}</small></div>
                  <div className="stats">
                    <i className="flaticon-airplane49"></i>
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
  vanList: PropTypes.shape({
    id: PropTypes.string,
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
  }).isRequired,
};

export default VanListing;
