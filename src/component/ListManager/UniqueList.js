import {MapItemState} from "../MapItemState";
import {AbstractListManager} from "./AbstractListManager";

export class UniqueList extends AbstractListManager {
  constructor(componentContext) {
    super(componentContext)
  }

  performSelectEvent(item) {
    this.addSelectItems(item.id())
    console.log('plo')
    let stateItems = new MapItemState()
    let data = this._storeState.getStore().state().data
    data.forEach((state) => {
      if (item.id() === state.itemId()) {
        this.addSelectedItems(item.id())
      }
      if (state.selected()) {
        this.addUnselectedItems(item.id())
      }

      let storeStateItem = this._buildStateItemMatch(item, state, true, false)
      stateItems.set(state.itemId(), storeStateItem)
    })
    this._storeState.getStore().set(stateItems)

    this.dispatchPublicEvents()
  }

  performMultipleSelectEvent(item) {
    this.performSelectEvent(item)
  }

}
