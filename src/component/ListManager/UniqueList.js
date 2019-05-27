import {MapItemState} from "../MapItemState";
import {AbstractListManager} from "./AbstractListManager";
import {StoreStateItemBuilder} from "../../generated/io/flexio/component_select/types/StoreStateItem";

export class UniqueList extends AbstractListManager {
  constructor(componentContext) {
    super(componentContext)
  }

  performSelectEvent(item) {
    this._addSelectItems(item.id())
    let stateItems = new MapItemState()
    let data = this._stateStore.getStore().state().data
    data.forEach((state) => {
      let builder = StoreStateItemBuilder.from(state)
      if (item.id() === state.itemId() && !state.selected()) {
        builder.selected(true)
        this._addSelectedItems(item.id())
      }
      if (state.selected()) {
        builder.selected(false)
        this._addUnselectedItems(state.itemId())
      }

      stateItems.set(state.itemId(), builder.build())
    })
    this._stateStore.getStore().set(stateItems)

    this._dispatchPublicEvents()
  }

  performMultipleSelectEvent(item) {
    this.performSelectEvent(item)
  }

  performUnselectEvent(item) {

  }
}
