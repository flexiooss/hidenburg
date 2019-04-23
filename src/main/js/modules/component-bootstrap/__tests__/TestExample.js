/* global runTest */
import {TestCase} from 'code-altimeter-js'

const assert = require('assert')

class TestExample extends TestCase {
  static beforeClass() {
    console.log('Shutdown your phone : the test begins')
  }

  static afterClass() {
    console.log('You can take your normal life')
  }

  testFirstThink() {
    assert.ok(true, 'Test should pass if you don\'t touch this method')
  }

  testSecondThink() {
    assert.doesNotThrow(() => {
        throw Error('Learn more : https://github.com/flexiooss/code-altimeter-js')
      },
      'Ah ah !!!')
  }

  setUp() {
    console.log('Sir yes Sir !!!')
  }

  tearDown() {
    console.log('So short !!!')
  }
}

runTest(TestExample)
