export const validateQuery = (object: { [key: string]: any }) => {
  for (const key in object) {
    if (object.hasOwnProperty(key) && !object[key]) {
      delete object[key]
    }
  }
  return object
}
