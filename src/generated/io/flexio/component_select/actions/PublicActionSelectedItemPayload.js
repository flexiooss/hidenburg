import { isObject, assert, isNull, deepFreezeSeal, isString } from 'flexio-jshelpers' 

class PublicActionSelectedItemPayload {

    /**
    * @param {string} itemId
    * @private
    */
    constructor ( itemId ){
        this._itemId = itemId;
        deepFreezeSeal( this );
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
    withItemId( itemId ) {
        var builder = PublicActionSelectedItemPayloadBuilder.from( this );
        builder.itemId( itemId);
        return builder.build();
    }
    toObject() {
        var jsonObject = {};
        if( this._itemId != undefined ){
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
export { PublicActionSelectedItemPayload}

class PublicActionSelectedItemPayloadBuilder {
    /**
    * @constructor
    */
    constructor(){
        this._itemId = null;
    }
    /**
    * @param { string } itemId
    * @returns {PublicActionSelectedItemPayloadBuilder}
    */
    itemId( itemId ) {
        if( !isNull( itemId )){
            assert( isString( itemId ), 'itemId should be a string' );
        }
        this._itemId = itemId;
        return this;
    }
    /**
    * @returns {PublicActionSelectedItemPayload}
    */
    build(){
        return new PublicActionSelectedItemPayload(this._itemId)
    }
    /**
    * @param {object} jsonObject
    * @returns {PublicActionSelectedItemPayloadBuilder}
    */
    static fromObject( jsonObject ) {
        var builder = new PublicActionSelectedItemPayloadBuilder()
        if( jsonObject["itemId"] !== undefined ){
            builder.itemId( jsonObject['itemId']);
        }
        return builder;
    }
    /**
    * @param {string} json
    * @returns {PublicActionSelectedItemPayloadBuilder}
    */
    static fromJson( json ){
        var jsonObject = JSON.parse( json );
        return this.fromObject( jsonObject );
    }
    /**
    * @param {PublicActionSelectedItemPayload} instance
    * @returns {PublicActionSelectedItemPayloadBuilder}
    */
    static from( instance ){
        var builder = new PublicActionSelectedItemPayloadBuilder();
        builder.itemId( instance.itemId() );
        return builder;
    }
}
export { PublicActionSelectedItemPayloadBuilder}
