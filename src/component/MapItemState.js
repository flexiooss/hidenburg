import {StoreStateItem} from "../../generated/io/flexio/hidenburg/types/StoreStateItem";
import {assertType} from "@flexio-oss/assert";
import {FlexMap} from "@flexio-oss/flex-types";

export class MapItemState extends FlexMap {
  _validate(v) {
    assertType(v instanceof StoreStateItem, 'MapItemState: input should be an instance of StoreStateItem')
  }
}
