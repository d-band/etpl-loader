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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_tpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _index_tpl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_tpl__WEBPACK_IMPORTED_MODULE_0__);


window.ENCODE = (str) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

document.getElementById('root').innerHTML = _index_tpl__WEBPACK_IMPORTED_MODULE_0___default()({
  name: 'hello',
  email: 'hello@example.com',
  skills: [
    '<a href="https://en.wikipedia.org/wiki/JavaScript">JavaScript</a>',
    '<a href="https://www.oracle.com/java/">Java</a>',
    '<a href="https://en.wikipedia.org/wiki/C%2B%2B">C++</a>',
    '<a href="https://golang.org">Go</a>'
  ],
  projects: [{
    name: '<a href="https://github.com/d-band/etpl-loader">etpl-loader</a>',
    description: 'Ejs template webpack loader.'
  }, {
    name: '<a href="https://github.com/d-band/dool">dool</a>',
    description: 'Build tool based on webpack.'
  }, {
    name: '<a href="https://github.com/d-band/yax">yax</a>',
    description: 'Yet another store using redux.'
  }],
  site: {
    name: 'D-Band',
    year: '2018'
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (data) {
  var out = '<p>';
  out += ENCODE(data.name);
  out += '</p><p>';
  out += ENCODE(data.email);
  out += '</p><ul> ';

  for (var i = 0; i < data.skills.length; i++) {
    var skill = data.skills[i];
    out += ' <li>';
    out += skill;
    out += '</li> ';
  }

  out += '</ul><div> ';
  data.projects.forEach(project => {
    out += ' <div> <h3>';
    out += project.name;
    out += '</h3> <p>';
    out += ENCODE(project.description);
    out += '</p> </div> ';
  });
  out += '</div><div>Copyright © ';
  out += ENCODE(data.site.year);
  out += '&nbsp;';
  out += ENCODE(data.site.name);
  out += '. All Rights Reserved.</div>';
  return out;
};

/***/ })
/******/ ]);