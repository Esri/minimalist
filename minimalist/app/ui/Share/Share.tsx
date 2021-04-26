
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

// dojo
import i18n = require("dojo/i18n!./Share/nls/resources");


// esri.core
import Collection = require("esri/core/Collection");
import watchUtils = require("esri/core/watchUtils");

//esri.widgets.support
import {
  accessibleHandler,
  storeNode,
  tsx
} from "esri/widgets/support/widget";
// esri.core.accessorSupport
import {
  aliasOf,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import icons from "../icons/icons";
import { replace } from "./utils/replace";

// esri.views
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

// esri.widgets
import Widget = require("esri/widgets/Widget");


// View Model
import ShareViewModel = require("./Share/ShareViewModel");

// Share Item
import ShareItem = require("./Share/ShareItem");

// ShareFeatures
import ShareFeatures = require("./Share/ShareFeatures");

// PortalItem
import PortalItem = require("esri/portal/PortalItem");

// esri.coreHandles
import Handles = require("esri/core/Handles");
import { ApplicationConfig } from "ApplicationBase/interfaces";

//----------------------------------
//
//  CSS Classes
//
//----------------------------------

const CSS = {
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
          facebook: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path fill="#FFF" d="M22.117 7H7.883A.883.883 0 0 0 7 7.883v14.234c0 .487.396.883.883.883H15v-7h-3v-2h3v-.992c0-2.066 1.277-3.192 3.121-3.192.883 0 1.879.066 1.879.096V12h-1.764c-1.002 0-1.236.148-1.236.848V14h2.73l-.911 2H17v7h5.117a.884.884 0 0 0 .883-.883V7.883A.883.883 0 0 0 22.117 7z" /></svg>,
          twitter: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path fill="#FFF" d="M23.156 11.495c.007.158.012.319.012.479 0 4.878-3.717 10.505-10.508 10.505-2.085 0-4.027-.61-5.66-1.658a7.41 7.41 0 0 0 5.466-1.529 3.695 3.695 0 0 1-3.449-2.564 3.621 3.621 0 0 0 1.667-.062 3.697 3.697 0 0 1-2.962-3.621v-.048a3.683 3.683 0 0 0 1.672.463 3.693 3.693 0 0 1-1.143-4.93 10.486 10.486 0 0 0 7.611 3.858 3.691 3.691 0 0 1 6.292-3.367 7.458 7.458 0 0 0 2.345-.896 3.699 3.699 0 0 1-1.624 2.043 7.427 7.427 0 0 0 2.123-.582 7.545 7.545 0 0 1-1.842 1.909z" /></svg>
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
    linkIcon: <svg width="16" height="16" viewBox="0 0 30 30" ><path d="M28.633 17.945l-4.118-4.426c.076 1.131-.034 2.262-.355 3.241l2.83 2.827a5.281 5.281 0 0 1 0 7.459 5.223 5.223 0 0 1-3.723 1.54 5.227 5.227 0 0 1-3.728-1.542l-5.459-5.459a5.276 5.276 0 0 1 0-7.452c.607-.609 1.361-1.048 2.1-1.229a1.833 1.833 0 0 0-.279-.414l-1.344-1.461c-.845.404-1.54.881-2.12 1.461a7.554 7.554 0 0 0-2.223 5.371c0 2.027.791 3.934 2.223 5.366l5.459 5.459a7.544 7.544 0 0 0 5.371 2.225 7.55 7.55 0 0 0 5.366-2.223c2.962-2.962 2.962-7.782 0-10.745zM8.711 3.497a5.23 5.23 0 0 1 3.726 1.54l5.459 5.457a5.279 5.279 0 0 1 0 7.454c-.605.605-1.356 1.043-2.105 1.222.086.154.166.301.287.421l1.422 1.422c.808-.394 1.476-.862 2.039-1.422 2.96-2.962 2.96-7.777 0-10.74L14.08 3.394c-1.434-1.435-3.342-2.225-5.369-2.225s-3.934.791-5.369 2.225C1.908 4.828 1.117 6.736 1.117 8.763s.791 3.934 2.225 5.369L7.46 18.56c-.076-1.131.034-2.262.355-3.239l-2.83-2.833c-.994-.991-1.542-2.316-1.542-3.726s.548-2.732 1.542-3.726a5.23 5.23 0 0 1 3.726-1.54z" /></svg>,
    copyIcon: <svg width="30" height="30" viewBox="0 0 30 30"><path d=""></path></svg>,
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

@subclass("Share")
class Share extends (Widget) {
  constructor(value?: any) {
    super(value);
  }
  //----------------------------------
  //
  //  Private Variables
  //
  //----------------------------------

  private _shareLinkElementIsOpen: boolean = null;
  private _handles: Handles = new Handles();

  // Tooltips
  private _linkCopied = false;
  private _extentHandler: __esri.PausableWatchHandle = null;
  //  DOM Nodes //
  // URL Input & Iframe Input
  private _urlInputNode: HTMLInputElement = null;
  private iconScale = "m";

  //----------------------------------
  //
  //  Properties
  //
  //----------------------------------
  @property()
  theme: string;


  //----------------------------------
  //
  //  view
  //
  //----------------------------------

  @aliasOf("viewModel.view")
  view: MapView | SceneView = null;

  @aliasOf("viewModel.config")
  config: ApplicationConfig = null;



  //----------------------------------
  //
  //  shareModalOpened
  //
  //----------------------------------
  @aliasOf("viewModel.shareModalOpened")
  shareModalOpened: boolean = true;

  //----------------------------------
  //
  //  shareItems
  //
  //----------------------------------

  @aliasOf("viewModel.shareItems")
  shareItems: Collection<ShareItem> = null;

  //----------------------------------
  //
  //  shareFeatures
  //
  //----------------------------------
  @aliasOf("viewModel.shareFeatures")
  shareFeatures: ShareFeatures = null;

  //----------------------------------
  //
  //  shareUrl - readOnly
  //
  //----------------------------------

  @aliasOf("viewModel.shareUrl")
  shareUrl: string = null;

  //----------------------------------
  //
  //  defaultObjectId
  //
  //----------------------------------

  @aliasOf("viewModel.defaultObjectId")
  defaultObjectId: number = null;

  //----------------------------------
  //
  //  selectedLayerId
  //
  //----------------------------------

  @aliasOf("viewModel.selectedLayerId")
  selectedLayerId: string = null;

  //----------------------------------
  //
  //  attachmentIndex
  //
  //----------------------------------

  @aliasOf("viewModel.attachmentIndex")
  attachmentIndex: number = null;

  //----------------------------------
  //
  //  isDefault
  //
  //----------------------------------

  @aliasOf("viewModel.isDefault")
  isDefault: boolean = null;

  //----------------------------------
  //
  //  iconClass and label - Expand Widget Support
  //
  //----------------------------------

  @property()
  iconClass = CSS.icons.widgetIcon;
  @property()
  label = i18n.widgetLabel;

  //----------------------------------
  //
  //  viewModel
  //
  //----------------------------------

  @property({
    type: ShareViewModel
  })
  viewModel: ShareViewModel = new ShareViewModel();

  //----------------------------------
  //
  //  Lifecycle
  //
  //----------------------------------

  postInitialize() {
    this.own([
      watchUtils.whenTrue(this, "view.ready", () => {
        this.own([
          watchUtils.watch(this, "shareUrl", () => {
            this.scheduleRender();
          }),
          watchUtils.watch(this, "theme", () => {
            this.scheduleRender();
          })
        ]);
      }),
      watchUtils.watch(this, ["defaultObjectId", "attachmentIndex"], () => {
        this._removeCopyTooltips();
      })
    ]);
    this._extentHandler = watchUtils.pausable(this.view, "extent", () => {
      //update the url when the extent changes
      this._generateUrl();
    });
    this._extentHandler.pause();
  }

  destroy() {
    //this._iframeInputNode = null;
    this._urlInputNode = null;
  }

  render() {
    const shareModalNode = this._renderShareModal();
    return <div class={CSS.base}>{shareModalNode}</div>;
  }

  @accessibleHandler()
  private _copyUrlInput(): void {
    this._urlInputNode.focus();
    this._urlInputNode.setSelectionRange(0, this._urlInputNode.value.length);
    document.execCommand("copy");
    this._linkCopied = true;
    this.scheduleRender();
  }

  @accessibleHandler()
  private _toggleShareLinkNode(): void {
    if (!this._shareLinkElementIsOpen) {
      this._shareLinkElementIsOpen = true;
      this._generateUrl();
      this._extentHandler?.resume();
    } else {
      this._shareLinkElementIsOpen = false;
      this._removeCopyTooltips();
      this._extentHandler?.pause();
    }

    this.scheduleRender();
  }

  @accessibleHandler()
  private _processShareItem(event: Event): void {
    const shareKey = "share-key";
    if (this.isDefault) {
      this._generateUrl();
    }

    this._handles.add(
      watchUtils.whenOnce(this, "shareUrl", () => {
        this._handles.remove(shareKey);
        const node = event.srcElement as HTMLElement;

        const shareItem = node["data-share-item"] || node.parentNode["data-share-item"] || node.parentNode.parentNode["data-share-item"] as ShareItem;
        if (!shareItem) return;
        const { urlTemplate } = shareItem;
        const portalItem = this.get<PortalItem>("view.map.portalItem");
        const title = portalItem
          ? replace(i18n.urlTitle, { title: portalItem.title })
          : null;

        const summary = portalItem
          ? portalItem && portalItem.snippet
            ? replace(i18n.urlSummary, { summary: portalItem.snippet })
            : replace(i18n.urlSummary, { summary: "" })
          : null;
        this._openUrl(this.shareUrl, title, summary, urlTemplate);
      }),
      shareKey
    );
  }

  private _generateUrl(): void {
    this.viewModel.generateUrl();
  }

  private _removeCopyTooltips(): void {
    this._linkCopied = false;
    this.scheduleRender();
  }

  private _openUrl(
    url: string,
    title: string,
    summary: string,
    urlTemplate: string
  ): void {
    const urlToOpen = replace(urlTemplate, {
      url: encodeURI(url),
      title,
      summary
    });
    window.open(urlToOpen);
  }

  // Render Nodes
  private _renderShareModal(): any {
    const modalContainerNode = this._renderModalContainer();
    return <div class={CSS.shareModalPhoto}>{modalContainerNode}</div>;
  }

  private _renderModalContainer(): any {
    const modalContentNode = this._renderModalContent();
    return <div class={CSS.modalContainerPhoto}>{modalContentNode}</div>;
  }

  private _renderModalContent(): any {
    const sendALinkContentNode = this._renderSendALinkContent();
    return (
      <div class={CSS.shareModal.main.mainContainer}>
        {sendALinkContentNode}
      </div>
    );
  }

  private _renderShareItem(shareItem: ShareItem): any {
    const { name, className, svg } = shareItem;
    return (
      <div
        class={this.classes(CSS.shareModal.main.mainShare.shareItem, name)}
        key={name}
      >
        <button
          class={this.classes(className, CSS.shareButton)}
          title={name}
          aria-label={name}
          scale={this.iconScale}
          theme={this.theme}
          onclick={this._processShareItem}
          onkeydown={this._processShareItem}
          bind={this}
          appearance="transparent"
          data-share-item={shareItem}
        >
          {svg}
        </button>
      </div>
    );
  }

  private _renderShareItems(): any[] {
    const shareServices = this.shareItems;

    const { shareIcons } = CSS.shareModal.main.mainShare;
    // Assign class names of icons to share item
    shareServices.forEach((shareItem: ShareItem) => {
      for (const icon in shareIcons) {
        if (icon === shareItem.id) {
          shareItem.svg = shareIcons[shareItem.id];
        }
      }
    });

    return shareServices
      .toArray()
      .map(shareItems => this._renderShareItem(shareItems));
  }

  private _renderShareItemContainer(): any {
    const { shareServices } = this.shareFeatures;
    const shareItemNodes = shareServices ? this._renderShareItems() : null;
    const shareItemNode = shareServices
      ? shareItemNodes.length
        ? [shareItemNodes]
        : null
      : null;
    const shareLink = this._renderShareLinkNode();
    return (
      <div class={CSS.shareItemContainerPhoto}>
        {shareServices || shareLink ? (
          <div
            class={CSS.shareModal.main.mainShare.shareContainer}
            key="share-container"
          >
            <div class={CSS.shareModal.main.mainShare.shareItemContainer}>
              {shareItemNode}
              {shareLink}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  // todo continue link style and also fix copy button also test light/dark/shared 
  private _renderShareLinkNode() {
    const shareLink = {
      [CSS.shareLinkIsOpen]: this._shareLinkElementIsOpen
    };
    return (
      <div
        class={this.classes(
          CSS.shareModal.main.mainShare.shareItem,

        )}
      >
        <button
          bind={this}
          onclick={this._toggleShareLinkNode}
          onkeydown={this._toggleShareLinkNode}
          class={this.classes(CSS.shareButton)}
          scale={this.iconScale}
          theme={this.theme}
          title={i18n.sendLink}
          aria-label={i18n.sendLink}
          appearance="transparent"
        >
          {CSS.icons.linkIcon}
        </button>
      </div>
    );
  }

  private _renderCopyUrl(): any {
    const { copyToClipboard } = this.shareFeatures;
    const toolTipClasses = {
      [CSS.shareModal.calciteStyles.tooltip]: this._linkCopied,
      [CSS.shareModal.calciteStyles.tooltipTop]: this._linkCopied
    };
    return (
      <div key="send-link-container" class={CSS.sendLinkContainer}>
        {copyToClipboard ? (
          <div
            class={CSS.shareModal.main.mainCopy.copyContainer}
            key="copy-container"
          >
            <div class={CSS.shareModal.main.mainUrl.inputGroup}>

              <div
                bind={this}
                onclick={this._toggleShareLinkNode}
                onkeydown={this._toggleShareLinkNode}
                class={this.classes(
                  CSS.shareModal.close,
                  CSS.icons.closeIcon,
                  CSS.icons.flush
                )}
                title={i18n.close}
                label={i18n.close}
                aria-label="close-modal"
                tabindex="0"
              />
              <div class={CSS.shareModal.main.mainCopy.copyClipboardContainer}>
                <input
                  type="text"
                  class={CSS.shareModal.main.mainUrl.urlInput}
                  bind={this}
                  value={
                    this.viewModel.state === "ready"
                      ? this.shareUrl
                      : `${i18n.loading}...`
                  }
                  afterCreate={storeNode}
                  data-node-ref="_urlInputNode"
                  readOnly
                />
                <button
                  class={this.classes(
                    CSS.shareButton,
                    CSS.shareModal.main.mainCopy.copyClipboardUrl,
                    toolTipClasses
                  )}
                  theme={this.theme}
                  scale="s"
                  bind={this}
                  onclick={this._copyUrlInput}
                  onkeydown={this._copyUrlInput}
                  title={i18n.clipboard}
                  label={i18n.clipboard}
                  aria-label={i18n.copied}
                  apperance="clear"
                >
                  <calcite-icon class="copy-share-icon" scale="s" theme={this.theme} icon={icons["copy"]} ></calcite-icon>

                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  private _renderSendALinkContent(): any {
    const copyUrlNode = this._renderCopyUrl();
    const shareServicesNode = this._renderShareItemContainer();
    return (
      <article class={CSS.mainLinkContainer}>
        {shareServicesNode}
        {this._shareLinkElementIsOpen ? copyUrlNode : null}
      </article>
    );
  }
}

export = Share