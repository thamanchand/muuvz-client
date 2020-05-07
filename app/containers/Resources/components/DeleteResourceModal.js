import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import Modal from '../../../shared/Modal'

const DeleteResourceModal = ({ show, onClose, deleteResourceAction }) => (
  <Modal
    openModel={show}
    modelToggle={onClose}
    className="modal-dialog--danger"
    color="danger"
    title="Please confirm"
    header
  >
    <Row>
      <Col md={12} sm={12}>
        <p className="delete__modal__label">Are you sure you want to delete this resource?</p>
        <div className="delete__confirmation">
          <span
            role="presentation"
            className="cancel__button"
            onClick={onClose}
          > Cancel</span>
          <button
            className="square btn btn-danger btn-sm rounded"
            type="submit"
            onClick={deleteResourceAction}
          >
            Delete resource
          </button>
        </div>
      </Col>
    </Row>
  </Modal>
)

DeleteResourceModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  deleteResourceAction: PropTypes.func,
}
export default DeleteResourceModal;
