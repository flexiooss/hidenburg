import {assert, deepFreezeSeal, isBoolean, isNull, isString} from 'flexio-jshelpers'

class StoreStateItem {

    /**
    * @param {string} itemId
    * @param {boolean} selected
    * @param {boolean} disabled
    * @param {boolean} visible
     * @param {boolean} searchSelected
    * @private
    */
    constructor(itemId, selected, disabled, visible, searchSelected) {
        this._itemId = itemId;
        this._selected = selected;
        this._disabled = disabled;
        this._visible = visible;
      this._searchSelected = searchSelected;
        deepFreezeSeal( this );
    }
    /**
    * @returns {string}
    */
    itemId() {
        return this._itemId;
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
    disabled() {
        return this._disabled;
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
    searchSelected() {
      return this._searchSelected;
    }

  /**
   * @param { string } itemId
   */
  withItemId(itemId ) {
    var builder = StoreStateItemBuilder.from( this );
    builder.itemId( itemId);
    return builder.build();
  }
    /**
    * @param { boolean } selected
    */
    withSelected( selected ) {
        var builder = StoreStateItemBuilder.from( this );
        builder.selected( selected);
        return builder.build();
    }
    /**
    * @param { boolean } disabled
    */
    withDisabled( disabled ) {
        var builder = StoreStateItemBuilder.from( this );
        builder.disabled( disabled);
        return builder.build();
    }
    /**
    * @param { boolean } visible
    */
    withVisible( visible ) {
        var builder = StoreStateItemBuilder.from( this );
        builder.visible( visible);
        return builder.build();
    }

  /**
   * @param { boolean } searchSelected
   */
  withSearchSelected(searchSelected) {
    var builder = StoreStateItemBuilder.from(this);
    builder.searchSelected(searchSelected);
    return builder.build();
  }
    toObject() {
        var jsonObject = {};
        if( this._itemId != undefined ){
            jsonObject["itemId"] = this._itemId;
        }
        if( this._selected != undefined ){
            jsonObject["selected"] = this._selected;
        }
        if( this._disabled != undefined ){
            jsonObject["disabled"] = this._disabled;
        }
        if( this._visible != undefined ){
            jsonObject["visible"] = this._visible;
        }
      if (this._searchSelected != undefined) {
        jsonObject["searchSelected"] = this._searchSelected;
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
export { StoreStateItem}

class StoreStateItemBuilder {
    /**
    * @constructor
    */
    constructor(){
        this._itemId = null;
        this._selected = null;
        this._disabled = null;
        this._visible = null;
      this._searchSelected = null;
    }
    /**
    * @param { string } itemId
    * @returns {StoreStateItemBuilder}
    */
    itemId( itemId ) {
        if( !isNull( itemId )){
            assert( isString( itemId ), 'itemId should be a string' );
        }
        this._itemId = itemId;
        return this;
    }
    /**
    * @param { boolean } selected
    * @returns {StoreStateItemBuilder}
    */
    selected( selected ) {
        if( !isNull( selected )){
            assert( isBoolean( selected ), 'selected should be a bool' );
        }
        this._selected = selected;
        return this;
    }
    /**
    * @param { boolean } disabled
    * @returns {StoreStateItemBuilder}
    */
    disabled( disabled ) {
        if( !isNull( disabled )){
            assert( isBoolean( disabled ), 'disabled should be a bool' );
        }
        this._disabled = disabled;
        return this;
    }
    /**
    * @param { boolean } visible
    * @returns {StoreStateItemBuilder}
    */
    visible( visible ) {
        if( !isNull( visible )){
            assert( isBoolean( visible ), 'visible should be a bool' );
        }
        this._visible = visible;
        return this;
    }

    /**
    * @param {object} jsonObject
    * @returns {StoreStateItemBuilder}
    */
    static fromObject( jsonObject ) {
        var builder = new StoreStateItemBuilder()
        if( jsonObject["itemId"] !== undefined ){
            builder.itemId( jsonObject['itemId']);
        }
        if( jsonObject["selected"] !== undefined ){
            builder.selected( jsonObject['selected']);
        }
        if( jsonObject["disabled"] !== undefined ){
            builder.disabled( jsonObject['disabled']);
        }
        if( jsonObject["visible"] !== undefined ){
            builder.visible( jsonObject['visible']);
        }
      if (jsonObject["searchSelected"] !== undefined) {
        builder.searchSelected(jsonObject['searchSelected']);
      }
        return builder;
    }

    /**
    * @param {StoreStateItem} instance
    * @returns {StoreStateItemBuilder}
    */
    static from( instance ){
        var builder = new StoreStateItemBuilder();
        builder.itemId( instance.itemId() );
        builder.selected( instance.selected() );
        builder.disabled( instance.disabled() );
        builder.visible( instance.visible() );
      builder.searchSelected(instance.searchSelected());
        return builder;
    }

  /**
   * @param { boolean } searchSelected
   * @returns {StoreStateItemBuilder}
   */
  searchSelected(searchSelected) {
    if (!isNull(searchSelected)) {
      assert(isBoolean(searchSelected), 'searchSelected should be a bool');
    }
    this._searchSelected = searchSelected;
    return this;
  }

  /**
   * @param {string} json
   * @returns {StoreStateItemBuilder}
   */
  static fromJson(json) {
    var jsonObject = JSON.parse(json);
    return this.fromObject(jsonObject);
  }

  /**
   * @returns {StoreStateItem}
   */
  build() {
    return new StoreStateItem(this._itemId, this._selected, this._disabled, this._visible, this._searchSelected)
  }
}
export { StoreStateItemBuilder}
