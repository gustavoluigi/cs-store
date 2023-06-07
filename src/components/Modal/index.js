import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { HiOutlineX } from 'react-icons/hi';
import { CloseModal, Container, Overlay } from './styles';

function Modal({
  children, isOpen, onClickClose, modalStyles,
}) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container style={modalStyles}>
        <CloseModal>
          <HiOutlineX onClick={onClickClose} />
        </CloseModal>

        {children}
      </Container>
    </Overlay>,

    document.getElementById('modal-root'),
  );
}

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
  onClickClose: PropTypes.func.isRequired,
  modalStyles: PropTypes.shape(),
};

Modal.defaultProps = {
  modalStyles: {},
};
