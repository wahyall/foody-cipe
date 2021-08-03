import React from 'react';
import './ConfirmModal.scss';

const ConfirmModal = (props) => {
  return (
    <div className={"confirm-modal" + (props.isOpenConfirm ? " active" : "")}>
      <div className="modal">
        <div className="modal-header">
          <div className="title">{props.title}</div>
          <div className="close"
            onClick={props.onClose}>×</div>
        </div>
        <div className="modal-body">
          <div className="message">{props.message}</div>
        </div>
        <div className="modal-footer">
          <div className="btn"
            onClick={props.onCancel}>{props.cancelCopy}</div>
          <div className="confirm btn"
            onClick={props.onConfirm}>{props.confirmCopy}</div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal;