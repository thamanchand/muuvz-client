import React from 'react';
import PropTypes from 'prop-types';
import { Row, ButtonToolbar } from 'reactstrap';

import Modal from '../../../shared/Modal'

const DeleteResourceModal = ({ show, onClose, deleteResourceAction }) => (
  <Modal
    openModel={show}
    modelToggle={onClose}
    className="modal-dialog--danger"
    color="danger"
  >
    <div className="modal__header">
      <h4 className="bold-text  modal__title">Do you want to delete resource?</h4>
    </div>
    <div className="modal__body">
      <p>Deleting resource is irresible</p>
    </div>
    <Row>
      <div className="addEditModal__footer">
        <ButtonToolbar className="form__button-toolbar">
          <button
            className="square btn btn-danger"
            type="submit"
            onClick={deleteResourceAction}
          >
              Delete resource
          </button>
        </ButtonToolbar>
      </div>
    </Row>
  </Modal>
)

DeleteResourceModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  deleteResourceAction: PropTypes.func,
}
export default DeleteResourceModal;
