import React from 'react';
import './ConfirmModal.scss';

const ConfirmModal = (props) => {
  return (
    <main className={"confirm-modal" + (props.isOpenConfirm ? " active" : "")}>
      <div className="modal">
        <section className="modal-header">
          <span className="title">{props.title}</span>
          <span className="close"
            onClick={props.onClose}>×</span>
        </section>
        <section className="modal-body">
          <p className="message">{props.message}</p>
        </section>
        <section className="modal-footer">
          <button className="btn"
            onClick={props.onCancel}>{props.cancelCopy}</button>
          <button className="confirm btn"
            onClick={props.onConfirm}>{props.confirmCopy}</button>
        </section>
      </div>
    </main>
  )
}

export default ConfirmModal;