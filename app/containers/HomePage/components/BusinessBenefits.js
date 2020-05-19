

import React from 'react';
import AOS from 'aos';

import 'swiper/css/swiper.min.css'
import 'aos/dist/aos.css';

import booking from '../../../assets/images/landing/booking.svg';
import calendar from '../../../assets/images/landing/calendar.svg';
import resources from '../../../assets/images/landing/resources.svg';

class BusinessBenefits extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
      swipeActiveIndex: 0,
    };
  }

  componentDidMount(){
    AOS.init({
      // initialise with other settings
      duration : 2000
    });
  }

  changeSlide = (slideIndex) => {
    this.setState({swipeActiveIndex: slideIndex });
  }

  render() {
    const { swipeActiveIndex } = this.state;
    return (
      <section className="section bg-gray">
        <div className="container">
          <div className="section-heading text-center">
            <h3 className="landing__header-title benefits__header_margin">For Van owner</h3>
          </div>
          <nav className="slide nav nav-tabs nav-outlined nav-rounded justify-content-around justify-content-md-center mb-5">
            <span
              type="button"
              role="presentation"
              className="nav-item nav-link active"
              onClick={() => this.changeSlide(0)}
            >
              Booking

            </span>
            <span
              type="button"
              role="presentation"
              className="nav-item nav-link"
              onClick={() => this.changeSlide(1)}
            >
              Calendar
            </span>
            <span
              type="button"
              role="presentation"
              className="nav-item nav-link"
              onClick={() => this.changeSlide(2)}
            >
              Vans
            </span>
          </nav>
          <div className="tab-content">
            <div className={swipeActiveIndex === 0 ? "tab-pane fade show active" : "tab-pane fade"}>
              <div className="row gap-y align-items-center">
                <div className="col-md-6 mr-md-auto">
                  <div className="browser shadow" data-aos="fade-right">
                    <img src={booking} className="img-responsive" alt="" />
                  </div>
                </div>
                <div className="col-md-5">
                  <h3 className="landing__header-title">Booking</h3>
                  <p className="landing__feature-value">When buying Dashcore you will get right in your hand a powerful tool to boost your design. You will get not just a template but a complete ready-to-use HTML code snippets to start right away with your project.</p>
                </div>
              </div>
            </div>
            <div className={swipeActiveIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
              <div className="row gap-y align-items-center">
                <div className="col-md-6 mr-md-auto">
                  <div className="browser shadow" data-aos="fade-right">
                    <img src={calendar} className="img-responsive" alt="" />
                  </div>
                </div>
                <div className="col-md-5">
                  <h3 className="landing__header-title">Calendar</h3>
                  <p className="landing__feature-value">When buying Dashcore you will get right in your hand a powerful tool to boost your design. You will get not just a template but a complete ready-to-use HTML code snippets to start right away with your project.</p>
                </div>
              </div>
            </div>
            <div className={swipeActiveIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
              <div className="row gap-y align-items-center">
                <div className="col-md-6 mr-md-auto">
                  <div className="browser shadow mt-4 mt-md-0 aos-init aos-animate" data-aos="fade-right">
                    <img src={resources}  alt="" className="img-responsive"/>
                  </div>
                </div>
                <div className="col-md-5">
                  <h3 className="landing__header-title">Resources</h3>
                  <p className="landing__feature-caption">Calendar plugin included and beautified</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias atque cum, delectus dicta doloribus enim fuga hic itaque modi nobis pariatur porro quasi ratione repellat sint veniam veritatis voluptas voluptates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default BusinessBenefits;
