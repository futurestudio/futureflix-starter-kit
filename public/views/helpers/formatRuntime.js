'use strict'

module.exports = (runtime, options) => {
  if (!runtime || !runtime > 0) {
    return ''
  }

  const minutes = runtime % 60
  const hours = Math.floor(runtime / 60)

  return `${hours}h ${minutes}min`
}
