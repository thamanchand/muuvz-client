import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap';
import Icon from 'react-icons-kit';

import {ic_euro_symbol as euroSymbol} from 'react-icons-kit/md/ic_euro_symbol'
import ClipLoader from "react-spinners/ClipLoader";

import StarOutlineIcon from 'mdi-react/StarOutlineIcon';
import MapMarkerIcon from 'mdi-react/MapMarkerIcon';
import HeartOutlineIcon from 'mdi-react/HeartOutlineIcon';
import CheckCircleOutlineIcon from 'mdi-react/CheckCircleOutlineIcon';

// import { formatNumber } from '../../utils';
import GalleySlideshow from '../../../shared/GalleySlideshow';

const { uuid } = require('uuidv4');

const iconStyles = {
  fontFamily: 'flaticon',
  fontStyle: 'normal',
  color: '#70C1B3'
};

const VanListing = ({ vanList, bookingHandler, isSearchLoading, isBooked }) => (
  <div className="listing__wrapper">
    <Container>
      <Row>
        <section className="vanlist">
          <div className="van__content">
            <div className="van__loading">
              <ClipLoader
                size={120}
                color="#70C1B3"
                loading={isSearchLoading}
              />
            </div>
            {vanList && vanList.map(item => (
              <div className="row mb-3">
                <div className="col-md-12">
                  <div className="van__card">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="slideshow">
                          <GalleySlideshow input={item.cover} ratio="3:2" mode="manual" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="list-title">
                          <ul className="list-inline list-unstyled">
                            <li className="list-inline-item">
                              <div className="resource__name">
                                <span>{item.brand}</span><span> ({item.model})</span>
                              </div>
                            </li>
                            <li className="list-inline-item text-warning resource__star_icon">
                              <StarOutlineIcon size="20" color="#ff4861" />
                            </li>
                            <li className="list-inline-item text-success">
                              <i className="fa fa-thumbs-up"></i>
                            </li>
                          </ul>
                        </div>
                        <div className="resource__location">
                          <MapMarkerIcon size="20" color="#ff4861" />
                          <span>{item.profile && item.profile.address}</span>
                        </div>
                        <div className="resources__icon_list">
                          <span>
                            <i className="flaticon-049-gasoline" style={iconStyles}></i>
                            <span className="resource__icon">{item.fueltype}</span>
                          </span>
                          <span>
                            <i className="flaticon-001-gear" style={iconStyles}></i>
                            <span className="resource__icon">{item.transmission}</span>
                          </span>
                          <span>
                            <i className="flaticon-044-manometer" style={iconStyles}></i>
                            <span className="resource__icon">{item.mileage}</span>
                          </span>
                        </div>
                        <div>
                          <ul className="list list--icon">
                            {item.cruisecontrol && (
                              <li className="list__item">
                                <span className="resource__true_feature_icon">
                                  <CheckCircleOutlineIcon size="15" color="#ff4861" />
                                </span>
                                <span className="resource__true_feature_label">
                                  Cruise control
                                </span>
                              </li>
                            )}
                            {item.airbag && (
                              <li className="list__item">
                                <span className="resource__true_feature_icon">
                                  <CheckCircleOutlineIcon size="15" color="#ff4861" />
                                </span>
                                <span className="resource__true_feature_label">Airbag</span>
                              </li>
                            )}
                            {item.airconditioner && (
                              <li className="list__item">
                                <span className="resource__true_feature_icon">
                                  <CheckCircleOutlineIcon size="15" color="#ff4861" />
                                </span>
                                <span className="resource__true_feature_label">Airconditioner</span>
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="resource__feature">
                          <p className="description">{item.features}</p>
                        </div>
                      </div>
                      <div className="col-md-3 border-left">
                        <div className="pricing__content">
                          <span className="price__icon"><Icon icon={euroSymbol} size={25} /></span>
                          {item.pricing && item.pricing.map((cost) => (
                            <span className="price-large" key={uuid()}>
                              {cost.price}
                            </span>
                          ))}
                          <span className="hr-small">/hr</span>
                          <div>
                            <button
                              type="button"
                              className="rounded btn btn-danger book__van"
                              onClick={() => bookingHandler(item.id, item.address)}
                              disabled={isBooked}
                            >BOOK VAN
                            </button>
                          </div>
                          <div className="resource_favourite">
                            <HeartOutlineIcon size="20" color="#ff4861" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
  bookingHandler: PropTypes.func,
  isSearchLoading: PropTypes.bool,
  isBooked: PropTypes.bool,
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
    }).isRequired,
  ),
}

export default VanListing;
