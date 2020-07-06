var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, decorators_1, Widget_1, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = __importDefault(Widget_1);
    var CSS = {
        error: "embed-app__layout-error"
    };
    var Error = /** @class */ (function (_super) {
        __extends(Error, _super);
        function Error(props) {
            return _super.call(this, props) || this;
        }
        Error.prototype.render = function () {
            return (widget_1.tsx("div", { class: this.classes(CSS.error) },
                widget_1.tsx("h1", null, this.title),
                widget_1.tsx("p", null, this.message)));
        };
        __decorate([
            decorators_1.property()
        ], Error.prototype, "message", void 0);
        __decorate([
            decorators_1.property()
        ], Error.prototype, "title", void 0);
        Error = __decorate([
            decorators_1.subclass("Error")
        ], Error);
        return Error;
    }((Widget_1.default)));
    exports.default = Error;
});
//# sourceMappingURL=Error.js.map