import {InMemoryStoreParams, PublicStoreHandler, StoreBuilder, StoreTypeParam} from "hotballoon";
import {MapItemState} from "../component/MapItemState";

export class StoreState {
  constructor(componentContext) {
    this.__componentContext = componentContext

    this.__store = this.__componentContext.addStore(
      StoreBuilder.InMemory(
        new InMemoryStoreParams(
          new StoreTypeParam(
            MapItemState,
            (data) => data,
            () => true,
            () => {
            }
          ),
          new MapItemState()
        )
      )
    )

    this.__storePublic = new PublicStoreHandler(this.__store)
  }

  /**
   *
   * @return {PublicStoreHandler}
   */
  getStorePublic() {
    return this.__storePublic
  }

  /**
   *
   * @return {Store}
   */
  getStore() {
    return this.__store
  }
}
