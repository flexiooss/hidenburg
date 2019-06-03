import {ItemList} from "../../src/component/ItemList";
import {InMemoryStoreParams, PublicStoreHandler, StoreTypeParam} from "@flexio-oss/hotballoon";
import {StoreBuilder} from "@flexio-oss/hotballoon/src/js/Store/StoreBuilder";

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
