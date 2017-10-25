'use strict'

const Lab = require('lab')

// Test files must require the lab module, and export a test script
const lab = (exports.lab = Lab.script())

// shortcuts to functions from lab
const experiment = lab.experiment
const test = lab.test

experiment('getting started with hapi testing using lab,', { parallel: true }, () => {
  test.skip('lab considers this test as TOOD and skips it')

  test('always succeeding :)', done => {
    done()
  })
})
