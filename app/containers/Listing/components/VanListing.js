import React from 'react';
import {
  Card, CardBody, ButtonToolbar,
} from 'reactstrap';
import HeartIcon from 'mdi-react/HeartIcon';
import StarIcon from 'mdi-react/StarIcon';
import StarOutlineIcon from 'mdi-react/StarOutlineIcon';
import { Link } from 'react-router-dom';
import VanGallery from './VanGallery';
import images from './imgs';

const VanListing = () => (
  <div className="listing__wrapper">
    <Card>
      <CardBody>
        <div className="van-card">
          <VanGallery images={images} />
          <div className="van-card__info">
            <h3 className="van-card__title">French bulldog pillow</h3>
            <div className="van-card__rate">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarOutlineIcon />
              <a className="van-card__link" href="/easydev/e-commerce/van_page">See all reviews</a>
            </div>
            <h3 className="van-card__price">€17.19/hr </h3>
            <form className="form van-card__form">
              <ButtonToolbar className="van-card__btn-toolbar">
                <Link className="btn btn-primary" to="/e-commerce/cart">Add to cart</Link>
                <button className="van-card__wish-btn" type="button"><HeartIcon />Add to favourite</button>
              </ButtonToolbar>
            </form>
          </div>
        </div>

        <div className="van-card">
          <VanGallery images={images} />
          <div className="van-card__info">
            <h3 className="van-card__title">French bulldog pillow</h3>
            <div className="van-card__rate">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarOutlineIcon />
              <a className="van-card__link" href="/easydev/e-commerce/van_page">See all reviews</a>
            </div>
            <h3 className="van-card__price">€17.19/hr </h3>
            <form className="form van-card__form">
              <ButtonToolbar className="van-card__btn-toolbar">
                <Link className="btn btn-primary" to="/e-commerce/cart">Add to cart</Link>
                <button className="van-card__wish-btn" type="button"><HeartIcon />Add to favourite</button>
              </ButtonToolbar>
            </form>
          </div>
        </div>

        <div className="van-card">
          <VanGallery images={images} />
          <div className="van-card__info">
            <h3 className="van-card__title">French bulldog pillow</h3>
            <div className="van-card__rate">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarOutlineIcon />
              <a className="van-card__link" href="/easydev/e-commerce/van_page">See all reviews</a>
            </div>
            <h3 className="van-card__price">€17.19/hr </h3>
            <form className="form van-card__form">
              <ButtonToolbar className="van-card__btn-toolbar">
                <Link className="btn btn-primary" to="/e-commerce/cart">Add to cart</Link>
                <button className="van-card__wish-btn" type="button"><HeartIcon />Add to favourite</button>
              </ButtonToolbar>
            </form>
          </div>
        </div>
      </CardBody>
    </Card>
  </div>
);

export default VanListing;
