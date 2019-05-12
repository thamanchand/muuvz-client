import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'reactstrap';
import classNames from 'classnames';

export default class ModalComponent extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    color: PropTypes.string.isRequired,
    colored: PropTypes.bool,
    header: PropTypes.bool,
    btn: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

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

  toggle() {
    this.setState(prevState => ({ modal: !prevState.modal }));
  }

  render() {
    const {
      color, btn, title, colored, header, children
    } = this.props;
    const { modal } = this.state;
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
    const modalClass = classNames({
      'modal-dialog--colored': colored,
      'modal-dialog--header': header,
    });

    return (
      <div>
        <Button color={color} onClick={this.toggle}>{btn}</Button>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className={`modal-dialog--${color} ${modalClass}`}
        >
          <div className="modal__header">
            <button className="lnr lnr-cross modal__close-btn" type="button" onClick={this.toggle} />
            {header ? '' : Icon}
            <h4 className="bold-text  modal__title">{title}</h4>
          </div>
          <div className="modal__body">
            {children}
          </div>

          <span
            role="button"
            tabIndex={0}
            onKeyPress={this.toggle}
            className="form__form-group-label addEditModal__footer-cancel"
            onClick={this.toggle}
          >Cancel</span>
        </Modal>
      </div>
    );
  }
}
