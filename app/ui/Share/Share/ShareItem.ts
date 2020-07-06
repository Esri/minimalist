
import {
  property,
  subclass
} from "esri/core/accessorSupport/decorators";
import Accessor = require("esri/core/Accessor");

@subclass("ShareItem")
class ShareItem extends (Accessor) {
  @property() id: string = null;

  @property() name: string = null;

  @property() className: string = null;

  @property() urlTemplate: string = null;

  @property() svg: any = null;
}

export = ShareItem;
