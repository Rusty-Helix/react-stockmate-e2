/*
 Highstock JS v11.0.1 (2023-05-08)

 Advanced Highcharts Stock tools

 (c) 2010-2021 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function(b) {
  "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/stock-tools", ["highcharts", "highcharts/modules/stock"], function(r) {
    b(r);
    b.Highcharts = r;
    return b
  }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(b) {
  function r(b, n, m, t) {
    b.hasOwnProperty(n) || (b[n] = t.apply(null, m), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
      detail: {
        path: n,
        module: b[n]
      }
    })))
  }
  b = b ? b._modules : {};
  r(b, "Core/Chart/ChartNavigationComposition.js", [], function() {
    var b;
    (function(b) {
      b.compose = function(b) {
        b.navigation || (b.navigation = new m(b));
        return b
      };
      class m {
        constructor(b) {
          this.updates = [];
          this.chart = b
        }
        addUpdate(b) {
          this.chart.navigation.updates.push(b)
        }
        update(b, e) {
          this.updates.forEach(l => {
            l.call(this.chart, b, e)
          })
        }
      }
      b.Additions = m
    })(b || (b = {}));
    return b
  });
  r(b, "Extensions/Annotations/NavigationBindingsUtilities.js", [b["Core/Utilities.js"]], function(b) {
    const {
      defined: n,
      isNumber: m,
      pick: t
    } = b, e = {
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
      annotationsFieldsTypes: e,
      getAssignedAxis: function(b) {
        return b.filter(d => {
          var b = d.axis.getExtremes();
          const l = b.min;
          b = b.max;
          const e = t(d.axis.minPointOffset, 0);
          return m(l) && m(b) && d.value >= l - e && d.value <= b + e && !d.axis.options.isInternal
        })[0]
      },
      getFieldType: function(b, d) {
        b = e[b];
        d = typeof d;
        n(b) && (d = b);
        return {
          string: "text",
          number: "number",
          "boolean": "checkbox"
        } [d]
      }
    }
  });
  r(b, "Extensions/Annotations/NavigationBindingsDefaults.js", [b["Extensions/Annotations/NavigationBindingsUtilities.js"], b["Core/Utilities.js"]], function(b, n) {
    const {
      getAssignedAxis: m
    } = b, {
      isNumber: t,
      merge: e
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
            start: function(b) {
              var d =
                this.chart.pointer.getCoordinates(b);
              b = m(d.xAxis);
              d = m(d.yAxis);
              const l = this.chart.options.navigation;
              if (b && d) return this.chart.addAnnotation(e({
                langKey: "circle",
                type: "basicAnnotation",
                shapes: [{
                  type: "circle",
                  point: {
                    x: b.value,
                    y: d.value,
                    xAxis: b.axis.options.index,
                    yAxis: d.axis.options.index
                  },
                  r: 5
                }]
              }, l.annotationsOptions, l.bindings.circleAnnotation.annotationsOptions))
            },
            steps: [function(b, d) {
              var e = d.options.shapes;
              e = e && e[0] && e[0].point || {};
              if (t(e.xAxis) && t(e.yAxis)) {
                var l = this.chart.inverted;
                const d = this.chart.xAxis[e.xAxis].toPixels(e.x);
                e = this.chart.yAxis[e.yAxis].toPixels(e.y);
                l = Math.max(Math.sqrt(Math.pow(l ? e - b.chartX : d - b.chartX, 2) + Math.pow(l ? d - b.chartY : e - b.chartY, 2)), 5)
              }
              d.update({
                shapes: [{
                  r: l
                }]
              })
            }]
          },
          ellipseAnnotation: {
            className: "highcharts-ellipse-annotation",
            start: function(b) {
              var d = this.chart.pointer.getCoordinates(b);
              b = m(d.xAxis);
              d = m(d.yAxis);
              const l = this.chart.options.navigation;
              if (b && d) return this.chart.addAnnotation(e({
                langKey: "ellipse",
                type: "basicAnnotation",
                shapes: [{
                  type: "ellipse",
                  xAxis: b.axis.options.index,
                  yAxis: d.axis.options.index,
                  points: [{
                    x: b.value,
                    y: d.value
                  }, {
                    x: b.value,
                    y: d.value
                  }],
                  ry: 1
                }]
              }, l.annotationsOptions, l.bindings.ellipseAnnotation.annotationOptions))
            },
            steps: [function(b, d) {
              d = d.shapes[0];
              const e = d.getAbsolutePosition(d.points[1]);
              d.translatePoint(b.chartX - e.x, b.chartY - e.y, 1);
              d.redraw(!1)
            }, function(b, d) {
              d = d.shapes[0];
              var e = d.getAbsolutePosition(d.points[0]);
              const l = d.getAbsolutePosition(d.points[1]);
              b = d.getDistanceFromLine(e, l, b.chartX, b.chartY);
              e = d.getYAxis();
              b = Math.abs(e.toValue(0) - e.toValue(b));
              d.setYRadius(b);
              d.redraw(!1)
            }]
          },
          rectangleAnnotation: {
            className: "highcharts-rectangle-annotation",
            start: function(b) {
              b = this.chart.pointer.getCoordinates(b);
              var d = m(b.xAxis),
                l = m(b.yAxis);
              if (d && l) {
                b = d.value;
                var n = l.value;
                d = d.axis.options.index;
                l = l.axis.options.index;
                var t = this.chart.options.navigation;
                return this.chart.addAnnotation(e({
                    langKey: "rectangle",
                    type: "basicAnnotation",
                    shapes: [{
                      type: "path",
                      points: [{
                        xAxis: d,
                        yAxis: l,
                        x: b,
                        y: n
                      }, {
                        xAxis: d,
                        yAxis: l,
                        x: b,
                        y: n
                      }, {
                        xAxis: d,
                        yAxis: l,
                        x: b,
                        y: n
                      }, {
                        xAxis: d,
                        yAxis: l,
                        x: b,
                        y: n
                      }, {
                        command: "Z"
                      }]
                    }]
                  }, t.annotationsOptions,
                  t.bindings.rectangleAnnotation.annotationsOptions))
              }
            },
            steps: [function(b, e) {
              var d = e.options.shapes;
              d = d && d[0] && d[0].points || [];
              var l = this.chart.pointer.getCoordinates(b);
              b = m(l.xAxis);
              l = m(l.yAxis);
              b && l && (b = b.value, l = l.value, d[1].x = b, d[2].x = b, d[2].y = l, d[3].y = l, e.update({
                shapes: [{
                  points: d
                }]
              }))
            }]
          },
          labelAnnotation: {
            className: "highcharts-label-annotation",
            start: function(b) {
              var d = this.chart.pointer.getCoordinates(b);
              b = m(d.xAxis);
              d = m(d.yAxis);
              const l = this.chart.options.navigation;
              if (b && d) return this.chart.addAnnotation(e({
                langKey: "label",
                type: "basicAnnotation",
                labelOptions: {
                  format: "{y:.2f}"
                },
                labels: [{
                  point: {
                    xAxis: b.axis.options.index,
                    yAxis: d.axis.options.index,
                    x: b.value,
                    y: d.value
                  },
                  overflow: "none",
                  crop: !0
                }]
              }, l.annotationsOptions, l.bindings.labelAnnotation.annotationsOptions))
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
  r(b, "Extensions/Annotations/NavigationBindings.js", [b["Core/Chart/ChartNavigationComposition.js"], b["Core/Defaults.js"], b["Core/FormatUtilities.js"], b["Core/Globals.js"], b["Extensions/Annotations/NavigationBindingsDefaults.js"],
    b["Extensions/Annotations/NavigationBindingsUtilities.js"], b["Core/Utilities.js"]
  ], function(b, n, m, t, e, l, d) {
    function r(a, c) {
      const b = y.Element.prototype,
        g = b.matches || b.msMatchesSelector || b.webkitMatchesSelector;
      let h = null;
      if (b.closest) h = b.closest.call(a, c);
      else {
        do {
          if (g.call(a, c)) return a;
          a = a.parentElement || a.parentNode
        } while (null !== a && 1 === a.nodeType)
      }
      return h
    }

    function w() {
      this.chart.navigationBindings && this.chart.navigationBindings.deselectAnnotation()
    }

    function v() {
      this.navigationBindings && this.navigationBindings.destroy()
    }

    function q() {
      const a = this.options;
      a && a.navigation && a.navigation.bindings && (this.navigationBindings = new z(this, a.navigation), this.navigationBindings.initEvents(), this.navigationBindings.initUpdate())
    }

    function k() {
      const a = this.navigationBindings;
      if (this && a) {
        let c = !1;
        this.series.forEach(a => {
          !a.options.isInternal && a.visible && (c = !0)
        });
        if (this.navigationBindings && this.navigationBindings.container && this.navigationBindings.container[0]) {
          const b = this.navigationBindings.container[0];
          A(a.boundClassNames, (a,
            g) => {
            if (g = b.querySelectorAll("." + g))
              for (let b = 0; b < g.length; b++) {
                const h = g[b],
                  f = h.className;
                "normal" === a.noDataState ? -1 !== f.indexOf("highcharts-disabled-btn") && h.classList.remove("highcharts-disabled-btn") : c ? -1 !== f.indexOf("highcharts-disabled-btn") && h.classList.remove("highcharts-disabled-btn") : -1 === f.indexOf("highcharts-disabled-btn") && (h.className += " highcharts-disabled-btn")
              }
          })
        }
      }
    }

    function u() {
      this.deselectAnnotation()
    }

    function p() {
      this.selectedButtonElement = null
    }

    function f(a) {
      function c(a) {
        const c =
          this,
          g = c.chart.navigationBindings,
          h = g.activeAnnotation;
        b && b.call(c, a);
        h !== c ? (g.deselectAnnotation(), g.activeAnnotation = c, c.setControlPointsVisibility(!0), B(g, "showPopup", {
          annotation: c,
          formType: "annotation-toolbar",
          options: g.annotationToFields(c),
          onSubmit: function(a) {
            if ("remove" === a.actionType) g.activeAnnotation = !1, g.chart.removeAnnotation(c);
            else {
              const b = {};
              g.fieldsToOptions(a.fields, b);
              g.deselectAnnotation();
              a = b.typeOptions;
              "measure" === c.options.type && (a.crosshairY.enabled = 0 !== a.crosshairY.strokeWidth,
                a.crosshairX.enabled = 0 !== a.crosshairX.strokeWidth);
              c.update(b)
            }
          }
        })) : B(g, "closePopup");
        a.activeAnnotation = !0
      }
      const b = a.prototype.defaultOptions.events && a.prototype.defaultOptions.events.click;
      let g, h;
      E(!0, a.prototype.defaultOptions.events, {
        click: c,
        touchstart: function(a) {
          g = a.touches[0].clientX;
          h = a.touches[0].clientY
        },
        touchend: function(a) {
          g && 4 <= Math.sqrt(Math.pow(g - a.changedTouches[0].clientX, 2) + Math.pow(h - a.changedTouches[0].clientY, 2)) || c.call(this, a)
        }
      })
    }
    const {
      setOptions: a
    } = n, {
      format: c
    } = m, {
      doc: h,
      win: y
    } = t, {
      getFieldType: g
    } = l, {
      addEvent: x,
      attr: I,
      fireEvent: B,
      isArray: D,
      isFunction: J,
      isNumber: H,
      isObject: F,
      merge: E,
      objectEach: A,
      pick: G
    } = d, C = [];
    class z {
      static compose(c, b) {
        d.pushUnique(C, c) && (x(c, "remove", w), f(c), A(c.types, a => {
          f(a)
        }));
        d.pushUnique(C, b) && (x(b, "destroy", v), x(b, "load", q), x(b, "render", k));
        d.pushUnique(C, z) && (x(z, "closePopup", u), x(z, "deselectButton", p));
        d.pushUnique(C, a) && a(e)
      }
      constructor(a, c) {
        this.selectedButton = this.boundClassNames = void 0;
        this.chart = a;
        this.options = c;
        this.eventsToUnbind = [];
        this.container = this.chart.container.getElementsByClassName(this.options.bindingsClassName || "");
        this.container.length || (this.container = h.getElementsByClassName(this.options.bindingsClassName || ""))
      }
      initEvents() {
        const a = this,
          c = a.chart,
          b = a.container,
          g = a.options;
        a.boundClassNames = {};
        A(g.bindings || {}, c => {
          a.boundClassNames[c.className] = c
        });
        [].forEach.call(b, c => {
          a.eventsToUnbind.push(x(c, "click", b => {
            const g = a.getButtonEvents(c, b);
            g && !g.button.classList.contains("highcharts-disabled-btn") && a.bindingsButtonClick(g.button,
              g.events, b)
          }))
        });
        A(g.events || {}, (c, b) => {
          J(c) && a.eventsToUnbind.push(x(a, b, c, {
            passive: !1
          }))
        });
        a.eventsToUnbind.push(x(c.container, "click", function(b) {
          !c.cancelClick && c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop, {
            visiblePlotOnly: !0
          }) && a.bindingsChartClick(this, b)
        }));
        a.eventsToUnbind.push(x(c.container, t.isTouchDevice ? "touchmove" : "mousemove", function(c) {
          a.bindingsContainerMouseMove(this, c)
        }, t.isTouchDevice ? {
          passive: !1
        } : void 0))
      }
      initUpdate() {
        const a = this;
        b.compose(this.chart).navigation.addUpdate(c => {
          a.update(c)
        })
      }
      bindingsButtonClick(a, c, b) {
        const g = this.chart,
          h = g.renderer.boxWrapper;
        let f = !0;
        this.selectedButtonElement && (this.selectedButtonElement.classList === a.classList && (f = !1), B(this, "deselectButton", {
          button: this.selectedButtonElement
        }), this.nextEvent && (this.currentUserDetails && "annotations" === this.currentUserDetails.coll && g.removeAnnotation(this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1));
        f ? (this.selectedButton = c, this.selectedButtonElement = a, B(this, "selectButton", {
            button: a
          }),
          c.init && c.init.call(this, a, b), (c.start || c.steps) && g.renderer.boxWrapper.addClass("highcharts-draw-mode")) : (g.stockTools && g.stockTools.toggleButtonActiveClass(a), h.removeClass("highcharts-draw-mode"), this.mouseMoveEvent = this.nextEvent = !1, this.selectedButton = null)
      }
      bindingsChartClick(a, c) {
        a = this.chart;
        const b = this.activeAnnotation,
          g = this.selectedButton;
        a = a.renderer.boxWrapper;
        b && (b.cancelClick || c.activeAnnotation || !c.target.parentNode || r(c.target, ".highcharts-popup") ? b.cancelClick && setTimeout(() => {
          b.cancelClick = !1
        }, 0) : B(this, "closePopup"));
        g && g.start && (this.nextEvent ? (this.nextEvent(c, this.currentUserDetails), this.steps && (this.stepIndex++, g.steps[this.stepIndex] ? this.mouseMoveEvent = this.nextEvent = g.steps[this.stepIndex] : (B(this, "deselectButton", {
          button: this.selectedButtonElement
        }), a.removeClass("highcharts-draw-mode"), g.end && g.end.call(this, c, this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1, this.selectedButton = null))) : (this.currentUserDetails = g.start.call(this, c)) && g.steps ? (this.stepIndex =
          0, this.steps = !0, this.mouseMoveEvent = this.nextEvent = g.steps[this.stepIndex]) : (B(this, "deselectButton", {
          button: this.selectedButtonElement
        }), a.removeClass("highcharts-draw-mode"), this.steps = !1, this.selectedButton = null, g.end && g.end.call(this, c, this.currentUserDetails)))
      }
      bindingsContainerMouseMove(a, c) {
        this.mouseMoveEvent && this.mouseMoveEvent(c, this.currentUserDetails)
      }
      fieldsToOptions(a, c) {
        A(a, (a, b) => {
          const g = parseFloat(a),
            h = b.split("."),
            f = h.length - 1;
          !H(g) || a.match(/px/g) || b.match(/format/g) || (a = g);
          if ("undefined" !==
            a) {
            let b = c;
            h.forEach((c, g) => {
              const d = G(h[g + 1], "");
              f === g ? b[c] = a : (b[c] || (b[c] = d.match(/\d/g) ? [] : {}), b = b[c])
            })
          }
        });
        return c
      }
      deselectAnnotation() {
        this.activeAnnotation && (this.activeAnnotation.setControlPointsVisibility(!1), this.activeAnnotation = !1)
      }
      annotationToFields(a) {
        function b(h, f, e, k, x) {
          let q;
          e && h && -1 === y.indexOf(f) && (0 <= (e.indexOf && e.indexOf(f)) || e[f] || !0 === e) && (D(h) ? (k[f] = [], h.forEach((a, c) => {
            F(a) ? (k[f][c] = {}, A(a, (a, g) => {
              b(a, g, d[f], k[f][c], f)
            })) : b(a, 0, d[f], k[f], f)
          })) : F(h) ? (q = {}, D(k) ? (k.push(q),
            q[f] = {}, q = q[f]) : k[f] = q, A(h, (a, c) => {
            b(a, c, 0 === f ? e : d[f], q, f)
          })) : "format" === f ? k[f] = [c(h, a.labels[0].points[0]).toString(), "text"] : D(k) ? k.push([h, g(x, h)]) : k[f] = [h, g(f, h)])
        }
        const h = a.options,
          f = z.annotationsEditable,
          d = f.nestedOptions,
          e = G(h.type, h.shapes && h.shapes[0] && h.shapes[0].type, h.labels && h.labels[0] && h.labels[0].type, "label"),
          y = z.annotationsNonEditable[h.langKey] || [],
          k = {
            langKey: h.langKey,
            type: e
          };
        A(h, (a, c) => {
          "typeOptions" === c ? (k[c] = {}, A(h[c], (a, g) => {
            b(a, g, d, k[c], g)
          })) : b(a, c, f[e], k, c)
        });
        return k
      }
      getClickedClassNames(a,
        c) {
        let b = c.target;
        c = [];
        let g;
        for (; b && b.tagName && ((g = I(b, "class")) && (c = c.concat(g.split(" ").map(a => [a, b]))), b = b.parentNode, b !== a););
        return c
      }
      getButtonEvents(a, c) {
        const b = this;
        let g;
        this.getClickedClassNames(a, c).forEach(a => {
          b.boundClassNames[a[0]] && !g && (g = {
            events: b.boundClassNames[a[0]],
            button: a[1]
          })
        });
        return g
      }
      update(a) {
        this.options = E(!0, this.options, a);
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
    z.annotationsEditable = {
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
    z.annotationsNonEditable = {
      rectangle: ["crosshairX", "crosshairY", "labelOptions"],
      ellipse: ["labelOptions"],
      circle: ["labelOptions"]
    };
    "";
    return z
  });
  r(b, "Stock/StockTools/StockToolsUtilities.js", [b["Core/Defaults.js"], b["Extensions/Annotations/NavigationBindingsUtilities.js"],
    b["Core/Series/Series.js"], b["Core/Utilities.js"]
  ], function(b, n, m, t) {
    function e(b, a) {
      b = a.pointer.getCoordinates(b);
      let c, h, f = Number.MAX_VALUE,
        g;
      a.navigationBindings && (c = d(b.xAxis), h = d(b.yAxis));
      if (c && h) {
        var e = c.value;
        a = h.value;
        h.axis.series.forEach(a => {
          a.points && a.points.forEach(a => {
            a && f > Math.abs(a.x - e) && (f = Math.abs(a.x - e), g = a)
          })
        });
        if (g && g.x && g.y) return {
          x: g.x,
          y: g.y,
          below: a < g.y,
          series: g.series,
          xAxis: g.series.xAxis.options.index || 0,
          yAxis: g.series.yAxis.options.index || 0
        }
      }
    }
    const {
      getOptions: l
    } = b, {
      getAssignedAxis: d,
      getFieldType: r
    } = n, {
      defined: w,
      fireEvent: v,
      isNumber: q,
      uniqueKey: k
    } = t, u = "apo ad aroon aroonoscillator atr ao cci chaikin cmf cmo disparityindex dmi dpo linearRegressionAngle linearRegressionIntercept linearRegressionSlope klinger macd mfi momentum natr obv ppo roc rsi slowstochastic stochastic trix williamsr".split(" "), p = "ad cmf klinger mfi obv vbp vwap".split(" ");
    return {
      indicatorsWithAxes: u,
      indicatorsWithVolume: p,
      addFlagFromForm: function(b) {
        return function(a) {
          const c = this,
            h = c.chart,
            f = h.stockTools;
          if (a = e(a, h)) {
            var g = {
              type: "flags",
              onSeries: a.series.id,
              shape: b,
              data: [{
                x: a.x,
                y: a.y
              }],
              xAxis: a.xAxis,
              yAxis: a.yAxis,
              point: {
                events: {
                  click: function() {
                    const a = this,
                      b = a.options;
                    v(c, "showPopup", {
                      point: a,
                      formType: "annotation-toolbar",
                      options: {
                        langKey: "flags",
                        type: "flags",
                        title: [b.title, r("title", b.title)],
                        name: [b.name, r("name", b.name)]
                      },
                      onSubmit: function(b) {
                        "remove" === b.actionType ? a.remove() : a.update(c.fieldsToOptions(b.fields, {}))
                      }
                    })
                  }
                }
              }
            };
            f && f.guiEnabled || h.addSeries(g);
            v(c, "showPopup", {
              formType: "flag",
              options: {
                langKey: "flags",
                type: "flags",
                title: ["A", r("label", "A")],
                name: ["Flag A", r("label", "Flag A")]
              },
              onSubmit: function(a) {
                c.fieldsToOptions(a.fields, g.data[0]);
                h.addSeries(g)
              }
            })
          }
        }
      },
      attractToPoint: e,
      getAssignedAxis: d,
      isNotNavigatorYAxis: function(b) {
        return "highcharts-navigator-yaxis" !== b.userOptions.className
      },
      isPriceIndicatorEnabled: function(b) {
        return b.some(a => a.lastVisiblePrice || a.lastPrice)
      },
      manageIndicators: function(b) {
        const a = this.chart;
        var c = {
          linkedTo: b.linkedTo,
          type: b.type
        };
        let h;
        if ("edit" === b.actionType) this.fieldsToOptions(b.fields,
          c), (b = a.get(b.seriesId)) && b.update(c, !1);
        else if ("remove" === b.actionType) {
          if (b = a.get(b.seriesId)) {
            var f = b.yAxis;
            b.linkedSeries && b.linkedSeries.forEach(a => {
              a.remove(!1)
            });
            b.remove(!1);
            0 <= u.indexOf(b.type) && (c = {
              height: f.options.height,
              top: f.options.top
            }, f.remove(!1), this.resizeYAxes(c))
          }
        } else c.id = k(), this.fieldsToOptions(b.fields, c), f = a.get(c.linkedTo), h = l().plotOptions, "undefined" !== typeof f && f instanceof m && "sum" === f.getDGApproximation() && !w(h && h[c.type] && h.dataGrouping && h.dataGrouping.approximation) &&
          (c.dataGrouping = {
            approximation: "sum"
          }), 0 <= u.indexOf(b.type) ? (f = a.addAxis({
            id: k(),
            offset: 0,
            opposite: !0,
            title: {
              text: ""
            },
            tickPixelInterval: 40,
            showLastLabel: !1,
            labels: {
              align: "left",
              y: -2
            }
          }, !1, !1), c.yAxis = f.options.id, this.resizeYAxes()) : c.yAxis = a.get(b.linkedTo).options.yAxis, 0 <= p.indexOf(b.type) && (c.params.volumeSeriesID = a.series.filter(function(a) {
            return "column" === a.options.type
          })[0].options.id), a.addSeries(c, !1);
        v(this, "deselectButton", {
          button: this.selectedButtonElement
        });
        a.redraw()
      },
      updateHeight: function(b,
        a) {
        const c = a.options.typeOptions,
          h = q(c.yAxis) && this.chart.yAxis[c.yAxis];
        h && c.points && a.update({
          typeOptions: {
            height: h.toValue(b[h.horiz ? "chartX" : "chartY"]) - (c.points[1].y || 0)
          }
        })
      },
      updateNthPoint: function(b) {
        return function(a, c) {
          const h = c.options.typeOptions,
            f = q(h.xAxis) && this.chart.xAxis[h.xAxis],
            g = q(h.yAxis) && this.chart.yAxis[h.yAxis];
          f && g && (h.points.forEach((c, h) => {
            h >= b && (c.x = f.toValue(a[f.horiz ? "chartX" : "chartY"]), c.y = g.toValue(a[g.horiz ? "chartX" : "chartY"]))
          }), c.update({
            typeOptions: {
              points: h.points
            }
          }))
        }
      },
      updateRectSize: function(b, a) {
        const c = a.chart;
        var h = a.options.typeOptions,
          f = q(h.xAxis) && c.xAxis[h.xAxis],
          g = q(h.yAxis) && c.yAxis[h.yAxis];
        f && g && (f = f.toValue(b[f.horiz ? "chartX" : "chartY"]), b = g.toValue(b[g.horiz ? "chartX" : "chartY"]), g = f - h.point.x, h = h.point.y - b, a.update({
          typeOptions: {
            background: {
              width: c.inverted ? h : g,
              height: c.inverted ? g : h
            }
          }
        }))
      }
    }
  });
  r(b, "Stock/StockTools/StockToolsBindings.js", [b["Core/Globals.js"], b["Extensions/Annotations/NavigationBindingsUtilities.js"], b["Stock/StockTools/StockToolsUtilities.js"],
    b["Core/Utilities.js"]
  ], function(b, n, m, t) {
    const {
      getAssignedAxis: e
    } = n, {
      addFlagFromForm: l,
      attractToPoint: d,
      isNotNavigatorYAxis: r,
      isPriceIndicatorEnabled: w,
      manageIndicators: v,
      updateHeight: q,
      updateNthPoint: k,
      updateRectSize: u
    } = m, {
      fireEvent: p,
      merge: f
    } = t;
    return {
      segment: {
        className: "highcharts-segment",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "segment",
              type: "crookedLine",
              typeOptions: {
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                points: [{
                  x: a.value,
                  y: c.value
                }, {
                  x: a.value,
                  y: c.value
                }]
              }
            }, b.annotationsOptions, b.bindings.segment.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1)]
      },
      arrowSegment: {
        className: "highcharts-arrow-segment",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "arrowSegment",
              type: "crookedLine",
              typeOptions: {
                line: {
                  markerEnd: "arrow"
                },
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                points: [{
                  x: a.value,
                  y: c.value
                }, {
                  x: a.value,
                  y: c.value
                }]
              }
            }, b.annotationsOptions, b.bindings.arrowSegment.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1)]
      },
      ray: {
        className: "highcharts-ray",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
                langKey: "ray",
                type: "infinityLine",
                typeOptions: {
                  type: "ray",
                  xAxis: a.axis.options.index,
                  yAxis: c.axis.options.index,
                  points: [{
                    x: a.value,
                    y: c.value
                  }, {
                    x: a.value,
                    y: c.value
                  }]
                }
              },
              b.annotationsOptions, b.bindings.ray.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1)]
      },
      arrowRay: {
        className: "highcharts-arrow-ray",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
                langKey: "arrowRay",
                type: "infinityLine",
                typeOptions: {
                  type: "ray",
                  line: {
                    markerEnd: "arrow"
                  },
                  xAxis: a.axis.options.index,
                  yAxis: c.axis.options.index,
                  points: [{
                    x: a.value,
                    y: c.value
                  }, {
                    x: a.value,
                    y: c.value
                  }]
                }
              }, b.annotationsOptions,
              b.bindings.arrowRay.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1)]
      },
      infinityLine: {
        className: "highcharts-infinity-line",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "infinityLine",
              type: "infinityLine",
              typeOptions: {
                type: "line",
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                points: [{
                  x: a.value,
                  y: c.value
                }, {
                  x: a.value,
                  y: c.value
                }]
              }
            }, b.annotationsOptions, b.bindings.infinityLine.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1)]
      },
      arrowInfinityLine: {
        className: "highcharts-arrow-infinity-line",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "arrowInfinityLine",
              type: "infinityLine",
              typeOptions: {
                type: "line",
                line: {
                  markerEnd: "arrow"
                },
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                points: [{
                  x: a.value,
                  y: c.value
                }, {
                  x: a.value,
                  y: c.value
                }]
              }
            }, b.annotationsOptions, b.bindings.arrowInfinityLine.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1)]
      },
      horizontalLine: {
        className: "highcharts-horizontal-line",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "horizontalLine",
              type: "infinityLine",
              draggable: "y",
              typeOptions: {
                type: "horizontalLine",
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                points: [{
                  x: a.value,
                  y: c.value
                }]
              }
            }, b.annotationsOptions, b.bindings.horizontalLine.annotationsOptions);
            this.chart.addAnnotation(a)
          }
        }
      },
      verticalLine: {
        className: "highcharts-vertical-line",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "verticalLine",
              type: "infinityLine",
              draggable: "x",
              typeOptions: {
                type: "verticalLine",
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                points: [{
                  x: a.value,
                  y: c.value
                }]
              }
            }, b.annotationsOptions, b.bindings.verticalLine.annotationsOptions);
            this.chart.addAnnotation(a)
          }
        }
      },
      crooked3: {
        className: "highcharts-crooked3",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = a.value,
              d = c.value,
              g = this.chart.options.navigation;
            a = f({
              langKey: "crooked3",
              type: "crookedLine",
              typeOptions: {
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                points: [{
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }]
              }
            }, g.annotationsOptions, g.bindings.crooked3.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1), k(2)]
      },
      crooked5: {
        className: "highcharts-crooked5",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = a.value,
              d = c.value,
              g = this.chart.options.navigation;
            a = f({
              langKey: "crooked5",
              type: "crookedLine",
              typeOptions: {
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                points: [{
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }]
              }
            }, g.annotationsOptions, g.bindings.crooked5.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1), k(2), k(3), k(4)]
      },
      elliott3: {
        className: "highcharts-elliott3",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = a.value,
              d = c.value,
              g = this.chart.options.navigation;
            a = f({
              langKey: "elliott3",
              type: "elliottWave",
              typeOptions: {
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                points: [{
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }]
              },
              labelOptions: {
                style: {
                  color: "#666666"
                }
              }
            }, g.annotationsOptions, g.bindings.elliott3.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1), k(2), k(3)]
      },
      elliott5: {
        className: "highcharts-elliott5",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = a.value,
              d = c.value,
              g = this.chart.options.navigation;
            a = f({
              langKey: "elliott5",
              type: "elliottWave",
              typeOptions: {
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                points: [{
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }, {
                  x: b,
                  y: d
                }]
              },
              labelOptions: {
                style: {
                  color: "#666666"
                }
              }
            }, g.annotationsOptions, g.bindings.elliott5.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1), k(2), k(3), k(4), k(5)]
      },
      measureX: {
        className: "highcharts-measure-x",
        start: function(a) {
          var c =
            this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "measure",
              type: "measure",
              typeOptions: {
                selectType: "x",
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                point: {
                  x: a.value,
                  y: c.value
                },
                crosshairX: {
                  strokeWidth: 1,
                  stroke: "#000000"
                },
                crosshairY: {
                  enabled: !1,
                  strokeWidth: 0,
                  stroke: "#000000"
                },
                background: {
                  width: 0,
                  height: 0,
                  strokeWidth: 0,
                  stroke: "#ffffff"
                }
              },
              labelOptions: {
                style: {
                  color: "#666666"
                }
              }
            }, b.annotationsOptions, b.bindings.measureX.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [u]
      },
      measureY: {
        className: "highcharts-measure-y",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "measure",
              type: "measure",
              typeOptions: {
                selectType: "y",
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                point: {
                  x: a.value,
                  y: c.value
                },
                crosshairX: {
                  enabled: !1,
                  strokeWidth: 0,
                  stroke: "#000000"
                },
                crosshairY: {
                  strokeWidth: 1,
                  stroke: "#000000"
                },
                background: {
                  width: 0,
                  height: 0,
                  strokeWidth: 0,
                  stroke: "#ffffff"
                }
              },
              labelOptions: {
                style: {
                  color: "#666666"
                }
              }
            }, b.annotationsOptions, b.bindings.measureY.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [u]
      },
      measureXY: {
        className: "highcharts-measure-xy",
        start: function(a) {
          var c = this.chart.pointer.getCoordinates(a);
          a = e(c.xAxis);
          c = e(c.yAxis);
          if (a && c) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "measure",
              type: "measure",
              typeOptions: {
                selectType: "xy",
                xAxis: a.axis.options.index,
                yAxis: c.axis.options.index,
                point: {
                  x: a.value,
                  y: c.value
                },
                background: {
                  width: 0,
                  height: 0,
                  strokeWidth: 10
                },
                crosshairX: {
                  strokeWidth: 1,
                  stroke: "#000000"
                },
                crosshairY: {
                  strokeWidth: 1,
                  stroke: "#000000"
                }
              },
              labelOptions: {
                style: {
                  color: "#666666"
                }
              }
            }, b.annotationsOptions, b.bindings.measureXY.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [u]
      },
      fibonacci: {
        className: "highcharts-fibonacci",
        start: function(a) {
          var b = this.chart.pointer.getCoordinates(a);
          a = e(b.xAxis);
          b = e(b.yAxis);
          if (a && b) {
            var d = a.value,
              k = b.value,
              g = this.chart.options.navigation;
            a = f({
              langKey: "fibonacci",
              type: "fibonacci",
              typeOptions: {
                xAxis: a.axis.options.index,
                yAxis: b.axis.options.index,
                points: [{
                  x: d,
                  y: k
                }, {
                  x: d,
                  y: k
                }]
              },
              labelOptions: {
                style: {
                  color: "#666666"
                }
              }
            }, g.annotationsOptions, g.bindings.fibonacci.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1), q]
      },
      parallelChannel: {
        className: "highcharts-parallel-channel",
        start: function(a) {
          var b = this.chart.pointer.getCoordinates(a);
          a = e(b.xAxis);
          b = e(b.yAxis);
          if (a && b) {
            var d = a.value,
              k = b.value,
              g = this.chart.options.navigation;
            a = f({
              langKey: "parallelChannel",
              type: "tunnel",
              typeOptions: {
                xAxis: a.axis.options.index,
                yAxis: b.axis.options.index,
                points: [{
                  x: d,
                  y: k
                }, {
                  x: d,
                  y: k
                }]
              }
            }, g.annotationsOptions, g.bindings.parallelChannel.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1), q]
      },
      pitchfork: {
        className: "highcharts-pitchfork",
        start: function(a) {
          var b = this.chart.pointer.getCoordinates(a);
          a = e(b.xAxis);
          b = e(b.yAxis);
          if (a && b) {
            var d = a.value,
              k = b.value,
              g = this.chart.options.navigation;
            a = f({
              langKey: "pitchfork",
              type: "pitchfork",
              typeOptions: {
                xAxis: a.axis.options.index,
                yAxis: b.axis.options.index,
                points: [{
                  x: a.value,
                  y: b.value,
                  controlPoint: {
                    style: {
                      fill: "#f21313"
                    }
                  }
                }, {
                  x: d,
                  y: k
                }, {
                  x: d,
                  y: k
                }],
                innerBackground: {
                  fill: "rgba(100, 170, 255, 0.8)"
                }
              },
              shapeOptions: {
                strokeWidth: 2
              }
            }, g.annotationsOptions, g.bindings.pitchfork.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [k(1), k(2)]
      },
      verticalCounter: {
        className: "highcharts-vertical-counter",
        start: function(a) {
          if (a = d(a, this.chart)) {
            this.verticalCounter = this.verticalCounter || 0;
            var b = this.chart.options.navigation;
            a = f({
              langKey: "verticalCounter",
              type: "verticalLine",
              typeOptions: {
                point: {
                  x: a.x,
                  y: a.y,
                  xAxis: a.xAxis,
                  yAxis: a.yAxis
                },
                label: {
                  offset: a.below ? 40 : -40,
                  text: this.verticalCounter.toString()
                }
              },
              labelOptions: {
                style: {
                  color: "#666666",
                  fontSize: "0.7em"
                }
              },
              shapeOptions: {
                stroke: "rgba(0, 0, 0, 0.75)",
                strokeWidth: 1
              }
            }, b.annotationsOptions, b.bindings.verticalCounter.annotationsOptions);
            a = this.chart.addAnnotation(a);
            this.verticalCounter++;
            a.options.events.click.call(a, {})
          }
        }
      },
      timeCycles: {
        className: "highcharts-time-cycles",
        start: function(a) {
          if (a = d(a, this.chart)) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "timeCycles",
              type: "timeCycles",
              typeOptions: {
                xAxis: a.xAxis,
                yAxis: a.yAxis,
                points: [{
                  x: a.x
                }, {
                  x: a.x
                }],
                line: {
                  stroke: "rgba(0, 0, 0, 0.75)",
                  fill: "transparent",
                  strokeWidth: 2
                }
              }
            }, b.annotationsOptions, b.bindings.timeCycles.annotationsOptions);
            a = this.chart.addAnnotation(a);
            a.options.events.click.call(a, {});
            return a
          }
        },
        steps: [k(1)]
      },
      verticalLabel: {
        className: "highcharts-vertical-label",
        start: function(a) {
          if (a = d(a, this.chart)) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "verticalLabel",
              type: "verticalLine",
              typeOptions: {
                point: {
                  x: a.x,
                  y: a.y,
                  xAxis: a.xAxis,
                  yAxis: a.yAxis
                },
                label: {
                  offset: a.below ? 40 : -40
                }
              },
              labelOptions: {
                style: {
                  color: "#666666",
                  fontSize: "0.7em"
                }
              },
              shapeOptions: {
                stroke: "rgba(0, 0, 0, 0.75)",
                strokeWidth: 1
              }
            }, b.annotationsOptions, b.bindings.verticalLabel.annotationsOptions);
            a = this.chart.addAnnotation(a);
            a.options.events.click.call(a, {})
          }
        }
      },
      verticalArrow: {
        className: "highcharts-vertical-arrow",
        start: function(a) {
          if (a = d(a, this.chart)) {
            var b = this.chart.options.navigation;
            a = f({
              langKey: "verticalArrow",
              type: "verticalLine",
              typeOptions: {
                point: {
                  x: a.x,
                  y: a.y,
                  xAxis: a.xAxis,
                  yAxis: a.yAxis
                },
                label: {
                  offset: a.below ? 40 : -40,
                  format: " "
                },
                connector: {
                  fill: "none",
                  stroke: a.below ? "#f21313" : "#06b535"
                }
              },
              shapeOptions: {
                stroke: "rgba(0, 0, 0, 0.75)",
                strokeWidth: 1
              }
            }, b.annotationsOptions, b.bindings.verticalArrow.annotationsOptions);
            a = this.chart.addAnnotation(a);
            a.options.events.click.call(a, {})
          }
        }
      },
      fibonacciTimeZones: {
        className: "highcharts-fibonacci-time-zones",
        start: function(a) {
          var b = this.chart.pointer.getCoordinates(a);
          a = e(b.xAxis);
          b = e(b.yAxis);
          if (a && b) {
            var d = this.chart.options.navigation;
            a = f({
              type: "fibonacciTimeZones",
              langKey: "fibonacciTimeZones",
              typeOptions: {
                xAxis: a.axis.options.index,
                yAxis: b.axis.options.index,
                points: [{
                  x: a.value
                }]
              }
            }, d.annotationsOptions, d.bindings.fibonacciTimeZones.annotationsOptions);
            return this.chart.addAnnotation(a)
          }
        },
        steps: [function(a, b) {
          var c = b.options.typeOptions.points;
          c = c && c[0].x;
          var d = this.chart.pointer.getCoordinates(a);
          a = e(d.xAxis);
          d = e(d.yAxis);
          b.update({
            typeOptions: {
              xAxis: a.axis.options.index,
              yAxis: d.axis.options.index,
              points: [{
                x: c
              }, {
                x: a.value
              }]
            }
          })
        }]
      },
      flagCirclepin: {
        className: "highcharts-flag-circlepin",
        start: l("circlepin")
      },
      flagDiamondpin: {
        className: "highcharts-flag-diamondpin",
        start: l("flag")
      },
      flagSquarepin: {
        className: "highcharts-flag-squarepin",
        start: l("squarepin")
      },
      flagSimplepin: {
        className: "highcharts-flag-simplepin",
        start: l("nopin")
      },
      zoomX: {
        className: "highcharts-zoom-x",
        init: function(a) {
          this.chart.update({
            chart: {
              zooming: {
                type: "x"
              }
            }
          });
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      zoomY: {
        className: "highcharts-zoom-y",
        init: function(a) {
          this.chart.update({
            chart: {
              zooming: {
                type: "y"
              }
            }
          });
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      zoomXY: {
        className: "highcharts-zoom-xy",
        init: function(a) {
          this.chart.update({
            chart: {
              zooming: {
                type: "xy"
              }
            }
          });
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      seriesTypeLine: {
        className: "highcharts-series-type-line",
        init: function(a) {
          this.chart.series[0].update({
            type: "line",
            useOhlcData: !0
          });
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      seriesTypeOhlc: {
        className: "highcharts-series-type-ohlc",
        init: function(a) {
          this.chart.series[0].update({
            type: "ohlc"
          });
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      seriesTypeCandlestick: {
        className: "highcharts-series-type-candlestick",
        init: function(a) {
          this.chart.series[0].update({
            type: "candlestick"
          });
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      seriesTypeHeikinAshi: {
        className: "highcharts-series-type-heikinashi",
        init: function(a) {
          this.chart.series[0].update({
            type: "heikinashi"
          });
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      seriesTypeHLC: {
        className: "highcharts-series-type-hlc",
        init: function(a) {
          this.chart.series[0].update({
            type: "hlc",
            useOhlcData: !0
          });
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      seriesTypeHollowCandlestick: {
        className: "highcharts-series-type-hollowcandlestick",
        init: function(a) {
          this.chart.series[0].update({
            type: "hollowcandlestick"
          });
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      fullScreen: {
        className: "highcharts-full-screen",
        noDataState: "normal",
        init: function(a) {
          this.chart.fullscreen && this.chart.fullscreen.toggle();
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      currentPriceIndicator: {
        className: "highcharts-current-price-indicator",
        init: function(a) {
          const b =
            this.chart,
            d = b.series,
            f = b.stockTools,
            g = w(b.series);
          f && f.guiEnabled && (d.forEach(function(a) {
            a.update({
              lastPrice: {
                enabled: !g
              },
              lastVisiblePrice: {
                enabled: !g,
                label: {
                  enabled: !0
                }
              }
            }, !1)
          }), b.redraw());
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      indicators: {
        className: "highcharts-indicators",
        init: function() {
          const a = this;
          p(a, "showPopup", {
            formType: "indicators",
            options: {},
            onSubmit: function(b) {
              v.call(a, b)
            }
          })
        }
      },
      toggleAnnotations: {
        className: "highcharts-toggle-annotations",
        init: function(a) {
          const b = this.chart,
            d = b.stockTools,
            f = d.getIconsURL();
          this.toggledAnnotations = !this.toggledAnnotations;
          (b.annotations || []).forEach(function(a) {
            a.setVisibility(!this.toggledAnnotations)
          }, this);
          d && d.guiEnabled && (a.firstChild.style["background-image"] = this.toggledAnnotations ? 'url("' + f + 'annotations-hidden.svg")' : 'url("' + f + 'annotations-visible.svg")');
          p(this, "deselectButton", {
            button: a
          })
        }
      },
      saveChart: {
        className: "highcharts-save-chart",
        noDataState: "normal",
        init: function(a) {
          const c = this.chart,
            d = [],
            f = [],
            g = [],
            e = [];
          c.annotations.forEach(function(a,
            b) {
            d[b] = a.userOptions
          });
          c.series.forEach(function(a) {
            a.is("sma") ? f.push(a.userOptions) : "flags" === a.type && g.push(a.userOptions)
          });
          c.yAxis.forEach(function(a) {
            r(a) && e.push(a.options)
          });
          b.win.localStorage.setItem("highcharts-chart", JSON.stringify({
            annotations: d,
            indicators: f,
            flags: g,
            yAxes: e
          }));
          p(this, "deselectButton", {
            button: a
          })
        }
      }
    }
  });
  r(b, "Stock/StockTools/StockToolsDefaults.js", [], function() {
    return {
      lang: {
        stockTools: {
          gui: {
            simpleShapes: "Simple shapes",
            lines: "Lines",
            crookedLines: "Crooked lines",
            measure: "Measure",
            advanced: "Advanced",
            toggleAnnotations: "Toggle annotations",
            verticalLabels: "Vertical labels",
            flags: "Flags",
            zoomChange: "Zoom change",
            typeChange: "Type change",
            saveChart: "Save chart",
            indicators: "Indicators",
            currentPriceIndicator: "Current Price Indicators",
            zoomX: "Zoom X",
            zoomY: "Zoom Y",
            zoomXY: "Zooom XY",
            fullScreen: "Fullscreen",
            typeOHLC: "OHLC",
            typeLine: "Line",
            typeCandlestick: "Candlestick",
            typeHLC: "HLC",
            typeHollowCandlestick: "Hollow Candlestick",
            typeHeikinAshi: "Heikin Ashi",
            circle: "Circle",
            ellipse: "Ellipse",
            label: "Label",
            rectangle: "Rectangle",
            flagCirclepin: "Flag circle",
            flagDiamondpin: "Flag diamond",
            flagSquarepin: "Flag square",
            flagSimplepin: "Flag simple",
            measureXY: "Measure XY",
            measureX: "Measure X",
            measureY: "Measure Y",
            segment: "Segment",
            arrowSegment: "Arrow segment",
            ray: "Ray",
            arrowRay: "Arrow ray",
            line: "Line",
            arrowInfinityLine: "Arrow line",
            horizontalLine: "Horizontal line",
            verticalLine: "Vertical line",
            infinityLine: "Infinity line",
            crooked3: "Crooked 3 line",
            crooked5: "Crooked 5 line",
            elliott3: "Elliott 3 line",
            elliott5: "Elliott 5 line",
            verticalCounter: "Vertical counter",
            verticalLabel: "Vertical label",
            verticalArrow: "Vertical arrow",
            fibonacci: "Fibonacci",
            fibonacciTimeZones: "Fibonacci Time Zones",
            pitchfork: "Pitchfork",
            parallelChannel: "Parallel channel",
            timeCycles: "Time Cycles"
          }
        },
        navigation: {
          popup: {
            circle: "Circle",
            ellipse: "Ellipse",
            rectangle: "Rectangle",
            label: "Label",
            segment: "Segment",
            arrowSegment: "Arrow segment",
            ray: "Ray",
            arrowRay: "Arrow ray",
            line: "Line",
            arrowInfinityLine: "Arrow line",
            horizontalLine: "Horizontal line",
            verticalLine: "Vertical line",
            crooked3: "Crooked 3 line",
            crooked5: "Crooked 5 line",
            elliott3: "Elliott 3 line",
            elliott5: "Elliott 5 line",
            verticalCounter: "Vertical counter",
            verticalLabel: "Vertical label",
            verticalArrow: "Vertical arrow",
            fibonacci: "Fibonacci",
            fibonacciTimeZones: "Fibonacci Time Zones",
            pitchfork: "Pitchfork",
            parallelChannel: "Parallel channel",
            infinityLine: "Infinity line",
            measure: "Measure",
            measureXY: "Measure XY",
            measureX: "Measure X",
            measureY: "Measure Y",
            timeCycles: "Time Cycles",
            flags: "Flags",
            addButton: "Add",
            saveButton: "Save",
            editButton: "Edit",
            removeButton: "Remove",
            series: "Series",
            volume: "Volume",
            connector: "Connector",
            innerBackground: "Inner background",
            outerBackground: "Outer background",
            crosshairX: "Crosshair X",
            crosshairY: "Crosshair Y",
            tunnel: "Tunnel",
            background: "Background",
            noFilterMatch: "No match",
            searchIndicators: "Search Indicators",
            clearFilter: "\u2715 clear filter",
            index: "Index",
            period: "Period",
            periods: "Periods",
            standardDeviation: "Standard deviation",
            periodTenkan: "Tenkan period",
            periodSenkouSpanB: "Senkou Span B period",
            periodATR: "ATR period",
            multiplierATR: "ATR multiplier",
            shortPeriod: "Short period",
            longPeriod: "Long period",
            signalPeriod: "Signal period",
            decimals: "Decimals",
            algorithm: "Algorithm",
            topBand: "Top band",
            bottomBand: "Bottom band",
            initialAccelerationFactor: "Initial acceleration factor",
            maxAccelerationFactor: "Max acceleration factor",
            increment: "Increment",
            multiplier: "Multiplier",
            ranges: "Ranges",
            highIndex: "High index",
            lowIndex: "Low index",
            deviation: "Deviation",
            xAxisUnit: "x-axis unit",
            factor: "Factor",
            fastAvgPeriod: "Fast average period",
            slowAvgPeriod: "Slow average period",
            average: "Average",
            indicatorAliases: {
              abands: ["Acceleration Bands"],
              bb: ["Bollinger Bands"],
              dema: ["Double Exponential Moving Average"],
              ema: ["Exponential Moving Average"],
              ikh: ["Ichimoku Kinko Hyo"],
              keltnerchannels: ["Keltner Channels"],
              linearRegression: ["Linear Regression"],
              pivotpoints: ["Pivot Points"],
              pc: ["Price Channel"],
              priceenvelopes: ["Price Envelopes"],
              psar: ["Parabolic SAR"],
              sma: ["Simple Moving Average"],
              supertrend: ["Super Trend"],
              tema: ["Triple Exponential Moving Average"],
              vbp: ["Volume by Price"],
              vwap: ["Volume Weighted Moving Average"],
              wma: ["Weighted Moving Average"],
              zigzag: ["Zig Zag"],
              apo: ["Absolute price indicator"],
              ad: ["Accumulation/Distribution"],
              aroon: ["Aroon"],
              aroonoscillator: ["Aroon oscillator"],
              atr: ["Average True Range"],
              ao: ["Awesome oscillator"],
              cci: ["Commodity Channel Index"],
              chaikin: ["Chaikin"],
              cmf: ["Chaikin Money Flow"],
              cmo: ["Chande Momentum Oscillator"],
              disparityindex: ["Disparity Index"],
              dmi: ["Directional Movement Index"],
              dpo: ["Detrended price oscillator"],
              klinger: ["Klinger Oscillator"],
              linearRegressionAngle: ["Linear Regression Angle"],
              linearRegressionIntercept: ["Linear Regression Intercept"],
              linearRegressionSlope: ["Linear Regression Slope"],
              macd: ["Moving Average Convergence Divergence"],
              mfi: ["Money Flow Index"],
              momentum: ["Momentum"],
              natr: ["Normalized Average True Range"],
              obv: ["On-Balance Volume"],
              ppo: ["Percentage Price oscillator"],
              roc: ["Rate of Change"],
              rsi: ["Relative Strength Index"],
              slowstochastic: ["Slow Stochastic"],
              stochastic: ["Stochastic"],
              trix: ["TRIX"],
              williamsr: ["Williams %R"]
            }
          }
        }
      },
      stockTools: {
        gui: {
          enabled: !0,
          className: "highcharts-bindings-wrapper",
          toolbarClassName: "stocktools-toolbar",
          buttons: "indicators separator simpleShapes lines crookedLines measure advanced toggleAnnotations separator verticalLabels flags separator zoomChange fullScreen typeChange separator currentPriceIndicator saveChart".split(" "),
          definitions: {
            separator: {
              symbol: "separator.svg"
            },
            simpleShapes: {
              items: ["label", "circle", "ellipse", "rectangle"],
              circle: {
                symbol: "circle.svg"
              },
              ellipse: {
                symbol: "ellipse.svg"
              },
              rectangle: {
                symbol: "rectangle.svg"
              },
              label: {
                symbol: "label.svg"
              }
            },
            flags: {
              items: ["flagCirclepin", "flagDiamondpin", "flagSquarepin", "flagSimplepin"],
              flagSimplepin: {
                symbol: "flag-basic.svg"
              },
              flagDiamondpin: {
                symbol: "flag-diamond.svg"
              },
              flagSquarepin: {
                symbol: "flag-trapeze.svg"
              },
              flagCirclepin: {
                symbol: "flag-elipse.svg"
              }
            },
            lines: {
              items: "segment arrowSegment ray arrowRay line arrowInfinityLine horizontalLine verticalLine".split(" "),
              segment: {
                symbol: "segment.svg"
              },
              arrowSegment: {
                symbol: "arrow-segment.svg"
              },
              ray: {
                symbol: "ray.svg"
              },
              arrowRay: {
                symbol: "arrow-ray.svg"
              },
              line: {
                symbol: "line.svg"
              },
              arrowInfinityLine: {
                symbol: "arrow-line.svg"
              },
              verticalLine: {
                symbol: "vertical-line.svg"
              },
              horizontalLine: {
                symbol: "horizontal-line.svg"
              }
            },
            crookedLines: {
              items: ["elliott3", "elliott5", "crooked3", "crooked5"],
              crooked3: {
                symbol: "crooked-3.svg"
              },
              crooked5: {
                symbol: "crooked-5.svg"
              },
              elliott3: {
                symbol: "elliott-3.svg"
              },
              elliott5: {
                symbol: "elliott-5.svg"
              }
            },
            verticalLabels: {
              items: ["verticalCounter", "verticalLabel", "verticalArrow"],
              verticalCounter: {
                symbol: "vertical-counter.svg"
              },
              verticalLabel: {
                symbol: "vertical-label.svg"
              },
              verticalArrow: {
                symbol: "vertical-arrow.svg"
              }
            },
            advanced: {
              items: ["fibonacci", "fibonacciTimeZones", "pitchfork", "parallelChannel", "timeCycles"],
              pitchfork: {
                symbol: "pitchfork.svg"
              },
              fibonacci: {
                symbol: "fibonacci.svg"
              },
              fibonacciTimeZones: {
                symbol: "fibonacci-timezone.svg"
              },
              parallelChannel: {
                symbol: "parallel-channel.svg"
              },
              timeCycles: {
                symbol: "time-cycles.svg"
              }
            },
            measure: {
              items: ["measureXY", "measureX", "measureY"],
              measureX: {
                symbol: "measure-x.svg"
              },
              measureY: {
                symbol: "measure-y.svg"
              },
              measureXY: {
                symbol: "measure-xy.svg"
              }
            },
            toggleAnnotations: {
              symbol: "annotations-visible.svg"
            },
            currentPriceIndicator: {
              symbol: "current-price-show.svg"
            },
            indicators: {
              symbol: "indicators.svg"
            },
            zoomChange: {
              items: ["zoomX", "zoomY", "zoomXY"],
              zoomX: {
                symbol: "zoom-x.svg"
              },
              zoomY: {
                symbol: "zoom-y.svg"
              },
              zoomXY: {
                symbol: "zoom-xy.svg"
              }
            },
            typeChange: {
              items: "typeOHLC typeLine typeCandlestick typeHollowCandlestick typeHLC typeHeikinAshi".split(" "),
              typeOHLC: {
                symbol: "series-ohlc.svg"
              },
              typeLine: {
                symbol: "series-line.svg"
              },
              typeCandlestick: {
                symbol: "series-candlestick.svg"
              },
              typeHLC: {
                symbol: "series-hlc.svg"
              },
              typeHeikinAshi: {
                symbol: "series-heikin-ashi.svg"
              },
              typeHollowCandlestick: {
                symbol: "series-hollow-candlestick.svg"
              }
            },
            fullScreen: {
              symbol: "fullscreen.svg"
            },
            saveChart: {
              symbol: "save-chart.svg"
            }
          }
        }
      }
    }
  });
  r(b, "Stock/StockTools/StockTools.js", [b["Core/Defaults.js"], b["Extensions/Annotations/NavigationBindingsUtilities.js"], b["Stock/StockTools/StockToolsBindings.js"], b["Stock/StockTools/StockToolsDefaults.js"], b["Stock/StockTools/StockToolsUtilities.js"], b["Core/Utilities.js"]],
    function(b, n, m, t, e, l) {
      function d(b, d, e, k) {
        function g(b) {
          return a(b) && !c(b) && b.match("%")
        }
        let h = 0,
          q, p, u;
        k && (u = f(parseFloat(k.top) / 100), p = f(parseFloat(k.height) / 100));
        return {
          positions: b.map((a, k) => {
            let l = f(g(a.options.height) ? parseFloat(a.options.height) / 100 : a.height / d);
            a = f(g(a.options.top) ? parseFloat(a.options.top) / 100 : (a.top - a.chart.plotTop) / d);
            p ? (a > u && (a -= p), h = Math.max(h, (a || 0) + (l || 0))) : (c(l) || (l = b[k - 1].series.every(a => a.is("sma")) ? q : e / 100), c(a) || (a = h), q = l, h = f(Math.max(h, (a || 0) + (l || 0))));
            return {
              height: 100 *
                l,
              top: 100 * a
            }
          }),
          allAxesHeight: h
        }
      }

      function r(a) {
        const b = [];
        a.forEach(function(c, g) {
          c = a[g + 1];
          b[g] = c ? {
            enabled: !0,
            controlledAxis: {
              next: [h(c.options.id, c.options.index)]
            }
          } : {
            enabled: !1
          }
        });
        return b
      }

      function w(a, b, c, d) {
        a.forEach(function(g, e) {
          e = a[e - 1];
          g.top = e ? f(e.height + e.top) : 0;
          c && (g.height = f(g.height + d * b))
        });
        return a
      }

      function v(a) {
        const b = this.chart,
          c = b.yAxis.filter(u),
          {
            positions: g,
            allAxesHeight: d
          } = this.getYAxisPositions(c, b.plotHeight, 20, a),
          e = this.getYAxisResizers(c);
        !a && d <= f(1) ? g[g.length - 1] = {
          height: 20,
          top: f(100 * d - 20)
        } : g.forEach(function(a) {
          a.height = a.height / (100 * d) * 100;
          a.top = a.top / (100 * d) * 100
        });
        g.forEach(function(a, b) {
          c[b].update({
            height: a.height + "%",
            top: a.top + "%",
            resize: e[b],
            offset: 0
          }, !1)
        })
      }
      const {
        setOptions: q
      } = b, {
        getAssignedAxis: k
      } = n, {
        isNotNavigatorYAxis: u,
        isPriceIndicatorEnabled: p
      } = e, {
        correctFloat: f,
        defined: a,
        isNumber: c,
        pick: h
      } = l, y = [];
      return {
        compose: function(a) {
          l.pushUnique(y, a) && (a = a.prototype, a.getYAxisPositions = d, a.getYAxisResizers = r, a.recalculateYAxisPositions = w, a.resizeYAxes = v, a.utils = {
            indicatorsWithAxes: e.indicatorsWithAxes,
            indicatorsWithVolume: e.indicatorsWithVolume,
            getAssignedAxis: k,
            isPriceIndicatorEnabled: p,
            manageIndicators: e.manageIndicators
          });
          l.pushUnique(y, q) && (q(t), q({
            navigation: {
              bindings: m
            }
          }))
        }
      }
    });
  r(b, "Stock/StockTools/StockToolbar.js", [b["Core/Utilities.js"]], function(b) {
    const {
      addEvent: n,
      createElement: m,
      css: t,
      fireEvent: e,
      getStyle: l,
      isArray: d,
      merge: r,
      pick: w
    } = b;
    class v {
      constructor(b, d, l) {
        this.wrapper = this.toolbar = this.submenu = this.showhideBtn = this.listWrapper = this.arrowWrapper =
          this.arrowUp = this.arrowDown = void 0;
        this.chart = l;
        this.options = b;
        this.lang = d;
        this.iconsURL = this.getIconsURL();
        this.guiEnabled = b.enabled;
        this.visible = w(b.visible, !0);
        this.placed = w(b.placed, !1);
        this.eventsToUnbind = [];
        this.guiEnabled && (this.createHTML(), this.init(), this.showHideNavigatorion());
        e(this, "afterInit")
      }
      init() {
        const b = this.lang,
          e = this.options,
          l = this.toolbar,
          p = e.definitions,
          f = l.childNodes;
        e.buttons.forEach(a => {
          const c = this.addButton(l, p, a, b);
          this.eventsToUnbind.push(n(c.buttonWrapper, "click",
            () => this.eraseActiveButtons(f, c.buttonWrapper)));
          d(p[a].items) && this.addSubmenu(c, p[a])
        })
      }
      addSubmenu(b, d) {
        const e = b.submenuArrow,
          k = b.buttonWrapper,
          f = l(k, "width"),
          a = this.wrapper,
          c = this.listWrapper,
          h = this.toolbar.childNodes,
          q = this.submenu = m("ul", {
            className: "highcharts-submenu-wrapper"
          }, void 0, k);
        this.addSubmenuItems(k, d);
        this.eventsToUnbind.push(n(e, "click", b => {
          b.stopPropagation();
          this.eraseActiveButtons(h, k);
          0 <= k.className.indexOf("highcharts-current") ? (c.style.width = c.startWidth + "px", k.classList.remove("highcharts-current"),
            q.style.display = "none") : (q.style.display = "block", b = q.offsetHeight - k.offsetHeight - 3, q.offsetHeight + k.offsetTop > a.offsetHeight && k.offsetTop > b || (b = 0), t(q, {
            top: -b + "px",
            left: f + 3 + "px"
          }), k.className += " highcharts-current", c.startWidth = a.offsetWidth, c.style.width = c.startWidth + l(c, "padding-left") + q.offsetWidth + 3 + "px")
        }))
      }
      addSubmenuItems(b, d) {
        const e = this,
          k = this.submenu,
          f = this.lang,
          a = this.listWrapper;
        let c;
        d.items.forEach(h => {
          c = this.addButton(k, d, h, f);
          this.eventsToUnbind.push(n(c.mainButton, "click", function() {
            e.switchSymbol(this,
              b, !0);
            a.style.width = a.startWidth + "px";
            k.style.display = "none"
          }))
        });
        const h = k.querySelectorAll("li > .highcharts-menu-item-btn")[0];
        this.switchSymbol(h, !1)
      }
      eraseActiveButtons(b, d, e) {
        [].forEach.call(b, b => {
          b !== d && (b.classList.remove("highcharts-current"), b.classList.remove("highcharts-active"), e = b.querySelectorAll(".highcharts-submenu-wrapper"), 0 < e.length && (e[0].style.display = "none"))
        })
      }
      addButton(b, d, e, l = {}) {
        d = d[e];
        const f = d.items,
          a = d.className || "";
        b = m("li", {
          className: w(v.prototype.classMapping[e], "") +
            " " + a,
          title: l[e] || e
        }, void 0, b);
        e = m("span", {
          className: "highcharts-menu-item-btn"
        }, void 0, b);
        if (f && f.length) return d = m("span", {
          className: "highcharts-submenu-item-arrow highcharts-arrow-right"
        }, void 0, b), d.style.backgroundImage = "url(" + this.iconsURL + "arrow-bottom.svg)", {
          buttonWrapper: b,
          mainButton: e,
          submenuArrow: d
        };
        e.style.backgroundImage = "url(" + this.iconsURL + d.symbol + ")";
        return {
          buttonWrapper: b,
          mainButton: e
        }
      }
      addNavigation() {
        const b = this.wrapper;
        this.arrowWrapper = m("div", {
          className: "highcharts-arrow-wrapper"
        });
        this.arrowUp = m("div", {
          className: "highcharts-arrow-up"
        }, void 0, this.arrowWrapper);
        this.arrowUp.style.backgroundImage = "url(" + this.iconsURL + "arrow-right.svg)";
        this.arrowDown = m("div", {
          className: "highcharts-arrow-down"
        }, void 0, this.arrowWrapper);
        this.arrowDown.style.backgroundImage = "url(" + this.iconsURL + "arrow-right.svg)";
        b.insertBefore(this.arrowWrapper, b.childNodes[0]);
        this.scrollButtons()
      }
      scrollButtons() {
        const b = this.wrapper,
          d = this.toolbar,
          e = .1 * b.offsetHeight;
        let l = 0;
        this.eventsToUnbind.push(n(this.arrowUp,
          "click", () => {
            0 < l && (l -= e, d.style.marginTop = -l + "px")
          }));
        this.eventsToUnbind.push(n(this.arrowDown, "click", () => {
          b.offsetHeight + l <= d.offsetHeight + e && (l += e, d.style.marginTop = -l + "px")
        }))
      }
      createHTML() {
        const b = this.chart;
        var d = this.options,
          e = b.container;
        const l = b.options.navigation,
          f = this.wrapper = m("div", {
            className: "highcharts-stocktools-wrapper " + d.className + " " + (l && l.bindingsClassName)
          });
        e.appendChild(f);
        ["mousedown", "mousemove", "click", "touchstart"].forEach(a => {
          n(f, a, a => a.stopPropagation())
        });
        n(f, "mouseover",
          a => b.pointer.onContainerMouseLeave(a));
        this.toolbar = e = m("ul", {
          className: "highcharts-stocktools-toolbar " + d.toolbarClassName
        });
        this.listWrapper = d = m("div", {
          className: "highcharts-menu-wrapper"
        });
        f.insertBefore(d, f.childNodes[0]);
        d.insertBefore(e, d.childNodes[0]);
        this.showHideToolbar();
        this.addNavigation()
      }
      showHideNavigatorion() {
        this.visible && this.toolbar.offsetHeight > this.wrapper.offsetHeight - 50 ? this.arrowWrapper.style.display = "block" : (this.toolbar.style.marginTop = "0px", this.arrowWrapper.style.display =
          "none")
      }
      showHideToolbar() {
        const b = this.chart,
          d = this.wrapper,
          e = this.listWrapper,
          p = this.submenu,
          f = this.showhideBtn = m("div", {
            className: "highcharts-toggle-toolbar highcharts-arrow-left"
          }, void 0, d);
        let a = this.visible;
        f.style.backgroundImage = "url(" + this.iconsURL + "arrow-right.svg)";
        a ? (d.style.height = "100%", f.style.top = l(e, "padding-top") + "px", f.style.left = d.offsetWidth + l(e, "padding-left") + "px") : (p && (p.style.display = "none"), f.style.left = "0px", a = this.visible = !1, e.classList.add("highcharts-hide"), f.classList.toggle("highcharts-arrow-right"),
          d.style.height = f.offsetHeight + "px");
        this.eventsToUnbind.push(n(f, "click", () => {
          b.update({
            stockTools: {
              gui: {
                visible: !a,
                placed: !0
              }
            }
          })
        }))
      }
      switchSymbol(b, d) {
        var e = b.parentNode;
        const k = e.className;
        e = e.parentNode.parentNode; - 1 < k.indexOf("highcharts-disabled-btn") || (e.className = "", k && e.classList.add(k.trim()), e.querySelectorAll(".highcharts-menu-item-btn")[0].style.backgroundImage = b.style.backgroundImage, d && this.toggleButtonActiveClass(e))
      }
      toggleButtonActiveClass(b) {
        b = b.classList;
        b.contains("highcharts-active") ?
          b.remove("highcharts-active") : b.add("highcharts-active")
      }
      unselectAllButtons(b) {
        const d = b.parentNode.querySelectorAll(".highcharts-active");
        [].forEach.call(d, d => {
          d !== b && d.classList.remove("highcharts-active")
        })
      }
      update(b, d) {
        r(!0, this.chart.options.stockTools, b);
        this.destroy();
        this.chart.setStockTools(b);
        this.chart.navigationBindings && this.chart.navigationBindings.update();
        this.chart.isDirtyBox = !0;
        w(d, !0) && this.chart.redraw()
      }
      destroy() {
        const b = this.wrapper,
          d = b && b.parentNode;
        this.eventsToUnbind.forEach(b =>
          b());
        d && d.removeChild(b)
      }
      redraw() {
        this.showHideNavigatorion()
      }
      getIconsURL() {
        return this.chart.options.navigation.iconsURL || this.options.iconsURL || "https://code.highcharts.com/11.0.1/gfx/stock-icons/"
      }
    }
    v.prototype.classMapping = {
      circle: "highcharts-circle-annotation",
      ellipse: "highcharts-ellipse-annotation",
      rectangle: "highcharts-rectangle-annotation",
      label: "highcharts-label-annotation",
      segment: "highcharts-segment",
      arrowSegment: "highcharts-arrow-segment",
      ray: "highcharts-ray",
      arrowRay: "highcharts-arrow-ray",
      line: "highcharts-infinity-line",
      arrowInfinityLine: "highcharts-arrow-infinity-line",
      verticalLine: "highcharts-vertical-line",
      horizontalLine: "highcharts-horizontal-line",
      crooked3: "highcharts-crooked3",
      crooked5: "highcharts-crooked5",
      elliott3: "highcharts-elliott3",
      elliott5: "highcharts-elliott5",
      pitchfork: "highcharts-pitchfork",
      fibonacci: "highcharts-fibonacci",
      fibonacciTimeZones: "highcharts-fibonacci-time-zones",
      parallelChannel: "highcharts-parallel-channel",
      measureX: "highcharts-measure-x",
      measureY: "highcharts-measure-y",
      measureXY: "highcharts-measure-xy",
      timeCycles: "highcharts-time-cycles",
      verticalCounter: "highcharts-vertical-counter",
      verticalLabel: "highcharts-vertical-label",
      verticalArrow: "highcharts-vertical-arrow",
      currentPriceIndicator: "highcharts-current-price-indicator",
      indicators: "highcharts-indicators",
      flagCirclepin: "highcharts-flag-circlepin",
      flagDiamondpin: "highcharts-flag-diamondpin",
      flagSquarepin: "highcharts-flag-squarepin",
      flagSimplepin: "highcharts-flag-simplepin",
      zoomX: "highcharts-zoom-x",
      zoomY: "highcharts-zoom-y",
      zoomXY: "highcharts-zoom-xy",
      typeLine: "highcharts-series-type-line",
      typeOHLC: "highcharts-series-type-ohlc",
      typeHLC: "highcharts-series-type-hlc",
      typeCandlestick: "highcharts-series-type-candlestick",
      typeHollowCandlestick: "highcharts-series-type-hollowcandlestick",
      typeHeikinAshi: "highcharts-series-type-heikinashi",
      fullScreen: "highcharts-full-screen",
      toggleAnnotations: "highcharts-toggle-annotations",
      saveChart: "highcharts-save-chart",
      separator: "highcharts-separator"
    };
    return v
  });
  r(b, "Stock/StockTools/StockToolsGui.js",
    [b["Core/Defaults.js"], b["Stock/StockTools/StockToolsDefaults.js"], b["Stock/StockTools/StockToolbar.js"], b["Core/Utilities.js"]],
    function(b, n, m, t) {
      function e(a) {
        const b = this.options,
          d = b.lang;
        a = c(b.stockTools && b.stockTools.gui, a && a.gui);
        this.stockTools = new m(a, d && d.stockTools && d.stockTools.gui, this);
        this.stockTools.guiEnabled && (this.isDirtyBox = !0)
      }

      function l() {
        this.setStockTools()
      }

      function d() {
        if (this.stockTools) {
          var b = this.options.chart,
            c = this.stockTools.listWrapper;
          c = c && (c.startWidth + a(c, "padding-left") +
            a(c, "padding-right") || c.offsetWidth);
          var d = !1;
          c && c < this.plotWidth ? (b = h(b.spacingLeft, b.spacing && b.spacing[3], 0) + c, d = b - this.spacingBox.x, this.spacingBox.x = b, this.spacingBox.width -= d, d = !0) : 0 === c && (d = !0);
          c !== this.stockTools.prevOffsetWidth && (this.stockTools.prevOffsetWidth = c, d && (this.isDirtyLegend = !0))
        }
      }

      function r() {
        this.stockTools && this.stockTools.destroy()
      }

      function w() {
        var b = this.stockTools && this.stockTools.listWrapper;
        (b = b && (b.startWidth + a(b, "padding-left") + a(b, "padding-right") || b.offsetWidth)) &&
        b < this.plotWidth && (this.plotLeft += b, this.spacing[3] += b)
      }

      function v() {
        this.stockTools && this.stockTools.guiEnabled && this.stockTools.redraw()
      }

      function q() {
        const a = this.stockTools,
          b = a && a.toolbar && a.toolbar.querySelector(".highcharts-current-price-indicator");
        a && this.navigationBindings && this.options.series && b && (this.navigationBindings.constructor.prototype.utils.isPriceIndicatorEnabled(this.series) ? b.firstChild.style["background-image"] = 'url("' + a.getIconsURL() + 'current-price-hide.svg")' : b.firstChild.style["background-image"] =
          'url("' + a.getIconsURL() + 'current-price-show.svg")')
      }

      function k(a) {
        const b = this.chart.stockTools;
        b && b.guiEnabled && (a = a.button, 0 <= a.parentNode.className.indexOf("highcharts-submenu-wrapper") && (a = a.parentNode.parentNode), b.toggleButtonActiveClass(a))
      }

      function u(a) {
        const b = this.chart.stockTools;
        if (b && b.guiEnabled) {
          let c = a.button;
          b.unselectAllButtons(a.button);
          0 <= c.parentNode.className.indexOf("highcharts-submenu-wrapper") && (c = c.parentNode.parentNode);
          b.toggleButtonActiveClass(c)
        }
      }
      const {
        setOptions: p
      } =
      b, {
        addEvent: f,
        getStyle: a,
        merge: c,
        pick: h
      } = t, y = [];
      return {
        compose: function(a, b) {
          t.pushUnique(y, a) && (f(a, "afterGetContainer", l), f(a, "beforeRedraw", d), f(a, "beforeRender", d), f(a, "destroy", r), f(a, "getMargins", w, {
            order: 0
          }), f(a, "redraw", v), f(a, "render", q), a.prototype.setStockTools = e);
          t.pushUnique(y, b) && (f(b, "deselectButton", k), f(b, "selectButton", u));
          t.pushUnique(y, p) && p(n)
        }
      }
    });
  r(b, "masters/modules/stock-tools.src.js", [b["Core/Globals.js"], b["Extensions/Annotations/NavigationBindings.js"], b["Stock/StockTools/StockTools.js"],
    b["Stock/StockTools/StockToolsGui.js"], b["Stock/StockTools/StockToolbar.js"]
  ], function(b, n, m, r, e) {
    b.Toolbar = e;
    m.compose(n);
    r.compose(b.Chart, n)
  })
});
//# sourceMappingURL=stock-tools.js.map