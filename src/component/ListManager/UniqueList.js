import {MapItemState} from "../MapItemState";
import {AbstractListManager} from "./AbstractListManager";

export class UniqueList extends AbstractListManager {
  constructor(componentContext) {
    super(componentContext)
  }

  performSelectEvent(item) {
    this._addSelectItems(item.id())
    let stateItems = new MapItemState()
    let data = this._storeState.getStore().state().data
    data.forEach((state) => {
      if (item.id() === state.itemId() && !state.selected()) {
        this._addSelectedItems(item.id())
      }
      if (state.selected()) {
        this._addUnselectedItems(state.itemId())
      }

      let storeStateItem = this._buildStateItemMatch(item, state, true, false)
      stateItems.set(state.itemId(), storeStateItem)
    })
    this._storeState.getStore().set(stateItems)

    this._dispatchPublicEvents()
  }

  performMultipleSelectEvent(item) {
    this.performSelectEvent(item)
  }

}
