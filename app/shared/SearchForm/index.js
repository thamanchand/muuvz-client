import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import ClockOutlineIcon from 'mdi-react/ClockOutlineIcon';
import EventIcon from 'mdi-react/EventIcon';
import { FormattedMessage } from 'react-intl';

import moment from 'moment';
import { Col } from 'reactstrap';

import { SegmentedControl } from 'segmented-control-react';

import Error from '../ErrorField';
// import renderDateTimePickerField from '../DateTimePicker/index';
import renderDatePickerField from '../Datepicker';
// import renderTimePickerFied from '../TimePicker';
import renderTimePickerFied from '../TimePicker';
import messages from './messages';

import '../../assets/styles/scss/component/segmentedcontrol.scss';

const humanizeDuration = require('humanize-duration')


const cities = [
  { name: 'Helsinki' },
  { name: 'Espoo' },
  { name: 'Vantaa' }
];


const Search = ({ onSearch, disabled, storedValues }) => {
  const [dateTimeDuration, setDateTimeDuration] = React.useState(() => ({
    bookingStartDateTime: null,
    bookingEndDateTime: null,
    startTime: null,
    endTime: null,
  }));

  React.useEffect(() => {

  }, [dateTimeDuration]);

  const startDateChanged = (startDate) => {
    if(dateTimeDuration.startTime) {
      setDateTimeDuration(prevState => ({
        ...prevState,
        bookingStartDateTime: `${moment(moment(startDate)).format('YYYY-MM-DD')}${'T'}${dateTimeDuration.startTime}`,
      }))
    } else {
      setDateTimeDuration(prevState => ({
        ...prevState,
        bookingStartDateTime: moment(moment(startDate)).format('YYYY-MM-DD'),
      }));
    }
  }

  const endDateChanged = (endDate) => {
    if(dateTimeDuration.endTime) {
      setDateTimeDuration(prevState => ({
        ...prevState,
        bookingStartDateTime: `${moment(moment(endDate)).format('YYYY-MM-DD')}${'T'}${dateTimeDuration.endTime}`,
      }))
    } else {
      setDateTimeDuration(prevState => ({
        ...prevState,
        bookingEndDateTime: moment(moment(endDate)).format('YYYY-MM-DD'),
      }));
    }
  }

  const endTimeChanged = (endTime) => {
    // format End Time
    const formatEndTime = moment(endTime).format('HH:mm');
    // combined EndDate with endTime
    const combinedWithEndDate = moment(`${moment(dateTimeDuration.bookingEndDateTime).format('YYYY-MM-DD')}${formatEndTime}`, 'YYYY-MM-DDTHH:mm:ss');

    setTimeout(() => {
      setDateTimeDuration(prevState => ({
        ...prevState,
        endTime: formatEndTime,
        bookingEndDateTime: moment(combinedWithEndDate).format('YYYY-MM-DDTHH:mm'),
        setIsStartDateTimeGreater: moment(dateTimeDuration.bookingStartDateTime).isAfter(dateTimeDuration.bookingEndDateTime)
      }))
    }, 500);
  }

  const startTimeChanged = (startTime) => {
    // format startTime HH:mm
    const formatStartTime = moment(startTime).format('HH:mm');
    // combined startDate with startTime
    const combinedWithStartDate = moment(`${moment(dateTimeDuration.bookingStartDateTime).format('YYYY-MM-DD')}${formatStartTime}`, 'YYYY-MM-DDTHH:mm');

    setTimeout(() => {
      setDateTimeDuration(prevState => ({
        ...prevState,
        startTime: formatStartTime,
        bookingStartDateTime: moment(combinedWithStartDate).format('YYYY-MM-DDTHH:mm'),
        setIsStartDateTimeGreater: moment(dateTimeDuration.bookingStartDateTime).isAfter(dateTimeDuration.bookingEndDateTime)
      }))
    }, 500);
  }

  console.log("dateTimeDuration", dateTimeDuration)
  return (
    <Form
      validate={values => { // validate both passowrds are same
        const errors = {};
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
      initialValues={{ location: '0'}}
      render={({ handleSubmit, values }) => (
        <form className="form" onSubmit={handleSubmit}>
          <Col className="col-lg-12 col-md-12 col-sm-12 col-12 startdatepicker__col">
            <div className="form__form-group">
              <span className="form__form-group-label">
                <FormattedMessage {...messages.searchPlace} />
              </span>
              <div className="form__form-group-field">
                <Field name="location">
                  {({ input }) => (
                    <SegmentedControl
                      name={input && input.name}
                      segments={cities}
                      selected={0}
                      variant="base"
                      onChangeSegment={city => input.onChange(city)}
                      clasName="segementedController"
                    />
                  )}
                </Field>
              </div>
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
              <span className="form__form-group-label">
                <FormattedMessage {...messages.searchPickupDate} />
              </span>
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
              <span className="form__form-group-label">
                <FormattedMessage {...messages.searchPickupTime} />
              </span>
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
              <span className="form__form-group-label">
                <FormattedMessage {...messages.searchDropOffDate} />
              </span>
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
              <span className="form__form-group-label">
                <FormattedMessage {...messages.searchDropOffTime} />
              </span>
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
            {dateTimeDuration.isStartDateTimeGreater && (
              <div className="search__error">
                <FormattedMessage {...messages.selectDateTimeNotify} />
              </div>
            )
            }
            {moment(dateTimeDuration.bookingEndDateTime)
              .diff(moment(dateTimeDuration.bookingStartDateTime, 'YYYY-MM-DDTHH:mm')) < '7200000' &&
              moment(dateTimeDuration.bookingEndDateTime)
                .diff(moment(dateTimeDuration.bookingStartDateTime, 'YYYY-MM-DDTHH:mm')) < '7200000' && (
              <div className="search__error">
                <FormattedMessage {...messages.lessThan2HrsNotify} />
              </div>
            )}
            <p className="booking__duration">
              {values.dropOffTime && values.pickupTime && (
                humanizeDuration(moment(dateTimeDuration.bookingEndDateTime)
                  .diff(moment(dateTimeDuration.bookingStartDateTime, 'YYYY-MM-DDTHH:mm')),  { language: 'fi' })
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
                <FormattedMessage {...messages.searchVansBtn} />
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
