import {deepKeyAssigner, FLEXIO_IMPORT_OBJECT, globalScope} from 'flexio-jshelpers'
import {Item, ItemBuilder} from "./Item";
import {StoreStateItem, StoreStateItemBuilder} from "./StoreStateItem";

/**
* @property {Item} Item
*/
deepKeyAssigner(globalScope[FLEXIO_IMPORT_OBJECT], 'io.flexio.component_select.types.Item', Item);
/**
* @property {ItemBuilder} ItemBuilder
*/
deepKeyAssigner(globalScope[FLEXIO_IMPORT_OBJECT], 'io.flexio.component_select.types.ItemBuilder', ItemBuilder);
/**
* @property {StoreStateItem} StoreStateItem
*/
deepKeyAssigner(globalScope[FLEXIO_IMPORT_OBJECT], 'io.flexio.component_select.types.StoreStateItem', StoreStateItem);
/**
* @property {StoreStateItemBuilder} StoreStateItemBuilder
*/
deepKeyAssigner(globalScope[FLEXIO_IMPORT_OBJECT], 'io.flexio.component_select.types.StoreStateItemBuilder', StoreStateItemBuilder);

