import {Item} from "../../generated/io/flexio/hidenburg/types/Item";
import {FlexMap} from "@flexio-oss/flex-types";
import {assertType} from "@flexio-oss/assert";

export class ItemList extends FlexMap {
  _validate(v) {
    assertType(v instanceof Item, 'ItemList: input should be an instance of Item')
  }
}
