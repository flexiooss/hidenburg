import {assert, deepFreezeSeal, isNull, isObject} from 'flexio-jshelpers'

class PrivateActionUnselectPayload {

  /**
   * @param {object} item
   * @private
   */
  constructor(item) {
    this._item = item;
    deepFreezeSeal(this);
  }

  /**
   * @returns {object}
   */
  item() {
    return this._item;
  }

  /**
   * @param { object } item
   */
  withItem(item) {
    var builder = PrivateActionUnselectPayloadBuilder.from(this);
    builder.item(item);
    return builder.build();
  }

  toObject() {
    var jsonObject = {};
    if (this._item != undefined) {
      jsonObject["item"] = this._item;
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

export {PrivateActionUnselectPayload}

class PrivateActionUnselectPayloadBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._item = null;
  }

  /**
   * @param {object} jsonObject
   * @returns {PrivateActionUnselectPayloadBuilder}
   */
  static fromObject(jsonObject) {
    var builder = new PrivateActionUnselectPayloadBuilder()
    if (jsonObject["item"] !== undefined) {
      builder.item(jsonObject['item']);
    }
    return builder;
  }

  /**
   * @param {string} json
   * @returns {PrivateActionUnselectPayloadBuilder}
   */
  static fromJson(json) {
    var jsonObject = JSON.parse(json);
    return this.fromObject(jsonObject);
  }

  /**
   * @param {PrivateActionUnselectPayload} instance
   * @returns {PrivateActionUnselectPayloadBuilder}
   */
  static from(instance) {
    var builder = new PrivateActionUnselectPayloadBuilder();
    builder.item(instance.item());
    return builder;
  }

  /**
   * @param { object } item
   * @returns {PrivateActionUnselectPayloadBuilder}
   */
  item(item) {
    if (!isNull(item)) {
      assert(isObject(item), 'item should be an object');
    }
    this._item = item;
    return this;
  }

  /**
   * @returns {PrivateActionUnselectPayload}
   */
  build() {
    return new PrivateActionUnselectPayload(this._item)
  }
}

export {PrivateActionUnselectPayloadBuilder}
