'use strict'

module.exports = runtime => {
  if (!hasRuntime(runtime)) {
    return ''
  }

  if (runtime <= 60) {
    return `${runtime}min`
  }

  const minutes = runtime % 60
  const hours = Math.floor(runtime / 60)

  return `${hours}h ${minutes}min`
}

function hasRuntime (runtime) {
  return runtime && runtime > 0
}
