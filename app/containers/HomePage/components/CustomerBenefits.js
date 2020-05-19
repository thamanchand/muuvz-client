import React from 'react';
import Swiper from 'swiper';

import 'swiper/css/swiper.min.css'
import 'aos/dist/aos.css';

import search from '../../../assets/images/landing/search.png';
import compare from '../../../assets/images/landing/compare.png';
import book from '../../../assets/images/landing/book.png';

class CusotmerBenefits extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
      swipeActiveIndex: 0,
    };

  }

  componentDidMount(){
    this.swiper = new Swiper('.swiper-container',
      {}
    )
  }

  changeSwiper = (slideIndex) => {
    this.swiper=new Swiper('.swiper-container',{
    })
    // Locks the swipe to next by default
    this.swiper.slideTo(slideIndex);

    this.setState({swipeActiveIndex: slideIndex });
  }

  render() {
    const { swipeActiveIndex } = this.state;
    return (
      <section className="section bg-light">
        <div className="container">
          <div className="section-heading text-center">
            <h3 className="landing__header-title benefits__header_margin">For van seeker</h3>
            <span className="header__border" />
          </div>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <h4 className="landing__feature-caption">Book van in no time... just in 3 steps.</h4>

              <ol id="sw-nav-tools" className="nav nav-process nav-circle nav-justified mt-5">
                <li className={swipeActiveIndex === 0 ? "nav-item active" : "nav-item" }>
                  <span
                    role="presentation"
                    className="nav-link"
                    data-step="1"
                    onClick={() => this.changeSwiper(0)}
                  >
                    <small className="nav__process-label absolute">Search</small>
                  </span>
                </li>
                <li className={swipeActiveIndex === 1 ? "nav-item active" : "nav-item"}>
                  <span
                    role="presentation"
                    className="nav-link"
                    data-step="2"
                    onClick={() => this.changeSwiper(1)}
                  >
                    <small className="nav__process-label absolute">Compare</small>
                  </span>
                </li>
                <li className={swipeActiveIndex === 2 ? "nav-item active" : "nav-item"}>
                  <span
                    role="presentation"
                    className="nav-link"
                    data-step="3"
                    onClick={() => this.changeSwiper(2)}
                  >
                    <small className="nav__process-label absolute">Book</small>
                  </span>
                </li>

              </ol>
            </div>
            <div className="col-lg-7 ml-lg-auto">
              <div className="browser shadow mt-4 mt-md-0" data-aos="fade-left">
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide"><img src={search} alt="" className="img-responsive" /></div>
                    <div className="swiper-slide"><img src={compare} alt="" className="img-responsive" /></div>
                    <div className="swiper-slide"><img src={book}  alt="" className="img-responsive" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default CusotmerBenefits;
