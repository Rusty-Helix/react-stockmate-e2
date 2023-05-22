/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Fus

 License: www.highcharts.com/license
*/
'use strict';
(function(a) {
  "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/indicators/bollinger-bands", ["highcharts", "highcharts/modules/stock"], function(e) {
    a(e);
    a.Highcharts = e;
    return a
  }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(a) {
  function e(a, g, h, e) {
    a.hasOwnProperty(g) || (a[g] = e.apply(null, h), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
      detail: {
        path: g,
        module: a[g]
      }
    })))
  }
  a = a ? a._modules : {};
  e(a, "Stock/Indicators/MultipleLinesComposition.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, g) {
    const {
      sma: {
        prototype: h
      }
    } = a.seriesTypes, {
      defined: e,
      error: p,
      merge: u
    } = g;
    var f;
    (function(a) {
      function r(b) {
        return "plot" + b.charAt(0).toUpperCase() + b.slice(1)
      }

      function y(b, c) {
        const d = [];
        (b.pointArrayMap || []).forEach(b => {
          b !== c && d.push(r(b))
        });
        return d
      }

      function f() {
        const b = this,
          c = b.linesApiNames;
        var d = b.areaLinesNames;
        const a = b.points,
          l = b.options,
          g = b.graph,
          m = {
            options: {
              gapSize: l.gapSize
            }
          },
          q = [];
        var f = y(b, b.pointValKey);
        let k = a.length,
          t;
        f.forEach((b, c) => {
          for (q[c] = []; k--;) t = a[k], q[c].push({
            x: t.x,
            plotX: t.plotX,
            plotY: t[b],
            isNull: !e(t[b])
          });
          k = a.length
        });
        if (b.userOptions.fillColor && d.length) {
          var x = f.indexOf(r(d[0]));
          x = q[x];
          d = 1 === d.length ? a : q[f.indexOf(r(d[1]))];
          f = b.color;
          b.points = d;
          b.nextPoints = x;
          b.color = b.userOptions.fillColor;
          b.options = u(a, m);
          b.graph = b.area;
          b.fillGraph = !0;
          h.drawGraph.call(b);
          b.area = b.graph;
          delete b.nextPoints;
          delete b.fillGraph;
          b.color = f
        }
        c.forEach((c, a) => {
          q[a] ? (b.points = q[a], l[c] ? b.options = u(l[c].styles, m) : p('Error: "There is no ' + c + ' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names."'), b.graph = b["graph" + c], h.drawGraph.call(b), b["graph" + c] = b.graph) : p('Error: "' + c + " doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")
        });
        b.points = a;
        b.options = l;
        b.graph = g;
        h.drawGraph.call(b)
      }

      function k(b) {
        var c;
        let a = [];
        b = b || this.points;
        if (this.fillGraph &&
          this.nextPoints) {
          if ((c = h.getGraphPath.call(this, this.nextPoints)) && c.length) {
            c[0][0] = "L";
            a = h.getGraphPath.call(this, b);
            c = c.slice(0, a.length);
            for (let b = c.length - 1; 0 <= b; b--) a.push(c[b])
          }
        } else a = h.getGraphPath.apply(this, arguments);
        return a
      }

      function z(b) {
        const c = [];
        (this.pointArrayMap || []).forEach(a => {
          c.push(b[a])
        });
        return c
      }

      function A() {
        const b = this.pointArrayMap;
        let a = [],
          d;
        a = y(this);
        h.translate.apply(this, arguments);
        this.points.forEach(c => {
          b.forEach((b, g) => {
            d = c[b];
            this.dataModify && (d = this.dataModify.modifyValue(d));
            null !== d && (c[a[g]] = this.yAxis.toPixels(d, !0))
          })
        })
      }
      const v = [],
        B = ["bottomLine"],
        w = ["top", "bottom"],
        m = ["top"];
      a.compose = function(b) {
        if (g.pushUnique(v, b)) {
          const a = b.prototype;
          a.linesApiNames = a.linesApiNames || B.slice();
          a.pointArrayMap = a.pointArrayMap || w.slice();
          a.pointValKey = a.pointValKey || "top";
          a.areaLinesNames = a.areaLinesNames || m.slice();
          a.drawGraph = f;
          a.getGraphPath = k;
          a.toYData = z;
          a.translate = A
        }
        return b
      }
    })(f || (f = {}));
    return f
  });
  e(a, "Stock/Indicators/BB/BBIndicator.js", [a["Stock/Indicators/MultipleLinesComposition.js"],
    a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]
  ], function(a, g, h) {
    const {
      sma: e
    } = g.seriesTypes, {
      extend: p,
      isArray: u,
      merge: f
    } = h;
    class k extends e {
      constructor() {
        super(...arguments);
        this.points = this.options = this.data = void 0
      }
      init() {
        g.seriesTypes.sma.prototype.init.apply(this, arguments);
        this.options = f({
          topLine: {
            styles: {
              lineColor: this.color
            }
          },
          bottomLine: {
            styles: {
              lineColor: this.color
            }
          }
        }, this.options)
      }
      getValues(a, f) {
        const e = f.period,
          h = f.standardDeviation,
          k = [],
          p = [],
          v = a.xData,
          r = (a = a.yData) ? a.length :
          0,
          w = [];
        let m;
        if (!(v.length < e)) {
          var b = u(a[0]);
          for (m = e; m <= r; m++) {
            var c = v.slice(m - e, m);
            var d = a.slice(m - e, m);
            var n = g.seriesTypes.sma.prototype.getValues.call(this, {
              xData: c,
              yData: d
            }, f);
            c = n.xData[0];
            n = n.yData[0]; {
              const a = d.length;
              let c = 0,
                e = 0;
              for (; c < a; c++) {
                var l = (b ? d[c][f.index] : d[c]) - n;
                e += l * l
              }
              l = Math.sqrt(e / (a - 1))
            }
            d = n + h * l;
            l = n - h * l;
            w.push([c, d, n, l]);
            k.push(c);
            p.push([d, n, l])
          }
          return {
            values: w,
            xData: k,
            yData: p
          }
        }
      }
    }
    k.defaultOptions = f(e.defaultOptions, {
      params: {
        period: 20,
        standardDeviation: 2,
        index: 3
      },
      bottomLine: {
        styles: {
          lineWidth: 1,
          lineColor: void 0
        }
      },
      topLine: {
        styles: {
          lineWidth: 1,
          lineColor: void 0
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25cf</span><b> {series.name}</b><br/>Top: {point.top}<br/>Middle: {point.middle}<br/>Bottom: {point.bottom}<br/>'
      },
      marker: {
        enabled: !1
      },
      dataGrouping: {
        approximation: "averages"
      }
    });
    p(k.prototype, {
      areaLinesNames: ["top", "bottom"],
      linesApiNames: ["topLine", "bottomLine"],
      nameComponents: ["period", "standardDeviation"],
      pointArrayMap: ["top", "middle", "bottom"],
      pointValKey: "middle"
    });
    a.compose(k);
    g.registerSeriesType("bb", k);
    "";
    return k
  });
  e(a, "masters/indicators/bollinger-bands.src.js", [], function() {})
});
//# sourceMappingURL=bollinger-bands.js.map