'use strict'

const errorExtractor = (error) => {
  let errors = {}

  error.data.details.forEach((err) => {
    const errorKey = err.path
    errors[ errorKey ] = {
      message: err.message.replace(/"/g, '')
    }
  })

  return errors
}

module.exports = errorExtractor
