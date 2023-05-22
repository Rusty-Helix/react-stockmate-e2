/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawel Fus, Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {
      done: !1,
      value: a[b++]
    } : {
      done: !0
    }
  }
};
$jscomp.arrayIterator = function(a) {
  return {
    next: $jscomp.arrayIteratorImpl(a)
  }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) return a;
  a[b] = c.value;
  return a
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) return c
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.SymbolClass = function(a, b) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {
    configurable: !0,
    writable: !0,
    value: b
  })
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_
};
$jscomp.Symbol = function() {
  function a(c) {
    if (this instanceof a) throw new TypeError("Symbol is not a constructor");
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (c || "") + "_" + b++, c)
  }
  var b = 0;
  return a
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
    configurable: !0,
    writable: !0,
    value: function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
    }
  });
  $jscomp.initSymbolIterator = function() {}
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function() {}
};
$jscomp.iteratorPrototype = function(a) {
  $jscomp.initSymbolIterator();
  a = {
    next: a
  };
  a[$jscomp.global.Symbol.iterator] = function() {
    return this
  };
  return a
};
$jscomp.iteratorFromArray = function(a, b) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var c = 0,
    d = {
      next: function() {
        if (c < a.length) {
          var e = c++;
          return {
            value: b(e, a[e]),
            done: !1
          }
        }
        d.next = function() {
          return {
            done: !0,
            value: void 0
          }
        };
        return d.next()
      }
    };
  d[Symbol.iterator] = function() {
    return d
  };
  return d
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function(a, b) {
  var c = $jscomp.propertyToPolyfillSymbol[b];
  if (null == c) return a[b];
  c = a[c];
  return void 0 !== c ? c : a[b]
};
$jscomp.polyfill = function(a, b, c, d) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d))
};
$jscomp.polyfillUnisolated = function(a, b, c, d) {
  c = $jscomp.global;
  a = a.split(".");
  for (d = 0; d < a.length - 1; d++) {
    var e = a[d];
    e in c || (c[e] = {});
    c = c[e]
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  b != d && null != b && $jscomp.defineProperty(c, a, {
    configurable: !0,
    writable: !0,
    value: b
  })
};
$jscomp.polyfillIsolated = function(a, b, c, d) {
  var e = a.split(".");
  a = 1 === e.length;
  d = e[0];
  d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var m = 0; m < e.length - 1; m++) {
    var t = e[m];
    t in d || (d[t] = {});
    d = d[t]
  }
  e = e[e.length - 1];
  c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null;
  b = b(c);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {
    configurable: !0,
    writable: !0,
    value: b
  }) : b !== c && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e],
    $jscomp.defineProperty(d, e, {
      configurable: !0,
      writable: !0,
      value: b
    })))
};
$jscomp.polyfill("Array.prototype.values", function(a) {
  return a ? a : function() {
    return $jscomp.iteratorFromArray(this, function(a, c) {
      return c
    })
  }
}, "es8", "es3");
(function(a) {
  "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/indicators/indicators", ["highcharts", "highcharts/modules/stock"], function(b) {
    a(b);
    a.Highcharts = b;
    return a
  }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(a) {
  function b(a, b, e, m) {
    a.hasOwnProperty(b) || (a[b] = m.apply(null, e), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
      detail: {
        path: b,
        module: a[b]
      }
    })))
  }
  a = a ? a._modules : {};
  b(a, "Stock/Indicators/SMA/SMAIndicator.js", [a["Core/Chart/Chart.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, b, e) {
    const {
      line: c
    } = b.seriesTypes, {
      addEvent: d,
      fireEvent: v,
      error: u,
      extend: g,
      isArray: w,
      merge: n,
      pick: q,
      splat: h
    } = e;
    class k extends c {
      constructor() {
        super(...arguments);
        this.points = this.options = this.linkedParent = this.dataEventsToUnbind = this.data = void 0
      }
      destroy() {
        this.dataEventsToUnbind.forEach(function(a) {
          a()
        });
        super.destroy.apply(this, arguments)
      }
      getName() {
        const a = [];
        let b = this.name;
        b || ((this.nameComponents || []).forEach(function(b, c) {
          a.push(this.options.params[b] + q(this.nameSuffixes[c], ""))
        }, this), b = (this.nameBase || this.type.toUpperCase()) + (this.nameComponents ? " (" + a.join(", ") + ")" : ""));
        return b
      }
      getValues(a, b) {
        const c = b.period,
          d = a.xData;
        a = a.yData;
        const e = a.length,
          n = [],
          g = [],
          p = [];
        let l = -1,
          h = 0,
          k, q = 0;
        if (!(d.length < c)) {
          for (w(a[0]) && (l = b.index ? b.index : 0); h < c - 1;) q += 0 > l ? a[h] : a[h][l], h++;
          for (b = h; b < e; b++) q += 0 > l ? a[b] : a[b][l], k = [d[b], q / c], n.push(k), g.push(k[0]), p.push(k[1]),
            q -= 0 > l ? a[b - h] : a[b - h][l];
          return {
            values: n,
            xData: g,
            yData: p
          }
        }
      }
      init(b, c) {
        const f = this;
        super.init.call(f, b, c);
        c = d(a, "afterLinkSeries", function({
          isUpdating: a
        }) {
          if (!a)
            if (a = !!f.dataEventsToUnbind.length, f.linkedParent)
              if (a || (f.dataEventsToUnbind.push(d(f.linkedParent, "updatedData", function() {
                  f.recalculateValues()
                })), f.calculateOn.xAxis && f.dataEventsToUnbind.push(d(f.linkedParent.xAxis, f.calculateOn.xAxis, function() {
                  f.recalculateValues()
                }))), "init" === f.calculateOn.chart) f.processedYData || f.recalculateValues();
              else {
                if (!a) {
                  const a = d(f.chart, f.calculateOn.chart, function() {
                    f.recalculateValues();
                    a()
                  })
                }
              }
          else return u("Series " + f.options.linkedTo + " not found! Check `linkedTo`.", !1, b)
        }, {
          order: 0
        });
        f.dataEventsToUnbind = [];
        f.eventsToUnbind.push(c)
      }
      recalculateValues() {
        const a = [],
          b = this.points || [];
        var c = (this.xData || []).length,
          d = {
            values: [],
            xData: [],
            yData: []
          };
        let e = !0;
        let n;
        d = this.linkedParent.options && this.linkedParent.yData && this.linkedParent.yData.length ? this.getValues(this.linkedParent, this.options.params) || d : d;
        if (c && !this.hasGroupedData && this.visible && this.points)
          if (this.cropped) {
            if (this.xAxis) {
              var g = this.xAxis.min;
              n = this.xAxis.max
            }
            c = this.cropData(d.xData, d.yData, g, n);
            for (g = 0; g < c.xData.length; g++) a.push([c.xData[g]].concat(h(c.yData[g])));
            c = d.xData.indexOf(this.xData[0]);
            g = d.xData.indexOf(this.xData[this.xData.length - 1]); - 1 === c && g === d.xData.length - 2 && a[0][0] === b[0].x && a.shift();
            this.updateData(a)
          } else if (this.updateAllPoints || d.xData.length !== c - 1 && d.xData.length !== c + 1) e = !1, this.updateData(d.values);
        e &&
          (this.xData = d.xData, this.yData = d.yData, this.options.data = d.values);
        this.calculateOn.xAxis && this.processedXData && (delete this.processedXData, this.isDirty = !0, this.redraw());
        this.isDirtyData = !!this.linkedSeries.length;
        v(this, "updatedData")
      }
      processData() {
        const a = this.options.compareToMain,
          b = this.linkedParent;
        super.processData.apply(this, arguments);
        this.dataModify && b && b.dataModify && b.dataModify.compareValue && a && (this.dataModify.compareValue = b.dataModify.compareValue)
      }
    }
    k.defaultOptions = n(c.defaultOptions, {
      name: void 0,
      tooltip: {
        valueDecimals: 4
      },
      linkedTo: void 0,
      compareToMain: !1,
      params: {
        index: 3,
        period: 14
      }
    });
    g(k.prototype, {
      calculateOn: {
        chart: "init"
      },
      hasDerivedData: !0,
      nameComponents: ["period"],
      nameSuffixes: [],
      useCommonDataGrouping: !0
    });
    b.registerSeriesType("sma", k);
    "";
    return k
  });
  b(a, "Stock/Indicators/EMA/EMAIndicator.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, b) {
    const {
      sma: c
    } = a.seriesTypes, {
      correctFloat: d,
      isArray: t,
      merge: v
    } = b;
    class u extends c {
      constructor() {
        super(...arguments);
        this.points = this.options = this.data = void 0
      }
      accumulatePeriodPoints(a, b, c) {
        let d = 0,
          e = 0,
          g;
        for (; e < a;) g = 0 > b ? c[e] : c[e][b], d += g, e++;
        return d
      }
      calculateEma(a, b, c, e, h, k, p) {
        a = a[c - 1];
        b = 0 > k ? b[c - 1] : b[c - 1][k];
        e = "undefined" === typeof h ? p : d(b * e + h * (1 - e));
        return [a, e]
      }
      getValues(a, b) {
        var c = b.period;
        const d = a.xData,
          e = (a = a.yData) ? a.length : 0,
          g = 2 / (c + 1),
          p = [],
          l = [],
          f = [];
        let m = -1;
        if (!(e < c)) {
          t(a[0]) && (m = b.index ? b.index : 0);
          b = this.accumulatePeriodPoints(c, m, a);
          for (b /= c; c < e + 1; c++) {
            var r = this.calculateEma(d, a, c, g, r, m, b);
            p.push(r);
            l.push(r[0]);
            f.push(r[1]);
            r = r[1]
          }
          return {
            values: p,
            xData: l,
            yData: f
          }
        }
      }
    }
    u.defaultOptions = v(c.defaultOptions, {
      params: {
        index: 3,
        period: 9
      }
    });
    a.registerSeriesType("ema", u);
    "";
    return u
  });
  b(a, "masters/indicators/indicators.src.js", [], function() {})
});
//# sourceMappingURL=indicators.js.map