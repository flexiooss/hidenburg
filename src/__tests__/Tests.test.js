/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {ComponentSelect, ComponentSelectConfig, ItemList} from "..";
import {StoreTest} from "./StoreTest/StoreTest";
import {Dispatcher, HotBalloonApplication} from "hotballoon";
import {Item} from "../generated/io/flexio/component_select/types/Item";
import {ActionSelectItemPayloadBuilder} from "../generated/io/flexio/component_select/actions/ActionSelectItemPayload";

const assert = require('assert')

class Tests extends TestCase {
  setUp() {
    this.__APP = new HotBalloonApplication('TestHidenburg', new Dispatcher())
  }

  __setComponent(...els) {
    let node = {'nodeType': 1}
    let cc = this.__APP.addComponentContext()

    this.__store = new StoreTest(cc)
    this.__store.getStore().set(
      new ItemList(...els)
    )
    let config = new ComponentSelectConfig().withParentNode(node).withComponentContext(cc).withProxyStore(this.__store.getStorePublic())
    this.__component = new ComponentSelect(config)
  }

  testSelectedItems() {
    this.__setComponent(
      new Item('1', 'label', 'value', false, true, false),
      new Item('2', 'plok', 'value', false, true, false)
    )

    assert(this.__component.getSelectedItemsId().length === 0)
    assert(this.__component.getSelectedItems().length === 0)

    this.__setComponent(
      new Item('1', 'value', 'label', true, true, false),
      new Item('2', 'plok', 'label', false, true, false)
    )

    assert(this.__component.getSelectedItemsId().length === 1)
    assert(this.__component.getSelectedItemsId()[0] === '1')
    assert(this.__component.getSelectedItems()[0].value() === 'value')
    assert(this.__component.getSelectedItems()[0].label() === 'label')
  }

  testActionSelect() {
    let item0 = new Item('1', 'value', 'label', false, true, false)
    this.__setComponent(
      item0,
      new Item('2', 'plok', 'label', false, true, false)
    )

    assert(this.__component.getSelectedItemsId().length === 0)

    this.__component.__actionSelect.dispatch(
      new ActionSelectItemPayloadBuilder().item(item0).build()
    )

    assert(this.__component.getSelectedItemsId().length === 1)
    let item = this.__component.getSelectedItems()[0]
    assert(this.__component.getSelectedItemsId()[0] === '1')
    assert(item.value() === 'value')
    assert(item.label() === 'label')

    this.__component.__actionSelect.dispatch(
      new ActionSelectItemPayloadBuilder().item(item).build()
    )
    assert(this.__component.getSelectedItemsId().length === 0)
  }

}

runTest(Tests)
