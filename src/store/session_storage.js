export const getSessionStorage = (key) => (
  JSON.parse(sessionStorage.getItem(key))
)

export const updateSessionStorage = (key, value) => (
  sessionStorage.setItem(key, JSON.stringify(value))
)
