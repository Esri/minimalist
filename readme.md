# Embed app

      	const button = document.createElement("button");
			button.innerHTML = "Update logic";
			button.addEventListener("click", () => {
				// is true even if not legend or details it'll show up
				// also if legendopenat start is set to true here for the first 
				// time it won't display the legend. 
				//this.appConfig.legend = !this.appConfig.legend;
				//	this.appConfig.legendOpenAtStart = !this.appConfig.legendOpenAtStart;
				this._appConfig.layoutType = this._appConfig.layoutType === "default" ? "horizontal" : "default";

				//this.appConfig.details = !this.appConfig.details;
				//this.appConfig.title = "HELLO"
				//  this.appConfig.header = !this.appConfig.header;
				//this.appConfig.home = !this.appConfig.home;
				//this.appConfig.homePosition = "bottom-right";
				//this.appConfig.scalebar = !this.appConfig.scalebar;
				//this.appConfig.scalebarPosition = "top-right";
				//
				// this.appConfig.disableScroll = !this.appConfig.disableScroll;

				//this.appConfig.basemapTogglePosition = "top-right";
				//this.appConfig.basemapToggle = !this.appConfig.basemapToggle;
				// this.appConfig.searchConfiguration = {
				//  popupEnabled: false
				// }
				//this.appConfig.searchPosition = "bottom-right";
				// this.appConfig.search = !this.appConfig.search;

				// this.appConfig.share = !this.appConfig.share;
				//	this.appConfig.shareIncludeSocial = !this.appConfig.shareIncludeSocial;
				//this.appConfig.theme = this.appConfig.theme === "dark" ? "light" : "dark";
				//this.appConfig.applySharedTheme = !this.appConfig.applySharedTheme;
			});
			view.ui.add(button, "top-right");
Notes: calcite-icons can be found here: https://esri.github.io/calcite-ui-icons/#

layoutType: horizontal, default

# Configuration Options 

* **layout** : Modify the layout appearance. Current supported values are **default|horizontal**. 
  
* **theme**: Choose a color theme for the app. Valid values are **light|dark**. If you have specified a preference via OS or browser for a light or dark theme the app will respect that if it hasn't been configured. 

* **disableScroll**: Set this to true to prevent scroll and single finger pan. This can be useful when embedding the app into another site that the user will view on a mobile device. Default value is false. 

* **mapZoom** : When true display the map zoom in/out controls. Set **mapZoomPosition** to **top-right|bottom-right|top-left|bottom-left** to modify the default position. 

* **header**: Add a header to the app that displays a title. By default the app title is used. Specify **title** to specify a custom title.  Set **logo** and optionally **logoLink** to add a clickable logo to the header. 

* **details**: When true add a panel with descriptive information to the app by default the app will use the web map description. **detailsContent**: Specify this to provide custom descriptive info. **detailsOpenAtStart**: Set this to true to open the panel with descriptive info when the application loads. 

* **legend**: When true add the legend in a panel to the app. **legendOpenAtStart**: When true show the legend panel open by default when the app loads. 

* **basemapToggle**: When true add the basemap toggle to the map. Use **nextBasemap** to change the next basemap from **streets-vector** to one of the other valid named basemap values. Named basemap values are **topo|streets|satellite|hybrid|dark-gray|gray|national-geographic|oceans|osm|terrain|dark-gray-vector|gray-vector|streets-vector|streets-night-vector|streets-navigation-vector|topo-vector|streets-relief-vector** Modify the **basemapTogglePosition** to specify where the control is displayed on the map. Valid values are **top-right|bottom-right|top-left|bottom-left**. 


**scalebar** When true adds a scalebar at the **scalebarPosition** location. 

**home**: When true adds the home button at the **homePosition** location.

**popupPanel**: When true the popup content will display in a popup panel activated from a tool in the side bar. On mobile the popup panel content will be displayed in a panel activated from a tool available in the bottom toolbar. **popupHover**: When popup panel is true there will be an option to display popup content on mouse hover. 

**bookmarks**: When true the bookmark widget is displayed in the position specified by **bookmarksPosition**. 