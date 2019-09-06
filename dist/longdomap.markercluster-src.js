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
/*! exports provided: LLBBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LLBBox", function() { return LLBBox; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var longdo = window.longdo;
var LLBBox =
/*#__PURE__*/
function () {
  function LLBBox() {
    _classCallCheck(this, LLBBox);

    var locations = arguments.length === 0 ? [{
      'lat': 0,
      'lon': 0
    }] : arguments.length === 1 ? arguments[0] instanceof Array ? arguments[0] : [arguments[0]] : arguments[0] instanceof Array ? arguments[0] : [arguments[0]];
    this._projection = arguments.length <= 1 ? longdo.Projections.EPSG3857 : arguments[1];
    this.locationList = locations instanceof Array ? locations : [locations];
    this._bounds = longdo.Utils.locationBound(this.locationList);
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
    key: "add",
    value: function add(location) {
      this._locationList.push(location);

      this._bounds = longdo.Utils.locationBound(this._locationList);
    }
  }, {
    key: "remove",
    value: function remove(location) {
      this._locationList = this._locationList.filter(function (e) {
        return e !== location;
      });
    }
  }]);

  return LLBBox;
}();

/***/ }),

/***/ "./src/MarkerCluster.js":
/*!******************************!*\
  !*** ./src/MarkerCluster.js ***!
  \******************************/
/*! exports provided: MarkerCluster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkerCluster", function() { return MarkerCluster; });
/* harmony import */ var _LLBBox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LLBBox.js */ "./src/LLBBox.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

if (typeof window.longdo === 'undefined') {
  throw new Error('longdo API must be loaded before the longdomap heatmap plugin');
}

var longdo = window.longdo;

var MarkerCluster =
/*#__PURE__*/
function (_longdo$Marker) {
  _inherits(MarkerCluster, _longdo$Marker);

  function MarkerCluster(location, options) {
    _classCallCheck(this, MarkerCluster);

    return _possibleConstructorReturn(this, _getPrototypeOf(MarkerCluster).call(this, location, options));
  }

  _createClass(MarkerCluster, [{
    key: "initialize",
    value: function initialize(group, zoom, child1, child2) {
      this._group = group;
      this._zoom = zoom;
      this._markers = [];
      this._childClusters = [];
      this.childCount = 0;
      this._iconNeedsUpdate = true;
      this._boundsNeedUpdate = true;
      this._bounds = new _LLBBox_js__WEBPACK_IMPORTED_MODULE_0__["LLBBox"]();

      if (child1) {
        this._addChild(child1);
      }

      if (child2) {
        this._addChild(child2);
      }
    }
  }, {
    key: "getAllChildMarkers",
    value: function getAllChildMarkers(storageArray) {
      storageArray = storageArray || [];
      var len = this._childClusters.length;

      while (len--) {
        this._childClusters[len].getAllChildMarkers(storageArray);
      }

      len = this._markers.length;

      while (len--) {
        storageArray.push(this._markers[len]);
      }

      return storageArray;
    }
  }, {
    key: "getChildCount",
    value: function getChildCount() {
      return this._childCount;
    }
  }, {
    key: "zoomToBounds",
    value: function zoomToBounds() {//TODO
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      return this._bounds.getBounds();
    }
  }, {
    key: "_updateIcon",
    value: function _updateIcon() {//TODO
    }
  }, {
    key: "createIcon",
    value: function createIcon() {//TODO
    }
  }, {
    key: "createShadow",
    value: function createShadow() {//TODO
    }
  }, {
    key: "_addChild",
    value: function _addChild(new1, isNotificationFromChild) {
      this._iconNeedsUpdate = true;
      this._boundsNeedUpdate = true;

      this._setClusterCenter(new1);

      if (new1 instanceof MarkerCluster) {
        if (!isNotificationFromChild) {
          this._childClusters.push(new1);

          new1.__parent = this;
        }

        this._childCount += new1._childCount;
      } else {
        if (!isNotificationFromChild) {
          this._markers.push(new1);
        }

        this._childCount++;
      }

      if (this.__parent) {
        this.__parent._addChild(new1, true);
      }
    }
  }, {
    key: "_setClusterCenter",
    value: function _setClusterCenter(child) {
      if (!this._cLatLon) {
        this._cLatLon = child._cLatLon || child._latlon;
      }
    }
  }, {
    key: "_resetBounds",
    value: function _resetBounds() {
      var bounds = this._bounds;
      bounds.minLat = -Infinity;
      bounds.minLon = -Infinity;
      bounds.maxlon = Infinity;
      bounds.maxLat = Infinity;
    }
  }, {
    key: "_recalculateBounds",
    value: function _recalculateBounds() {
      var markers = this._markers,
          childClusters = this._childClusters,
          latSum = 0,
          lonSum = 0,
          totalCount = this._childCount,
          len,
          child,
          childLatLon,
          childCount;

      if (totalCount === 0) {
        return;
      }

      this._resetBounds();

      len = markers.length;

      while (len--) {
        childLatLon = markers[len]._latlon; //TODO

        latSum += childLatLon.lat;
        lonSum += childLatLon.lon;
      }

      len = childClusters.length;

      while (len--) {
        child = childClusters[len];

        if (child._boundsNeedUpdate) {
          child._recalculateBounds();
        } //TODO


        childLatLon = child._wLatLon;
        childCount = child._childCount;
        latSum += childLatLon.lat * childCount;
        lonSum += childLatLon.lon * childCount;
      }

      this._latlon = this._wLatLon = {
        "lat": latSum / totalCount,
        "lon": lonSum / totalCount
      };
      this._boundsNeedUpdate = false;
    }
  }, {
    key: "_addToMap",
    value: function _addToMap(startPos) {
      if (startPos) {
        this._backupLatlon = this._latlon;
        this.setLocation(this._latlon);
      } //TODO

    }
  }]);

  return MarkerCluster;
}(longdo.Marker);

/***/ }),

/***/ "./src/MarkerClusterGroup.js":
/*!***********************************!*\
  !*** ./src/MarkerClusterGroup.js ***!
  \***********************************/
/*! exports provided: MarkerClusterGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkerClusterGroup", function() { return MarkerClusterGroup; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var longdo = window.longdo;
var MarkerClusterGroup =
/*#__PURE__*/
function (_longdo$Layer) {
  _inherits(MarkerClusterGroup, _longdo$Layer);

  function MarkerClusterGroup() {
    var _this;

    _classCallCheck(this, MarkerClusterGroup);

    return _possibleConstructorReturn(_this);
  }

  _createClass(MarkerClusterGroup, [{
    key: "initialize",
    value: function initialize() {}
  }, {
    key: "add",
    value: function add() {}
  }, {
    key: "remove",
    value: function remove() {}
  }, {
    key: "addMarkers",
    value: function addMarkers() {}
  }, {
    key: "removeMarkers",
    value: function removeMarkers() {}
  }, {
    key: "clearMarkers",
    value: function clearMarkers() {}
  }, {
    key: "getMarkers",
    value: function getMarkers() {}
  }, {
    key: "getMarker",
    value: function getMarker() {}
  }, {
    key: "hasMarker",
    value: function hasMarker() {}
  }, {
    key: "zoomToShowMarker",
    value: function zoomToShowMarker() {}
  }, {
    key: "getVisibleParent",
    value: function getVisibleParent() {}
  }]);

  return MarkerClusterGroup;
}(longdo.Layer);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: MarkerClusterGroup, MarkerCluster, LLBBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MarkerClusterGroup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MarkerClusterGroup.js */ "./src/MarkerClusterGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MarkerClusterGroup", function() { return _MarkerClusterGroup_js__WEBPACK_IMPORTED_MODULE_0__["MarkerClusterGroup"]; });

/* harmony import */ var _MarkerCluster_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MarkerCluster.js */ "./src/MarkerCluster.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MarkerCluster", function() { return _MarkerCluster_js__WEBPACK_IMPORTED_MODULE_1__["MarkerCluster"]; });

/* harmony import */ var _LLBBox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LLBBox.js */ "./src/LLBBox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LLBBox", function() { return _LLBBox_js__WEBPACK_IMPORTED_MODULE_2__["LLBBox"]; });





/***/ })

/******/ });
//# sourceMappingURL=longdomap.markercluster-src.js.map