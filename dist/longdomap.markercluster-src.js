var lmc =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/LLBBox.js":
/*!***********************!*\
  !*** ./src/LLBBox.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var longdo = window.longdo;

var _default =
/*#__PURE__*/
function () {
  function _default() {
    _classCallCheck(this, _default);

    var locations = arguments.length === 0 ? [] : arguments.length === 1 ? arguments[0] instanceof Array ? arguments[0] : [arguments[0]] : arguments[0] instanceof Array ? arguments[0] : [arguments[0]];
    this._projection = arguments.length <= 1 ? longdo.Projections.EPSG3857 : arguments[1];
    this._locationList = locations instanceof Array ? locations : [locations];
    this._originalLocationList = this._locationList.slice();

    if (locations.length > 0) {
      this._bounds = longdo.Util.locationBound(this._locationList);
    }
  }

  _createClass(_default, [{
    key: "getBounds",
    value: function getBounds() {
      return {
        'minLon': this._bounds.minLon,
        'minLat': this._bounds.minLat,
        'maxLon': this._bounds.maxLon,
        'maxLat': this._bounds.maxLat
      };
    }
  }, {
    key: "getMinimumBounds",
    value: function getMinimumBounds() {
      var b = longdo.Util.locationBound(this._originalLocationList);
      return b;
    }
  }, {
    key: "add",
    value: function add(location) {
      this._locationList.push(location);

      this._originalLocationList.push(location);

      this._bounds = longdo.Util.locationBound(this._locationList);
    }
  }, {
    key: "remove",
    value: function remove(location) {
      this._locationList = this._locationList.filter(function (e) {
        return e !== location;
      });
      this._originalLocationList = this._originalLocationList.filter(function (e) {
        return e !== location;
      });
      this._bounds = this.empty() ? null : longdo.Util.locationBound(this._locationList);
    }
  }, {
    key: "empty",
    value: function empty() {
      return this._locationList.length === 0;
    }
  }, {
    key: "generateFrom",
    value: function generateFrom(bound) {
      this._locationList.length = 0;
      this.add({
        "lon": bound.minLon,
        "lat": bound.minLat
      });
      this.add({
        "lon": bound.maxLon,
        "lat": bound.minLat
      });
      this.add({
        "lon": bound.minLon,
        "lat": bound.maxLat
      });
      this.add({
        'lon': bound.maxLon,
        'lat': bound.maxLat
      });
      this._bounds = longdo.Util.locationBound(this._locationList);
      return this;
    }
  }, {
    key: "generateRect",
    value: function generateRect(loc1, loc2) {
      this._locationList.length = 0;
      this.add({
        "lon": loc1.lon,
        "lat": loc1.lat
      });
      this.add({
        "lon": loc1.lon,
        "lat": loc2.lat
      });
      this.add({
        "lon": loc2.lon,
        "lat": loc1.lat
      });
      this.add({
        "lon": loc2.lon,
        "lat": loc2.lat
      });
      this._bounds = longdo.Util.locationBound(this._locationList);
      return this;
    }
  }, {
    key: "getLocations",
    value: function getLocations() {
      return this._locationList.slice();
    }
  }, {
    key: "isLocInBounds",
    value: function isLocInBounds(loc) {
      var result = longdo.Util.contains(loc, this.getRectVertex());
      return result === null ? true : result;
    }
  }, {
    key: "extendSize",
    value: function extendSize(diff) {
      var b = this._bounds;
      var maxy = this._projection.latToNorm(b.maxLat) + diff;
      var miny = this._projection.latToNorm(b.minLat) - diff;

      this._locationList.push({
        "lon": b.minLon - diff,
        "lat": this._projection.normToLat(miny)
      });

      this._locationList.push({
        "lon": b.minLon - diff,
        "lat": this._projection.normToLat(maxy)
      });

      this._locationList.push({
        "lon": b.minLon + diff,
        "lat": this._projection.normToLat(miny)
      });

      this._locationList.push({
        "lon": b.maxLon + diff,
        "lat": this._projection.normToLat(maxy)
      });

      this._bounds = longdo.Util.locationBound(this._locationList);
      return this;
    }
  }, {
    key: "getRectVertex",
    value: function getRectVertex() {
      return [{
        "lon": this._bounds.minLon,
        "lat": this._bounds.minLat
      }, {
        "lon": this._bounds.minLon,
        "lat": this._bounds.maxLat
      }, {
        "lon": this._bounds.maxLon,
        "lat": this._bounds.maxLat
      }, {
        "lon": this._bounds.maxLon,
        "lat": this._bounds.minLat
      }];
    }
    /*
    Adapted from https://wiki.openstreetmap.org/wiki/Mercator
    */

  }, {
    key: "_y2lat",
    value: function _y2lat(y) {
      return (Math.atan(Math.exp(y / (180 / Math.PI))) / (Math.PI / 4) - 1) * 90;
    }
  }, {
    key: "_lat2y",
    value: function _lat2y(lat) {
      return Math.log(Math.tan((lat / 90 + 1) * (Math.PI / 4))) * (180 / Math.PI);
    }
  }]);

  return _default;
}();



/***/ }),

/***/ "./src/MarkerCluster.js":
/*!******************************!*\
  !*** ./src/MarkerCluster.js ***!
  \******************************/
/*! exports provided: default, Cluster, ClusterIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MarkerCluster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cluster", function() { return Cluster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClusterIcon", function() { return ClusterIcon; });
/* harmony import */ var _LLBBox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LLBBox.js */ "./src/LLBBox.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

if (typeof window.longdo === 'undefined') {
  throw new Error('longdo API must be loaded before the longdomap markercluster plugin');
}

var longdo = window.longdo;


var MarkerCluster =
/*#__PURE__*/
function () {
  function MarkerCluster(map, options) {
    _classCallCheck(this, MarkerCluster);

    this._map = map;
    this._markers = [];
    this._clusters = [];
    this._styles = options.styles || [];
    this._prevZoom = 2;
    this._maxZoom = options.maxZoom || null;
    this._minClusterSize = options.minClusterSize || 2;
    this.sizes = [53, 56, 66, 78, 90];
    this._ready = false;
    this._gridSize = options.gridSize || 120;
    this._averageCenter = true;
    this._drawMarkerArea = true;

    this._calculator = function (markers) {
      var count = markers.length;
      return {
        'index': 0,
        'text': '' + count
      };
    };

    var that = this;
    this._clusterMarkerImage = new Image();

    this._clusterMarkerImage.onload = function () {
      that._prevZoom = that._map.zoom;
      that._ready = true;
      that.resetViewport();

      that._createClusters();
    };

    this._clusterMarkerImage.src = './m1.png';

    this._map.Event.bind('zoom', function ()
    /*pivot*/
    {
      if (!that._ready) {
        return;
      }

      var zoom = that._map.zoom();

      if (that._prevZoom !== zoom) {
        that._prevZoom = zoom;
        that.resetViewport();

        that._createClusters();
      }
    });

    this._map.Event.bind('idle', function () {
      if (!that._ready) {
        return;
      } //that.resetViewport();
      //that._createClusters();

    });

    this._map.Event.bind('drop', function () {
      if (!that._ready) {
        return;
      }

      that.resetViewport();

      that._createClusters();
    });
    /*
    this._map.Event.bind('drag', function(move){
        if(that.ready && move.x === 0 && move.y === 0){
            that.resetViewport();
            that._createClusters();
        }
    });
    */


    this._map.Event.bind('overlayClick', function (overlay) {
      if (!that._ready) {
        return;
      }

      var len = that._clusters.length;

      while (len--) {
        var cl = that._clusters[len];

        if (overlay === cl._clusterIcon._clusterMarker) {
          that._map.bound(cl._bounds.getMinimumBounds());

          setTimeout(function () {
            that.resetViewport();

            that._createClusters();
          }, 0);
          return;
        }
      }
    });
  }

  _createClass(MarkerCluster, [{
    key: "addMarkers",
    value: function addMarkers(markers) {
      if (markers instanceof longdo.Marker) {
        markers = [markers];
      }

      var len = markers.length;

      while (len--) {
        var m = markers[len];

        this._markers.push(m);
      }
    }
  }, {
    key: "render",
    value: function render() {
      this._ready = true;
      this.resetViewport();

      this._createClusters();
    }
  }, {
    key: "_createClusters",
    value: function _createClusters() {
      if (!this._ready) {
        return;
      }

      var mapBounds = new _LLBBox_js__WEBPACK_IMPORTED_MODULE_0__["default"]().generateFrom(this._map.bound());
      var bounds = this.getExtendedBounds(mapBounds);
      var len = this._markers.length;

      while (len--) {
        var m = this._markers[len];
        var loc = m.location();

        if (!m.isAdded && bounds.isLocInBounds(loc)) {
          this._addToClosestCluster(m);
        }
      }
    }
  }, {
    key: "_addToClosestCluster",
    value: function _addToClosestCluster(marker) {
      var distance = Number.POSITIVE_INFINITY;
      var clusterToAddTo = null;
      var len = this._clusters.length;

      while (len--) {
        var cluster = this._clusters[len];
        var cen = cluster._center;

        if (cen) {
          var d = longdo.Util.distance([cen, marker.location()]);

          if (d < distance) {
            distance = d;
            clusterToAddTo = cluster;
          }
        }
      }

      if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
      } else {
        var _cluster = new Cluster(this, this._clusters.length);

        _cluster.addMarker(marker);

        this._clusters.push(_cluster);
      }
    }
  }, {
    key: "_removeMarker",
    value: function _removeMarker(marker) {
      var index = this._markers.indexOf(marker);

      if (index === -1) {
        return false;
      }

      this._map.Overlays.remove(marker);

      this._markers.splice(index, 1);

      return true;
    }
  }, {
    key: "removeMarker",
    value: function removeMarker(marker) {
      var removed = this._removeMarker(marker);

      if (removed) {
        this.resetViewport();

        this._createClusters();

        return true;
      }

      return false;
    }
  }, {
    key: "removeMarkers",
    value: function removeMarkers(markers) {
      var markersCopy = markers === this._markers ? this._markers.slice() : markers;
      var removed = false;
      var len = markersCopy.length;

      while (len--) {
        var r = this._removeMarker(markersCopy[len]);

        removed = removed || r;
      }

      if (removed) {
        this.resetViewport();

        this._createClusters();

        return true;
      }

      return false;
    }
  }, {
    key: "getExtendedBounds",
    value: function getExtendedBounds(bounds) {
      bounds.extendSize(this._gridSize * Math.pow(2, -this._map.zoom()));
      return bounds;
    }
  }, {
    key: "clearMarkers",
    value: function clearMarkers() {
      this.resetViewport();
      var len = this._markers.length;

      while (len--) {
        var marker = this._markers[len];

        this._map.Overlays.remove(marker);
      }

      this._markers = [];
    }
  }, {
    key: "resetViewport",
    value: function resetViewport() {
      var len = this._clusters.length;

      while (len--) {
        this._clusters[len].remove();
      }

      len = this._markers.length;

      while (len--) {
        var marker = this._markers[len];
        marker.isAdded = false;

        this._map.Overlays.remove(marker);
      }

      this._clusters = [];
    }
  }, {
    key: "repaint",
    value: function repaint() {
      var oldClusters = this._clusters().slice();

      this._clusters.length = 0;
      this.resetViewport();

      this._createClusters();

      setTimeout(function () {
        var len = oldClusters.length;

        while (len--) {
          oldClusters[len].remove();
        }
      }, 0);
    }
  }]);

  return MarkerCluster;
}();


var Cluster =
/*#__PURE__*/
function () {
  function Cluster(markerCluster) {
    _classCallCheck(this, Cluster);

    this._markerCluster = markerCluster;
    this._map = markerCluster._map;
    this._center = null;
    this._markers = [];
    this._bounds = null;
    this._clusterIcon = new ClusterIcon(this, {}, this._markerCluster._gridSize);
  }

  _createClass(Cluster, [{
    key: "addMarker",
    value: function addMarker(marker) {
      if (this._markers.indexOf(marker) !== -1) {
        return false;
      }

      if (!this._center) {
        this._center = marker.location();

        this._calculateBounds();
      } else {
        if (this._markerCluster._averageCenter) {
          this._center = longdo.Util.averageLocation(longdo.Projections.EPSG3857, this._center, marker.location());
        }
      }

      marker.isAdded = true;

      this._markers.push(marker);

      var len = this._markers.length;

      if (len < this._markerCluster._minClusterSize) {
        if (!marker.active()) {
          this._map.Overlays.add(marker);
        }
      }

      if (len === this._markerCluster._minClusterSize) {
        var lenc = len;

        while (lenc--) {
          var m = this._markers[lenc];

          if (m.active()) {
            this._map.Overlays.remove(m);
          }
        }
      }

      if (len >= this._markerCluster._minClusterSize) {
        var _lenc = len;

        while (_lenc--) {
          var _m = this._markers[_lenc];

          if (_m.active()) {
            this._map.Overlays.remove(_m);
          }
        }
      }

      this.updateIcon();
      return true;
    }
  }, {
    key: "remove",
    value: function remove() {
      this._clusterIcon.remove();

      this._markers.length = 0;
      delete this._markers;
    }
  }, {
    key: "_calculateBounds",
    value: function _calculateBounds() {
      this._bounds = this._markerCluster.getExtendedBounds(new _LLBBox_js__WEBPACK_IMPORTED_MODULE_0__["default"]().generateRect(this._center, this._center));
    }
  }, {
    key: "updateIcon",
    value: function updateIcon() {
      var zoom = this._map.zoom();

      var mz = this._markerCluster._maxZoom;

      if (mz && zoom > mz || zoom === 20) {
        var len = this._markers.length;

        while (len--) {
          var marker = this._markers[len];

          if (!marker.active()) {
            this._map.Overlays.add(marker);
          }
        }

        return;
      }

      if (this._markers.length < this._markerCluster._minClusterSize) {
        this._clusterIcon.hide();

        return;
      }

      var sums = this._markerCluster._calculator(this._markers, 0);

      this._clusterIcon.setCenter(this._center);

      this._clusterIcon.setSums(sums);

      this._clusterIcon.show();
    }
  }, {
    key: "isMarkerInClusterBounds",
    value: function isMarkerInClusterBounds(marker) {
      return this._bounds.isLocInBounds(marker.location());
    }
  }, {
    key: "containsMarker",
    value: function containsMarker(marker) {
      var len = this._markers.length;

      while (len--) {
        if (this._markers[len] === marker) {
          return true;
        }
      }

      return false;
    }
  }]);

  return Cluster;
}();
var ClusterIcon =
/*#__PURE__*/
function () {
  function ClusterIcon(cluster, styles) {
    _classCallCheck(this, ClusterIcon);

    this._styles = styles;
    this._cluster = cluster;
    this._center = null;
    this._map = cluster._map;
    this._visible = false;
    this._clusterMarker = null;
    this._sums = null;
    this._clusterMarker = new longdo.Marker({
      "lat": 0,
      "lon": 0
    }, {
      "icon": {
        "html": "<div style=\"width:52px;height:52px;background:url(./m1.png) no-repeat center top;color:red;line-height:52px;amrgin:0;padding:0;position:relative;top:-26px;left:-26px;\"><div style='margin-left:22px;font-weight:bold;'>-1</div></div>",
        "offset": {
          "x": 0,
          "y": 0
        },
        "size": {
          "width": 53,
          "height": 53
        }
      },
      "weight": longdo.OverlayWeight.Top
    });
  }

  _createClass(ClusterIcon, [{
    key: "show",
    value: function show() {
      var pos = this._center;

      if (this._clusterMarker.active()) {
        this._map.Overlays.move(this._clusterMarker, pos);
      } else {
        this._clusterMarker.setLocation(pos);

        this._map.Overlays.add(this._clusterMarker);

        if (this._poly) {
          this._map.Overlays.remove(this._poly);
        }

        if (this._cluster._markerCluster._drawMarkerArea) {
          this._poly = new longdo.Polygon(this._cluster._bounds.getRectVertex(), {});

          this._map.Overlays.add(this._poly);
        }
      }

      this._visible = true;
    }
  }, {
    key: "remove",
    value: function remove() {
      this._map.Overlays.remove(this._clusterMarker);

      if (this._poly) {
        this._map.Overlays.remove(this._poly);

        this._poly = null;
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this._map.Overlays.remove(this._clusterMarker);

      this._visible = false;

      if (this._cluster._markerCluster._drawMarkerArea) {
        if (!this._poly) {
          this._poly = new longdo.Polygon(this._cluster._bounds.getRectVertex(), {});
        }

        if (!this._poly.active()) {
          this._map.Overlays.add(this._poly);
        }
      }
    }
  }, {
    key: "setCenter",
    value: function setCenter(center) {
      this._center = center;

      if (this._clusterMarker) {
        this._clusterMarker.move({
          "lat": center.lat,
          "lon": center.lon
        });
      }
    }
  }, {
    key: "setSums",
    value: function setSums(sums) {
      if (this._sums && sums.text === this._sums.text) {
        return;
      }

      this._sums = sums;
      this.index = sums.index;

      if (this._clusterMarker && this._clusterMarker.element()) {
        this._clusterMarker.element().children[0].children[0].innerHTML = this._sums.text;
        this._clusterMarker.title = "(id:".concat(this._cluster._cid, ")").concat(this._sums.text);
      }
    }
  }]);

  return ClusterIcon;
}();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: MarkerCluster, Cluster, LLBBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MarkerCluster_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MarkerCluster.js */ "./src/MarkerCluster.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MarkerCluster", function() { return _MarkerCluster_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cluster", function() { return _MarkerCluster_js__WEBPACK_IMPORTED_MODULE_0__["Cluster"]; });

/* harmony import */ var _LLBBox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LLBBox.js */ "./src/LLBBox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LLBBox", function() { return _LLBBox_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/***/ })

/******/ });
//# sourceMappingURL=longdomap.markercluster-src.js.map