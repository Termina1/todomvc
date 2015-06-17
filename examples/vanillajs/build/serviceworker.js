/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(9);

	var CACHE_NAME = 'v1';

	var urlsToCache = ['/', '/app.js', 'node_modules/todomvc-common/base.css', 'node_modules/todomvc-app-css/index.css'];

	self.addEventListener('install', function (event) {
	  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
	    return cache.addAll(urlsToCache);
	  }));
	});

	self.addEventListener('fetch', function (event) {
	  event.respondWith(caches.match(event.request).then(function (response) {
	    if (response) {
	      return response;
	    }
	    return fetch(event.request);
	  }));
	});

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	if (!Cache.prototype.add) {
	  Cache.prototype.add = function add(request) {
	    return this.addAll([request]);
	  };
	}

	if (!Cache.prototype.addAll) {
	  Cache.prototype.addAll = function addAll(requests) {
	    var cache = this;

	    // Since DOMExceptions are not constructable:
	    function NetworkError(message) {
	      this.name = 'NetworkError';
	      this.code = 19;
	      this.message = message;
	    }
	    NetworkError.prototype = Object.create(Error.prototype);

	    return Promise.resolve().then(function() {
	      if (arguments.length < 1) throw new TypeError();
	      
	      // Simulate sequence<(Request or USVString)> binding:
	      var sequence = [];

	      requests = requests.map(function(request) {
	        if (request instanceof Request) {
	          return request;
	        }
	        else {
	          return String(request); // may throw TypeError
	        }
	      });

	      return Promise.all(
	        requests.map(function(request) {
	          if (typeof request === 'string') {
	            request = new Request(request);
	          }

	          var scheme = new URL(request.url).protocol;

	          if (scheme !== 'http:' && scheme !== 'https:') {
	            throw new NetworkError("Invalid scheme");
	          }

	          return fetch(request.clone());
	        })
	      );
	    }).then(function(responses) {
	      // TODO: check that requests don't overwrite one another
	      // (don't think this is possible to polyfill due to opaque responses)
	      return Promise.all(
	        responses.map(function(response, i) {
	          return cache.put(requests[i], response);
	        })
	      );
	    }).then(function() {
	      return undefined;
	    });
	  };
	}


/***/ }

/******/ });