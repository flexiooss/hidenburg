import {assertType, FlexArray} from "flexio-jshelpers";
import {Item} from "../generated/io/flexio/component_select/types/Item";

export class ItemList extends FlexArray {
  _validate(v) {
    assertType(v instanceof Item, 'ItemList: input should be an instance of Item')
  }
}
