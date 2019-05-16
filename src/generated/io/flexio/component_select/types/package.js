import{ FLEXIO_IMPORT_OBJECT, deepKeyAssigner } from 'flexio-jshelpers' 
import {Item, ItemBuilder} from "./Item";
import {StoreStateItem, StoreStateItemBuilder} from "./StoreStateItem";

/**
* @property {Item} Item
*/
deepKeyAssigner( window[FLEXIO_IMPORT_OBJECT], 'io.flexio.component_select.types.Item' ,Item );
/**
* @property {ItemBuilder} ItemBuilder
*/
deepKeyAssigner( window[FLEXIO_IMPORT_OBJECT], 'io.flexio.component_select.types.ItemBuilder' ,ItemBuilder );
/**
* @property {StoreStateItem} StoreStateItem
*/
deepKeyAssigner( window[FLEXIO_IMPORT_OBJECT], 'io.flexio.component_select.types.StoreStateItem' ,StoreStateItem );
/**
* @property {StoreStateItemBuilder} StoreStateItemBuilder
*/
deepKeyAssigner( window[FLEXIO_IMPORT_OBJECT], 'io.flexio.component_select.types.StoreStateItemBuilder' ,StoreStateItemBuilder );

