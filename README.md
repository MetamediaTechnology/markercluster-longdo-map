# markercluster-longdo-map
## Description

markercluster plugin for Longdo Map

## Demo
preparing...

## Reference
This plugin originates from [Markerclusterer for Google Map V3](https://github.com/googlemaps/v3-utility-library/tree/master/markerclusterer) & [Leaflet.Markercluster](https://github.com/Leaflet/Leaflet.markercluster).

## License
[Apache License Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)


## For Developers

### How to use
#### 1. Load longdo API and then load the plugin js & css

```html
<script src="https://api.longdo.com/map/?key=[your ownkey]"></script>
<link rel="stylesheet" href="./MarkerCluster.Default.css">
<script type="text/javascript" src="longdomap.markercluster-src.js"></script>
```

**You can skip loading css file if you are going to use your own cluster icons.**

#### 2. Instantiate Longdo Map and Markercluster

```js
map = new longdo.Map({
			placeholder: document.getElementById('map'),
			language: 'en',
		});
markercluster = new lmc.MarkerCluster(map,
{
    minClusterSize:2,
});
```

#### 2-A. If you'd like to use your own cluster icons...
```js
var styles = [{
		url: "./m2.png",
		width: 55,
		height: 55,
		minThreshold:10
	},{
		url: "./m3.png",
		width: 65,
		height: 65,
		minThreshold:30
	},{
		url: "./m1.png",
		width: 52,
		height: 52,
		minThreshold:0
    }];
    markercluster = new lmc.MarkerCluster(map,
    {
        minClusterSize:2,
        styles: styles
    });
```

#### 3. create longdo.Marker and add to the Markercluster instance

```js
markercluster.addMarkers(new longdo.Marker({lat: 0,lon:0},{}));
```

**Remember to run this code after loading icon image if you'd like to use your own marker icons**

#### 3-A. If you'd like to change marker icon...

```js
var img = new Image();
img.onload = function(){
    markercluster.addMarkers(new longdo.Marker({lat: lat,lon:lon},{
    icon:{
            url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
            offset: { x: 12, y: 45 },
            size: {width: 24, height: 45}
        }
	}));
}
img.src = 'https://map.longdo.com/mmmap/images/pin_mark.png';
```

#### 4. Run render() method.
```js
markercluster.render();
```

**If you add many markers, it takes some time to render.**

### API documentation
#### class Markercluster
##### Constructor
|constructor|description|
|--|--|
|Markercluster(map:longdo.Map,option:Object)||

##### Methods
|Methods|Return value|Description|
|--|--|--|
|addMarkers(markers:longdo.Marker or Array\<longdo.Marker\>)|void|add marker(s) to the plugin's management|
|render()|void|start rendering if it is ready.|
|resetViewport()|void|remove all markers & clusters from the map|
|clearMarkers()|void|remove all markers from the plugin's management|
|removeMarker(marker:longdo.Marker)|boolean|remove the marker from cluster & render, returning success|
|removeMarkers(markers:Array\<longdo.Marker\>)|boolean|remove markers from clusters & render, returning success|

##### Options
|Name|Type|Default value|Description|
|--|--|--|--|
|gridSize|number|120|the pixel size of cluster grid|
|maxZoom|number|null|maximum zoom level in which clustering is enabled|
|averageCenter|boolean|false|Whether the center of each cluster should be the accurate average of markers|
|minClusterSize|number|2|the minimum number of markers in each cluster|
|styles|Array\<Object\>|null|design of cluster icons|
|swarmModeEnabled|boolean|false|Whether swarm mode is enabled(under development)|
|swarmAlg|number|null|swarming algorithm 1 or 2|

#### cluster styles
|Name|Type|Description|
|--|--|--|
|url|string|URL of icon image|
|width|number|width of the image|
|height|number|height of the image|
|minThreshold|number|the minimum number of markers in each cluster to which apply the design|

## Build the plugin

If you'd like to build the plugin, you are required to install Node.js & webpack & more packages. When the install's done, run npm build script.