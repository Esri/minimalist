define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, tslib_1, decorators_1, Widget_1, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        error: "embed-app__layout-error"
    };
    var Error = /** @class */ (function (_super) {
        tslib_1.__extends(Error, _super);
        function Error(props) {
            return _super.call(this, props) || this;
        }
        Error.prototype.render = function () {
            return (widget_1.tsx("div", { class: this.classes(CSS.error) },
                widget_1.tsx("h1", null, this.title),
                widget_1.tsx("p", null, this.message)));
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Error.prototype, "message", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Error.prototype, "title", void 0);
        Error = tslib_1.__decorate([
            decorators_1.subclass("Error")
        ], Error);
        return Error;
    }((Widget_1.default)));
    exports.default = Error;
});
