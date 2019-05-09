import {assert, deepFreezeSeal, isNull, isString} from 'flexio-jshelpers'

class PublicActionUnselectedItemPayload {

  /**
   * @param {string} itemId
   * @private
   */
  constructor(itemId) {
    this._itemId = itemId;
    deepFreezeSeal(this);
  }

  /**
   * @returns {string}
   */
  itemId() {
    return this._itemId;
  }

  /**
   * @param { string } itemId
   */
  withItemId(itemId) {
    var builder = PublicActionUnselectedItemPayloadBuilder.from(this);
    builder.itemId(itemId);
    return builder.build();
  }

  toObject() {
    var jsonObject = {};
    if (this._itemId != undefined) {
      jsonObject["itemId"] = this._itemId;
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

export {PublicActionUnselectedItemPayload}

class PublicActionUnselectedItemPayloadBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._itemId = null;
  }

  /**
   * @param {object} jsonObject
   * @returns {PublicActionUnselectedItemPayloadBuilder}
   */
  static fromObject(jsonObject) {
    var builder = new PublicActionUnselectedItemPayloadBuilder()
    if (jsonObject["itemId"] !== undefined) {
      builder.itemId(jsonObject['itemId']);
    }
    return builder;
  }

  /**
   * @param {string} json
   * @returns {PublicActionUnselectedItemPayloadBuilder}
   */
  static fromJson(json) {
    var jsonObject = JSON.parse(json);
    return this.fromObject(jsonObject);
  }

  /**
   * @param {PublicActionUnselectedItemPayload} instance
   * @returns {PublicActionUnselectedItemPayloadBuilder}
   */
  static from(instance) {
    var builder = new PublicActionUnselectedItemPayloadBuilder();
    builder.itemId(instance.itemId());
    return builder;
  }

  /**
   * @param { string } itemId
   * @returns {PublicActionUnselectedItemPayloadBuilder}
   */
  itemId(itemId) {
    if (!isNull(itemId)) {
      assert(isString(itemId), 'itemId should be a string');
    }
    this._itemId = itemId;
    return this;
  }

  /**
   * @returns {PublicActionUnselectedItemPayload}
   */
  build() {
    return new PublicActionUnselectedItemPayload(this._itemId)
  }
}

export {PublicActionUnselectedItemPayloadBuilder}
