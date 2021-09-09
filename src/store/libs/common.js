import { getLocalStorage } from './storage';

export const draggableOverflow = (elem) => {
  if (elem.children[0].childElementCount <= 1) {
      return;
  }

  let dragElemPos = {
      top: 0,
      left: 0,
      x: 0,
      y: 0
  };

  const mouseDownHandler = (e) => {
      elem.style.userSelect = 'none';

      dragElemPos = {
        left: elem.scrollLeft,
        top: elem.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = (e) => {
      // How far the mouse has been moved
      const dx = e.clientX - dragElemPos.x;
      const dy = e.clientY - dragElemPos.y;

      // Scroll the element
      elem.scrollTop = dragElemPos.top - dy;
      elem.scrollLeft = dragElemPos.left - dx;
      elem.style.cursor = 'grabbing';
  };

  const mouseUpHandler = () => {
      elem.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      elem.style.cursor = 'grab';
  };

  // Attach the handler
  elem.addEventListener('mousedown', mouseDownHandler);
}

export const getThisDate = () => {
  const currentYear = JSON.stringify(new Date().getUTCFullYear()),
    currentMonth = JSON.stringify(new Date().getUTCMonth() + 1),
    currentDate = JSON.stringify(new Date().getUTCDate());
  
  // Membuat format tanggal '20210806'
  const thisDate = Number(`${currentYear}${currentMonth.length > 1 ? currentMonth : (0 + currentMonth)}${currentDate.length > 1 ? currentDate : (0 + currentDate)}`);

  return thisDate;
}

export const checkIsTomorrow = () => {
  const tempDate = getLocalStorage('temp_date');
  const thisDate = getThisDate();
  
  return thisDate !== tempDate;
}

// Mengubah format angka, misal
// dari 22000 menjadi 22k
export const compactNumber = (value) => {
  const suffixes = ['', 'k', 'm', 'b', 't'];

  const suffixNum = Math.floor(('' + value).length / 3);

  let shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));

  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }

  return shortValue + suffixes[suffixNum];
}