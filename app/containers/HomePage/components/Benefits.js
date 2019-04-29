import React from 'react';

import './styles.scss';

const MuverzBenefits = () => (
  <section className="services pt-60 pb-60" id="services">
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="section-title text-center mb-60">
            <h2 className="landing__section-title">Our services</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <div className="single_service service_right">
            <img
              src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-1.png"
              alt=""
            />
            <h3>Online Reservations</h3>
            <p className="benefits">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="single_service service_right">
            <img
              src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-2.png"
              alt=""
            />
            <h3>Popular Dishes</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="single_service service_right">
            <img
              src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-3.png"
              alt=""
            />
            <h3>Online Order</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 text-center">
          <div className="single_mid">
            <img
              src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/service_mid.png"
              alt=""
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="single_service">
            <img
              src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-4.png"
              alt=""
            />
            <h3>24/7 Service</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="single_service">
            <img
              src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-5.png"
              alt=""
            />
            <h3>Candle Light Dinner</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="single_service">
            <img
              src="http://infinityflamesoft.com/html/restarunt-preview/assets/img/services/service-6.png"
              alt=""
            />
            <h3>Special Local Foods</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MuverzBenefits;
