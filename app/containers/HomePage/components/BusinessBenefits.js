

import React from 'react';
import AOS from 'aos';

import 'swiper/css/swiper.min.css'
import 'aos/dist/aos.css';

import booking from '../../../assets/images/landing/booking.svg';
import calendar from '../../../assets/images/landing/calendar.svg';
import resources from '../../../assets/images/landing/resources.svg';

class BusinessBenefits extends React.Component {

  componentDidMount(){
    AOS.init({
      // initialise with other settings
      duration : 2000
    });
  }

  render() {

    return (
      <section className="section bg-gray">
        <div className="container">
          <div className="section-heading text-center">
            <h3 className="landing__header-title benefits__header_margin">For Van owner</h3>
          </div>
          <nav className="slide nav nav-tabs nav-outlined nav-rounded justify-content-around justify-content-md-center mb-5">
            <a className="nav-item nav-link active" data-toggle="tab" href="#dashboard-tab">
              Booking
            </a>
            <a className="nav-item nav-link" data-toggle="tab" href="#tasks-tab">
              Calendar
            </a>
            <a className="nav-item nav-link" data-toggle="tab" href="#calendar-tab">
              Vans
            </a>
          </nav>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="dashboard-tab">
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
            <div className="tab-pane fade" id="tasks-tab">
              <div className="row gap-y align-items-center">
                <div className="col-md-6 order-md-2 ml-md-auto">
                  <div className="browser shadow" data-aos="fade-left">
                    <img src={calendar}  alt="" className="img-responsive"  />
                  </div>
                </div>
                <div className="col-md-5 mr-md-auto">
                  <h3 className="landing__header-title">Calendar</h3>
                  <p className="landing__feature-caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore maxime numquam perspiciatis saepe totam.</p>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="calendar-tab">
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
