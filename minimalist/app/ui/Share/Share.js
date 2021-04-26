// Copyright 2019 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.​
define(["require", "exports", "tslib", "dojo/i18n!./Share/nls/resources", "esri/core/watchUtils", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "../icons/icons", "./utils/replace", "esri/widgets/Widget", "./Share/ShareViewModel", "esri/core/Handles"], function (require, exports, tslib_1, i18n, watchUtils, widget_1, decorators_1, icons_1, replace_1, Widget, ShareViewModel, Handles) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    //----------------------------------
    //
    //  CSS Classes
    //
    //----------------------------------
    var CSS = {
        base: "esri-share",
        shareModalStyles: "esri-share__share-modal",
        shareButton: "esri-share__share-button",
        shareLinkContainer: "esri-share__share-link",
        sendLinkContainer: "esri-share__send-link-container",
        mainLinkContainer: "esri-share__main-link-container",
        shareLinkIsOpen: "esri-share__share-link--open",
        shareModal: {
            close: "esri-share__close",
            shareIframe: {
                iframeContainer: "esri-share__iframe-container",
                iframeTabSectionContainer: "esri-share__iframe-tab-section-container",
                iframeInputContainer: "esri-share__iframe-input-container",
                iframePreview: "esri-share__iframe-preview",
                iframeInput: "esri-share__iframe-input",
                embedContentContainer: "esri-share__embed-content-container"
            },
            shareTabStyles: {
                tabSection: "esri-share__tab-section",
                iframeTab: "esri-share__iframe-tab-section"
            },
            header: {
                container: "esri-share__header-container",
                heading: "esri-share__heading"
            },
            main: {
                mainContainer: "esri-share__main-container",
                mainHeader: "esri-share__main-header",
                mainHR: "esri-share__hr",
                mainCopy: {
                    copyButton: "esri-share__copy-button",
                    copyContainer: "esri-share__copy-container",
                    copyClipboardUrl: "esri-share__copy-clipboard-url",
                    copyClipboardContainer: "esri-share__copy-clipboard-container",
                    copyClipboardIframe: "esri-share__copy-clipboard-iframe"
                },
                mainUrl: {
                    inputGroup: "esri-share__copy-url-group",
                    urlInput: "esri-share__url-input",
                    linkGenerating: "esri-share--link-generating"
                },
                mainShare: {
                    shareContainer: "esri-share__share-container",
                    shareItem: "esri-share__share-item",
                    shareItemContainer: "esri-share__share-item-container",
                    shareIcons: {
                        facebook: widget_1.tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 30 30" },
                            widget_1.tsx("path", { fill: "#FFF", d: "M22.117 7H7.883A.883.883 0 0 0 7 7.883v14.234c0 .487.396.883.883.883H15v-7h-3v-2h3v-.992c0-2.066 1.277-3.192 3.121-3.192.883 0 1.879.066 1.879.096V12h-1.764c-1.002 0-1.236.148-1.236.848V14h2.73l-.911 2H17v7h5.117a.884.884 0 0 0 .883-.883V7.883A.883.883 0 0 0 22.117 7z" })),
                        twitter: widget_1.tsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 30 30" },
                            widget_1.tsx("path", { fill: "#FFF", d: "M23.156 11.495c.007.158.012.319.012.479 0 4.878-3.717 10.505-10.508 10.505-2.085 0-4.027-.61-5.66-1.658a7.41 7.41 0 0 0 5.466-1.529 3.695 3.695 0 0 1-3.449-2.564 3.621 3.621 0 0 0 1.667-.062 3.697 3.697 0 0 1-2.962-3.621v-.048a3.683 3.683 0 0 0 1.672.463 3.693 3.693 0 0 1-1.143-4.93 10.486 10.486 0 0 0 7.611 3.858 3.691 3.691 0 0 1 6.292-3.367 7.458 7.458 0 0 0 2.345-.896 3.699 3.699 0 0 1-1.624 2.043 7.427 7.427 0 0 0 2.123-.582 7.545 7.545 0 0 1-1.842 1.909z" }))
                    }
                },
                mainInputLabel: "esri-share__input-label"
            },
            calciteStyles: {
                modifier: "modifier-class",
                isActive: "is-active",
                tooltip: "tooltip",
                tooltipTop: "tooltip-top"
            }
        },
        icons: {
            linkIcon: widget_1.tsx("svg", { width: "16", height: "16", viewBox: "0 0 30 30" },
                widget_1.tsx("path", { d: "M28.633 17.945l-4.118-4.426c.076 1.131-.034 2.262-.355 3.241l2.83 2.827a5.281 5.281 0 0 1 0 7.459 5.223 5.223 0 0 1-3.723 1.54 5.227 5.227 0 0 1-3.728-1.542l-5.459-5.459a5.276 5.276 0 0 1 0-7.452c.607-.609 1.361-1.048 2.1-1.229a1.833 1.833 0 0 0-.279-.414l-1.344-1.461c-.845.404-1.54.881-2.12 1.461a7.554 7.554 0 0 0-2.223 5.371c0 2.027.791 3.934 2.223 5.366l5.459 5.459a7.544 7.544 0 0 0 5.371 2.225 7.55 7.55 0 0 0 5.366-2.223c2.962-2.962 2.962-7.782 0-10.745zM8.711 3.497a5.23 5.23 0 0 1 3.726 1.54l5.459 5.457a5.279 5.279 0 0 1 0 7.454c-.605.605-1.356 1.043-2.105 1.222.086.154.166.301.287.421l1.422 1.422c.808-.394 1.476-.862 2.039-1.422 2.96-2.962 2.96-7.777 0-10.74L14.08 3.394c-1.434-1.435-3.342-2.225-5.369-2.225s-3.934.791-5.369 2.225C1.908 4.828 1.117 6.736 1.117 8.763s.791 3.934 2.225 5.369L7.46 18.56c-.076-1.131.034-2.262.355-3.239l-2.83-2.833c-.994-.991-1.542-2.316-1.542-3.726s.548-2.732 1.542-3.726a5.23 5.23 0 0 1 3.726-1.54z" })),
            copyIcon: widget_1.tsx("svg", { width: "30", height: "30", viewBox: "0 0 30 30" },
                widget_1.tsx("path", { d: "" })),
            widgetIcon: "esri-icon-share",
            copyIconContainer: "esri-share__copy-icon-container",
            copy: "esri-share__copy-icon",
            esriLoader: "esri-share__loader",
            closeIcon: "icon-ui-close",
            //copyToClipboardIcon: "copy-to-clipboard",
            flush: "icon-ui-flush",
            link: "icon-ui-link"
        },
        // CUSTOM
        shareModalPhoto: "esri-share__share-modal--photo",
        modalContainerPhoto: "esri-share__modal-container--photo",
        shareItemContainerPhoto: "esri-share__share-item-container--photo",
        shareCopyIconSVG: "esri-share__copy-icon-svg"
    };
    var Share = /** @class */ (function (_super) {
        tslib_1.__extends(Share, _super);
        function Share(value) {
            var _this = _super.call(this, value) || this;
            //----------------------------------
            //
            //  Private Variables
            //
            //----------------------------------
            _this._shareLinkElementIsOpen = null;
            _this._handles = new Handles();
            // Tooltips
            _this._linkCopied = false;
            _this._extentHandler = null;
            //  DOM Nodes //
            // URL Input & Iframe Input
            _this._urlInputNode = null;
            _this.iconScale = "m";
            //----------------------------------
            //
            //  view
            //
            //----------------------------------
            _this.view = null;
            _this.config = null;
            //----------------------------------
            //
            //  shareModalOpened
            //
            //----------------------------------
            _this.shareModalOpened = true;
            //----------------------------------
            //
            //  shareItems
            //
            //----------------------------------
            _this.shareItems = null;
            //----------------------------------
            //
            //  shareFeatures
            //
            //----------------------------------
            _this.shareFeatures = null;
            //----------------------------------
            //
            //  shareUrl - readOnly
            //
            //----------------------------------
            _this.shareUrl = null;
            //----------------------------------
            //
            //  defaultObjectId
            //
            //----------------------------------
            _this.defaultObjectId = null;
            //----------------------------------
            //
            //  selectedLayerId
            //
            //----------------------------------
            _this.selectedLayerId = null;
            //----------------------------------
            //
            //  attachmentIndex
            //
            //----------------------------------
            _this.attachmentIndex = null;
            //----------------------------------
            //
            //  isDefault
            //
            //----------------------------------
            _this.isDefault = null;
            //----------------------------------
            //
            //  iconClass and label - Expand Widget Support
            //
            //----------------------------------
            _this.iconClass = CSS.icons.widgetIcon;
            _this.label = i18n.widgetLabel;
            //----------------------------------
            //
            //  viewModel
            //
            //----------------------------------
            _this.viewModel = new ShareViewModel();
            return _this;
        }
        //----------------------------------
        //
        //  Lifecycle
        //
        //----------------------------------
        Share.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils.whenTrue(this, "view.ready", function () {
                    _this.own([
                        watchUtils.watch(_this, "shareUrl", function () {
                            _this.scheduleRender();
                        }),
                        watchUtils.watch(_this, "theme", function () {
                            _this.scheduleRender();
                        })
                    ]);
                }),
                watchUtils.watch(this, ["defaultObjectId", "attachmentIndex"], function () {
                    _this._removeCopyTooltips();
                })
            ]);
            this._extentHandler = watchUtils.pausable(this.view, "extent", function () {
                //update the url when the extent changes
                _this._generateUrl();
            });
            this._extentHandler.pause();
        };
        Share.prototype.destroy = function () {
            //this._iframeInputNode = null;
            this._urlInputNode = null;
        };
        Share.prototype.render = function () {
            var shareModalNode = this._renderShareModal();
            return widget_1.tsx("div", { class: CSS.base }, shareModalNode);
        };
        Share.prototype._copyUrlInput = function () {
            this._urlInputNode.focus();
            this._urlInputNode.setSelectionRange(0, this._urlInputNode.value.length);
            document.execCommand("copy");
            this._linkCopied = true;
            this.scheduleRender();
        };
        Share.prototype._toggleShareLinkNode = function () {
            var _a, _b;
            if (!this._shareLinkElementIsOpen) {
                this._shareLinkElementIsOpen = true;
                this._generateUrl();
                (_a = this._extentHandler) === null || _a === void 0 ? void 0 : _a.resume();
            }
            else {
                this._shareLinkElementIsOpen = false;
                this._removeCopyTooltips();
                (_b = this._extentHandler) === null || _b === void 0 ? void 0 : _b.pause();
            }
            this.scheduleRender();
        };
        Share.prototype._processShareItem = function (event) {
            var _this = this;
            var shareKey = "share-key";
            if (this.isDefault) {
                this._generateUrl();
            }
            this._handles.add(watchUtils.whenOnce(this, "shareUrl", function () {
                _this._handles.remove(shareKey);
                var node = event.srcElement;
                var shareItem = node["data-share-item"] || node.parentNode["data-share-item"] || node.parentNode.parentNode["data-share-item"];
                if (!shareItem)
                    return;
                var urlTemplate = shareItem.urlTemplate;
                var portalItem = _this.get("view.map.portalItem");
                var title = portalItem
                    ? replace_1.replace(i18n.urlTitle, { title: portalItem.title })
                    : null;
                var summary = portalItem
                    ? portalItem && portalItem.snippet
                        ? replace_1.replace(i18n.urlSummary, { summary: portalItem.snippet })
                        : replace_1.replace(i18n.urlSummary, { summary: "" })
                    : null;
                _this._openUrl(_this.shareUrl, title, summary, urlTemplate);
            }), shareKey);
        };
        Share.prototype._generateUrl = function () {
            this.viewModel.generateUrl();
        };
        Share.prototype._removeCopyTooltips = function () {
            this._linkCopied = false;
            this.scheduleRender();
        };
        Share.prototype._openUrl = function (url, title, summary, urlTemplate) {
            var urlToOpen = replace_1.replace(urlTemplate, {
                url: encodeURI(url),
                title: title,
                summary: summary
            });
            window.open(urlToOpen);
        };
        // Render Nodes
        Share.prototype._renderShareModal = function () {
            var modalContainerNode = this._renderModalContainer();
            return widget_1.tsx("div", { class: CSS.shareModalPhoto }, modalContainerNode);
        };
        Share.prototype._renderModalContainer = function () {
            var modalContentNode = this._renderModalContent();
            return widget_1.tsx("div", { class: CSS.modalContainerPhoto }, modalContentNode);
        };
        Share.prototype._renderModalContent = function () {
            var sendALinkContentNode = this._renderSendALinkContent();
            return (widget_1.tsx("div", { class: CSS.shareModal.main.mainContainer }, sendALinkContentNode));
        };
        Share.prototype._renderShareItem = function (shareItem) {
            var name = shareItem.name, className = shareItem.className, svg = shareItem.svg;
            return (widget_1.tsx("div", { class: this.classes(CSS.shareModal.main.mainShare.shareItem, name), key: name },
                widget_1.tsx("button", { class: this.classes(className, CSS.shareButton), title: name, "aria-label": name, scale: this.iconScale, theme: this.theme, onclick: this._processShareItem, onkeydown: this._processShareItem, bind: this, appearance: "transparent", "data-share-item": shareItem }, svg)));
        };
        Share.prototype._renderShareItems = function () {
            var _this = this;
            var shareServices = this.shareItems;
            var shareIcons = CSS.shareModal.main.mainShare.shareIcons;
            // Assign class names of icons to share item
            shareServices.forEach(function (shareItem) {
                for (var icon in shareIcons) {
                    if (icon === shareItem.id) {
                        shareItem.svg = shareIcons[shareItem.id];
                    }
                }
            });
            return shareServices
                .toArray()
                .map(function (shareItems) { return _this._renderShareItem(shareItems); });
        };
        Share.prototype._renderShareItemContainer = function () {
            var shareServices = this.shareFeatures.shareServices;
            var shareItemNodes = shareServices ? this._renderShareItems() : null;
            var shareItemNode = shareServices
                ? shareItemNodes.length
                    ? [shareItemNodes]
                    : null
                : null;
            var shareLink = this._renderShareLinkNode();
            return (widget_1.tsx("div", { class: CSS.shareItemContainerPhoto }, shareServices || shareLink ? (widget_1.tsx("div", { class: CSS.shareModal.main.mainShare.shareContainer, key: "share-container" },
                widget_1.tsx("div", { class: CSS.shareModal.main.mainShare.shareItemContainer },
                    shareItemNode,
                    shareLink))) : null));
        };
        // todo continue link style and also fix copy button also test light/dark/shared 
        Share.prototype._renderShareLinkNode = function () {
            var _a;
            var shareLink = (_a = {},
                _a[CSS.shareLinkIsOpen] = this._shareLinkElementIsOpen,
                _a);
            return (widget_1.tsx("div", { class: this.classes(CSS.shareModal.main.mainShare.shareItem) },
                widget_1.tsx("button", { bind: this, onclick: this._toggleShareLinkNode, onkeydown: this._toggleShareLinkNode, class: this.classes(CSS.shareButton), scale: this.iconScale, theme: this.theme, title: i18n.sendLink, "aria-label": i18n.sendLink, appearance: "transparent" }, CSS.icons.linkIcon)));
        };
        Share.prototype._renderCopyUrl = function () {
            var _a;
            var copyToClipboard = this.shareFeatures.copyToClipboard;
            var toolTipClasses = (_a = {},
                _a[CSS.shareModal.calciteStyles.tooltip] = this._linkCopied,
                _a[CSS.shareModal.calciteStyles.tooltipTop] = this._linkCopied,
                _a);
            return (widget_1.tsx("div", { key: "send-link-container", class: CSS.sendLinkContainer }, copyToClipboard ? (widget_1.tsx("div", { class: CSS.shareModal.main.mainCopy.copyContainer, key: "copy-container" },
                widget_1.tsx("div", { class: CSS.shareModal.main.mainUrl.inputGroup },
                    widget_1.tsx("div", { bind: this, onclick: this._toggleShareLinkNode, onkeydown: this._toggleShareLinkNode, class: this.classes(CSS.shareModal.close, CSS.icons.closeIcon, CSS.icons.flush), title: i18n.close, label: i18n.close, "aria-label": "close-modal", tabindex: "0" }),
                    widget_1.tsx("div", { class: CSS.shareModal.main.mainCopy.copyClipboardContainer },
                        widget_1.tsx("input", { type: "text", class: CSS.shareModal.main.mainUrl.urlInput, bind: this, value: this.viewModel.state === "ready"
                                ? this.shareUrl
                                : i18n.loading + "...", afterCreate: widget_1.storeNode, "data-node-ref": "_urlInputNode", readOnly: true }),
                        widget_1.tsx("button", { class: this.classes(CSS.shareButton, CSS.shareModal.main.mainCopy.copyClipboardUrl, toolTipClasses), theme: this.theme, scale: "s", bind: this, onclick: this._copyUrlInput, onkeydown: this._copyUrlInput, title: i18n.clipboard, label: i18n.clipboard, "aria-label": i18n.copied, apperance: "clear" },
                            widget_1.tsx("calcite-icon", { class: "copy-share-icon", scale: "s", theme: this.theme, icon: icons_1.default["copy"] })))))) : null));
        };
        Share.prototype._renderSendALinkContent = function () {
            var copyUrlNode = this._renderCopyUrl();
            var shareServicesNode = this._renderShareItemContainer();
            return (widget_1.tsx("article", { class: CSS.mainLinkContainer },
                shareServicesNode,
                this._shareLinkElementIsOpen ? copyUrlNode : null));
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Share.prototype, "theme", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Share.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.config")
        ], Share.prototype, "config", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.shareModalOpened")
        ], Share.prototype, "shareModalOpened", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.shareItems")
        ], Share.prototype, "shareItems", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.shareFeatures")
        ], Share.prototype, "shareFeatures", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.shareUrl")
        ], Share.prototype, "shareUrl", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.defaultObjectId")
        ], Share.prototype, "defaultObjectId", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.selectedLayerId")
        ], Share.prototype, "selectedLayerId", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.attachmentIndex")
        ], Share.prototype, "attachmentIndex", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.isDefault")
        ], Share.prototype, "isDefault", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Share.prototype, "iconClass", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Share.prototype, "label", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: ShareViewModel
            })
        ], Share.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], Share.prototype, "_copyUrlInput", null);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], Share.prototype, "_toggleShareLinkNode", null);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], Share.prototype, "_processShareItem", null);
        Share = tslib_1.__decorate([
            decorators_1.subclass("Share")
        ], Share);
        return Share;
    }((Widget)));
    return Share;
});
