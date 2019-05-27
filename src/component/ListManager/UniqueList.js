import {MapItemState} from "../MapItemState";
import {AbstractListManager} from "./AbstractListManager";
import {StoreStateItemBuilder} from "../../generated/io/flexio/component_select/types/StoreStateItem";

export class UniqueList extends AbstractListManager {
  constructor(componentContext) {
    super(componentContext)

    this.__itemSelected = null
  }

  _checkDataStore() {
    console.log('check store')
    let cpt = 0
    this._dataStore.state().data.forEach((el) => {
      if (el.selected()) {
        cpt++
        if (cpt > 1) {
          throw new Error('Only 1 item selected in not multiple list')
        }
      }
    })
  }

  /**
   * @param {Item} item
   */
  performSelectEvent(item) {
    this._addSelectItems(item.id())
    if (this.__itemSelected !== item) {
      let stateItems = new MapItemState()
      let data = this._stateStore.getStore().state().data
      data.forEach((state) => {
        let builder = StoreStateItemBuilder.from(state)
        if (item.id() === state.itemId() && !state.selected()) {
          builder.selected(true)
          this._addSelectedItems(item.id())
          this.__itemSelected = item
        }
        if (state.selected()) {
          builder.selected(false)
          this._addUnselectedItems(state.itemId())
        }

        stateItems.set(state.itemId(), builder.build())
      })
      this._stateStore.getStore().set(stateItems)
    }

    this._dispatchPublicEvents()
  }

  /**
   * @param {Item} item
   */
  performMultipleSelectEvent(item) {
    this.performSelectEvent(item)
  }

  /**
   * @param {Item} item
   */
  performUnselectEvent(item) {
    this._addSelectItems(item.id())

    this._dispatchPublicEvents()
  }
}
