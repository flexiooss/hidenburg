import {ViewContainer, ViewContainerParameters} from 'hotballoon'
import {ViewSelect} from "./views/ViewSelect";
import {ViewSelectConfig} from "./views/ViewSelectConfig";

// import {ComponentAtmosphereLayersBuilder} from "atmosphere-layers/src/js/ComponentAtmosphereLayersBuilder";

export class ViewContainerSelect extends ViewContainer {
  /**
   *
   * @param {ViewContainerSelectConfig} config
   */
  constructor(config) {
    let id = config.getComponentContext().nextID()
    let constructorConfig = new ViewContainerParameters(config.getComponentContext(), id, config.getParentNode())

    super(constructorConfig)

    this.__parentNode = config.getParentNode()
    this.__proxyStore = config.getDataStore()
    this.__stateStore = config.getStateStore()
    this.__viewItemBuilder = config.getViewItemBuilder()
    this.__actionSelect = config.getActionSelect()
    this.__actionMultipleSelect = config.getActionMultipleSelect()
    this.__properties = config.getProperties()
    this.__component = config.getComponent()

    // this.__layers = ComponentAtmosphereLayersBuilder.build(config.getComponentContext())
  }

  createViewItems() {
    // this.__layers.mountView(this.__parentNode)

    let config = new ViewSelectConfig()
      .withViewContainer(this)
      .withActionSelect(this.__actionSelect)
      .withActionMultipleSelect(this.__actionMultipleSelect)
      .withViewItemBuilder(this.__viewItemBuilder)
      .withDataStore(this.__proxyStore)
      .withStateStore(this.__stateStore)
      .withProperties(this.__properties)
      .withComponent(this.__component)
    // .withLayers(this.__layers)

    // this.__parentNode.subscribe(
    //   EventListenerOrderedBuilder
    //     .listen('VIEW_UPDATED')
    //     .callback(()=>{console.log('UPDATE')})
    // )

    this.__selectView = this.addView(new ViewSelect(config))
  }
}
