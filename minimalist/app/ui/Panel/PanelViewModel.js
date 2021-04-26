define(["require", "exports", "tslib", "esri/core/Accessor", "dojo/i18n!../../nls/resources", "esri/core/accessorSupport/decorators", "../FeatureList", "esri/core/watchUtils"], function (require, exports, tslib_1, Accessor, i18n, decorators_1, FeatureList_1, watchUtils_1) {
    "use strict";
    FeatureList_1 = tslib_1.__importDefault(FeatureList_1);
    var PanelViewModel = /** @class */ (function (_super) {
        tslib_1.__extends(PanelViewModel, _super);
        function PanelViewModel(props) {
            var _this = _super.call(this, props) || this;
            _this.actions = [];
            _this.view = null;
            _this.calcitePanel = null;
            _this.featureList = null;
            _this.focusedItem = null;
            return _this;
        }
        PanelViewModel.prototype.createDetails = function (container) {
            var _this = this;
            var _a = this.applicationConfig, detailsContent = _a.detailsContent, withinConfigurationExperience = _a.withinConfigurationExperience;
            var map = this.view.map;
            var content = detailsContent ||
                map.portalItem.description ||
                null;
            var detailDiv = document.createElement("div");
            container.id = "details";
            container.style = "padding-left:0.25em;padding-right:0.25em;";
            container.setAttribute("tabindex", "0");
            detailDiv.innerHTML = content;
            if (withinConfigurationExperience) {
                // update content if within config experience
                this.applicationConfig.watch("detailsContent", function () {
                    detailDiv.innerHTML = _this.applicationConfig.detailsContent;
                });
            }
            return container.append(detailDiv);
        };
        PanelViewModel.prototype.createLayerList = function (container) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var layerContainer, LayerList;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            layerContainer = document.createElement("div");
                            layerContainer.tabIndex = 0;
                            container.id = "layerListPanel";
                            container.append(layerContainer);
                            return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require(["esri/widgets/LayerList"], resolve_1, reject_1); }).then(tslib_1.__importStar)];
                        case 1:
                            LayerList = _a.sent();
                            return [2 /*return*/, new LayerList.default({
                                    view: this.view,
                                    container: container
                                })];
                    }
                });
            });
        };
        PanelViewModel.prototype.createLegend = function (container) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var legendDiv, Legend, legendWidget;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            legendDiv = document.createElement("div");
                            container.setAttribute("tabindex", "0");
                            container.id = "legendPanel";
                            container.append(legendDiv);
                            return [4 /*yield*/, new Promise(function (resolve_2, reject_2) { require(["esri/widgets/Legend"], resolve_2, reject_2); }).then(tslib_1.__importStar)];
                        case 1:
                            Legend = _a.sent();
                            legendWidget = new Legend.default({
                                view: this.view,
                                style: this.applicationConfig.layoutType === "horizontal" ? {
                                    type: "card",
                                    layout: "auto"
                                } : "classic",
                                container: container
                            });
                            watchUtils_1.init(this.applicationConfig, "layoutType", function () {
                                if (legendWidget === null || legendWidget === void 0 ? void 0 : legendWidget.style) {
                                    legendWidget.style = _this.applicationConfig.layoutType === "horizontal" ? {
                                        type: "card",
                                        layout: "auto"
                                    } : "classic";
                                }
                            });
                            return [2 /*return*/, legendWidget];
                    }
                });
            });
        };
        PanelViewModel.prototype.createPopup = function (container) {
            container.classList.add("popup-container");
            container.setAttribute("tabindex", "0");
            container.id = "popupPanel";
            this.featureList = new FeatureList_1.default({
                applicationConfig: this.applicationConfig,
                view: this.view,
                container: container
            });
        };
        PanelViewModel.prototype.createEditor = function (container) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, editLayers, allowedWorkflows, editorDiv, errorDiv, Editor, editWidget;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.applicationConfig, editLayers = _a.editLayers, allowedWorkflows = _a.allowedWorkflows;
                            editorDiv = document.createElement("div");
                            editorDiv.tabIndex = 0;
                            container.id = "editorPanel";
                            container.append(editorDiv);
                            errorDiv = document.createElement("div");
                            errorDiv.classList.add("hide");
                            errorDiv.innerHTML = i18n.editPanel.noEditableLayersMessage;
                            container.append(errorDiv);
                            return [4 /*yield*/, new Promise(function (resolve_3, reject_3) { require(["esri/widgets/Editor"], resolve_3, reject_3); }).then(tslib_1.__importStar)];
                        case 1:
                            Editor = _b.sent();
                            editWidget = new Editor.default({
                                view: this.view,
                                allowedWorkflows: allowedWorkflows,
                                container: container
                            });
                            if (editLayers) {
                                editWidget.layerInfos = editLayers;
                            }
                            watchUtils_1.once(editWidget.viewModel, "editableItems", function () {
                                editWidget.viewModel.editableItems.length === 0 ? errorDiv.classList.remove("hide") : errorDiv.classList.add("hide");
                            });
                            return [2 /*return*/, editWidget];
                    }
                });
            });
        };
        PanelViewModel.prototype.createActions = function () {
            var _a = this.applicationConfig, legendPanel = _a.legendPanel, layerListPanel = _a.layerListPanel, details = _a.details, activePanel = _a.activePanel, popupPanel = _a.popupPanel, editPanel = _a.editPanel;
            var actions = [];
            if (legendPanel) {
                actions.push({
                    key: "legendPanel",
                    icon: "legend",
                    name: i18n.tools.legend,
                    label: i18n.tools.legend,
                    active: activePanel === "legendPanel" ? true : false
                });
            }
            if (details) {
                actions.push({
                    key: "details",
                    icon: "information",
                    name: i18n.tools.details,
                    label: i18n.tools.details,
                    active: activePanel === "details" ? true : false
                });
            }
            if (layerListPanel) {
                actions.push({
                    key: "layerListPanel",
                    icon: "layerList",
                    name: i18n.tools.layerList,
                    label: i18n.tools.layerList,
                    active: activePanel === "layerListPanel" ? true : false
                });
            }
            if (popupPanel) {
                actions.push({
                    key: "popup",
                    icon: "popup",
                    name: i18n.tools.popup,
                    label: i18n.tools.popup,
                    active: activePanel === "popupPanel" ? true : false
                });
            }
            if (editPanel) {
                actions.push({
                    key: "edit",
                    icon: "edit",
                    name: i18n.tools.edit,
                    label: i18n.tools.edit,
                    active: activePanel === "editPanel" ? true : false
                });
            }
            this.actions = actions;
        };
        PanelViewModel.prototype.actionItemClicked = function (e) {
            var _a;
            // the panels are empty 
            var activeAction = e === null || e === void 0 ? void 0 : e.target;
            var name = (_a = activeAction === null || activeAction === void 0 ? void 0 : activeAction.dataset) === null || _a === void 0 ? void 0 : _a.actionItem;
            this.actions.forEach(function (action) {
                if (name === action.key) {
                    action.active = !activeAction.active;
                }
                else { // hide others 
                    action.active = false;
                }
            });
            // Collapse the panel if there aren't any active tools
            var isActive = this.actions.some(function (a) {
                return a.active;
            });
            this.calcitePanel.collapsed = isActive ? false : true;
        };
        PanelViewModel.prototype.createActionClickFunction = function (action) {
            var clickFunction = null;
            switch (action.key) {
                case "legendPanel":
                    clickFunction = this.createLegend;
                    break;
                case "layerListPanel":
                    clickFunction = this.createLayerList;
                    break;
                case "details":
                    clickFunction = this.createDetails;
                    break;
                case "popup":
                    clickFunction = this.createPopup;
                    break;
                case "edit":
                    clickFunction = this.createEditor;
                    break;
            }
            return clickFunction;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "applicationConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "applicationBase", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "actions", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "calcitePanel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "featureList", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PanelViewModel.prototype, "focusedItem", void 0);
        PanelViewModel = tslib_1.__decorate([
            decorators_1.subclass("esri.demo.PanelViewModel")
        ], PanelViewModel);
        return PanelViewModel;
    }((Accessor)));
    return PanelViewModel;
});
