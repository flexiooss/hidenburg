/* global runTest */
import {TestCase} from 'code-altimeter-js'
import {ComponentSelect, ComponentSelectConfig, ItemList} from "..";
import {StoreTest} from "./StoreTest/StoreTest";
import {Dispatcher, HotBalloonApplication} from "@flexio-oss/hotballoon";
import {Item} from "../generated/io/flexio/component_select/types/Item";
import {PrivateActionSelectItemPayloadBuilder} from "../generated/io/flexio/component_select/actions/PrivateActionSelectItemPayload";
import {PrivateActionSelectMultipleItemsPayloadBuilder} from "../generated/io/flexio/component_select/actions/PrivateActionSelectMultipleItemsPayload";

const assert = require('assert')

class TestsSelectUnique extends TestCase {
  setUp() {
    this.__APP = new HotBalloonApplication('TestHidenburg', new Dispatcher())

    let node = {'nodeType': 1}
    let cc = this.__APP.addComponentContext()

    this.__store = new StoreTest(cc)

    let config = new ComponentSelectConfig()
      .withComponentContext(cc)
      .withStore(this.__store.getStorePublic())
      .withLayersManager({})
      .withProperties({multiple: false}) // useless but more verbose

    this.__component = new ComponentSelect(config)
  }

  __setStore(...els) {
    let list = new ItemList()
    els.forEach((el) => {
      list.set(el.id(), el)
    })
    this.__store.getStore().set(
      list
    )
  }

  testSelectedItems() {
    let item1 = new Item('1', 'label', 'value', false, true, false)
    let item2 = new Item('2', 'plok', 'value', false, true, false)
    this.__setStore(item1, item2)

    assert.strictEqual(this.__component.getSelectedItemsId().length, 0)
    assert.strictEqual(this.__component.getSelectedItems().length, 0)

    item1 = new Item('1', 'label', 'value', true, true, false)
    this.__setStore(item1, item2)

    assert.strictEqual(this.__component.getSelectedItemsId().length, 1)
    assert.strictEqual(this.__component.getSelectedItemsId()[0], '1')
    assert.strictEqual(this.__component.getSelectedItems().length, 1)
    assert.strictEqual(this.__component.getSelectedItems()[0], item1)

    item2 = new Item('2', 'plok', 'value', true, true, false)

    assert.throws(() => this.__setStore(item1, item2))
  }

  testActionSelect() {
    let item1 = new Item('1', 'value1', 'label1', false, true, false)
    let item2 = new Item('2', 'value2', 'label2', false, true, false)
    this.__setStore(item1, item2)

    assert.strictEqual(this.__component.getSelectedItemsId().length, 0)

    // Select item 1
    this.__component.__privateActionSelect.dispatch(
      new PrivateActionSelectItemPayloadBuilder().item(item1).build()
    )
    assert.strictEqual(this.__component.getSelectedItemsId().length, 1)
    assert.strictEqual(this.__component.getSelectedItemsId()[0], '1')
    assert.strictEqual(this.__component.getSelectedItems().length, 1)
    assert.strictEqual(this.__component.getSelectedItems()[0], item1)

    // Select item 2
    this.__component.__privateActionSelect.dispatch(
      new PrivateActionSelectItemPayloadBuilder().item(item2).build()
    )
    assert.strictEqual(this.__component.getSelectedItemsId().length, 1)
    assert.strictEqual(this.__component.getSelectedItemsId()[0], '2')
    assert.strictEqual(this.__component.getSelectedItems().length, 1)
    assert.strictEqual(this.__component.getSelectedItems()[0], item2)

    // Select item 1
    this.__component.__privateActionSelect.dispatch(
      new PrivateActionSelectItemPayloadBuilder().item(item2).build()
    )

    assert.strictEqual(this.__component.getSelectedItemsId().length, 1)
    assert.strictEqual(this.__component.getSelectedItemsId()[0], '2')
    assert.strictEqual(this.__component.getSelectedItems().length, 1)
    assert.strictEqual(this.__component.getSelectedItems()[0], item2)
  }

  testPublicActionDispatched() {
    let item1 = new Item('1', 'value1', 'label1', false, true, false)
    let item2 = new Item('2', 'value2', 'label2', false, true, false)
    this.__setStore(item1, item2)

    let idSelect = []
    let idSelected = []
    let idUnselected = []
    this.__component.getPublicActionSelect().listenWithCallback((payload) => {
      idSelect.push(payload.itemId())
    })

    this.__component.getPublicActionSelected().listenWithCallback((payload) => {
      idSelected.push(payload.itemId())
    })

    this.__component.getPublicActionUnselected().listenWithCallback((payload) => {
      idUnselected.push(payload.itemId())
    })

    this.__component.__privateActionSelect.dispatch(
      new PrivateActionSelectItemPayloadBuilder().item(item1).build()
    )

    assert.strictEqual(idSelect.length, 1)
    assert.strictEqual(idSelect[0], item1.id())
    assert.strictEqual(idSelected.length, 1)
    assert.strictEqual(idSelected[0], item1.id())
    assert.strictEqual(idUnselected.length, 0)


    idSelect = []
    idSelected = []
    idUnselected = []
    this.__component.__privateActionSelect.dispatch(
      new PrivateActionSelectItemPayloadBuilder().item(item2).build()
    )

    assert.strictEqual(idSelect.length, 1)
    assert.strictEqual(idSelect[0], item2.id())
    assert.strictEqual(idSelected.length, 1)
    assert.strictEqual(idSelected[0], item2.id())
    assert.strictEqual(idUnselected.length, 1)
    assert.strictEqual(idUnselected[0], '1')
  }

  testPublicActionSelectMultiple() {
    let item1 = new Item('1', 'value1', 'label1', false, true, false)
    let item2 = new Item('2', 'value2', 'label2', false, true, false)
    this.__setStore(item1, item2)

    let idSelect = []
    let idSelected = []
    let idUnselected = []
    this.__component.getPublicActionSelect().listenWithCallback((payload) => {
      idSelect.push(payload.itemId())
    })

    this.__component.getPublicActionSelected().listenWithCallback((payload) => {
      idSelected.push(payload.itemId())
    })

    this.__component.getPublicActionUnselected().listenWithCallback((payload) => {
      idUnselected.push(payload.itemId())
    })

    this.__component.__privateActionSelectMultiple.dispatch(
      new PrivateActionSelectMultipleItemsPayloadBuilder().itemTo(item2).build()
    )

    assert.strictEqual(idSelect.length, 1)
    assert.strictEqual(idSelect[0], item2.id())
    assert.strictEqual(idSelected.length, 1)
    assert.strictEqual(idSelected[0], item2.id())
    assert.strictEqual(idUnselected.length, 0)
  }
}

runTest(TestsSelectUnique)
