/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {AppDispatcher} from '../../src/main/js/app/AppDispatcher'
import {App} from '../../src/main/js/app/App'
import {ComponentSelect, ComponentSelectConfig} from "..";
import {StoreTest} from "./StoreTest/StoreTest";

const assert = require('assert')

class Tests extends TestCase {
  setUp() {
    let node = {'nodeType': 1}
    this.__APP = new App('TestHidenburg', new AppDispatcher())
    let cc = this.__APP.addComponentContext()
    this.__store = new StoreTest(cc)
    let config = new ComponentSelectConfig().withParentNode(node).withComponentContext(cc).withProxyStore(this.__store.getStorePublic())
    this.select = new ComponentSelect(config)
  }

  testAddElements() {

  }

}

runTest(Tests)
