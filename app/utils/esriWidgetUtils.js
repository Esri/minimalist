var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "esri/core/promiseUtils"], function (require, exports, promiseUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addShare = exports.addSearch = exports.addBookmarks = exports.addScaleBar = exports.addZoom = exports.addHome = exports.addOverlay = exports.addBasemap = void 0;
    function addBasemap(props) {
        return __awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, nextBasemap, basemapTogglePosition, basemapToggle, BasemapToggle, node, bmToggle, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        nextBasemap = config.nextBasemap, basemapTogglePosition = config.basemapTogglePosition, basemapToggle = config.basemapToggle;
                        return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require(["esri/widgets/BasemapToggle"], resolve_1, reject_1); }).then(__importStar)];
                    case 1:
                        BasemapToggle = _b.sent();
                        if (!BasemapToggle)
                            return [2 /*return*/];
                        node = _findNode("esri-basemap-toggle");
                        // If basemapToggle isn't enabled remove the widget if it exists and exit 
                        if (!basemapToggle) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        // Move the basemap toggle widget if it exists 
                        if (propertyName === "basemapTogglePosition" && node) {
                            view.ui.move(node, basemapTogglePosition);
                        }
                        if (!(propertyName === "basemapToggle" || (propertyName === "nextBasemap" && node))) return [3 /*break*/, 4];
                        if (node)
                            view.ui.remove(node);
                        bmToggle = new BasemapToggle.default({
                            view: view
                        });
                        if (!nextBasemap) return [3 /*break*/, 3];
                        _a = bmToggle;
                        return [4 /*yield*/, _getBasemap(nextBasemap)];
                    case 2:
                        _a.nextBasemap = (_b.sent());
                        _b.label = 3;
                    case 3:
                        view.ui.add(bmToggle, basemapTogglePosition);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    exports.addBasemap = addBasemap;
    function _findNode(className) {
        var mainNodes = document.getElementsByClassName(className);
        var node = null;
        for (var j = 0; j < mainNodes.length; j++) {
            node = mainNodes[j];
        }
        return node ? node : null;
    }
    function _getBasemap(id) {
        return __awaiter(this, void 0, void 0, function () {
            var Basemap, basemap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve_2, reject_2) { require(["esri/Basemap"], resolve_2, reject_2); }).then(__importStar)];
                    case 1:
                        Basemap = _a.sent();
                        if (!Basemap) {
                            return [2 /*return*/];
                        }
                        basemap = Basemap.default.fromId(id);
                        if (!!basemap) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Basemap.default({
                                portalItem: {
                                    id: id
                                }
                            }).loadAll()];
                    case 2:
                        basemap = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, basemap];
                }
            });
        });
    }
    function addOverlay(props) {
        return __awaiter(this, void 0, void 0, function () {
            var view, config, disableScroll, ScrollOverlay, node, overlay;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, config = props.config;
                        disableScroll = config.disableScroll;
                        return [4 /*yield*/, new Promise(function (resolve_3, reject_3) { require(["../ui/ScrollOverlay"], resolve_3, reject_3); }).then(__importStar)];
                    case 1:
                        ScrollOverlay = _a.sent();
                        node = _findNode("scroll-overlay");
                        if (!disableScroll) {
                            if (node)
                                view.ui.remove(node);
                            // update view nav 
                            view.navigation.mouseWheelZoomEnabled = true;
                            view.navigation.browserTouchPanEnabled = true;
                            return [2 /*return*/];
                        }
                        else {
                            overlay = new ScrollOverlay.default(__assign(__assign({}, props), { container: document.createElement("div") }));
                            view.ui.add(overlay, "manual");
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addOverlay = addOverlay;
    function addHome(props) {
        return __awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, home, homePosition, Home, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        home = config.home, homePosition = config.homePosition;
                        return [4 /*yield*/, new Promise(function (resolve_4, reject_4) { require(["esri/widgets/Home"], resolve_4, reject_4); }).then(__importStar)];
                    case 1:
                        Home = _a.sent();
                        node = _findNode("esri-home");
                        if (!home) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        if (node && !home)
                            view.ui.remove(node);
                        if (propertyName === "homePosition" && node) {
                            view.ui.move(node, homePosition);
                        }
                        else if (propertyName === "home") {
                            view.ui.add(new Home.default({ view: view }), homePosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addHome = addHome;
    function addZoom(props) {
        return __awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, mapZoom, mapZoomPosition, Zoom, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        mapZoom = config.mapZoom, mapZoomPosition = config.mapZoomPosition;
                        return [4 /*yield*/, new Promise(function (resolve_5, reject_5) { require(["esri/widgets/Zoom"], resolve_5, reject_5); }).then(__importStar)];
                    case 1:
                        Zoom = _a.sent();
                        node = _findNode("esri-zoom");
                        if (!mapZoom) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        if (node && !mapZoom)
                            view.ui.remove(node);
                        if (propertyName === "mapZoomPosition" && node) {
                            view.ui.move(node, mapZoomPosition);
                        }
                        else if (propertyName === "mapZoom" && !node) {
                            view.ui.add(new Zoom.default({ view: view }), mapZoomPosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addZoom = addZoom;
    function addScaleBar(props) {
        return __awaiter(this, void 0, void 0, function () {
            var view, portal, config, propertyName, scalebar, scalebarPosition, ScaleBar, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, portal = props.portal, config = props.config, propertyName = props.propertyName;
                        scalebar = config.scalebar, scalebarPosition = config.scalebarPosition;
                        return [4 /*yield*/, new Promise(function (resolve_6, reject_6) { require(["esri/widgets/ScaleBar"], resolve_6, reject_6); }).then(__importStar)];
                    case 1:
                        ScaleBar = _a.sent();
                        node = _findNode("esri-scale-bar");
                        if (!scalebar) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        // move the node if it exists 
                        if (propertyName === "scalebarPosition" && node) {
                            view.ui.move(node, scalebarPosition);
                        }
                        else if (propertyName === "scalebar") {
                            view.ui.add(new ScaleBar.default({
                                view: view,
                                unit: (portal === null || portal === void 0 ? void 0 : portal.units) === "metric" ? portal === null || portal === void 0 ? void 0 : portal.units : "non-metric"
                            }), scalebarPosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addScaleBar = addScaleBar;
    function addBookmarks(props) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, bookmarks, bookmarksPosition, modules, _b, Bookmarks, Expand, node, map, mapContainsBookmarks, content, bookmarksExpand;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        bookmarks = config.bookmarks, bookmarksPosition = config.bookmarksPosition;
                        return [4 /*yield*/, promiseUtils_1.eachAlways([new Promise(function (resolve_7, reject_7) { require(["esri/widgets/Bookmarks"], resolve_7, reject_7); }).then(__importStar), new Promise(function (resolve_8, reject_8) { require(["esri/widgets/Expand"], resolve_8, reject_8); }).then(__importStar)])];
                    case 1:
                        modules = _c.sent();
                        _b = modules.map(function (module) { return module.value; }), Bookmarks = _b[0], Expand = _b[1];
                        node = view.ui.find("bookmarksExpand");
                        map = view.map;
                        mapContainsBookmarks = ((_a = map === null || map === void 0 ? void 0 : map.bookmarks) === null || _a === void 0 ? void 0 : _a.length) > 0 ? true : false;
                        if (!bookmarks || !mapContainsBookmarks) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        // move the node if it exists 
                        if (propertyName === "bookmarksPosition" && node) {
                            view.ui.move(node, bookmarksPosition);
                        }
                        else if (propertyName === "bookmarks") {
                            content = new Bookmarks.default({
                                view: view
                            });
                            bookmarksExpand = new Expand.default({
                                id: "bookmarksExpand",
                                content: content,
                                mode: "floating",
                                view: view
                            });
                            view.ui.add(bookmarksExpand, bookmarksPosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addBookmarks = addBookmarks;
    function addSearch(props) {
        return __awaiter(this, void 0, void 0, function () {
            var view, portal, config, propertyName, search, searchPosition, searchConfiguration, searchOpenAtStart, modules, _a, Search, FeatureLayer, Expand, node, sources, content, searchExpand;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = props.view, portal = props.portal, config = props.config, propertyName = props.propertyName;
                        search = config.search, searchPosition = config.searchPosition, searchConfiguration = config.searchConfiguration, searchOpenAtStart = config.searchOpenAtStart;
                        return [4 /*yield*/, promiseUtils_1.eachAlways([new Promise(function (resolve_9, reject_9) { require(["esri/widgets/Search"], resolve_9, reject_9); }).then(__importStar), new Promise(function (resolve_10, reject_10) { require(["esri/layers/FeatureLayer"], resolve_10, reject_10); }).then(__importStar), new Promise(function (resolve_11, reject_11) { require(["esri/widgets/Expand"], resolve_11, reject_11); }).then(__importStar)])];
                    case 1:
                        modules = _b.sent();
                        _a = modules.map(function (module) { return module.value; }), Search = _a[0], FeatureLayer = _a[1], Expand = _a[2];
                        node = view.ui.find("searchExpand");
                        if (!Search || !FeatureLayer || !Expand)
                            return [2 /*return*/];
                        if (!search) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        if (propertyName === "searchPosition" && node) {
                            // move the node if it exists we have to type as any here 
                            // due to a doc issue with move once index is doc'd remove 
                            view.ui.move({ component: node, position: searchPosition, index: 0 });
                        }
                        else if (propertyName === "searchOpenAtStart" && node) {
                            node.expanded = searchOpenAtStart;
                        }
                        else if (propertyName === "search" || (propertyName === "searchConfiguration" && node)) {
                            if (node)
                                view.ui.remove(node);
                            sources = searchConfiguration === null || searchConfiguration === void 0 ? void 0 : searchConfiguration.sources;
                            if (sources) {
                                sources.forEach(function (source) {
                                    var _a, _b;
                                    if ((_a = source === null || source === void 0 ? void 0 : source.layer) === null || _a === void 0 ? void 0 : _a.url) {
                                        source.layer = new FeatureLayer.default((_b = source === null || source === void 0 ? void 0 : source.layer) === null || _b === void 0 ? void 0 : _b.url);
                                    }
                                });
                            }
                            content = new Search.default(__assign({ view: view,
                                portal: portal }, searchConfiguration));
                            searchExpand = new Expand.default({
                                expanded: searchOpenAtStart,
                                id: "searchExpand",
                                content: content,
                                mode: "floating",
                                view: view
                            });
                            view.ui.add({ component: searchExpand, position: searchPosition, index: 0 });
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addSearch = addSearch;
    function addShare(props) {
        return __awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, share, shareIncludeSocial, header, theme, modules, _a, Share, ShareFeatures, node, shareFeatures, container, shareWidget, container;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        share = config.share, shareIncludeSocial = config.shareIncludeSocial, header = config.header, theme = config.theme;
                        return [4 /*yield*/, promiseUtils_1.eachAlways([new Promise(function (resolve_12, reject_12) { require(["../ui/Share/Share"], resolve_12, reject_12); }).then(__importStar), new Promise(function (resolve_13, reject_13) { require(["../ui/Share/Share/ShareFeatures"], resolve_13, reject_13); }).then(__importStar)])];
                    case 1:
                        modules = _b.sent();
                        _a = modules.map(function (module) { return module.value; }), Share = _a[0], ShareFeatures = _a[1];
                        node = view.ui.find("shareMap");
                        if (!Share && !ShareFeatures)
                            return [2 /*return*/];
                        // Remove the widget if share isdisabled or if header is enabled
                        if (!share || (header && node)) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        // Only add sharing to view if header is false 
                        if ((propertyName === "share" || propertyName === "header") && !header && !node) {
                            shareFeatures = new ShareFeatures.default({
                                copyToClipboard: true,
                                embedMap: false,
                                shareServices: shareIncludeSocial
                            });
                            container = document.createElement("div");
                            container.classList.add("esri-map-share");
                            container.classList.add(theme);
                            container.id = "shareMap";
                            shareWidget = new Share.default({
                                view: view,
                                shareFeatures: shareFeatures,
                                container: container,
                                isDefault: true
                            });
                            view.ui.add(shareWidget, "top-right");
                        }
                        else if (propertyName === "shareIncludeSocial" && node) {
                            node.shareFeatures.shareServices = shareIncludeSocial;
                        }
                        else if (propertyName === "theme") {
                            // Change view theme 
                            if (node)
                                node.theme = theme;
                            container = document.getElementsByClassName("esri-map-share");
                            if ((container === null || container === void 0 ? void 0 : container.length) > 0) {
                                container[0].classList.remove(theme === "dark" ? "light" : "dark");
                                container[0].classList.add(theme);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addShare = addShare;
});
//# sourceMappingURL=esriWidgetUtils.js.map