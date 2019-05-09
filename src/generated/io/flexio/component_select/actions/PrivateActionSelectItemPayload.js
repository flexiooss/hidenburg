import {assert, deepFreezeSeal, isNull, isObject} from 'flexio-jshelpers'

class PrivateActionSelectItemPayload {

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
    var builder = PrivateActionSelectItemPayloadBuilder.from(this);
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

export {PrivateActionSelectItemPayload}

class PrivateActionSelectItemPayloadBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._item = null;
  }

  /**
   * @param {object} jsonObject
   * @returns {PrivateActionSelectItemPayloadBuilder}
   */
  static fromObject(jsonObject) {
    var builder = new PrivateActionSelectItemPayloadBuilder()
    if (jsonObject["item"] !== undefined) {
      builder.item(jsonObject['item']);
    }
    return builder;
  }

  /**
   * @param {string} json
   * @returns {PrivateActionSelectItemPayloadBuilder}
   */
  static fromJson(json) {
    var jsonObject = JSON.parse(json);
    return this.fromObject(jsonObject);
  }

  /**
   * @param {PrivateActionSelectItemPayload} instance
   * @returns {PrivateActionSelectItemPayloadBuilder}
   */
  static from(instance) {
    var builder = new PrivateActionSelectItemPayloadBuilder();
    builder.item(instance.item());
    return builder;
  }

  /**
   * @param { object } item
   * @returns {PrivateActionSelectItemPayloadBuilder}
   */
  item(item) {
    if (!isNull(item)) {
      assert(isObject(item), 'item should be an object');
    }
    this._item = item;
    return this;
  }

  /**
   * @returns {PrivateActionSelectItemPayload}
   */
  build() {
    return new PrivateActionSelectItemPayload(this._item)
  }
}

export {PrivateActionSelectItemPayloadBuilder}
