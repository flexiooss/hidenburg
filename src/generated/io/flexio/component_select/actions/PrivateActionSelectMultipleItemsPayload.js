import { isObject, assert, isNull, deepFreezeSeal } from 'flexio-jshelpers' 

class PrivateActionSelectMultipleItemsPayload {

    /**
    * @param {object} itemTo
    * @private
    */
    constructor ( itemTo ){
        this._itemTo = itemTo;
        deepFreezeSeal( this );
    }
    /**
    * @returns {object}
    */
    itemTo() {
        return this._itemTo;
    }
    /**
    * @param { object } itemTo
    */
    withItemTo( itemTo ) {
        var builder = PrivateActionSelectMultipleItemsPayloadBuilder.from( this );
        builder.itemTo( itemTo);
        return builder.build();
    }
    toObject() {
        var jsonObject = {};
        if( this._itemTo != undefined ){
            jsonObject["itemTo"] = this._itemTo;
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
export { PrivateActionSelectMultipleItemsPayload}

class PrivateActionSelectMultipleItemsPayloadBuilder {
    /**
    * @constructor
    */
    constructor(){
        this._itemTo = null;
    }
    /**
    * @param { object } itemTo
    * @returns {PrivateActionSelectMultipleItemsPayloadBuilder}
    */
    itemTo( itemTo ) {
        if( !isNull( itemTo )){
            assert( isObject( itemTo ), 'itemTo should be an object' );
        }
        this._itemTo = itemTo;
        return this;
    }
    /**
    * @returns {PrivateActionSelectMultipleItemsPayload}
    */
    build(){
        return new PrivateActionSelectMultipleItemsPayload(this._itemTo)
    }
    /**
    * @param {object} jsonObject
    * @returns {PrivateActionSelectMultipleItemsPayloadBuilder}
    */
    static fromObject( jsonObject ) {
        var builder = new PrivateActionSelectMultipleItemsPayloadBuilder()
        if( jsonObject["itemTo"] !== undefined ){
            builder.itemTo( jsonObject['itemTo']);
        }
        return builder;
    }
    /**
    * @param {string} json
    * @returns {PrivateActionSelectMultipleItemsPayloadBuilder}
    */
    static fromJson( json ){
        var jsonObject = JSON.parse( json );
        return this.fromObject( jsonObject );
    }
    /**
    * @param {PrivateActionSelectMultipleItemsPayload} instance
    * @returns {PrivateActionSelectMultipleItemsPayloadBuilder}
    */
    static from( instance ){
        var builder = new PrivateActionSelectMultipleItemsPayloadBuilder();
        builder.itemTo( instance.itemTo() );
        return builder;
    }
}
export { PrivateActionSelectMultipleItemsPayloadBuilder}
