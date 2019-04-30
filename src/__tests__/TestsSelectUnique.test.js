/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {ComponentSelect, ComponentSelectConfig, ItemList} from "..";
import {StoreTest} from "./StoreTest/StoreTest";
import {Dispatcher, HotBalloonApplication} from "hotballoon";
import {Item} from "../generated/io/flexio/component_select/types/Item";
import {ActionSelectItemPayloadBuilder} from "../generated/io/flexio/component_select/actions/ActionSelectItemPayload";

const assert = require('assert')

class TestsSelectUnique extends TestCase {
  setUp() {
    this.__APP = new HotBalloonApplication('TestHidenburg', new Dispatcher())

    let node = {'nodeType': 1}
    let cc = this.__APP.addComponentContext()

    this.__store = new StoreTest(cc)

    let config = new ComponentSelectConfig()
      .withParentNode(node)
      .withComponentContext(cc)
      .withProxyStore(this.__store.getStorePublic())
      .withProperties({multiple: false}) // useless but more verbose

    this.__component = new ComponentSelect(config)
  }

  __setStore(...els) {
    this.__store.getStore().set(
      new ItemList(...els)
    )
  }

  testSelectedItems() {
    this.__setStore(
      new Item('1', 'label', 'value', false, true, false),
      new Item('2', 'plok', 'value', false, true, false)
    )

    assert(this.__component.getSelectedItemsId().length === 0)
    assert(this.__component.getSelectedItems().length === 0)

    this.__setStore(
      new Item('1', 'value', 'label', true, true, false),
      new Item('2', 'plok', 'label', false, true, false)
    )

    assert(this.__component.getSelectedItemsId().length === 1)
    assert(this.__component.getSelectedItemsId()[0] === '1')
    assert(this.__component.getSelectedItems()[0].value() === 'value')
    assert(this.__component.getSelectedItems()[0].label() === 'label')
  }

  testActionSelect() {
    let item1 = new Item('1', 'value1', 'label1', false, true, false)
    let item2 = new Item('2', 'value2', 'label2', false, true, false)
    this.__setStore(item1, item2)

    assert(this.__component.getSelectedItemsId().length === 0)

    // Select item 1
    this.__component.__actionSelect.dispatch(
      new ActionSelectItemPayloadBuilder().item(item1).build()
    )
    assert(this.__component.getSelectedItemsId().length === 1)
    assert(this.__component.getSelectedItemsId()[0] === '1')
    let item = this.__component.getSelectedItems()[0]
    assert(item.id() === '1')
    assert(item.value() === 'value1')
    assert(item.label() === 'label1')

    // Select item 2
    this.__component.__actionSelect.dispatch(
      new ActionSelectItemPayloadBuilder().item(item2).build()
    )
    assert(this.__component.getSelectedItemsId().length === 1)
    assert(this.__component.getSelectedItemsId()[0] === '2')
    item = this.__component.getSelectedItems()[0]
    assert(item.id() === '2')
    assert(item.value() === 'value2')
    assert(item.label() === 'label2')

    // Select item 1
    this.__component.__actionSelect.dispatch(
      new ActionSelectItemPayloadBuilder().item(item1).build()
    )
    assert(this.__component.getSelectedItemsId().length === 1)
    item = this.__component.getSelectedItems()[0]
    assert(item.id() === '1')
    assert(item.value() === 'value1')
    assert(item.label() === 'label1')
  }
}

runTest(TestsSelectUnique)