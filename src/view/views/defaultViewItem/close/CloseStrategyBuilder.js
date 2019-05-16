import {CloseMultiple} from "./CloseMultiple";
import {CloseUnique} from "./CloseUnique";

export class CloseStrategyBuilder {
  constructor() {
    this.__component = null
    this.__properties = null
  }

  /**
   * @param properties
   * @return {CloseStrategyBuilder}
   */
  properties(properties) {
    this.__properties = properties
    return this
  }

  /**
   * @param {Component} component
   * @return {CloseStrategyBuilder}
   */
  component(component) {
    this.__component = component
    return this
  }

  build() {
    if (this.__properties === null || this.__component === null) {
      throw new Error('Builder incomplete')
    }

    if (this.__properties.multiple) {
      return new CloseMultiple(this.__component)
    } else {
      return new CloseUnique()
    }
  }

}
