'use strict';
(function(a) {
  "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define(["highcharts"], function(c) {
    a(c);
    a.Highcharts = c;
    return a
  }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(a) {
  (function(a, b, d, e) {
    a.hasOwnProperty(b) || (a[b] = e.apply(null, d), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
      detail: {
        path: b,
        module: a[b]
      }
    })))
  })(a ? a._modules : {}, "masters/indicators/ema.src.js",
    [],
    function() {})
});
//# sourceMappingURL=ema.js.map