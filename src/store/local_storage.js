import { getDate } from './libs';

export const getLocalStorage = (key) => (
  JSON.parse(localStorage.getItem(key)) || null
)

export const updateLocalStorage = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value))
)

export const initLocalStorage = () => {
  // Membuat format tanggal '20210806'
  const tempDate = getDate();
  localStorage.setItem('tempDate', JSON.stringify(tempDate));
}