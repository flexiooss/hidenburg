import {MapItemState} from "../MapItemState";
import {AbstractListManager} from "./AbstractListManager";

export class MultipleList extends AbstractListManager {
  constructor(componentContext) {
    super(componentContext)
  }

  performSelectEvent(item) {
    let stateItems = new MapItemState()
    let data = this._storeState.getStore().state().data
    data.forEach((state) => {
      let storeStateItem = this._buildStateItemMatch(item, state, !state.selected(), state.selected())
      stateItems.set(state.itemId(), storeStateItem)
    })
    this._storeState.getStore().set(stateItems)
  }
}
