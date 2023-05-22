/*
 Highcharts JS v11.0.1 (2023-05-08)

 Annotations module

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function(d) {
  "object" === typeof module && module.exports ? (d["default"] = d, module.exports = d) : "function" === typeof define && define.amd ? define("highcharts/modules/annotations-advanced", ["highcharts"], function(q) {
    d(q);
    d.Highcharts = q;
    return d
  }) : d("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(d) {
  function q(d, n, k, g) {
    d.hasOwnProperty(n) || (d[n] = g.apply(null, k), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
      detail: {
        path: n,
        module: d[n]
      }
    })))
  }
  d = d ? d._modules : {};
  q(d, "Extensions/Annotations/AnnotationChart.js", [d["Core/Utilities.js"]], function(d) {
    function n(a, b) {
      a = this.initAnnotation(a);
      this.options.annotations.push(a.options);
      v(b, !0) && (a.redraw(), a.graphic.attr({
        opacity: 1
      }));
      return a
    }

    function k() {
      const a = this;
      a.plotBoxClip = this.renderer.clipRect(this.plotBox);
      a.controlPointsGroup = a.renderer.g("control-points").attr({
        zIndex: 99
      }).clip(a.plotBoxClip).add();
      a.options.annotations.forEach((b, c) => {
        if (!a.annotations.some(a => a.options === b)) {
          const l =
            a.initAnnotation(b);
          a.options.annotations[c] = l.options
        }
      });
      a.drawAnnotations();
      b(a, "redraw", a.drawAnnotations);
      b(a, "destroy", function() {
        a.plotBoxClip.destroy();
        a.controlPointsGroup.destroy()
      });
      b(a, "exportData", function(b) {
        const c = (this.options.exporting && this.options.exporting.csv || {}).columnHeaderFormatter,
          l = !b.dataRows[1].xValues,
          h = a.options.lang && a.options.lang.exportData && a.options.lang.exportData.annotationHeader,
          e = function(a) {
            let b;
            if (c && (b = c(a), !1 !== b)) return b;
            b = h + " " + a;
            return l ? {
              columnTitle: b,
              topLevelColumnTitle: b
            } : b
          },
          v = b.dataRows[0].length,
          f = a.options.exporting && a.options.exporting.csv && a.options.exporting.csv.annotations && a.options.exporting.csv.annotations.itemDelimiter,
          m = a.options.exporting && a.options.exporting.csv && a.options.exporting.csv.annotations && a.options.exporting.csv.annotations.join;
        a.annotations.forEach(a => {
          a.options.labelOptions && a.options.labelOptions.includeInDataExport && a.labels.forEach(a => {
            if (a.options.text) {
              const c = a.options.text;
              a.points.forEach(a => {
                const l = a.x,
                  h =
                  a.series.xAxis ? a.series.xAxis.options.index : -1;
                let e = !1;
                if (-1 === h) {
                  a = b.dataRows[0].length;
                  var p = Array(a);
                  for (var u = 0; u < a; ++u) p[u] = "";
                  p.push(c);
                  p.xValues = [];
                  p.xValues[h] = l;
                  b.dataRows.push(p);
                  e = !0
                }
                e || b.dataRows.forEach(a => {
                  !e && a.xValues && void 0 !== h && l === a.xValues[h] && (m && a.length > v ? a[a.length - 1] += f + c : a.push(c), e = !0)
                });
                if (!e) {
                  a = b.dataRows[0].length;
                  p = Array(a);
                  for (u = 0; u < a; ++u) p[u] = "";
                  p[0] = l;
                  p.push(c);
                  p.xValues = [];
                  void 0 !== h && (p.xValues[h] = l);
                  b.dataRows.push(p)
                }
              })
            }
          })
        });
        let p = 0;
        b.dataRows.forEach(a => {
          p =
            Math.max(p, a.length)
        });
        const d = p - b.dataRows[0].length;
        for (let a = 0; a < d; a++) {
          const c = e(a + 1);
          l ? (b.dataRows[0].push(c.topLevelColumnTitle), b.dataRows[1].push(c.columnTitle)) : b.dataRows[0].push(c)
        }
      })
    }

    function g() {
      this.plotBoxClip.attr(this.plotBox);
      this.annotations.forEach(a => {
        a.redraw();
        a.graphic.animate({
          opacity: 1
        }, a.animationConfig)
      })
    }

    function f(a) {
      const b = this.annotations,
        c = "annotations" === a.coll ? a : e(b, function(b) {
          return b.options.id === a
        });
      c && (h(c, "remove"), m(this.options.annotations, c.options), m(b,
        c), c.destroy())
    }

    function c() {
      this.annotations = [];
      this.options.annotations || (this.options.annotations = [])
    }

    function a(a) {
      this.chart.hasDraggedAnnotation || a.apply(this, Array.prototype.slice.call(arguments, 1))
    }
    const {
      addEvent: b,
      erase: m,
      find: e,
      fireEvent: h,
      pick: v,
      wrap: p
    } = d, A = [];
    var t;
    (function(h) {
      h.compose = function(h, e, l) {
        d.pushUnique(A, e) && (b(e, "afterInit", c), e = e.prototype, e.addAnnotation = n, e.callbacks.push(k), e.collectionsWithInit.annotations = [n], e.collectionsWithUpdate.push("annotations"), e.drawAnnotations =
          g, e.removeAnnotation = f, e.initAnnotation = function(a) {
            a = new(h.types[a.type] || h)(this, a);
            this.annotations.push(a);
            return a
          });
        d.pushUnique(A, l) && p(l.prototype, "onContainerMouseDown", a)
      }
    })(t || (t = {}));
    return t
  });
  q(d, "Extensions/Annotations/AnnotationDefaults.js", [d["Core/Utilities.js"]], function(d) {
    const {
      defined: n
    } = d;
    return {
      visible: !0,
      animation: {},
      crop: !0,
      draggable: "xy",
      labelOptions: {
        align: "center",
        allowOverlap: !1,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        borderColor: "#000000",
        borderRadius: 3,
        borderWidth: 1,
        className: "highcharts-no-tooltip",
        crop: !1,
        formatter: function() {
          return n(this.y) ? "" + this.y : "Annotation label"
        },
        includeInDataExport: !0,
        overflow: "justify",
        padding: 5,
        shadow: !1,
        shape: "callout",
        style: {
          fontSize: "0.7em",
          fontWeight: "normal",
          color: "contrast"
        },
        useHTML: !1,
        verticalAlign: "bottom",
        x: 0,
        y: -16
      },
      shapeOptions: {
        stroke: "rgba(0, 0, 0, 0.75)",
        strokeWidth: 1,
        fill: "rgba(0, 0, 0, 0.75)",
        r: 0,
        snap: 2
      },
      controlPointOptions: {
        events: {},
        style: {
          cursor: "pointer",
          fill: "#ffffff",
          stroke: "#000000",
          "stroke-width": 2
        },
        height: 10,
        symbol: "circle",
        visible: !1,
        width: 10
      },
      events: {},
      zIndex: 6
    }
  });
  q(d, "Extensions/Annotations/EventEmitter.js", [d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, n) {
    const {
      doc: k,
      isTouchDevice: g
    } = d, {
      addEvent: f,
      fireEvent: c,
      objectEach: a,
      pick: b,
      removeEvent: m
    } = n;
    class e {
      addEvents() {
        const b = this,
          e = function(a) {
            f(a, g ? "touchstart" : "mousedown", a => {
              b.onMouseDown(a)
            }, {
              passive: !1
            })
          };
        e(this.graphic.element);
        (b.labels || []).forEach(a => {
          a.options.useHTML && a.graphic.text && e(a.graphic.text.element)
        });
        a(b.options.events,
          (a, c) => {
            const e = function(e) {
              "click" === c && b.cancelClick || a.call(b, b.chart.pointer.normalize(e), b.target)
            };
            if (-1 === (b.nonDOMEvents || []).indexOf(c)) b.graphic.on(c, e);
            else f(b, c, e, {
              passive: !1
            })
          });
        if (b.options.draggable && (f(b, "drag", b.onDrag), !b.graphic.renderer.styledMode)) {
          const a = {
            cursor: {
              x: "ew-resize",
              y: "ns-resize",
              xy: "move"
            } [b.options.draggable]
          };
          b.graphic.css(a);
          (b.labels || []).forEach(b => {
            b.options.useHTML && b.graphic.text && b.graphic.text.css(a)
          })
        }
        b.isUpdating || c(b, "add")
      }
      destroy() {
        this.removeDocEvents();
        m(this);
        this.hcEvents = null
      }
      mouseMoveToRadians(a, b, c) {
        let e = a.prevChartY - c,
          f = a.prevChartX - b;
        c = a.chartY - c;
        a = a.chartX - b;
        this.chart.inverted && (b = f, f = e, e = b, b = a, a = c, c = b);
        return Math.atan2(c, a) - Math.atan2(e, f)
      }
      mouseMoveToScale(a, b, c) {
        b = (a.chartX - b || 1) / (a.prevChartX - b || 1);
        a = (a.chartY - c || 1) / (a.prevChartY - c || 1);
        this.chart.inverted && (c = a, a = b, b = c);
        return {
          x: b,
          y: a
        }
      }
      mouseMoveToTranslation(a) {
        let b = a.chartX - a.prevChartX;
        a = a.chartY - a.prevChartY;
        let c;
        this.chart.inverted && (c = a, a = b, b = c);
        return {
          x: b,
          y: a
        }
      }
      onDrag(a) {
        if (this.chart.isInsidePlot(a.chartX -
            this.chart.plotLeft, a.chartY - this.chart.plotTop, {
              visiblePlotOnly: !0
            })) {
          const b = this.mouseMoveToTranslation(a);
          "x" === this.options.draggable && (b.y = 0);
          "y" === this.options.draggable && (b.x = 0);
          this.points.length ? this.translate(b.x, b.y) : (this.shapes.forEach(a => a.translate(b.x, b.y)), this.labels.forEach(a => a.translate(b.x, b.y)));
          this.redraw(!1)
        }
      }
      onMouseDown(a) {
        a.preventDefault && a.preventDefault();
        if (2 !== a.button) {
          var e = this,
            m = e.chart.pointer;
          a = m.normalize(a);
          var h = a.chartX,
            d = a.chartY;
          e.cancelClick = !1;
          e.chart.hasDraggedAnnotation = !0;
          e.removeDrag = f(k, g ? "touchmove" : "mousemove", function(a) {
            e.hasDragged = !0;
            a = m.normalize(a);
            a.prevChartX = h;
            a.prevChartY = d;
            c(e, "drag", a);
            h = a.chartX;
            d = a.chartY
          }, g ? {
            passive: !1
          } : void 0);
          e.removeMouseUp = f(k, g ? "touchend" : "mouseup", function(a) {
            const f = b(e.target && e.target.annotation, e.target);
            f && (f.cancelClick = e.hasDragged);
            e.cancelClick = e.hasDragged;
            e.hasDragged = !1;
            e.chart.hasDraggedAnnotation = !1;
            c(b(f, e), "afterUpdate");
            e.onMouseUp(a)
          }, g ? {
            passive: !1
          } : void 0)
        }
      }
      onMouseUp(a) {
        var b = this.chart;
        a = this.target ||
          this;
        const c = b.options.annotations;
        b = b.annotations.indexOf(a);
        this.removeDocEvents();
        c[b] = a.options
      }
      removeDocEvents() {
        this.removeDrag && (this.removeDrag = this.removeDrag());
        this.removeMouseUp && (this.removeMouseUp = this.removeMouseUp())
      }
    }
    return e
  });
  q(d, "Extensions/Annotations/ControlPoint.js", [d["Extensions/Annotations/EventEmitter.js"], d["Core/Utilities.js"]], function(d, n) {
    const {
      merge: k,
      pick: g
    } = n;
    class f extends d {
      constructor(c, a, b, f) {
        super();
        this.graphic = void 0;
        this.nonDOMEvents = ["drag"];
        this.chart =
          c;
        this.target = a;
        this.options = b;
        this.index = g(b.index, f)
      }
      destroy() {
        super.destroy();
        this.graphic && (this.graphic = this.graphic.destroy());
        this.options = this.target = this.chart = null
      }
      redraw(c) {
        this.graphic[c ? "animate" : "attr"](this.options.positioner.call(this, this.target))
      }
      render() {
        const c = this.chart,
          a = this.options;
        this.graphic = c.renderer.symbol(a.symbol, 0, 0, a.width, a.height).add(c.controlPointsGroup).css(a.style);
        this.setVisibility(a.visible);
        this.addEvents()
      }
      setVisibility(c) {
        this.graphic[c ? "show" : "hide"]();
        this.options.visible = c
      }
      update(c) {
        const a = this.chart,
          b = this.target,
          f = this.index;
        c = k(!0, this.options, c);
        this.destroy();
        this.constructor(a, b, c, f);
        this.render(a.controlPointsGroup);
        this.redraw()
      }
    }
    "";
    return f
  });
  q(d, "Extensions/Annotations/MockPoint.js", [d["Core/Series/SeriesRegistry.js"], d["Core/Utilities.js"]], function(d, n) {
    const {
      series: {
        prototype: k
      }
    } = d, {
      defined: g,
      fireEvent: f
    } = n;
    class c {
      static fromPoint(a) {
        return new c(a.series.chart, null, {
          x: a.x,
          y: a.y,
          xAxis: a.series.xAxis,
          yAxis: a.series.yAxis
        })
      }
      static pointToPixels(a,
        b) {
        const c = a.series,
          e = c.chart;
        let f = a.plotX || 0,
          d = a.plotY || 0;
        e.inverted && (a.mock ? (f = a.plotY, d = a.plotX) : (f = e.plotWidth - (a.plotY || 0), d = e.plotHeight - (a.plotX || 0)));
        c && !b && (a = c.getPlotBox(), f += a.translateX, d += a.translateY);
        return {
          x: f,
          y: d
        }
      }
      static pointToOptions(a) {
        return {
          x: a.x,
          y: a.y,
          xAxis: a.series.xAxis,
          yAxis: a.series.yAxis
        }
      }
      constructor(a, b, c) {
        this.plotY = this.plotX = void 0;
        this.mock = !0;
        this.series = {
          visible: !0,
          chart: a,
          getPlotBox: k.getPlotBox
        };
        this.target = b || null;
        this.options = c;
        this.applyOptions(this.getOptions())
      }
      applyOptions(a) {
        this.command =
          a.command;
        this.setAxis(a, "x");
        this.setAxis(a, "y");
        this.refresh()
      }
      getLabelConfig() {
        return {
          x: this.x,
          y: this.y,
          point: this
        }
      }
      getOptions() {
        return this.hasDynamicOptions() ? this.options(this.target) : this.options
      }
      hasDynamicOptions() {
        return "function" === typeof this.options
      }
      isInsidePlot() {
        const a = this.plotX,
          b = this.plotY,
          c = this.series.xAxis,
          e = this.series.yAxis,
          d = {
            x: a,
            y: b,
            isInsidePlot: !0,
            options: {}
          };
        c && (d.isInsidePlot = g(a) && 0 <= a && a <= c.len);
        e && (d.isInsidePlot = d.isInsidePlot && g(b) && 0 <= b && b <= e.len);
        f(this.series.chart,
          "afterIsInsidePlot", d);
        return d.isInsidePlot
      }
      refresh() {
        var a = this.series;
        const b = a.xAxis;
        a = a.yAxis;
        const c = this.getOptions();
        b ? (this.x = c.x, this.plotX = b.toPixels(c.x, !0)) : (this.x = void 0, this.plotX = c.x);
        a ? (this.y = c.y, this.plotY = a.toPixels(c.y, !0)) : (this.y = null, this.plotY = c.y);
        this.isInside = this.isInsidePlot()
      }
      refreshOptions() {
        var a = this.series;
        const b = a.xAxis;
        a = a.yAxis;
        this.x = this.options.x = b ? this.options.x = b.toValue(this.plotX, !0) : this.plotX;
        this.y = this.options.y = a ? a.toValue(this.plotY, !0) : this.plotY
      }
      rotate(a,
        b, c) {
        if (!this.hasDynamicOptions()) {
          const e = Math.cos(c);
          c = Math.sin(c);
          const f = this.plotX - a,
            d = this.plotY - b,
            m = f * c + d * e;
          this.plotX = f * e - d * c + a;
          this.plotY = m + b;
          this.refreshOptions()
        }
      }
      scale(a, b, c, e) {
        if (!this.hasDynamicOptions()) {
          const f = this.plotY * e;
          this.plotX = (1 - c) * a + this.plotX * c;
          this.plotY = (1 - e) * b + f;
          this.refreshOptions()
        }
      }
      setAxis(a, b) {
        b += "Axis";
        a = a[b];
        const c = this.series.chart;
        this.series[b] = "object" === typeof a ? a : g(a) ? c[b][a] || c.get(a) : null
      }
      toAnchor() {
        const a = [this.plotX, this.plotY, 0, 0];
        this.series.chart.inverted &&
          (a[0] = this.plotY, a[1] = this.plotX);
        return a
      }
      translate(a, b, c, e) {
        this.hasDynamicOptions() || (this.plotX += c, this.plotY += e, this.refreshOptions())
      }
    }
    "";
    return c
  });
  q(d, "Extensions/Annotations/ControlTarget.js", [d["Extensions/Annotations/ControlPoint.js"], d["Extensions/Annotations/MockPoint.js"], d["Core/Utilities.js"]], function(d, n, k) {
    var g;
    (function(f) {
      function c() {
        const a = this.controlPoints,
          b = this.options.controlPoints || [];
        b.forEach((c, e) => {
          c = k.merge(this.options.controlPointOptions, c);
          c.index || (c.index =
            e);
          b[e] = c;
          a.push(new d(this.chart, this, c))
        })
      }

      function a(a) {
        const b = a.series.getPlotBox(),
          c = a.series.chart;
        var e = a.mock ? a.toAnchor() : c.tooltip && c.tooltip.getAnchor.call({
          chart: a.series.chart
        }, a) || [0, 0, 0, 0];
        e = {
          x: e[0] + (this.options.x || 0),
          y: e[1] + (this.options.y || 0),
          height: e[2] || 0,
          width: e[3] || 0
        };
        return {
          relativePosition: e,
          absolutePosition: k.merge(e, {
            x: e.x + (a.mock ? b.translateX : c.plotLeft),
            y: e.y + (a.mock ? b.translateY : c.plotTop)
          })
        }
      }

      function b() {
        this.controlPoints.forEach(a => a.destroy());
        this.options = this.points =
          this.controlPoints = this.chart = null;
        this.annotation && (this.annotation = null)
      }

      function m() {
        const a = this.options;
        return a.points || a.point && k.splat(a.point)
      }

      function e() {
        const a = this.getPointsOptions(),
          b = this.points,
          c = a && a.length || 0;
        let e, f;
        for (e = 0; e < c; e++) {
          f = this.point(a[e], b[e]);
          if (!f) {
            b.length = 0;
            return
          }
          f.mock && f.refresh();
          b[e] = f
        }
        return b
      }

      function h(a, b) {
        if (a && a.series) return a;
        b && null !== b.series || (k.isObject(a) ? b = new n(this.chart, this, a) : k.isString(a) ? b = this.chart.get(a) || null : "function" === typeof a &&
          (b = a.call(b, this), b = b.series ? b : new n(this.chart, this, a)));
        return b
      }

      function v(a) {
        this.controlPoints.forEach(b => b.redraw(a))
      }

      function p() {
        this.controlPoints.forEach(a => a.render())
      }

      function A(a, b, c, e, f) {
        if (this.chart.inverted) {
          const a = b;
          b = c;
          c = a
        }
        this.points.forEach((l, d) => this.transformPoint(a, b, c, e, f, d), this)
      }

      function g(a, b, c, e, f, d) {
        let l = this.points[d];
        l.mock || (l = this.points[d] = n.fromPoint(l));
        l[a](b, c, e, f)
      }

      function x(a, b) {
        this.transform("translate", null, null, a, b)
      }

      function D(a, b, c) {
        this.transformPoint("translate",
          null, null, a, b, c)
      }
      const r = [];
      f.compose = function(f) {
        k.pushUnique(r, f) && k.merge(!0, f.prototype, {
          addControlPoints: c,
          anchor: a,
          destroyControlTarget: b,
          getPointsOptions: m,
          linkPoints: e,
          point: h,
          redrawControlPoints: v,
          renderControlPoints: p,
          transform: A,
          transformPoint: g,
          translate: x,
          translatePoint: D
        })
      }
    })(g || (g = {}));
    return g
  });
  q(d, "Extensions/Annotations/Controllables/Controllable.js", [d["Extensions/Annotations/ControlTarget.js"], d["Core/Utilities.js"]], function(d, n) {
    const {
      merge: k
    } = n;
    class g {
      constructor(f, c, a, b) {
        this.graphic =
          void 0;
        this.annotation = f;
        this.chart = f.chart;
        this.collection = "label" === b ? "labels" : "shapes";
        this.controlPoints = [];
        this.options = c;
        this.points = [];
        this.index = a;
        this.itemType = b;
        this.init(f, c, a)
      }
      attr(...f) {
        this.graphic.attr.apply(this.graphic, arguments)
      }
      attrsFromOptions(f) {
        const c = this.constructor.attrsMap,
          a = {},
          b = this.chart.styledMode;
        let d, e;
        for (d in f) e = c[d], "undefined" === typeof c[d] || b && -1 !== ["fill", "stroke", "stroke-width"].indexOf(e) || (a[e] = f[d]);
        return a
      }
      destroy() {
        this.graphic && (this.graphic = this.graphic.destroy());
        this.tracker && (this.tracker = this.tracker.destroy());
        this.destroyControlTarget()
      }
      init(f, c, a) {
        this.annotation = f;
        this.chart = f.chart;
        this.options = c;
        this.points = [];
        this.controlPoints = [];
        this.index = a;
        this.linkPoints();
        this.addControlPoints()
      }
      redraw(f) {
        this.redrawControlPoints(f)
      }
      render(f) {
        this.renderControlPoints()
      }
      rotate(f, c, a) {
        this.transform("rotate", f, c, a)
      }
      scale(f, c, a, b) {
        this.transform("scale", f, c, a, b)
      }
      setControlPointsVisibility(f) {
        this.controlPoints.forEach(c => {
          c.setVisibility(f)
        })
      }
      shouldBeDrawn() {
        return !!this.points.length
      }
      translateShape(f,
        c, a) {
        var b = this.annotation.chart;
        const d = this.annotation.userOptions,
          e = b.annotations.indexOf(this.annotation);
        b = b.options.annotations[e];
        this.translatePoint(f, c, 0);
        a && this.translatePoint(f, c, 1);
        b[this.collection][this.index].point = this.options.point;
        d[this.collection][this.index].point = this.options.point
      }
      update(f) {
        var c = this.annotation;
        const a = k(!0, this.options, f);
        f = this.graphic.parentGroup;
        const b = this.constructor;
        this.destroy();
        c = new b(c, a, this.index, this.itemType);
        k(!0, this, c);
        this.render(f);
        this.redraw()
      }
    }
    d.compose(g);
    "";
    return g
  });
  q(d, "Extensions/Annotations/Controllables/ControllableDefaults.js", [], function() {
    return {
      defaultMarkers: {
        arrow: {
          tagName: "marker",
          attributes: {
            id: "arrow",
            refY: 5,
            refX: 9,
            markerWidth: 10,
            markerHeight: 10
          },
          children: [{
            tagName: "path",
            attributes: {
              d: "M 0 0 L 10 5 L 0 10 Z",
              "stroke-width": 0
            }
          }]
        },
        "reverse-arrow": {
          tagName: "marker",
          attributes: {
            id: "reverse-arrow",
            refY: 5,
            refX: 1,
            markerWidth: 10,
            markerHeight: 10
          },
          children: [{
            tagName: "path",
            attributes: {
              d: "M 0 5 L 10 0 L 10 10 Z",
              "stroke-width": 0
            }
          }]
        }
      }
    }
  });
  q(d, "Extensions/Annotations/Controllables/ControllablePath.js", [d["Extensions/Annotations/Controllables/Controllable.js"], d["Extensions/Annotations/Controllables/ControllableDefaults.js"], d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, n, k, g) {
    function f(a) {
      return function(b) {
        this.attr(a, "url(#" + b + ")")
      }
    }

    function c() {
      this.options.defs = v(b, this.options.defs || {})
    }

    function a(a, b) {
      const c = {
          attributes: {
            id: a
          }
        },
        e = {
          stroke: b.color || "none",
          fill: b.color || "rgba(0, 0, 0, 0.75)"
        };
      c.children = b.children && b.children.map(function(a) {
        return v(e,
          a)
      });
      b = v(!0, {
        attributes: {
          markerWidth: 20,
          markerHeight: 20,
          refX: 0,
          refY: 0,
          orient: "auto"
        }
      }, b, c);
      b = this.definition(b);
      b.id = a;
      return b
    }
    const {
      defaultMarkers: b
    } = n, {
      addEvent: m,
      defined: e,
      extend: h,
      merge: v,
      uniqueKey: p
    } = g, A = [], t = f("marker-end"), x = f("marker-start"), D = "rgba(192,192,192," + (k.svg ? .0001 : .002) + ")";
    class r extends d {
      static compose(b, e) {
        g.pushUnique(A, b) && m(b, "afterGetContainer", c);
        g.pushUnique(A, e) && (e.prototype.addMarker = a)
      }
      constructor(a, b, c) {
        super(a, b, c, "shape");
        this.type = "path"
      }
      toD() {
        var a = this.options.d;
        if (a) return "function" === typeof a ? a.call(this) : a;
        a = this.points;
        const b = a.length,
          c = [];
        var e = b;
        let f = a[0],
          d = e && this.anchor(f).absolutePosition,
          p = 0;
        if (d)
          for (c.push(["M", d.x, d.y]); ++p < b && e;) f = a[p], e = f.command || "L", d = this.anchor(f).absolutePosition, "M" === e ? c.push([e, d.x, d.y]) : "L" === e ? c.push([e, d.x, d.y]) : "Z" === e && c.push([e]), e = f.series.visible;
        return e && this.graphic ? this.chart.renderer.crispLine(c, this.graphic.strokeWidth()) : null
      }
      shouldBeDrawn() {
        return super.shouldBeDrawn() || !!this.options.d
      }
      render(a) {
        const b =
          this.options,
          c = this.attrsFromOptions(b);
        this.graphic = this.annotation.chart.renderer.path([
          ["M", 0, 0]
        ]).attr(c).add(a);
        b.className && this.graphic.addClass(b.className);
        this.tracker = this.annotation.chart.renderer.path([
          ["M", 0, 0]
        ]).addClass("highcharts-tracker-line").attr({
          zIndex: 2
        }).add(a);
        this.annotation.chart.styledMode || this.tracker.attr({
          "stroke-linejoin": "round",
          stroke: D,
          fill: D,
          "stroke-width": this.graphic.strokeWidth() + 2 * b.snap
        });
        super.render();
        h(this.graphic, {
          markerStartSetter: x,
          markerEndSetter: t
        });
        this.setMarkers(this)
      }
      redraw(a) {
        if (this.graphic) {
          const b = this.toD(),
            c = a ? "animate" : "attr";
          b ? (this.graphic[c]({
            d: b
          }), this.tracker[c]({
            d: b
          })) : (this.graphic.attr({
            d: "M 0 -9000000000"
          }), this.tracker.attr({
            d: "M 0 -9000000000"
          }));
          this.graphic.placed = this.tracker.placed = !!b
        }
        super.redraw(a)
      }
      setMarkers(a) {
        const b = a.options,
          c = a.chart,
          f = c.options.defs,
          d = b.fill,
          m = e(d) && "none" !== d ? d : b.stroke;
        ["markerStart", "markerEnd"].forEach(function(e) {
          var d = b[e];
          let l, h, r;
          if (d) {
            for (r in f)
              if (l = f[r], (d === (l.attributes && l.attributes.id) ||
                  d === l.id) && "marker" === l.tagName) {
                h = l;
                break
              } h && (d = a[e] = c.renderer.addMarker((b.id || p()) + "-" + d, v(h, {
              color: m
            })), a.attr(e, d.getAttribute("id")))
          }
        })
      }
    }
    r.attrsMap = {
      dashStyle: "dashstyle",
      strokeWidth: "stroke-width",
      stroke: "stroke",
      fill: "fill",
      zIndex: "zIndex"
    };
    return r
  });
  q(d, "Extensions/Annotations/Controllables/ControllableRect.js", [d["Extensions/Annotations/Controllables/Controllable.js"], d["Extensions/Annotations/Controllables/ControllablePath.js"], d["Core/Utilities.js"]], function(d, n, k) {
    ({
      merge: k
    } = k);
    class g extends d {
      constructor(f,
        c, a) {
        super(f, c, a, "shape");
        this.type = "rect";
        this.translate = super.translateShape
      }
      render(f) {
        const c = this.attrsFromOptions(this.options);
        this.graphic = this.annotation.chart.renderer.rect(0, -9E9, 0, 0).attr(c).add(f);
        super.render()
      }
      redraw(f) {
        if (this.graphic) {
          const c = this.anchor(this.points[0]).absolutePosition;
          if (c) this.graphic[f ? "animate" : "attr"]({
            x: c.x,
            y: c.y,
            width: this.options.width,
            height: this.options.height
          });
          else this.attr({
            x: 0,
            y: -9E9
          });
          this.graphic.placed = !!c
        }
        super.redraw(f)
      }
    }
    g.attrsMap = k(n.attrsMap, {
      width: "width",
      height: "height"
    });
    return g
  });
  q(d, "Extensions/Annotations/Controllables/ControllableCircle.js", [d["Extensions/Annotations/Controllables/Controllable.js"], d["Extensions/Annotations/Controllables/ControllablePath.js"], d["Core/Utilities.js"]], function(d, n, k) {
    ({
      merge: k
    } = k);
    class g extends d {
      constructor(f, c, a) {
        super(f, c, a, "shape");
        this.type = "circle";
        this.translate = super.translateShape
      }
      redraw(f) {
        if (this.graphic) {
          const c = this.anchor(this.points[0]).absolutePosition;
          if (c) this.graphic[f ? "animate" :
            "attr"]({
            x: c.x,
            y: c.y,
            r: this.options.r
          });
          else this.graphic.attr({
            x: 0,
            y: -9E9
          });
          this.graphic.placed = !!c
        }
        super.redraw.call(this, f)
      }
      render(f) {
        const c = this.attrsFromOptions(this.options);
        this.graphic = this.annotation.chart.renderer.circle(0, -9E9, 0).attr(c).add(f);
        super.render()
      }
      setRadius(f) {
        this.options.r = f
      }
    }
    g.attrsMap = k(n.attrsMap, {
      r: "r"
    });
    return g
  });
  q(d, "Extensions/Annotations/Controllables/ControllableEllipse.js", [d["Extensions/Annotations/Controllables/Controllable.js"], d["Extensions/Annotations/Controllables/ControllablePath.js"],
    d["Core/Utilities.js"]
  ], function(d, n, k) {
    const {
      merge: g,
      defined: f
    } = k;
    class c extends d {
      constructor(a, b, c) {
        super(a, b, c, "shape");
        this.type = "ellipse"
      }
      init(a, b, c) {
        f(b.yAxis) && b.points.forEach(a => {
          a.yAxis = b.yAxis
        });
        f(b.xAxis) && b.points.forEach(a => {
          a.xAxis = b.xAxis
        });
        super.init(a, b, c)
      }
      render(a) {
        this.graphic = this.annotation.chart.renderer.createElement("ellipse").attr(this.attrsFromOptions(this.options)).add(a);
        super.render()
      }
      translate(a, b) {
        super.translateShape(a, b, !0)
      }
      getDistanceFromLine(a, b, c, e) {
        return Math.abs((b.y -
          a.y) * c - (b.x - a.x) * e + b.x * a.y - b.y * a.x) / Math.sqrt((b.y - a.y) * (b.y - a.y) + (b.x - a.x) * (b.x - a.x))
      }
      getAttrs(a, b) {
        var c = a.x,
          e = a.y;
        const f = b.x,
          d = b.y;
        b = (c + f) / 2;
        a = (e + d) / 2;
        const p = Math.sqrt((c - f) * (c - f) / 4 + (e - d) * (e - d) / 4);
        e = 180 * Math.atan((d - e) / (f - c)) / Math.PI;
        b < c && (e += 180);
        c = this.getRY();
        return {
          cx: b,
          cy: a,
          rx: p,
          ry: c,
          angle: e
        }
      }
      getRY() {
        const a = this.getYAxis();
        return f(a) ? Math.abs(a.toPixels(this.options.ry) - a.toPixels(0)) : this.options.ry
      }
      getYAxis() {
        return this.chart.yAxis[this.options.yAxis]
      }
      getAbsolutePosition(a) {
        return this.anchor(a).absolutePosition
      }
      redraw(a) {
        if (this.graphic) {
          const c =
            this.getAbsolutePosition(this.points[0]);
          var b = this.getAbsolutePosition(this.points[1]);
          b = this.getAttrs(c, b);
          if (c) this.graphic[a ? "animate" : "attr"]({
            cx: b.cx,
            cy: b.cy,
            rx: b.rx,
            ry: b.ry,
            rotation: b.angle,
            rotationOriginX: b.cx,
            rotationOriginY: b.cy
          });
          else this.graphic.attr({
            x: 0,
            y: -9E9
          });
          this.graphic.placed = !!c
        }
        super.redraw(a)
      }
      setYRadius(a) {
        const b = this.annotation.userOptions.shapes;
        this.options.ry = a;
        b && b[0] && (b[0].ry = a, b[0].ry = a)
      }
    }
    c.attrsMap = g(n.attrsMap, {
      ry: "ry"
    });
    return c
  });
  q(d, "Extensions/Annotations/Controllables/ControllableLabel.js",
    [d["Extensions/Annotations/Controllables/Controllable.js"], d["Core/FormatUtilities.js"], d["Extensions/Annotations/MockPoint.js"], d["Core/Utilities.js"]],
    function(d, n, k, g) {
      function f(a, c, e, f, d) {
        const p = d && d.anchorX;
        d = d && d.anchorY;
        let h, l, m = e / 2;
        b(p) && b(d) && (h = [
          ["M", p, d]
        ], l = c - d, 0 > l && (l = -f - l), l < e && (m = p < a + e / 2 ? l : e - l), d > c + f ? h.push(["L", a + m, c + f]) : d < c ? h.push(["L", a + m, c]) : p < a ? h.push(["L", a, c + f / 2]) : p > a + e && h.push(["L", a + e, c + f / 2]));
        return h || []
      }
      const {
        format: c
      } = n, {
        extend: a,
        isNumber: b,
        pick: m
      } = g, e = [];
      class h extends d {
        static alignedPosition(a,
          b) {
          const c = a.align,
            e = a.verticalAlign;
          let f = (b.x || 0) + (a.x || 0),
            d = (b.y || 0) + (a.y || 0),
            p, l;
          "right" === c ? p = 1 : "center" === c && (p = 2);
          p && (f += (b.width - (a.width || 0)) / p);
          "bottom" === e ? l = 1 : "middle" === e && (l = 2);
          l && (d += (b.height - (a.height || 0)) / l);
          return {
            x: Math.round(f),
            y: Math.round(d)
          }
        }
        static compose(a) {
          g.pushUnique(e, a) && (a.prototype.symbols.connector = f)
        }
        static justifiedOptions(a, b, c, e) {
          const f = c.align,
            d = c.verticalAlign,
            h = b.box ? 0 : b.padding || 0,
            l = b.getBBox();
          b = {
            align: f,
            verticalAlign: d,
            x: c.x,
            y: c.y,
            width: b.width,
            height: b.height
          };
          c = (e.x || 0) - a.plotLeft;
          e = (e.y || 0) - a.plotTop;
          let m;
          m = c + h;
          0 > m && ("right" === f ? b.align = "left" : b.x = (b.x || 0) - m);
          m = c + l.width - h;
          m > a.plotWidth && ("left" === f ? b.align = "right" : b.x = (b.x || 0) + a.plotWidth - m);
          m = e + h;
          0 > m && ("bottom" === d ? b.verticalAlign = "top" : b.y = (b.y || 0) - m);
          m = e + l.height - h;
          m > a.plotHeight && ("top" === d ? b.verticalAlign = "bottom" : b.y = (b.y || 0) + a.plotHeight - m);
          return b
        }
        constructor(a, b, c) {
          super(a, b, c, "label")
        }
        translatePoint(a, b) {
          super.translatePoint(a, b, 0)
        }
        translate(a, b) {
          var c = this.annotation.chart;
          const e = this.annotation.userOptions;
          var f = c.annotations.indexOf(this.annotation);
          f = c.options.annotations[f];
          c.inverted && (c = a, a = b, b = c);
          this.options.x += a;
          this.options.y += b;
          f[this.collection][this.index].x = this.options.x;
          f[this.collection][this.index].y = this.options.y;
          e[this.collection][this.index].x = this.options.x;
          e[this.collection][this.index].y = this.options.y
        }
        render(a) {
          const b = this.options,
            c = this.attrsFromOptions(b),
            e = b.style;
          this.graphic = this.annotation.chart.renderer.label("", 0, -9999, b.shape, null, null, b.useHTML, null, "annotation-label").attr(c).add(a);
          this.annotation.chart.styledMode || ("contrast" === e.color && (e.color = this.annotation.chart.renderer.getContrast(-1 < h.shapesWithoutBackground.indexOf(b.shape) ? "#FFFFFF" : b.backgroundColor)), this.graphic.css(b.style).shadow(b.shadow));
          b.className && this.graphic.addClass(b.className);
          this.graphic.labelrank = b.labelrank;
          super.render()
        }
        redraw(a) {
          var b = this.options,
            e = this.text || b.format || b.text;
          const f = this.graphic,
            d = this.points[0];
          f ? (f.attr({
            text: e ? c(String(e), d.getLabelConfig(), this.annotation.chart) : b.formatter.call(d,
              this)
          }), b = this.anchor(d), (e = this.position(b)) ? (f.alignAttr = e, e.anchorX = b.absolutePosition.x, e.anchorY = b.absolutePosition.y, f[a ? "animate" : "attr"](e)) : f.attr({
            x: 0,
            y: -9999
          }), f.placed = !!e, super.redraw(a)) : this.redraw(a)
        }
        anchor(a) {
          const b = super.anchor.apply(this, arguments),
            c = this.options.x || 0,
            e = this.options.y || 0;
          b.absolutePosition.x -= c;
          b.absolutePosition.y -= e;
          b.relativePosition.x -= c;
          b.relativePosition.y -= e;
          return b
        }
        position(b) {
          var c = this.graphic;
          const e = this.annotation.chart;
          var f = e.tooltip;
          const d = this.points[0];
          var g = this.options;
          const r = b.absolutePosition,
            l = b.relativePosition;
          let u;
          b = d.series.visible && k.prototype.isInsidePlot.call(d);
          if (c && b) {
            const {
              width: p = 0,
              height: v = 0
            } = c;
            g.distance && f ? u = f.getPosition.call({
              chart: e,
              distance: m(g.distance, 16),
              getPlayingField: f.getPlayingField
            }, p, v, {
              plotX: l.x,
              plotY: l.y,
              negative: d.negative,
              ttBelow: d.ttBelow,
              h: l.height || l.width
            }) : g.positioner ? u = g.positioner.call(this) : (f = {
                x: r.x,
                y: r.y,
                width: 0,
                height: 0
              }, u = h.alignedPosition(a(g, {
                width: p,
                height: v
              }), f), "justify" === this.options.overflow &&
              (u = h.alignedPosition(h.justifiedOptions(e, c, g, u), f)));
            g.crop && (c = u.x - e.plotLeft, g = u.y - e.plotTop, b = e.isInsidePlot(c, g) && e.isInsidePlot(c + p, g + v))
          }
          return b ? u : null
        }
      }
      h.attrsMap = {
        backgroundColor: "fill",
        borderColor: "stroke",
        borderWidth: "stroke-width",
        zIndex: "zIndex",
        borderRadius: "r",
        padding: "padding"
      };
      h.shapesWithoutBackground = ["connector"];
      return h
    });
  q(d, "Extensions/Annotations/Controllables/ControllableImage.js", [d["Extensions/Annotations/Controllables/Controllable.js"], d["Extensions/Annotations/Controllables/ControllableLabel.js"]],
    function(d, n) {
      class k extends d {
        constructor(d, f, c) {
          super(d, f, c, "shape");
          this.type = "image";
          this.translate = super.translateShape
        }
        render(d) {
          const f = this.attrsFromOptions(this.options),
            c = this.options;
          this.graphic = this.annotation.chart.renderer.image(c.src, 0, -9E9, c.width, c.height).attr(f).add(d);
          this.graphic.width = c.width;
          this.graphic.height = c.height;
          super.render()
        }
        redraw(d) {
          if (this.graphic) {
            var f = this.anchor(this.points[0]);
            if (f = n.prototype.position.call(this, f)) this.graphic[d ? "animate" : "attr"]({
              x: f.x,
              y: f.y
            });
            else this.graphic.attr({
              x: 0,
              y: -9E9
            });
            this.graphic.placed = !!f
          }
          super.redraw(d)
        }
      }
      k.attrsMap = {
        width: "width",
        height: "height",
        zIndex: "zIndex"
      };
      return k
    });
  q(d, "Core/Chart/ChartNavigationComposition.js", [], function() {
    var d;
    (function(d) {
      d.compose = function(d) {
        d.navigation || (d.navigation = new k(d));
        return d
      };
      class k {
        constructor(d) {
          this.updates = [];
          this.chart = d
        }
        addUpdate(d) {
          this.chart.navigation.updates.push(d)
        }
        update(d, f) {
          this.updates.forEach(c => {
            c.call(this.chart, d, f)
          })
        }
      }
      d.Additions = k
    })(d || (d = {}));
    return d
  });
  q(d, "Extensions/Annotations/NavigationBindingsUtilities.js", [d["Core/Utilities.js"]], function(d) {
    const {
      defined: n,
      isNumber: k,
      pick: g
    } = d, f = {
      backgroundColor: "string",
      borderColor: "string",
      borderRadius: "string",
      color: "string",
      fill: "string",
      fontSize: "string",
      labels: "string",
      name: "string",
      stroke: "string",
      title: "string"
    };
    return {
      annotationsFieldsTypes: f,
      getAssignedAxis: function(c) {
        return c.filter(a => {
          var b = a.axis.getExtremes();
          const c = b.min;
          b = b.max;
          const e = g(a.axis.minPointOffset, 0);
          return k(c) && k(b) && a.value >=
            c - e && a.value <= b + e && !a.axis.options.isInternal
        })[0]
      },
      getFieldType: function(c, a) {
        c = f[c];
        a = typeof a;
        n(c) && (a = c);
        return {
          string: "text",
          number: "number",
          "boolean": "checkbox"
        } [a]
      }
    }
  });
  q(d, "Extensions/Annotations/NavigationBindingsDefaults.js", [d["Extensions/Annotations/NavigationBindingsUtilities.js"], d["Core/Utilities.js"]], function(d, n) {
    const {
      getAssignedAxis: k
    } = d, {
      isNumber: g,
      merge: f
    } = n;
    return {
      lang: {
        navigation: {
          popup: {
            simpleShapes: "Simple shapes",
            lines: "Lines",
            circle: "Circle",
            ellipse: "Ellipse",
            rectangle: "Rectangle",
            label: "Label",
            shapeOptions: "Shape options",
            typeOptions: "Details",
            fill: "Fill",
            format: "Text",
            strokeWidth: "Line width",
            stroke: "Line color",
            title: "Title",
            name: "Name",
            labelOptions: "Label options",
            labels: "Labels",
            backgroundColor: "Background color",
            backgroundColors: "Background colors",
            borderColor: "Border color",
            borderRadius: "Border radius",
            borderWidth: "Border width",
            style: "Style",
            padding: "Padding",
            fontSize: "Font size",
            color: "Color",
            height: "Height",
            shapes: "Shape options"
          }
        }
      },
      navigation: {
        bindingsClassName: "highcharts-bindings-container",
        bindings: {
          circleAnnotation: {
            className: "highcharts-circle-annotation",
            start: function(c) {
              var a = this.chart.pointer.getCoordinates(c);
              c = k(a.xAxis);
              a = k(a.yAxis);
              const b = this.chart.options.navigation;
              if (c && a) return this.chart.addAnnotation(f({
                langKey: "circle",
                type: "basicAnnotation",
                shapes: [{
                  type: "circle",
                  point: {
                    x: c.value,
                    y: a.value,
                    xAxis: c.axis.options.index,
                    yAxis: a.axis.options.index
                  },
                  r: 5
                }]
              }, b.annotationsOptions, b.bindings.circleAnnotation.annotationsOptions))
            },
            steps: [function(c, a) {
              var b = a.options.shapes;
              b = b && b[0] && b[0].point || {};
              if (g(b.xAxis) && g(b.yAxis)) {
                var d = this.chart.inverted;
                const a = this.chart.xAxis[b.xAxis].toPixels(b.x);
                b = this.chart.yAxis[b.yAxis].toPixels(b.y);
                d = Math.max(Math.sqrt(Math.pow(d ? b - c.chartX : a - c.chartX, 2) + Math.pow(d ? a - c.chartY : b - c.chartY, 2)), 5)
              }
              a.update({
                shapes: [{
                  r: d
                }]
              })
            }]
          },
          ellipseAnnotation: {
            className: "highcharts-ellipse-annotation",
            start: function(c) {
              var a = this.chart.pointer.getCoordinates(c);
              c = k(a.xAxis);
              a = k(a.yAxis);
              const b = this.chart.options.navigation;
              if (c && a) return this.chart.addAnnotation(f({
                langKey: "ellipse",
                type: "basicAnnotation",
                shapes: [{
                  type: "ellipse",
                  xAxis: c.axis.options.index,
                  yAxis: a.axis.options.index,
                  points: [{
                    x: c.value,
                    y: a.value
                  }, {
                    x: c.value,
                    y: a.value
                  }],
                  ry: 1
                }]
              }, b.annotationsOptions, b.bindings.ellipseAnnotation.annotationOptions))
            },
            steps: [function(c, a) {
              a = a.shapes[0];
              const b = a.getAbsolutePosition(a.points[1]);
              a.translatePoint(c.chartX - b.x, c.chartY - b.y, 1);
              a.redraw(!1)
            }, function(c, a) {
              a = a.shapes[0];
              var b = a.getAbsolutePosition(a.points[0]);
              const d = a.getAbsolutePosition(a.points[1]);
              c = a.getDistanceFromLine(b,
                d, c.chartX, c.chartY);
              b = a.getYAxis();
              c = Math.abs(b.toValue(0) - b.toValue(c));
              a.setYRadius(c);
              a.redraw(!1)
            }]
          },
          rectangleAnnotation: {
            className: "highcharts-rectangle-annotation",
            start: function(c) {
              c = this.chart.pointer.getCoordinates(c);
              var a = k(c.xAxis),
                b = k(c.yAxis);
              if (a && b) {
                c = a.value;
                var d = b.value;
                a = a.axis.options.index;
                b = b.axis.options.index;
                var e = this.chart.options.navigation;
                return this.chart.addAnnotation(f({
                  langKey: "rectangle",
                  type: "basicAnnotation",
                  shapes: [{
                    type: "path",
                    points: [{
                      xAxis: a,
                      yAxis: b,
                      x: c,
                      y: d
                    }, {
                      xAxis: a,
                      yAxis: b,
                      x: c,
                      y: d
                    }, {
                      xAxis: a,
                      yAxis: b,
                      x: c,
                      y: d
                    }, {
                      xAxis: a,
                      yAxis: b,
                      x: c,
                      y: d
                    }, {
                      command: "Z"
                    }]
                  }]
                }, e.annotationsOptions, e.bindings.rectangleAnnotation.annotationsOptions))
              }
            },
            steps: [function(c, a) {
              var b = a.options.shapes;
              b = b && b[0] && b[0].points || [];
              var d = this.chart.pointer.getCoordinates(c);
              c = k(d.xAxis);
              d = k(d.yAxis);
              c && d && (c = c.value, d = d.value, b[1].x = c, b[2].x = c, b[2].y = d, b[3].y = d, a.update({
                shapes: [{
                  points: b
                }]
              }))
            }]
          },
          labelAnnotation: {
            className: "highcharts-label-annotation",
            start: function(c) {
              var a = this.chart.pointer.getCoordinates(c);
              c = k(a.xAxis);
              a = k(a.yAxis);
              const b = this.chart.options.navigation;
              if (c && a) return this.chart.addAnnotation(f({
                langKey: "label",
                type: "basicAnnotation",
                labelOptions: {
                  format: "{y:.2f}"
                },
                labels: [{
                  point: {
                    xAxis: c.axis.options.index,
                    yAxis: a.axis.options.index,
                    x: c.value,
                    y: a.value
                  },
                  overflow: "none",
                  crop: !0
                }]
              }, b.annotationsOptions, b.bindings.labelAnnotation.annotationsOptions))
            }
          }
        },
        events: {},
        annotationsOptions: {
          animation: {
            defer: 0
          }
        }
      }
    }
  });
  q(d, "Extensions/Annotations/NavigationBindings.js", [d["Core/Chart/ChartNavigationComposition.js"],
    d["Core/Defaults.js"], d["Core/FormatUtilities.js"], d["Core/Globals.js"], d["Extensions/Annotations/NavigationBindingsDefaults.js"], d["Extensions/Annotations/NavigationBindingsUtilities.js"], d["Core/Utilities.js"]
  ], function(d, n, k, g, f, c, a) {
    function b(a, b) {
      const c = l.Element.prototype,
        e = c.matches || c.msMatchesSelector || c.webkitMatchesSelector;
      let d = null;
      if (c.closest) d = c.closest.call(a, b);
      else {
        do {
          if (e.call(a, b)) return a;
          a = a.parentElement || a.parentNode
        } while (null !== a && 1 === a.nodeType)
      }
      return d
    }

    function m() {
      this.chart.navigationBindings &&
        this.chart.navigationBindings.deselectAnnotation()
    }

    function e() {
      this.navigationBindings && this.navigationBindings.destroy()
    }

    function h() {
      const a = this.options;
      a && a.navigation && a.navigation.bindings && (this.navigationBindings = new F(this, a.navigation), this.navigationBindings.initEvents(), this.navigationBindings.initUpdate())
    }

    function v() {
      const a = this.navigationBindings;
      if (this && a) {
        let b = !1;
        this.series.forEach(a => {
          !a.options.isInternal && a.visible && (b = !0)
        });
        if (this.navigationBindings && this.navigationBindings.container &&
          this.navigationBindings.container[0]) {
          const c = this.navigationBindings.container[0];
          y(a.boundClassNames, (a, e) => {
            if (e = c.querySelectorAll("." + e))
              for (let c = 0; c < e.length; c++) {
                const d = e[c],
                  f = d.className;
                "normal" === a.noDataState ? -1 !== f.indexOf("highcharts-disabled-btn") && d.classList.remove("highcharts-disabled-btn") : b ? -1 !== f.indexOf("highcharts-disabled-btn") && d.classList.remove("highcharts-disabled-btn") : -1 === f.indexOf("highcharts-disabled-btn") && (d.className += " highcharts-disabled-btn")
              }
          })
        }
      }
    }

    function p() {
      this.deselectAnnotation()
    }

    function A() {
      this.selectedButtonElement = null
    }

    function t(a) {
      function b(a) {
        const b = this,
          e = b.chart.navigationBindings,
          d = e.activeAnnotation;
        c && c.call(b, a);
        d !== b ? (e.deselectAnnotation(), e.activeAnnotation = b, b.setControlPointsVisibility(!0), z(e, "showPopup", {
          annotation: b,
          formType: "annotation-toolbar",
          options: e.annotationToFields(b),
          onSubmit: function(a) {
            if ("remove" === a.actionType) e.activeAnnotation = !1, e.chart.removeAnnotation(b);
            else {
              const c = {};
              e.fieldsToOptions(a.fields, c);
              e.deselectAnnotation();
              a = c.typeOptions;
              "measure" === b.options.type && (a.crosshairY.enabled = 0 !== a.crosshairY.strokeWidth, a.crosshairX.enabled = 0 !== a.crosshairX.strokeWidth);
              b.update(c)
            }
          }
        })) : z(e, "closePopup");
        a.activeAnnotation = !0
      }
      const c = a.prototype.defaultOptions.events && a.prototype.defaultOptions.events.click;
      let e, d;
      G(!0, a.prototype.defaultOptions.events, {
        click: b,
        touchstart: function(a) {
          e = a.touches[0].clientX;
          d = a.touches[0].clientY
        },
        touchend: function(a) {
          e && 4 <= Math.sqrt(Math.pow(e - a.changedTouches[0].clientX, 2) + Math.pow(d - a.changedTouches[0].clientY,
            2)) || b.call(this, a)
        }
      })
    }
    const {
      setOptions: x
    } = n, {
      format: D
    } = k, {
      doc: r,
      win: l
    } = g, {
      getFieldType: u
    } = c, {
      addEvent: B,
      attr: H,
      fireEvent: z,
      isArray: w,
      isFunction: q,
      isNumber: C,
      isObject: E,
      merge: G,
      objectEach: y,
      pick: K
    } = a, J = [];
    class F {
      static compose(b, c) {
        a.pushUnique(J, b) && (B(b, "remove", m), t(b), y(b.types, a => {
          t(a)
        }));
        a.pushUnique(J, c) && (B(c, "destroy", e), B(c, "load", h), B(c, "render", v));
        a.pushUnique(J, F) && (B(F, "closePopup", p), B(F, "deselectButton", A));
        a.pushUnique(J, x) && x(f)
      }
      constructor(a, b) {
        this.selectedButton = this.boundClassNames =
          void 0;
        this.chart = a;
        this.options = b;
        this.eventsToUnbind = [];
        this.container = this.chart.container.getElementsByClassName(this.options.bindingsClassName || "");
        this.container.length || (this.container = r.getElementsByClassName(this.options.bindingsClassName || ""))
      }
      initEvents() {
        const a = this,
          b = a.chart,
          c = a.container,
          e = a.options;
        a.boundClassNames = {};
        y(e.bindings || {}, b => {
          a.boundClassNames[b.className] = b
        });
        [].forEach.call(c, b => {
          a.eventsToUnbind.push(B(b, "click", c => {
            const e = a.getButtonEvents(b, c);
            e && !e.button.classList.contains("highcharts-disabled-btn") &&
              a.bindingsButtonClick(e.button, e.events, c)
          }))
        });
        y(e.events || {}, (b, c) => {
          q(b) && a.eventsToUnbind.push(B(a, c, b, {
            passive: !1
          }))
        });
        a.eventsToUnbind.push(B(b.container, "click", function(c) {
          !b.cancelClick && b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop, {
            visiblePlotOnly: !0
          }) && a.bindingsChartClick(this, c)
        }));
        a.eventsToUnbind.push(B(b.container, g.isTouchDevice ? "touchmove" : "mousemove", function(b) {
          a.bindingsContainerMouseMove(this, b)
        }, g.isTouchDevice ? {
          passive: !1
        } : void 0))
      }
      initUpdate() {
        const a = this;
        d.compose(this.chart).navigation.addUpdate(b => {
          a.update(b)
        })
      }
      bindingsButtonClick(a, b, c) {
        const e = this.chart,
          d = e.renderer.boxWrapper;
        let f = !0;
        this.selectedButtonElement && (this.selectedButtonElement.classList === a.classList && (f = !1), z(this, "deselectButton", {
          button: this.selectedButtonElement
        }), this.nextEvent && (this.currentUserDetails && "annotations" === this.currentUserDetails.coll && e.removeAnnotation(this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1));
        f ? (this.selectedButton = b, this.selectedButtonElement = a, z(this, "selectButton", {
            button: a
          }),
          b.init && b.init.call(this, a, c), (b.start || b.steps) && e.renderer.boxWrapper.addClass("highcharts-draw-mode")) : (e.stockTools && e.stockTools.toggleButtonActiveClass(a), d.removeClass("highcharts-draw-mode"), this.mouseMoveEvent = this.nextEvent = !1, this.selectedButton = null)
      }
      bindingsChartClick(a, c) {
        a = this.chart;
        const e = this.activeAnnotation,
          d = this.selectedButton;
        a = a.renderer.boxWrapper;
        e && (e.cancelClick || c.activeAnnotation || !c.target.parentNode || b(c.target, ".highcharts-popup") ? e.cancelClick && setTimeout(() => {
          e.cancelClick = !1
        }, 0) : z(this, "closePopup"));
        d && d.start && (this.nextEvent ? (this.nextEvent(c, this.currentUserDetails), this.steps && (this.stepIndex++, d.steps[this.stepIndex] ? this.mouseMoveEvent = this.nextEvent = d.steps[this.stepIndex] : (z(this, "deselectButton", {
          button: this.selectedButtonElement
        }), a.removeClass("highcharts-draw-mode"), d.end && d.end.call(this, c, this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1, this.selectedButton = null))) : (this.currentUserDetails = d.start.call(this, c)) && d.steps ? (this.stepIndex =
          0, this.steps = !0, this.mouseMoveEvent = this.nextEvent = d.steps[this.stepIndex]) : (z(this, "deselectButton", {
          button: this.selectedButtonElement
        }), a.removeClass("highcharts-draw-mode"), this.steps = !1, this.selectedButton = null, d.end && d.end.call(this, c, this.currentUserDetails)))
      }
      bindingsContainerMouseMove(a, b) {
        this.mouseMoveEvent && this.mouseMoveEvent(b, this.currentUserDetails)
      }
      fieldsToOptions(a, b) {
        y(a, (a, c) => {
          const e = parseFloat(a),
            d = c.split("."),
            f = d.length - 1;
          !C(e) || a.match(/px/g) || c.match(/format/g) || (a = e);
          if ("undefined" !==
            a) {
            let c = b;
            d.forEach((b, e) => {
              const h = K(d[e + 1], "");
              f === e ? c[b] = a : (c[b] || (c[b] = h.match(/\d/g) ? [] : {}), c = c[b])
            })
          }
        });
        return b
      }
      deselectAnnotation() {
        this.activeAnnotation && (this.activeAnnotation.setControlPointsVisibility(!1), this.activeAnnotation = !1)
      }
      annotationToFields(a) {
        function b(c, e, f, l, m) {
          let r;
          f && c && -1 === h.indexOf(e) && (0 <= (f.indexOf && f.indexOf(e)) || f[e] || !0 === f) && (w(c) ? (l[e] = [], c.forEach((a, c) => {
            E(a) ? (l[e][c] = {}, y(a, (a, f) => {
              b(a, f, d[e], l[e][c], e)
            })) : b(a, 0, d[e], l[e], e)
          })) : E(c) ? (r = {}, w(l) ? (l.push(r),
            r[e] = {}, r = r[e]) : l[e] = r, y(c, (a, c) => {
            b(a, c, 0 === e ? f : d[e], r, e)
          })) : "format" === e ? l[e] = [D(c, a.labels[0].points[0]).toString(), "text"] : w(l) ? l.push([c, u(m, c)]) : l[e] = [c, u(e, c)])
        }
        const c = a.options,
          e = F.annotationsEditable,
          d = e.nestedOptions,
          f = K(c.type, c.shapes && c.shapes[0] && c.shapes[0].type, c.labels && c.labels[0] && c.labels[0].type, "label"),
          h = F.annotationsNonEditable[c.langKey] || [],
          l = {
            langKey: c.langKey,
            type: f
          };
        y(c, (a, h) => {
          "typeOptions" === h ? (l[h] = {}, y(c[h], (a, c) => {
            b(a, c, d, l[h], c)
          })) : b(a, h, e[f], l, h)
        });
        return l
      }
      getClickedClassNames(a,
        b) {
        let c = b.target;
        b = [];
        let e;
        for (; c && c.tagName && ((e = H(c, "class")) && (b = b.concat(e.split(" ").map(a => [a, c]))), c = c.parentNode, c !== a););
        return b
      }
      getButtonEvents(a, b) {
        const c = this;
        let e;
        this.getClickedClassNames(a, b).forEach(a => {
          c.boundClassNames[a[0]] && !e && (e = {
            events: c.boundClassNames[a[0]],
            button: a[1]
          })
        });
        return e
      }
      update(a) {
        this.options = G(!0, this.options, a);
        this.removeEvents();
        this.initEvents()
      }
      removeEvents() {
        this.eventsToUnbind.forEach(a => a())
      }
      destroy() {
        this.removeEvents()
      }
    }
    F.annotationsEditable = {
      nestedOptions: {
        labelOptions: ["style",
          "format", "backgroundColor"
        ],
        labels: ["style"],
        label: ["style"],
        style: ["fontSize", "color"],
        background: ["fill", "strokeWidth", "stroke"],
        innerBackground: ["fill", "strokeWidth", "stroke"],
        outerBackground: ["fill", "strokeWidth", "stroke"],
        shapeOptions: ["fill", "strokeWidth", "stroke"],
        shapes: ["fill", "strokeWidth", "stroke"],
        line: ["strokeWidth", "stroke"],
        backgroundColors: [!0],
        connector: ["fill", "strokeWidth", "stroke"],
        crosshairX: ["strokeWidth", "stroke"],
        crosshairY: ["strokeWidth", "stroke"]
      },
      circle: ["shapes"],
      ellipse: ["shapes"],
      verticalLine: [],
      label: ["labelOptions"],
      measure: ["background", "crosshairY", "crosshairX"],
      fibonacci: [],
      tunnel: ["background", "line", "height"],
      pitchfork: ["innerBackground", "outerBackground"],
      rect: ["shapes"],
      crookedLine: [],
      basicAnnotation: ["shapes", "labelOptions"]
    };
    F.annotationsNonEditable = {
      rectangle: ["crosshairX", "crosshairY", "labelOptions"],
      ellipse: ["labelOptions"],
      circle: ["labelOptions"]
    };
    "";
    return F
  });
  q(d, "Shared/BaseForm.js", [d["Core/Renderer/HTML/AST.js"], d["Core/Utilities.js"]], function(d, n) {
    const {
      addEvent: k,
      createElement: g
    } = n;
    class f {
      constructor(c, a) {
        this.iconsURL = a;
        this.container = this.createPopupContainer(c);
        this.closeButton = this.addCloseButton()
      }
      createPopupContainer(c, a = "highcharts-popup highcharts-no-tooltip") {
        return g("div", {
          className: a
        }, void 0, c)
      }
      addCloseButton(c = "highcharts-popup-close") {
        const a = this,
          b = this.iconsURL,
          d = g("div", {
            className: c
          }, void 0, this.container);
        d.style["background-image"] = "url(" + (b.match(/png|svg|jpeg|jpg|gif/ig) ? b : b + "close.svg") + ")";
        ["click", "touchstart"].forEach(b => {
          k(d, b, a.closeButtonEvents.bind(a))
        });
        return d
      }
      closeButtonEvents() {
        this.closePopup()
      }
      showPopup(c = "highcharts-annotation-toolbar") {
        const a = this.container,
          b = this.closeButton;
        this.type = void 0;
        a.innerHTML = d.emptyHTML;
        0 <= a.className.indexOf(c) && (a.classList.remove(c), a.removeAttribute("style"));
        a.appendChild(b);
        a.style.display = "block";
        a.style.height = ""
      }
      closePopup() {
        this.container.style.display = "none"
      }
    }
    return f
  });
  q(d, "Extensions/Annotations/Popup/PopupAnnotations.js", [d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, n) {
    function k(e,
      d, n, t, x, D) {
      if (d) {
        var r = this.addInput,
          l = this.lang,
          p, v;
        m(t, (c, f) => {
          p = "" !== n ? n + "." + f : f;
          b(c) && (!a(c) || a(c) && b(c[0]) ? (v = l[f] || f, v.match(/\d/g) || x.push([!0, v, e]), k.call(this, e, d, p, c, x, !1)) : x.push([this, p, "annotation", e, c]))
        });
        D && (h(x, a => a[1].match(/format/g) ? -1 : 1), f && x.reverse(), x.forEach(a => {
          !0 === a[0] ? c("span", {
            className: "highcharts-annotation-title"
          }, void 0, a[2]).appendChild(g.createTextNode(a[1])) : (a[4] = {
            value: a[4][0],
            type: a[4][1]
          }, r.apply(a[0], a.splice(1)))
        }))
      }
    }
    const {
      doc: g,
      isFirefox: f
    } = d, {
      createElement: c,
      isArray: a,
      isObject: b,
      objectEach: m,
      pick: e,
      stableSort: h
    } = n;
    return {
      addForm: function(a, b, e, d) {
        if (a) {
          var f = this.container,
            h = this.lang,
            m = c("h2", {
              className: "highcharts-popup-main-title"
            }, void 0, f);
          m.appendChild(g.createTextNode(h[b.langKey] || b.langKey || ""));
          m = c("div", {
            className: "highcharts-popup-lhs-col highcharts-popup-lhs-full"
          }, void 0, f);
          var l = c("div", {
            className: "highcharts-popup-bottom-row"
          }, void 0, f);
          k.call(this, m, a, "", b, [], !0);
          this.addButton(l, d ? h.addButton || "Add" : h.saveButton || "Save", d ? "add" : "save",
            f, e)
        }
      },
      addToolbar: function(a, b, d) {
        const f = this.lang,
          h = this.container,
          m = this.showForm; - 1 === h.className.indexOf("highcharts-annotation-toolbar") && (h.className += " highcharts-annotation-toolbar");
        a && (h.style.top = a.plotTop + 10 + "px");
        c("span", void 0, void 0, h).appendChild(g.createTextNode(e(f[b.langKey] || b.langKey, b.shapes && b.shapes[0].type, "")));
        let r = this.addButton(h, f.removeButton || "Remove", "remove", h, d);
        r.className += " highcharts-annotation-remove-button";
        r.style["background-image"] = "url(" + this.iconsURL +
          "destroy.svg)";
        r = this.addButton(h, f.editButton || "Edit", "edit", h, () => {
          m.call(this, "annotation-edit", a, b, d)
        });
        r.className += " highcharts-annotation-edit-button";
        r.style["background-image"] = "url(" + this.iconsURL + "edit.svg)"
      }
    }
  });
  q(d, "Extensions/Annotations/Popup/PopupIndicators.js", [d["Core/Renderer/HTML/AST.js"], d["Core/Globals.js"], d["Extensions/Annotations/NavigationBindingsUtilities.js"], d["Core/Series/SeriesRegistry.js"], d["Core/Utilities.js"]], function(d, n, k, g, f) {
    function c(a) {
      const b = l("div", {
          className: "highcharts-popup-lhs-col"
        },
        void 0, a);
      a = l("div", {
        className: "highcharts-popup-rhs-col"
      }, void 0, a);
      l("div", {
        className: "highcharts-popup-rhs-col-wrapper"
      }, void 0, a);
      return {
        lhsCol: b,
        rhsCol: a
      }
    }

    function a(a, c, e, f) {
      const h = this,
        m = h.lang,
        E = c.querySelectorAll(".highcharts-popup-lhs-col")[0];
      c = c.querySelectorAll(".highcharts-popup-rhs-col")[0];
      const u = "edit" === e;
      e = u ? a.series : a.options.plotOptions || {};
      if (a || !e) {
        var G, g = [];
        u || B(e) ? B(e) && (g = p.call(this, e)) : g = v.call(this, e, f);
        q(g, (a, b) => {
          a = a.indicatorFullName.toLowerCase();
          b = b.indicatorFullName.toLowerCase();
          return a < b ? -1 : a > b ? 1 : 0
        });
        E.children[1] && E.children[1].remove();
        var k = l("ul", {
            className: "highcharts-indicator-list"
          }, void 0, E),
          y = c.querySelectorAll(".highcharts-popup-rhs-col-wrapper")[0];
        g.forEach(c => {
          const {
            indicatorFullName: e,
            indicatorType: f,
            series: m
          } = c;
          G = l("li", {
            className: "highcharts-indicator-list"
          }, void 0, k);
          G.appendChild(w.createTextNode(e));
          ["click", "touchstart"].forEach(c => {
            r(G, c, function() {
              const c = y.parentNode.children[1]; {
                const c = m.params || m.options.params;
                y.innerHTML = d.emptyHTML;
                l("h3", {
                  className: "highcharts-indicator-title"
                }, void 0, y).appendChild(w.createTextNode(A(m, f).indicatorFullName));
                l("input", {
                  type: "hidden",
                  name: "highcharts-type-" + f,
                  value: f
                }, void 0, y);
                t.call(h, f, "series", a, y, m, m.linkedParent && m.linkedParent.options.id);
                c.volumeSeriesID && t.call(h, f, "volume", a, y, m, m.linkedParent && c.volumeSeriesID);
                b.call(h, a, "params", c, f, y)
              }
              c && (c.style.display = "block");
              u && m.options && l("input", {
                type: "hidden",
                name: "highcharts-id-" + f,
                value: m.options.id
              }, void 0, y).setAttribute("highcharts-data-series-id",
                m.options.id)
            })
          })
        });
        0 < k.childNodes.length ? k.childNodes[0].click() : u || (d.setElementHTML(y.parentNode.children[0], m.noFilterMatch || ""), y.parentNode.children[1].style.display = "none")
      }
    }

    function b(a, c, d, f, l) {
      if (a) {
        var m = this.addInput;
        z(d, (d, E) => {
          var r = c + "." + E;
          u(d) && r && (H(d) && (m.call(this, r, f, l, {}), b.call(this, a, r, d, f, l)), r in I ? (r = e.call(this, f, r, l), h.call(this, a, c, r, f, E, d)) : "params.volumeSeriesID" === r || B(d) || m.call(this, r, f, l, {
            value: d,
            type: "number"
          }))
        })
      }
    }

    function m(b, c) {
      const e = this;
      var d = c.querySelectorAll(".highcharts-popup-lhs-col")[0];
      c = this.lang.clearFilter;
      d = l("div", {
        className: "highcharts-input-wrapper"
      }, void 0, d);
      const f = this.addInput("searchIndicators", "input", d, {
          value: "",
          type: "text",
          htmlFor: "search-indicators",
          labelClassName: "highcharts-input-search-indicators-label"
        }),
        h = l("a", {
          textContent: c
        }, void 0, d);
      f.classList.add("highcharts-input-search-indicators");
      h.classList.add("clear-filter-button");
      r(f, "input", function(c) {
        a.call(e, b, e.container, "add", this.value);
        h.style.display = this.value.length ? "inline-block" : "none"
      });
      ["click",
        "touchstart"
      ].forEach(c => {
        r(h, c, function() {
          f.value = "";
          a.call(e, b, e.container, "add", "");
          h.style.display = "none"
        })
      })
    }

    function e(a, b, c) {
      var e = b.split(".");
      e = e[e.length - 1];
      a = "highcharts-" + b + "-type-" + a;
      const d = this.lang;
      l("label", {
        htmlFor: a
      }, null, c).appendChild(w.createTextNode(d[e] || b));
      c = l("select", {
        name: a,
        className: "highcharts-popup-field",
        id: "highcharts-select-" + b
      }, null, c);
      c.setAttribute("id", "highcharts-select-" + b);
      return c
    }

    function h(a, b, c, e, d, f, h) {
      "series" === b || "volume" === b ? a.series.forEach(a => {
        const e =
          a.options,
          d = e.name || e.params ? a.name : e.id || "";
        "highcharts-navigator-series" !== e.id && e.id !== (h && h.options && h.options.id) && (u(f) || "volume" !== b || "column" !== a.type || (f = e.id), l("option", {
          value: e.id
        }, void 0, c).appendChild(w.createTextNode(d)))
      }) : e && d && C[d + "-" + e].forEach(a => {
        l("option", {
          value: a
        }, void 0, c).appendChild(w.createTextNode(a))
      });
      u(f) && (c.value = f)
    }

    function v(a, b) {
      const c = this.chart && this.chart.options.lang,
        e = c && c.navigation && c.navigation.popup && c.navigation.popup.indicatorAliases,
        d = [];
      let f;
      z(a,
        (a, c) => {
          var h = a && a.options;
          if (a.params || h && h.params) {
            const {
              indicatorFullName: l,
              indicatorType: m
            } = A(a, c);
            if (b) {
              if (c = b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), c = new RegExp(c, "i"), h = e && e[m] && e[m].join(" ") || "", l.match(c) || h.match(c)) f = {
                indicatorFullName: l,
                indicatorType: m,
                series: a
              }, d.push(f)
            } else f = {
              indicatorFullName: l,
              indicatorType: m,
              series: a
            }, d.push(f)
          }
        });
      return d
    }

    function p(a) {
      const b = [];
      a.forEach(a => {
        a.is("sma") && b.push({
          indicatorFullName: a.name,
          indicatorType: a.type,
          series: a
        })
      });
      return b
    }

    function A(a,
      b) {
      const c = a.options;
      let e = D[b] && D[b].prototype.nameBase || b.toUpperCase();
      c && c.type && (b = a.options.type, e = a.name);
      return {
        indicatorFullName: e,
        indicatorType: b
      }
    }

    function t(a, b, c, d, f, l) {
      c && (a = e.call(this, a, b, d), h.call(this, c, b, a, void 0, void 0, void 0, f), u(l) && (a.value = l))
    }
    const {
      doc: w
    } = n, {
      seriesTypes: D
    } = g, {
      addEvent: r,
      createElement: l,
      defined: u,
      isArray: B,
      isObject: H,
      objectEach: z,
      stableSort: q
    } = f;
    var I;
    (function(a) {
      a[a["params.algorithm"] = 0] = "params.algorithm";
      a[a["params.average"] = 1] = "params.average"
    })(I ||
      (I = {}));
    const C = {
      "algorithm-pivotpoints": ["standard", "fibonacci", "camarilla"],
      "average-disparityindex": ["sma", "ema", "dema", "tema", "wma"]
    };
    return {
      addForm: function(b, e, d) {
        e = this.lang;
        let f;
        if (b) {
          this.tabs.init.call(this, b);
          var h = this.container.querySelectorAll(".highcharts-tab-item-content");
          c(h[0]);
          m.call(this, b, h[0]);
          a.call(this, b, h[0], "add");
          f = h[0].querySelectorAll(".highcharts-popup-rhs-col")[0];
          this.addButton(f, e.addButton || "add", "add", f, d);
          c(h[1]);
          a.call(this, b, h[1], "edit");
          f = h[1].querySelectorAll(".highcharts-popup-rhs-col")[0];
          this.addButton(f, e.saveButton || "save", "edit", f, d);
          this.addButton(f, e.removeButton || "remove", "remove", f, d)
        }
      },
      getAmount: function() {
        let a = 0;
        this.series.forEach(b => {
          (b.params || b.options.params) && a++
        });
        return a
      }
    }
  });
  q(d, "Extensions/Annotations/Popup/PopupTabs.js", [d["Core/Globals.js"], d["Core/Utilities.js"]], function(d, n) {
    function k() {
      return m("div", {
        className: "highcharts-tab-item-content highcharts-no-mousewheel"
      }, void 0, this.container)
    }

    function g(b, c) {
      const e = this.container,
        d = this.lang;
      let f = "highcharts-tab-item";
      0 === c && (f += " highcharts-tab-disabled");
      c = m("span", {
        className: f
      }, void 0, e);
      c.appendChild(a.createTextNode(d[b + "Button"] || b));
      c.setAttribute("highcharts-data-tab-type", b);
      return c
    }

    function f(a, b) {
      const c = this.container.querySelectorAll(".highcharts-tab-item-content");
      a.className += " highcharts-tab-item-active";
      c[b].className += " highcharts-tab-item-show"
    }

    function c(a) {
      const c = this;
      this.container.querySelectorAll(".highcharts-tab-item").forEach((e, d) => {
        0 === a && "edit" === e.getAttribute("highcharts-data-tab-type") || ["click", "touchstart"].forEach(a => {
          b(e, a, function() {
            {
              var a = c.container;
              const b = a.querySelectorAll(".highcharts-tab-item");
              a = a.querySelectorAll(".highcharts-tab-item-content");
              for (let c = 0; c < b.length; c++) b[c].classList.remove("highcharts-tab-item-active"), a[c].classList.remove("highcharts-tab-item-show")
            }
            f.call(c, this, d)
          })
        })
      })
    }
    const {
      doc: a
    } = d, {
      addEvent: b,
      createElement: m
    } = n;
    return {
      init: function(a) {
        if (a) {
          a = this.indicators.getAmount.call(a);
          var b = g.call(this, "add");
          g.call(this, "edit", a);
          k.call(this);
          k.call(this);
          c.call(this, a);
          f.call(this, b, 0)
        }
      }
    }
  });
  q(d, "Extensions/Annotations/Popup/Popup.js", [d["Shared/BaseForm.js"], d["Core/Globals.js"], d["Core/Defaults.js"], d["Extensions/Annotations/Popup/PopupAnnotations.js"], d["Extensions/Annotations/Popup/PopupIndicators.js"], d["Extensions/Annotations/Popup/PopupTabs.js"], d["Core/Utilities.js"]], function(d, n, k, g, f, c, a) {
    function b(a, b) {
      const c = Array.prototype.slice.call(a.querySelectorAll("input")),
        e = Array.prototype.slice.call(a.querySelectorAll("select")),
        d = a.querySelectorAll("#highcharts-select-series > option:checked")[0];
      a = a.querySelectorAll("#highcharts-select-volume > option:checked")[0];
      const f = {
        actionType: b,
        linkedTo: d && d.getAttribute("value") || "",
        fields: {}
      };
      c.forEach(a => {
        const b = a.getAttribute("highcharts-data-name");
        a.getAttribute("highcharts-data-series-id") ? f.seriesId = a.value : b ? f.fields[b] = a.value : f.type = a.value
      });
      e.forEach(a => {
        var b = a.id;
        "highcharts-select-series" !== b && "highcharts-select-volume" !== b && (b = b.split("highcharts-select-")[1], f.fields[b] = a.value)
      });
      a && (f.fields["params.volumeSeriesID"] = a.getAttribute("value") ||
        "");
      return f
    }
    const {
      doc: m
    } = n, {
      getOptions: e
    } = k, {
      addEvent: h,
      createElement: v,
      extend: p,
      fireEvent: A,
      pick: t
    } = a;
    class w extends d {
      constructor(a, b, c) {
        super(a, b);
        this.chart = c;
        this.lang = e().lang.navigation.popup;
        h(this.container, "mousedown", () => {
          const a = c && c.navigationBindings && c.navigationBindings.activeAnnotation;
          if (a) {
            a.cancelClick = !0;
            const b = h(m, "click", () => {
              setTimeout(() => {
                a.cancelClick = !1
              }, 0);
              b()
            })
          }
        })
      }
      addInput(a, b, c, e) {
        var d = a.split(".");
        d = d[d.length - 1];
        const f = this.lang;
        b = "highcharts-" + b + "-" + t(e.htmlFor,
          d);
        d.match(/^\d+$/) || v("label", {
          htmlFor: b,
          className: e.labelClassName
        }, void 0, c).appendChild(m.createTextNode(f[d] || d));
        c = v("input", {
          name: b,
          value: e.value,
          type: e.type,
          className: "highcharts-popup-field"
        }, void 0, c);
        c.setAttribute("highcharts-data-name", a);
        return c
      }
      closeButtonEvents() {
        if (this.chart) {
          const a = this.chart.navigationBindings;
          A(a, "closePopup");
          a && a.selectedButtonElement && A(a, "deselectButton", {
            button: a.selectedButtonElement
          })
        } else super.closeButtonEvents()
      }
      addButton(a, c, e, d, f) {
        const l = v("button",
          void 0, void 0, a);
        l.appendChild(m.createTextNode(c));
        f && ["click", "touchstart"].forEach(a => {
          h(l, a, () => {
            this.closePopup();
            return f(b(d, e))
          })
        });
        return l
      }
      showForm(a, b, c, e) {
        b && (this.showPopup(), "indicators" === a && this.indicators.addForm.call(this, b, c, e), "annotation-toolbar" === a && this.annotations.addToolbar.call(this, b, c, e), "annotation-edit" === a && this.annotations.addForm.call(this, b, c, e), "flag" === a && this.annotations.addForm.call(this, b, c, e, !0), this.type = a, this.container.style.height = this.container.offsetHeight +
          "px")
      }
    }
    p(w.prototype, {
      annotations: g,
      indicators: f,
      tabs: c
    });
    return w
  });
  q(d, "Extensions/Annotations/Popup/PopupComposition.js", [d["Extensions/Annotations/Popup/Popup.js"], d["Core/Utilities.js"]], function(d, n) {
    function k() {
      this.popup && this.popup.closePopup()
    }

    function g(a) {
      this.popup || (this.popup = new d(this.chart.container, this.chart.options.navigation.iconsURL || this.chart.options.stockTools && this.chart.options.stockTools.gui.iconsURL || "https://code.highcharts.com/11.0.1/gfx/stock-icons/", this.chart));
      this.popup.showForm(a.formType, this.chart, a.options, a.onSubmit)
    }

    function f(a, b) {
      this.inClass(b.target, "highcharts-popup") || a.apply(this, Array.prototype.slice.call(arguments, 1))
    }
    const {
      addEvent: c,
      wrap: a
    } = n, b = [];
    return {
      compose: function(d, e) {
        n.pushUnique(b, d) && (c(d, "closePopup", k), c(d, "showPopup", g));
        n.pushUnique(b, e) && a(e.prototype, "onContainerMouseDown", f)
      }
    }
  });
  q(d, "Extensions/Annotations/Annotation.js", [d["Core/Animation/AnimationUtilities.js"], d["Extensions/Annotations/AnnotationChart.js"], d["Extensions/Annotations/AnnotationDefaults.js"],
    d["Extensions/Annotations/Controllables/ControllableRect.js"], d["Extensions/Annotations/Controllables/ControllableCircle.js"], d["Extensions/Annotations/Controllables/ControllableEllipse.js"], d["Extensions/Annotations/Controllables/ControllablePath.js"], d["Extensions/Annotations/Controllables/ControllableImage.js"], d["Extensions/Annotations/Controllables/ControllableLabel.js"], d["Extensions/Annotations/ControlPoint.js"], d["Extensions/Annotations/ControlTarget.js"], d["Extensions/Annotations/EventEmitter.js"],
    d["Extensions/Annotations/MockPoint.js"], d["Extensions/Annotations/NavigationBindings.js"], d["Extensions/Annotations/Popup/PopupComposition.js"], d["Core/Utilities.js"]
  ], function(d, n, k, g, f, c, a, b, m, e, h, v, p, A, t, q) {
    function w(a) {
      const b = a.graphic;
      a = a.points.some(a => !1 !== a.series.visible && !1 !== a.visible);
      b && (a ? "hidden" === b.visibility && b.show() : b.hide())
    }

    function r(a, b) {
      const c = {};
      ["labels", "shapes"].forEach(e => {
        const d = a[e];
        d && (c[e] = b[e] ? I(b[e]).map(function(a, b) {
          return z(d[b], a)
        }) : a[e])
      });
      return c
    }
    const {
      getDeferredAnimation: l
    } =
    d, {
      destroyObjectProperties: u,
      erase: B,
      fireEvent: H,
      merge: z,
      pick: x,
      splat: I
    } = q;
    class C extends v {
      static compose(b, c, e) {
        n.compose(C, b, c);
        m.compose(e);
        a.compose(b, e);
        A.compose(C, b);
        t.compose(A, c)
      }
      constructor(a, b) {
        super();
        this.coll = "annotations";
        this.shapesGroup = this.labelsGroup = this.labelCollector = this.group = this.graphic = this.animationConfig = void 0;
        this.chart = a;
        this.points = [];
        this.controlPoints = [];
        this.coll = "annotations";
        this.index = -1;
        this.labels = [];
        this.shapes = [];
        this.options = z(this.defaultOptions, b);
        this.userOptions = b;
        b = r(this.options, b);
        this.options.labels = b.labels;
        this.options.shapes = b.shapes;
        this.init(a, this.options)
      }
      addClipPaths() {
        this.setClipAxes();
        this.clipXAxis && this.clipYAxis && this.options.crop && (this.clipRect = this.chart.renderer.clipRect(this.getClipBox()))
      }
      addLabels() {
        const a = this.options.labels || [];
        a.forEach((b, c) => {
          b = this.initLabel(b, c);
          z(!0, a[c], b.options)
        })
      }
      addShapes() {
        const a = this.options.shapes || [];
        a.forEach((b, c) => {
          b = this.initShape(b, c);
          z(!0, a[c], b.options)
        })
      }
      destroy() {
        const a =
          this.chart,
          b = function(a) {
            a.destroy()
          };
        this.labels.forEach(b);
        this.shapes.forEach(b);
        this.clipYAxis = this.clipXAxis = null;
        B(a.labelCollectors, this.labelCollector);
        super.destroy();
        this.destroyControlTarget();
        u(this, a)
      }
      destroyItem(a) {
        B(this[a.itemType + "s"], a);
        a.destroy()
      }
      getClipBox() {
        if (this.clipXAxis && this.clipYAxis) return {
          x: this.clipXAxis.left,
          y: this.clipYAxis.top,
          width: this.clipXAxis.width,
          height: this.clipYAxis.height
        }
      }
      initProperties(a, b) {
        this.setOptions(b);
        const c = r(this.options, b);
        this.options.labels =
          c.labels;
        this.options.shapes = c.shapes;
        this.chart = a;
        this.points = [];
        this.controlPoints = [];
        this.coll = "annotations";
        this.userOptions = b;
        this.labels = [];
        this.shapes = []
      }
      init(a, b, c = this.index) {
        a = this.chart;
        b = this.options.animation;
        this.index = c;
        this.linkPoints();
        this.addControlPoints();
        this.addShapes();
        this.addLabels();
        this.setLabelCollector();
        this.animationConfig = l(a, b)
      }
      initLabel(a, b) {
        a = z(this.options.labelOptions, {
          controlPointOptions: this.options.controlPointOptions
        }, a);
        b = new m(this, a, b);
        b.itemType = "label";
        this.labels.push(b);
        return b
      }
      initShape(a, b) {
        a = z(this.options.shapeOptions, {
          controlPointOptions: this.options.controlPointOptions
        }, a);
        b = new C.shapesMap[a.type](this, a, b);
        b.itemType = "shape";
        this.shapes.push(b);
        return b
      }
      redraw(a) {
        this.linkPoints();
        this.graphic || this.render();
        this.clipRect && this.clipRect.animate(this.getClipBox());
        this.redrawItems(this.shapes, a);
        this.redrawItems(this.labels, a);
        this.redrawControlPoints(a)
      }
      redrawItem(a, b) {
        a.linkPoints();
        a.shouldBeDrawn() ? (a.graphic || this.renderItem(a), a.redraw(x(b,
          !0) && a.graphic.placed), a.points.length && w(a)) : this.destroyItem(a)
      }
      redrawItems(a, b) {
        let c = a.length;
        for (; c--;) this.redrawItem(a[c], b)
      }
      remove() {
        return this.chart.removeAnnotation(this)
      }
      render() {
        const a = this.chart.renderer;
        this.graphic = a.g("annotation").attr({
          opacity: 0,
          zIndex: this.options.zIndex,
          visibility: this.options.visible ? "inherit" : "hidden"
        }).add();
        this.shapesGroup = a.g("annotation-shapes").add(this.graphic);
        this.options.crop && this.shapesGroup.clip(this.chart.plotBoxClip);
        this.labelsGroup = a.g("annotation-labels").attr({
          translateX: 0,
          translateY: 0
        }).add(this.graphic);
        this.addClipPaths();
        this.clipRect && this.graphic.clip(this.clipRect);
        this.renderItems(this.shapes);
        this.renderItems(this.labels);
        this.addEvents();
        this.renderControlPoints()
      }
      renderItem(a) {
        a.render("label" === a.itemType ? this.labelsGroup : this.shapesGroup)
      }
      renderItems(a) {
        let b = a.length;
        for (; b--;) this.renderItem(a[b])
      }
      setClipAxes() {
        const a = this.chart.xAxis,
          b = this.chart.yAxis,
          c = (this.options.labels || []).concat(this.options.shapes || []).reduce((c, e) => {
            e = e && (e.point || e.points &&
              e.points[0]);
            return [a[e && e.xAxis] || c[0], b[e && e.yAxis] || c[1]]
          }, []);
        this.clipXAxis = c[0];
        this.clipYAxis = c[1]
      }
      setControlPointsVisibility(a) {
        const b = function(b) {
          b.setControlPointsVisibility(a)
        };
        this.controlPoints.forEach(b => {
          b.setVisibility(a)
        });
        this.shapes.forEach(b);
        this.labels.forEach(b)
      }
      setLabelCollector() {
        const a = this;
        a.labelCollector = function() {
          return a.labels.reduce(function(a, b) {
            b.options.allowOverlap || a.push(b.graphic);
            return a
          }, [])
        };
        a.chart.labelCollectors.push(a.labelCollector)
      }
      setOptions(a) {
        this.options =
          z(this.defaultOptions, a)
      }
      setVisibility(a) {
        const b = this.options,
          c = this.chart.navigationBindings,
          e = x(a, !b.visible);
        this.graphic.attr("visibility", e ? "inherit" : "hidden");
        e || (a = function(a) {
          a.setControlPointsVisibility(e)
        }, this.shapes.forEach(a), this.labels.forEach(a), c.activeAnnotation === this && c.popup && "annotation-toolbar" === c.popup.type && H(c, "closePopup"));
        b.visible = e
      }
      update(a, b) {
        const c = this.chart,
          e = r(this.userOptions, a),
          d = c.annotations.indexOf(this);
        a = z(!0, this.userOptions, a);
        a.labels = e.labels;
        a.shapes =
          e.shapes;
        this.destroy();
        this.initProperties(c, a);
        this.init(c, a);
        c.options.annotations[d] = a;
        this.isUpdating = !0;
        x(b, !0) && c.redraw();
        H(this, "afterUpdate");
        this.isUpdating = !1
      }
    }
    C.ControlPoint = e;
    C.MockPoint = p;
    C.shapesMap = {
      rect: g,
      circle: f,
      ellipse: c,
      path: a,
      image: b
    };
    C.types = {};
    C.prototype.defaultOptions = k;
    C.prototype.nonDOMEvents = ["add", "afterUpdate", "drag", "remove"];
    h.compose(C);
    "";
    return C
  });
  q(d, "Extensions/Annotations/Types/BasicAnnotation.js", [d["Extensions/Annotations/Annotation.js"], d["Extensions/Annotations/MockPoint.js"],
    d["Core/Utilities.js"]
  ], function(d, n, k) {
    ({
      merge: k
    } = k);
    class g extends d {
      addControlPoints() {
        const d = this.options,
          c = g.basicControlPoints,
          a = this.basicType;
        (d.labels || d.shapes || []).forEach(b => {
          b.controlPoints = c[a]
        })
      }
      init() {
        var d = this.options;
        d.shapes ? (delete d.labelOptions, this.basicType = (d = d.shapes[0].type) && "path" !== d ? d : "rectangle") : (delete d.shapes, this.basicType = "label");
        super.init.apply(this, arguments)
      }
    }
    g.basicControlPoints = {
      label: [{
        symbol: "triangle-down",
        positioner: function(d) {
          if (!d.graphic.placed) return {
            x: 0,
            y: -9E7
          };
          d = n.pointToPixels(d.points[0]);
          return {
            x: d.x - this.graphic.width / 2,
            y: d.y - this.graphic.height / 2
          }
        },
        events: {
          drag: function(d, c) {
            d = this.mouseMoveToTranslation(d);
            c.translatePoint(d.x, d.y);
            c.annotation.userOptions.labels[0].point = c.options.point;
            c.redraw(!1)
          }
        }
      }, {
        symbol: "square",
        positioner: function(d) {
          return d.graphic.placed ? {
            x: d.graphic.alignAttr.x - this.graphic.width / 2,
            y: d.graphic.alignAttr.y - this.graphic.height / 2
          } : {
            x: 0,
            y: -9E7
          }
        },
        events: {
          drag: function(d, c) {
            d = this.mouseMoveToTranslation(d);
            c.translate(d.x,
              d.y);
            c.annotation.userOptions.labels[0].point = c.options.point;
            c.redraw(!1)
          }
        }
      }],
      rectangle: [{
        positioner: function(d) {
          d = n.pointToPixels(d.points[2]);
          return {
            x: d.x - 4,
            y: d.y - 4
          }
        },
        events: {
          drag: function(d, c) {
            const a = c.annotation;
            var b = this.chart.pointer.getCoordinates(d);
            d = b.xAxis[0].value;
            b = b.yAxis[0].value;
            const f = c.options.points,
              e = a.userOptions.shapes;
            f[1].x = d;
            f[2].x = d;
            f[2].y = b;
            f[3].y = b;
            e && e[0] && (e[0].points = c.options.points);
            a.redraw(!1)
          }
        }
      }],
      circle: [{
        positioner: function(d) {
          const c = n.pointToPixels(d.points[0]);
          d = d.options.r;
          return {
            x: c.x + d * Math.cos(Math.PI / 4) - this.graphic.width / 2,
            y: c.y + d * Math.sin(Math.PI / 4) - this.graphic.height / 2
          }
        },
        events: {
          drag: function(d, c) {
            var a = c.annotation;
            d = this.mouseMoveToTranslation(d);
            a = a.userOptions.shapes;
            c.setRadius(Math.max(c.options.r + d.y / Math.sin(Math.PI / 4), 5));
            a && a[0] && (a[0].r = c.options.r, a[0].point = c.options.point);
            c.redraw(!1)
          }
        }
      }],
      ellipse: [{
        positioner: function(d) {
          d = d.getAbsolutePosition(d.points[0]);
          return {
            x: d.x - this.graphic.width / 2,
            y: d.y - this.graphic.height / 2
          }
        },
        events: {
          drag: function(d,
            c) {
            const a = c.getAbsolutePosition(c.points[0]);
            c.translatePoint(d.chartX - a.x, d.chartY - a.y, 0);
            c.redraw(!1)
          }
        }
      }, {
        positioner: function(d) {
          d = d.getAbsolutePosition(d.points[1]);
          return {
            x: d.x - this.graphic.width / 2,
            y: d.y - this.graphic.height / 2
          }
        },
        events: {
          drag: function(d, c) {
            const a = c.getAbsolutePosition(c.points[1]);
            c.translatePoint(d.chartX - a.x, d.chartY - a.y, 1);
            c.redraw(!1)
          }
        }
      }, {
        positioner: function(d) {
          const c = d.getAbsolutePosition(d.points[0]),
            a = d.getAbsolutePosition(d.points[1]);
          d = d.getAttrs(c, a);
          return {
            x: d.cx -
              this.graphic.width / 2 + d.ry * Math.sin(d.angle * Math.PI / 180),
            y: d.cy - this.graphic.height / 2 - d.ry * Math.cos(d.angle * Math.PI / 180)
          }
        },
        events: {
          drag: function(d, c) {
            var a = c.getAbsolutePosition(c.points[0]);
            const b = c.getAbsolutePosition(c.points[1]);
            d = c.getDistanceFromLine(a, b, d.chartX, d.chartY);
            a = c.getYAxis();
            d = Math.abs(a.toValue(0) - a.toValue(d));
            c.setYRadius(d);
            c.redraw(!1)
          }
        }
      }]
    };
    g.prototype.defaultOptions = k(d.prototype.defaultOptions, {});
    return d.types.basicAnnotation = g
  });
  q(d, "Extensions/Annotations/Types/CrookedLine.js",
    [d["Extensions/Annotations/Annotation.js"], d["Extensions/Annotations/ControlPoint.js"], d["Extensions/Annotations/MockPoint.js"], d["Core/Utilities.js"]],
    function(d, n, k, g) {
      const {
        merge: f
      } = g;
      class c extends d {
        setClipAxes() {
          this.clipXAxis = this.chart.xAxis[this.options.typeOptions.xAxis];
          this.clipYAxis = this.chart.yAxis[this.options.typeOptions.yAxis]
        }
        getPointsOptions() {
          const a = this.options.typeOptions;
          return (a.points || []).map(b => {
            b.xAxis = a.xAxis;
            b.yAxis = a.yAxis;
            return b
          })
        }
        getControlPointsOptions() {
          return this.getPointsOptions()
        }
        addControlPoints() {
          this.getControlPointsOptions().forEach(function(a,
            b) {
            b = new n(this.chart, this, f(this.options.controlPointOptions, a.controlPoint), b);
            this.controlPoints.push(b);
            a.controlPoint = b.options
          }, this)
        }
        addShapes() {
          const a = this.options.typeOptions,
            b = this.initShape(f(a.line, {
              type: "path",
              points: this.points.map((a, b) => function(a) {
                return a.annotation.points[b]
              })
            }), 0);
          a.line = b.options
        }
      }
      c.prototype.defaultOptions = f(d.prototype.defaultOptions, {
        typeOptions: {
          xAxis: 0,
          yAxis: 0,
          line: {
            fill: "none"
          }
        },
        controlPointOptions: {
          positioner: function(a) {
            const b = this.graphic;
            a = k.pointToPixels(a.points[this.index]);
            return {
              x: a.x - b.width / 2,
              y: a.y - b.height / 2
            }
          },
          events: {
            drag: function(a, b) {
              if (b.chart.isInsidePlot(a.chartX - b.chart.plotLeft, a.chartY - b.chart.plotTop, {
                  visiblePlotOnly: !0
                })) {
                a = this.mouseMoveToTranslation(a);
                const c = b.options.typeOptions;
                b.translatePoint(a.x, a.y, this.index);
                c.points[this.index].x = b.points[this.index].x;
                c.points[this.index].y = b.points[this.index].y;
                b.redraw(!1)
              }
            }
          }
        }
      });
      return d.types.crookedLine = c
    });
  q(d, "Extensions/Annotations/Types/ElliottWave.js", [d["Extensions/Annotations/Annotation.js"],
    d["Extensions/Annotations/Types/CrookedLine.js"], d["Core/Utilities.js"]
  ], function(d, n, k) {
    const {
      merge: g
    } = k;
    class f extends n {
      addLabels() {
        this.getPointsOptions().forEach((c, a) => {
          const b = this.initLabel(g(c.label, {
            text: this.options.typeOptions.labels[a],
            point: function(b) {
              return b.annotation.points[a]
            }
          }), !1);
          c.label = b.options
        })
      }
    }
    f.prototype.defaultOptions = g(n.prototype.defaultOptions, {
      typeOptions: {
        labels: "(0) (A) (B) (C) (D) (E)".split(" "),
        line: {
          strokeWidth: 1
        }
      },
      labelOptions: {
        align: "center",
        allowOverlap: !0,
        crop: !0,
        overflow: "none",
        type: "rect",
        backgroundColor: "none",
        borderWidth: 0,
        y: -5
      }
    });
    return d.types.elliottWave = f
  });
  q(d, "Extensions/Annotations/Types/Tunnel.js", [d["Extensions/Annotations/Annotation.js"], d["Extensions/Annotations/ControlPoint.js"], d["Extensions/Annotations/Types/CrookedLine.js"], d["Extensions/Annotations/MockPoint.js"], d["Core/Utilities.js"]], function(d, n, k, g, f) {
    const {
      merge: c
    } = f;
    class a extends k {
      getPointsOptions() {
        const a = k.prototype.getPointsOptions.call(this);
        a[2] = this.heightPointOptions(a[1]);
        a[3] = this.heightPointOptions(a[0]);
        return a
      }
      getControlPointsOptions() {
        return this.getPointsOptions().slice(0, 2)
      }
      heightPointOptions(a) {
        a = c(a);
        a.y += this.options.typeOptions.height;
        return a
      }
      addControlPoints() {
        k.prototype.addControlPoints.call(this);
        var a = this.options;
        const d = a.typeOptions;
        a = new n(this.chart, this, c(a.controlPointOptions, d.heightControlPoint), 2);
        this.controlPoints.push(a);
        d.heightControlPoint = a.options
      }
      addShapes() {
        this.addLine();
        this.addBackground()
      }
      addLine() {
        const a = this.initShape(c(this.options.typeOptions.line, {
          type: "path",
          points: [this.points[0], this.points[1], function(a) {
            a = g.pointToOptions(a.annotation.points[2]);
            a.command = "M";
            return a
          }, this.points[3]]
        }), 0);
        this.options.typeOptions.line = a.options
      }
      addBackground() {
        const a = this.initShape(c(this.options.typeOptions.background, {
          type: "path",
          points: this.points.slice()
        }), 1);
        this.options.typeOptions.background = a.options
      }
      translateSide(a, c, d) {
        d = Number(d);
        const b = 0 === d ? 3 : 2;
        this.translatePoint(a, c, d);
        this.translatePoint(a, c, b)
      }
      translateHeight(a) {
        this.translatePoint(0,
          a, 2);
        this.translatePoint(0, a, 3);
        this.options.typeOptions.height = this.points[3].y - this.points[0].y;
        this.userOptions.typeOptions.height = this.options.typeOptions.height
      }
    }
    a.prototype.defaultOptions = c(k.prototype.defaultOptions, {
      typeOptions: {
        background: {
          fill: "rgba(130, 170, 255, 0.4)",
          strokeWidth: 0
        },
        line: {
          strokeWidth: 1
        },
        height: -2,
        heightControlPoint: {
          positioner: function(a) {
            const b = g.pointToPixels(a.points[2]);
            a = g.pointToPixels(a.points[3]);
            const c = (b.x + a.x) / 2;
            return {
              x: c - this.graphic.width / 2,
              y: (a.y - b.y) /
                (a.x - b.x) * (c - b.x) + b.y - this.graphic.height / 2
            }
          },
          events: {
            drag: function(a, c) {
              c.chart.isInsidePlot(a.chartX - c.chart.plotLeft, a.chartY - c.chart.plotTop, {
                visiblePlotOnly: !0
              }) && (c.translateHeight(this.mouseMoveToTranslation(a).y), c.redraw(!1))
            }
          }
        }
      },
      controlPointOptions: {
        events: {
          drag: function(a, c) {
            c.chart.isInsidePlot(a.chartX - c.chart.plotLeft, a.chartY - c.chart.plotTop, {
              visiblePlotOnly: !0
            }) && (a = this.mouseMoveToTranslation(a), c.translateSide(a.x, a.y, !!this.index), c.redraw(!1))
          }
        }
      }
    });
    return d.types.tunnel = a
  });
  q(d,
    "Extensions/Annotations/Types/InfinityLine.js", [d["Extensions/Annotations/Annotation.js"], d["Extensions/Annotations/Types/CrookedLine.js"], d["Extensions/Annotations/MockPoint.js"], d["Core/Utilities.js"]],
    function(d, n, k, g) {
      const {
        merge: f
      } = g;
      class c extends n {
        static edgePoint(a, b) {
          return function(d) {
            d = d.annotation;
            const e = d.options.typeOptions.type;
            let f = d.points;
            if ("horizontalLine" === e || "verticalLine" === e) f = [f[0], new k(d.chart, f[0].target, {
              x: f[0].x + +("horizontalLine" === e),
              y: f[0].y + +("verticalLine" ===
                e),
              xAxis: f[0].options.xAxis,
              yAxis: f[0].options.yAxis
            })];
            return c.findEdgePoint(f[a], f[b])
          }
        }
        static findEdgeCoordinate(a, b, c, d) {
          const e = "x" === c ? "y" : "x";
          return (b[c] - a[c]) * (d - a[e]) / (b[e] - a[e]) + a[c]
        }
        static findEdgePoint(a, b) {
          const d = a.series.chart;
          var e = a.series.xAxis,
            f = b.series.yAxis,
            g = k.pointToPixels(a);
          b = k.pointToPixels(b);
          var p = b.x - g.x;
          const n = b.y - g.y;
          var t = e.left,
            q = t + e.width;
          e = f.top;
          f = e + f.height;
          q = 0 > p ? t : q;
          const w = 0 > n ? e : f;
          t = {
            x: 0 === p ? g.x : q,
            y: 0 === n ? g.y : w
          };
          0 !== p && 0 !== n && (p = c.findEdgeCoordinate(g, b, "y",
            q), g = c.findEdgeCoordinate(g, b, "x", w), p >= e && p <= f ? (t.x = q, t.y = p) : (t.x = g, t.y = w));
          t.x -= d.plotLeft;
          t.y -= d.plotTop;
          a.series.chart.inverted && (a = t.x, t.x = t.y, t.y = a);
          return t
        }
        addShapes() {
          const a = this.options.typeOptions;
          var b = [this.points[0], c.endEdgePoint];
          a.type.match(/line/gi) && (b[0] = c.startEdgePoint);
          b = this.initShape(f(a.line, {
            type: "path",
            points: b
          }), 0);
          a.line = b.options
        }
      }
      c.endEdgePoint = c.edgePoint(0, 1);
      c.startEdgePoint = c.edgePoint(1, 0);
      c.prototype.defaultOptions = f(n.prototype.defaultOptions, {});
      d.types.infinityLine =
        c;
      "";
      return c
    });
  q(d, "Extensions/Annotations/Types/TimeCycles.js", [d["Extensions/Annotations/Annotation.js"], d["Extensions/Annotations/Types/CrookedLine.js"], d["Extensions/Annotations/ControlPoint.js"], d["Core/Utilities.js"]], function(d, n, k, g) {
    function f(a, b, c, d) {
      const e = [];
      for (let f = 1; f <= b; f++) e.push(["A", a / 2, a / 2, 0, 1, 1, c + f * a, d]);
      return e
    }
    const {
      merge: c,
      isNumber: a,
      defined: b
    } = g;
    class m extends n {
      init(a, c, d) {
        b(c.yAxis) && c.points.forEach(a => {
          a.yAxis = c.yAxis
        });
        b(c.xAxis) && c.points.forEach(a => {
          a.xAxis =
            c.xAxis
        });
        super.init(a, c, d)
      }
      setPath() {
        this.shapes[0].options.d = this.getPath()
      }
      getPath() {
        return [
          ["M", this.startX, this.y]
        ].concat(f(this.pixelInterval, this.numberOfCircles, this.startX, this.y))
      }
      addShapes() {
        const a = this.options.typeOptions;
        this.setPathProperties();
        const b = this.initShape(c(a.line, {
          type: "path",
          d: this.getPath(),
          points: this.options.points
        }), 0);
        a.line = b.options
      }
      addControlPoints() {
        const a = this.options,
          b = a.typeOptions;
        a.controlPointOptions.style.cursor = this.chart.inverted ? "ns-resize" : "ew-resize";
        b.controlPointOptions.forEach(b => {
          b = c(a.controlPointOptions, b);
          b = new k(this.chart, this, b, 0);
          this.controlPoints.push(b)
        })
      }
      setPathProperties() {
        var b = this.options.typeOptions,
          c = b.points;
        if (c) {
          var d = c[0],
            f = this.chart.xAxis[b.xAxis || 0],
            m = this.chart.yAxis[b.yAxis || 0];
          b = d.x;
          var g = d.y;
          d = c[1].x;
          b && d && (c = a(g) ? m.toPixels(g) : m.top + m.height, b = a(b) ? f.toPixels(b) : f.left, m = a(d) ? f.toPixels(d) : f.left + 30, m = Math.round(Math.max(Math.abs(m - b), 2)), d = Math.floor(f.len / m) + 2, this.startX = b - (Math.floor((b - f.left) / m) + 1) * m, this.y =
            c, this.pixelInterval = m, this.numberOfCircles = d)
        }
      }
      redraw(a) {
        this.setPathProperties();
        this.setPath();
        super.redraw(a)
      }
    }
    m.prototype.defaultOptions = c(n.prototype.defaultOptions, {
      typeOptions: {
        controlPointOptions: [{
          positioner: function(a) {
            return {
              x: a.anchor(a.points[0]).absolutePosition.x - this.graphic.width / 2,
              y: a.y - this.graphic.height
            }
          },
          events: {
            drag: function(a, b) {
              const c = b.anchor(b.points[0]).absolutePosition;
              b.translatePoint(a.chartX - c.x, 0, 0);
              b.redraw(!1)
            }
          }
        }, {
          positioner: function(a) {
            return {
              x: a.anchor(a.points[1]).absolutePosition.x -
                this.graphic.width / 2,
              y: a.y - this.graphic.height
            }
          },
          events: {
            drag: function(a, b) {
              const c = b.anchor(b.points[1]).absolutePosition;
              b.translatePoint(a.chartX - c.x, 0, 1);
              b.redraw(!1)
            }
          }
        }]
      }
    });
    return d.types.timeCycles = m
  });
  q(d, "Extensions/Annotations/Types/Fibonacci.js", [d["Extensions/Annotations/Annotation.js"], d["Extensions/Annotations/MockPoint.js"], d["Extensions/Annotations/Types/Tunnel.js"], d["Core/Utilities.js"]], function(d, n, k, g) {
    function f(a, c) {
      return function() {
        var b = this.annotation;
        if (!b.startRetracements ||
          !b.endRetracements) return [];
        var d = this.anchor(b.startRetracements[a]).absolutePosition,
          f = this.anchor(b.endRetracements[a]).absolutePosition;
        d = [
          ["M", Math.round(d.x), Math.round(d.y)],
          ["L", Math.round(f.x), Math.round(f.y)]
        ];
        c && (f = this.anchor(b.endRetracements[a - 1]).absolutePosition, b = this.anchor(b.startRetracements[a - 1]).absolutePosition, d.push(["L", Math.round(f.x), Math.round(f.y)], ["L", Math.round(b.x), Math.round(b.y)]));
        return d
      }
    }
    const {
      merge: c
    } = g;
    class a extends k {
      linkPoints() {
        super.linkPoints();
        this.linkRetracementsPoints()
      }
      linkRetracementsPoints() {
        const b =
          this.points,
          c = b[0].y - b[3].y,
          d = b[1].y - b[2].y,
          f = b[0].x,
          g = b[1].x;
        a.levels.forEach((a, e) => {
          const h = b[0].y - c * a;
          a = b[1].y - d * a;
          this.startRetracements = this.startRetracements || [];
          this.endRetracements = this.endRetracements || [];
          this.linkRetracementPoint(e, f, h, this.startRetracements);
          this.linkRetracementPoint(e, g, a, this.endRetracements)
        })
      }
      linkRetracementPoint(a, c, d, f) {
        const b = f[a],
          e = this.options.typeOptions;
        b ? (b.options.x = c, b.options.y = d, b.refresh()) : f[a] = new n(this.chart, this, {
          x: c,
          y: d,
          xAxis: e.xAxis,
          yAxis: e.yAxis
        })
      }
      addShapes() {
        a.levels.forEach(function(a,
          c) {
          const {
            backgroundColors: b,
            lineColor: d,
            lineColors: g
          } = this.options.typeOptions;
          this.initShape({
            type: "path",
            d: f(c),
            stroke: g[c] || d
          }, c);
          0 < c && this.initShape({
            type: "path",
            fill: b[c - 1],
            strokeWidth: 0,
            d: f(c, !0)
          })
        }, this)
      }
      addLabels() {
        a.levels.forEach(function(a, d) {
          const b = this.options.typeOptions;
          a = this.initLabel(c(b.labels[d], {
            point: function(a) {
              return n.pointToOptions(a.annotation.startRetracements[d])
            },
            text: a.toString()
          }));
          b.labels[d] = a.options
        }, this)
      }
    }
    a.levels = [0, .236, .382, .5, .618, .786, 1];
    a.prototype.defaultOptions =
      c(k.prototype.defaultOptions, {
        typeOptions: {
          height: 2,
          backgroundColors: "rgba(130, 170, 255, 0.4);rgba(139, 191, 216, 0.4);rgba(150, 216, 192, 0.4);rgba(156, 229, 161, 0.4);rgba(162, 241, 130, 0.4);rgba(169, 255, 101, 0.4)".split(";"),
          lineColor: "#999999",
          lineColors: [],
          labels: []
        },
        labelOptions: {
          allowOverlap: !0,
          align: "right",
          backgroundColor: "none",
          borderWidth: 0,
          crop: !1,
          overflow: "none",
          shape: "rect",
          style: {
            color: "grey"
          },
          verticalAlign: "middle",
          y: 0
        }
      });
    return d.types.fibonacci = a
  });
  q(d, "Extensions/Annotations/Types/FibonacciTimeZones.js",
    [d["Extensions/Annotations/Annotation.js"], d["Extensions/Annotations/ControlPoint.js"], d["Extensions/Annotations/Types/CrookedLine.js"], d["Extensions/Annotations/Types/InfinityLine.js"], d["Extensions/Annotations/MockPoint.js"], d["Core/Utilities.js"]],
    function(d, n, k, g, f, c) {
      function a(a, b, c) {
        return function(d) {
          const e = d.annotation.chart;
          d = d.annotation.points;
          const h = d[0].series.xAxis.toValue(d[0].plotX + (e.inverted ? e.plotTop : e.plotLeft) + c * (1 < d.length ? d[1].plotX - d[0].plotX : 0));
          d = [new f(e, d[0].target, {
            x: h,
            y: 0,
            xAxis: d[0].options.xAxis,
            yAxis: d[0].options.yAxis
          }), new f(e, d[0].target, {
            x: h,
            y: 1,
            xAxis: d[0].options.xAxis,
            yAxis: d[0].options.yAxis
          })];
          return g.findEdgePoint(d[a], d[b])
        }
      }
      const {
        merge: b
      } = c;
      class m extends k {
        addShapes() {
          let c = 1,
            d = 1;
          for (let e = 0; 11 > e; e++) {
            var f = e ? c : 0;
            f = [a(1, 0, f), a(0, 1, f)];
            d = c + d;
            c = d - c;
            1 === e && (this.secondLineEdgePoints = [f[0], f[1]]);
            this.initShape(b(this.options.typeOptions.line, {
              type: "path",
              points: f
            }), e)
          }
        }
        addControlPoints() {
          var a = this.options;
          const c = a.typeOptions;
          a = new n(this.chart,
            this, b(a.controlPointOptions, c.controlPointOptions), 0);
          this.controlPoints.push(a);
          c.controlPointOptions = a.options
        }
      }
      m.prototype.defaultOptions = b(k.prototype.defaultOptions, {
        typeOptions: {
          line: {
            stroke: "rgba(0, 0, 0, 0.75)",
            strokeWidth: 1,
            fill: void 0
          },
          controlPointOptions: {
            positioner: function() {
              var a = this.target;
              const b = this.graphic;
              var c = a.secondLineEdgePoints;
              const d = {
                annotation: a
              };
              var f = c[0](d).y;
              const g = c[1](d).y;
              a = this.chart.plotLeft;
              const m = this.chart.plotTop;
              c = c[0](d).x;
              f = (f + g) / 2;
              this.chart.inverted &&
                ([c, f] = [f, c]);
              return {
                x: a + c - b.width / 2,
                y: m + f - b.height / 2
              }
            },
            events: {
              drag: function(a, b) {
                b.chart.isInsidePlot(a.chartX - b.chart.plotLeft, a.chartY - b.chart.plotTop, {
                  visiblePlotOnly: !0
                }) && (a = this.mouseMoveToTranslation(a), b.translatePoint(a.x, 0, 1), b.redraw(!1))
              }
            }
          }
        }
      });
      return d.types.fibonacciTimeZones = m
    });
  q(d, "Extensions/Annotations/Types/Pitchfork.js", [d["Extensions/Annotations/Annotation.js"], d["Extensions/Annotations/Types/InfinityLine.js"], d["Extensions/Annotations/MockPoint.js"], d["Core/Utilities.js"]],
    function(d, n, k, g) {
      const {
        merge: f
      } = g;
      class c extends n {
        static outerLineEdgePoint(a) {
          return function(b) {
            const d = b.annotation,
              e = d.points;
            return c.findEdgePoint(e[a], e[0], new k(d.chart, b, d.midPointOptions()))
          }
        }
        static findEdgePoint(a, b, c) {
          b = Math.atan2(c.plotY - b.plotY, c.plotX - b.plotX);
          return {
            x: a.plotX + 1E7 * Math.cos(b),
            y: a.plotY + 1E7 * Math.sin(b)
          }
        }
        static middleLineEdgePoint(a) {
          const b = a.annotation;
          return n.findEdgePoint(b.points[0], new k(b.chart, a, b.midPointOptions()))
        }
        midPointOptions() {
          const a = this.points;
          return {
            x: (a[1].x + a[2].x) / 2,
            y: (a[1].y + a[2].y) / 2,
            xAxis: a[0].series.xAxis,
            yAxis: a[0].series.yAxis
          }
        }
        addShapes() {
          this.addLines();
          this.addBackgrounds()
        }
        addLines() {
          this.initShape({
            type: "path",
            points: [this.points[0], c.middleLineEdgePoint]
          }, 0);
          this.initShape({
            type: "path",
            points: [this.points[1], c.topLineEdgePoint]
          }, 1);
          this.initShape({
            type: "path",
            points: [this.points[2], c.bottomLineEdgePoint]
          }, 2)
        }
        addBackgrounds() {
          var a = this.shapes;
          const b = this.options.typeOptions,
            c = this.initShape(f(b.innerBackground, {
              type: "path",
              points: [function(a) {
                var b = a.annotation;
                a = b.points;
                b = b.midPointOptions();
                return {
                  x: (a[1].x + b.x) / 2,
                  y: (a[1].y + b.y) / 2,
                  xAxis: b.xAxis,
                  yAxis: b.yAxis
                }
              }, a[1].points[1], a[2].points[1], function(a) {
                var b = a.annotation;
                a = b.points;
                b = b.midPointOptions();
                return {
                  x: (b.x + a[2].x) / 2,
                  y: (b.y + a[2].y) / 2,
                  xAxis: b.xAxis,
                  yAxis: b.yAxis
                }
              }]
            }), 3);
          a = this.initShape(f(b.outerBackground, {
            type: "path",
            points: [this.points[1], a[1].points[1], a[2].points[1], this.points[2]]
          }), 4);
          b.innerBackground = c.options;
          b.outerBackground = a.options
        }
      }
      c.topLineEdgePoint =
        c.outerLineEdgePoint(1);
      c.bottomLineEdgePoint = c.outerLineEdgePoint(0);
      c.prototype.defaultOptions = f(n.prototype.defaultOptions, {
        typeOptions: {
          innerBackground: {
            fill: "rgba(130, 170, 255, 0.4)",
            strokeWidth: 0
          },
          outerBackground: {
            fill: "rgba(156, 229, 161, 0.4)",
            strokeWidth: 0
          }
        }
      });
      return d.types.pitchfork = c
    });
  q(d, "Extensions/Annotations/Types/VerticalLine.js", [d["Extensions/Annotations/Annotation.js"], d["Extensions/Annotations/MockPoint.js"], d["Core/Utilities.js"]], function(d, n, k) {
    const {
      merge: g,
      pick: f
    } = k;
    class c extends d {
      static connectorFirstPoint(a) {
        var b =
          a.annotation;
        a = b.chart;
        const c = a.inverted,
          d = b.points[0],
          g = f(d.series.yAxis && d.series.yAxis.left, 0),
          k = f(d.series.yAxis && d.series.yAxis.top, 0);
        b = b.options.typeOptions.label.offset;
        const p = n.pointToPixels(d, !0)[c ? "x" : "y"];
        return {
          x: d.x,
          xAxis: d.series.xAxis,
          y: p + b + (c ? g - a.plotLeft : k - a.plotTop)
        }
      }
      static connectorSecondPoint(a) {
        var b = a.annotation;
        a = b.chart;
        const c = a.inverted,
          d = b.options.typeOptions;
        b = b.points[0];
        const g = f(b.series.yAxis && b.series.yAxis.left, 0),
          k = f(b.series.yAxis && b.series.yAxis.top, 0),
          p = n.pointToPixels(b,
            !0)[c ? "x" : "y"];
        let q = d.yOffset;
        0 > d.label.offset && (q *= -1);
        return {
          x: b.x,
          xAxis: b.series.xAxis,
          y: p + q + (c ? g - a.plotLeft : k - a.plotTop)
        }
      }
      getPointsOptions() {
        return [this.options.typeOptions.point]
      }
      addShapes() {
        const a = this.options.typeOptions,
          b = this.initShape(g(a.connector, {
            type: "path",
            points: [c.connectorFirstPoint, c.connectorSecondPoint]
          }), 0);
        a.connector = b.options;
        this.userOptions.typeOptions.point = a.point
      }
      addLabels() {
        const a = this.options.typeOptions;
        var b = a.label;
        let c = 0,
          d = b.offset,
          f = 0 > b.offset ? "bottom" : "top",
          k = "center";
        this.chart.inverted && (c = b.offset, d = 0, f = "middle", k = 0 > b.offset ? "right" : "left");
        b = this.initLabel(g(b, {
          verticalAlign: f,
          align: k,
          x: c,
          y: d
        }));
        a.label = b.options
      }
    }
    c.prototype.defaultOptions = g(d.prototype.defaultOptions, {
      typeOptions: {
        yOffset: 10,
        label: {
          offset: -40,
          point: function(a) {
            return a.annotation.points[0]
          },
          allowOverlap: !0,
          backgroundColor: "none",
          borderWidth: 0,
          crop: !0,
          overflow: "none",
          shape: "rect",
          text: "{y:.2f}"
        },
        connector: {
          strokeWidth: 1,
          markerEnd: "arrow"
        }
      }
    });
    return d.types.verticalLine = c
  });
  q(d,
    "Extensions/Annotations/Types/Measure.js", [d["Extensions/Annotations/Annotation.js"], d["Extensions/Annotations/ControlPoint.js"], d["Core/Utilities.js"]],
    function(d, n, k) {
      function g() {
        const a = this.chart.series,
          b = c(this.xAxisMin, this.xAxisMax, this.yAxisMin, this.yAxisMax);
        let d = 0,
          e = !1;
        a.forEach(a => {
          a.visible && "highcharts-navigator-series" !== a.options.id && a.points.forEach(a => {
            !a.isNull && a.x > b.xAxisMin && a.x <= b.xAxisMax && a.y > b.yAxisMin && a.y <= b.yAxisMax && (d++, e = !0)
          })
        });
        e || (d = "");
        return d
      }

      function f() {
        return "Min: " +
          this.min + "<br>Max: " + this.max + "<br>Average: " + this.average + "<br>Bins: " + this.bins
      }

      function c(a, b, c, d) {
        return {
          xAxisMin: Math.min(b, a),
          xAxisMax: Math.max(b, a),
          yAxisMin: Math.min(d, c),
          yAxisMax: Math.max(d, c)
        }
      }

      function a(a, b, c) {
        return a.toValue(a.toPixels(b) + c)
      }

      function b() {
        const a = this.chart.series,
          b = c(this.xAxisMin, this.xAxisMax, this.yAxisMin, this.yAxisMax);
        let d = -Infinity,
          e = !1;
        a.forEach(a => {
          a.visible && "highcharts-navigator-series" !== a.options.id && a.points.forEach(a => {
            !a.isNull && a.y > d && a.x > b.xAxisMin &&
              a.x <= b.xAxisMax && a.y > b.yAxisMin && a.y <= b.yAxisMax && (d = a.y, e = !0)
          })
        });
        e || (d = "");
        return d
      }

      function m() {
        const a = this.chart.series,
          b = c(this.xAxisMin, this.xAxisMax, this.yAxisMin, this.yAxisMax);
        let d = Infinity,
          e = !1;
        a.forEach(a => {
          a.visible && "highcharts-navigator-series" !== a.options.id && a.points.forEach(a => {
            !a.isNull && a.y < d && a.x > b.xAxisMin && a.x <= b.xAxisMax && a.y > b.yAxisMin && a.y <= b.yAxisMax && (d = a.y, e = !0)
          })
        });
        e || (d = "");
        return d
      }

      function e(c) {
        var d = this.options.typeOptions,
          e = this.chart.xAxis[d.xAxis];
        d = this.chart.yAxis[d.yAxis];
        const f = this.offsetX,
          r = this.offsetY;
        this.xAxisMin = a(e, this.startXMin, f);
        this.xAxisMax = a(e, this.startXMax, f);
        this.yAxisMin = a(d, this.startYMin, r);
        this.yAxisMax = a(d, this.startYMax, r);
        this.min = m.call(this);
        this.max = b.call(this);
        e = "";
        "" !== this.max && "" !== this.min && (e = (this.max + this.min) / 2);
        this.average = e;
        this.bins = g.call(this);
        c && this.resize(0, 0)
      }

      function h(b, c, d, e, f) {
        var l = this.options.typeOptions;
        const g = l.selectType,
          r = this.chart.xAxis[l.xAxis];
        l = this.chart.yAxis[l.yAxis];
        const h = this.startXMin,
          k = this.startXMax,
          m = this.startYMin,
          n = this.startYMax,
          u = this.offsetX,
          p = this.offsetY;
        c && ("x" === g ? 0 === d ? this.startXMin = a(r, h, e) : this.startXMax = a(r, k, e) : "y" === g ? 0 === d ? this.startYMin = a(l, m, f) : this.startYMax = a(l, n, f) : (this.startXMax = a(r, k, e), this.startYMax = a(l, n, f)));
        b && (this.startXMin = a(r, h, u), this.startXMax = a(r, k, u), this.startYMin = a(l, m, p), this.startYMax = a(l, n, p), this.offsetY = this.offsetX = 0)
      }
      const {
        defined: q,
        extend: p,
        isNumber: w,
        merge: t,
        pick: x
      } = k;
      class D extends d {
        init(b, c, d) {
          super.init(b, c, d);
          this.resizeY = this.resizeX =
            this.offsetY = this.offsetX = 0; {
            b = this.options.typeOptions;
            var e = this.chart;
            d = e.inverted;
            c = e.xAxis[b.xAxis];
            e = e.yAxis[b.yAxis];
            var f = b.background;
            const l = d ? f.height : f.width;
            f = d ? f.width : f.height;
            const g = b.selectType,
              h = d ? c.left : e.top;
            d = d ? e.top : c.left;
            this.startXMin = b.point.x;
            this.startYMin = b.point.y;
            w(l) ? this.startXMax = this.startXMin + l : this.startXMax = a(c, this.startXMin, parseFloat(l));
            w(f) ? this.startYMax = this.startYMin - f : this.startYMax = a(e, this.startYMin, parseFloat(f));
            "x" === g ? (this.startYMin = e.toValue(h),
              this.startYMax = e.toValue(h + e.len)) : "y" === g && (this.startXMin = c.toValue(d), this.startXMax = c.toValue(d + c.len))
          }
          this.addValues();
          this.addShapes()
        }
        setClipAxes() {
          this.clipXAxis = this.chart.xAxis[this.options.typeOptions.xAxis];
          this.clipYAxis = this.chart.yAxis[this.options.typeOptions.yAxis]
        }
        pointsOptions() {
          return this.options.points
        }
        shapePointsOptions() {
          var a = this.options.typeOptions;
          const b = a.xAxis;
          a = a.yAxis;
          return [{
            x: this.xAxisMin,
            y: this.yAxisMin,
            xAxis: b,
            yAxis: a
          }, {
            x: this.xAxisMax,
            y: this.yAxisMin,
            xAxis: b,
            yAxis: a
          }, {
            x: this.xAxisMax,
            y: this.yAxisMax,
            xAxis: b,
            yAxis: a
          }, {
            x: this.xAxisMin,
            y: this.yAxisMax,
            xAxis: b,
            yAxis: a
          }]
        }
        addControlPoints() {
          var a = this.chart.inverted;
          const b = this.options.controlPointOptions,
            c = this.options.typeOptions.selectType;
          q(this.userOptions.controlPointOptions && this.userOptions.controlPointOptions.style.cursor) || ("x" === c ? b.style.cursor = a ? "ns-resize" : "ew-resize" : "y" === c && (b.style.cursor = a ? "ew-resize" : "ns-resize"));
          a = new n(this.chart, this, this.options.controlPointOptions, 0);
          this.controlPoints.push(a);
          "xy" !== c && (a = new n(this.chart, this, this.options.controlPointOptions, 1), this.controlPoints.push(a))
        }
        addValues(a) {
          const b = this.options.typeOptions,
            c = b.label.formatter;
          e.call(this, a);
          b.label.enabled && (0 < this.labels.length ? this.labels[0].text = c && c.call(this) || f.call(this) : this.initLabel(p({
            shape: "rect",
            backgroundColor: "none",
            color: "black",
            borderWidth: 0,
            dashStyle: "Dash",
            overflow: "allow",
            align: "left",
            y: 0,
            x: 0,
            verticalAlign: "top",
            crop: !0,
            xAxis: 0,
            yAxis: 0,
            point: function(a) {
              const c = a.annotation;
              a = a.options;
              return {
                x: c.xAxisMin,
                y: c.yAxisMin,
                xAxis: x(b.xAxis, a.xAxis),
                yAxis: x(b.yAxis, a.yAxis)
              }
            },
            text: c && c.call(this) || f.call(this)
          }, b.label), void 0))
        }
        addShapes() {
          this.addCrosshairs();
          this.addBackground()
        }
        addBackground() {
          "undefined" !== typeof this.shapePointsOptions()[0].x && this.initShape(p({
            type: "path",
            points: this.shapePointsOptions()
          }, this.options.typeOptions.background), 2)
        }
        addCrosshairs() {
          var a = this.chart,
            b = this.options.typeOptions,
            c = a.xAxis[b.xAxis],
            d = a.yAxis[b.yAxis],
            e = a.inverted;
          a = {
            point: this.options.typeOptions.point,
            type: "path"
          };
          var f = c.toPixels(this.xAxisMin);
          let g = c.toPixels(this.xAxisMax),
            h = d.toPixels(this.yAxisMin),
            k = d.toPixels(this.yAxisMax);
          d = [];
          c = [];
          e && (e = f, f = h, h = e, e = g, g = k, k = e);
          b.crosshairX.enabled && (d = [
            ["M", f, h + (k - h) / 2],
            ["L", g, h + (k - h) / 2]
          ]);
          b.crosshairY.enabled && (c = [
            ["M", f + (g - f) / 2, h],
            ["L", f + (g - f) / 2, k]
          ]);
          0 < this.shapes.length ? (this.shapes[0].options.d = d, this.shapes[1].options.d = c) : (f = t(a, b.crosshairX), b = t(a, b.crosshairY), this.initShape(p({
            d
          }, f), 0), this.initShape(p({
            d: c
          }, b), 1))
        }
        onDrag(a) {
          var b = this.mouseMoveToTranslation(a);
          const c = this.options.typeOptions.selectType;
          a = "y" === c ? 0 : b.x;
          b = "x" === c ? 0 : b.y;
          this.translate(a, b);
          this.offsetX += a;
          this.offsetY += b;
          this.redraw(!1, !1, !0)
        }
        resize(a, b, c, d) {
          const e = this.shapes[2];
          "x" === d ? 0 === c ? (e.translatePoint(a, 0, 0), e.translatePoint(a, b, 3)) : (e.translatePoint(a, 0, 1), e.translatePoint(a, b, 2)) : "y" === d ? 0 === c ? (e.translatePoint(0, b, 0), e.translatePoint(0, b, 1)) : (e.translatePoint(0, b, 2), e.translatePoint(0, b, 3)) : (e.translatePoint(a, 0, 1), e.translatePoint(a, b, 2), e.translatePoint(0, b, 3));
          h.call(this,
            !1, !0, c, a, b);
          this.options.typeOptions.background.height = Math.abs(this.startYMax - this.startYMin);
          this.options.typeOptions.background.width = Math.abs(this.startXMax - this.startXMin)
        }
        redraw(a, b, c) {
          this.linkPoints();
          this.graphic || this.render();
          c && h.call(this, !0, !1);
          this.clipRect && this.clipRect.animate(this.getClipBox());
          this.addValues(b);
          this.addCrosshairs();
          this.redrawItems(this.shapes, a);
          this.redrawItems(this.labels, a);
          this.controlPoints.forEach(a => a.redraw())
        }
        translate(a, b) {
          this.shapes.forEach(c => c.translate(a,
            b));
          this.options.typeOptions.point = {
            x: this.startXMin,
            y: this.startYMin
          }
        }
      }
      D.prototype.defaultOptions = t(d.prototype.defaultOptions, {
        typeOptions: {
          selectType: "xy",
          xAxis: 0,
          yAxis: 0,
          background: {
            fill: "rgba(130, 170, 255, 0.4)",
            strokeWidth: 0,
            stroke: void 0
          },
          crosshairX: {
            enabled: !0,
            zIndex: 6,
            dashStyle: "Dash",
            markerEnd: "arrow"
          },
          crosshairY: {
            enabled: !0,
            zIndex: 6,
            dashStyle: "Dash",
            markerEnd: "arrow"
          },
          label: {
            enabled: !0,
            style: {
              fontSize: "0.7em",
              color: "#666666"
            },
            formatter: void 0
          }
        },
        controlPointOptions: {
          positioner: function(a) {
            var b =
              this.index,
              d = a.chart,
              e = a.options,
              f = e.typeOptions;
            const g = f.selectType;
            e = e.controlPointOptions;
            const h = d.inverted,
              k = d.xAxis[f.xAxis];
            d = d.yAxis[f.yAxis];
            const m = c(a.xAxisMin, a.xAxisMax, a.yAxisMin, a.yAxisMax);
            f = a.xAxisMax;
            let n = a.yAxisMax;
            "x" === g && (n = (m.yAxisMax + m.yAxisMin) / 2, 0 === b && (f = a.xAxisMin));
            "y" === g && (f = m.xAxisMin + (m.xAxisMax - m.xAxisMin) / 2, 0 === b && (n = a.yAxisMin));
            h ? (a = d.toPixels(n), b = k.toPixels(f)) : (a = k.toPixels(f), b = d.toPixels(n));
            return {
              x: a - e.width / 2,
              y: b - e.height / 2
            }
          },
          events: {
            drag: function(a,
              b) {
              var c = this.mouseMoveToTranslation(a);
              a = b.options.typeOptions.selectType;
              const d = "y" === a ? 0 : c.x;
              c = "x" === a ? 0 : c.y;
              b.resize(d, c, this.index, a);
              b.resizeX += d;
              b.resizeY += c;
              b.redraw(!1, !0)
            }
          }
        }
      });
      return d.types.measure = D
    });
  q(d, "masters/modules/annotations-advanced.src.js", [d["Core/Globals.js"], d["Extensions/Annotations/Annotation.js"]], function(d, n) {
    d.Annotation = n;
    n.compose(d.Chart, d.Pointer, d.SVGRenderer)
  })
});
//# sourceMappingURL=annotations-advanced.js.map