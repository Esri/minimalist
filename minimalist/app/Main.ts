///<reference types="arcgis-js-api" />
/*
  Copyright 2019 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/


import { addScreenshot, addBasemap, addHome, addOverlay, addScaleBar, addBookmarks, addSearch, addShare, addZoom } from './utils/esriWidgetUtils';
import ApplicationBase from 'ApplicationBase/ApplicationBase';
import {
	findQuery,
	goToMarker,
	getItemTitle
} from "ApplicationBase/support/itemUtils";

import {
	setPageLocale,
	setPageDirection,
	setPageTitle
} from "ApplicationBase/support/domHelper";

import Telemetry, { TelemetryInstance } from "./telemetry/telemetry";
import ConfigurationSettings from "./ConfigurationSettings";
import Handles from "esri/core/Handles";
import Layout from "./ui/Layout";
import MobilePanel from './ui/MobilePanel';
import Alert from "./ui/Alert";
import Panel from "./ui/Panel";
import { debounce, eachAlways } from "esri/core/promiseUtils";
import { esriWidgetProps } from './interfaces/interfaces';
import { init, watch, whenDefinedOnce, whenFalseOnce } from "esri/core/watchUtils";
import { fromJSON } from "esri/geometry/support/jsonUtils";
import { urlToObject } from "esri/core/urlUtils";
import Search from "esri/widgets/Search";
class Minimalist {
	_handles: Handles = null;
	_base: ApplicationBase;
	_appConfig: ConfigurationSettings = null;
	_mobilePanel: HTMLElement = null;
	_panel: HTMLElement = null;
	_telemetry: TelemetryInstance = null;
	view: __esri.MapView = null;
	_defaultViewRotation: number = 0;
	_breakpointHandle: __esri.WatchHandle;
	//--------------------------------------------------------------------------
	//
	//  Public Methods
	//
	//--------------------------------------------------------------------------

	public async init(base: ApplicationBase) {
		if (!base) {
			console.error("ApplicationBase is not defined");
			return;
		}
		this._handles = new Handles();
		setPageLocale(base.locale);
		setPageDirection(base.direction);

		this._base = base;

		const { config, results } = base;
		this._appConfig = new ConfigurationSettings(config);

		this._handleTelemetry();

		const { webMapItems } = results;

		if (config.legend && !this._appConfig.legendPanel) {
			this._appConfig.legendPanel = config.legend;
		}
		this.handleThemeUpdates();

		let item = null;

		webMapItems.forEach(response => {
			if (response?.value?.id === this._appConfig?.webmap) {
				item = response.value;
			} else if (this._appConfig?.webmap === "default") {
				item = response.value;
			}
		});
		if (!item) {
			// show error page 
			document.location.href = `../../shared/unavailable/index.html?appid=${config?.appid ?? null}`;

			return;
		}
		this._appConfig.title = this._appConfig.title
			? this._appConfig.title
			: getItemTitle(item);
		this._handles.add(
			init(this._appConfig, "title", setPageTitle),
			"configuration"
		);

		const layout = new Layout({
			applicationBase: base,
			applicationConfig: this._appConfig,
			item,
			container: document.getElementById("appContainer")
		});

		const layoutHandle = layout.watch("view", () => {
			layoutHandle.remove();
			const view = layout.view;

			this.view = view;
			this._defaultViewRotation = this.view.rotation || 0;
			const { find, marker } = config;
			if (this._isHoverMobile()) {
				this._appConfig.popupHover = false;
			}
			this._handlePopupBehavior(view);

			findQuery(find, view);
			goToMarker(marker, view);

			// Add widgets and side panel 
			const widgetProps: esriWidgetProps = { view, config: this._appConfig, portal: base.portal, telemetry: this._telemetry }
			// "configure" handles are cleared if we are outside of the config experience
			this._handles.add(
				[
					init(
						this._appConfig,
						"customUrlParam, customURLParamName",
						(newValue, oldValue, propertyName) => {
							const customUrlParam = this._appConfig.customUrlParam
								?.layers?.[0];
							const fieldName = customUrlParam?.fields?.[0];
							const customUrlParamName = this._appConfig.customURLParamName;
							if (!customUrlParam || !customUrlParamName || !fieldName) {
								return;
							}
							const layer = view.map.findLayerById(
								customUrlParam.id
							) as __esri.Layer;

							const layerSearchSource = {
								layer,
								searchFields: customUrlParam.fields,
								outFields: ["*"],
								exactMatch: true,
								displayField: fieldName
							} as __esri.LayerSearchSource;

							const href = this._appConfig
								.withinConfigurationExperience
								? document.referrer
								: document.location.href;

							const searchResults = urlToObject(href);
							let searchTerm = null;
							if (searchResults?.query) {
								if (customUrlParamName in searchResults.query) {
									searchTerm = searchResults.query[customUrlParamName];
								}
							}

							if (layer) {
								const search = new Search({
									view,
									resultGraphicEnabled: false,
									searchAllEnabled: false,
									includeDefaultSources: false,
									suggestionsEnabled: false,
									sources: [layerSearchSource],
									searchTerm
								});
								search.search();
							}
						}
					),
					init(this._appConfig, "disableScroll", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addOverlay(widgetProps);
					}), init(this._appConfig, "extentSelectorConfig, extentSelector", () => {
						if (this._appConfig?.extentSelectorConfig && this._appConfig?.extentSelector) {
							const { constraints } = this._appConfig.extentSelectorConfig;

							const geometry = constraints?.geometry;
							if (geometry) {
								const extent = fromJSON(geometry);
								if (extent && (extent?.type === "extent" || extent?.type === "polygon")) {
									constraints.geometry = extent;
									this.view.goTo(extent, false).catch(() => { });
								}
							} else {
								constraints.geometry = null;
							}
							this.view.constraints = constraints;
							this._setMapViewRotation();
						} else {
							if (this.view) {
								this.view.rotation = this._defaultViewRotation;
								this.view.constraints.geometry = null;
								this.view.constraints.minZoom = -1;
								this.view.constraints.maxZoom = -1;
								this.view.constraints.minScale = 0;
								this.view.constraints.maxScale = 0;
							}

							layout?.viewModel.resetExtent();
						}
					}),
					init(this._appConfig, "mapZoom, mapZoomPosition", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addZoom(widgetProps);
					}),
					init(this._appConfig, "home, homePosition", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addHome(widgetProps);
					}),
					init(this._appConfig, "scalebar, scalebarPosition", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addScaleBar(widgetProps);
					}),
					init(this._appConfig, "bookmarks,bookmarksEditable, bookmarkThumbnail, bookmarksPosition", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addBookmarks(widgetProps);
					}),
					init(this._appConfig, "search, searchOpenAtStart, extentSelector, extentSelectorConfig, searchPosition,searchConfiguration", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addSearch(widgetProps);
					}),
					init(this._appConfig, "basemapToggle, basemapTogglePosition, basemapSelector, nextBasemap", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addBasemap(widgetProps);
					}),
					init(this._appConfig, "share, shareIncludeSocial, theme, header", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addShare(widgetProps);
					}),
					init(this._appConfig, "screenshot, screenshotPosition", (newValue, oldValue, propertyName) => {
						addScreenshot({ ...widgetProps, ...{ propertyName } });
					}),
				],
				"configuration"
			);
			const shell = layout.calciteShell
			this._handles.add(
				whenDefinedOnce(view, "widthBreakpoint", (value) => {
					this.createPanel(view, value, shell);
					this._breakpointHandle = watch(view, "widthBreakpoint", (value) => {
						this.createPanel(view, value, shell);
						if (shell?.contains(this._mobilePanel) && shell?.contains(this._panel)) {
							this._breakpointHandle.remove();
						}
					});
				})
			);
			// cleanup when outside config panel 
			this._cleanUpHandles();
		});
	}
	_openPopup(view, e) {
		view.popup.open({
			updateLocationEnabled: false,
			location: view.toMap(e),
			fetchFeatures: true
		});
	}
	private _isHoverMobile(): boolean {
		return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
	}
	_handlePopupBehavior(view: __esri.MapView) {

		let handle: __esri.Handle = null;
		let clickHandle: __esri.Handle = null;
		this._handles.add(
			init(this._appConfig, ["popupHover", "popupPanel"], (value, oldVal, propertyName) => {
				const { popupHover, popupPanel } = this._appConfig;

				view.popup.autoCloseEnabled = true;
				if (propertyName === "popupHover" && popupHover === true && popupPanel === false) {
					// setup popup on hover 
					handle && handle.remove();
					clickHandle && clickHandle.remove();
					// create the handle 
					view.popup.spinnerEnabled = false;
					view.popup.autoOpenEnabled = false;
					view.popup.defaultPopupTemplateEnabled = true;
					let lastHitTest;
					let click = false;
					handle = view.on("pointer-move", debounce((e) => {

						if (lastHitTest) clearTimeout(lastHitTest);
						// if they click let's open popup and stop hover 
						clickHandle = view.on("click", () => {
							view.popup.autoOpenEnabled = true;
							click = true;
							whenFalseOnce(view.popup, "visible", () => {
								view.popup.autoOpenEnabled = false;
								click = false;
							})
						});

						lastHitTest = setTimeout(() => {
							if (!click) this._openPopup(view, e);
						}, 100)

					}));
				} else if (popupPanel === true || popupHover === false) {
					// disconnect click 
					handle && handle.remove();
					clickHandle && clickHandle.remove();
					if (popupHover === false) {
						if (view.popup)
							view.popup.autoOpenEnabled = true;
					}
				}
			}),
			"configuration"
		);

	}
	createPanel(view, breakpoint, shell) {
		const props = {
			applicationConfig: this._appConfig,
			applicationBase: this._base,
			view
		}
		const width = view?.width || 701;
		if (width <= 700 && !this._mobilePanel) {
			this._mobilePanel = new MobilePanel({
				...props,
				container: document.createElement("div")
			}).container as HTMLElement;
			if (!shell?.contains(this._mobilePanel)) shell.appendChild(this._mobilePanel);
			this._mobilePanel.classList.add("mobile-shell-panel");

		} else if (!this._panel) {
			this._panel = new Panel({
				...props,
				container: document.createElement("calcite-shell-panel")
			}).container as HTMLElement;
			if (!shell?.contains(this._panel)) shell?.appendChild(this._panel);
			this._panel.classList.add("desktop-shell-panel");
		}
	}

	async updateAppTheme(theme) {
		const style = document.getElementById("esri-stylesheet") as any;
		style.href = style.href.indexOf("light") !== -1 ? style.href.replace(/light/g, theme) : style.href.replace(/dark/g, theme);
	}
	handleThemeUpdates() {
		// Check for a preferred color scheme and then
		// monitor updates to that color scheme and the
		// configuration panel updates.
		// Also todo on app name info going to GA
		if (!this._appConfig.theme) {
			this._appConfig.theme = window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light";
		}
		this._handles.add(
			init(this._appConfig, "theme", this.updateAppTheme),
			"configuration"
		);
		this._handles.add(init(this._appConfig, "customCSS", (newValue, oldValue, propertyName) => {
			this._handleCustomCSS();
		}));
	}
	async createTelemetry() {
		// add alert to container
		const { portal } = this._base;
		const appName = this._base.config?.telemetry?.name;
		this._telemetry = await Telemetry.init({ portal, config: this._appConfig, appName });
		this._telemetry?.logPageView();
	}
	private _handleTelemetry() {
		// Wait until both are defined
		eachAlways([whenDefinedOnce(this._appConfig, "googleAnalytics"),
		whenDefinedOnce(this._appConfig, "googleAnalyticsKey"),
		whenDefinedOnce(this._appConfig, "googleAnalyticsConsentMsg"),
		whenDefinedOnce(this._appConfig, "googleAnalyticsConsent")]

		).then(() => {

			const alertContainer = document.createElement("container");
			document.body.appendChild(alertContainer);
			new Alert({ config: this._appConfig, container: alertContainer });

			this.createTelemetry();
			this._handles.add([
				watch(this._appConfig, ["googleAnalytics", "googleAnalyticsConsent", "googleAnalyticsConsentMsg", "googleAnalyticsKey"], (newValue, oldValue, propertyName) => {
					this.createTelemetry();
				})
			]);

		})
	}
	private _handleCustomCSS(): void {
		const customCSSStyleSheet = document.getElementById("customCSS");

		if (customCSSStyleSheet) {
			customCSSStyleSheet.remove();
		}

		const styles = document.createElement("style");
		styles.id = "customCSS";
		styles.type = "text/css";
		const styleTextNode = document.createTextNode(
			this._appConfig.customCSS
		);
		styles.appendChild(styleTextNode);
		document.head.appendChild(styles);
	}
	_cleanUpHandles() {
		// if we aren't in the config experience remove all handlers after load
		if (!this._appConfig.withinConfigurationExperience) {
			this._handles.remove("configuration");
		}
	}
	_setMapViewRotation() {
		const view = this.view;
		const mapRotation = this._appConfig?.extentSelectorConfig?.mapRotation ?? this._defaultViewRotation ?? null;
		if (!view?.constraints?.rotationEnabled) { // if rotation is disabled
			view.constraints.rotationEnabled = true; // set rotation to enabled
			view.rotation = mapRotation // set rotation value
			view.constraints.rotationEnabled = false; // set rotation back to disabled
		} else {
			if (view)
				view.rotation = mapRotation;
		}
	}
}

export = Minimalist;
