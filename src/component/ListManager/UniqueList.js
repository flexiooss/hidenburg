import {MapItemState} from "../MapItemState";
import {AbstractListManager} from "./AbstractListManager";

export class UniqueList extends AbstractListManager {
  constructor(componentContext) {
    super(componentContext)
  }

  performSelectEvent(item) {
    this._selectedItemsIds.push(item.id())

    let stateItems = new MapItemState()
    let data = this._storeState.getStore().state().data
    data.forEach((state) => {
      if (state.selected()) {
        this._unselectedItemsIds.push(state.itemId())
      }
      let storeStateItem = this._buildStateItemMatch(item, state, true, false)
      stateItems.set(state.itemId(), storeStateItem)
    })
    this._storeState.getStore().set(stateItems)
  }


}
