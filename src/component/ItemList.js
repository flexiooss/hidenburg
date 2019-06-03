import {assertType, FlexMap} from "flexio-jshelpers";
import {Item} from "../../generated/io/flexio/hidenburg/types/Item";

export class ItemList extends FlexMap {
  _validate(v) {
    assertType(v instanceof Item, 'ItemList: input should be an instance of Item')
  }
}
