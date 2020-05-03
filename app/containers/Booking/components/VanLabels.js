import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import moment from 'moment';

const { uuid } = require('uuidv4');

export function useMedia(query) {
  const [matches, setMatches] = useState(
    window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query]);

  return matches;
}

const EventLabels = ({ resourceList, currentBookings, acceptBookingHandler, cancelBookingHandler }) => {

  // for small devices
  const isMaxWidth = useMedia("(max-width: 1386px)");
  const isMinWidth = useMedia("(max-width: 1200px)");
  const isMinWidthLess = useMedia("(min-width: 1199px)");

  return (
    <Col md={12} lg={12} xl={4}>
      <Card className="card--not-full-height">
        <CardBody className="currentbooking__label">
          <div className="card__title">
            <h5 className="bold-text">Current booking</h5>
          </div>
          {currentBookings && currentBookings.length ? (
            currentBookings && currentBookings.map(currentBookingItem => (
              <>
                <p key={uuid()}>
                  <span className="calendar-label" style={{backgroundColor: currentBookingItem.resource.color}} />
                  {currentBookingItem.resource.brand} ( {moment(currentBookingItem.bookedStartDateTime).format('HH:mm')} - {moment(currentBookingItem.bookedEndDateTime).format('HH:mm')})
                </p>
                <div className="booking__label" style={{borderLeft: `${'2px solid'} ${currentBookingItem.resource.color}`}} >
                  {currentBookingItem.resource.status ==='Requested' && (
                    <>
                      <span className="booking__label_status">REQUESTED</span>
                      {(isMaxWidth || isMinWidth) && isMinWidthLess ?
                        (
                          <div className="booking__label_status-break">
                            <span
                              role="presentation"
                              className="booking__action"
                              onClick={() => acceptBookingHandler(currentBookingItem.id, currentBookingItem.resource.id)}
                            > ACCEPT
                            </span>
                            <span
                              role="presentation"
                              className="booking__action"
                              onClick={() => cancelBookingHandler(currentBookingItem.id, currentBookingItem.resource.id)}
                            > CANCEL
                            </span>
                            <div className="booking__user_info">
                              <div className="resources__icon_list">
                                <span>
                                  <span className="lnr lnr-user booking__user__icon" />
                                  <span className="booking__user">{currentBookingItem.profile.businessName}</span>
                                </span>
                              </div>
                            </div>
                            <div className="booking__user_info">
                              <div className="resources__icon_list">
                                <span>
                                  <i className="lnr lnr-phone-handset booking__user__icon" />
                                  <span className="">{currentBookingItem.profile.phoneNumber}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                        ) : (
                          <>

                            <span
                              role="presentation"
                              className="booking__action"
                              onClick={() => acceptBookingHandler(currentBookingItem.id, currentBookingItem.resource.id)}
                            > ACCEPT
                            </span>
                            <span
                              role="presentation"
                              className="booking__action"
                              onClick={() => cancelBookingHandler(currentBookingItem.id, currentBookingItem.resource.id)}
                            > CANCEL
                            </span>
                            <div className="booking__user_info">
                              <div className="resources__icon_list">
                                <span>
                                  <span className="lnr lnr-user booking__user__icon" />
                                  <span className="booking__user">{currentBookingItem.profile.businessName}</span>
                                </span>
                              </div>
                            </div>
                            <div className="booking__user_info">
                              <div className="resources__icon_list">
                                <span>
                                  <i className="lnr lnr-phone-handset booking__user__icon" />
                                  <span className="">{currentBookingItem.profile.phoneNumber}</span>
                                </span>
                              </div>
                            </div>
                          </>
                        )
                      }
                    </>
                  )}
                  {currentBookingItem.resource.status ==='Booked' && (
                    <>
                      <span className="booking__label_status">BOOKED</span>
                        <div className="booking__user_info">
                          <div className="resources__icon_list">
                            <span>
                              <span className="lnr lnr-user booking__user__icon" />
                              <span className="booking__user">{currentBookingItem.profile.businessName}</span>
                            </span>
                          </div>
                        </div>
                        <div className="booking__user_info">
                          <div className="resources__icon_list">
                            <span>
                              <i className="lnr lnr-phone-handset booking__user__icon" />
                              <span className="">{currentBookingItem.profile.phoneNumber}</span>
                            </span>
                          </div>
                        </div>
                    </>
                  )}
                  {currentBookingItem.resource.status ==='Inuse' && (
                    <>
                      <span className="booking__label_status">IN USE</span>
                        <div className="booking__user_info">
                          <div className="resources__icon_list">
                            <span>
                              <span className="lnr lnr-user booking__user__icon" />
                              <span className="booking__user">{currentBookingItem.profile.businessName}</span>
                            </span>
                          </div>
                        </div>
                        <div className="booking__user_info">
                          <div className="resources__icon_list">
                            <span>
                              <i className="lnr lnr-phone-handset booking__user__icon" />
                              <span className="">{currentBookingItem.profile.phoneNumber}</span>
                            </span>
                          </div>
                        </div>
                    </>
                  )}

                  {currentBookingItem.resource.status ==='Cancelled' && (
                    <>
                      <span className="booking__label_status">CANCELLED</span>
                        <div className="booking__user_info">
                          <div className="resources__icon_list">
                            <span>
                              <span className="lnr lnr-user booking__user__icon" />
                              <span className="booking__user">{currentBookingItem.profile.businessName}</span>
                            </span>
                          </div>
                        </div>
                        <div className="booking__user_info">
                          <div className="resources__icon_list">
                            <span>
                              <i className="lnr lnr-phone-handset booking__user__icon" />
                              <span className="">{currentBookingItem.profile.phoneNumber}</span>
                            </span>
                          </div>
                        </div>
                    </>
                  )}
                </div>
              </>
            ))
          ) : (
            <p>No booking yet!</p>
          )}
        </CardBody>
      </Card>
      <Card className="card--not-full-height">
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">Your vans</h5>
          </div>
          {resourceList && resourceList.map(resource => (
            <p key={uuid()}>
              <span className="calendar-label" style={{backgroundColor: resource.color}} />
              {resource.brand} ({resource.model})
            </p>
          ))}

        </CardBody>
      </Card>
    </Col>
  )
}

EventLabels.propTypes = {
  resourceList: PropTypes.array,
  currentBookings: PropTypes.array,
  acceptBookingHandler: PropTypes.func,
  cancelBookingHandler: PropTypes.func,
}
export default EventLabels;
