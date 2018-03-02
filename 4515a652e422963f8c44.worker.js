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
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/ts-loader/index.js!./src/renderer/hips_renderer/shiftmap/worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ts-loader/index.js!./src/renderer/hips_renderer/shiftmap/worker.ts":
/*!********************************************************************************!*\
  !*** ./node_modules/ts-loader!./src/renderer/hips_renderer/shiftmap/worker.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar interface_1 = __webpack_require__(/*! ./interface */ \"./src/renderer/hips_renderer/shiftmap/interface.ts\");\nvar healpix_1 = __webpack_require__(/*! ../healpix */ \"./src/renderer/hips_renderer/healpix.ts\");\nfunction main() {\n    self.addEventListener('message', function (e) {\n        var id = e.data.id;\n        var _a = healpix_1.decode_id(id), order = _a.order, index = _a.index;\n        var array = healpix_1.shiftmap(order, index, interface_1.size);\n        var shiftmaps = [{ id: id, arraybuffer: array.buffer }];\n        postMessage(shiftmaps, shiftmaps.map(function (sm) { return sm.arraybuffer; }));\n    });\n}\nfunction postMessage(data, transferable) {\n    self.postMessage(data, transferable);\n}\nmain();\n\n\n//# sourceURL=webpack:///./src/renderer/hips_renderer/shiftmap/worker.ts?./node_modules/ts-loader");

/***/ }),

/***/ "./src/renderer/hips_renderer/healpix.ts":
/*!***********************************************!*\
  !*** ./src/renderer/hips_renderer/healpix.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// TODO: cleanup !!\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar PI = Math.PI;\nvar PI2 = 2 * Math.PI;\nvar PI_2 = Math.PI / 2;\nvar PI_4 = Math.PI / 4;\nvar PI_8 = Math.PI / 8;\nexports.coeff = (function () {\n    var i2xy = (function () {\n        function index2xy(index) {\n            var i = Math.floor(index / 4);\n            var j = index % 4;\n            var mesh = [0, 1 / 3, 2 / 3, 1];\n            return [mesh[i], mesh[j]];\n        }\n        var a = [];\n        for (var i = 0; i < 16; ++i) {\n            a.push(index2xy(i));\n        }\n        return a;\n    })();\n    var za = [new Float32Array(16), new Float32Array(16), new Float32Array(16)];\n    var zb = [new Float32Array(16), new Float32Array(16), new Float32Array(16)];\n    var zeromat4 = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);\n    return function (order, ipix) {\n        var nside = 1 << order;\n        var d = PI_4 / nside;\n        var _a = nest2fxy(nside, ipix), f = _a.f, x = _a.x, y = _a.y;\n        var _b = fxy2tu(nside, f, x, y), t0 = _b.t, u0 = _b.u;\n        var belt = Math.abs(u0) <= PI_4;\n        var beltEnd = (f < 4 || 8 <= f) && x + y == nside - 1;\n        if (beltEnd) {\n            for (var i = 0; i < 16; ++i) {\n                var _c = i2xy[i], p = _c[0], q = _c[1];\n                var t = t0 + d * (1 - q - p);\n                var u = u0 + d * (p - q);\n                var zaNorth = tu2za(t, u, f >= 8);\n                var zaSouth = tu2za(t, u, f < 4);\n                var va = za2vec(zaNorth.z, zaNorth.a);\n                var vb = za2vec(zaSouth.z, zaSouth.a);\n                za[0][i] = va[0];\n                za[1][i] = va[1];\n                za[2][i] = va[2];\n                zb[0][i] = vb[0];\n                zb[1][i] = vb[1];\n                zb[2][i] = vb[2];\n            }\n            var a = [mul(B, za[0]), mul(B, za[1]), mul(B, za[2])];\n            var b = [mul(B, zb[0]), mul(B, zb[1]), mul(B, zb[2])];\n            return { a: a, b: b };\n        }\n        else {\n            for (var i = 0; i < 16; ++i) {\n                var _d = i2xy[i], p = _d[0], q = _d[1];\n                var t = t0 + d * (1 - q - p);\n                var u = u0 + d * (p - q);\n                var _e = tu2za(t, u, belt), z = _e.z, a_1 = _e.a;\n                var va = za2vec(z, a_1);\n                za[0][i] = va[0];\n                za[1][i] = va[1];\n                za[2][i] = va[2];\n            }\n            var a = [mul(B, za[0]), mul(B, za[1]), mul(B, za[2])];\n            var b = [zeromat4, zeromat4, zeromat4];\n            return { a: a, b: b };\n        }\n    };\n})();\nfunction fxy2tu(nside, f, x, y) {\n    var f_row = f >> 2;\n    var f1 = f_row + 2;\n    var f2 = 2 * (f % 4) - (f_row % 2) + 1;\n    var v = x + y;\n    var h = x - y;\n    var i = f1 * nside - v - 1;\n    var k = (f2 * nside + h + (8 * nside));\n    var t = k / nside * PI_4;\n    var u = PI_2 - i / nside * PI_4;\n    return { t: t, u: u };\n}\nfunction tu2za(t, u, belt) {\n    var abs_u = Math.abs(u);\n    if (belt) {\n        var z = u / (3 * PI_8);\n        var a = t;\n        return { z: z, a: a };\n    }\n    else {\n        if (abs_u >= PI_2) {\n            return { z: sign(u), a: 0 };\n        }\n        var t_t = t % (Math.PI / 2);\n        var a = t - (abs_u - PI_4) / (abs_u - PI_2) * (t_t - PI_4);\n        var z = sign(u) * (1 - 1 / 3 * square(2 - 4 * abs_u / PI));\n        return { z: z, a: a };\n    }\n}\nfunction za2vec(z, a) {\n    var z2 = z * z;\n    var sin_theta = z2 > 1 ? -Math.sqrt(z2 - 1) : Math.sqrt(1 - z2);\n    var x = sin_theta * Math.cos(a);\n    var y = sin_theta * Math.sin(a);\n    return [x, y, z];\n}\nfunction mul(a, b) {\n    var l = b.length;\n    var c = new Float32Array(l);\n    for (var i = 0; i < l; ++i) {\n        var p = 0;\n        for (var j = 0; j < l; ++j) {\n            p += a[i + j * l] * b[j];\n        }\n        c[i] = p;\n    }\n    return c;\n}\nfunction dot(a, b) {\n    var c = 0;\n    for (var i = 0; i < a.length; ++i)\n        c += a[i] * b[i];\n    return c;\n}\nfunction ab2v(a, b, p, q, isBeltEnd) {\n    var p2 = p * p;\n    var p3 = p2 * p;\n    var q2 = q * q;\n    var q3 = q2 * q;\n    if (isBeltEnd)\n        return p - q >= 0 ?\n            a.map(function (aa) { return dot([p3, p2, p, 1], mul(aa, [q3, q2, q, 1])); }) :\n            b.map(function (bb) { return dot([p3, p2, p, 1], mul(bb, [q3, q2, q, 1])); });\n    else\n        return a.map(function (aa) { return dot([p3, p2, p, 1], mul(aa, [q3, q2, q, 1])); });\n}\nfunction isBeltEnd(nside, ipix) {\n    var nside2 = nside * nside;\n    var f = Math.floor(ipix / nside2);\n    var _a = bit_decombine(ipix % nside2), x = _a.x, y = _a.y;\n    return (f < 4 || 8 <= f) && x + y == nside - 1;\n}\nfunction shiftmap(order, ipix, size) {\n    var nside = 1 << order;\n    var _a = exports.coeff(order, ipix), a = _a.a, b = _a.b;\n    var d = new Float32Array(3 * size * size);\n    var beltEnd = isBeltEnd(nside, ipix);\n    function dpq(p, q) {\n        var v = ab2v(a, b, p, q, beltEnd);\n        var _a = vec2pixcoord(nside, ipix, v), x = _a.x, y = _a.y;\n        var trueP = y;\n        var trueQ = 1 - x;\n        return [p - trueP, q - trueQ];\n    }\n    var k = 0;\n    for (var i = 0; i < size; ++i) {\n        var q = i / (size - 1);\n        for (var j = 0; j < size; ++j) {\n            var p = j / (size - 1);\n            var _b = dpq(p, q), dp = _b[0], dq = _b[1];\n            d[3 * k + 0] = dp;\n            d[3 * k + 1] = dq;\n            d[3 * k + 2] = 0;\n            ++k;\n        }\n    }\n    return d;\n}\nexports.shiftmap = shiftmap;\nfunction shiftmapId(order, index) {\n    var nside = 1 << order;\n    var nside2 = nside * nside;\n    var f0 = Math.floor(index / nside2);\n    var f = (f0 >> 2) << 2;\n    var index2 = f * nside2 + (index % nside2);\n    return encode_id(order, index2);\n}\nexports.shiftmapId = shiftmapId;\nfunction vec2pixcoord(nside, ipix, v) {\n    var n2 = nside * nside;\n    var face = Math.floor(ipix / n2);\n    var _a = vec2za(v[0], v[1], v[2]), z = _a.z, a = _a.a;\n    a = wrap(a - (face % 4 + 2.5) * PI_2, PI2) - PI + (face % 4 + 0.5) * PI_2;\n    var _b = zaf2tu(z, a, face), t = _b.t, u = _b.u;\n    var cfxy = nest2fxy(nside, ipix);\n    var ctu = fxy2tu(nside, cfxy.f, cfxy.x, cfxy.y);\n    var d = PI_4 / nside;\n    var dt = (face % 4 == 1 || face % 4 == 2) ?\n        wrap(t, PI2) - wrap(ctu.t, PI2) :\n        wrap(t + PI, PI2) - wrap(ctu.t + PI, PI2);\n    var du = u - ctu.u + d;\n    return {\n        x: (dt + du) / d / 2,\n        y: (du - dt) / d / 2,\n    };\n}\nfunction vec2za(x, y, z) {\n    var r2 = x * x + y * y;\n    if (r2 == 0)\n        return { z: z < 0 ? -1 : 1, a: 0 };\n    else {\n        var a = (Math.atan2(y, x) + PI2) % PI2;\n        z /= Math.sqrt(z * z + r2);\n        return { z: z, a: a };\n    }\n}\nfunction nest2fxy(nside, ipix) {\n    var nside2 = nside * nside;\n    var f = Math.floor(ipix / nside2); // base pixel index\n    var k = ipix % nside2; // nested pixel index in base pixel\n    var _a = bit_decombine(k), x = _a.x, y = _a.y;\n    return { f: f, x: x, y: y };\n}\nfunction sigma(z) {\n    if (z < 0)\n        return -sigma(-z);\n    else\n        return 2 - Math.sqrt(3 * (1 - z));\n}\nfunction zaf2tu(z, a, f) {\n    if (Math.abs(z) <= 2. / 3.) {\n        var t = a;\n        var u = 3 * PI_8 * z;\n        return { t: t, u: u };\n    }\n    else {\n        f %= 4;\n        // a = clamp(a, f * PI_2, (f + 1) * PI_2)\n        var p_t = a - (f * PI_2);\n        var sigma_z = sigma(z);\n        var t = a - (Math.abs(sigma_z) - 1) * (p_t - PI_4);\n        var u = PI_4 * sigma_z;\n        return { t: t, u: u };\n    }\n}\nfunction wrap(x, p) {\n    return x < 0 ? p - (-x % p) : x % p;\n}\nfunction square(x) {\n    return x * x;\n}\nvar sign = Math.sign || function (x) {\n    return x > 0 ? 1 : (x < 0 ? -1 : 0);\n};\nfunction bit_decombine(p) {\n    assert(p <= 0x7fffffff);\n    // (python)\n    // ' | '.join(f'(p & 0x{2**(2*i):x}) >> {i}' for i in range(16))\n    var x = (p & 0x1) >> 0 | (p & 0x4) >> 1 | (p & 0x10) >> 2 |\n        (p & 0x40) >> 3 | (p & 0x100) >> 4 | (p & 0x400) >> 5 |\n        (p & 0x1000) >> 6 | (p & 0x4000) >> 7 | (p & 0x10000) >> 8 |\n        (p & 0x40000) >> 9 | (p & 0x100000) >> 10 | (p & 0x400000) >> 11 |\n        (p & 0x1000000) >> 12 | (p & 0x4000000) >> 13 | (p & 0x10000000) >> 14 | (p & 0x40000000) >> 15;\n    // (python)\n    // ' | '.join(f'(p & 0x{2**(2*i + 1):x}) >> {i+1}' for i in range(15))\n    var y = (p & 0x2) >> 1 | (p & 0x8) >> 2 | (p & 0x20) >> 3 |\n        (p & 0x80) >> 4 | (p & 0x200) >> 5 | (p & 0x800) >> 6 |\n        (p & 0x2000) >> 7 | (p & 0x8000) >> 8 | (p & 0x20000) >> 9 |\n        (p & 0x80000) >> 10 | (p & 0x200000) >> 11 | (p & 0x800000) >> 12 |\n        (p & 0x2000000) >> 13 | (p & 0x8000000) >> 14 | (p & 0x20000000) >> 15;\n    return { x: x, y: y };\n}\nfunction decode_id(id) {\n    assert(id <= 0x7fffffff);\n    var order = 0;\n    var l = (id >> 2) + 1;\n    while (l >= 4) {\n        l >>= 2;\n        ++order;\n    }\n    var index = id - (((1 << (2 * order)) - 1) << 2);\n    return { order: order, index: index };\n}\nexports.decode_id = decode_id;\nfunction encode_id(order, index) {\n    return 4 * ((1 << (2 * order)) - 1) + index;\n}\nexports.encode_id = encode_id;\nfunction assert(condition) {\n    console.assert(condition);\n    if (!condition) {\n        debugger;\n    }\n}\nvar B = new Float32Array([\n    81 / 4, -81 / 2, 99 / 4, -9 / 2, -81 / 2, 81, -99 / 2, 9, 99 / 4, -99 / 2, 121 / 4, -11 / 2, -9 / 2, 9, -11 / 2, 1,\n    -243 / 4, 243 / 2, -297 / 4, 27 / 2, 405 / 4, -405 / 2, 495 / 4, -45 / 2, -81 / 2, 81, -99 / 2, 9, 0, 0, 0, 0,\n    243 / 4, -243 / 2, 297 / 4, -27 / 2, -81, 162, -99, 18, 81 / 4, -81 / 2, 99 / 4, -9 / 2, 0, 0, 0, 0,\n    -81 / 4, 81 / 2, -99 / 4, 9 / 2, 81 / 4, -81 / 2, 99 / 4, -9 / 2, -9 / 2, 9, -11 / 2, 1, 0, 0, 0, 0,\n    -243 / 4, 405 / 4, -81 / 2, 0, 243 / 2, -405 / 2, 81, 0, -297 / 4, 495 / 4, -99 / 2, 0, 27 / 2, -45 / 2, 9, 0,\n    729 / 4, -1215 / 4, 243 / 2, 0, -1215 / 4, 2025 / 4, -405 / 2, 0, 243 / 2, -405 / 2, 81, 0, 0, 0, 0, 0,\n    -729 / 4, 1215 / 4, -243 / 2, 0, 243, -405, 162, 0, -243 / 4, 405 / 4, -81 / 2, 0, 0, 0, 0, 0,\n    243 / 4, -405 / 4, 81 / 2, 0, -243 / 4, 405 / 4, -81 / 2, 0, 27 / 2, -45 / 2, 9, 0, 0, 0, 0, 0,\n    243 / 4, -81, 81 / 4, 0, -243 / 2, 162, -81 / 2, 0, 297 / 4, -99, 99 / 4, 0, -27 / 2, 18, -9 / 2, 0,\n    -729 / 4, 243, -243 / 4, 0, 1215 / 4, -405, 405 / 4, 0, -243 / 2, 162, -81 / 2, 0, 0, 0, 0, 0,\n    729 / 4, -243, 243 / 4, 0, -243, 324, -81, 0, 243 / 4, -81, 81 / 4, 0, 0, 0, 0, 0,\n    -243 / 4, 81, -81 / 4, 0, 243 / 4, -81, 81 / 4, 0, -27 / 2, 18, -9 / 2, 0, 0, 0, 0, 0,\n    -81 / 4, 81 / 4, -9 / 2, 0, 81 / 2, -81 / 2, 9, 0, -99 / 4, 99 / 4, -11 / 2, 0, 9 / 2, -9 / 2, 1, 0,\n    243 / 4, -243 / 4, 27 / 2, 0, -405 / 4, 405 / 4, -45 / 2, 0, 81 / 2, -81 / 2, 9, 0, 0, 0, 0, 0,\n    -243 / 4, 243 / 4, -27 / 2, 0, 81, -81, 18, 0, -81 / 4, 81 / 4, -9 / 2, 0, 0, 0, 0, 0,\n    81 / 4, -81 / 4, 9 / 2, 0, -81 / 4, 81 / 4, -9 / 2, 0, 9 / 2, -9 / 2, 1, 0, 0, 0, 0, 0,\n]);\n\n\n//# sourceURL=webpack:///./src/renderer/hips_renderer/healpix.ts?");

/***/ }),

/***/ "./src/renderer/hips_renderer/shiftmap/interface.ts":
/*!**********************************************************!*\
  !*** ./src/renderer/hips_renderer/shiftmap/interface.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.size = 64;\n\n\n//# sourceURL=webpack:///./src/renderer/hips_renderer/shiftmap/interface.ts?");

/***/ })

/******/ });