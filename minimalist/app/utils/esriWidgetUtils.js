define(["require", "exports", "tslib", "esri/core/promiseUtils", "esri/widgets/Expand", "dojo/i18n!../nls/resources", "TemplatesCommonLib/functionality/basemapToggle", "esri/geometry/support/jsonUtils"], function (require, exports, tslib_1, promiseUtils_1, Expand_1, i18n, basemapToggle_1, jsonUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addShare = exports.addSearch = exports.addBookmarks = exports.addScaleBar = exports.addScreenshot = exports.addZoom = exports.addHome = exports.addOverlay = exports.addBasemap = void 0;
    Expand_1 = tslib_1.__importDefault(Expand_1);
    function addBasemap(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, basemapTogglePosition, basemapToggle, node, _a, originalBasemap, nextBasemap, BasemapToggle, bmToggle;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        basemapTogglePosition = config.basemapTogglePosition, basemapToggle = config.basemapToggle;
                        node = view.ui.find("basemapWidget");
                        return [4 /*yield*/, basemapToggle_1.getBasemaps(props)];
                    case 1:
                        _a = _b.sent(), originalBasemap = _a.originalBasemap, nextBasemap = _a.nextBasemap;
                        // If basemapToggle isn't enabled remove the widget if it exists and exit 
                        if (!basemapToggle) {
                            if (node) {
                                view.ui.remove(node);
                                node.destroy();
                            }
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require(["esri/widgets/BasemapToggle"], resolve_1, reject_1); }).then(tslib_1.__importStar)];
                    case 2:
                        BasemapToggle = _b.sent();
                        if (!BasemapToggle)
                            return [2 /*return*/];
                        // Move the basemap toggle widget if it exists 
                        if (propertyName === "basemapTogglePosition" && node) {
                            view.ui.move(node, basemapTogglePosition);
                        }
                        // Add the basemap toggle widget if its enabled or if a different basemap was 
                        // specified
                        if (propertyName === "basemapToggle" && !node) {
                            bmToggle = new BasemapToggle.default({
                                view: view,
                                nextBasemap: nextBasemap,
                                id: "basemapWidget"
                            });
                            basemapToggle_1.resetBasemapsInToggle(bmToggle, originalBasemap, nextBasemap);
                            view.ui.add(bmToggle, basemapTogglePosition);
                        }
                        else if (node && (propertyName === "nextBasemap" || propertyName === "basemapSelector")) {
                            if (propertyName === "nextBasemap" || propertyName === "basemapSelector") {
                                basemapToggle_1.resetBasemapsInToggle(node, originalBasemap, nextBasemap);
                            }
                        }
                        return [2 /*return*/];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var Basemap, basemap;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve_2, reject_2) { require(["esri/Basemap"], resolve_2, reject_2); }).then(tslib_1.__importStar)];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, disableScroll, node, ScrollOverlay, overlay;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, config = props.config;
                        disableScroll = config.disableScroll;
                        node = _findNode("scroll-overlay");
                        if (!!disableScroll) return [3 /*break*/, 1];
                        if (node)
                            view.ui.remove(node);
                        // update view nav 
                        view.navigation.mouseWheelZoomEnabled = true;
                        view.navigation.browserTouchPanEnabled = true;
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, new Promise(function (resolve_3, reject_3) { require(["../ui/ScrollOverlay"], resolve_3, reject_3); }).then(tslib_1.__importStar)];
                    case 2:
                        ScrollOverlay = _a.sent();
                        overlay = new ScrollOverlay.default(tslib_1.__assign(tslib_1.__assign({}, props), { container: document.createElement("div") }));
                        view.ui.add(overlay, "manual");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    exports.addOverlay = addOverlay;
    function addHome(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, home, homePosition, node, Home;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        home = config.home, homePosition = config.homePosition;
                        node = _findNode("esri-home");
                        if (!home) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new Promise(function (resolve_4, reject_4) { require(["esri/widgets/Home"], resolve_4, reject_4); }).then(tslib_1.__importStar)];
                    case 1:
                        Home = _a.sent();
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, mapZoom, mapZoomPosition, node, Zoom;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        mapZoom = config.mapZoom, mapZoomPosition = config.mapZoomPosition;
                        node = _findNode("esri-zoom");
                        if (!mapZoom) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        if (node && !mapZoom)
                            view.ui.remove(node);
                        return [4 /*yield*/, new Promise(function (resolve_5, reject_5) { require(["esri/widgets/Zoom"], resolve_5, reject_5); }).then(tslib_1.__importStar)];
                    case 1:
                        Zoom = _a.sent();
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
    function addScreenshot(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, screenshot, screenshotPosition, legendPanel, popupPanel, popupHover, node, Screenshot, group, content, tip, screenshotExpand;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        screenshot = config.screenshot, screenshotPosition = config.screenshotPosition, legendPanel = config.legendPanel, popupPanel = config.popupPanel, popupHover = config.popupHover;
                        node = view.ui.find("screenshotExpand");
                        if (!screenshot) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new Promise(function (resolve_6, reject_6) { require(["Components/Screenshot/Screenshot"], resolve_6, reject_6); }).then(tslib_1.__importStar)];
                    case 1:
                        Screenshot = _a.sent();
                        group = _getPosition(screenshotPosition);
                        if (propertyName === "screenshotPosition" && node) {
                            view.ui.move(node, screenshotPosition);
                            node.group = group;
                        }
                        else if (propertyName === "screenshot") {
                            content = new Screenshot.default({
                                view: view,
                                enableLegendOption: false,
                                enablePopupOption: (popupPanel || popupHover) ? false : true,
                                includeLayoutOption: (popupPanel || popupHover) ? false : true,
                                includePopupInScreenshot: false,
                                includeLegendInScreenshot: false
                            });
                            tip = i18n.tools.toggle + " " + i18n.tools.screenshot;
                            screenshotExpand = new Expand_1.default({
                                id: "screenshotExpand",
                                content: content,
                                group: group,
                                mode: "floating",
                                expandTooltip: tip,
                                collapseTooltip: tip,
                                view: view
                            });
                            view.ui.add(screenshotExpand, screenshotPosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addScreenshot = addScreenshot;
    function addScaleBar(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, portal, config, propertyName, scalebar, scalebarPosition, node, ScaleBar;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = props.view, portal = props.portal, config = props.config, propertyName = props.propertyName;
                        scalebar = config.scalebar, scalebarPosition = config.scalebarPosition;
                        node = _findNode("esri-scale-bar");
                        if (!scalebar) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, new Promise(function (resolve_7, reject_7) { require(["esri/widgets/ScaleBar"], resolve_7, reject_7); }).then(tslib_1.__importStar)];
                    case 1:
                        ScaleBar = _a.sent();
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, bookmarks, bookmarksPosition, bookmarkThumbnail, node, map, mapContainsBookmarks, modules, _b, Bookmarks, Expand, group, content, tip, bookmarksExpand, bm;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        bookmarks = config.bookmarks, bookmarksPosition = config.bookmarksPosition, bookmarkThumbnail = config.bookmarkThumbnail;
                        node = view.ui.find("bookmarksExpand");
                        map = view.map;
                        mapContainsBookmarks = ((_a = map === null || map === void 0 ? void 0 : map.bookmarks) === null || _a === void 0 ? void 0 : _a.length) > 0 ? true : false;
                        if (!bookmarks || !mapContainsBookmarks) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, promiseUtils_1.eachAlways([new Promise(function (resolve_8, reject_8) { require(["esri/widgets/Bookmarks"], resolve_8, reject_8); }).then(tslib_1.__importStar), new Promise(function (resolve_9, reject_9) { require(["esri/widgets/Expand"], resolve_9, reject_9); }).then(tslib_1.__importStar)])];
                    case 1:
                        modules = _c.sent();
                        _b = modules.map(function (module) { return module.value; }), Bookmarks = _b[0], Expand = _b[1];
                        group = _getPosition(bookmarksPosition);
                        if (propertyName === "bookmarksPosition" && node) {
                            view.ui.move(node, bookmarksPosition);
                            node.group = group;
                        }
                        else if (propertyName === "bookmarks") {
                            content = new Bookmarks.default({
                                view: view,
                                visibleElements: {
                                    thumbnail: bookmarkThumbnail === false ? false : true
                                }
                            });
                            tip = i18n.tools.toggle + " " + i18n.tools.bookmarks;
                            bookmarksExpand = new Expand.default({
                                id: "bookmarksExpand",
                                content: content,
                                group: group,
                                mode: "floating",
                                expandTooltip: tip,
                                collapseTooltip: tip,
                                view: view
                            });
                            view.ui.add(bookmarksExpand, bookmarksPosition);
                        }
                        else if (propertyName === "bookmarkThumbnail" && node) {
                            bm = node.content;
                            if (bm === null || bm === void 0 ? void 0 : bm.visibleElements)
                                bm.visibleElements = { thumbnail: bookmarkThumbnail };
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addBookmarks = addBookmarks;
    function addSearch(props) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, portal, config, propertyName, search, searchPosition, searchConfiguration, searchOpenAtStart, extentSelector, extentSelectorConfig, node, modules, _b, Search, FeatureLayer, Expand, group, sources, extent_1, geometry, content, tip, searchExpand;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        view = props.view, portal = props.portal, config = props.config, propertyName = props.propertyName;
                        search = config.search, searchPosition = config.searchPosition, searchConfiguration = config.searchConfiguration, searchOpenAtStart = config.searchOpenAtStart, extentSelector = config.extentSelector, extentSelectorConfig = config.extentSelectorConfig;
                        node = view.ui.find("searchExpand");
                        if (!search) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, promiseUtils_1.eachAlways([new Promise(function (resolve_10, reject_10) { require(["esri/widgets/Search"], resolve_10, reject_10); }).then(tslib_1.__importStar), new Promise(function (resolve_11, reject_11) { require(["esri/layers/FeatureLayer"], resolve_11, reject_11); }).then(tslib_1.__importStar), new Promise(function (resolve_12, reject_12) { require(["esri/widgets/Expand"], resolve_12, reject_12); }).then(tslib_1.__importStar)])];
                    case 1:
                        modules = _c.sent();
                        _b = modules.map(function (module) { return module.value; }), Search = _b[0], FeatureLayer = _b[1], Expand = _b[2];
                        if (!Search || !FeatureLayer || !Expand)
                            return [2 /*return*/];
                        group = _getPosition(searchPosition);
                        if (propertyName === "searchPosition" && node) {
                            // move the node if it exists we have to type as any here 
                            // due to a doc issue with move once index is doc'd remove 
                            view.ui.move(node, searchPosition);
                            node.group = group;
                        }
                        else if (propertyName === "searchOpenAtStart" && node) {
                            node.expanded = searchOpenAtStart;
                        }
                        else if (propertyName === "search" || (propertyName === "extentSelector" && node) || (node && propertyName === "extentSelector") || (propertyName === "searchConfiguration" && node)) {
                            if (node)
                                view.ui.remove(node);
                            sources = searchConfiguration === null || searchConfiguration === void 0 ? void 0 : searchConfiguration.sources;
                            if (sources) {
                                extent_1 = null;
                                if (extentSelector) {
                                    geometry = ((_a = extentSelectorConfig === null || extentSelectorConfig === void 0 ? void 0 : extentSelectorConfig.constraints) === null || _a === void 0 ? void 0 : _a.geometry) || null;
                                    if (geometry) {
                                        extent_1 = jsonUtils_1.fromJSON(geometry);
                                    }
                                }
                                sources.forEach(function (source) {
                                    var _a, _b, _c;
                                    var sourceLayer = null;
                                    if ((_a = source === null || source === void 0 ? void 0 : source.layer) === null || _a === void 0 ? void 0 : _a.id)
                                        sourceLayer = view.map.findLayerById(source.layer.id);
                                    if (!sourceLayer && ((_b = source === null || source === void 0 ? void 0 : source.layer) === null || _b === void 0 ? void 0 : _b.url)) {
                                        sourceLayer = new FeatureLayer.default((_c = source === null || source === void 0 ? void 0 : source.layer) === null || _c === void 0 ? void 0 : _c.url);
                                    }
                                    source.outFields = ["*"];
                                    source.layer = sourceLayer;
                                    if (extent_1 && ((extent_1 === null || extent_1 === void 0 ? void 0 : extent_1.type) === "extent" || (extent_1 === null || extent_1 === void 0 ? void 0 : extent_1.type) === "polygon")) {
                                        source.filter = {
                                            geometry: extent_1
                                        };
                                    }
                                    else {
                                        source.filter = null;
                                    }
                                });
                            }
                            content = new Search.default(tslib_1.__assign({ view: view,
                                portal: portal }, searchConfiguration));
                            tip = i18n.tools.toggle + " " + i18n.tools.search;
                            searchExpand = new Expand.default({
                                expanded: searchOpenAtStart,
                                id: "searchExpand",
                                content: content,
                                group: group,
                                collapseTooltip: tip,
                                expandTooltip: tip,
                                mode: "floating",
                                view: view
                            });
                            view.ui.add(searchExpand, searchPosition);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.addSearch = addSearch;
    function addShare(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var view, config, propertyName, share, shareIncludeSocial, header, theme, node, modules, _a, Share, ShareFeatures, shareFeatures, container, shareWidget, container;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = props.view, config = props.config, propertyName = props.propertyName;
                        share = config.share, shareIncludeSocial = config.shareIncludeSocial, header = config.header, theme = config.theme;
                        node = view.ui.find("shareMap");
                        // Remove the widget if share isdisabled or if header is enabled
                        if (!share || (header && node)) {
                            if (node)
                                view.ui.remove(node);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, promiseUtils_1.eachAlways([new Promise(function (resolve_13, reject_13) { require(["../ui/Share/Share"], resolve_13, reject_13); }).then(tslib_1.__importStar), new Promise(function (resolve_14, reject_14) { require(["../ui/Share/Share/ShareFeatures"], resolve_14, reject_14); }).then(tslib_1.__importStar)])];
                    case 1:
                        modules = _b.sent();
                        _a = modules.map(function (module) { return module.value; }), Share = _a[0], ShareFeatures = _a[1];
                        if (!Share && !ShareFeatures)
                            return [2 /*return*/];
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
                                config: config,
                                view: view,
                                shareFeatures: shareFeatures,
                                theme: theme,
                                container: container,
                                isDefault: true
                            });
                            if (!view.ui.find("shareMap")) {
                                view.ui.add(shareWidget, "top-right");
                            }
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
    function _getPosition(position) {
        // object or string 
        var groupName = null;
        if (typeof position === "string") {
            groupName = position;
        }
        else if (position === null || position === void 0 ? void 0 : position.position) {
            groupName = position.position;
        }
        return groupName;
    }
});
