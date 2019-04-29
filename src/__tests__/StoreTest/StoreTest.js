import {InMemoryStoreParams, PublicStoreHandler, StoreTypeParam} from "hotballoon";
import {StoreBuilder} from "hotballoon/src/js/Store/StoreBuilder";
import {ItemList} from "../..";

export class StoreTest {
  constructor(componentContext) {
    this.__componentContext = componentContext

    this.__store = this.__componentContext.addStore(
      StoreBuilder.InMemory(
        new InMemoryStoreParams(
          new StoreTypeParam(
            ItemList,
            (data) => {
              return data
            },
            (data) => {
              return true
            },
            (obj) => {

            }
          ), new ItemList()
        )
      ))
    this.__storePublic = new PublicStoreHandler(this.__store)
  }

  /**
   * @returns {StoreInterface<ItemList>}
   */
  getStorePublic() {
    return this.__storePublic
  }

  /**
   * @returns {Store<ItemList>}
   */
  getStore() {
    return this.__store
  }
}
