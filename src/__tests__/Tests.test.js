/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {AppDispatcher} from '../../src/main/js/app/AppDispatcher'
import {App} from '../../src/main/js/app/App'

const assert = require('assert')

class Tests extends TestCase {
  setUp() {
    let node = {'nodeType': 1}
    this.__APP = new App('CounterApplication', new AppDispatcher())
  }

}

runTest(Tests)
