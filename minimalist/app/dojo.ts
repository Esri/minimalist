/*
  Copyright 2017 Esri

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

(() => {
	const { pathname, search } = window.location;
	const appPath = pathname.substring(0, pathname.lastIndexOf('/'));
	const instantPath = appPath.slice(0, appPath.lastIndexOf("/"));

	const localeUrlParamRegex = /locale=([\w-]+)/;
	const dojoLocale = search.match(localeUrlParamRegex) ? RegExp.$1 : undefined;
	const config = {
		async: true,
		locale: dojoLocale, // unset this if we move to modules 
		packages: [
			{ name: 'Application', location: `${appPath}/app`, main: 'Main' },
			{
				name: 'ApplicationBase',
				location: `${instantPath}/node_modules/@esri/application-base-js`,
				main: 'ApplicationBase'
			},
			{
				name: "TemplatesCommonLib",
				location: `${instantPath}/node_modules/templates-common-library/dist`
			},   
			{
				name: 'Components',
				location: `${instantPath}/node_modules/@esri/configurable-app-components`,
				main: "Screenshot"
			},
			{
				name: 'telemetry',
				location: `${appPath}/app/telemetry`
			},
			{ name: 'config', location: `${appPath}/config` },
			{ name: 'calcite-web', location: `${appPath}/app/calcite-web` }
		]
	};

	window['esriConfig'] = { locale: dojoLocale }
	window['dojoConfig'] = config;
})();
