import {assert, deepFreezeSeal, isBoolean, isNull, isString} from 'flexio-jshelpers'

class Item {

  /**
   * @param {string} id
   * @param {string} value
   * @param {string} label
   * @param {boolean} selected
   * @param {boolean} visible
   * @param {boolean} disabled
   * @private
   */
  constructor(id, value, label, selected, visible, disabled) {
    this._id = id;
    this._value = value;
    this._label = label;
    this._selected = selected;
    this._visible = visible;
    this._disabled = disabled;
    deepFreezeSeal(this);
  }

  /**
   * @returns {string}
   */
  id() {
    return this._id;
  }

  /**
   * @returns {string}
   */
  value() {
    return this._value;
  }

  /**
   * @returns {string}
   */
  label() {
    return this._label;
  }

  /**
   * @returns {boolean}
   */
  selected() {
    return this._selected;
  }

  /**
   * @returns {boolean}
   */
  visible() {
    return this._visible;
  }

  /**
   * @returns {boolean}
   */
  disabled() {
    return this._disabled;
  }

  /**
   * @param { string } id
   */
  withId(id) {
    var builder = ItemBuilder.from(this);
    builder.id(id);
    return builder.build();
  }

  /**
   * @param { string } value
   */
  withValue(value) {
    var builder = ItemBuilder.from(this);
    builder.value(value);
    return builder.build();
  }

  /**
   * @param { string } label
   */
  withLabel(label) {
    var builder = ItemBuilder.from(this);
    builder.label(label);
    return builder.build();
  }

  /**
   * @param { boolean } selected
   */
  withSelected(selected) {
    var builder = ItemBuilder.from(this);
    builder.selected(selected);
    return builder.build();
  }

  /**
   * @param { boolean } visible
   */
  withVisible(visible) {
    var builder = ItemBuilder.from(this);
    builder.visible(visible);
    return builder.build();
  }

  /**
   * @param { boolean } disabled
   */
  withDisabled(disabled) {
    var builder = ItemBuilder.from(this);
    builder.disabled(disabled);
    return builder.build();
  }

  toObject() {
    var jsonObject = {};
    if (this._id != undefined) {
      jsonObject["id"] = this._id;
    }
    if (this._value != undefined) {
      jsonObject["value"] = this._value;
    }
    if (this._label != undefined) {
      jsonObject["label"] = this._label;
    }
    if (this._selected != undefined) {
      jsonObject["selected"] = this._selected;
    }
    if (this._visible != undefined) {
      jsonObject["visible"] = this._visible;
    }
    if (this._disabled != undefined) {
      jsonObject["disabled"] = this._disabled;
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

export {Item}

class ItemBuilder {
  /**
   * @constructor
   */
  constructor() {
    this._id = null;
    this._value = null;
    this._label = null;
    this._selected = null;
    this._visible = null;
    this._disabled = null;
  }

  /**
   * @param {object} jsonObject
   * @returns {ItemBuilder}
   */
  static fromObject(jsonObject) {
    var builder = new ItemBuilder()
    if (jsonObject["id"] !== undefined) {
      builder.id(jsonObject['id']);
    }
    if (jsonObject["value"] !== undefined) {
      builder.value(jsonObject['value']);
    }
    if (jsonObject["label"] !== undefined) {
      builder.label(jsonObject['label']);
    }
    if (jsonObject["selected"] !== undefined) {
      builder.selected(jsonObject['selected']);
    }
    if (jsonObject["visible"] !== undefined) {
      builder.visible(jsonObject['visible']);
    }
    if (jsonObject["disabled"] !== undefined) {
      builder.disabled(jsonObject['disabled']);
    }
    return builder;
  }

  /**
   * @param {string} json
   * @returns {ItemBuilder}
   */
  static fromJson(json) {
    var jsonObject = JSON.parse(json);
    return this.fromObject(jsonObject);
  }

  /**
   * @param {Item} instance
   * @returns {ItemBuilder}
   */
  static from(instance) {
    var builder = new ItemBuilder();
    builder.id(instance.id());
    builder.value(instance.value());
    builder.label(instance.label());
    builder.selected(instance.selected());
    builder.visible(instance.visible());
    builder.disabled(instance.disabled());
    return builder;
  }

  /**
   * @param { string } id
   * @returns {ItemBuilder}
   */
  id(id) {
    if (!isNull(id)) {
      assert(isString(id), 'id should be a string');
    }
    this._id = id;
    return this;
  }

  /**
   * @param { string } value
   * @returns {ItemBuilder}
   */
  value(value) {
    if (!isNull(value)) {
      assert(isString(value), 'value should be a string');
    }
    this._value = value;
    return this;
  }

  /**
   * @param { string } label
   * @returns {ItemBuilder}
   */
  label(label) {
    if (!isNull(label)) {
      assert(isString(label), 'label should be a string');
    }
    this._label = label;
    return this;
  }

  /**
   * @param { boolean } selected
   * @returns {ItemBuilder}
   */
  selected(selected) {
    if (!isNull(selected)) {
      assert(isBoolean(selected), 'selected should be a bool');
    }
    this._selected = selected;
    return this;
  }

  /**
   * @param { boolean } visible
   * @returns {ItemBuilder}
   */
  visible(visible) {
    if (!isNull(visible)) {
      assert(isBoolean(visible), 'visible should be a bool');
    }
    this._visible = visible;
    return this;
  }

  /**
   * @param { boolean } disabled
   * @returns {ItemBuilder}
   */
  disabled(disabled) {
    if (!isNull(disabled)) {
      assert(isBoolean(disabled), 'disabled should be a bool');
    }
    this._disabled = disabled;
    return this;
  }

  /**
   * @returns {Item}
   */
  build() {
    return new Item(this._id, this._value, this._label, this._selected, this._visible, this._disabled)
  }
}

export {ItemBuilder}
