import React from 'react';
import './ConfirmModal.scss';

const ConfirmModal = (props) => {
  return (
    <div className={"confirm-modal" + (props.isOpenConfirm ? " active" : "")}>
      <div className="modal">
        <div className="modal-header">
          <span className="title">{props.title}</span>
          <span className="close"
            onClick={props.onClose}>×</span>
        </div>
        <div className="modal-body">
          <p className="message">{props.message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn"
            onClick={props.onCancel}>{props.cancelCopy}</button>
          <button className="confirm btn"
            onClick={props.onConfirm}>{props.confirmCopy}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal;