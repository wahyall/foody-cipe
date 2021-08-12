import { getThisDate } from './common';

// Local Storage
export const getLocalStorage = (key) => (
  JSON.parse(localStorage.getItem(key)) || null
)

export const postLocalStorage = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value))
)

export const initLocalStorage = () => {
  // Membuat format tanggal '20210806'
  const tempDate = getThisDate();
  localStorage.setItem('temp_date', tempDate);
}

// Session Storage
export const getSessionStorage = (key) => (
  JSON.parse(sessionStorage.getItem(key)) || null
)

export const postSessionStorage = (key, value) => (
  sessionStorage.setItem(key, JSON.stringify(value))
)