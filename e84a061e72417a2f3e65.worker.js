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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/ts-loader/index.js!./src/layer/hipparcos_catalog_layer/loader.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@hscmap/angle/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@hscmap/angle/lib/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar sprintf_js_1 = __webpack_require__(/*! sprintf-js */ \"./node_modules/sprintf-js/src/sprintf.js\");\nvar Angle = (function () {\n    function Angle(rad) {\n        this.rad = rad;\n    }\n    Object.defineProperty(Angle.prototype, \"deg\", {\n        get: function () { return rad2deg(this.rad); },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Angle.prototype, \"amin\", {\n        get: function () { return rad2amin(this.rad); },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Angle.prototype, \"asec\", {\n        get: function () { return rad2asec(this.rad); },\n        enumerable: true,\n        configurable: true\n    });\n    Angle.fromRad = function (rad) { return new Angle(rad); };\n    Angle.fromDeg = function (deg) { return new Angle(deg2rad(deg)); };\n    Angle.fromAmin = function (amin) { return new Angle(amin2rad(amin)); };\n    Angle.fromAsec = function (asec) { return new Angle(asec2rad(asec)); };\n    Angle.prototype.sexadecimal = function (hour2deg, showSign) {\n        var totalSeconds = 3600 * this.deg / hour2deg;\n        var sign = showSign ? (totalSeconds < 0 ? '-' : '+') : '';\n        var s = Math.abs(totalSeconds);\n        return sprintf_js_1.sprintf(sign + \"%02d:%02d:%07.4f\", Math.floor(s / 3600), Math.floor(s / 60 % 60), s % 60);\n    };\n    Angle.prototype.clone = function () {\n        return new Angle(this.rad);\n    };\n    return Angle;\n}());\nexports.Angle = Angle;\nvar EquatorialCoord = (function () {\n    function EquatorialCoord(a, d) {\n        this.a = a;\n        this.d = d;\n    }\n    EquatorialCoord.parse = function (s) {\n        var _a = parseEquatorialCoord(s), a = _a.a, d = _a.d;\n        return new EquatorialCoord(a, d);\n    };\n    Object.defineProperty(EquatorialCoord.prototype, \"xyz\", {\n        get: function () {\n            var a = this.a.rad;\n            var d = this.d.rad;\n            var cosd = Math.cos(d);\n            return [\n                cosd * Math.cos(a),\n                cosd * Math.sin(a),\n                Math.sin(d)\n            ];\n        },\n        enumerable: true,\n        configurable: true\n    });\n    EquatorialCoord.fromXyz = function (_a) {\n        var x = _a[0], y = _a[1], z = _a[2];\n        var r2 = x * x + y * y;\n        if (r2 == 0) {\n            return EquatorialCoord.fromRad(0, z > 0 ? Math.PI / 2 : -Math.PI / 2);\n        }\n        else {\n            var PI2_1 = 2 * Math.PI;\n            var a = (Math.atan2(y, x) + PI2_1) % PI2_1;\n            var d = Math.atan2(z, Math.sqrt(r2));\n            return EquatorialCoord.fromRad(a, d);\n        }\n    };\n    EquatorialCoord.fromRad = function (a, d) {\n        return new EquatorialCoord(Angle.fromRad(a), Angle.fromRad(d));\n    };\n    EquatorialCoord.fromDeg = function (a, d) {\n        return new EquatorialCoord(Angle.fromDeg(a), Angle.fromDeg(d));\n    };\n    EquatorialCoord.prototype.toString = function () {\n        return {\n            a: this.a.sexadecimal(15, false),\n            d: this.d.sexadecimal(1, true),\n        };\n    };\n    EquatorialCoord.prototype.clone = function () {\n        return new EquatorialCoord(this.a.clone(), this.d.clone());\n    };\n    return EquatorialCoord;\n}());\nexports.EquatorialCoord = EquatorialCoord;\nfunction deg2rad(deg) {\n    // return deg / 180 * Math.PI\n    return 0.01745329252 * deg;\n}\nexports.deg2rad = deg2rad;\nfunction amin2rad(amin) {\n    // return arcmin / (60 * 180) * Math.PI\n    return 0.0002908882087 * amin;\n}\nexports.amin2rad = amin2rad;\nfunction asec2rad(asec) {\n    // return arcsec / (3600 * 180) * Math.PI\n    return 0.000004848136811;\n}\nexports.asec2rad = asec2rad;\nfunction rad2deg(rad) {\n    // return rad / Math.PI * 180\n    return 57.2957795131 * rad;\n}\nexports.rad2deg = rad2deg;\nfunction rad2amin(rad) {\n    // return rad / Math.PI * 180 * 60\n    return 3437.7467707849 * rad;\n}\nexports.rad2amin = rad2amin;\nfunction rad2asec(rad) {\n    // return rad / Math.PI * 180 * 3600\n    return 206264.806247096 * rad;\n}\nexports.rad2asec = rad2asec;\nvar PI2 = 2 * Math.PI;\nfunction wrapTo2Pi(x) {\n    if (x < 0)\n        return PI2 - (-x % (PI2));\n    else\n        return x % PI2;\n}\nexports.wrapTo2Pi = wrapTo2Pi;\nfunction parseEquatorialCoord(s) {\n    s = s.replace(/([\\+\\-])\\s+(\\d)/, '$1$2');\n    var numbers = s.match(/(?:[\\+\\-]?[\\d\\.]+)/g);\n    if (numbers == null || numbers.length < 2 || numbers.length % 2 != 0) {\n        throw new Error(\"invalid coord format: '\" + s + \"': numbers=\" + JSON.stringify(numbers));\n    }\n    if (numbers.length == 2) {\n        return EquatorialCoord.fromDeg(Number(numbers[0]), Number(numbers[1]));\n    }\n    return new EquatorialCoord(parseSexadecimal(numbers.slice(0, numbers.length / 2), 15), parseSexadecimal(numbers.slice(numbers.length / 2), 1));\n}\nfunction parseSexadecimal(numbers, hour2deg) {\n    if (numbers.length == 0 || numbers.length > 3) {\n        throw new Error(\"invalid coord format: '\" + numbers.join(', ') + \"'\");\n    }\n    var hs = numbers[0];\n    var m = numbers[1] != undefined ? Number(numbers[1]) : 0;\n    var s = numbers[2] != undefined ? Number(numbers[2]) : 0;\n    if (hs.substr(0, 1) == '-') {\n        return Angle.fromDeg(-hour2deg * (s / 3600 + m / 60 + Number(hs.substr(1))));\n    }\n    else {\n        return Angle.fromDeg(hour2deg * (s / 3600 + m / 60 + Number(hs)));\n    }\n}\n\n\n//# sourceURL=webpack:///./node_modules/@hscmap/angle/lib/index.js?");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-0._json":
/*!****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-0._json ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"50d98aaedebabab65bcd963f5022009b._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-0._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-1._json":
/*!****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-1._json ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"a1f765a7a7de50107eb632e5b344c4a9._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-1._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-10._json":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-10._json ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d2a512b955e25f1af0c914cbf663034d._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-10._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-11._json":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-11._json ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d4c97d415c3938cfd89aa259e899d54f._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-11._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-12._json":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-12._json ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"821959c233499502b1131d34780f6e9f._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-12._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-13._json":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-13._json ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"a9c6cc59d801334b8ed000938f3cd2a4._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-13._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-14._json":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-14._json ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"d95149caa92cd7491d27f4b454f85733._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-14._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-15._json":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-15._json ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"99263b97f6a85d3bc1f4d396131e5e8e._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-15._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-16._json":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-16._json ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"0172e85b1e3aae46d939dda27c21060f._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-16._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-17._json":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-17._json ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"ca7db6ba72bc387cb72f228b8301846d._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-17._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-18._json":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-18._json ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"7cc053378d4f7caea9fc955e36b443c2._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-18._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-19._json":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-19._json ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"1140c6e3645bfcc915631a8cda86c05f._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-19._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-2._json":
/*!****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-2._json ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"2b1bf82ab0baf10e227d1db2366b9d09._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-2._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-3._json":
/*!****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-3._json ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"e08118fceafd25bc9a9458d05fedf2f9._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-3._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-4._json":
/*!****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-4._json ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"23ee1b0e61a05f9a94f25eff9cd209fb._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-4._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-5._json":
/*!****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-5._json ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fbb63f86073c8fe6c352d233475313d5._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-5._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-6._json":
/*!****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-6._json ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"48f4bfe34e04a093fa7e63fc12a3ebf6._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-6._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-7._json":
/*!****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-7._json ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"58f8a5d340a1e8be6c926289c6f970d9._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-7._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-8._json":
/*!****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-8._json ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"e8de10c67646833bccc30ee0feb93704._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-8._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-9._json":
/*!****************************************************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-9._json ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"cd6a26a18d4b01d76defb9e8c4247315._json\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/part-9._json?./node_modules/file-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/sprintf-js/src/sprintf.js":
/*!************************************************!*\
  !*** ./node_modules/sprintf-js/src/sprintf.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, exports, define */\n\n!function() {\n    'use strict'\n\n    var re = {\n        not_string: /[^s]/,\n        not_bool: /[^t]/,\n        not_type: /[^T]/,\n        not_primitive: /[^v]/,\n        number: /[diefg]/,\n        numeric_arg: /[bcdiefguxX]/,\n        json: /[j]/,\n        not_json: /[^j]/,\n        text: /^[^\\x25]+/,\n        modulo: /^\\x25{2}/,\n        placeholder: /^\\x25(?:([1-9]\\d*)\\$|\\(([^\\)]+)\\))?(\\+)?(0|'[^$])?(-)?(\\d+)?(?:\\.(\\d+))?([b-gijostTuvxX])/,\n        key: /^([a-z_][a-z_\\d]*)/i,\n        key_access: /^\\.([a-z_][a-z_\\d]*)/i,\n        index_access: /^\\[(\\d+)\\]/,\n        sign: /^[\\+\\-]/\n    }\n\n    function sprintf(key) {\n        // `arguments` is not an array, but should be fine for this call\n        return sprintf_format(sprintf_parse(key), arguments)\n    }\n\n    function vsprintf(fmt, argv) {\n        return sprintf.apply(null, [fmt].concat(argv || []))\n    }\n\n    function sprintf_format(parse_tree, argv) {\n        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, match, pad, pad_character, pad_length, is_positive, sign\n        for (i = 0; i < tree_length; i++) {\n            if (typeof parse_tree[i] === 'string') {\n                output += parse_tree[i]\n            }\n            else if (Array.isArray(parse_tree[i])) {\n                match = parse_tree[i] // convenience purposes only\n                if (match[2]) { // keyword argument\n                    arg = argv[cursor]\n                    for (k = 0; k < match[2].length; k++) {\n                        if (!arg.hasOwnProperty(match[2][k])) {\n                            throw new Error(sprintf('[sprintf] property \"%s\" does not exist', match[2][k]))\n                        }\n                        arg = arg[match[2][k]]\n                    }\n                }\n                else if (match[1]) { // positional argument (explicit)\n                    arg = argv[match[1]]\n                }\n                else { // positional argument (implicit)\n                    arg = argv[cursor++]\n                }\n\n                if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && arg instanceof Function) {\n                    arg = arg()\n                }\n\n                if (re.numeric_arg.test(match[8]) && (typeof arg !== 'number' && isNaN(arg))) {\n                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))\n                }\n\n                if (re.number.test(match[8])) {\n                    is_positive = arg >= 0\n                }\n\n                switch (match[8]) {\n                    case 'b':\n                        arg = parseInt(arg, 10).toString(2)\n                        break\n                    case 'c':\n                        arg = String.fromCharCode(parseInt(arg, 10))\n                        break\n                    case 'd':\n                    case 'i':\n                        arg = parseInt(arg, 10)\n                        break\n                    case 'j':\n                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)\n                        break\n                    case 'e':\n                        arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential()\n                        break\n                    case 'f':\n                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)\n                        break\n                    case 'g':\n                        arg = match[7] ? String(Number(arg.toPrecision(match[7]))) : parseFloat(arg)\n                        break\n                    case 'o':\n                        arg = (parseInt(arg, 10) >>> 0).toString(8)\n                        break\n                    case 's':\n                        arg = String(arg)\n                        arg = (match[7] ? arg.substring(0, match[7]) : arg)\n                        break\n                    case 't':\n                        arg = String(!!arg)\n                        arg = (match[7] ? arg.substring(0, match[7]) : arg)\n                        break\n                    case 'T':\n                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()\n                        arg = (match[7] ? arg.substring(0, match[7]) : arg)\n                        break\n                    case 'u':\n                        arg = parseInt(arg, 10) >>> 0\n                        break\n                    case 'v':\n                        arg = arg.valueOf()\n                        arg = (match[7] ? arg.substring(0, match[7]) : arg)\n                        break\n                    case 'x':\n                        arg = (parseInt(arg, 10) >>> 0).toString(16)\n                        break\n                    case 'X':\n                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()\n                        break\n                }\n                if (re.json.test(match[8])) {\n                    output += arg\n                }\n                else {\n                    if (re.number.test(match[8]) && (!is_positive || match[3])) {\n                        sign = is_positive ? '+' : '-'\n                        arg = arg.toString().replace(re.sign, '')\n                    }\n                    else {\n                        sign = ''\n                    }\n                    pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' '\n                    pad_length = match[6] - (sign + arg).length\n                    pad = match[6] ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''\n                    output += match[5] ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)\n                }\n            }\n        }\n        return output\n    }\n\n    var sprintf_cache = Object.create(null)\n\n    function sprintf_parse(fmt) {\n        if (sprintf_cache[fmt]) {\n            return sprintf_cache[fmt]\n        }\n\n        var _fmt = fmt, match, parse_tree = [], arg_names = 0\n        while (_fmt) {\n            if ((match = re.text.exec(_fmt)) !== null) {\n                parse_tree.push(match[0])\n            }\n            else if ((match = re.modulo.exec(_fmt)) !== null) {\n                parse_tree.push('%')\n            }\n            else if ((match = re.placeholder.exec(_fmt)) !== null) {\n                if (match[2]) {\n                    arg_names |= 1\n                    var field_list = [], replacement_field = match[2], field_match = []\n                    if ((field_match = re.key.exec(replacement_field)) !== null) {\n                        field_list.push(field_match[1])\n                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {\n                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {\n                                field_list.push(field_match[1])\n                            }\n                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {\n                                field_list.push(field_match[1])\n                            }\n                            else {\n                                throw new SyntaxError('[sprintf] failed to parse named argument key')\n                            }\n                        }\n                    }\n                    else {\n                        throw new SyntaxError('[sprintf] failed to parse named argument key')\n                    }\n                    match[2] = field_list\n                }\n                else {\n                    arg_names |= 2\n                }\n                if (arg_names === 3) {\n                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')\n                }\n                parse_tree.push(match)\n            }\n            else {\n                throw new SyntaxError('[sprintf] unexpected placeholder')\n            }\n            _fmt = _fmt.substring(match[0].length)\n        }\n        return sprintf_cache[fmt] = parse_tree\n    }\n\n    /**\n     * export to either browser or node.js\n     */\n    /* eslint-disable quote-props */\n    if (true) {\n        exports['sprintf'] = sprintf\n        exports['vsprintf'] = vsprintf\n    }\n    if (typeof window !== 'undefined') {\n        window['sprintf'] = sprintf\n        window['vsprintf'] = vsprintf\n\n        if (true) {\n            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n                return {\n                    'sprintf': sprintf,\n                    'vsprintf': vsprintf\n                }\n            }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))\n        }\n    }\n    /* eslint-enable quote-props */\n}()\n\n\n//# sourceURL=webpack:///./node_modules/sprintf-js/src/sprintf.js?");

/***/ }),

/***/ "./node_modules/ts-loader/index.js!./src/layer/hipparcos_catalog_layer/loader.ts":
/*!******************************************************************************!*\
  !*** ./node_modules/ts-loader!./src/layer/hipparcos_catalog_layer/loader.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tslib_1 = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\nvar angle_1 = __webpack_require__(/*! @hscmap/angle */ \"./node_modules/@hscmap/angle/lib/index.js\");\nvar ajax_1 = __webpack_require__(/*! ../../utils/ajax */ \"./src/utils/ajax.ts\");\nvar N = __webpack_require__(/*! ./data/index.json */ \"./src/layer/hipparcos_catalog_layer/data/index.json\").n;\nvar urls = range(N).map(function (i) { return __webpack_require__(\"./src/layer/hipparcos_catalog_layer/data sync recursive ./node_modules/file-loader/dist/cjs.js!./ ^\\\\.\\\\/part\\\\-.*\\\\._json$\")(\"./part-\" + i + \"._json\"); });\nvar jsArray = [];\nfunction main() {\n    return tslib_1.__awaiter(this, void 0, void 0, function () {\n        var _i, urls_1, url, _a, buffer;\n        return tslib_1.__generator(this, function (_b) {\n            switch (_b.label) {\n                case 0:\n                    _i = 0, urls_1 = urls;\n                    _b.label = 1;\n                case 1:\n                    if (!(_i < urls_1.length)) return [3 /*break*/, 4];\n                    url = urls_1[_i];\n                    _a = loadPartialCatalog;\n                    return [4 /*yield*/, ajax_1.getJSON(url)];\n                case 2:\n                    _a.apply(void 0, [_b.sent()]);\n                    buffer = (new Float32Array(jsArray)).buffer;\n                    postMessage({ buffer: buffer }, [buffer]);\n                    _b.label = 3;\n                case 3:\n                    _i++;\n                    return [3 /*break*/, 1];\n                case 4: return [2 /*return*/];\n            }\n        });\n    });\n}\nfunction postMessage(data, transferable) {\n    self.postMessage(data, transferable);\n}\nfunction mag2flux(m) {\n    return Math.pow(10, -m / 2.5);\n}\nfunction loadPartialCatalog(catalog) {\n    var fluxSirius = mag2flux(-1.47);\n    var sizeSirius = angle_1.deg2rad(5);\n    for (var _i = 0, catalog_1 = catalog; _i < catalog_1.length; _i++) {\n        var s = catalog_1[_i];\n        var xyz = angle_1.EquatorialCoord.fromRad(s[0], s[1]).xyz;\n        var color = [0.75, 0.75, 1, 1];\n        var flux = mag2flux(s[2]);\n        var size = sizeSirius * Math.sqrt(flux / fluxSirius);\n        jsArray.push.apply(jsArray, xyz.concat([size], color));\n    }\n}\nfunction range(n) {\n    var a = [];\n    for (var i = 0; i < n; ++i)\n        a.push(i);\n    return a;\n}\nmain().then(function () {\n    self.close();\n});\n\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/loader.ts?./node_modules/ts-loader");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__extends\", function() { return __extends; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__assign\", function() { return __assign; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__rest\", function() { return __rest; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__decorate\", function() { return __decorate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__param\", function() { return __param; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__metadata\", function() { return __metadata; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__awaiter\", function() { return __awaiter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__generator\", function() { return __generator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__exportStar\", function() { return __exportStar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__values\", function() { return __values; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__read\", function() { return __read; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__spread\", function() { return __spread; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__await\", function() { return __await; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__asyncGenerator\", function() { return __asyncGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__asyncDelegator\", function() { return __asyncDelegator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__asyncValues\", function() { return __asyncValues; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__makeTemplateObject\", function() { return __makeTemplateObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__importStar\", function() { return __importStar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__importDefault\", function() { return __importDefault; });\n/*! *****************************************************************************\r\nCopyright (c) Microsoft Corporation. All rights reserved.\r\nLicensed under the Apache License, Version 2.0 (the \"License\"); you may not use\r\nthis file except in compliance with the License. You may obtain a copy of the\r\nLicense at http://www.apache.org/licenses/LICENSE-2.0\r\n\r\nTHIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\r\nKIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED\r\nWARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,\r\nMERCHANTABLITY OR NON-INFRINGEMENT.\r\n\r\nSee the Apache Version 2.0 License for specific language governing permissions\r\nand limitations under the License.\r\n***************************************************************************** */\r\n/* global Reflect, Promise */\r\n\r\nvar extendStatics = Object.setPrototypeOf ||\r\n    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n\r\nfunction __extends(d, b) {\r\n    extendStatics(d, b);\r\n    function __() { this.constructor = d; }\r\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n}\r\n\r\nvar __assign = Object.assign || function __assign(t) {\r\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n        s = arguments[i];\r\n        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\r\n    }\r\n    return t;\r\n}\r\n\r\nfunction __rest(s, e) {\r\n    var t = {};\r\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r\n        t[p] = s[p];\r\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\r\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\r\n            t[p[i]] = s[p[i]];\r\n    return t;\r\n}\r\n\r\nfunction __decorate(decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n}\r\n\r\nfunction __param(paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n}\r\n\r\nfunction __metadata(metadataKey, metadataValue) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(metadataKey, metadataValue);\r\n}\r\n\r\nfunction __awaiter(thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n}\r\n\r\nfunction __generator(thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = y[op[0] & 2 ? \"return\" : op[0] ? \"throw\" : \"next\"]) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [0, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n}\r\n\r\nfunction __exportStar(m, exports) {\r\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\r\n}\r\n\r\nfunction __values(o) {\r\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator], i = 0;\r\n    if (m) return m.call(o);\r\n    return {\r\n        next: function () {\r\n            if (o && i >= o.length) o = void 0;\r\n            return { value: o && o[i++], done: !o };\r\n        }\r\n    };\r\n}\r\n\r\nfunction __read(o, n) {\r\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\r\n    if (!m) return o;\r\n    var i = m.call(o), r, ar = [], e;\r\n    try {\r\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\r\n    }\r\n    catch (error) { e = { error: error }; }\r\n    finally {\r\n        try {\r\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\r\n        }\r\n        finally { if (e) throw e.error; }\r\n    }\r\n    return ar;\r\n}\r\n\r\nfunction __spread() {\r\n    for (var ar = [], i = 0; i < arguments.length; i++)\r\n        ar = ar.concat(__read(arguments[i]));\r\n    return ar;\r\n}\r\n\r\nfunction __await(v) {\r\n    return this instanceof __await ? (this.v = v, this) : new __await(v);\r\n}\r\n\r\nfunction __asyncGenerator(thisArg, _arguments, generator) {\r\n    if (!Symbol.asyncIterator) throw new TypeError(\"Symbol.asyncIterator is not defined.\");\r\n    var g = generator.apply(thisArg, _arguments || []), i, q = [];\r\n    return i = {}, verb(\"next\"), verb(\"throw\"), verb(\"return\"), i[Symbol.asyncIterator] = function () { return this; }, i;\r\n    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }\r\n    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }\r\n    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }\r\n    function fulfill(value) { resume(\"next\", value); }\r\n    function reject(value) { resume(\"throw\", value); }\r\n    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }\r\n}\r\n\r\nfunction __asyncDelegator(o) {\r\n    var i, p;\r\n    return i = {}, verb(\"next\"), verb(\"throw\", function (e) { throw e; }), verb(\"return\"), i[Symbol.iterator] = function () { return this; }, i;\r\n    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === \"return\" } : f ? f(v) : v; }; }\r\n}\r\n\r\nfunction __asyncValues(o) {\r\n    if (!Symbol.asyncIterator) throw new TypeError(\"Symbol.asyncIterator is not defined.\");\r\n    var m = o[Symbol.asyncIterator];\r\n    return m ? m.call(o) : typeof __values === \"function\" ? __values(o) : o[Symbol.iterator]();\r\n}\r\n\r\nfunction __makeTemplateObject(cooked, raw) {\r\n    if (Object.defineProperty) { Object.defineProperty(cooked, \"raw\", { value: raw }); } else { cooked.raw = raw; }\r\n    return cooked;\r\n};\r\n\r\nfunction __importStar(mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result.default = mod;\r\n    return result;\r\n}\r\n\r\nfunction __importDefault(mod) {\r\n    return (mod && mod.__esModule) ? mod : { default: mod };\r\n}\r\n\n\n//# sourceURL=webpack:///./node_modules/tslib/tslib.es6.js?");

/***/ }),

/***/ "./src/layer/hipparcos_catalog_layer/data sync recursive ./node_modules/file-loader/dist/cjs.js!./ ^\\.\\/part\\-.*\\._json$":
/*!******************************************************************************************************************!*\
  !*** ./src/layer/hipparcos_catalog_layer/data sync ./node_modules/file-loader/dist/cjs.js ^\.\/part\-.*\._json$ ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./part-0._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-0._json\",\n\t\"./part-1._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-1._json\",\n\t\"./part-10._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-10._json\",\n\t\"./part-11._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-11._json\",\n\t\"./part-12._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-12._json\",\n\t\"./part-13._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-13._json\",\n\t\"./part-14._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-14._json\",\n\t\"./part-15._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-15._json\",\n\t\"./part-16._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-16._json\",\n\t\"./part-17._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-17._json\",\n\t\"./part-18._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-18._json\",\n\t\"./part-19._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-19._json\",\n\t\"./part-2._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-2._json\",\n\t\"./part-3._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-3._json\",\n\t\"./part-4._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-4._json\",\n\t\"./part-5._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-5._json\",\n\t\"./part-6._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-6._json\",\n\t\"./part-7._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-7._json\",\n\t\"./part-8._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-8._json\",\n\t\"./part-9._json\": \"./node_modules/file-loader/dist/cjs.js!./src/layer/hipparcos_catalog_layer/data/part-9._json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\tvar module = __webpack_require__(id);\n\treturn module;\n}\nfunction webpackContextResolve(req) {\n\tvar id = map[req];\n\tif(!(id + 1)) { // check for number or string\n\t\tvar e = new Error('Cannot find module \"' + req + '\".');\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn id;\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/layer/hipparcos_catalog_layer/data sync recursive ./node_modules/file-loader/dist/cjs.js!./ ^\\\\.\\\\/part\\\\-.*\\\\._json$\";\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data_sync_./node_modules/file-loader/dist/cjs.js_^\\.\\/part\\-.*\\._json$?");

/***/ }),

/***/ "./src/layer/hipparcos_catalog_layer/data/index.json":
/*!***********************************************************!*\
  !*** ./src/layer/hipparcos_catalog_layer/data/index.json ***!
  \***********************************************************/
/*! exports provided: n, default */
/***/ (function(module) {

eval("module.exports = {\"n\":20};\n\n//# sourceURL=webpack:///./src/layer/hipparcos_catalog_layer/data/index.json?");

/***/ }),

/***/ "./src/utils/ajax.ts":
/*!***************************!*\
  !*** ./src/utils/ajax.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction getJSON(url) {\n    return new Promise(function (resolve, reject) {\n        var xhr = new XMLHttpRequest();\n        xhr.open('GET', url, true);\n        xhr.responseType = 'json';\n        xhr.addEventListener('load', function (e) { return resolve(typeof xhr.response == 'string' ? JSON.parse(xhr.responseText) : xhr.response); });\n        xhr.send();\n    });\n}\nexports.getJSON = getJSON;\nvar ResourceLocator = /** @class */ (function () {\n    function ResourceLocator(url, immediate) {\n        if (immediate === void 0) { immediate = false; }\n        this.url = url;\n        if (immediate)\n            this.fetch();\n    }\n    ResourceLocator.prototype.fetch = function () {\n        var _this = this;\n        if (this.cache)\n            return Promise.resolve(this.cache);\n        if (this.promise)\n            return this.promise;\n        this.promise = getJSON(this.url).then(function (resource) { return _this.cache = resource; });\n        return this.promise;\n    };\n    return ResourceLocator;\n}());\nexports.ResourceLocator = ResourceLocator;\nvar ImageLoader = /** @class */ (function () {\n    function ImageLoader(url, immediate) {\n        if (immediate === void 0) { immediate = false; }\n        this.url = url;\n        if (immediate)\n            this.fetch();\n    }\n    ImageLoader.prototype.fetch = function () {\n        var _this = this;\n        if (this.cache)\n            return Promise.resolve(this.cache);\n        if (this.promise)\n            return this.promise;\n        this.promise = new Promise(function (resolve, reject) {\n            var image = new Image();\n            image.crossOrigin = 'anonymous';\n            image.onload = function () { return resolve(image); };\n            image.onerror = function () { return reject(); };\n            image.src = _this.url;\n        });\n        return this.promise;\n    };\n    return ImageLoader;\n}());\nexports.ImageLoader = ImageLoader;\n\n\n//# sourceURL=webpack:///./src/utils/ajax.ts?");

/***/ })

/******/ });