import {FlexArray} from "flexio-jshelpers";

export class ItemList extends FlexArray {
  _validate(v) {
    assertType(v instanceof Item, 'ItemList: input should be an instance of Item')
  }
}
