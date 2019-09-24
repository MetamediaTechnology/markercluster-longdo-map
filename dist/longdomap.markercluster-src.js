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

/***/ "./src/Cluster.js":
/*!************************!*\
  !*** ./src/Cluster.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Icon */ "./src/Icon.js");
/* harmony import */ var _LLBBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LLBBox */ "./src/LLBBox.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var longdo = window.longdo;

var _default =
/*#__PURE__*/
function () {
  function _default(markerCluster, config, iloader) {
    _classCallCheck(this, _default);

    this._markerCluster = markerCluster;
    this._config = config;
    this._map = markerCluster._map;
    this._center = null;
    this._markers = [];
    this._bounds = null;
    this._clusterIcon = new _Icon__WEBPACK_IMPORTED_MODULE_0__["ClusterIcon"](this, this._config, iloader);
  }

  _createClass(_default, [{
    key: "addMarker",
    value: function addMarker(marker, tile) {
      if (this._markers.indexOf(marker) !== -1) {
        return false;
      }

      if (!this._center) {
        this._center = marker.location();

        this._calculateBounds();
      } else {
        if (this._config.averageCenter) {
          this._center = longdo.Util.averageLocation(longdo.Projections.EPSG3857, this._center, marker.location());
        }
      }

      marker.isAdded = true;

      this._markers.push(marker);

      if (this._config.swarmModeEnabled && this._config.swarmAlg === 1) {
        //TODO
        if (!this._gridids) {
          this._gridids = [];
        }

        this._gridids.push(_LLBBox__WEBPACK_IMPORTED_MODULE_1__["LLBBox"].generateFrom(longdo.Util.boundOfTile(longdo.Projections.EPSG3857, tile)).getNxNGridCord(marker.location(), 4));

        if (!this._markersToShow) {
          this._markersToShow = [marker];
        } else if (this._markersToShow.length <= 64) {
          var markersInSameGrid = 0;
          var that = this;

          this._gridids.forEach(function (value) {
            var gridid = that._gridids[that._gridids.length - 1];
            markersInSameGrid += gridid.u === value.u && gridid.v === value.v ? 1 : 0;
          });

          if (markersInSameGrid % 8 !== 0) {
            return true;
          }

          this._markersToShow.push(marker);
        } else {
          return true;
        }

        if (!marker.active()) {
          this._map.Overlays.add(marker);
        }

        this.updateIcon();
        return true;
      } else if (this._config.swarmModeEnabled && this._config.swarmAlg === 2) {
        if (this._markers.length % 10 === 1) {
          if (!marker.active()) {
            this._map.Overlays.add(marker);
          }
        }

        this.updateIcon();
        return true;
      }

      var len = this._markers.length;

      if (len < this._config.minClusterSize) {
        if (!marker.active()) {
          this._map.Overlays.add(marker);
        }
      }

      if (len === this._config.minClusterSize) {
        var lenc = len;

        while (lenc--) {
          var m = this._markers[lenc];

          if (m.active()) {
            this._map.Overlays.remove(m);
          }
        }
      }

      if (len >= this._config.minClusterSize) {
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

      this._bounds.removeArea(this._map);
    }
  }, {
    key: "_calculateBounds",
    value: function _calculateBounds() {
      this._bounds = _LLBBox__WEBPACK_IMPORTED_MODULE_1__["LLBBox"].generateRect(this._center).extendSize(this._config.gridSize * Math.pow(2, -this._map.zoom()));
    }
  }, {
    key: "updateIcon",
    value: function updateIcon() {
      if (this._config.drawMarkerArea) {
        this._bounds.drawArea(this._map);
      }

      var zoom = this._map.zoom();

      var mz = this._config.maxZoom;

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

      if (this._config.swarmModeEnabled) {
        //TODO
        return;
      }

      if (this._markers.length < this._config.minClusterSize) {
        this._clusterIcon.hide();

        return;
      }

      var sums = this._markers.length;

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

  return _default;
}();



/***/ }),

/***/ "./src/ConfigHandler.js":
/*!******************************!*\
  !*** ./src/ConfigHandler.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = function _default(options) {
  _classCallCheck(this, _default);

  this.maxZoom = options.maxZoom || null;
  this.minClusterSize = options.minClusterSize || 2;
  this.gridSize = options.gridSize || 120;
  this.clusterRadius = options.clusterRadius || this.gridSize;
  this.averageCenter = options.averageCenter;
  this.drawMarkerArea = options.drawMarkerArea;
  this.swarmModeEnabled = options.swarmModeEnabled;
  this.swarmAlg = options.swarmAlg ? parseInt(options.swarmAlg, 10) : null;
  this.styles = options.styles || null;
};



/***/ }),

/***/ "./src/Icon.js":
/*!*********************!*\
  !*** ./src/Icon.js ***!
  \*********************/
/*! exports provided: ClusterIcon, IconLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClusterIcon", function() { return ClusterIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconLoader", function() { return IconLoader; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var longdo = window.longdo;
var ClusterIcon =
/*#__PURE__*/
function () {
  function ClusterIcon(cluster, config, iloader) {
    _classCallCheck(this, ClusterIcon);

    this._cluster = cluster;
    this._config = config;
    this._iloader = iloader;
    this._center = null;
    this._map = cluster._map;
    this._visible = false;
    this._sums = null;
    this._clusterMarker = new longdo.Marker({
      "lat": 0,
      "lon": 0
    }, {
      "icon": this._cluster._markerCluster._iloader.getIcon(0),
      "weight": longdo.OverlayWeight.Top
    });
  }

  _createClass(ClusterIcon, [{
    key: "show",
    value: function show() {
      if (!this._config.swarmModeEnabled) {
        var pos = this._center;

        if (this._clusterMarker.active()) {
          this._map.Overlays.move(this._clusterMarker, pos);
        } else {
          this._clusterMarker.setLocation(pos);

          this._map.Overlays.add(this._clusterMarker);

          if (this._poly) {
            this._map.Overlays.remove(this._poly);
          }

          if (this._config.drawMarkerArea) {
            this._poly = new longdo.Polygon(this._cluster._bounds.getRectVertex(), {});

            this._map.Overlays.add(this._poly);
          }
        }

        this._visible = true;
      }
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

      if (this._config.drawMarkerArea) {
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
      if (this._sums && sums === this._sums) {
        return;
      }

      this._sums = sums;

      if (this._clusterMarker && this._clusterMarker.element()) {
        this._iloader.changeNumber(this._clusterMarker.element(), this._sums);
      }
    }
  }]);

  return ClusterIcon;
}();
var IconLoader =
/*#__PURE__*/
function () {
  function IconLoader(markercluster, config) {
    _classCallCheck(this, IconLoader);

    this._markerCluster = markercluster;
    this._config = config;
    this._images = new Map();
    this.ready = false;
    this.useDefault = true;

    if (this._config.styles) {
      this.loadStyles(this._config.styles);
    }
  }

  _createClass(IconLoader, [{
    key: "load",
    value: function load(url, width, height, minThreshold) {
      this.ready = false;
      this.useDefault = false;
      var img = new Image(width, height);

      this._images.set(img, {
        "ready": false,
        "minThreshold": minThreshold
      });

      var that = this;

      img.onload = function () {
        that._images.get(img).ready = true;

        if (_toConsumableArray(that._images.values()).every(function (elm) {
          return elm.ready;
        })) {
          that.ready = true;

          that._markerCluster.resetViewport();

          that._markerCluster._createClusters();
        }
      };

      img.src = url;
      return this._images.keys.length - 1;
    }
  }, {
    key: "loadStyles",
    value: function loadStyles(styles) {
      styles.sort(function (elm1, elm2) {
        return elm1.minThreshold < elm2.minThreshold ? 1 : elm1.minThreshold === elm2.minThreshold ? 0 : -1;
      });
      var len = styles.length;

      while (len--) {
        var style = styles[len];
        this.load(style.url, style.width, style.height, style.minThreshold);
      }
    }
  }, {
    key: "getIcon",
    value: function getIcon(index) {
      var result = {
        "offset": {
          "x": 0,
          "y": 0
        }
      };

      if (this.useDefault || typeof index === 'undefined') {
        var elm = document.createElement("div");
        var elm2 = document.createElement('div');
        var elm3 = document.createElement('span');
        elm.appendChild(elm2);
        elm2.appendChild(elm3);
        elm.style.width = '40px';
        elm.style.height = '40px';
        elm.style.marginLeft = '-20px';
        elm.style.marginTop = '-20px';
        elm.style.overflow = 'hidden';
        elm.className += ' marker-cluster marker-cluster-small leaflet-marker-icon';
        result.html = elm.outerHTML;
        result.size = {
          "width": 40,
          "height": 40
        };
      } else {
        var img = _toConsumableArray(this._images.keys())[index];

        var _elm = document.createElement("div");

        _elm.style.width = "".concat(img.width, "px");
        _elm.style.height = "".concat(img.height, "px");
        _elm.style.marginLeft = "-".concat(img.width / 2, "px");
        _elm.style.marginTop = "-".concat(img.height / 2, "px");
        _elm.style.background = "url('".concat(encodeURI(img.src), "') no-repeat center top");
        _elm.style.lineHeight = _elm.style.height;
        _elm.style.color = 'black';
        _elm.style.fontWeight = 'bold';
        _elm.style.textAlign = 'center';
        result.html = _elm.outerHTML;
        result.size = {
          "width": img.width,
          "height": img.height
        };
      }

      return result;
    }
  }, {
    key: "changeNumber",
    value: function changeNumber(element, num) {
      if (this.useDefault) {
        element.children[0].children[0].children[0].innerText = "".concat(num);
        var list = element.children[0].classList;
        list.remove('marker-cluster-large');
        list.remove('marker-cluster-medium');
        list.remove('marker-cluster-small');

        if (num < 10) {
          list.add('marker-cluster-small');
        } else if (num < 100) {
          list.add('marker-cluster-medium');
        } else {
          list.add('marker-cluster-large');
        }
      } else {
        element.children[0].innerText = "".concat(num);

        var _list = _toConsumableArray(this._images.keys());

        var len = _list.length;

        while (len--) {
          var img = _list[len];

          if (num >= this._images.get(img).minThreshold) {
            var elm = element;
            elm.style.width = "".concat(img.width, "px");
            elm.style.height = "".concat(img.height, "px");
            elm = elm.children[0];
            elm.style.background = "url('".concat(encodeURI(img.src), "') no-repeat center top");
            elm.style.width = "".concat(img.width, "px");
            elm.style.height = "".concat(img.height, "px");
            elm.style.lineHeight = elm.style.height;
            break;
          }
        }
      }
    }
  }]);

  return IconLoader;
}();

/***/ }),

/***/ "./src/LLBBox.js":
/*!***********************!*\
  !*** ./src/LLBBox.js ***!
  \***********************/
/*! exports provided: LLBBox, LLCircle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LLBBox", function() { return LLBBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LLCircle", function() { return LLCircle; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var longdo = window.longdo;
var LLBBox =
/*#__PURE__*/
function () {
  function LLBBox(locations) {
    _classCallCheck(this, LLBBox);

    this._projection = longdo.Projections.EPSG3857;
    this._locationList = locations.slice();
    this._originalLocationList = this._locationList.slice();

    if (locations.length > 0) {
      this._bounds = longdo.Util.locationBound(this._locationList);
    }
  }

  _createClass(LLBBox, [{
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
    key: "LT",
    value: function LT() {
      return {
        "lon": this._bounds.minLon,
        "lat": this._bounds.maxLat
      };
    }
  }, {
    key: "RT",
    value: function RT() {
      return {
        "lon": this._bounds.maxLon,
        "lat": this._bounds.maxLat
      };
    }
  }, {
    key: "LB",
    value: function LB() {
      return {
        "lon": this._bounds.minLon,
        "lat": this._bounds.minLat
      };
    }
  }, {
    key: "RB",
    value: function RB() {
      return {
        "lon": this._bounds.maxLon,
        "lat": this._bounds.minLat
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
  }, {
    key: "drawArea",
    value: function drawArea(map) {
      this._poly = new longdo.Polygon(this.getRectVertex());
      map.Overlays.add(this._poly);
    }
  }, {
    key: "removeArea",
    value: function removeArea(map) {
      if (this._poly && this._poly.active()) {
        map.Overlays.remove(this._poly);
        delete this._poly;
      }
    }
  }, {
    key: "getNxNGridCord",
    value: function getNxNGridCord(loc, n) {
      if (!this.isLocInBounds(loc)) {
        return null;
      }

      var xlen = (this._bounds.maxLon - this._bounds.minLon) / n;
      var ylen = (this._lat2y(this._bounds.maxLat) - this._lat2y(this._bounds.minLat)) / n;
      var lonoffset = loc.lon - this._bounds.minLon;

      var yoffset = -this._lat2y(loc.lat) + this._lat2y(this._bounds.maxLat);

      var xid = Math.floor(lonoffset / xlen),
          yid = Math.floor(yoffset / ylen);
      return {
        "u": xid,
        "v": yid
      };
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
  }], [{
    key: "generateFrom",
    value: function generateFrom(bound) {
      return new LLBBox([{
        "lon": bound.minLon,
        "lat": bound.minLat
      }, {
        'lon': bound.maxLon,
        'lat': bound.maxLat
      }]);
    }
  }, {
    key: "generateRect",
    value: function generateRect(loc1, loc2) {
      if (!loc2) {
        loc2 = loc1;
      }

      return new LLBBox([loc1, loc2]);
    }
  }]);

  return LLBBox;
}();
var LLCircle = function LLCircle(center, radius) {
  _classCallCheck(this, LLCircle);

  this.center = center;
  this.sqrad = radius * radius;
};

/***/ }),

/***/ "./src/MarkerCluster.js":
/*!******************************!*\
  !*** ./src/MarkerCluster.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MarkerCluster; });
/* harmony import */ var _LLBBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LLBBox */ "./src/LLBBox.js");
/* harmony import */ var _ConfigHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfigHandler */ "./src/ConfigHandler.js");
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon */ "./src/Icon.js");
/* harmony import */ var _Cluster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Cluster */ "./src/Cluster.js");
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
    this._prevZoom = 2;
    this._ready = false;
    this.config = new _ConfigHandler__WEBPACK_IMPORTED_MODULE_1__["default"](options);
    this._iloader = new _Icon__WEBPACK_IMPORTED_MODULE_2__["IconLoader"](this, this.config);
    var that = this;

    this._map.Event.bind('ready', function () {
      if (!that._ready && !that._iloader.ready) {
        return;
      }

      that._prevZoom = that._map.zoom;
      that.resetViewport();

      that._createClusters();
    });

    this._map.Event.bind('zoom', function ()
    /*pivot*/
    {
      if (!that._ready && !that._iloader.ready) {
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
      if (!that._ready && !that._iloader.ready) {
        return;
      } //that.resetViewport();
      //that._createClusters();

    });

    this._map.Event.bind('drop', function () {
      if (!that._ready && !that._iloader.ready) {
        return;
      }

      that.resetViewport();

      that._createClusters();
    });
    /*
    this._map.Event.bind('drag', function(move){
     if(that._ready){
         that.resetViewport();
         that._createClusters();
     }
    });
    */
    //    this._map.Event.bind('loadTile',function(str) {
    //         if(str !== 'finish' && !that._ready && !that._iloader.ready){return;}
    //         that.resetViewport();
    //         that._createClusters();
    //     });


    this._map.Event.bind('overlayClick', function (overlay) {
      if (!that._ready) {
        return;
      }

      var len = that._clusters.length;

      while (len--) {
        var cl = that._clusters[len];

        if (overlay === cl._clusterIcon._clusterMarker) {
          var l = [];
          var len2 = cl._markers.length;

          while (len2--) {
            l.push(cl._markers[len2].location());
          } //that._map.bound(cl._bounds.getBounds());


          that._map.bound(longdo.Util.locationBound(l));

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

      if (this.config.swarmModeEnabled && this.config.swarmAlg === 2) {
        this.shuffle();
      }
    }
  }, {
    key: "shuffle",
    value: function shuffle() {
      for (var i = this._markers.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var temp = this._markers[i];
        this._markers[i] = this._markers[r];
        this._markers[r] = temp;
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

      var mapBounds = _LLBBox__WEBPACK_IMPORTED_MODULE_0__["LLBBox"].generateFrom(this._map.bound());
      var bounds = mapBounds.extendSize(this.config.gridSize * Math.pow(2, -this._map.zoom()));
      var len = this._markers.length;

      while (len--) {
        var m = this._markers[len];
        var loc = m.location();

        if (!m.isAdded && bounds.isLocInBounds(loc)) {
          if (!this.config.swarmModeEnabled) {
            this._addToClosestCluster(m);
          } else {
            if (this.config.swarmAlg === 2) {
              this._addToClosestCluster(m);
            } else {
              this._addToTiledCluster(m);
            }
          }
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
        var _cluster = new _Cluster__WEBPACK_IMPORTED_MODULE_3__["default"](this, this.config, this._iloader);

        _cluster.addMarker(marker);

        this._clusters.push(_cluster);
      }
    }
  }, {
    key: "_addToTiledCluster",
    value: function _addToTiledCluster(marker) {
      var that = this;

      var locationToTile = function locationToTile(loc) {
        var point = longdo.Util.locationToPoint(longdo.Projections.EPSG3857, loc);
        point.z = 20 - that._map.zoom();
        return longdo.Util.pointToTile(point);
      };

      var tile = locationToTile(marker.location());
      var len = this._clusters.length;

      while (len--) {
        var _cluster2 = this._clusters[len];

        if (_cluster2.u === tile.u && _cluster2.v === tile.v) {
          _cluster2.addMarker(marker, tile);

          return;
        }
      }

      var cluster = new _Cluster__WEBPACK_IMPORTED_MODULE_3__["default"](this, this.config, this._iloader);
      cluster.u = tile.u;
      cluster.v = tile.v;
      cluster.addMarker(marker, tile);

      this._clusters.push(cluster);
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
  }]);

  return MarkerCluster;
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: MarkerCluster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MarkerCluster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MarkerCluster */ "./src/MarkerCluster.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MarkerCluster", function() { return _MarkerCluster__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ })

/******/ });
//# sourceMappingURL=longdomap.markercluster-src.js.map