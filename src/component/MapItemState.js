import {assertType, FlexMap} from "flexio-jshelpers";
import {StoreStateItem} from "../../generated/io/flexio/hidenburg/types/StoreStateItem";

export class MapItemState extends FlexMap {
  _validate(v) {
    assertType(v instanceof StoreStateItem, 'MapItemState: input should be an instance of StoreStateItem')
  }
}
