///<reference types="arcgis-js-api" />
/*
  Copyright 2020 Esri
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
import { addBasemap, addHome, addOverlay, addScaleBar, addSearch, addShare, addZoom } from './utils/esriWidgetUtils';
import { findQuery, getItemTitle, goToMarker } from "ApplicationBase/support/itemUtils";
import { setPageDirection, setPageLocale, setPageTitle } from "ApplicationBase/support/domHelper";

import ApplicationBase from "ApplicationBase/ApplicationBase";
import ConfigurationSettings from "./ConfigurationSettings";
import Handles from "esri/core/Handles";
import Layout from "./ui/Layout";
import MobilePanel from './ui/MobilePanel';
import Panel from "./ui/Panel";
import { debounce } from "esri/core/promiseUtils";
import { esriWidgetProps } from './interfaces/interfaces';
import { init } from "esri/core/watchUtils";

class CalciteWebpackConfigApp {
	_handles: Handles = null;
	_base: ApplicationBase;
	_appConfig: ConfigurationSettings = null;
	_mobilePanel: HTMLElement = null;
	_panel: HTMLElement = null;

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

		const { webMapItems } = results;

		this._appConfig = new ConfigurationSettings(config);

		this.handleThemeUpdates();

		let item = null;

		webMapItems.forEach(response => {
			if (response?.value?.id === this._appConfig?.webmap) {
				item = response.value;
			} else if (this._appConfig?.webmap === "default") {
				item = response.value;
			}
		});
		if (item) {
			this._appConfig.title = this._appConfig.title
				? this._appConfig.title
				: getItemTitle(item);
			this._handles.add(
				init(this._appConfig, "title", setPageTitle),
				"configuration"
			);
		}
		const layout = new Layout({
			applicationBase: base,
			applicationConfig: this._appConfig,
			item,
			container: document.getElementById("appContainer")
		});

		layout.watch("view", () => {
			const { view } = layout;
			const { find, marker } = config;
			view.popup.autoCloseEnabled = true;
			this.createPanel(view);
			findQuery(find, view);
			goToMarker(marker, view);

			// Add widgets and side panel 
			const widgetProps: esriWidgetProps = { view, config: this._appConfig, portal: base.portal }
			// "configure" handles are cleared if we are outside of the config experience
			this._handles.add(
				[
					init(this._appConfig, "disableScroll", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addOverlay(widgetProps);
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
					init(this._appConfig, "search, searchOpenAtStart, searchPosition,searchConfiguration", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addSearch(widgetProps);
					}),
					init(this._appConfig, "basemapToggle, basemapTogglePosition, nextBasemap", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addBasemap(widgetProps);
					}),
					init(this._appConfig, "share, shareIncludeSocial, theme, header", (newValue, oldValue, propertyName) => {
						widgetProps.propertyName = propertyName;
						addShare(widgetProps);
					})
				],
				"configuration"
			);

			// These handles are needed inside and outside the config panel
			this._handles.add(init(view, "widthBreakpoint", debounce(() => {
				this.updatePanel(view, layout.calciteShell);
			})));

			// cleanup when outside config panel 
			this._cleanUpHandles();

		});
	}
	createPanel(view) {
		const props = {
			applicationConfig: this._appConfig,
			applicationBase: this._base,
			view
		}
		const isMobile = view.widthBreakpoint === "xsmall" ? true : false;
		if (isMobile && !this._mobilePanel) {
			this._mobilePanel = new MobilePanel({
				...props,
				container: document.createElement("div")
			}).container as HTMLElement;

		} else if (!isMobile && !this._panel) {
			this._panel = new Panel({
				...props,
				container: document.createElement("calcite-shell-panel") as any
			}).container as HTMLElement;
		}
	}
	updatePanel(view, shell) {
		const breakpoint = view.widthBreakpoint;
		if (breakpoint === "xsmall" && !shell.contains(this._mobilePanel)) {
			if (shell.contains(this._panel)) shell.removeChild(this._panel);
			// Create mobile panel if we don't have it 
			if (!this._mobilePanel) this.createPanel(view);
			shell.appendChild(this._mobilePanel);
		} else if (breakpoint !== "xsmall" && !shell.contains(this._panel)) {
			if (shell.contains(this._mobilePanel)) { shell.removeChild(this._mobilePanel) };
			// Create full size panel if we don't have it 
			if (!this._panel) this.createPanel(view);
			shell.appendChild(this._panel);
		}
	}

	async  updateAppTheme(theme) {
		const style = document.getElementById("esri-stylesheet") as any;
		style.href = style.href.indexOf("light") !== -1 ? style.href.replace(/light/g, theme) : style.href.replace(/dark/g, theme);
	}
	handleThemeUpdates() {
		// Check for a preferred color scheme and then
		// monitor updates to that color scheme and the
		// configuration panel updates.
		if (!this._appConfig.theme) {
			this._appConfig.theme = window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light";
		}
		this._handles.add(
			init(this._appConfig, "theme", this.updateAppTheme),
			"configuration"
		);
	}

	_cleanUpHandles() {
		// if we aren't in the config experience remove all handlers after load
		if (!this._appConfig.withinConfigurationExperience) {
			this._handles.remove("configuration");
		}
	}
}

export = CalciteWebpackConfigApp;
