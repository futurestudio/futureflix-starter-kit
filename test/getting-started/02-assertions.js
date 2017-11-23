'use strict'

const Lab = require('lab')
const Code = require('code')

// Test files must require the lab module, and export a test script
const lab = (exports.lab = Lab.script())

// shortcuts from lab
const experiment = lab.experiment
const test = lab.test

// shortcuts from code
const expect = Code.expect

experiment('hapi testing with lab and assertions with code,', () => {
  test('assert that 1 + 2 equals three', done => {
    expect(1 + 2).to.equal(3)
    expect('3').to.equal('3')
    expect('3').to.not.equal(3)

    done()
  })

  test('assert different data types', done => {
    expect(true).to.be.a.boolean()
    expect(true)
      .to.be.a.boolean()
      .and.to.not.equal(false)

    expect('this is a string').to.startsWith('this')

    done()
  })
})
