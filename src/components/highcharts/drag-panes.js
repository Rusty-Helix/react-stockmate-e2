/*
 Highstock JS v11.0.1 (2023-05-08)

 Drag-panes module

 (c) 2010-2021 Highsoft AS
 Author: Kacper Madej

 License: www.highcharts.com/license
*/

(function(a) {
  "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/drag-panes", ["highcharts", "highcharts/modules/stock"], function(c) {
    a(c);
    a.Highcharts = c;
    return a
  }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(a) {
  function c(a, d, c, w) {
    a.hasOwnProperty(d) || (a[d] = w.apply(null, c), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
      detail: {
        path: d,
        module: a[d]
      }
    })))
  }
  a = a ? a._modules : {};
  c(a, "Extensions/DragPanes/AxisResizerDefaults.js", [], function() {
    return {
      minLength: "10%",
      maxLength: "100%",
      resize: {
        controlledAxis: {
          next: [],
          prev: []
        },
        enabled: !1,
        cursor: "ns-resize",
        lineColor: "#cccccc",
        lineDashStyle: "Solid",
        lineWidth: 4,
        x: 0,
        y: 0
      }
    }
  });
  c(a, "Extensions/DragPanes/AxisResizer.js", [a["Extensions/DragPanes/AxisResizerDefaults.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, d, c) {
    const {
      hasTouch: n
    } = d, {
      addEvent: e,
      clamp: m,
      isNumber: v,
      objectEach: q,
      relativeLength: t
    } =
    c;
    class p {
      constructor(b) {
        this.options = this.lastPos = this.controlLine = this.axis = void 0;
        this.init(b)
      }
      init(b, f) {
        this.axis = b;
        this.options = b.options.resize;
        this.render();
        f || this.addMouseEvents()
      }
      render() {
        const b = this.axis,
          f = b.chart;
        var a = this.options;
        const d = a.x || 0,
          c = a.y,
          l = m(b.top + b.height + c, f.plotTop, f.plotTop + f.plotHeight);
        let h = {};
        f.styledMode || (h = {
          cursor: a.cursor,
          stroke: a.lineColor,
          "stroke-width": a.lineWidth,
          dashstyle: a.lineDashStyle
        });
        this.lastPos = l - c;
        this.controlLine || (this.controlLine = f.renderer.path().addClass("highcharts-axis-resizer"));
        this.controlLine.add(b.axisGroup);
        a = f.styledMode ? this.controlLine.strokeWidth() : a.lineWidth;
        h.d = f.renderer.crispLine([
          ["M", b.left + d, l],
          ["L", b.left + b.width + d, l]
        ], a);
        this.controlLine.attr(h)
      }
      addMouseEvents() {
        const b = this,
          a = b.controlLine.element,
          d = b.axis.chart.container,
          c = [];
        let m, l, h;
        b.mouseMoveHandler = m = function(a) {
          b.onMouseMove(a)
        };
        b.mouseUpHandler = l = function(a) {
          b.onMouseUp(a)
        };
        b.mouseDownHandler = h = function(a) {
          b.onMouseDown(a)
        };
        c.push(e(d, "mousemove", m), e(d.ownerDocument, "mouseup", l), e(a, "mousedown",
          h));
        n && c.push(e(d, "touchmove", m), e(d.ownerDocument, "touchend", l), e(a, "touchstart", h));
        b.eventsToUnbind = c
      }
      onMouseMove(b) {
        b.touches && 0 === b.touches[0].pageX || !this.grabbed || (this.hasDragged = !0, this.updateAxes(this.axis.chart.pointer.normalize(b).chartY - this.options.y))
      }
      onMouseUp(b) {
        this.hasDragged && this.updateAxes(this.axis.chart.pointer.normalize(b).chartY - this.options.y);
        this.grabbed = this.hasDragged = this.axis.chart.activeResizer = null
      }
      onMouseDown(b) {
        this.axis.chart.pointer.reset(!1, 0);
        this.grabbed =
          this.axis.chart.activeResizer = !0
      }
      updateAxes(b) {
        const a = this,
          d = a.axis.chart;
        var c = a.options.controlledAxis;
        const n = 0 === c.next.length ? [d.yAxis.indexOf(a.axis) + 1] : c.next;
        c = [a.axis].concat(c.prev);
        const l = [],
          h = d.plotTop,
          e = d.plotHeight,
          q = h + e;
        b = m(b, h, q);
        let p = !1,
          u = b - a.lastPos;
        1 > u * u || ([c, n].forEach((c, f) => {
          c.forEach((c, k) => {
            var g = (c = v(c) ? d.yAxis[c] : f || k ? d.get(c) : c) && c.options;
            if (g && "navigator-y-axis" !== g.id) {
              k = c.top;
              var n = Math.round(t(g.minLength, e)),
                r = Math.round(t(g.maxLength, e));
              f ? (u = b - a.lastPos, g = Math.round(m(c.len -
                u, n, r)), k = c.top + u, k + g > q && (r = q - g - k, b += r, k += r), k < h && (k = h, k + g > q && (g = e)), g === n && (p = !0), l.push({
                axis: c,
                options: {
                  top: 100 * (k - h) / e + "%",
                  height: 100 * g / e + "%"
                }
              })) : (g = Math.round(m(b - k, n, r)), g === r && (p = !0), b = k + g, l.push({
                axis: c,
                options: {
                  height: 100 * g / e + "%"
                }
              }))
            }
          })
        }), p || (l.forEach(function(b) {
          b.axis.update(b.options, !1)
        }), d.redraw(!1)))
      }
      destroy() {
        const b = this;
        delete b.axis.resizer;
        this.eventsToUnbind && this.eventsToUnbind.forEach(function(b) {
          b()
        });
        b.controlLine.destroy();
        q(b, function(a, c) {
          b[c] = null
        })
      }
    }
    p.resizerOptions =
      a;
    return p
  });
  c(a, "Extensions/DragPanes/DragPanes.js", [a["Extensions/DragPanes/AxisResizer.js"], a["Core/Utilities.js"]], function(a, c) {
    function d() {
      let b = this.resizer;
      var c = this.options.resize;
      c && (c = !1 !== c.enabled, b ? c ? b.init(this, !0) : b.destroy() : c && (this.resizer = new a(this)))
    }

    function n(b) {
      !b.keepEvents && this.resizer && this.resizer.destroy()
    }

    function e(b) {
      this.chart.activeResizer || b.apply(this, Array.prototype.slice.call(arguments, 1))
    }

    function m(b) {
      this.chart.activeResizer || b.apply(this, Array.prototype.slice.call(arguments,
        1))
    }
    const {
      addEvent: v,
      merge: x,
      wrap: t
    } = c, p = [];
    return {
      compose: function(b, f) {
        c.pushUnique(p, b) && (x(!0, b.defaultOptions, a.resizerOptions), b.keepProps.push("resizer"), v(b, "afterRender", d), v(b, "destroy", n));
        c.pushUnique(p, f) && (t(f.prototype, "runPointActions", m), t(f.prototype, "drag", e))
      }
    }
  });
  c(a, "masters/modules/drag-panes.src.js", [a["Core/Globals.js"], a["Extensions/DragPanes/AxisResizer.js"], a["Extensions/DragPanes/DragPanes.js"]], function(a, c, q) {
    a.AxisResizer = c;
    q.compose(a.Axis, a.Pointer)
  })
});
//# sourceMappingURL=drag-panes.js.map