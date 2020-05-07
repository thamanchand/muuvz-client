import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import Modal from '../../../shared/Modal'

const UnsavedDataModal = ({ show, onClose, confirmClose }) => (
  <Modal
    openModel={show}
    modelToggle={onClose}
    className="modal-dialog--danger"
    color="danger"
    title="Unsaved data"
    header
  >
    <Row>
      <Col md={12} sm={12}>
        <p className="delete__modal__label">Do you really want to close?</p>
        <div className="delete__confirmation">
          <span
            role="presentation"
            className="cancel__button"
            onClick={onClose}
          > Cancel</span>
          <button
            className="square btn btn-danger btn-sm rounded"
            type="submit"
            onClick={confirmClose}
          >
            Confirm
          </button>
        </div>
      </Col>
    </Row>
  </Modal>
)

UnsavedDataModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  confirmClose: PropTypes.func,
}
export default UnsavedDataModal;
