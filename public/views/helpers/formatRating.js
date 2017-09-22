'use strict'

module.exports = (rating, options) => {
  return rating ? rating.toFixed(1) : ''
}
