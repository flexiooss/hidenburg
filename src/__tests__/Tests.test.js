/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {ComponentSeverities} from '../index'
import {AppDispatcher} from '../../src/main/js/app/AppDispatcher'
import {App} from '../../src/main/js/app/App'
import {ActionCreateSeverityPayloadBuilder} from '../generated/io/flexio/component_severities/actions/ActionCreateSeverityPayload'
import {ActionDeleteSeverityPayloadBuilder} from '../generated/io/flexio/component_severities/actions/ActionDeleteSeverityPayload'
import {isNumber} from 'flexio-jshelpers'

const assert = require('assert')

class Tests extends TestCase {
  setUp() {
    let node = {'nodeType': 1}
    this.__APP = new App('CounterApplication', new AppDispatcher())
    this.__component = new ComponentSeverities(this.__APP.addComponentContext(), node)
  }

  testCreateAndDeleteElement() {
    let actionCreate = new ActionCreateSeverityPayloadBuilder().label('Maximale').build()

    // Check store empty
    let data = this.__component.getPublicStore().data()
    assert.strictEqual(data.length, 0)

    this.__component.getActionCreate().dispatch(actionCreate)

    // Check store item
    data = this.__component.getPublicStore().data()
    assert.strictEqual(data.length, 1)
    assert.strictEqual(data.get(0).name(), 'Maximale')
    assert.notStrictEqual(data.get(0).id(), null)
    assert.strictEqual(isNumber(parseInt(data.get(0).id())), true)

    // Check deletion
    let actionDelete = new ActionDeleteSeverityPayloadBuilder().id(data.get(0).id()).build()

    this.__component.getActionDelete().dispatch(actionDelete)
    data = this.__component.getPublicStore().data()
    assert.strictEqual(data.length, 0)
  }

  testCreateMultipleSeverities() {
    let action1 = new ActionCreateSeverityPayloadBuilder().label('Maximale').build()
    let action2 = new ActionCreateSeverityPayloadBuilder().label('Minimale').build()
    let action3 = new ActionCreateSeverityPayloadBuilder().label('Limitée').build()

    this.__component.getActionCreate().dispatch(action1)
    this.__component.getActionCreate().dispatch(action2)
    this.__component.getActionCreate().dispatch(action3)

    let data = this.__component.getPublicStore().data()
    assert.strictEqual(data.length, 3)
  }
}

runTest(Tests)
