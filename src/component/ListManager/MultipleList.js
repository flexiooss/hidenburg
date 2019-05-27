import {MapItemState} from "../MapItemState";
import {AbstractListManager} from "./AbstractListManager";
import {StoreStateItemBuilder} from "../../generated/io/flexio/component_select/types/StoreStateItem";

export class MultipleList extends AbstractListManager {
  constructor(componentContext) {
    super(componentContext)

    this.__lastItemSelectedId = null
  }

  performSelectEvent(item) {
    this._addSelectItems(item.id())

    let stateItems = new MapItemState()
    let data = this._stateStore.getStore().state().data
    data.forEach((state) => {
      let builder = StoreStateItemBuilder.from(state)
      if (item.id() === state.itemId()) {
        if (state.selected()) {
          builder.selected(false)
          this._addUnselectedItems(item.id())
        } else {
          builder.selected(true)
          this._addSelectedItems(item.id())
          this.__lastItemSelectedId = item.id()
        }
      }

      stateItems.set(state.itemId(), builder.build())
    })
    this._stateStore.getStore().set(stateItems)

    this._dispatchPublicEvents()
  }

  performMultipleSelectEvent(item) {
    let stateItems = new MapItemState()

    let data = this._stateStore.getStore().state().data
    if (this.__lastItemSelectedId === null)
      this.__lastItemSelectedId = data.values().next().value.itemId() // First item

    let inUpdateRange = false
    data.forEach((state) => {
      if (this.__lastItemSelectedId === state.itemId()) {
        inUpdateRange = true
      }

      let storeStateItemBuilder = new StoreStateItemBuilder()
        .itemId(state.itemId())
        .disabled(state.disabled())
        .visible(state.visible())
        .selected(state.selected())

      if (inUpdateRange) {
        storeStateItemBuilder = storeStateItemBuilder.selected(true)
        if (!state.selected()) {
          this._addSelectedItems(state.itemId())
          this._addSelectItems(state.itemId())
        }
      }

      if (item.id() === state.itemId()) {
        inUpdateRange = false
      }
      stateItems.set(state.itemId(), storeStateItemBuilder.build())
    })

    this.__lastItemSelectedId = item.id()
    this._stateStore.getStore().set(stateItems)

    this._dispatchPublicEvents()
  }

  performUnselectEvent(item) {
    this._addUnselectedItems(item.id())

    let stateItems = new MapItemState()
    let data = this._stateStore.getStore().state().data
    data.forEach((state) => {
      let builder = StoreStateItemBuilder.from(state)
      if (state.itemId() === item.id()) {
        builder.selected(false)
      }
      stateItems.set(state.itemId(), builder.build())
    })
    this._stateStore.getStore().set(stateItems)

    this._dispatchPublicEvents()
  }
}
