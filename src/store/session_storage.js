export const getSessionStorage = (key) => (
  JSON.parse(sessionStorage.getItem(key)) || null
)

export const postSessionStorage = (key, value) => (
  sessionStorage.setItem(key, JSON.stringify(value))
)