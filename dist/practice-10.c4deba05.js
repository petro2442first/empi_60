// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jCy3H":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "32b32cfec4deba05";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"5oJmI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _linearRegerssion = require("./LinearRegerssion");
var _linearRegerssionDefault = parcelHelpers.interopDefault(_linearRegerssion);
var _helpers = require("./utils/helpers");
function start() {
    const submit = document.querySelector("#submit-input");
    const fileInput = document.querySelector("#input-file") ?? null;
    let fileResult = null;
    if (fileInput === null) return console.error("fileInput === null");
    fileInput.addEventListener("change", (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.addEventListener("load", (e)=>{
            fileResult = reader.result.split("\n").map((item)=>item.trim()
            ).map((item)=>item.split(/\s+/)
            );
            result1 = fileResult.map((item)=>item[0] == "NA" || item[0] == "?" ? 0 : +item[0]
            );
            result2 = fileResult.map((item)=>item[1] == "NA" || item[1] == "?" ? 0 : +item[1]
            );
            fileResult = {
                x: result1,
                y: result2
            };
            document.querySelector("#file-label").innerText = `Loaded: ${file.name}`;
        });
        reader.onerror = ()=>console.log(reader.error)
        ;
    });
    submit.addEventListener("click", (e)=>{
        const inputX = document.querySelector("#input-x").value ?? "";
        const inputY = document.querySelector("#input-y").value ?? "";
        const lr = fileResult === null ? new _linearRegerssionDefault.default(_helpers.toCorrectData(inputX), _helpers.toCorrectData(inputY)) : new _linearRegerssionDefault.default(fileResult);
        console.log(lr.getS("x"));
        lr.printChart("chart1-1");
    });
}
start();

},{"./LinearRegerssion":"4Qzdw","./utils/helpers":"bWuwh","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4Qzdw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _quantiles = require("./utils/quantiles");
class LinearRegression {
    #x = [];
    #y = [];
    constructor(...params){
        this.#x = params[0].x || params[0]["x"] || params[0];
        this.#y = params[0].y || params[0]["y"] || params[1];
    }
    set x(list) {
        if (typeof list !== "object") return console.error("Type Error: Parameter type must be an array");
        this.#x = list;
    }
    get x() {
        return this.#x;
    }
    set y(list) {
        if (typeof list !== "object") return console.error("Type Error: Parameter type must be an array");
        this.#y = list;
    }
    get y() {
        return this.#y;
    }
    // Methods
    getAverage(name = "x") {
        return name.toLowerCase() == "y" ? this.#y.reduce((state, curr)=>state + curr
        ) / this.#y.length : this.#x.reduce((state, curr)=>state + curr
        ) / this.#x.length;
    }
    getAverageByGroup() {
        return this.#x.reduce((state, current, index)=>state + current * this.#y[index]
        ) / this.#x.length;
    }
    getS(data = "x") {
        return Math.sqrt(1 / this[data.toLowerCase()].length * this[data.toLowerCase()].reduce((state, curr)=>state + Math.pow(curr - this.getAverage(data), 2)
        ));
    }
    getR() {
        return (this.getAverageByGroup() - this.getAverage("x") * this.getAverage("y")) / (this.getS("x") * this.getS("y"));
    }
    getStatistics() {
        return this.getR() * Math.sqrt(this.x.length - 2) / Math.sqrt(1 - Math.pow(this.getR(), 2));
    }
    getEstimation() {
        return this.getR() * (this.getS("y") / this.getS("x"));
    }
    getEstimationA() {
        return this.getAverage("y") - this.getEstimationB() * this.getAverage("x");
    }
    getReconstructedRegressionLine() {
        const y = [
            ...this.#x
        ].map((item)=>{
            return this.getEstimationA() + this.getEstimationB() * item;
        });
        return {
            x: [
                ...this.x
            ].sort((a, b)=>a - b
            ),
            y: y
        };
    }
    getReconstructedRegressionFunction() {
        const { reconstructedY  } = this.getReconstructedRegressionLine();
        return this.y.map((item, index)=>item - reconstructedY[index]
        ).map((item)=>Math.pow(item, 2)
        ).reduce((state, current)=>state + current
        );
    }
    getDispersionOfPours() {
        return this.getReconstructedRegressionFunction() / (this.#x.length - 2);
    }
    getAverageQuadraticDeviationsA() {
        return Math.sqrt(this.getDispersionOfPours() / this.x.length * (1 + Math.pow(this.getAverage("x"), 2) / Math.pow(this.getS("x"), 2)));
    }
    getAverageQuadraticDeviationsB() {
        return Math.sqrt(this.getDispersionOfPours() / (this.x.length * Math.pow(this.getS("x"), 2)));
    }
    getConfidenceIntervals() {
        const v = this.x.length - 2;
        const Al = this.getEstimationA() - _quantiles.findQuantileS(v) * this.getAverageQuadraticDeviationsA();
        const Ah = this.getEstimationA() + _quantiles.findQuantileS(v) * this.getAverageQuadraticDeviationsA();
        const Bl = this.getEstimationB() - _quantiles.findQuantileS(v) * this.getAverageQuadraticDeviationsB();
        const Bh = this.getEstimationB() + _quantiles.findQuantileS(v) * this.getAverageQuadraticDeviationsB();
        return {
            a: [
                Al,
                Ah
            ],
            b: [
                Bl,
                Bh
            ]
        };
    }
    getValueOfParemetherA() {
        return this.getEstimationA() / this.getAverageQuadraticDeviationsA();
    }
    getValueOfParemetherB() {
        return this.getEstimationB() / this.getAverageQuadraticDeviationsB();
    }
    printChart(id = "chart1-1") {
        const ctx = document.querySelector(`#${id}`).getContext("2d");
        const [regressX, regressY] = this.getReconstructedRegressionLine();
        console.log(regressX, regressY);
        const [corrX, corrY] = [
            x,
            y
        ];
        const myChart = new Chart(ctx, {
            data: {
                labels: corrX,
                datasets: [
                    {
                        type: "scatter",
                        label: "Correlation field",
                        pointRadius: 3,
                        data: corrY,
                        backgroundColor: "#34a853"
                    },
                    {
                        type: "line",
                        label: "Reconstructed regression line",
                        data: regressY
                    }, 
                ]
            },
            options: {
                responsive: false,
                scales: {
                    x: {
                        title: {
                            text: "x",
                            display: true,
                            align: "end"
                        },
                        position: "bottom"
                    },
                    y: {
                        title: {
                            text: "y",
                            display: true,
                            align: "end"
                        }
                    }
                }
            }
        });
    }
}
exports.default = LinearRegression;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./utils/quantiles":"QSUoI"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"QSUoI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "findQuantileU", ()=>findQuantileU
);
parcelHelpers.export(exports, "findQuantileS", ()=>findQuantileS
);
parcelHelpers.export(exports, "aproxLaplace", ()=>aproxLaplace
);
parcelHelpers.export(exports, "fisherDistribQuan", ()=>fisherDistribQuan
);
const alpha = 0.05;
const isDetailsMode = true;
function findQuantileU(p = 1 - alpha / 2) {
    function Fi(a) {
        const options = {
            t: Math.sqrt(-2 * Math.log(a)),
            c0: 2.515517,
            c1: 0.802853,
            c2: 0.010328,
            d1: 1.432788,
            d2: 0.1892659,
            d3: 0.001308
        };
        const { t , c0 , c1 , c2 , d1 , d2 , d3  } = options;
        return t - (c0 + c1 * t + c2 * Math.pow(t, 2)) / (1 + d1 * t + d2 * Math.pow(t, 2) + d3 * Math.pow(t, 3));
    }
    if (p <= 0.5) return -Fi(p);
    else return Fi(1 - p);
}
function findQuantileS(v, p = 1 - alpha / 2) {
    const g1 = (u)=>{
        return (Math.pow(u, 3) + u) / 4;
    };
    const g2 = (u)=>{
        return (5 * Math.pow(u, 5) + 16 * Math.pow(u, 3) + 3 * u) / 96;
    };
    const g3 = (u)=>{
        return (3 * Math.pow(u, 7) + 19 * Math.pow(u, 5) + 17 * Math.pow(u, 3) - 15 * u) / 384;
    };
    const g4 = (u)=>{
        return (79 * Math.pow(u, 9) + 779 * Math.pow(u, 7) + 1482 * Math.pow(u, 5) - 1920 * Math.pow(u, 3) - 945 * u) / 92160;
    };
    const u1 = findQuantileU(p);
    return +(u1 + g1(u1) / v + g2(u1) / Math.pow(v, 2) + g3(u1) / Math.pow(v, 3) + g4(u1) / Math.pow(v, 4)).toFixed(2);
}
function aproxLaplace(u) {
    if (u <= 0) return 1 - aproxLaplace(Math.abs(u));
    const b1 = 0.31938153;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const t = 1 / (1 + 0.2316419 * u);
    return 1 - 1 / Math.sqrt(2 * Math.PI) * Math.exp(-u * u / 2) * (b1 * t + b2 * t * t + b3 * Math.pow(t, 3) + b4 * Math.pow(t, 4) + b5 * Math.pow(t, 5)) + 7.8 * Math.pow(10, -8);
}
function fisherDistribQuan(v1, v2, p = 1 - alpha) {
    const s = 1 / v1 + 1 / v2;
    const d = 1 / v1 - 1 / v2;
    const u = findQuantileU(p);
    console.log(u);
    const a = Math.sqrt(s / 2);
    const z = u * a - 1 / 6 * d * (u * u + 2) + a * (s / 24 * (u * u + 3 * u) + d * d / (72 * s) * (Math.pow(u, 3) + 11 * u)) - d * s / 120 * (Math.pow(u, 4) + 9 * Math.pow(u, 2) + 8) + Math.pow(d, 3) / (3240 * s) * (3 * Math.pow(u, 4) + 7 * u * u - 16) + a * (s * s / 1920 * (Math.pow(u, 5) + 20 * Math.pow(u, 3) + 15 * u) + Math.pow(d, 4) / 2880 * (Math.pow(u, 5) + 44 * Math.pow(u, 3) + 183 * u) + Math.pow(d, 4) / (155520 * s * s) * (9 * Math.pow(u, 5) - 284 * Math.pow(u, 3) - 1531 * u));
    return Math.exp(2 * z);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bWuwh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "toCorrectData", ()=>toCorrectData
);
function toCorrectData(data, file = false) {
    console.log(data);
    return !file ? data.split(",").filter((item)=>item !== ""
    ).map((item)=>Number.isNaN(Number(item)) ? 0 : Number(item)
    ) : data.filter((item, index)=>item !== ""
    ).map((item)=>Number.isNaN(Number(item)) ? 0 : Number(item)
    );
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["jCy3H","5oJmI"], "5oJmI", "parcelRequirebf94")

//# sourceMappingURL=practice-10.c4deba05.js.map
