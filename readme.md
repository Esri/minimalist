
ArcGIS Configurable Apps will be retired in 2025. The ArcGIS Configurable Apps source code repro is deprecated and will not receive further updates. In addition, this repository will be removed in October 2025, along with the October 2025 ArcGIS Online update.

# Deprecated: Minimalist 
The Minimalist configurable app template is a simple map viewer with a minimal user interface.

View the [release blog](https://www.esri.com/arcgis-blog/products/arcgis-online/announcements/whats-new-in-configurable-apps-march-2020/) and the [app](https://www.arcgis.com/home/item.html?id=50aaf4ec408f4675bc9f30e68441e8f8)  for more details.


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


## Instructions

1. Fork and then clone the repo.
2. Run `npm install`
3. Host on local web server.
4. Open index.html in a web browser.
5. Test with different web maps.

## Requirements

- Notepad or your favorite HTML editor
- Web browser with access to the Internet

## Resources

- [ArcGIS for JavaScript API Resource Center](http://help.arcgis.com/en/webapi/javascript/arcgis/index.html)
- [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)
- [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature? Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing

Copyright 2020 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](License.txt) file.
