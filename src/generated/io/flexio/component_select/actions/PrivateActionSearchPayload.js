import {assert, deepFreezeSeal, isNull, isString} from 'flexio-jshelpers'

class PrivateActionSearchPayload {

  /**
   * @param {string} label
   * @private
   */
  constructor(label) {
    this._label = label;
    deepFreezeSeal(this);
  }

  /**
   * @returns {string}
   */
  label() {
    return this._label;
  }

  /**
   * @param { string } label
   */
  withLabel(label) {
    var builder = PrivateActionSearchPayloadBuilder.from(this);
    builder.label(label);
    return builder.build();
  }

  toObject() {
    var jsonObject = {};
    if (this._label != undefined) {
      jsonObject["label"] = this._label;
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

export {PrivateActionSearchPayload}

class PrivateActionSearchPayloadBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._label = null;
  }

  /**
   * @param {object} jsonObject
   * @returns {PrivateActionSearchPayloadBuilder}
   */
  static fromObject(jsonObject) {
    var builder = new PrivateActionSearchPayloadBuilder()
    if (jsonObject["label"] !== undefined) {
      builder.label(jsonObject['label']);
    }
    return builder;
  }

  /**
   * @param {string} json
   * @returns {PrivateActionSearchPayloadBuilder}
   */
  static fromJson(json) {
    var jsonObject = JSON.parse(json);
    return this.fromObject(jsonObject);
  }

  /**
   * @param {PrivateActionSearchPayload} instance
   * @returns {PrivateActionSearchPayloadBuilder}
   */
  static from(instance) {
    var builder = new PrivateActionSearchPayloadBuilder();
    builder.label(instance.label());
    return builder;
  }

  /**
   * @param { string } label
   * @returns {PrivateActionSearchPayloadBuilder}
   */
  label(label) {
    if (!isNull(label)) {
      assert(isString(label), 'label should be a string');
    }
    this._label = label;
    return this;
  }

  /**
   * @returns {PrivateActionSearchPayload}
   */
  build() {
    return new PrivateActionSearchPayload(this._label)
  }
}

export {PrivateActionSearchPayloadBuilder}
