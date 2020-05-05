import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import ClockOutlineIcon from 'mdi-react/ClockOutlineIcon';
import EventIcon from 'mdi-react/EventIcon';

import moment from 'moment';
import { Col } from 'reactstrap';

import Error from '../ErrorField';
// import renderDateTimePickerField from '../DateTimePicker/index';
import renderDatePickerField from '../Datepicker';
import renderTimePickerFied from '../TimePicker';

const humanizeDuration = require('humanize-duration')


// import renderCheckBoxField from '../Checkbox/index';

// custom hook for getting previous value
// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

const Search = ({ onSearch, disabled, storedValues }) => {
  const [duration, setDuration] = React.useState();
  const [bookingStartDateTime, setBookingStartDateTime] = React.useState();
  const [bookingEndDateTime, setBookingEndDateTime] = React.useState();
  const [isStartDateTimeGreater, setIsStartDateTimeGreater] = React.useState(false);

  // const prevBookingStartDateTime = usePrevious(bookingStartDateTime);
  // const prevBookingEndDateTime = usePrevious(bookingEndDateTime);
  //

  // const endDateChange = (endDateTime) => {
  //   setBookingEndDateTime(moment(moment(endDateTime)).format('YYYY-MM-DDTHH:mm:ss'));
  //   setIsStartDateTimeGreater(moment(bookingStartDateTime).isAfter(bookingEndDateTime));
  //
  //   // calculate number of hours
  //   const bookingHours = moment
  //     .duration(moment(endDateTime, 'YYYY-MM-DDTHH:mm:ss')
  //       .diff(moment(prevBookingStartDateTime, 'YYYY-MM-DDTHH:mm:ss.SSS'))
  //     ).asHours();
  //   setDuration(bookingHours);
  // }
  // const startDateChange = (startDateTime) => {
  //   setBookingStartDateTime(moment(moment(startDateTime)).format('YYYY-MM-DDTHH:mm:ss'));
  //   setIsStartDateTimeGreater(moment(bookingStartDateTime).isAfter(bookingEndDateTime));
  //   // calculate number of hours
  //   const bookingHours = moment
  //     .duration(moment(moment, 'YYYY-MM-DDTHH:mm:ss')
  //       .diff(moment(prevBookingEndDateTime, 'YYYY-MM-DDTHH:mm:ss'))
  //     ).asHours();
  //   setDuration(bookingHours);
  // }
  //
  const startDateChanged = (startDate) => {
    setBookingStartDateTime(moment(moment(startDate)).format('YYYY-MM-DD'));
  }

  const endDateChanged = (endDate) => {
    setBookingEndDateTime(moment(moment(endDate)).format('YYYY-MM-DD'));
  }

  const endTimeChanged = (endTime) => {
    // format End Time
    const formatEndTime = moment(endTime).format('HH:mm');
    // combined EndDate with endTime
    const combinedWithEndDate = moment(`${moment(bookingEndDateTime).format('YYYY-MM-DD')}${formatEndTime}`, 'YYYY-MM-DDTHH:mm:ss');
    setBookingEndDateTime(moment(combinedWithEndDate).format('YYYY-MM-DDTHH:mm'));
    // check if startDateTime is greater than endDateTime
    setIsStartDateTimeGreater(moment(bookingStartDateTime).isAfter(bookingEndDateTime));

    // calculate number of hours
    const bookingHours = moment(bookingEndDateTime)
      .diff(moment(bookingStartDateTime, 'YYYY-MM-DDTHH:mm'));
    setDuration(bookingHours);
  }

  const startTimeChanged = (startTime) => {
    // format startTime HH:mm
    const formatStartTime = moment(startTime).format('HH:mm');
    // combined startDate with startTime
    const combinedWithStartDate = moment(`${moment(bookingStartDateTime).format('YYYY-MM-DD')}${formatStartTime}`, 'YYYY-MM-DDTHH:mm');
    setBookingStartDateTime(moment(combinedWithStartDate).format('YYYY-MM-DDTHH:mm'));
    setIsStartDateTimeGreater(moment(bookingStartDateTime).isAfter(bookingEndDateTime));

    // calculate number of hours
    const bookingHours = moment(bookingEndDateTime)
      .diff(moment(bookingStartDateTime, 'YYYY-MM-DDTHH:mm'));
    setDuration(bookingHours);
  }

  return (
    <Form
      validate={values => { // validate both passowrds are same
        const errors = {};
        if (!values.location) {
          errors.location = 'Location is required';
        }
        if (!values.pickupDate) {
          errors.pickupDate = 'Pick up date is required';
        }
        if (!values.pickupTime) {
          errors.pickupTime = 'Pikup time is required';
        }
        if (!values.dropOffDate) {
          errors.dropOffDate = 'Drop off date is required';
        }
        if (!values.dropOffTime) {
          errors.dropOffTime = 'Drop off time is required';
        }
        return errors
      }}
      onSubmit={(values) => onSearch(values)}
      initialValues={storedValues}
      render={({ handleSubmit, values }) => (
        <form className="form" onSubmit={handleSubmit}>
          <Col className="col-lg-12 col-md-12 col-sm-12 col-12 startdatepicker__col">
            <div className="form__form-group">
              <span className="form__form-group-label">City</span>
              <div className="form__form-group-field">
                <Field
                  name="location"
                  component="input"
                  type="text"
                  placeholder="Helsinki"
                  required
                  disabled={!disabled}
                />
              </div>
              <Error name="location" />
            </div>
          </Col>
          {/* <div className="form__form-group">
            <div className="form__form-group-field">
              <Field
                name="dropAtPickUpLocation"
                component={renderCheckBoxField}
                color="#646777"
                className="checkbox-btn  checkbox-btn--colored"
                label="Drop-off at pickup location"
                disabled={!disabled}
              />
            </div>
          </div> */}
          <Col className="col-lg-6 col-md-12 col-sm-12 col-12 startdatepicker__col">
            <div className="form__form-group">
              <span className="form__form-group-label">Pickup date</span>
              <div className="form__form-group-field">
                <Field
                  name="pickupDate"
                  component={renderDatePickerField}
                  disabled={!disabled}
                  startDateChanged={(startDate) => startDateChanged(startDate)}
                  className="search__field_input"
                />
                <div className="form__form-group-icon">
                  <EventIcon />
                </div>
              </div>
              <Error name="pickupDate" />
            </div>
          </Col>
          <Col className="col-lg-6 col-md-12  col-sm-12 col-12 startdatepicker__col startimepicker__col">
            <div className="form__form-group form-pickuptime">
              <span className="form__form-group-label">Pickup time</span>
              <div className="form__form-group-field">
                <Field
                  name="pickupTime"
                  component={renderTimePickerFied}
                  disabled={!disabled}
                  startTimeChanged={(startTime) => startTimeChanged(startTime)}
                  className="search__field_input"
                  source="main"
                />
                <div className="form__form-group-icon">
                  <ClockOutlineIcon />
                </div>
              </div>
              <Error name="pickupTime" />
            </div>
          </Col>
          <Col className="col-lg-6 col-md-12  col-sm-12 col-12 startdatepicker__col">
            <div className="form__form-group">
              <span className="form__form-group-label">Drop-off date</span>
              <div className="form__form-group-field">
                <Field
                  name="dropOffDate"
                  component={renderDatePickerField}
                  disabled={!disabled}
                  endDateChanged={(endDate) => endDateChanged(endDate)}
                />
                <div className="form__form-group-icon">
                  <EventIcon />
                </div>
              </div>
              <Error name="dropOffDate" />
            </div>
          </Col>
          <Col className="col-lg-6 col-md-12  col-sm-12 col-12 startdatepicker__col startimepicker__col">
            <div className="form__form-group form-pickuptime">
              <span className="form__form-group-label">Drop-off time</span>
              <div className="form__form-group-field">
                <Field
                  name="dropOffTime"
                  component={renderTimePickerFied}
                  disabled={!disabled}
                  endTimeChanged={(endTime) => endTimeChanged(endTime)}
                  className="search__field_input"
                  source="main"
                />
                <div className="form__form-group-icon">
                  <ClockOutlineIcon />
                </div>
              </div>
              <Error name="dropOffTime" />
            </div>
          </Col>
          <div className="form__form-group">
            {isStartDateTimeGreater && (
              <div className="search__error">
                Please select date, hour and minute
              </div>
            )
            }
            {duration < '7200000' && (
              <div className="search__error">
                You can not book less than 2 hrs
              </div>
            )}
            <p className="booking__duration">
              {values.dropOffTime && values.pickupTime && (
                humanizeDuration(duration,  { language: 'fi' })
              )}
            </p>
            <div className="form__form-group-field">
              <button
                className="rounded btn btn-success"
                type="button"
                onClick={() => handleSubmit(values)}
                disabled={!disabled}
                storedValues={storedValues}
              >
                SEARCH VANS
              </button>
            </div>
          </div>
        </form>
      )}
    />
  )
};

Search.propTypes = {
  onSearch: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  storedValues: PropTypes.object,
};


export default Search;
