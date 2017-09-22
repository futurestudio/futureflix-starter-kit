'use strict'

const _ = require('lodash')

/**
 *
 */
module.exports = videoURL => {
  // check if video URL is already a YouTube embed
  if (_.includes(videoURL, 'youtube.com/embed')) {
    return videoURL
  }

  // if video is from YouTube, creat the embed
  if (_.includes(videoURL, 'youtube.com')) {
    const videoID = videoURL.match(
      /(^|=|\/)([0-9A-Za-z_-]{11})(\/|&|$|\?|#)/
    )[2]
    return `https://youtube.com/embed/${videoID}`
  }

  // fallback, return the URL as is
  return videoURL
}
