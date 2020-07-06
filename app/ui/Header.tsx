import { HeaderProps, SharedTheme } from "../interfaces/interfaces";
import {
  property,
  subclass
} from "esri/core/accessorSupport/decorators";
import { init, whenOnce } from "esri/core/watchUtils";
import { renderable, tsx } from "esri/widgets/support/widget";

import AppConfig from "../ConfigurationSettings";
import Share from "./Share/Share";
import ShareFeatures from "./Share/Share/ShareFeatures"
import Widget from "esri/widgets/Widget";

const CSS = {
  base: "embed-app__header",
  logo: "embed-app__header__logo",
  heading: "heading"
};
@subclass("Header")
class Header extends (Widget) {
  @property()
  @renderable(["applicationConfig.applySharedTheme", "applicationConfig.theme", "applicationConfig.share", "applicationConfig.shareIncludeSocial"])
  applicationConfig: AppConfig;

  @property()
  view: __esri.MapView;

  @property() sharedTheme: SharedTheme;

  private _shareWidget: Share = null;
  private _applySharedTheme = false;
  constructor(props: HeaderProps) {
    super(props);
  }
  initialize() {

    this.own([whenOnce(this, "view.ready", async () => {
      const { shareIncludeSocial } = this.applicationConfig;
      if (!this._shareWidget) {
        const shareFeatures = new ShareFeatures({
          copyToClipboard: true,
          embedMap: false,
          shareServices: shareIncludeSocial
        });

        this._shareWidget = new Share({
          view: this.view,
          shareFeatures,
          container: document.createElement("div"),
          isDefault: true
        });
      }
    }), init(this, ["sharedTheme.text", "sharedTheme.background", "applicationConfig.header", "applicationConfig.theme", "applicationConfig.applySharedTheme"], () => {
      const { theme, applySharedTheme, header } = this.applicationConfig;
      const existingSheet = document.getElementById("customSheet");
      this._applySharedTheme = applySharedTheme;
      if (existingSheet?.parentNode) existingSheet.parentNode.removeChild(existingSheet);
      //let color = theme === "light" ? "#6e6e6e" : "#f3f3f3";
      //let backgroundColor = theme === "light" ? "#f3f3f3" : "#6e6e6e";

      //color = this._applySharedTheme && this?.sharedTheme?.text ? this.sharedTheme.text : color;
      let customTheme = this?.sharedTheme?.text ? `
        header.shared-theme .${theme}  calcite-button>svg>path, calcite-icon.share-icon{
          fill: ${this.sharedTheme.text};
          color:${this.sharedTheme.text};
        }  header.shared-theme .${theme}  .esri-share calcite-icon.share-icon{
          fill: ${this.sharedTheme.text};
          color:${this.sharedTheme.text};
        }
       
      ` : "";
      if (this?.sharedTheme?.background && this._applySharedTheme) {
        customTheme += `calcite-shell {
          --calcite-app-border-subtle: ${this.sharedTheme.background};
        }
        header.shared-theme .${theme} calcite-button.esri-share__copy-clipboard-url{
          background: ${ this.sharedTheme.background};
        }`
      }
      // create and insert custom style 
      //if (header) {
      const style = document.createElement("style");
      style.setAttribute("id", "customSheet");
      style.appendChild(document.createTextNode(customTheme));
      document.getElementsByTagName("head")[0].appendChild(style);
      // }
    })]);

  }

  render() {
    const { title, header, applySharedTheme } = this.applicationConfig;
    const headerLogo = this.rendeHeaderLogo();
    const headerStyle = this.createSharedStyles();
    const titleArea = title ? (<h1 class={this.classes(CSS.heading)}>{title}</h1>) : null;
    // No share tools on mobile use mobile sharing instead. 
    const shareTools = this.renderShare();
    return (
      <div key="app-header" style={headerStyle} slot="shell-header">
        {header ? <header class={this.classes(CSS.base, applySharedTheme ? "shared-theme" : null)}>
          <div class="embed-app__header__title-area">
            {headerLogo}
            {titleArea}
          </div>
          {shareTools}
        </header> : null}
      </div>
    );
  }
  rendeHeaderLogo() {
    const logo = this._applySharedTheme ? this?.sharedTheme?.logo : this.applicationConfig?.logo;
    const logoLink = this._applySharedTheme ? this?.sharedTheme?.logoLink : this.applicationConfig?.logoLink;
    const logoImg = logo ? (
      <img class={this.classes(CSS.logo)} src={logo} alt />
    ) : null;
    if (logoImg) {
      return logoLink ? (
        <a rel="noreferrer noopener" target="_blank" href={logoLink}>
          {logoImg}
        </a>
      ) : (
          logoImg
        );
    } else {
      return null;
    }
  }
  createSharedStyles() {
    let styles = [];
    if (this._applySharedTheme) {
      if (this.sharedTheme?.background) styles.push(`background-color:${this.sharedTheme.background};`);
      if (this.sharedTheme?.text) styles.push(`color:${this.sharedTheme.text};`);
    }
    return styles?.length > 0 ? styles.join(" ") : null;
  }
  renderShare() {

    const { theme, share, shareIncludeSocial } = this.applicationConfig;

    const displayShare = this._shareWidget && share && this?.view?.widthBreakpoint !== "xsmall" ? true : false;
    if (this._shareWidget) {
      this._shareWidget.shareFeatures.shareServices = shareIncludeSocial;
      this._shareWidget.theme = theme;
    }

    return (displayShare ? <div
      class={theme}
      bind={this}
      afterCreate={(container) => {
        container.appendChild(this._shareWidget.container);
      }}
    /> : <div></div>)
  }
}
export default Header;
