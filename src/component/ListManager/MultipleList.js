import {MapItemState} from "../MapItemState";
import {AbstractListManager} from "./AbstractListManager";
import {StoreStateItemBuilder} from "../../generated/io/flexio/component_select/types/StoreStateItem";

export class MultipleList extends AbstractListManager {
  constructor(componentContext) {
    super(componentContext)

    this.__lastItemSelectedId = null
  }

  performSelectEvent(item) {
    this.addSelectItems(item.id())

    let stateItems = new MapItemState()
    let data = this._storeState.getStore().state().data
    data.forEach((state) => {
      if (item.id() === state.itemId()) {
        if (state.selected()) {
          this.addUnselectedItems(item.id())
        } else {
          this.addSelectedItems(item.id())
          this.__lastItemSelectedId = item.id()
        }
      }

      let storeStateItem = this._buildStateItemMatch(item, state, !state.selected(), state.selected())
      stateItems.set(state.itemId(), storeStateItem)
    })
    this._storeState.getStore().set(stateItems)

    this.dispatchPublicEvents()
  }

  performMultipleSelectEvent(item) {
    this.addSelectItems(item.id())
    let stateItems = new MapItemState()

    let data = this._storeState.getStore().state().data
    if (this.__lastItemSelectedId === null)
      this.__lastItemSelectedId = data.values().next().value.itemId() // First item

    console.log(this.__lastItemSelectedId)

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

      if (this.__lastItemSelectedId === state.itemId()) {
        storeStateItemBuilder = storeStateItemBuilder.selected(true)
      } else {
        if (inUpdateRange) {
          storeStateItemBuilder = storeStateItemBuilder.selected(!state.selected())
          if (state.selected()) {
            this.addUnselectedItems(item.id())
          } else {
            this.addSelectedItems(item.id())
          }
        }
      }


      if (item.id() === state.itemId()) {
        inUpdateRange = false
      }
      stateItems.set(state.itemId(), storeStateItemBuilder.build())
    })

    this.__lastItemSelectedId = item.id()
    this._storeState.getStore().set(stateItems)

    this.dispatchPublicEvents()
  }
}
