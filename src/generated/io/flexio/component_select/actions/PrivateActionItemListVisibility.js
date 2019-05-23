import {assert, deepFreezeSeal, isBoolean, isNull} from 'flexio-jshelpers'

class PrivateActionItemListVisibility {

  /**
   * @param {boolean} visibility
   * @private
   */
  constructor(visibility) {
    this._visibility = visibility;
    deepFreezeSeal(this);
  }

  /**
   * @returns {boolean}
   */
  visibility() {
    return this._visibility;
  }

  /**
   * @param { boolean } visibility
   */
  withVisibility(visibility) {
    var builder = PrivateActionItemListVisibilityBuilder.from(this);
    builder.visibility(visibility);
    return builder.build();
  }

  toObject() {
    var jsonObject = {};
    if (this._visibility != undefined) {
      jsonObject["visibility"] = this._visibility;
    }
    return jsonObject;
  }

  /**
   * @returns {object}
   */
  toJSON() {
    return this.toObject();
  }
}

export {PrivateActionItemListVisibility}

class PrivateActionItemListVisibilityBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._visibility = null;
  }

  /**
   * @param {object} jsonObject
   * @returns {PrivateActionItemListVisibilityBuilder}
   */
  static fromObject(jsonObject) {
    var builder = new PrivateActionItemListVisibilityBuilder()
    if (jsonObject["visibility"] !== undefined) {
      builder.visibility(jsonObject['visibility']);
    }
    return builder;
  }

  /**
   * @param {string} json
   * @returns {PrivateActionItemListVisibilityBuilder}
   */
  static fromJson(json) {
    var jsonObject = JSON.parse(json);
    return this.fromObject(jsonObject);
  }

  /**
   * @param {PrivateActionItemListVisibility} instance
   * @returns {PrivateActionItemListVisibilityBuilder}
   */
  static from(instance) {
    var builder = new PrivateActionItemListVisibilityBuilder();
    builder.visibility(instance.visibility());
    return builder;
  }

  /**
   * @param { boolean } visibility
   * @returns {PrivateActionItemListVisibilityBuilder}
   */
  visibility(visibility) {
    if (!isNull(visibility)) {
      assert(isBoolean(visibility), 'visibility should be a bool');
    }
    this._visibility = visibility;
    return this;
  }

  /**
   * @returns {PrivateActionItemListVisibility}
   */
  build() {
    return new PrivateActionItemListVisibility(this._visibility)
  }
}

export {PrivateActionItemListVisibilityBuilder}
