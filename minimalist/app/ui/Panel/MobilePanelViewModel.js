define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "./PanelViewModel"], function (require, exports, tslib_1, decorators_1, PanelViewModel) {
    "use strict";
    var MobilePanelViewModel = /** @class */ (function (_super) {
        tslib_1.__extends(MobilePanelViewModel, _super);
        function MobilePanelViewModel(props) {
            var _this = _super.call(this, props) || this;
            _this.mobilePanel = null;
            return _this;
        }
        MobilePanelViewModel.prototype.expandPanel = function (e) {
            var _a, _b;
            // move height to max height (add a class) then change arrow to down 
            var container = e.target;
            var block = (_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode;
            if (!container && !block)
                return;
            if (container.classList.contains("action-img-expand")) {
                // remove expand and add collapse
                container.classList.add("action-img-collapse");
                container.classList.remove("action-img-expand");
            }
            else {
                container.classList.remove("action-img-collapse");
                container.classList.add("action-img-expand");
            }
            this.mobilePanel.classList.toggle("full");
            block.theme = this.applicationConfig.theme;
        };
        MobilePanelViewModel.prototype.closePanel = function (e) {
            var _a, _b;
            // search for mobile block container (full) and remove full class
            var nodes = document.getElementsByClassName("mobile-block-container full");
            for (var index = 0; index < nodes.length; index++) {
                var element = nodes[index];
                var buttonNodes = element.getElementsByClassName("action-img-collapse");
                element.classList.remove("full");
                for (var i = 0; i < buttonNodes.length; index++) {
                    var node = buttonNodes[index];
                    node.classList.remove("action-img-collapse");
                    node.classList.add("action-img-expand");
                }
            }
            // close everything 
            this.actions.forEach(function (action) {
                action.checked = false;
            });
            if (this === null || this === void 0 ? void 0 : this.featureList) {
                this.featureList.features = null;
                this.featureList.clearHighlight();
            }
            if ((_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.popup) === null || _b === void 0 ? void 0 : _b.selectedFeature) {
                this.view.popup.clear();
            }
        };
        MobilePanelViewModel.prototype.openPanel = function (e) {
            // open selected 
            var item = e.target;
            var value = item === null || item === void 0 ? void 0 : item.value;
            // open selected close others 
            this.actions.forEach(function (action) {
                if (value === action.name) {
                    action.checked = true;
                }
                else { // hide others 
                    action.checked = false;
                }
            });
        };
        MobilePanelViewModel.prototype.destroy = function () {
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], MobilePanelViewModel.prototype, "mobilePanel", void 0);
        MobilePanelViewModel = tslib_1.__decorate([
            decorators_1.subclass("esri.demo.PanelViewModel")
        ], MobilePanelViewModel);
        return MobilePanelViewModel;
    }((PanelViewModel)));
    return MobilePanelViewModel;
});
