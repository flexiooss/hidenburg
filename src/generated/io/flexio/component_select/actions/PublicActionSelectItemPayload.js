import { isObject, assert, isNull, deepFreezeSeal, isString } from 'flexio-jshelpers' 

class PublicActionSelectItemPayload {

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
        var builder = PublicActionSelectItemPayloadBuilder.from( this );
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
export { PublicActionSelectItemPayload}

class PublicActionSelectItemPayloadBuilder {
    /**
    * @constructor
    */
    constructor(){
        this._itemId = null;
    }
    /**
    * @param { string } itemId
    * @returns {PublicActionSelectItemPayloadBuilder}
    */
    itemId( itemId ) {
        if( !isNull( itemId )){
            assert( isString( itemId ), 'itemId should be a string' );
        }
        this._itemId = itemId;
        return this;
    }
    /**
    * @returns {PublicActionSelectItemPayload}
    */
    build(){
        return new PublicActionSelectItemPayload(this._itemId)
    }
    /**
    * @param {object} jsonObject
    * @returns {PublicActionSelectItemPayloadBuilder}
    */
    static fromObject( jsonObject ) {
        var builder = new PublicActionSelectItemPayloadBuilder()
        if( jsonObject["itemId"] !== undefined ){
            builder.itemId( jsonObject['itemId']);
        }
        return builder;
    }
    /**
    * @param {string} json
    * @returns {PublicActionSelectItemPayloadBuilder}
    */
    static fromJson( json ){
        var jsonObject = JSON.parse( json );
        return this.fromObject( jsonObject );
    }
    /**
    * @param {PublicActionSelectItemPayload} instance
    * @returns {PublicActionSelectItemPayloadBuilder}
    */
    static from( instance ){
        var builder = new PublicActionSelectItemPayloadBuilder();
        builder.itemId( instance.itemId() );
        return builder;
    }
}
export { PublicActionSelectItemPayloadBuilder}
