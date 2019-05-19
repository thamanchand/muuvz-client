import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import classNames from 'classnames';

class ModalComponent extends PureComponent {
  static defaultProps = {
    title: '',
    colored: false,
    header: false,
  };

  constructor() {
    super();
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle () {
    this.setState(prevState => ({ modal: !prevState.modal }));
  }

  render() {
    const { color, title, colored, header, children, md } = this.props;

    let Icon;

    switch (color) {
      case 'primary':
        Icon = <span className="lnr lnr-pushpin modal__title-icon" />;
        break;
      case 'success':
        Icon = <span className="lnr lnr-thumbs-up modal__title-icon" />;
        break;
      case 'warning':
        Icon = <span className="lnr lnr-flag modal__title-icon" />;
        break;
      case 'danger':
        Icon = <span className="lnr lnr-cross-circle modal__title-icon" />;
        break;
      default:
        break;
    }
    const modalClass = md ? classNames({
      'modal-dialog--colored': colored,
      'modal-dialog--header': header,
    }): classNames({
      'modal-dialog--colored': colored,
      'modal-dialog--header-confirm': header});

    return (
      <div>
        <Modal
          isOpen={this.props.openModel}
          toggle={this.props.closePriceModal || this.props.modelToggle }
          className={`modal-dialog--${color} ${modalClass}`}
        >
          <div className="modal__header">
            <button
              className="lnr lnr-cross modal__close-btn"
              type="button"
              onClick={this.props.modelToggle}  />
            {header ? '' : Icon}
            <h4 className="bold-text  modal__title">{title}</h4>
          </div>
          <div className="modal__body">
            {children}
          </div>

          <span
            role="button"
            tabIndex={0}
            onKeyPress={this.props.modelToggle}
            className="form__form-group-label addEditModal__footer-cancel"
            onClick={this.props.closePriceModal || this.props.modelToggle}
          >Cancel</span>
        </Modal>
      </div>
    );
  }
};

ModalComponent.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string,
  colored: PropTypes.bool,
  header: PropTypes.bool,
  children: PropTypes.node.isRequired,
  md: PropTypes.bool,
  closePriceModal: PropTypes.func,
  modelToggle: PropTypes.func,
  openModel: PropTypes.bool,
};

export default ModalComponent;
