'use strict'

const Lab = require('lab')
const Code = require('code')

// Test files must require the lab module, and export a test script
const lab = (exports.lab = Lab.script())

// shortcuts from lab
const { describe, it } = lab

// shortcuts from code
const expect = Code.expect

describe('hapi testing with lab and assertions with code,', () => {
  it('asserts that 1 + 2 equals three', () => {
    expect(1 + 2).to.equal(3)
    expect('3').to.equal('3')
    expect('3').to.not.equal(3)
  })

  it('asserts different data types', () => {
    expect(true).to.be.a.boolean()
    expect(true)
      .to.be.a.boolean()
      .and.to.not.equal(false)

    expect('this is a string').to.startsWith('this')
  })
})
