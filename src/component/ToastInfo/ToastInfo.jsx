import React, { useRef, useEffect } from 'react';
import './ToastInfo.scss';
import { useSelector, useDispatch } from 'react-redux';

// Icon
import check from '../../icon/check-thin.svg';

const ToastInfo = () => {
  const elem = useRef(null);
  const toast = useSelector(state => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    // Otomatis sembunyikan toast info setelah 3 detik
    const hideToast = setTimeout(() => {
      elem.current.style.animation = 'fadeDown .2s forwards';
    }, 3000);

    // Setelah animasi fade down selesai ubah status active-nya menjadi false
    const clearToast = setTimeout(() => {
      dispatch({type: 'HIDE_TOAST'});
    }, 3200);

    return () => {
      clearTimeout(hideToast);
      clearTimeout(clearToast);
    };
  });

  if (!toast.active) {
    return null;
  }
  return (
    <div className="toast-info" ref={elem}>
      <img src={check} alt="success" />
      <div className="message">{toast.message}</div>
      <div className="close"
        onClick={() => {
          elem.current.style.animation = 'fadeDown .2s forwards';
          setTimeout(() => {
            dispatch({type: 'HIDE_TOAST'});
          }, 200);
        }}>×</div>
    </div>
  )
}

export default ToastInfo;