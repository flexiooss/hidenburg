import {InMemoryStoreParams, PublicStoreHandler, StoreBuilder, StoreTypeParam} from 'hotballoon'

export class StoreSelect {
  constructor(componentContext) {
    this.__componentContext = componentContext

    this.__store = this.__componentContext.addStore(
      StoreBuilder.InMemory(
        new InMemoryStoreParams(
          new StoreTypeParam(
            SeveritiesList,
            (data) => {
              return data
            },
            (data) => {
              return true
            },
            (obj) => {
              // fromObject
            }
          ),
          new SeveritiesList()
        )
      ))

    this.__storePublic = new PublicStoreHandler(this.__store)
  }

  /**
   * @returns {StoreInterface<SeveritiesList>}
   */
  getStorePublic() {
    return this.__storePublic
  }

  /**
   * @returns {Store<SeveritiesList>}
   */
  getStore() {
    return this.__store
  }
}
