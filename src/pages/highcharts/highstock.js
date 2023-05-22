/*
 Highstock JS v11.0.1 (2023-05-08)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function(V, M) {
  "object" === typeof module && module.exports ? (M["default"] = M, module.exports = V.document ? M(V) : M) : "function" === typeof define && define.amd ? define("highcharts/highstock", function() {
    return M(V)
  }) : (V.Highcharts && V.Highcharts.error(16, !0), V.Highcharts = M(V))
})("undefined" !== typeof window ? window : this, function(V) {
  function M(a, A, H, I) {
    a.hasOwnProperty(A) || (a[A] = I.apply(null, H), "function" === typeof CustomEvent && V.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
      detail: {
        path: A,
        module: a[A]
      }
    })))
  }
  var a = {};
  M(a, "Core/Globals.js", [], function() {
    var a;
    (function(a) {
      a.SVG_NS = "http://www.w3.org/2000/svg";
      a.product = "Highcharts";
      a.version = "11.0.1";
      a.win = "undefined" !== typeof V ? V : {};
      a.doc = a.win.document;
      a.svg = a.doc && a.doc.createElementNS && !!a.doc.createElementNS(a.SVG_NS, "svg").createSVGRect;
      a.userAgent = a.win.navigator && a.win.navigator.userAgent || "";
      a.isChrome = -1 !== a.userAgent.indexOf("Chrome");
      a.isFirefox = -1 !== a.userAgent.indexOf("Firefox");
      a.isMS = /(edge|msie|trident)/i.test(a.userAgent) && !a.win.opera;
      a.isSafari = !a.isChrome && -1 !== a.userAgent.indexOf("Safari");
      a.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(a.userAgent);
      a.isWebKit = -1 !== a.userAgent.indexOf("AppleWebKit");
      a.deg2rad = 2 * Math.PI / 360;
      a.hasBidiBug = a.isFirefox && 4 > parseInt(a.userAgent.split("Firefox/")[1], 10);
      a.hasTouch = !!a.win.TouchEvent;
      a.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
      a.noop = function() {};
      a.supportsPassiveEvents = function() {
        let u = !1;
        if (!a.isMS) {
          const A = Object.defineProperty({}, "passive", {
            get: function() {
              u = !0
            }
          });
          a.win.addEventListener && a.win.removeEventListener && (a.win.addEventListener("testPassive", a.noop, A), a.win.removeEventListener("testPassive", a.noop, A))
        }
        return u
      }();
      a.charts = [];
      a.dateFormats = {};
      a.seriesTypes = {};
      a.symbolSizes = {};
      a.chartCount = 0
    })(a || (a = {}));
    "";
    return a
  });
  M(a, "Core/Utilities.js", [a["Core/Globals.js"]], function(a) {
    function u(c, b, g, J) {
      const f = b ? "Highcharts error" : "Highcharts warning";
      32 === c && (c = `${f}: Deprecated member`);
      const x = r(c);
      let q = x ? `${f} #${c}: www.highcharts.com/errors/${c}/` :
        c.toString();
      if ("undefined" !== typeof J) {
        let c = "";
        x && (q += "?");
        L(J, function(b, f) {
          c += `\n - ${f}: ${b}`;
          x && (q += encodeURI(f) + "=" + encodeURI(b))
        });
        q += c
      }
      e(a, "displayError", {
        chart: g,
        code: c,
        message: q,
        params: J
      }, function() {
        if (b) throw Error(q);
        l.console && -1 === u.messages.indexOf(q) && console.warn(q)
      });
      u.messages.push(q)
    }

    function H(c, b) {
      const f = {};
      L(c, function(g, z) {
        if (C(c[z], !0) && !c.nodeType && b[z]) g = H(c[z], b[z]), Object.keys(g).length && (f[z] = g);
        else if (C(c[z]) || c[z] !== b[z] || z in c && !(z in b)) f[z] = c[z]
      });
      return f
    }

    function I(c, b) {
      return parseInt(c, b || 10)
    }

    function F(c) {
      return "string" === typeof c
    }

    function G(c) {
      c = Object.prototype.toString.call(c);
      return "[object Array]" === c || "[object Array Iterator]" === c
    }

    function C(c, b) {
      return !!c && "object" === typeof c && (!b || !G(c))
    }

    function B(c) {
      return C(c) && "number" === typeof c.nodeType
    }

    function t(c) {
      const b = c && c.constructor;
      return !(!C(c, !0) || B(c) || !b || !b.name || "Object" === b.name)
    }

    function r(c) {
      return "number" === typeof c && !isNaN(c) && Infinity > c && -Infinity < c
    }

    function d(c) {
      return "undefined" !==
        typeof c && null !== c
    }

    function p(c, b, g) {
      const f = F(b) && !d(g);
      let z;
      const x = (b, g) => {
        d(b) ? c.setAttribute(g, b) : f ? (z = c.getAttribute(g)) || "class" !== g || (z = c.getAttribute(g + "Name")) : c.removeAttribute(g)
      };
      F(b) ? x(g, b) : L(b, x);
      return z
    }

    function m(c, b) {
      let f;
      c || (c = {});
      for (f in b) c[f] = b[f];
      return c
    }

    function k() {
      const c = arguments,
        b = c.length;
      for (let f = 0; f < b; f++) {
        const b = c[f];
        if ("undefined" !== typeof b && null !== b) return b
      }
    }

    function v(c, b) {
      a.isMS && !a.svg && b && d(b.opacity) && (b.filter = `alpha(opacity=${100*b.opacity})`);
      m(c.style,
        b)
    }

    function n(c) {
      return Math.pow(10, Math.floor(Math.log(c) / Math.LN10))
    }

    function h(c, b) {
      return 1E14 < c ? c : parseFloat(c.toPrecision(b || 14))
    }

    function D(c, b, g) {
      let f;
      if ("width" === b) return b = Math.min(c.offsetWidth, c.scrollWidth), g = c.getBoundingClientRect && c.getBoundingClientRect().width, g < b && g >= b - 1 && (b = Math.floor(g)), Math.max(0, b - (D(c, "padding-left", !0) || 0) - (D(c, "padding-right", !0) || 0));
      if ("height" === b) return Math.max(0, Math.min(c.offsetHeight, c.scrollHeight) - (D(c, "padding-top", !0) || 0) - (D(c, "padding-bottom",
        !0) || 0));
      if (c = l.getComputedStyle(c, void 0)) f = c.getPropertyValue(b), k(g, "opacity" !== b) && (f = I(f));
      return f
    }

    function L(c, b, g) {
      for (const f in c) Object.hasOwnProperty.call(c, f) && b.call(g || c[f], c[f], f, c)
    }

    function E(c, b, g) {
      function f(b, f) {
        const g = c.removeEventListener;
        g && g.call(c, b, f, !1)
      }

      function z(g) {
        let z, N;
        c.nodeName && (b ? (z = {}, z[b] = !0) : z = g, L(z, function(c, b) {
          if (g[b])
            for (N = g[b].length; N--;) f(b, g[b][N].fn)
        }))
      }
      var l = "function" === typeof c && c.prototype || c;
      if (Object.hasOwnProperty.call(l, "hcEvents")) {
        const c =
          l.hcEvents;
        b ? (l = c[b] || [], g ? (c[b] = l.filter(function(c) {
          return g !== c.fn
        }), f(b, g)) : (z(c), c[b] = [])) : (z(c), delete l.hcEvents)
      }
    }

    function e(c, b, g, l) {
      g = g || {};
      if (y.createEvent && (c.dispatchEvent || c.fireEvent && c !== a)) {
        var f = y.createEvent("Events");
        f.initEvent(b, !0, !0);
        g = m(f, g);
        c.dispatchEvent ? c.dispatchEvent(g) : c.fireEvent(b, g)
      } else if (c.hcEvents) {
        g.target || m(g, {
          preventDefault: function() {
            g.defaultPrevented = !0
          },
          target: c,
          type: b
        });
        f = [];
        let z = c,
          l = !1;
        for (; z.hcEvents;) Object.hasOwnProperty.call(z, "hcEvents") && z.hcEvents[b] &&
          (f.length && (l = !0), f.unshift.apply(f, z.hcEvents[b])), z = Object.getPrototypeOf(z);
        l && f.sort((c, b) => c.order - b.order);
        f.forEach(b => {
          !1 === b.fn.call(c, g) && g.preventDefault()
        })
      }
      l && !g.defaultPrevented && l.call(c, g)
    }
    const {
      charts: q,
      doc: y,
      win: l
    } = a;
    (u || (u = {})).messages = [];
    Math.easeInOutSine = function(c) {
      return -.5 * (Math.cos(Math.PI * c) - 1)
    };
    var w = Array.prototype.find ? function(c, b) {
      return c.find(b)
    } : function(c, b) {
      let f;
      const g = c.length;
      for (f = 0; f < g; f++)
        if (b(c[f], f)) return c[f]
    };
    L({
      map: "map",
      each: "forEach",
      grep: "filter",
      reduce: "reduce",
      some: "some"
    }, function(c, b) {
      a[b] = function(f) {
        u(32, !1, void 0, {
          [`Highcharts.${b}`]: `use Array.${c}`
        });
        return Array.prototype[c].apply(f, [].slice.call(arguments, 1))
      }
    });
    let g;
    const b = function() {
      const c = Math.random().toString(36).substring(2, 9) + "-";
      let b = 0;
      return function() {
        return "highcharts-" + (g ? "" : c) + b++
      }
    }();
    l.jQuery && (l.jQuery.fn.highcharts = function() {
      const c = [].slice.call(arguments);
      if (this[0]) return c[0] ? (new(a[F(c[0]) ? c.shift() : "Chart"])(this[0], c[0], c[1]), this) : q[p(this[0], "data-highcharts-chart")]
    });
    w = {
      addEvent: function(c, b, g, l = {}) {
        var f = "function" === typeof c && c.prototype || c;
        Object.hasOwnProperty.call(f, "hcEvents") || (f.hcEvents = {});
        f = f.hcEvents;
        a.Point && c instanceof a.Point && c.series && c.series.chart && (c.series.chart.runTrackerClick = !0);
        const e = c.addEventListener;
        e && e.call(c, b, g, a.supportsPassiveEvents ? {
          passive: void 0 === l.passive ? -1 !== b.indexOf("touch") : l.passive,
          capture: !1
        } : !1);
        f[b] || (f[b] = []);
        f[b].push({
          fn: g,
          order: "number" === typeof l.order ? l.order : Infinity
        });
        f[b].sort((c, b) => c.order - b.order);
        return function() {
          E(c, b, g)
        }
      },
      arrayMax: function(c) {
        let b = c.length,
          g = c[0];
        for (; b--;) c[b] > g && (g = c[b]);
        return g
      },
      arrayMin: function(b) {
        let c = b.length,
          g = b[0];
        for (; c--;) b[c] < g && (g = b[c]);
        return g
      },
      attr: p,
      clamp: function(b, f, g) {
        return b > f ? b < g ? b : g : f
      },
      cleanRecursively: H,
      clearTimeout: function(b) {
        d(b) && clearTimeout(b)
      },
      correctFloat: h,
      createElement: function(b, f, g, l, z) {
        b = y.createElement(b);
        f && m(b, f);
        z && v(b, {
          padding: "0",
          border: "none",
          margin: "0"
        });
        g && v(b, g);
        l && l.appendChild(b);
        return b
      },
      css: v,
      defined: d,
      destroyObjectProperties: function(b,
        f) {
        L(b, function(c, g) {
          c && c !== f && c.destroy && c.destroy();
          delete b[g]
        })
      },
      discardElement: function(b) {
        b && b.parentElement && b.parentElement.removeChild(b)
      },
      erase: function(b, f) {
        let c = b.length;
        for (; c--;)
          if (b[c] === f) {
            b.splice(c, 1);
            break
          }
      },
      error: u,
      extend: m,
      extendClass: function(b, f) {
        const c = function() {};
        c.prototype = new b;
        m(c.prototype, f);
        return c
      },
      find: w,
      fireEvent: e,
      getMagnitude: n,
      getNestedProperty: function(b, f) {
        for (b = b.split("."); b.length && d(f);) {
          const c = b.shift();
          if ("undefined" === typeof c || "__proto__" === c) return;
          f = f[c];
          if (!d(f) || "function" === typeof f || "number" === typeof f.nodeType || f === l) return
        }
        return f
      },
      getStyle: D,
      inArray: function(b, f, g) {
        u(32, !1, void 0, {
          "Highcharts.inArray": "use Array.indexOf"
        });
        return f.indexOf(b, g)
      },
      isArray: G,
      isClass: t,
      isDOMElement: B,
      isFunction: function(b) {
        return "function" === typeof b
      },
      isNumber: r,
      isObject: C,
      isString: F,
      keys: function(b) {
        u(32, !1, void 0, {
          "Highcharts.keys": "use Object.keys"
        });
        return Object.keys(b)
      },
      merge: function() {
        let b, f = arguments,
          g = {};
        const l = function(b, c) {
          "object" !== typeof b &&
            (b = {});
          L(c, function(f, g) {
            "__proto__" !== g && "constructor" !== g && (!C(f, !0) || t(f) || B(f) ? b[g] = c[g] : b[g] = l(b[g] || {}, f))
          });
          return b
        };
        !0 === f[0] && (g = f[1], f = Array.prototype.slice.call(f, 2));
        const z = f.length;
        for (b = 0; b < z; b++) g = l(g, f[b]);
        return g
      },
      normalizeTickInterval: function(b, f, g, l, z) {
        let c = b;
        g = k(g, n(b));
        const e = b / g;
        f || (f = z ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === l && (1 === g ? f = f.filter(function(b) {
          return 0 === b % 1
        }) : .1 >= g && (f = [1 / g])));
        for (l = 0; l < f.length && !(c = f[l], z && c * g >= b || !z && e <= (f[l] + (f[l + 1] || f[l])) /
            2); l++);
        return c = h(c * g, -Math.round(Math.log(.001) / Math.LN10))
      },
      objectEach: L,
      offset: function(b) {
        const c = y.documentElement;
        b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : {
          top: 0,
          left: 0,
          width: 0,
          height: 0
        };
        return {
          top: b.top + (l.pageYOffset || c.scrollTop) - (c.clientTop || 0),
          left: b.left + (l.pageXOffset || c.scrollLeft) - (c.clientLeft || 0),
          width: b.width,
          height: b.height
        }
      },
      pad: function(b, f, g) {
        return Array((f || 2) + 1 - String(b).replace("-", "").length).join(g || "0") + b
      },
      pick: k,
      pInt: I,
      pushUnique: function(b, f) {
        return 0 >
          b.indexOf(f) && !!b.push(f)
      },
      relativeLength: function(b, f, g) {
        return /%$/.test(b) ? f * parseFloat(b) / 100 + (g || 0) : parseFloat(b)
      },
      removeEvent: E,
      splat: function(b) {
        return G(b) ? b : [b]
      },
      stableSort: function(b, f) {
        const c = b.length;
        let g, z;
        for (z = 0; z < c; z++) b[z].safeI = z;
        b.sort(function(b, c) {
          g = f(b, c);
          return 0 === g ? b.safeI - c.safeI : g
        });
        for (z = 0; z < c; z++) delete b[z].safeI
      },
      syncTimeout: function(b, f, g) {
        if (0 < f) return setTimeout(b, f, g);
        b.call(0, g);
        return -1
      },
      timeUnits: {
        millisecond: 1,
        second: 1E3,
        minute: 6E4,
        hour: 36E5,
        day: 864E5,
        week: 6048E5,
        month: 24192E5,
        year: 314496E5
      },
      uniqueKey: b,
      useSerialIds: function(b) {
        return g = k(b, g)
      },
      wrap: function(b, f, g) {
        const c = b[f];
        b[f] = function() {
          const b = arguments,
            f = this;
          return g.apply(this, [function() {
            return c.apply(f, arguments.length ? arguments : b)
          }].concat([].slice.call(arguments)))
        }
      }
    };
    "";
    return w
  });
  M(a, "Core/Chart/ChartDefaults.js", [], function() {
    return {
      alignThresholds: !1,
      panning: {
        enabled: !1,
        type: "x"
      },
      styledMode: !1,
      borderRadius: 0,
      colorCount: 10,
      allowMutatingData: !0,
      ignoreHiddenSeries: !0,
      spacing: [10, 10, 15, 10],
      resetZoomButton: {
        theme: {
          zIndex: 6
        },
        position: {
          align: "right",
          x: -10,
          y: 10
        }
      },
      reflow: !0,
      type: "line",
      zoomBySingleTouch: !1,
      zooming: {
        singleTouch: !1,
        resetButton: {
          theme: {
            zIndex: 6
          },
          position: {
            align: "right",
            x: -10,
            y: 10
          }
        }
      },
      width: null,
      height: null,
      borderColor: "#334eff",
      backgroundColor: "#ffffff",
      plotBorderColor: "#cccccc"
    }
  });
  M(a, "Core/Color/Color.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, A) {
    const {
      isNumber: u,
      merge: I,
      pInt: F
    } = A;
    class G {
      static parse(a) {
        return a ? new G(a) : G.None
      }
      constructor(u) {
        this.rgba = [NaN, NaN, NaN, NaN];
        this.input = u;
        const B = a.Color;
        if (B && B !== G) return new B(u);
        this.init(u)
      }
      init(a) {
        let B;
        let t;
        if ("object" === typeof a && "undefined" !== typeof a.stops) this.stops = a.stops.map(d => new G(d[1]));
        else if ("string" === typeof a) {
          this.input = a = G.names[a.toLowerCase()] || a;
          if ("#" === a.charAt(0)) {
            var r = a.length;
            var d = parseInt(a.substr(1), 16);
            7 === r ? B = [(d & 16711680) >> 16, (d & 65280) >> 8, d & 255, 1] : 4 === r && (B = [(d & 3840) >> 4 | (d & 3840) >> 8, (d & 240) >> 4 | d & 240, (d & 15) << 4 | d & 15, 1])
          }
          if (!B)
            for (d = G.parsers.length; d-- && !B;) t = G.parsers[d],
              (r = t.regex.exec(a)) && (B = t.parse(r))
        }
        B && (this.rgba = B)
      }
      get(a) {
        const B = this.input,
          t = this.rgba;
        if ("object" === typeof B && "undefined" !== typeof this.stops) {
          const r = I(B);
          r.stops = [].slice.call(r.stops);
          this.stops.forEach((d, p) => {
            r.stops[p] = [r.stops[p][0], d.get(a)]
          });
          return r
        }
        return t && u(t[0]) ? "rgb" === a || !a && 1 === t[3] ? "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")" : "a" === a ? `${t[3]}` : "rgba(" + t.join(",") + ")" : B
      }
      brighten(a) {
        const B = this.rgba;
        if (this.stops) this.stops.forEach(function(t) {
          t.brighten(a)
        });
        else if (u(a) && 0 !== a)
          for (let t =
              0; 3 > t; t++) B[t] += F(255 * a), 0 > B[t] && (B[t] = 0), 255 < B[t] && (B[t] = 255);
        return this
      }
      setOpacity(a) {
        this.rgba[3] = a;
        return this
      }
      tweenTo(a, B) {
        const t = this.rgba,
          r = a.rgba;
        if (!u(t[0]) || !u(r[0])) return a.input || "none";
        a = 1 !== r[3] || 1 !== t[3];
        return (a ? "rgba(" : "rgb(") + Math.round(r[0] + (t[0] - r[0]) * (1 - B)) + "," + Math.round(r[1] + (t[1] - r[1]) * (1 - B)) + "," + Math.round(r[2] + (t[2] - r[2]) * (1 - B)) + (a ? "," + (r[3] + (t[3] - r[3]) * (1 - B)) : "") + ")"
      }
    }
    G.names = {
      white: "#ffffff",
      black: "#000000"
    };
    G.parsers = [{
      regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
      parse: function(a) {
        return [F(a[1]), F(a[2]), F(a[3]), parseFloat(a[4], 10)]
      }
    }, {
      regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
      parse: function(a) {
        return [F(a[1]), F(a[2]), F(a[3]), 1]
      }
    }];
    G.None = new G("");
    "";
    return G
  });
  M(a, "Core/Color/Palettes.js", [], function() {
    return {
      colors: "#2caffe #544fc5 #00e272 #fe6a35 #6b8abc #d568fb #2ee0ca #fa4b42 #feb56a #91e8e1".split(" ")
    }
  });
  M(a, "Core/Time.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, A) {
    const {
      win: u
    } = a, {
      defined: I,
      error: F,
      extend: G,
      isObject: C,
      merge: B,
      objectEach: t,
      pad: r,
      pick: d,
      splat: p,
      timeUnits: m
    } = A, k = a.isSafari && u.Intl && u.Intl.DateTimeFormat.prototype.formatRange, v = a.isSafari && u.Intl && !u.Intl.DateTimeFormat.prototype.formatRange;
    class n {
      constructor(h) {
        this.options = {};
        this.variableTimezone = this.useUTC = !1;
        this.Date = u.Date;
        this.getTimezoneOffset = this.timezoneOffsetFunction();
        this.update(h)
      }
      get(h, k) {
        if (this.variableTimezone || this.timezoneOffset) {
          const n = k.getTime(),
            d = n - this.getTimezoneOffset(k);
          k.setTime(d);
          h = k["getUTC" + h]();
          k.setTime(n);
          return h
        }
        return this.useUTC ? k["getUTC" + h]() : k["get" + h]()
      }
      set(h, n, d) {
        if (this.variableTimezone || this.timezoneOffset) {
          if ("Milliseconds" === h || "Seconds" === h || "Minutes" === h && 0 === this.getTimezoneOffset(n) % 36E5) return n["setUTC" + h](d);
          var D = this.getTimezoneOffset(n);
          D = n.getTime() - D;
          n.setTime(D);
          n["setUTC" + h](d);
          h = this.getTimezoneOffset(n);
          D = n.getTime() + h;
          return n.setTime(D)
        }
        return this.useUTC || k && "FullYear" === h ? n["setUTC" + h](d) : n["set" + h](d)
      }
      update(h = {}) {
        const n = d(h.useUTC, !0);
        this.options = h = B(!0, this.options,
          h);
        this.Date = h.Date || u.Date || Date;
        this.timezoneOffset = (this.useUTC = n) && h.timezoneOffset || void 0;
        this.getTimezoneOffset = this.timezoneOffsetFunction();
        this.variableTimezone = n && !(!h.getTimezoneOffset && !h.timezone)
      }
      makeTime(h, n, k, m, e, q) {
        let y, l, w;
        this.useUTC ? (y = this.Date.UTC.apply(0, arguments), l = this.getTimezoneOffset(y), y += l, w = this.getTimezoneOffset(y), l !== w ? y += w - l : l - 36E5 !== this.getTimezoneOffset(y - 36E5) || v || (y -= 36E5)) : y = (new this.Date(h, n, d(k, 1), d(m, 0), d(e, 0), d(q, 0))).getTime();
        return y
      }
      timezoneOffsetFunction() {
        const h =
          this,
          n = this.options,
          k = n.getTimezoneOffset,
          d = n.moment || u.moment;
        if (!this.useUTC) return function(e) {
          return 6E4 * (new Date(e.toString())).getTimezoneOffset()
        };
        if (n.timezone) {
          if (d) return function(e) {
            return 6E4 * -d.tz(e, n.timezone).utcOffset()
          };
          F(25)
        }
        return this.useUTC && k ? function(e) {
          return 6E4 * k(e.valueOf())
        } : function() {
          return 6E4 * (h.timezoneOffset || 0)
        }
      }
      dateFormat(h, n, k) {
        if (!I(n) || isNaN(n)) return a.defaultOptions.lang && a.defaultOptions.lang.invalidDate || "";
        h = d(h, "%Y-%m-%d %H:%M:%S");
        const m = this;
        var e =
          new this.Date(n);
        const q = this.get("Hours", e),
          y = this.get("Day", e),
          l = this.get("Date", e),
          w = this.get("Month", e),
          g = this.get("FullYear", e),
          b = a.defaultOptions.lang,
          c = b && b.weekdays,
          f = b && b.shortWeekdays;
        e = G({
          a: f ? f[y] : c[y].substr(0, 3),
          A: c[y],
          d: r(l),
          e: r(l, 2, " "),
          w: y,
          b: b.shortMonths[w],
          B: b.months[w],
          m: r(w + 1),
          o: w + 1,
          y: g.toString().substr(2, 2),
          Y: g,
          H: r(q),
          k: q,
          I: r(q % 12 || 12),
          l: q % 12 || 12,
          M: r(this.get("Minutes", e)),
          p: 12 > q ? "AM" : "PM",
          P: 12 > q ? "am" : "pm",
          S: r(e.getSeconds()),
          L: r(Math.floor(n % 1E3), 3)
        }, a.dateFormats);
        t(e, function(b,
          c) {
          for (; - 1 !== h.indexOf("%" + c);) h = h.replace("%" + c, "function" === typeof b ? b.call(m, n) : b)
        });
        return k ? h.substr(0, 1).toUpperCase() + h.substr(1) : h
      }
      resolveDTLFormat(h) {
        return C(h, !0) ? h : (h = p(h), {
          main: h[0],
          from: h[1],
          to: h[2]
        })
      }
      getTimeTicks(h, n, k, a) {
        const e = this,
          q = [],
          y = {};
        var l = new e.Date(n);
        const w = h.unitRange,
          g = h.count || 1;
        let b;
        a = d(a, 1);
        if (I(n)) {
          e.set("Milliseconds", l, w >= m.second ? 0 : g * Math.floor(e.get("Milliseconds", l) / g));
          w >= m.second && e.set("Seconds", l, w >= m.minute ? 0 : g * Math.floor(e.get("Seconds", l) / g));
          w >= m.minute &&
            e.set("Minutes", l, w >= m.hour ? 0 : g * Math.floor(e.get("Minutes", l) / g));
          w >= m.hour && e.set("Hours", l, w >= m.day ? 0 : g * Math.floor(e.get("Hours", l) / g));
          w >= m.day && e.set("Date", l, w >= m.month ? 1 : Math.max(1, g * Math.floor(e.get("Date", l) / g)));
          if (w >= m.month) {
            e.set("Month", l, w >= m.year ? 0 : g * Math.floor(e.get("Month", l) / g));
            var c = e.get("FullYear", l)
          }
          w >= m.year && e.set("FullYear", l, c - c % g);
          w === m.week && (c = e.get("Day", l), e.set("Date", l, e.get("Date", l) - c + a + (c < a ? -7 : 0)));
          c = e.get("FullYear", l);
          a = e.get("Month", l);
          const f = e.get("Date",
              l),
            x = e.get("Hours", l);
          n = l.getTime();
          !e.variableTimezone && e.useUTC || !I(k) || (b = k - n > 4 * m.month || e.getTimezoneOffset(n) !== e.getTimezoneOffset(k));
          n = l.getTime();
          for (l = 1; n < k;) q.push(n), n = w === m.year ? e.makeTime(c + l * g, 0) : w === m.month ? e.makeTime(c, a + l * g) : !b || w !== m.day && w !== m.week ? b && w === m.hour && 1 < g ? e.makeTime(c, a, f, x + l * g) : n + w * g : e.makeTime(c, a, f + l * g * (w === m.day ? 1 : 7)), l++;
          q.push(n);
          w <= m.hour && 1E4 > q.length && q.forEach(function(b) {
            0 === b % 18E5 && "000000000" === e.dateFormat("%H%M%S%L", b) && (y[b] = "day")
          })
        }
        q.info = G(h, {
          higherRanks: y,
          totalRange: w * g
        });
        return q
      }
      getDateFormat(h, n, k, d) {
        const e = this.dateFormat("%m-%d %H:%M:%S.%L", n),
          q = {
            millisecond: 15,
            second: 12,
            minute: 9,
            hour: 6,
            day: 3
          };
        let y, l = "millisecond";
        for (y in m) {
          if (h === m.week && +this.dateFormat("%w", n) === k && "00:00:00.000" === e.substr(6)) {
            y = "week";
            break
          }
          if (m[y] > h) {
            y = l;
            break
          }
          if (q[y] && e.substr(q[y]) !== "01-01 00:00:00.000".substr(q[y])) break;
          "week" !== y && (l = y)
        }
        return this.resolveDTLFormat(d[y]).main
      }
    }
    "";
    return n
  });
  M(a, "Core/Defaults.js", [a["Core/Chart/ChartDefaults.js"], a["Core/Color/Color.js"],
    a["Core/Globals.js"], a["Core/Color/Palettes.js"], a["Core/Time.js"], a["Core/Utilities.js"]
  ], function(a, A, H, I, F, G) {
    const {
      isTouchDevice: u,
      svg: B
    } = H, {
      merge: t
    } = G, r = {
      colors: I.colors,
      symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
      lang: {
        loading: "Loading...",
        months: "January February March April May June July August September October November December".split(" "),
        shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
        weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        decimalPoint: ".",
        numericSymbols: "kMGTPE".split(""),
        resetZoom: "Reset zoom",
        resetZoomTitle: "Reset zoom level 1:1",
        thousandsSep: " "
      },
      global: {},
      time: {
        Date: void 0,
        getTimezoneOffset: void 0,
        timezone: void 0,
        timezoneOffset: 0,
        useUTC: !0
      },
      chart: a,
      title: {
        text: "Chart title",
        align: "center",
        margin: 15,
        widthAdjust: -44
      },
      subtitle: {
        text: "",
        align: "center",
        widthAdjust: -44
      },
      caption: {
        margin: 15,
        text: "",
        align: "left",
        verticalAlign: "bottom"
      },
      plotOptions: {},
      legend: {
        enabled: !0,
        align: "center",
        alignColumns: !0,
        className: "highcharts-no-tooltip",
        layout: "horizontal",
        itemMarginBottom: 2,
        itemMarginTop: 2,
        labelFormatter: function() {
          return this.name
        },
        borderColor: "#999999",
        borderRadius: 0,
        navigation: {
          style: {
            fontSize: "0.8em"
          },
          activeColor: "#0022ff",
          inactiveColor: "#cccccc"
        },
        itemStyle: {
          color: "#333333",
          cursor: "pointer",
          fontSize: "0.8em",
          textDecoration: "none",
          textOverflow: "ellipsis"
        },
        itemHoverStyle: {
          color: "#000000"
        },
        itemHiddenStyle: {
          color: "#666666",
          textDecoration: "line-through"
        },
        shadow: !1,
        itemCheckboxStyle: {
          position: "absolute",
          width: "13px",
          height: "13px"
        },
        squareSymbol: !0,
        symbolPadding: 5,
        verticalAlign: "bottom",
        x: 0,
        y: 0,
        title: {
          style: {
            fontSize: "0.8em",
            fontWeight: "bold"
          }
        }
      },
      loading: {
        labelStyle: {
          fontWeight: "bold",
          position: "relative",
          top: "45%"
        },
        style: {
          position: "absolute",
          backgroundColor: "#ffffff",
          opacity: .5,
          textAlign: "center"
        }
      },
      tooltip: {
        enabled: !0,
        animation: B,
        borderRadius: 3,
        dateTimeLabelFormats: {
          millisecond: "%A, %e %b, %H:%M:%S.%L",
          second: "%A, %e %b, %H:%M:%S",
          minute: "%A, %e %b, %H:%M",
          hour: "%A, %e %b, %H:%M",
          day: "%A, %e %b %Y",
          week: "Week from %A, %e %b %Y",
          month: "%B %Y",
          year: "%Y"
        },
        footerFormat: "",
        headerShape: "callout",
        hideDelay: 500,
        padding: 8,
        shape: "callout",
        shared: !1,
        snap: u ? 25 : 10,
        headerFormat: '<span style="font-size: 0.8em">{point.key}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
        backgroundColor: "#ffffff",
        borderWidth: void 0,
        shadow: !0,
        stickOnContact: !1,
        style: {
          color: "#333333",
          cursor: "default",
          fontSize: "0.8em"
        },
        useHTML: !1
      },
      credits: {
        enabled: !0,
        href: "https://www.highcharts.com?credits",
        position: {
          align: "right",
          x: -10,
          verticalAlign: "bottom",
          y: -5
        },
        style: {
          cursor: "pointer",
          color: "#999999",
          fontSize: "0.6em"
        },
        text: "Highcharts.com"
      }
    };
    r.chart.styledMode = !1;
    "";
    const d = new F(r.time);
    a = {
      defaultOptions: r,
      defaultTime: d,
      getOptions: function() {
        return r
      },
      setOptions: function(a) {
        t(!0, r, a);
        if (a.time || a.global) H.time ? H.time.update(t(r.global, r.time, a.global, a.time)) : H.time = d;
        return r
      }
    };
    "";
    return a
  });
  M(a, "Core/Animation/Fx.js", [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      parse: u
    } =
    a, {
      win: F
    } = A, {
      isNumber: G,
      objectEach: C
    } = H;
    class B {
      constructor(a, r, d) {
        this.pos = NaN;
        this.options = r;
        this.elem = a;
        this.prop = d
      }
      dSetter() {
        var a = this.paths;
        const r = a && a[0];
        a = a && a[1];
        const d = this.now || 0;
        let p = [];
        if (1 !== d && r && a)
          if (r.length === a.length && 1 > d)
            for (let m = 0; m < a.length; m++) {
              const k = r[m],
                v = a[m],
                n = [];
              for (let h = 0; h < v.length; h++) {
                const m = k[h],
                  a = v[h];
                G(m) && G(a) && ("A" !== v[0] || 4 !== h && 5 !== h) ? n[h] = m + d * (a - m) : n[h] = a
              }
              p.push(n)
            } else p = a;
          else p = this.toD || [];
        this.elem.attr("d", p, void 0, !0)
      }
      update() {
        const a = this.elem,
          r = this.prop,
          d = this.now,
          p = this.options.step;
        if (this[r + "Setter"]) this[r + "Setter"]();
        else a.attr ? a.element && a.attr(r, d, null, !0) : a.style[r] = d + this.unit;
        p && p.call(a, d, this)
      }
      run(a, r, d) {
        const p = this,
          m = p.options,
          k = function(h) {
            return k.stopped ? !1 : p.step(h)
          },
          v = F.requestAnimationFrame || function(h) {
            setTimeout(h, 13)
          },
          n = function() {
            for (let h = 0; h < B.timers.length; h++) B.timers[h]() || B.timers.splice(h--, 1);
            B.timers.length && v(n)
          };
        a !== r || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = a, this.end =
          r, this.unit = d, this.now = this.start, this.pos = 0, k.elem = this.elem, k.prop = this.prop, k() && 1 === B.timers.push(k) && v(n)) : (delete m.curAnim[this.prop], m.complete && 0 === Object.keys(m.curAnim).length && m.complete.call(this.elem))
      }
      step(a) {
        const r = +new Date,
          d = this.options,
          p = this.elem,
          m = d.complete,
          k = d.duration,
          v = d.curAnim;
        let n;
        p.attr && !p.element ? a = !1 : a || r >= k + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), n = v[this.prop] = !0, C(v, function(h) {
          !0 !== h && (n = !1)
        }), n && m && m.call(p), a = !1) : (this.pos = d.easing((r - this.startTime) /
          k), this.now = this.start + (this.end - this.start) * this.pos, this.update(), a = !0);
        return a
      }
      initPath(a, r, d) {
        function p(e, q) {
          for (; e.length < L;) {
            var h = e[0];
            const l = q[L - e.length];
            l && "M" === h[0] && (e[0] = "C" === l[0] ? ["C", h[1], h[2], h[1], h[2], h[1], h[2]] : ["L", h[1], h[2]]);
            e.unshift(h);
            n && (h = e.pop(), e.push(e[e.length - 1], h))
          }
        }

        function m(e, q) {
          for (; e.length < L;)
            if (q = e[Math.floor(e.length / h) - 1].slice(), "C" === q[0] && (q[1] = q[5], q[2] = q[6]), n) {
              const n = e[Math.floor(e.length / h)].slice();
              e.splice(e.length / 2, 0, q, n)
            } else e.push(q)
        }
        const k =
          a.startX,
          v = a.endX;
        d = d.slice();
        const n = a.isArea,
          h = n ? 2 : 1;
        let D, L, E;
        r = r && r.slice();
        if (!r) return [d, d];
        if (k && v && v.length) {
          for (a = 0; a < k.length; a++)
            if (k[a] === v[0]) {
              D = a;
              break
            } else if (k[0] === v[v.length - k.length + a]) {
            D = a;
            E = !0;
            break
          } else if (k[k.length - 1] === v[v.length - k.length + a]) {
            D = k.length - a;
            break
          }
          "undefined" === typeof D && (r = [])
        }
        r.length && G(D) && (L = d.length + D * h, E ? (p(r, d), m(d, r)) : (p(d, r), m(r, d)));
        return [r, d]
      }
      fillSetter() {
        B.prototype.strokeSetter.apply(this, arguments)
      }
      strokeSetter() {
        this.elem.attr(this.prop, u(this.start).tweenTo(u(this.end),
          this.pos), void 0, !0)
      }
    }
    B.timers = [];
    return B
  });
  M(a, "Core/Animation/AnimationUtilities.js", [a["Core/Animation/Fx.js"], a["Core/Utilities.js"]], function(a, A) {
    function u(a) {
      return t(a) ? r({
        duration: 500,
        defer: 0
      }, a) : {
        duration: a ? 500 : 0,
        defer: 0
      }
    }

    function I(d, k) {
      let m = a.timers.length;
      for (; m--;) a.timers[m].elem !== d || k && k !== a.timers[m].prop || (a.timers[m].stopped = !0)
    }
    const {
      defined: F,
      getStyle: G,
      isArray: C,
      isNumber: B,
      isObject: t,
      merge: r,
      objectEach: d,
      pick: p
    } = A;
    return {
      animate: function(m, k, v) {
        let n, h = "",
          D, p, E;
        t(v) || (E =
          arguments, v = {
            duration: E[2],
            easing: E[3],
            complete: E[4]
          });
        B(v.duration) || (v.duration = 400);
        v.easing = "function" === typeof v.easing ? v.easing : Math[v.easing] || Math.easeInOutSine;
        v.curAnim = r(k);
        d(k, function(e, q) {
          I(m, q);
          p = new a(m, v, q);
          D = void 0;
          "d" === q && C(k.d) ? (p.paths = p.initPath(m, m.pathArray, k.d), p.toD = k.d, n = 0, D = 1) : m.attr ? n = m.attr(q) : (n = parseFloat(G(m, q)) || 0, "opacity" !== q && (h = "px"));
          D || (D = e);
          "string" === typeof D && D.match("px") && (D = D.replace(/px/g, ""));
          p.run(n, D, h)
        })
      },
      animObject: u,
      getDeferredAnimation: function(a,
        k, d) {
        const n = u(k);
        let h = 0,
          m = 0;
        (d ? [d] : a.series).forEach(a => {
          a = u(a.options.animation);
          h = k && F(k.defer) ? n.defer : Math.max(h, a.duration + a.defer);
          m = Math.min(n.duration, a.duration)
        });
        a.renderer.forExport && (h = 0);
        return {
          defer: Math.max(0, h - m),
          duration: Math.min(h, m)
        }
      },
      setAnimation: function(a, k) {
        k.renderer.globalAnimation = p(a, k.options.chart.animation, !0)
      },
      stop: I
    }
  });
  M(a, "Core/Renderer/HTML/AST.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, A) {
    const {
      SVG_NS: u,
      win: I
    } = a, {
      attr: F,
      createElement: G,
      css: C,
      error: B,
      isFunction: t,
      isString: r,
      objectEach: d,
      splat: p
    } = A;
    ({
      trustedTypes: A
    } = I);
    const m = A && t(A.createPolicy) && A.createPolicy("highcharts", {
      createHTML: h => h
    });
    A = m ? m.createHTML("") : "";
    try {
      var k = !!(new DOMParser).parseFromString(A, "text/html")
    } catch (h) {
      k = !1
    }
    const v = k;
    class n {
      static filterUserAttributes(h) {
        d(h, (a, k) => {
          let d = !0; - 1 === n.allowedAttributes.indexOf(k) && (d = !1); - 1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(k) && (d = r(a) && n.allowedReferences.some(e => 0 === a.indexOf(e)));
          d || (B(33, !1, void 0, {
            "Invalid attribute in config": `${k}`
          }), delete h[k]);
          r(a) && h[k] && (h[k] = a.replace(/</g, "&lt;"))
        });
        return h
      }
      static parseStyle(h) {
        return h.split(";").reduce((h, n) => {
          n = n.split(":").map(e => e.trim());
          const k = n.shift();
          k && n.length && (h[k.replace(/-([a-z])/g, e => e[1].toUpperCase())] = n.join(":"));
          return h
        }, {})
      }
      static setElementHTML(h, k) {
        h.innerHTML = n.emptyHTML;
        k && (new n(k)).addToDOM(h)
      }
      constructor(h) {
        this.nodes = "string" === typeof h ? this.parseMarkup(h) : h
      }
      addToDOM(h) {
        function k(h, m) {
          let e;
          p(h).forEach(function(q) {
            var h =
              q.tagName;
            const l = q.textContent ? a.doc.createTextNode(q.textContent) : void 0,
              w = n.bypassHTMLFiltering;
            let g;
            if (h)
              if ("#text" === h) g = l;
              else if (-1 !== n.allowedTags.indexOf(h) || w) {
              h = a.doc.createElementNS("svg" === h ? u : m.namespaceURI || u, h);
              const b = q.attributes || {};
              d(q, function(c, f) {
                "tagName" !== f && "attributes" !== f && "children" !== f && "style" !== f && "textContent" !== f && (b[f] = c)
              });
              F(h, w ? b : n.filterUserAttributes(b));
              q.style && C(h, q.style);
              l && h.appendChild(l);
              k(q.children || [], h);
              g = h
            } else B(33, !1, void 0, {
              "Invalid tagName in config": h
            });
            g && m.appendChild(g);
            e = g
          });
          return e
        }
        return k(this.nodes, h)
      }
      parseMarkup(h) {
        const k = [];
        h = h.trim().replace(/ style=(["'])/g, " data-style=$1");
        if (v) h = (new DOMParser).parseFromString(m ? m.createHTML(h) : h, "text/html");
        else {
          const n = G("div");
          n.innerHTML = h;
          h = {
            body: n
          }
        }
        const a = (h, e) => {
          var q = h.nodeName.toLowerCase();
          const k = {
            tagName: q
          };
          "#text" === q && (k.textContent = h.textContent || "");
          if (q = h.attributes) {
            const l = {};
            [].forEach.call(q, e => {
              "data-style" === e.name ? k.style = n.parseStyle(e.value) : l[e.name] = e.value
            });
            k.attributes =
              l
          }
          if (h.childNodes.length) {
            const l = [];
            [].forEach.call(h.childNodes, e => {
              a(e, l)
            });
            l.length && (k.children = l)
          }
          e.push(k)
        };
        [].forEach.call(h.body.childNodes, h => a(h, k));
        return k
      }
    }
    n.allowedAttributes = "alt aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill flood-color flood-opacity height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 xlink:href y y1 y2 zIndex".split(" ");
    n.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
    n.allowedTags = "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feDropShadow feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead title tbody tspan td th tr u ul #text".split(" ");
    n.emptyHTML = A;
    n.bypassHTMLFiltering = !1;
    "";
    return n
  });
  M(a, "Core/FormatUtilities.js", [a["Core/Defaults.js"], a["Core/Utilities.js"]], function(a, A) {
    function u(a, d, p, m) {
      a = +a || 0;
      d = +d;
      const k = I.lang;
      var v = (a.toString().split(".")[1] || "").split("e")[0].length;
      const n = a.toString().split("e"),
        h = d;
      if (-1 === d) d = Math.min(v, 20);
      else if (!C(d)) d = 2;
      else if (d && n[1] && 0 > n[1]) {
        var r = d + +n[1];
        0 <= r ? (n[0] = (+n[0]).toExponential(r).split("e")[0], d = r) : (n[0] = n[0].split(".")[0] || 0, a = 20 > d ? (n[0] * Math.pow(10, n[1])).toFixed(d) : 0, n[1] = 0)
      }
      r = (Math.abs(n[1] ? n[0] : a) + Math.pow(10,
        -Math.max(d, v) - 1)).toFixed(d);
      v = String(t(r));
      const L = 3 < v.length ? v.length % 3 : 0;
      p = B(p, k.decimalPoint);
      m = B(m, k.thousandsSep);
      a = (0 > a ? "-" : "") + (L ? v.substr(0, L) + m : "");
      a = 0 > +n[1] && !h ? "0" : a + v.substr(L).replace(/(\d{3})(?=\d)/g, "$1" + m);
      d && (a += p + r.slice(-d));
      n[1] && 0 !== +a && (a += "e" + n[1]);
      return a
    }
    const {
      defaultOptions: I,
      defaultTime: F
    } = a, {
      getNestedProperty: G,
      isNumber: C,
      pick: B,
      pInt: t
    } = A;
    return {
      dateFormat: function(a, d, p) {
        return F.dateFormat(a, d, p)
      },
      format: function(a, d, p) {
        var m = "{";
        let k = !1;
        let v;
        const n = /f$/,
          h = /\.([0-9])/,
          r = I.lang,
          L = p && p.time || F;
        p = p && p.numberFormatter || u;
        const E = [];
        for (; a;) {
          v = a.indexOf(m);
          if (-1 === v) break;
          var e = a.slice(0, v);
          if (k) {
            e = e.split(":");
            m = G(e.shift() || "", d);
            if (e.length && "number" === typeof m)
              if (e = e.join(":"), n.test(e)) {
                const q = parseInt((e.match(h) || ["", "-1"])[1], 10);
                null !== m && (m = p(m, q, r.decimalPoint, -1 < e.indexOf(",") ? r.thousandsSep : ""))
              } else m = L.dateFormat(e, m);
            E.push(m)
          } else E.push(e);
          a = a.slice(v + 1);
          m = (k = !k) ? "}" : "{"
        }
        E.push(a);
        return E.join("")
      },
      numberFormat: u
    }
  });
  M(a, "Core/Renderer/RendererUtilities.js",
    [a["Core/Utilities.js"]],
    function(a) {
      const {
        clamp: u,
        pick: H,
        stableSort: I
      } = a;
      var F;
      (function(a) {
        function A(a, t, r) {
          const d = a;
          var p = d.reducedLen || t,
            m = (a, h) => (h.rank || 0) - (a.rank || 0);
          const k = (a, h) => a.target - h.target;
          let v, n = !0,
            h = [],
            D = 0;
          for (v = a.length; v--;) D += a[v].size;
          if (D > p) {
            I(a, m);
            for (D = v = 0; D <= p;) D += a[v].size, v++;
            h = a.splice(v - 1, a.length)
          }
          I(a, k);
          for (a = a.map(a => ({
              size: a.size,
              targets: [a.target],
              align: H(a.align, .5)
            })); n;) {
            for (v = a.length; v--;) p = a[v], m = (Math.min.apply(0, p.targets) + Math.max.apply(0, p.targets)) /
              2, p.pos = u(m - p.size * p.align, 0, t - p.size);
            v = a.length;
            for (n = !1; v--;) 0 < v && a[v - 1].pos + a[v - 1].size > a[v].pos && (a[v - 1].size += a[v].size, a[v - 1].targets = a[v - 1].targets.concat(a[v].targets), a[v - 1].align = .5, a[v - 1].pos + a[v - 1].size > t && (a[v - 1].pos = t - a[v - 1].size), a.splice(v, 1), n = !0)
          }
          d.push.apply(d, h);
          v = 0;
          a.some(a => {
            let h = 0;
            return (a.targets || []).some(() => {
              d[v].pos = a.pos + h;
              if ("undefined" !== typeof r && Math.abs(d[v].pos - d[v].target) > r) return d.slice(0, v + 1).forEach(e => delete e.pos), d.reducedLen = (d.reducedLen || t) - .1 * t, d.reducedLen >
                .1 * t && A(d, t, r), !0;
              h += d[v].size;
              v++;
              return !1
            })
          });
          I(d, k);
          return d
        }
        a.distribute = A
      })(F || (F = {}));
      return F
    });
  M(a, "Core/Renderer/SVG/SVGElement.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, A, H, I) {
    const {
      animate: u,
      animObject: G,
      stop: C
    } = a, {
      deg2rad: B,
      doc: t,
      svg: r,
      SVG_NS: d,
      win: p
    } = H, {
      addEvent: m,
      attr: k,
      createElement: v,
      css: n,
      defined: h,
      erase: D,
      extend: L,
      fireEvent: E,
      isArray: e,
      isFunction: q,
      isObject: y,
      isString: l,
      merge: w,
      objectEach: g,
      pick: b,
      pInt: c,
      syncTimeout: f,
      uniqueKey: x
    } = I;
    class J {
      constructor() {
        this.element = void 0;
        this.onEvents = {};
        this.opacity = 1;
        this.renderer = void 0;
        this.SVG_NS = d
      }
      _defaultGetter(c) {
        c = b(this[c + "Value"], this[c], this.element ? this.element.getAttribute(c) : null, 0);
        /^[\-0-9\.]+$/.test(c) && (c = parseFloat(c));
        return c
      }
      _defaultSetter(b, c, f) {
        f.setAttribute(c, b)
      }
      add(b) {
        const c = this.renderer,
          f = this.element;
        let g;
        b && (this.parentGroup = b);
        "undefined" !== typeof this.textStr && "text" === this.element.nodeName && c.buildText(this);
        this.added = !0;
        if (!b || b.handleZ || this.zIndex) g = this.zIndexSetter();
        g || (b ? b.element : c.box).appendChild(f);
        if (this.onAdd) this.onAdd();
        return this
      }
      addClass(b, c) {
        const f = c ? "" : this.attr("class") || "";
        b = (b || "").split(/ /g).reduce(function(b, c) {
          -1 === f.indexOf(c) && b.push(c);
          return b
        }, f ? [f] : []).join(" ");
        b !== f && this.attr("class", b);
        return this
      }
      afterSetters() {
        this.doTransform && (this.updateTransform(), this.doTransform = !1)
      }
      align(c, f, g) {
        const z = {};
        var N = this.renderer,
          e = N.alignedObjects,
          q;
        let x, a;
        if (c) {
          if (this.alignOptions =
            c, this.alignByTranslate = f, !g || l(g)) this.alignTo = q = g || "renderer", D(e, this), e.push(this), g = void 0
        } else c = this.alignOptions, f = this.alignByTranslate, q = this.alignTo;
        g = b(g, N[q], "scrollablePlotBox" === q ? N.plotBox : void 0, N);
        q = c.align;
        const K = c.verticalAlign;
        N = (g.x || 0) + (c.x || 0);
        e = (g.y || 0) + (c.y || 0);
        "right" === q ? x = 1 : "center" === q && (x = 2);
        x && (N += (g.width - (c.width || 0)) / x);
        z[f ? "translateX" : "x"] = Math.round(N);
        "bottom" === K ? a = 1 : "middle" === K && (a = 2);
        a && (e += (g.height - (c.height || 0)) / a);
        z[f ? "translateY" : "y"] = Math.round(e);
        this[this.placed ? "animate" : "attr"](z);
        this.placed = !0;
        this.alignAttr = z;
        return this
      }
      alignSetter(b) {
        const c = {
          left: "start",
          center: "middle",
          right: "end"
        };
        c[b] && (this.alignValue = b, this.element.setAttribute("text-anchor", c[b]))
      }
      animate(c, l, e) {
        const z = G(b(l, this.renderer.globalAnimation, !0));
        l = z.defer;
        t.hidden && (z.duration = 0);
        0 !== z.duration ? (e && (z.complete = e), f(() => {
          this.element && u(this, c, z)
        }, l)) : (this.attr(c, void 0, e || z.complete), g(c, function(b, c) {
          z.step && z.step.call(this, b, {
            prop: c,
            pos: 1,
            elem: this
          })
        }, this));
        return this
      }
      applyTextOutline(b) {
        const c = this.element; - 1 !== b.indexOf("contrast") && (b = b.replace(/contrast/g, this.renderer.getContrast(c.style.fill)));
        var f = b.split(" ");
        b = f[f.length - 1];
        if ((f = f[0]) && "none" !== f && H.svg) {
          this.fakeTS = !0;
          f = f.replace(/(^[\d\.]+)(.*?)$/g, function(b, c, f) {
            return 2 * Number(c) + f
          });
          this.removeTextOutline();
          const g = t.createElementNS(d, "tspan");
          k(g, {
            "class": "highcharts-text-outline",
            fill: b,
            stroke: b,
            "stroke-width": f,
            "stroke-linejoin": "round"
          });
          b = c.querySelector("textPath") || c;
          [].forEach.call(b.childNodes,
            b => {
              const c = b.cloneNode(!0);
              c.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach(b => c.removeAttribute(b));
              g.appendChild(c)
            });
          let z = 0;
          [].forEach.call(b.querySelectorAll("text tspan"), b => {
            z += Number(b.getAttribute("dy"))
          });
          f = t.createElementNS(d, "tspan");
          f.textContent = "\u200b";
          k(f, {
            x: Number(c.getAttribute("x")),
            dy: -z
          });
          g.appendChild(f);
          b.insertBefore(g, b.firstChild)
        }
      }
      attr(b, c, f, l) {
        const z = this.element,
          e = J.symbolCustomAttribs;
        let q, x, a = this,
          K, w;
        "string" === typeof b && "undefined" !== typeof c &&
          (q = b, b = {}, b[q] = c);
        "string" === typeof b ? a = (this[b + "Getter"] || this._defaultGetter).call(this, b, z) : (g(b, function(c, f) {
          K = !1;
          l || C(this, f);
          this.symbolName && -1 !== e.indexOf(f) && (x || (this.symbolAttr(b), x = !0), K = !0);
          !this.rotation || "x" !== f && "y" !== f || (this.doTransform = !0);
          K || (w = this[f + "Setter"] || this._defaultSetter, w.call(this, c, f, z))
        }, this), this.afterSetters());
        f && f.call(this);
        return a
      }
      clip(b) {
        return this.attr("clip-path", b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none")
      }
      crisp(b, c) {
        c = c || b.strokeWidth || 0;
        const f =
          Math.round(c) % 2 / 2;
        b.x = Math.floor(b.x || this.x || 0) + f;
        b.y = Math.floor(b.y || this.y || 0) + f;
        b.width = Math.floor((b.width || this.width || 0) - 2 * f);
        b.height = Math.floor((b.height || this.height || 0) - 2 * f);
        h(b.strokeWidth) && (b.strokeWidth = c);
        return b
      }
      complexColor(b, c, f) {
        const l = this.renderer;
        let z, O, q, a, J, K, n, k, d, y, m = [],
          p;
        E(this.renderer, "complexColor", {
          args: arguments
        }, function() {
          b.radialGradient ? O = "radialGradient" : b.linearGradient && (O = "linearGradient");
          if (O) {
            q = b[O];
            J = l.gradients;
            K = b.stops;
            d = f.radialReference;
            e(q) && (b[O] =
              q = {
                x1: q[0],
                y1: q[1],
                x2: q[2],
                y2: q[3],
                gradientUnits: "userSpaceOnUse"
              });
            "radialGradient" === O && d && !h(q.gradientUnits) && (a = q, q = w(q, l.getRadialAttr(d, a), {
              gradientUnits: "userSpaceOnUse"
            }));
            g(q, function(b, c) {
              "id" !== c && m.push(c, b)
            });
            g(K, function(b) {
              m.push(b)
            });
            m = m.join(",");
            if (J[m]) y = J[m].attr("id");
            else {
              q.id = y = x();
              const b = J[m] = l.createElement(O).attr(q).add(l.defs);
              b.radAttr = a;
              b.stops = [];
              K.forEach(function(c) {
                0 === c[1].indexOf("rgba") ? (z = A.parse(c[1]), n = z.get("rgb"), k = z.get("a")) : (n = c[1], k = 1);
                c = l.createElement("stop").attr({
                  offset: c[0],
                  "stop-color": n,
                  "stop-opacity": k
                }).add(b);
                b.stops.push(c)
              })
            }
            p = "url(" + l.url + "#" + y + ")";
            f.setAttribute(c, p);
            f.gradient = m;
            b.toString = function() {
              return p
            }
          }
        })
      }
      css(b) {
        const f = this.styles,
          l = {},
          e = this.element;
        let z, q = !f;
        b.color && (b.fill = b.color);
        f && g(b, function(b, c) {
          f && f[c] !== b && (l[c] = b, q = !0)
        });
        if (q) {
          f && (b = L(f, l));
          null === b.width || "auto" === b.width ? delete this.textWidth : "text" === e.nodeName.toLowerCase() && b.width && (z = this.textWidth = c(b.width));
          this.styles = b;
          z && !r && this.renderer.forExport && delete b.width;
          const g =
            w(b);
          e.namespaceURI === this.SVG_NS && ["textOutline", "textOverflow", "width"].forEach(b => g && delete g[b]);
          n(e, g)
        }
        this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), b.textOutline && this.applyTextOutline(b.textOutline));
        return this
      }
      dashstyleSetter(f) {
        let g = this["stroke-width"];
        "inherit" === g && (g = 1);
        if (f = f && f.toLowerCase()) {
          const l = f.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g,
            "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
          for (f = l.length; f--;) l[f] = "" + c(l[f]) * b(g, NaN);
          f = l.join(",").replace(/NaN/g, "none");
          this.element.setAttribute("stroke-dasharray", f)
        }
      }
      destroy() {
        const b = this;
        var c = b.element || {};
        const f = b.renderer;
        var l = c.ownerSVGElement;
        let e = "SPAN" === c.nodeName && b.parentGroup || void 0;
        c.onclick = c.onmouseout = c.onmouseover = c.onmousemove = c.point = null;
        C(b);
        if (b.clipPath && l) {
          const c = b.clipPath;
          [].forEach.call(l.querySelectorAll("[clip-path],[CLIP-PATH]"), function(b) {
            -1 <
              b.getAttribute("clip-path").indexOf(c.element.id) && b.removeAttribute("clip-path")
          });
          b.clipPath = c.destroy()
        }
        if (b.stops) {
          for (l = 0; l < b.stops.length; l++) b.stops[l].destroy();
          b.stops.length = 0;
          b.stops = void 0
        }
        for (b.safeRemoveChild(c); e && e.div && 0 === e.div.childNodes.length;) c = e.parentGroup, b.safeRemoveChild(e.div), delete e.div, e = c;
        b.alignTo && D(f.alignedObjects, b);
        g(b, function(c, f) {
          b[f] && b[f].parentGroup === b && b[f].destroy && b[f].destroy();
          delete b[f]
        })
      }
      dSetter(b, c, f) {
        e(b) && ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)),
          this.pathArray = b, b = b.reduce((b, c, f) => c && c.join ? (f ? b + " " : "") + c.join(" ") : (c || "").toString(), ""));
        /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
        this[c] !== b && (f.setAttribute(c, b), this[c] = b)
      }
      fadeOut(c) {
        const f = this;
        f.animate({
          opacity: 0
        }, {
          duration: b(c, 150),
          complete: function() {
            f.hide()
          }
        })
      }
      fillSetter(b, c, f) {
        "string" === typeof b ? f.setAttribute(c, b) : b && this.complexColor(b, c, f)
      }
      getBBox(c, f) {
        const {
          alignValue: g,
          element: l,
          renderer: e,
          styles: z,
          textStr: x
        } = this, {
          cache: a,
          cacheKeys: w
        } = e;
        var K = l.namespaceURI === this.SVG_NS;
        f =
          b(f, this.rotation, 0);
        var k = e.styledMode ? l && J.prototype.getStyle.call(l, "font-size") : z && z.fontSize;
        let d;
        let y;
        h(x) && (y = x.toString(), -1 === y.indexOf("<") && (y = y.replace(/[0-9]/g, "0")), y += ["", e.rootFontSize, k, f, this.textWidth, g, z && z.textOverflow, z && z.fontWeight].join());
        y && !c && (d = a[y]);
        if (!d) {
          if (K || e.forExport) {
            try {
              var m = this.fakeTS && function(b) {
                const c = l.querySelector(".highcharts-text-outline");
                c && n(c, {
                  display: b
                })
              };
              q(m) && m("none");
              d = l.getBBox ? L({}, l.getBBox()) : {
                width: l.offsetWidth,
                height: l.offsetHeight,
                x: 0,
                y: 0
              };
              q(m) && m("")
            } catch (fa) {
              ""
            }
            if (!d || 0 > d.width) d = {
              x: 0,
              y: 0,
              width: 0,
              height: 0
            }
          } else d = this.htmlGetBBox();
          m = d.width;
          c = d.height;
          K && (d.height = c = {
            "11px,17": 14,
            "13px,20": 16
          } [`${k||""},${Math.round(c)}`] || c);
          if (f) {
            K = Number(l.getAttribute("y") || 0) - d.y;
            k = {
              right: 1,
              center: .5
            } [g || 0] || 0;
            var p = f * B,
              r = (f - 90) * B,
              v = m * Math.cos(p);
            f = m * Math.sin(p);
            var D = Math.cos(r);
            p = Math.sin(r);
            m = d.x + k * (m - v) + K * D;
            r = m + v;
            D = r - c * D;
            v = D - v;
            K = d.y + K - k * f + K * p;
            k = K + f;
            c = k - c * p;
            f = c - f;
            d.x = Math.min(m, r, D, v);
            d.y = Math.min(K, k, c, f);
            d.width = Math.max(m, r,
              D, v) - d.x;
            d.height = Math.max(K, k, c, f) - d.y
          }
        }
        if (y && ("" === x || 0 < d.height)) {
          for (; 250 < w.length;) delete a[w.shift()];
          a[y] || w.push(y);
          a[y] = d
        }
        return d
      }
      getStyle(b) {
        return p.getComputedStyle(this.element || this, "").getPropertyValue(b)
      }
      hasClass(b) {
        return -1 !== ("" + this.attr("class")).split(" ").indexOf(b)
      }
      hide() {
        return this.attr({
          visibility: "hidden"
        })
      }
      htmlGetBBox() {
        return {
          height: 0,
          width: 0,
          x: 0,
          y: 0
        }
      }
      init(b, c) {
        this.element = "span" === c ? v(c) : t.createElementNS(this.SVG_NS, c);
        this.renderer = b;
        E(this, "afterInit")
      }
      on(b, c) {
        const {
          onEvents: f
        } =
        this;
        if (f[b]) f[b]();
        f[b] = m(this.element, b, c);
        return this
      }
      opacitySetter(b, c, f) {
        this.opacity = b = Number(Number(b).toFixed(3));
        f.setAttribute(c, b)
      }
      removeClass(b) {
        return this.attr("class", ("" + this.attr("class")).replace(l(b) ? new RegExp(`(^| )${b}( |$)`) : b, " ").replace(/ +/g, " ").trim())
      }
      removeTextOutline() {
        const b = this.element.querySelector("tspan.highcharts-text-outline");
        b && this.safeRemoveChild(b)
      }
      safeRemoveChild(b) {
        const c = b.parentNode;
        c && c.removeChild(b)
      }
      setRadialReference(b) {
        const c = this.element.gradient &&
          this.renderer.gradients[this.element.gradient];
        this.element.radialReference = b;
        c && c.radAttr && c.animate(this.renderer.getRadialAttr(b, c.radAttr));
        return this
      }
      setTextPath(b, c) {
        c = w(!0, {
          enabled: !0,
          attributes: {
            dy: -5,
            startOffset: "50%",
            textAnchor: "middle"
          }
        }, c);
        const f = this.renderer.url,
          g = this.text || this,
          l = g.textPath,
          {
            attributes: e,
            enabled: q
          } = c;
        b = b || l && l.path;
        l && l.undo();
        b && q ? (c = m(g, "afterModifyTree", c => {
          if (b && q) {
            let N = b.attr("id");
            N || b.attr("id", N = x());
            var l = {
              x: 0,
              y: 0
            };
            h(e.dx) && (l.dx = e.dx, delete e.dx);
            h(e.dy) &&
              (l.dy = e.dy, delete e.dy);
            g.attr(l);
            this.attr({
              transform: ""
            });
            this.box && (this.box = this.box.destroy());
            l = c.nodes.slice(0);
            c.nodes.length = 0;
            c.nodes[0] = {
              tagName: "textPath",
              attributes: L(e, {
                "text-anchor": e.textAnchor,
                href: `${f}#${N}`
              }),
              children: l
            }
          }
        }), g.textPath = {
          path: b,
          undo: c
        }) : (g.attr({
          dx: 0,
          dy: 0
        }), delete g.textPath);
        this.added && (g.textCache = "", this.renderer.buildText(g));
        return this
      }
      shadow(b) {
        var c;
        const {
          renderer: f
        } = this, g = w(90 === (null === (c = this.parentGroup) || void 0 === c ? void 0 : c.rotation) ? {
          offsetX: -1,
          offsetY: -1
        } : {}, y(b) ? b : {});
        c = f.shadowDefinition(g);
        return this.attr({
          filter: b ? `url(${f.url}#${c})` : "none"
        })
      }
      show(b = !0) {
        return this.attr({
          visibility: b ? "inherit" : "visible"
        })
      } ["stroke-widthSetter"](b, c, f) {
        this[c] = b;
        f.setAttribute(c, b)
      }
      strokeWidth() {
        if (!this.renderer.styledMode) return this["stroke-width"] || 0;
        const b = this.getStyle("stroke-width");
        let f = 0,
          g;
        b.indexOf("px") === b.length - 2 ? f = c(b) : "" !== b && (g = t.createElementNS(d, "rect"), k(g, {
            width: b,
            "stroke-width": 0
          }), this.element.parentNode.appendChild(g), f =
          g.getBBox().width, g.parentNode.removeChild(g));
        return f
      }
      symbolAttr(c) {
        const f = this;
        J.symbolCustomAttribs.forEach(function(g) {
          f[g] = b(c[g], f[g])
        });
        f.attr({
          d: f.renderer.symbols[f.symbolName](f.x, f.y, f.width, f.height, f)
        })
      }
      textSetter(b) {
        b !== this.textStr && (delete this.textPxLength, this.textStr = b, this.added && this.renderer.buildText(this))
      }
      titleSetter(c) {
        const f = this.element,
          g = f.getElementsByTagName("title")[0] || t.createElementNS(this.SVG_NS, "title");
        f.insertBefore ? f.insertBefore(g, f.firstChild) : f.appendChild(g);
        g.textContent = String(b(c, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      }
      toFront() {
        const b = this.element;
        b.parentNode.appendChild(b);
        return this
      }
      translate(b, c) {
        return this.attr({
          translateX: b,
          translateY: c
        })
      }
      updateTransform() {
        const {
          element: c,
          matrix: f,
          rotation: g = 0,
          scaleX: l,
          scaleY: e,
          translateX: q = 0,
          translateY: x = 0
        } = this, a = ["translate(" + q + "," + x + ")"];
        h(f) && a.push("matrix(" + f.join(",") + ")");
        g && a.push("rotate(" + g + " " + b(this.rotationOriginX, c.getAttribute("x"), 0) + " " + b(this.rotationOriginY,
          c.getAttribute("y") || 0) + ")");
        (h(l) || h(e)) && a.push("scale(" + b(l, 1) + " " + b(e, 1) + ")");
        a.length && !(this.text || this).textPath && c.setAttribute("transform", a.join(" "))
      }
      visibilitySetter(b, c, f) {
        "inherit" === b ? f.removeAttribute(c) : this[c] !== b && f.setAttribute(c, b);
        this[c] = b
      }
      xGetter(b) {
        "circle" === this.element.nodeName && ("x" === b ? b = "cx" : "y" === b && (b = "cy"));
        return this._defaultGetter(b)
      }
      zIndexSetter(b, f) {
        var g = this.renderer,
          l = this.parentGroup;
        const e = (l || g).element || g.box,
          q = this.element;
        g = e === g.box;
        let a = !1,
          x;
        var w =
          this.added;
        let K;
        h(b) ? (q.setAttribute("data-z-index", b), b = +b, this[f] === b && (w = !1)) : h(this[f]) && q.removeAttribute("data-z-index");
        this[f] = b;
        if (w) {
          (b = this.zIndex) && l && (l.handleZ = !0);
          f = e.childNodes;
          for (K = f.length - 1; 0 <= K && !a; K--)
            if (l = f[K], w = l.getAttribute("data-z-index"), x = !h(w), l !== q)
              if (0 > b && x && !g && !K) e.insertBefore(q, f[K]), a = !0;
              else if (c(w) <= b || x && (!h(b) || 0 <= b)) e.insertBefore(q, f[K + 1]), a = !0;
          a || (e.insertBefore(q, f[g ? 3 : 0]), a = !0)
        }
        return a
      }
    }
    J.symbolCustomAttribs = "anchorX anchorY clockwise end height innerR r start width x y".split(" ");
    J.prototype.strokeSetter = J.prototype.fillSetter;
    J.prototype.yGetter = J.prototype.xGetter;
    J.prototype.matrixSetter = J.prototype.rotationOriginXSetter = J.prototype.rotationOriginYSetter = J.prototype.rotationSetter = J.prototype.scaleXSetter = J.prototype.scaleYSetter = J.prototype.translateXSetter = J.prototype.translateYSetter = J.prototype.verticalAlignSetter = function(b, c) {
      this[c] = b;
      this.doTransform = !0
    };
    "";
    return J
  });
  M(a, "Core/Renderer/RendererRegistry.js", [a["Core/Globals.js"]], function(a) {
    var u;
    (function(u) {
      u.rendererTypes = {};
      let A;
      u.getRendererType = function(a = A) {
        return u.rendererTypes[a] || u.rendererTypes[A]
      };
      u.registerRendererType = function(F, G, C) {
        u.rendererTypes[F] = G;
        if (!A || C) A = F, a.Renderer = G
      }
    })(u || (u = {}));
    return u
  });
  M(a, "Core/Renderer/SVG/SVGLabel.js", [a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function(a, A) {
    const {
      defined: u,
      extend: I,
      isNumber: F,
      merge: G,
      pick: C,
      removeEvent: B
    } = A;
    class t extends a {
      constructor(a, d, p, m, k, v, n, h, D, L) {
        super();
        this.paddingRightSetter = this.paddingLeftSetter = this.paddingSetter;
        this.init(a, "g");
        this.textStr = d;
        this.x = p;
        this.y = m;
        this.anchorX = v;
        this.anchorY = n;
        this.baseline = D;
        this.className = L;
        this.addClass("button" === L ? "highcharts-no-tooltip" : "highcharts-label");
        L && this.addClass("highcharts-" + L);
        this.text = a.text(void 0, 0, 0, h).attr({
          zIndex: 1
        });
        let r;
        "string" === typeof k && ((r = /^url\((.*?)\)$/.test(k)) || this.renderer.symbols[k]) && (this.symbolKey = k);
        this.bBox = t.emptyBBox;
        this.padding = 3;
        this.baselineOffset = 0;
        this.needsBox = a.styledMode || r;
        this.deferredAttr = {};
        this.alignFactor = 0
      }
      alignSetter(a) {
        a = {
          left: 0,
          center: .5,
          right: 1
        } [a];
        a !== this.alignFactor && (this.alignFactor = a, this.bBox && F(this.xSetting) && this.attr({
          x: this.xSetting
        }))
      }
      anchorXSetter(a, d) {
        this.anchorX = a;
        this.boxAttr(d, Math.round(a) - this.getCrispAdjust() - this.xSetting)
      }
      anchorYSetter(a, d) {
        this.anchorY = a;
        this.boxAttr(d, a - this.ySetting)
      }
      boxAttr(a, d) {
        this.box ? this.box.attr(a, d) : this.deferredAttr[a] = d
      }
      css(r) {
        if (r) {
          const a = {};
          r = G(r);
          t.textProps.forEach(d => {
            "undefined" !== typeof r[d] && (a[d] = r[d], delete r[d])
          });
          this.text.css(a);
          "fontSize" in a ||
            "fontWeight" in a ? this.updateTextPadding() : ("width" in a || "textOverflow" in a) && this.updateBoxSize()
        }
        return a.prototype.css.call(this, r)
      }
      destroy() {
        B(this.element, "mouseenter");
        B(this.element, "mouseleave");
        this.text && this.text.destroy();
        this.box && (this.box = this.box.destroy());
        a.prototype.destroy.call(this)
      }
      fillSetter(a, d) {
        a && (this.needsBox = !0);
        this.fill = a;
        this.boxAttr(d, a)
      }
      getBBox() {
        this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
        const a = this.padding,
          d = C(this.paddingLeft,
            a);
        return {
          width: this.width,
          height: this.height,
          x: this.bBox.x - d,
          y: this.bBox.y - a
        }
      }
      getCrispAdjust() {
        return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2
      }
      heightSetter(a) {
        this.heightSetting = a
      }
      onAdd() {
        this.text.add(this);
        this.attr({
          text: C(this.textStr, ""),
          x: this.x || 0,
          y: this.y || 0
        });
        this.box && u(this.anchorX) && this.attr({
          anchorX: this.anchorX,
          anchorY: this.anchorY
        })
      }
      paddingSetter(a, d) {
        F(a) ? a !== this[d] && (this[d] = a, this.updateTextPadding()) :
          this[d] = void 0
      }
      rSetter(a, d) {
        this.boxAttr(d, a)
      }
      strokeSetter(a, d) {
        this.stroke = a;
        this.boxAttr(d, a)
      } ["stroke-widthSetter"](a, d) {
        a && (this.needsBox = !0);
        this["stroke-width"] = a;
        this.boxAttr(d, a)
      } ["text-alignSetter"](a) {
        this.textAlign = a
      }
      textSetter(a) {
        "undefined" !== typeof a && this.text.attr({
          text: a
        });
        this.updateTextPadding()
      }
      updateBoxSize() {
        var a = this.text;
        const d = {},
          p = this.padding,
          m = this.bBox = F(this.widthSetting) && F(this.heightSetting) && !this.textAlign || !u(a.textStr) ? t.emptyBBox : a.getBBox();
        this.width = this.getPaddedWidth();
        this.height = (this.heightSetting || m.height || 0) + 2 * p;
        const k = this.renderer.fontMetrics(a);
        this.baselineOffset = p + Math.min((this.text.firstLineMetrics || k).b, m.height || Infinity);
        this.heightSetting && (this.baselineOffset += (this.heightSetting - k.h) / 2);
        this.needsBox && !a.textPath && (this.box || (a = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), a.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), a.add(this)),
          a = this.getCrispAdjust(), d.x = a, d.y = (this.baseline ? -this.baselineOffset : 0) + a, d.width = Math.round(this.width), d.height = Math.round(this.height), this.box.attr(I(d, this.deferredAttr)), this.deferredAttr = {})
      }
      updateTextPadding() {
        const a = this.text;
        if (!a.textPath) {
          this.updateBoxSize();
          const d = this.baseline ? 0 : this.baselineOffset;
          let p = C(this.paddingLeft, this.padding);
          u(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (p += {
            center: .5,
            right: 1
          } [this.textAlign] * (this.widthSetting -
            this.bBox.width));
          if (p !== a.x || d !== a.y) a.attr("x", p), a.hasBoxWidthChanged && (this.bBox = a.getBBox(!0)), "undefined" !== typeof d && a.attr("y", d);
          a.x = p;
          a.y = d
        }
      }
      widthSetter(a) {
        this.widthSetting = F(a) ? a : void 0
      }
      getPaddedWidth() {
        var a = this.padding;
        const d = C(this.paddingLeft, a);
        a = C(this.paddingRight, a);
        return (this.widthSetting || this.bBox.width || 0) + d + a
      }
      xSetter(a) {
        this.x = a;
        this.alignFactor && (a -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = !0);
        this.xSetting = Math.round(a);
        this.attr("translateX", this.xSetting)
      }
      ySetter(a) {
        this.ySetting =
          this.y = Math.round(a);
        this.attr("translateY", this.ySetting)
      }
    }
    t.emptyBBox = {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    };
    t.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow whiteSpace width".split(" ");
    return t
  });
  M(a, "Core/Renderer/SVG/Symbols.js", [a["Core/Utilities.js"]], function(a) {
    function u(a, t, r, d, p) {
      const m = [];
      if (p) {
        const k = p.start || 0,
          v = C(p.r, r);
        r = C(p.r, d || r);
        d = (p.end || 0) - .001;
        const n = p.innerR,
          h = C(p.open, .001 > Math.abs((p.end || 0) - k - 2 * Math.PI)),
          D = Math.cos(k),
          L = Math.sin(k),
          E = Math.cos(d),
          e = Math.sin(d),
          q = C(p.longArc, .001 > d - k - Math.PI ? 0 : 1);
        let y = ["A", v, r, 0, q, C(p.clockwise, 1), a + v * E, t + r * e];
        y.params = {
          start: k,
          end: d,
          cx: a,
          cy: t
        };
        m.push(["M", a + v * D, t + r * L], y);
        F(n) && (y = ["A", n, n, 0, q, F(p.clockwise) ? 1 - p.clockwise : 0, a + n * D, t + n * L], y.params = {
          start: d,
          end: k,
          cx: a,
          cy: t
        }, m.push(h ? ["M", a + n * E, t + n * e] : ["L", a + n * E, t + n * e], y));
        h || m.push(["Z"])
      }
      return m
    }

    function H(a, t, r, d, p) {
      return p && p.r ? I(a, t, r, d, p) : [
        ["M", a, t],
        ["L", a + r, t],
        ["L", a + r, t + d],
        ["L", a, t + d],
        ["Z"]
      ]
    }

    function I(a, t, r,
      d, p) {
      p = (null === p || void 0 === p ? void 0 : p.r) || 0;
      return [
        ["M", a + p, t],
        ["L", a + r - p, t],
        ["A", p, p, 0, 0, 1, a + r, t + p],
        ["L", a + r, t + d - p],
        ["A", p, p, 0, 0, 1, a + r - p, t + d],
        ["L", a + p, t + d],
        ["A", p, p, 0, 0, 1, a, t + d - p],
        ["L", a, t + p],
        ["A", p, p, 0, 0, 1, a + p, t],
        ["Z"]
      ]
    }
    const {
      defined: F,
      isNumber: G,
      pick: C
    } = a;
    return {
      arc: u,
      callout: function(a, t, r, d, p) {
        const m = Math.min(p && p.r || 0, r, d),
          k = m + 6,
          v = p && p.anchorX;
        p = p && p.anchorY || 0;
        const n = I(a, t, r, d, {
          r: m
        });
        if (!G(v)) return n;
        a + v >= r ? p > t + k && p < t + d - k ? n.splice(3, 1, ["L", a + r, p - 6], ["L", a + r + 6, p], ["L", a + r, p + 6], ["L", a + r,
          t + d - m
        ]) : n.splice(3, 1, ["L", a + r, d / 2], ["L", v, p], ["L", a + r, d / 2], ["L", a + r, t + d - m]) : 0 >= a + v ? p > t + k && p < t + d - k ? n.splice(7, 1, ["L", a, p + 6], ["L", a - 6, p], ["L", a, p - 6], ["L", a, t + m]) : n.splice(7, 1, ["L", a, d / 2], ["L", v, p], ["L", a, d / 2], ["L", a, t + m]) : p && p > d && v > a + k && v < a + r - k ? n.splice(5, 1, ["L", v + 6, t + d], ["L", v, t + d + 6], ["L", v - 6, t + d], ["L", a + m, t + d]) : p && 0 > p && v > a + k && v < a + r - k && n.splice(1, 1, ["L", v - 6, t], ["L", v, t - 6], ["L", v + 6, t], ["L", r - m, t]);
        return n
      },
      circle: function(a, t, r, d) {
        return u(a + r / 2, t + d / 2, r / 2, d / 2, {
          start: .5 * Math.PI,
          end: 2.5 * Math.PI,
          open: !1
        })
      },
      diamond: function(a, t, r, d) {
        return [
          ["M", a + r / 2, t],
          ["L", a + r, t + d / 2],
          ["L", a + r / 2, t + d],
          ["L", a, t + d / 2],
          ["Z"]
        ]
      },
      rect: H,
      roundedRect: I,
      square: H,
      triangle: function(a, t, r, d) {
        return [
          ["M", a + r / 2, t],
          ["L", a + r, t + d],
          ["L", a, t + d],
          ["Z"]
        ]
      },
      "triangle-down": function(a, t, r, d) {
        return [
          ["M", a, t],
          ["L", a + r, t],
          ["L", a + r / 2, t + d],
          ["Z"]
        ]
      }
    }
  });
  M(a, "Core/Renderer/SVG/TextBuilder.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      doc: u,
      SVG_NS: F,
      win: G
    } = A, {
      attr: C,
      extend: B,
      fireEvent: t,
      isString: r,
      objectEach: d,
      pick: p
    } = H;
    class m {
      constructor(a) {
        const k = a.styles;
        this.renderer = a.renderer;
        this.svgElement = a;
        this.width = a.textWidth;
        this.textLineHeight = k && k.lineHeight;
        this.textOutline = k && k.textOutline;
        this.ellipsis = !(!k || "ellipsis" !== k.textOverflow);
        this.noWrap = !(!k || "nowrap" !== k.whiteSpace)
      }
      buildSVG() {
        const k = this.svgElement,
          d = k.element;
        var n = k.renderer,
          h = p(k.textStr, "").toString();
        const m = -1 !== h.indexOf("<"),
          L = d.childNodes;
        n = !k.added && n.box;
        const E = /<br.*?>/g;
        var e = [h, this.ellipsis, this.noWrap, this.textLineHeight,
          this.textOutline, k.getStyle("font-size"), this.width
        ].join();
        if (e !== k.textCache) {
          k.textCache = e;
          delete k.actualWidth;
          for (e = L.length; e--;) d.removeChild(L[e]);
          m || this.ellipsis || this.width || k.textPath || -1 !== h.indexOf(" ") && (!this.noWrap || E.test(h)) ? "" !== h && (n && n.appendChild(d), h = new a(h), this.modifyTree(h.nodes), h.addToDOM(d), this.modifyDOM(), this.ellipsis && -1 !== (d.textContent || "").indexOf("\u2026") && k.attr("title", this.unescapeEntities(k.textStr || "", ["&lt;", "&gt;"])), n && n.removeChild(d)) : d.appendChild(u.createTextNode(this.unescapeEntities(h)));
          r(this.textOutline) && k.applyTextOutline && k.applyTextOutline(this.textOutline)
        }
      }
      modifyDOM() {
        const a = this.svgElement,
          d = C(a.element, "x");
        a.firstLineMetrics = void 0;
        let n;
        for (; n = a.element.firstChild;)
          if (/^[\s\u200B]*$/.test(n.textContent || " ")) a.element.removeChild(n);
          else break;
        [].forEach.call(a.element.querySelectorAll("tspan.highcharts-br"), (h, e) => {
          h.nextSibling && h.previousSibling && (0 === e && 1 === h.previousSibling.nodeType && (a.firstLineMetrics = a.renderer.fontMetrics(h.previousSibling)), C(h, {
            dy: this.getLineHeight(h.nextSibling),
            x: d
          }))
        });
        const h = this.width || 0;
        if (h) {
          var m = (n, e) => {
              var q = n.textContent || "";
              const k = q.replace(/([^\^])-/g, "$1- ").split(" ");
              var l = !this.noWrap && (1 < k.length || 1 < a.element.childNodes.length);
              const w = this.getLineHeight(e);
              let g = 0,
                b = a.actualWidth;
              if (this.ellipsis) q && this.truncate(n, q, void 0, 0, Math.max(0, h - .8 * w), (b, f) => b.substring(0, f) + "\u2026");
              else if (l) {
                q = [];
                for (l = []; e.firstChild && e.firstChild !== n;) l.push(e.firstChild), e.removeChild(e.firstChild);
                for (; k.length;) k.length && !this.noWrap && 0 < g && (q.push(n.textContent ||
                  ""), n.textContent = k.join(" ").replace(/- /g, "-")), this.truncate(n, void 0, k, 0 === g ? b || 0 : 0, h, (b, f) => k.slice(0, f).join(" ").replace(/- /g, "-")), b = a.actualWidth, g++;
                l.forEach(b => {
                  e.insertBefore(b, n)
                });
                q.forEach(b => {
                  e.insertBefore(u.createTextNode(b), n);
                  b = u.createElementNS(F, "tspan");
                  b.textContent = "\u200b";
                  C(b, {
                    dy: w,
                    x: d
                  });
                  e.insertBefore(b, n)
                })
              }
            },
            p = h => {
              [].slice.call(h.childNodes).forEach(e => {
                e.nodeType === G.Node.TEXT_NODE ? m(e, h) : (-1 !== e.className.baseVal.indexOf("highcharts-br") && (a.actualWidth = 0), p(e))
              })
            };
          p(a.element)
        }
      }
      getLineHeight(a) {
        a = a.nodeType === G.Node.TEXT_NODE ? a.parentElement : a;
        return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(a || this.svgElement.element).h
      }
      modifyTree(a) {
        const k = (n, h) => {
          const {
            attributes: d = {},
            children: m,
            style: p = {},
            tagName: e
          } = n, q = this.renderer.styledMode;
          if ("b" === e || "strong" === e) q ? d["class"] = "highcharts-strong" : p.fontWeight = "bold";
          else if ("i" === e || "em" === e) q ? d["class"] = "highcharts-emphasized" : p.fontStyle = "italic";
          p && p.color && (p.fill =
            p.color);
          "br" === e ? (d["class"] = "highcharts-br", n.textContent = "\u200b", (h = a[h + 1]) && h.textContent && (h.textContent = h.textContent.replace(/^ +/gm, ""))) : "a" === e && m && m.some(a => "#text" === a.tagName) && (n.children = [{
            children: m,
            tagName: "tspan"
          }]);
          "#text" !== e && "a" !== e && (n.tagName = "tspan");
          B(n, {
            attributes: d,
            style: p
          });
          m && m.filter(a => "#text" !== a.tagName).forEach(k)
        };
        a.forEach(k);
        t(this.svgElement, "afterModifyTree", {
          nodes: a
        })
      }
      truncate(a, d, n, h, m, p) {
        const k = this.svgElement,
          {
            rotation: e
          } = k,
          q = [];
        let y = n ? 1 : 0,
          l = (d || n || "").length,
          w = l,
          g, b;
        const c = function(b, c) {
          b = c || b;
          if ((c = a.parentNode) && "undefined" === typeof q[b] && c.getSubStringLength) try {
            q[b] = h + c.getSubStringLength(0, n ? b + 1 : b)
          } catch (J) {
            ""
          }
          return q[b]
        };
        k.rotation = 0;
        b = c(a.textContent.length);
        if (h + b > m) {
          for (; y <= l;) w = Math.ceil((y + l) / 2), n && (g = p(n, w)), b = c(w, g && g.length - 1), y === l ? y = l + 1 : b > m ? l = w - 1 : y = w;
          0 === l ? a.textContent = "" : d && l === d.length - 1 || (a.textContent = g || p(d || n, w))
        }
        n && n.splice(0, w);
        k.actualWidth = b;
        k.rotation = e
      }
      unescapeEntities(a, m) {
        d(this.renderer.escapes, function(n, h) {
          m && -1 !==
            m.indexOf(n) || (a = a.toString().replace(new RegExp(n, "g"), h))
        });
        return a
      }
    }
    return m
  });
  M(a, "Core/Renderer/SVG/SVGRenderer.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGLabel.js"], a["Core/Renderer/SVG/Symbols.js"], a["Core/Renderer/SVG/TextBuilder.js"], a["Core/Utilities.js"]], function(a, A, H, I, F, G, C, B, t) {
    const {
      charts: r,
      deg2rad: d,
      doc: p,
      isFirefox: m,
      isMS: k,
      isWebKit: v,
      noop: n,
      SVG_NS: h,
      symbolSizes: D,
      win: L
    } = H, {
      addEvent: E,
      attr: e,
      createElement: q,
      css: y,
      defined: l,
      destroyObjectProperties: w,
      extend: g,
      isArray: b,
      isNumber: c,
      isObject: f,
      isString: x,
      merge: J,
      pick: z,
      pInt: Q,
      uniqueKey: S
    } = t;
    let R;
    class N {
      constructor(b, c, f, g, a, l, e) {
        this.width = this.url = this.style = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
        this.init(b, c, f, g, a, l, e)
      }
      init(b, c, f, g, a, l, N) {
        const q = this.createElement("svg").attr({
            version: "1.1",
            "class": "highcharts-root"
          }),
          K = q.element;
        N || q.css(this.getStyle(g));
        b.appendChild(K);
        e(b, "dir", "ltr"); - 1 === b.innerHTML.indexOf("xmlns") && e(K, "xmlns", this.SVG_NS);
        this.box = K;
        this.boxWrapper = q;
        this.alignedObjects = [];
        this.url = this.getReferenceURL();
        this.createElement("desc").add().element.appendChild(p.createTextNode("Created with Highcharts 11.0.1"));
        this.defs = this.createElement("defs").add();
        this.allowHTML = l;
        this.forExport = a;
        this.styledMode = N;
        this.gradients = {};
        this.cache = {};
        this.cacheKeys = [];
        this.imgCount =
          0;
        this.rootFontSize = q.getStyle("font-size");
        this.setSize(c, f, !1);
        let x;
        m && b.getBoundingClientRect && (c = function() {
          y(b, {
            left: 0,
            top: 0
          });
          x = b.getBoundingClientRect();
          y(b, {
            left: Math.ceil(x.left) - x.left + "px",
            top: Math.ceil(x.top) - x.top + "px"
          })
        }, c(), this.unSubPixelFix = E(L, "resize", c))
      }
      definition(b) {
        return (new a([b])).addToDOM(this.defs.element)
      }
      getReferenceURL() {
        if ((m || v) && p.getElementsByTagName("base").length) {
          if (!l(R)) {
            var b = S();
            b = (new a([{
              tagName: "svg",
              attributes: {
                width: 8,
                height: 8
              },
              children: [{
                tagName: "defs",
                children: [{
                  tagName: "clipPath",
                  attributes: {
                    id: b
                  },
                  children: [{
                    tagName: "rect",
                    attributes: {
                      width: 4,
                      height: 4
                    }
                  }]
                }]
              }, {
                tagName: "rect",
                attributes: {
                  id: "hitme",
                  width: 8,
                  height: 8,
                  "clip-path": `url(#${b})`,
                  fill: "rgba(0,0,0,0.001)"
                }
              }]
            }])).addToDOM(p.body);
            y(b, {
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 9E5
            });
            const c = p.elementFromPoint(6, 6);
            R = "hitme" === (c && c.id);
            p.body.removeChild(b)
          }
          if (R) return L.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20")
        }
        return ""
      }
      getStyle(b) {
        return this.style =
          g({
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "1rem"
          }, b)
      }
      setStyle(b) {
        this.boxWrapper.css(this.getStyle(b))
      }
      isHidden() {
        return !this.boxWrapper.getBBox().width
      }
      destroy() {
        const b = this.defs;
        this.box = null;
        this.boxWrapper = this.boxWrapper.destroy();
        w(this.gradients || {});
        this.gradients = null;
        this.defs = b.destroy();
        this.unSubPixelFix && this.unSubPixelFix();
        return this.alignedObjects = null
      }
      createElement(b) {
        const c = new this.Element;
        c.init(this, b);
        return c
      }
      getRadialAttr(b, c) {
        return {
          cx: b[0] - b[2] / 2 + (c.cx || 0) *
            b[2],
          cy: b[1] - b[2] / 2 + (c.cy || 0) * b[2],
          r: (c.r || 0) * b[2]
        }
      }
      shadowDefinition(b) {
        const c = [`highcharts-drop-shadow-${this.chartIndex}`, ...Object.keys(b).map(c => b[c])].join("-").replace(/[^a-z0-9\-]/g, ""),
          f = J({
            color: "#000000",
            offsetX: 1,
            offsetY: 1,
            opacity: .15,
            width: 5
          }, b);
        this.defs.element.querySelector(`#${c}`) || this.definition({
          tagName: "filter",
          attributes: {
            id: c
          },
          children: [{
            tagName: "feDropShadow",
            attributes: {
              dx: f.offsetX,
              dy: f.offsetY,
              "flood-color": f.color,
              "flood-opacity": Math.min(5 * f.opacity, 1),
              stdDeviation: f.width /
                2
            }
          }]
        });
        return c
      }
      buildText(b) {
        (new B(b)).buildSVG()
      }
      getContrast(b) {
        b = A.parse(b).rgba.map(b => {
          b /= 255;
          return .03928 >= b ? b / 12.92 : Math.pow((b + .055) / 1.055, 2.4)
        });
        b = .2126 * b[0] + .7152 * b[1] + .0722 * b[2];
        return 1.05 / (b + .05) > (b + .05) / .05 ? "#FFFFFF" : "#000000"
      }
      button(b, c, l, e, N = {}, q, x, w, h, z) {
        const K = this.label(b, c, l, h, void 0, void 0, z, void 0, "button"),
          n = this.styledMode;
        b = N.states || {};
        let d = 0;
        N = J(N);
        delete N.states;
        const O = J({
          color: "#333333",
          cursor: "pointer",
          fontSize: "0.8em",
          fontWeight: "normal"
        }, N.style);
        delete N.style;
        let y = a.filterUserAttributes(N);
        K.attr(J({
          padding: 8,
          r: 2
        }, y));
        let m, P, p;
        n || (y = J({
          fill: "#f7f7f7",
          stroke: "#cccccc",
          "stroke-width": 1
        }, y), q = J(y, {
          fill: "#e6e6e6"
        }, a.filterUserAttributes(q || b.hover || {})), m = q.style, delete q.style, x = J(y, {
          fill: "#e6e9ff",
          style: {
            color: "#000000",
            fontWeight: "bold"
          }
        }, a.filterUserAttributes(x || b.select || {})), P = x.style, delete x.style, w = J(y, {
          style: {
            color: "#cccccc"
          }
        }, a.filterUserAttributes(w || b.disabled || {})), p = w.style, delete w.style);
        E(K.element, k ? "mouseover" : "mouseenter", function() {
          3 !==
            d && K.setState(1)
        });
        E(K.element, k ? "mouseout" : "mouseleave", function() {
          3 !== d && K.setState(d)
        });
        K.setState = function(b) {
          1 !== b && (K.state = d = b);
          K.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][b || 0]);
          n || (K.attr([y, q, x, w][b || 0]), b = [O, m, P, p][b || 0], f(b) && K.css(b))
        };
        n || (K.attr(y).css(g({
          cursor: "default"
        }, O)), z && K.text.css({
          pointerEvents: "none"
        }));
        return K.on("touchstart", b => b.stopPropagation()).on("click", function(b) {
          3 !== d &&
            e.call(K, b)
        })
      }
      crispLine(b, c, f = "round") {
        const g = b[0],
          a = b[1];
        l(g[1]) && g[1] === a[1] && (g[1] = a[1] = Math[f](g[1]) - c % 2 / 2);
        l(g[2]) && g[2] === a[2] && (g[2] = a[2] = Math[f](g[2]) + c % 2 / 2);
        return b
      }
      path(c) {
        const a = this.styledMode ? {} : {
          fill: "none"
        };
        b(c) ? a.d = c : f(c) && g(a, c);
        return this.createElement("path").attr(a)
      }
      circle(b, c, g) {
        b = f(b) ? b : "undefined" === typeof b ? {} : {
          x: b,
          y: c,
          r: g
        };
        c = this.createElement("circle");
        c.xSetter = c.ySetter = function(b, c, f) {
          f.setAttribute("c" + c, b)
        };
        return c.attr(b)
      }
      arc(b, c, g, a, l, e) {
        f(b) ? (a = b, c = a.y, g = a.r,
          b = a.x) : a = {
          innerR: a,
          start: l,
          end: e
        };
        b = this.symbol("arc", b, c, g, g, a);
        b.r = g;
        return b
      }
      rect(b, c, a, l, N, q) {
        b = f(b) ? b : "undefined" === typeof b ? {} : {
          x: b,
          y: c,
          r: N,
          width: Math.max(a || 0, 0),
          height: Math.max(l || 0, 0)
        };
        const x = this.createElement("rect");
        this.styledMode || ("undefined" !== typeof q && (b["stroke-width"] = q, g(b, x.crisp(b))), b.fill = "none");
        x.rSetter = function(b, c, f) {
          x.r = b;
          e(f, {
            rx: b,
            ry: b
          })
        };
        x.rGetter = function() {
          return x.r || 0
        };
        return x.attr(b)
      }
      roundedRect(b) {
        return this.symbol("roundedRect").attr(b)
      }
      setSize(b, c, f) {
        this.width =
          b;
        this.height = c;
        this.boxWrapper.animate({
          width: b,
          height: c
        }, {
          step: function() {
            this.attr({
              viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
            })
          },
          duration: z(f, !0) ? void 0 : 0
        });
        this.alignElements()
      }
      g(b) {
        const c = this.createElement("g");
        return b ? c.attr({
          "class": "highcharts-" + b
        }) : c
      }
      image(b, f, g, a, l, e) {
        const N = {
            preserveAspectRatio: "none"
          },
          q = function(b, c) {
            b.setAttributeNS ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", c) : b.setAttribute("hc-svg-href", c)
          };
        c(f) && (N.x = f);
        c(g) && (N.y = g);
        c(a) && (N.width =
          a);
        c(l) && (N.height = l);
        const x = this.createElement("image").attr(N);
        f = function(c) {
          q(x.element, b);
          e.call(x, c)
        };
        e ? (q(x.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), g = new L.Image, E(g, "load", f), g.src = b, g.complete && f({})) : q(x.element, b);
        return x
      }
      symbol(b, c, f, a, N, x) {
        const K = this,
          w = /^url\((.*?)\)$/,
          h = w.test(b),
          n = !h && (this.symbols[b] ? b : "circle"),
          d = n && this.symbols[n];
        let J, k, m, O;
        if (d) "number" === typeof c && (k = d.call(this.symbols, Math.round(c || 0), Math.round(f || 0), a || 0, N ||
          0, x)), J = this.path(k), K.styledMode || J.attr("fill", "none"), g(J, {
          symbolName: n || void 0,
          x: c,
          y: f,
          width: a,
          height: N
        }), x && g(J, x);
        else if (h) {
          m = b.match(w)[1];
          const g = J = this.image(m);
          g.imgwidth = z(x && x.width, D[m] && D[m].width);
          g.imgheight = z(x && x.height, D[m] && D[m].height);
          O = b => b.attr({
            width: b.width,
            height: b.height
          });
          ["width", "height"].forEach(function(b) {
            g[b + "Setter"] = function(b, c) {
              this[c] = b;
              const {
                alignByTranslate: f,
                element: g,
                width: a,
                height: N,
                imgwidth: q,
                imgheight: K
              } = this;
              b = this["img" + c];
              if (l(b)) {
                let l = 1;
                x && "within" ===
                  x.backgroundSize && a && N ? (l = Math.min(a / q, N / K), e(g, {
                    width: Math.round(q * l),
                    height: Math.round(K * l)
                  })) : g && g.setAttribute(c, b);
                f || this.translate(((a || 0) - q * l) / 2, ((N || 0) - K * l) / 2)
              }
            }
          });
          l(c) && g.attr({
            x: c,
            y: f
          });
          g.isImg = !0;
          l(g.imgwidth) && l(g.imgheight) ? O(g) : (g.attr({
            width: 0,
            height: 0
          }), q("img", {
            onload: function() {
              const b = r[K.chartIndex];
              0 === this.width && (y(this, {
                position: "absolute",
                top: "-999em"
              }), p.body.appendChild(this));
              D[m] = {
                width: this.width,
                height: this.height
              };
              g.imgwidth = this.width;
              g.imgheight = this.height;
              g.element &&
                O(g);
              this.parentNode && this.parentNode.removeChild(this);
              K.imgCount--;
              if (!K.imgCount && b && !b.hasLoaded) b.onload()
            },
            src: m
          }), this.imgCount++)
        }
        return J
      }
      clipRect(b, c, f, g) {
        const a = S() + "-",
          l = this.createElement("clipPath").attr({
            id: a
          }).add(this.defs);
        b = this.rect(b, c, f, g, 0).add(l);
        b.id = a;
        b.clipPath = l;
        b.count = 0;
        return b
      }
      text(b, c, f, g) {
        const a = {};
        if (g && (this.allowHTML || !this.forExport)) return this.html(b, c, f);
        a.x = Math.round(c || 0);
        f && (a.y = Math.round(f));
        l(b) && (a.text = b);
        b = this.createElement("text").attr(a);
        if (!g ||
          this.forExport && !this.allowHTML) b.xSetter = function(b, c, f) {
          const g = f.getElementsByTagName("tspan"),
            a = f.getAttribute(c);
          for (let f = 0, l; f < g.length; f++) l = g[f], l.getAttribute(c) === a && l.setAttribute(c, b);
          f.setAttribute(c, b)
        };
        return b
      }
      fontMetrics(b) {
        b = Q(F.prototype.getStyle.call(b, "font-size") || 0);
        const c = 24 > b ? b + 3 : Math.round(1.2 * b);
        return {
          h: c,
          b: Math.round(.8 * c),
          f: b
        }
      }
      rotCorr(b, c, f) {
        let g = b;
        c && f && (g = Math.max(g * Math.cos(c * d), 4));
        return {
          x: -b / 3 * Math.sin(c * d),
          y: g
        }
      }
      pathToSegments(b) {
        const f = [],
          g = [],
          a = {
            A: 8,
            C: 7,
            H: 2,
            L: 3,
            M: 3,
            Q: 5,
            S: 5,
            T: 3,
            V: 2
          };
        for (let l = 0; l < b.length; l++) x(g[0]) && c(b[l]) && g.length === a[g[0].toUpperCase()] && b.splice(l, 0, g[0].replace("M", "L").replace("m", "l")), "string" === typeof b[l] && (g.length && f.push(g.slice(0)), g.length = 0), g.push(b[l]);
        f.push(g.slice(0));
        return f
      }
      label(b, c, f, g, a, l, e, N, q) {
        return new G(this, b, c, f, g, a, l, e, N, q)
      }
      alignElements() {
        this.alignedObjects.forEach(b => b.align())
      }
    }
    g(N.prototype, {
      Element: F,
      SVG_NS: h,
      escapes: {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      },
      symbols: C,
      draw: n
    });
    I.registerRendererType("svg", N, !0);
    "";
    return N
  });
  M(a, "Core/Renderer/HTML/HTMLElement.js", [a["Core/Globals.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      isFirefox: u,
      isMS: F,
      isWebKit: G,
      win: C
    } = a, {
      css: B,
      defined: t,
      extend: r,
      pick: d,
      pInt: p
    } = H, m = [];
    class k extends A {
      static compose(a) {
        if (H.pushUnique(m, a)) {
          const n = k.prototype,
            h = a.prototype;
          h.getSpanCorrection = n.getSpanCorrection;
          h.htmlCss = n.htmlCss;
          h.htmlGetBBox = n.htmlGetBBox;
          h.htmlUpdateTransform = n.htmlUpdateTransform;
          h.setSpanRotation = n.setSpanRotation
        }
        return a
      }
      getSpanCorrection(a, n, h) {
        this.xCorr = -a * h;
        this.yCorr = -n
      }
      htmlCss(a) {
        const n = "SPAN" === this.element.tagName && a && "width" in a,
          h = d(n && a.width, void 0);
        let k;
        n && (delete a.width, this.textWidth = h, k = !0);
        a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
        this.styles = r(this.styles, a);
        B(this.element, a);
        k && this.htmlUpdateTransform();
        return this
      }
      htmlGetBBox() {
        const a = this.element;
        return {
          x: a.offsetLeft,
          y: a.offsetTop,
          width: a.offsetWidth,
          height: a.offsetHeight
        }
      }
      htmlUpdateTransform() {
        if (this.added) {
          var a =
            this.renderer,
            n = this.element,
            h = this.x || 0,
            d = this.y || 0,
            k = this.textAlign || "left",
            m = {
              left: 0,
              center: .5,
              right: 1
            } [k],
            e = this.styles,
            q = e && e.whiteSpace;
          B(n, {
            marginLeft: this.translateX || 0,
            marginTop: this.translateY || 0
          });
          if ("SPAN" === n.tagName) {
            e = this.rotation;
            const l = this.textWidth && p(this.textWidth),
              w = [e, k, n.innerHTML, this.textWidth, this.textAlign].join();
            let g = !1;
            if (l !== this.oldTextWidth) {
              if (this.textPxLength) var y = this.textPxLength;
              else B(n, {
                width: "",
                whiteSpace: q || "nowrap"
              }), y = n.offsetWidth;
              (l > this.oldTextWidth ||
                y > l) && (/[ \-]/.test(n.textContent || n.innerText) || "ellipsis" === n.style.textOverflow) && (B(n, {
                width: y > l || e ? l + "px" : "auto",
                display: "block",
                whiteSpace: q || "normal"
              }), this.oldTextWidth = l, g = !0)
            }
            this.hasBoxWidthChanged = g;
            w !== this.cTT && (a = a.fontMetrics(n).b, !t(e) || e === (this.oldRotation || 0) && k === this.oldAlign || this.setSpanRotation(e, m, a), this.getSpanCorrection(!t(e) && this.textPxLength || n.offsetWidth, a, m, e, k));
            B(n, {
              left: h + (this.xCorr || 0) + "px",
              top: d + (this.yCorr || 0) + "px"
            });
            this.cTT = w;
            this.oldRotation = e;
            this.oldAlign =
              k
          }
        } else this.alignOnAdd = !0
      }
      setSpanRotation(a, n, h) {
        const d = {},
          k = F && !/Edge/.test(C.navigator.userAgent) ? "-ms-transform" : G ? "-webkit-transform" : u ? "MozTransform" : C.opera ? "-o-transform" : void 0;
        k && (d[k] = d.transform = "rotate(" + a + "deg)", d[k + (u ? "Origin" : "-origin")] = d.transformOrigin = 100 * n + "% " + h + "px", B(this.element, d))
      }
    }
    return k
  });
  M(a, "Core/Renderer/HTML/HTMLRenderer.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function(a,
    A, H, I) {
    const {
      attr: u,
      createElement: G,
      extend: C,
      pick: B
    } = I, t = [];
    class r extends H {
      static compose(a) {
        I.pushUnique(t, a) && (a.prototype.html = r.prototype.html);
        return a
      }
      html(d, p, m) {
        const k = this.createElement("span"),
          v = k.element,
          n = k.renderer,
          h = function(a, h) {
            ["opacity", "visibility"].forEach(function(n) {
              a[n + "Setter"] = function(e, q, d) {
                const l = a.div ? a.div.style : h;
                A.prototype[n + "Setter"].call(this, e, q, d);
                l && (l[q] = e)
              }
            });
            a.addedSetters = !0
          };
        k.textSetter = function(h) {
          h !== this.textStr && (delete this.bBox, delete this.oldTextWidth,
            a.setElementHTML(this.element, B(h, "")), this.textStr = h, k.doTransform = !0)
        };
        h(k, k.element.style);
        k.xSetter = k.ySetter = k.alignSetter = k.rotationSetter = function(a, h) {
          "align" === h ? k.alignValue = k.textAlign = a : k[h] = a;
          k.doTransform = !0
        };
        k.afterSetters = function() {
          this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
        };
        k.attr({
          text: d,
          x: Math.round(p),
          y: Math.round(m)
        }).css({
          position: "absolute"
        });
        n.styledMode || k.css({
          fontFamily: this.style.fontFamily,
          fontSize: this.style.fontSize
        });
        v.style.whiteSpace = "nowrap";
        k.css = k.htmlCss;
        k.add = function(a) {
          const d = n.box.parentNode,
            m = [];
          let e;
          if (this.parentGroup = a) {
            if (e = a.div, !e) {
              for (; a;) m.push(a), a = a.parentGroup;
              m.reverse().forEach(function(a) {
                function q(b, c) {
                  a[c] = b;
                  "translateX" === c ? g.left = b + "px" : g.top = b + "px";
                  a.doTransform = !0
                }
                const l = u(a.element, "class"),
                  w = a.styles || {};
                e = a.div = a.div || G("div", l ? {
                  className: l
                } : void 0, {
                  position: "absolute",
                  left: (a.translateX || 0) + "px",
                  top: (a.translateY || 0) + "px",
                  display: a.display,
                  opacity: a.opacity,
                  visibility: a.visibility
                }, e || d);
                const g = e.style;
                C(a, {
                  classSetter: function(b) {
                    return function(c) {
                      this.element.setAttribute("class", c);
                      b.className = c
                    }
                  }(e),
                  css: function(b) {
                    k.css.call(a, b);
                    ["cursor", "pointerEvents"].forEach(c => {
                      b[c] && (g[c] = b[c])
                    });
                    return a
                  },
                  on: function() {
                    m[0].div && k.on.apply({
                      element: m[0].div,
                      onEvents: a.onEvents
                    }, arguments);
                    return a
                  },
                  translateXSetter: q,
                  translateYSetter: q
                });
                a.addedSetters || h(a);
                a.css(w)
              })
            }
          } else e = d;
          e.appendChild(v);
          k.added = !0;
          k.alignOnAdd && k.htmlUpdateTransform();
          return k
        };
        return k
      }
    }
    return r
  });
  M(a, "Core/Axis/AxisDefaults.js",
    [],
    function() {
      var a;
      (function(a) {
        a.defaultXAxisOptions = {
          alignTicks: !0,
          allowDecimals: void 0,
          panningEnabled: !0,
          zIndex: 2,
          zoomEnabled: !0,
          dateTimeLabelFormats: {
            millisecond: {
              main: "%H:%M:%S.%L",
              range: !1
            },
            second: {
              main: "%H:%M:%S",
              range: !1
            },
            minute: {
              main: "%H:%M",
              range: !1
            },
            hour: {
              main: "%H:%M",
              range: !1
            },
            day: {
              main: "%e %b"
            },
            week: {
              main: "%e %b"
            },
            month: {
              main: "%b '%y"
            },
            year: {
              main: "%Y"
            }
          },
          endOnTick: !1,
          gridLineDashStyle: "Solid",
          gridZIndex: 1,
          labels: {
            autoRotation: void 0,
            autoRotationLimit: 80,
            distance: 15,
            enabled: !0,
            indentation: 10,
            overflow: "justify",
            padding: 5,
            reserveSpace: void 0,
            rotation: void 0,
            staggerLines: 0,
            step: 0,
            useHTML: !1,
            zIndex: 7,
            style: {
              color: "#333333",
              cursor: "default",
              fontSize: "0.8em"
            }
          },
          maxPadding: .01,
          minorGridLineDashStyle: "Solid",
          minorTickLength: 2,
          minorTickPosition: "outside",
          minorTicksPerMajor: 5,
          minPadding: .01,
          offset: void 0,
          opposite: !1,
          reversed: void 0,
          reversedStacks: !1,
          showEmpty: !0,
          showFirstLabel: !0,
          showLastLabel: !0,
          startOfWeek: 1,
          startOnTick: !1,
          tickLength: 10,
          tickPixelInterval: 100,
          tickmarkPlacement: "between",
          tickPosition: "outside",
          title: {
            align: "middle",
            rotation: 0,
            useHTML: !1,
            x: 0,
            y: 0,
            style: {
              color: "#666666",
              fontSize: "0.8em"
            }
          },
          type: "linear",
          uniqueNames: !0,
          visible: !0,
          minorGridLineColor: "#f2f2f2",
          minorGridLineWidth: 1,
          minorTickColor: "#999999",
          lineColor: "#333333",
          lineWidth: 1,
          gridLineColor: "#e6e6e6",
          gridLineWidth: void 0,
          tickColor: "#333333"
        };
        a.defaultYAxisOptions = {
          reversedStacks: !0,
          endOnTick: !0,
          maxPadding: .05,
          minPadding: .05,
          tickPixelInterval: 72,
          showLastLabel: !0,
          labels: {
            x: void 0
          },
          startOnTick: !0,
          title: {
            rotation: 270,
            text: "Values"
          },
          stackLabels: {
            animation: {},
            allowOverlap: !1,
            enabled: !1,
            crop: !0,
            overflow: "justify",
            formatter: function() {
              const {
                numberFormatter: a
              } = this.axis.chart;
              return a(this.total || 0, -1)
            },
            style: {
              color: "#000000",
              fontSize: "0.7em",
              fontWeight: "bold",
              textOutline: "1px contrast"
            }
          },
          gridLineWidth: 1,
          lineWidth: 0
        };
        a.defaultLeftAxisOptions = {
          title: {
            rotation: 270
          }
        };
        a.defaultRightAxisOptions = {
          title: {
            rotation: 90
          }
        };
        a.defaultBottomAxisOptions = {
          labels: {
            autoRotation: [-45]
          },
          margin: 15,
          title: {
            rotation: 0
          }
        };
        a.defaultTopAxisOptions = {
          labels: {
            autoRotation: [-45]
          },
          margin: 15,
          title: {
            rotation: 0
          }
        }
      })(a || (a = {}));
      return a
    });
  M(a, "Core/Foundation.js", [a["Core/Utilities.js"]], function(a) {
    const {
      addEvent: u,
      isFunction: H,
      objectEach: I,
      removeEvent: F
    } = a;
    var G;
    (function(a) {
      a.registerEventOptions = function(a, t) {
        a.eventOptions = a.eventOptions || {};
        I(t.events, function(r, d) {
          a.eventOptions[d] !== r && (a.eventOptions[d] && (F(a, d, a.eventOptions[d]), delete a.eventOptions[d]), H(r) && (a.eventOptions[d] = r, u(a, d, r, {
            order: 0
          })))
        })
      }
    })(G || (G = {}));
    return G
  });
  M(a, "Core/Axis/Tick.js", [a["Core/FormatUtilities.js"],
    a["Core/Globals.js"], a["Core/Utilities.js"]
  ], function(a, A, H) {
    const {
      deg2rad: u
    } = A, {
      clamp: F,
      correctFloat: G,
      defined: C,
      destroyObjectProperties: B,
      extend: t,
      fireEvent: r,
      isNumber: d,
      merge: p,
      objectEach: m,
      pick: k
    } = H;
    class v {
      constructor(a, h, d, k, m) {
        this.isNewLabel = this.isNew = !0;
        this.axis = a;
        this.pos = h;
        this.type = d || "";
        this.parameters = m || {};
        this.tickmarkOffset = this.parameters.tickmarkOffset;
        this.options = this.parameters.options;
        r(this, "init");
        d || k || this.addLabel()
      }
      addLabel() {
        const n = this,
          h = n.axis;
        var m = h.options;
        const p =
          h.chart;
        var v = h.categories;
        const e = h.logarithmic,
          q = h.names,
          y = n.pos,
          l = k(n.options && n.options.labels, m.labels);
        var w = h.tickPositions;
        const g = y === w[0],
          b = y === w[w.length - 1],
          c = (!l.step || 1 === l.step) && 1 === h.tickInterval;
        w = w.info;
        let f = n.label,
          x, J, z;
        v = this.parameters.category || (v ? k(v[y], q[y], y) : y);
        e && d(v) && (v = G(e.lin2log(v)));
        h.dateTime && (w ? (J = p.time.resolveDTLFormat(m.dateTimeLabelFormats[!m.grid && w.higherRanks[y] || w.unitName]), x = J.main) : d(v) && (x = h.dateTime.getXDateFormat(v, m.dateTimeLabelFormats || {})));
        n.isFirst = g;
        n.isLast = b;
        const Q = {
          axis: h,
          chart: p,
          dateTimeLabelFormat: x,
          isFirst: g,
          isLast: b,
          pos: y,
          tick: n,
          tickPositionInfo: w,
          value: v
        };
        r(this, "labelFormat", Q);
        const S = b => l.formatter ? l.formatter.call(b, b) : l.format ? (b.text = h.defaultLabelFormatter.call(b, b), a.format(l.format, b, p)) : h.defaultLabelFormatter.call(b, b);
        m = S.call(Q, Q);
        const R = J && J.list;
        n.shortenLabel = R ? function() {
          for (z = 0; z < R.length; z++)
            if (t(Q, {
                dateTimeLabelFormat: R[z]
              }), f.attr({
                text: S.call(Q, Q)
              }), f.getBBox().width < h.getSlotWidth(n) - 2 * l.padding) return;
          f.attr({
            text: ""
          })
        } : void 0;
        c && h._addedPlotLB && n.moveLabel(m, l);
        C(f) || n.movedLabel ? f && f.textStr !== m && !c && (!f.textWidth || l.style.width || f.styles.width || f.css({
          width: null
        }), f.attr({
          text: m
        }), f.textPxLength = f.getBBox().width) : (n.label = f = n.createLabel({
          x: 0,
          y: 0
        }, m, l), n.rotation = 0)
      }
      createLabel(a, h, d) {
        const n = this.axis,
          k = n.chart;
        if (a = C(h) && d.enabled ? k.renderer.text(h, a.x, a.y, d.useHTML).add(n.labelGroup) : null) k.styledMode || a.css(p(d.style)), a.textPxLength = a.getBBox().width;
        return a
      }
      destroy() {
        B(this, this.axis)
      }
      getPosition(a,
        h, d, k) {
        const n = this.axis,
          e = n.chart,
          q = k && e.oldChartHeight || e.chartHeight;
        a = {
          x: a ? G(n.translate(h + d, void 0, void 0, k) + n.transB) : n.left + n.offset + (n.opposite ? (k && e.oldChartWidth || e.chartWidth) - n.right - n.left : 0),
          y: a ? q - n.bottom + n.offset - (n.opposite ? n.height : 0) : G(q - n.translate(h + d, void 0, void 0, k) - n.transB)
        };
        a.y = F(a.y, -1E5, 1E5);
        r(this, "afterGetPosition", {
          pos: a
        });
        return a
      }
      getLabelPosition(a, h, d, m, p, e, q, y) {
        const l = this.axis,
          w = l.transA,
          g = l.isLinked && l.linkedParent ? l.linkedParent.reversed : l.reversed,
          b = l.staggerLines,
          c = l.tickRotCorr || {
            x: 0,
            y: 0
          },
          f = m || l.reserveSpaceDefault ? 0 : -l.labelOffset * ("center" === l.labelAlign ? .5 : 1),
          x = p.distance,
          n = {};
        d = 0 === l.side ? d.rotation ? -x : -d.getBBox().height : 2 === l.side ? c.y + x : Math.cos(d.rotation * u) * (c.y - d.getBBox(!1, 0).height / 2);
        C(p.y) && (d = 0 === l.side && l.horiz ? p.y + d : p.y);
        a = a + k(p.x, [0, 1, 0, -1][l.side] * x) + f + c.x - (e && m ? e * w * (g ? -1 : 1) : 0);
        h = h + d - (e && !m ? e * w * (g ? 1 : -1) : 0);
        b && (m = q / (y || 1) % b, l.opposite && (m = b - m - 1), h += l.labelOffset / b * m);
        n.x = a;
        n.y = Math.round(h);
        r(this, "afterGetLabelPosition", {
          pos: n,
          tickmarkOffset: e,
          index: q
        });
        return n
      }
      getLabelSize() {
        return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
      }
      getMarkPath(a, h, d, k, m, e) {
        return e.crispLine([
          ["M", a, h],
          ["L", a + (m ? 0 : -d), h + (m ? d : 0)]
        ], k)
      }
      handleOverflow(a) {
        const h = this.axis,
          d = h.options.labels,
          n = a.x;
        var m = h.chart.chartWidth,
          e = h.chart.spacing;
        const q = k(h.labelLeft, Math.min(h.pos, e[3]));
        e = k(h.labelRight, Math.max(h.isRadial ? 0 : h.pos + h.len, m - e[1]));
        const y = this.label,
          l = this.rotation,
          w = {
            left: 0,
            center: .5,
            right: 1
          } [h.labelAlign || y.attr("align")],
          g = y.getBBox().width,
          b = h.getSlotWidth(this),
          c = {};
        let f = b,
          x = 1,
          J;
        if (l || "justify" !== d.overflow) 0 > l && n - w * g < q ? J = Math.round(n / Math.cos(l * u) - q) : 0 < l && n + w * g > e && (J = Math.round((m - n) / Math.cos(l * u)));
        else if (m = n + (1 - w) * g, n - w * g < q ? f = a.x + f * (1 - w) - q : m > e && (f = e - a.x + f * w, x = -1), f = Math.min(b, f), f < b && "center" === h.labelAlign && (a.x += x * (b - f - w * (b - Math.min(g, f)))), g > f || h.autoRotation && (y.styles || {}).width) J = f;
        J && (this.shortenLabel ? this.shortenLabel() : (c.width = Math.floor(J) + "px", (d.style || {}).textOverflow || (c.textOverflow = "ellipsis"), y.css(c)))
      }
      moveLabel(a,
        h) {
        const d = this;
        var k = d.label;
        const n = d.axis;
        let e = !1;
        k && k.textStr === a ? (d.movedLabel = k, e = !0, delete d.label) : m(n.ticks, function(q) {
          e || q.isNew || q === d || !q.label || q.label.textStr !== a || (d.movedLabel = q.label, e = !0, q.labelPos = d.movedLabel.xy, delete q.label)
        });
        e || !d.labelPos && !k || (k = d.labelPos || k.xy, d.movedLabel = d.createLabel(k, a, h), d.movedLabel && d.movedLabel.attr({
          opacity: 0
        }))
      }
      render(a, h, d) {
        var n = this.axis,
          m = n.horiz,
          e = this.pos,
          q = k(this.tickmarkOffset, n.tickmarkOffset);
        e = this.getPosition(m, e, q, h);
        q = e.x;
        const y =
          e.y;
        n = m && q === n.pos + n.len || !m && y === n.pos ? -1 : 1;
        m = k(d, this.label && this.label.newOpacity, 1);
        d = k(d, 1);
        this.isActive = !0;
        this.renderGridLine(h, d, n);
        this.renderMark(e, d, n);
        this.renderLabel(e, h, m, a);
        this.isNew = !1;
        r(this, "afterRender")
      }
      renderGridLine(a, d, m) {
        const h = this.axis,
          n = h.options,
          e = {},
          q = this.pos,
          y = this.type,
          l = k(this.tickmarkOffset, h.tickmarkOffset),
          w = h.chart.renderer;
        let g = this.gridLine,
          b = n.gridLineWidth,
          c = n.gridLineColor,
          f = n.gridLineDashStyle;
        "minor" === this.type && (b = n.minorGridLineWidth, c = n.minorGridLineColor,
          f = n.minorGridLineDashStyle);
        g || (h.chart.styledMode || (e.stroke = c, e["stroke-width"] = b || 0, e.dashstyle = f), y || (e.zIndex = 1), a && (d = 0), this.gridLine = g = w.path().attr(e).addClass("highcharts-" + (y ? y + "-" : "") + "grid-line").add(h.gridGroup));
        if (g && (m = h.getPlotLinePath({
            value: q + l,
            lineWidth: g.strokeWidth() * m,
            force: "pass",
            old: a,
            acrossPanes: !1
          }))) g[a || this.isNew ? "attr" : "animate"]({
          d: m,
          opacity: d
        })
      }
      renderMark(a, d, m) {
        const h = this.axis;
        var n = h.options;
        const e = h.chart.renderer,
          q = this.type,
          y = h.tickSize(q ? q + "Tick" : "tick"),
          l = a.x;
        a = a.y;
        const w = k(n["minor" !== q ? "tickWidth" : "minorTickWidth"], !q && h.isXAxis ? 1 : 0);
        n = n["minor" !== q ? "tickColor" : "minorTickColor"];
        let g = this.mark;
        const b = !g;
        y && (h.opposite && (y[0] = -y[0]), g || (this.mark = g = e.path().addClass("highcharts-" + (q ? q + "-" : "") + "tick").add(h.axisGroup), h.chart.styledMode || g.attr({
          stroke: n,
          "stroke-width": w
        })), g[b ? "attr" : "animate"]({
          d: this.getMarkPath(l, a, y[0], g.strokeWidth() * m, h.horiz, e),
          opacity: d
        }))
      }
      renderLabel(a, h, m, p) {
        var n = this.axis;
        const e = n.horiz,
          q = n.options,
          y = this.label,
          l = q.labels,
          w = l.step;
        n = k(this.tickmarkOffset, n.tickmarkOffset);
        const g = a.x;
        a = a.y;
        let b = !0;
        y && d(g) && (y.xy = a = this.getLabelPosition(g, a, y, e, l, n, p, w), this.isFirst && !this.isLast && !q.showFirstLabel || this.isLast && !this.isFirst && !q.showLastLabel ? b = !1 : !e || l.step || l.rotation || h || 0 === m || this.handleOverflow(a), w && p % w && (b = !1), b && d(a.y) ? (a.opacity = m, y[this.isNewLabel ? "attr" : "animate"](a).show(!0), this.isNewLabel = !1) : (y.hide(), this.isNewLabel = !0))
      }
      replaceMovedLabel() {
        const a = this.label,
          h = this.axis;
        a && !this.isNew &&
          (a.animate({
            opacity: 0
          }, void 0, a.destroy), delete this.label);
        h.isDirty = !0;
        this.label = this.movedLabel;
        delete this.movedLabel
      }
    }
    "";
    return v
  });
  M(a, "Core/Axis/Axis.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/AxisDefaults.js"], a["Core/Color/Color.js"], a["Core/Defaults.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Axis/Tick.js"], a["Core/Utilities.js"]], function(a, A, H, I, F, G, C, B) {
    const {
      animObject: t
    } = a, {
      defaultOptions: r
    } = I, {
      registerEventOptions: d
    } = F, {
      deg2rad: p
    } = G, {
      arrayMax: m,
      arrayMin: k,
      clamp: v,
      correctFloat: n,
      defined: h,
      destroyObjectProperties: D,
      erase: u,
      error: E,
      extend: e,
      fireEvent: q,
      isArray: y,
      isNumber: l,
      isString: w,
      merge: g,
      normalizeTickInterval: b,
      objectEach: c,
      pick: f,
      relativeLength: x,
      removeEvent: J,
      splat: z,
      syncTimeout: Q
    } = B, S = (c, g) => b(g, void 0, void 0, f(c.options.allowDecimals, .5 > g || void 0 !== c.tickAmount), !!c.tickAmount);
    class R {
      constructor(b, c) {
        this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions =
          this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions =
          this.coll = this.closestPointRange = this.chart = this.bottom = this.alternateBands = void 0;
        this.init(b, c)
      }
      init(b, c) {
        const g = c.isX;
        this.chart = b;
        this.horiz = b.inverted && !this.isZAxis ? !g : g;
        this.isXAxis = g;
        this.coll = this.coll || (g ? "xAxis" : "yAxis");
        q(this, "init", {
          userOptions: c
        });
        this.opposite = f(c.opposite, this.opposite);
        this.side = f(c.side, this.side, this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
        this.setOptions(c);
        const a = this.options,
          e = a.labels,
          N = a.type;
        this.userOptions = c;
        this.minPixelPadding = 0;
        this.reversed = f(a.reversed,
          this.reversed);
        this.visible = a.visible;
        this.zoomEnabled = a.zoomEnabled;
        this.hasNames = "category" === N || !0 === a.categories;
        this.categories = a.categories || (this.hasNames ? [] : void 0);
        this.names || (this.names = [], this.names.keys = {});
        this.plotLinesAndBandsGroups = {};
        this.positiveValuesOnly = !!this.logarithmic;
        this.isLinked = h(a.linkedTo);
        this.ticks = {};
        this.labelEdge = [];
        this.minorTicks = {};
        this.plotLinesAndBands = [];
        this.alternateBands = {};
        this.len = 0;
        this.minRange = this.userMinRange = a.minRange || a.maxZoom;
        this.range = a.range;
        this.offset = a.offset || 0;
        this.min = this.max = null;
        c = f(a.crosshair, z(b.options.tooltip.crosshairs)[g ? 0 : 1]);
        this.crosshair = !0 === c ? {} : c; - 1 === b.axes.indexOf(this) && (g ? b.axes.splice(b.xAxis.length, 0, this) : b.axes.push(this), b[this.coll].push(this));
        this.series = this.series || [];
        b.inverted && !this.isZAxis && g && "undefined" === typeof this.reversed && (this.reversed = !0);
        this.labelRotation = l(e.rotation) ? e.rotation : void 0;
        d(this, a);
        q(this, "afterInit")
      }
      setOptions(b) {
        this.options = g(A.defaultXAxisOptions, "yAxis" === this.coll &&
          A.defaultYAxisOptions, [A.defaultTopAxisOptions, A.defaultRightAxisOptions, A.defaultBottomAxisOptions, A.defaultLeftAxisOptions][this.side], g(r[this.coll], b));
        q(this, "afterSetOptions", {
          userOptions: b
        })
      }
      defaultLabelFormatter(b) {
        var c = this.axis;
        ({
          numberFormatter: b
        } = this.chart);
        const f = l(this.value) ? this.value : NaN,
          g = c.chart.time,
          a = this.dateTimeLabelFormat;
        var e = r.lang;
        const N = e.numericSymbols;
        e = e.numericSymbolMagnitude || 1E3;
        const q = c.logarithmic ? Math.abs(f) : c.tickInterval;
        let x = N && N.length,
          h;
        if (c.categories) h =
          `${this.value}`;
        else if (a) h = g.dateFormat(a, f);
        else if (x && 1E3 <= q)
          for (; x-- && "undefined" === typeof h;) c = Math.pow(e, x + 1), q >= c && 0 === 10 * f % c && null !== N[x] && 0 !== f && (h = b(f / c, -1) + N[x]);
        "undefined" === typeof h && (h = 1E4 <= Math.abs(f) ? b(f, -1) : b(f, -1, void 0, ""));
        return h
      }
      getSeriesExtremes() {
        const b = this,
          c = b.chart;
        let g;
        q(this, "getSeriesExtremes", null, function() {
          b.hasVisibleSeries = !1;
          b.dataMin = b.dataMax = b.threshold = null;
          b.softThreshold = !b.isXAxis;
          b.series.forEach(function(a) {
            if (a.visible || !c.options.chart.ignoreHiddenSeries) {
              var e =
                a.options;
              let c = e.threshold,
                q, x;
              b.hasVisibleSeries = !0;
              b.positiveValuesOnly && 0 >= c && (c = null);
              if (b.isXAxis)(e = a.xData) && e.length && (e = b.logarithmic ? e.filter(b => 0 < b) : e, g = a.getXExtremes(e), q = g.min, x = g.max, l(q) || q instanceof Date || (e = e.filter(l), g = a.getXExtremes(e), q = g.min, x = g.max), e.length && (b.dataMin = Math.min(f(b.dataMin, q), q), b.dataMax = Math.max(f(b.dataMax, x), x)));
              else if (a = a.applyExtremes(), l(a.dataMin) && (q = a.dataMin, b.dataMin = Math.min(f(b.dataMin, q), q)), l(a.dataMax) && (x = a.dataMax, b.dataMax = Math.max(f(b.dataMax,
                  x), x)), h(c) && (b.threshold = c), !e.softThreshold || b.positiveValuesOnly) b.softThreshold = !1
            }
          })
        });
        q(this, "afterGetSeriesExtremes")
      }
      translate(b, c, f, g, a, e) {
        const q = this.linkedParent || this,
          x = g && q.old ? q.old.min : q.min;
        if (!l(x)) return NaN;
        const N = q.minPixelPadding;
        a = (q.isOrdinal || q.brokenAxis && q.brokenAxis.hasBreaks || q.logarithmic && a) && q.lin2val;
        let h = 1,
          d = 0;
        g = g && q.old ? q.old.transA : q.transA;
        g || (g = q.transA);
        f && (h *= -1, d = q.len);
        q.reversed && (h *= -1, d -= h * (q.sector || q.len));
        c ? (e = (b * h + d - N) / g + x, a && (e = q.lin2val(e))) : (a &&
          (b = q.val2lin(b)), b = h * (b - x) * g, e = (q.isRadial ? b : n(b)) + d + h * N + (l(e) ? g * e : 0));
        return e
      }
      toPixels(b, c) {
        return this.translate(b, !1, !this.horiz, void 0, !0) + (c ? 0 : this.pos)
      }
      toValue(b, c) {
        return this.translate(b - (c ? 0 : this.pos), !0, !this.horiz, void 0, !0)
      }
      getPlotLinePath(b) {
        function c(b, c, f) {
          "pass" !== m && (b < c || b > f) && (m ? b = v(b, c, f) : D = !0);
          return b
        }
        const g = this,
          a = g.chart,
          e = g.left,
          x = g.top,
          h = b.old,
          N = b.value,
          d = b.lineWidth,
          w = h && a.oldChartHeight || a.chartHeight,
          k = h && a.oldChartWidth || a.chartWidth,
          n = g.transB;
        let z = b.translatedValue,
          m = b.force,
          J, y, p, r, D;
        b = {
          value: N,
          lineWidth: d,
          old: h,
          force: m,
          acrossPanes: b.acrossPanes,
          translatedValue: z
        };
        q(this, "getPlotLinePath", b, function(b) {
          z = f(z, g.translate(N, void 0, void 0, h));
          z = v(z, -1E5, 1E5);
          J = p = Math.round(z + n);
          y = r = Math.round(w - z - n);
          l(z) ? g.horiz ? (y = x, r = w - g.bottom, J = p = c(J, e, e + g.width)) : (J = e, p = k - g.right, y = r = c(y, x, x + g.height)) : (D = !0, m = !1);
          b.path = D && !m ? null : a.renderer.crispLine([
            ["M", J, y],
            ["L", p, r]
          ], d || 1)
        });
        return b.path
      }
      getLinearTickPositions(b, c, f) {
        const g = n(Math.floor(c / b) * b);
        f = n(Math.ceil(f / b) *
          b);
        const a = [];
        let l, e;
        n(g + b) === g && (e = 20);
        if (this.single) return [c];
        for (c = g; c <= f;) {
          a.push(c);
          c = n(c + b, e);
          if (c === l) break;
          l = c
        }
        return a
      }
      getMinorTickInterval() {
        const b = this.options;
        return !0 === b.minorTicks ? f(b.minorTickInterval, "auto") : !1 === b.minorTicks ? null : b.minorTickInterval
      }
      getMinorTickPositions() {
        var b = this.options;
        const c = this.tickPositions,
          f = this.minorTickInterval;
        var g = this.pointRangePadding || 0;
        const a = this.min - g;
        g = this.max + g;
        const l = g - a;
        let e = [];
        if (l && l / f < this.len / 3) {
          const l = this.logarithmic;
          if (l) this.paddedTicks.forEach(function(b,
            c, g) {
            c && e.push.apply(e, l.getLogTickPositions(f, g[c - 1], g[c], !0))
          });
          else if (this.dateTime && "auto" === this.getMinorTickInterval()) e = e.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(f), a, g, b.startOfWeek));
          else
            for (b = a + (c[0] - a) % f; b <= g && b !== e[0]; b += f) e.push(b)
        }
        0 !== e.length && this.trimTicks(e);
        return e
      }
      adjustForMinRange() {
        const b = this.options,
          c = this.logarithmic;
        let g = this.min;
        var a = this.max;
        let l, e = 0,
          q, x, d, w, z;
        this.isXAxis && "undefined" === typeof this.minRange && !c && (h(b.min) || h(b.max) || h(b.floor) ||
          h(b.ceiling) ? this.minRange = null : (this.series.forEach(function(b) {
            d = b.xData;
            w = b.xIncrement ? 1 : d.length - 1;
            if (1 < d.length)
              for (q = w; 0 < q; q--)
                if (x = d[q] - d[q - 1], !e || x < e) e = x
          }), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
        if (a - g < this.minRange) {
          l = this.dataMax - this.dataMin >= this.minRange;
          z = this.minRange;
          var n = (z - a + g) / 2;
          n = [g - n, f(b.min, g - n)];
          l && (n[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
          g = m(n);
          a = [g + z, f(b.max, g + z)];
          l && (a[2] = c ? c.log2lin(this.dataMax) : this.dataMax);
          a = k(a);
          a - g < z && (n[0] = a - z, n[1] = f(b.min, a - z), g = m(n))
        }
        this.min = g;
        this.max = a
      }
      getClosest() {
        let b;
        this.categories ? b = 1 : this.series.forEach(function(c) {
          const f = c.closestPointRange,
            g = c.visible || !c.chart.options.chart.ignoreHiddenSeries;
          !c.noSharedTooltip && h(f) && g && (b = h(b) ? Math.min(b, f) : f)
        });
        return b
      }
      nameToX(b) {
        const c = y(this.options.categories),
          g = c ? this.categories : this.names;
        let a = b.options.x,
          l;
        b.series.requireSorting = !1;
        h(a) || (a = this.options.uniqueNames && g ? c ? g.indexOf(b.name) : f(g.keys[b.name], -1) : b.series.autoIncrement()); -
        1 === a ? !c && g && (l = g.length) : l = a;
        "undefined" !== typeof l ? (this.names[l] = b.name, this.names.keys[b.name] = l) : b.x && (l = b.x);
        return l
      }
      updateNames() {
        const b = this,
          c = this.names;
        0 < c.length && (Object.keys(c.keys).forEach(function(b) {
          delete c.keys[b]
        }), c.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(c) {
          c.xIncrement = null;
          if (!c.points || c.isDirtyData) b.max = Math.max(b.max, c.xData.length - 1), c.processData(), c.generatePoints();
          c.data.forEach(function(f, g) {
            let a;
            f && f.options && "undefined" !==
              typeof f.name && (a = b.nameToX(f), "undefined" !== typeof a && a !== f.x && (f.x = a, c.xData[g] = a))
          })
        }))
      }
      setAxisTranslation() {
        const b = this,
          c = b.max - b.min;
        var g = b.linkedParent;
        const a = !!b.categories,
          l = b.isXAxis;
        let e = b.axisPointRange || 0,
          x, h = 0,
          d = 0,
          z = b.transA;
        if (l || a || e) x = b.getClosest(), g ? (h = g.minPointOffset, d = g.pointRangePadding) : b.series.forEach(function(c) {
          const g = a ? 1 : l ? f(c.options.pointRange, x, 0) : b.axisPointRange || 0,
            q = c.options.pointPlacement;
          e = Math.max(e, g);
          if (!b.single || a) c = c.is("xrange") ? !l : l, h = Math.max(h, c &&
            w(q) ? 0 : g / 2), d = Math.max(d, c && "on" === q ? 0 : g)
        }), g = b.ordinal && b.ordinal.slope && x ? b.ordinal.slope / x : 1, b.minPointOffset = h *= g, b.pointRangePadding = d *= g, b.pointRange = Math.min(e, b.single && a ? 1 : c), l && (b.closestPointRange = x);
        b.translationSlope = b.transA = z = b.staticScale || b.len / (c + d || 1);
        b.transB = b.horiz ? b.left : b.bottom;
        b.minPixelPadding = z * h;
        q(this, "afterSetAxisTranslation")
      }
      minFromRange() {
        return this.max - this.range
      }
      setTickInterval(b) {
        var c = this.chart;
        const g = this.logarithmic,
          a = this.options,
          e = this.isXAxis,
          x = this.isLinked,
          d = a.tickPixelInterval,
          w = this.categories,
          z = this.softThreshold;
        let k = a.maxPadding,
          m = a.minPadding;
        let J = l(a.tickInterval) && 0 <= a.tickInterval ? a.tickInterval : void 0,
          N = l(this.threshold) ? this.threshold : null,
          y, p, v;
        this.dateTime || w || x || this.getTickAmount();
        p = f(this.userMin, a.min);
        v = f(this.userMax, a.max);
        if (x) {
          this.linkedParent = c[this.coll][a.linkedTo];
          var r = this.linkedParent.getExtremes();
          this.min = f(r.min, r.dataMin);
          this.max = f(r.max, r.dataMax);
          a.type !== this.linkedParent.options.type && E(11, 1, c)
        } else z && h(N) &&
          (this.dataMin >= N ? (r = N, m = 0) : this.dataMax <= N && (y = N, k = 0)), this.min = f(p, r, this.dataMin), this.max = f(v, y, this.dataMax);
        g && (this.positiveValuesOnly && !b && 0 >= Math.min(this.min, f(this.dataMin, this.min)) && E(10, 1, c), this.min = n(g.log2lin(this.min), 16), this.max = n(g.log2lin(this.max), 16));
        this.range && h(this.max) && (this.userMin = this.min = p = Math.max(this.dataMin, this.minFromRange()), this.userMax = v = this.max, this.range = null);
        q(this, "foundExtremes");
        this.beforePadding && this.beforePadding();
        this.adjustForMinRange();
        !(w ||
          this.axisPointRange || this.stacking && this.stacking.usePercentage || x) && h(this.min) && h(this.max) && (c = this.max - this.min) && (!h(p) && m && (this.min -= c * m), !h(v) && k && (this.max += c * k));
        l(this.userMin) || (l(a.softMin) && a.softMin < this.min && (this.min = p = a.softMin), l(a.floor) && (this.min = Math.max(this.min, a.floor)));
        l(this.userMax) || (l(a.softMax) && a.softMax > this.max && (this.max = v = a.softMax), l(a.ceiling) && (this.max = Math.min(this.max, a.ceiling)));
        z && h(this.dataMin) && (N = N || 0, !h(p) && this.min < N && this.dataMin >= N ? this.min = this.options.minRange ?
          Math.min(N, this.max - this.minRange) : N : !h(v) && this.max > N && this.dataMax <= N && (this.max = this.options.minRange ? Math.max(N, this.min + this.minRange) : N));
        l(this.min) && l(this.max) && !this.chart.polar && this.min > this.max && (h(this.options.min) ? this.max = this.min : h(this.options.max) && (this.min = this.max));
        this.tickInterval = this.min === this.max || "undefined" === typeof this.min || "undefined" === typeof this.max ? 1 : x && this.linkedParent && !J && d === this.linkedParent.options.tickPixelInterval ? J = this.linkedParent.tickInterval : f(J,
          this.tickAmount ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1) : void 0, w ? 1 : (this.max - this.min) * d / Math.max(this.len, d));
        if (e && !b) {
          const b = this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max);
          this.series.forEach(function(c) {
            c.forceCrop = c.forceCropping && c.forceCropping();
            c.processData(b)
          });
          q(this, "postProcessData", {
            hasExtremesChanged: b
          })
        }
        this.setAxisTranslation();
        q(this, "initialAxisTranslation");
        this.pointRange && !J && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
        b = f(a.minTickInterval, this.dateTime && !this.series.some(b => b.noSharedTooltip) ? this.closestPointRange : 0);
        !J && this.tickInterval < b && (this.tickInterval = b);
        this.dateTime || this.logarithmic || J || (this.tickInterval = S(this, this.tickInterval));
        this.tickAmount || (this.tickInterval = this.unsquish());
        this.setTickPositions()
      }
      setTickPositions() {
        var b = this.options;
        const c = b.tickPositions,
          f = b.tickPositioner;
        var g = this.getMinorTickInterval(),
          a = this.hasVerticalPanning(),
          e = "colorAxis" === this.coll;
        const x = (e || !a) && b.startOnTick;
        a = (e || !a) && b.endOnTick;
        e = [];
        let d;
        this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
        this.minorTickInterval = "auto" === g && this.tickInterval ? this.tickInterval / b.minorTicksPerMajor : g;
        this.single = this.min === this.max && h(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
        if (c) e = c.slice();
        else if (l(this.min) && l(this.max)) {
          if (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)))
            if (this.dateTime) e =
              this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0);
            else if (this.logarithmic) e = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
          else
            for (g = b = this.tickInterval; g <= 2 * b;)
              if (e = this.getLinearTickPositions(this.tickInterval, this.min, this.max), this.tickAmount && e.length > this.tickAmount) this.tickInterval = S(this, g *= 1.1);
              else break;
          else e = [this.min, this.max],
            E(19, !1, this.chart);
          e.length > this.len && (e = [e[0], e[e.length - 1]], e[0] === e[1] && (e.length = 1));
          f && (this.tickPositions = e, (d = f.apply(this, [this.min, this.max])) && (e = d))
        }
        this.tickPositions = e;
        this.paddedTicks = e.slice(0);
        this.trimTicks(e, x, a);
        !this.isLinked && l(this.min) && l(this.max) && (this.single && 2 > e.length && !this.categories && !this.series.some(b => b.is("heatmap") && "between" === b.options.pointPlacement) && (this.min -= .5, this.max += .5), c || d || this.adjustTickAmount());
        q(this, "afterSetTickPositions")
      }
      trimTicks(b, c, f) {
        const g =
          b[0],
          a = b[b.length - 1],
          l = !this.isOrdinal && this.minPointOffset || 0;
        q(this, "trimTicks");
        if (!this.isLinked) {
          if (c && -Infinity !== g) this.min = g;
          else
            for (; this.min - l > b[0];) b.shift();
          if (f) this.max = a;
          else
            for (; this.max + l < b[b.length - 1];) b.pop();
          0 === b.length && h(g) && !this.options.tickPositions && b.push((a + g) / 2)
        }
      }
      alignToOthers() {
        const b = this,
          c = [this],
          f = b.options,
          g = "yAxis" === this.coll && this.chart.options.chart.alignThresholds,
          a = [];
        let e;
        b.thresholdAlignment = void 0;
        if ((!1 !== this.chart.options.chart.alignTicks && f.alignTicks ||
            g) && !1 !== f.startOnTick && !1 !== f.endOnTick && !b.logarithmic) {
          const f = b => {
              const {
                horiz: c,
                options: f
              } = b;
              return [c ? f.left : f.top, f.width, f.height, f.pane].join()
            },
            g = f(this);
          this.chart[this.coll].forEach(function(a) {
            const {
              series: l
            } = a;
            l.length && l.some(b => b.visible) && a !== b && f(a) === g && (e = !0, c.push(a))
          })
        }
        if (e && g) {
          c.forEach(c => {
            c = c.getThresholdAlignment(b);
            l(c) && a.push(c)
          });
          const f = 1 < a.length ? a.reduce((b, c) => b + c, 0) / a.length : void 0;
          c.forEach(b => {
            b.thresholdAlignment = f
          })
        }
        return e
      }
      getThresholdAlignment(b) {
        (!l(this.dataMin) ||
          this !== b && this.series.some(b => b.isDirty || b.isDirtyData)) && this.getSeriesExtremes();
        if (l(this.threshold)) return b = v((this.threshold - (this.dataMin || 0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1), this.options.reversed && (b = 1 - b), b
      }
      getTickAmount() {
        const b = this.options,
          c = b.tickPixelInterval;
        let f = b.tickAmount;
        !h(b.tickInterval) && !f && this.len < c && !this.isRadial && !this.logarithmic && b.startOnTick && b.endOnTick && (f = 2);
        !f && this.alignToOthers() && (f = Math.ceil(this.len / c) + 1);
        4 > f && (this.finalTickAmt = f, f = 5);
        this.tickAmount =
          f
      }
      adjustTickAmount() {
        const b = this,
          {
            finalTickAmt: c,
            max: g,
            min: a,
            options: e,
            tickPositions: q,
            tickAmount: x,
            thresholdAlignment: d
          } = b,
          w = q && q.length;
        var z = f(b.threshold, b.softThreshold ? 0 : null);
        var k = b.tickInterval;
        let m;
        l(d) && (m = .5 > d ? Math.ceil(d * (x - 1)) : Math.floor(d * (x - 1)), e.reversed && (m = x - 1 - m));
        if (b.hasData() && l(a) && l(g)) {
          const f = () => {
            b.transA *= (w - 1) / (x - 1);
            b.min = e.startOnTick ? q[0] : Math.min(a, q[0]);
            b.max = e.endOnTick ? q[q.length - 1] : Math.max(g, q[q.length - 1])
          };
          if (l(m) && l(b.threshold)) {
            for (; q[m] !== z || q.length !==
              x || q[0] > a || q[q.length - 1] < g;) {
              q.length = 0;
              for (q.push(b.threshold); q.length < x;) void 0 === q[m] || q[m] > b.threshold ? q.unshift(n(q[0] - k)) : q.push(n(q[q.length - 1] + k));
              if (k > 8 * b.tickInterval) break;
              k *= 2
            }
            f()
          } else if (w < x) {
            for (; q.length < x;) q.length % 2 || a === z ? q.push(n(q[q.length - 1] + k)) : q.unshift(n(q[0] - k));
            f()
          }
          if (h(c)) {
            for (k = z = q.length; k--;)(3 === c && 1 === k % 2 || 2 >= c && 0 < k && k < z - 1) && q.splice(k, 1);
            b.finalTickAmt = void 0
          }
        }
      }
      setScale() {
        let b = !1,
          c = !1;
        this.series.forEach(function(f) {
          b = b || f.isDirtyData || f.isDirty;
          c = c || f.xAxis && f.xAxis.isDirty ||
            !1
        });
        this.setAxisSize();
        const f = this.len !== (this.old && this.old.len);
        f || b || c || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (this.stacking && (this.stacking.resetStacks(), this.stacking.buildStacks()), this.forceRedraw = !1, this.userMinRange || (this.minRange = void 0), this.getSeriesExtremes(), this.setTickInterval(), this.isDirty || (this.isDirty = f || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max))) :
          this.stacking && this.stacking.cleanStacks();
        b && this.panningState && (this.panningState.isDirty = !0);
        q(this, "afterSetScale")
      }
      setExtremes(b, c, g, a, l) {
        const x = this,
          d = x.chart;
        g = f(g, !0);
        x.series.forEach(function(b) {
          delete b.kdTree
        });
        l = e(l, {
          min: b,
          max: c
        });
        q(x, "setExtremes", l, function() {
          x.userMin = b;
          x.userMax = c;
          x.eventArgs = l;
          g && d.redraw(a)
        })
      }
      zoom(b, c) {
        const g = this,
          a = this.dataMin,
          l = this.dataMax,
          e = this.options,
          x = Math.min(a, f(e.min, a)),
          d = Math.max(l, f(e.max, l));
        b = {
          newMin: b,
          newMax: c
        };
        q(this, "zoom", b, function(b) {
          let c =
            b.newMin,
            f = b.newMax;
          if (c !== g.min || f !== g.max) g.allowZoomOutside || (h(a) && (c < x && (c = x), c > d && (c = d)), h(l) && (f < x && (f = x), f > d && (f = d))), g.displayBtn = "undefined" !== typeof c || "undefined" !== typeof f, g.setExtremes(c, f, !1, void 0, {
            trigger: "zoom"
          });
          b.zoomed = !0
        });
        return b.zoomed
      }
      setAxisSize() {
        const b = this.chart;
        var c = this.options;
        const g = c.offsets || [0, 0, 0, 0],
          a = this.horiz,
          l = this.width = Math.round(x(f(c.width, b.plotWidth - g[3] + g[1]), b.plotWidth)),
          e = this.height = Math.round(x(f(c.height, b.plotHeight - g[0] + g[2]), b.plotHeight)),
          q = this.top = Math.round(x(f(c.top, b.plotTop + g[0]), b.plotHeight, b.plotTop));
        c = this.left = Math.round(x(f(c.left, b.plotLeft + g[3]), b.plotWidth, b.plotLeft));
        this.bottom = b.chartHeight - e - q;
        this.right = b.chartWidth - l - c;
        this.len = Math.max(a ? l : e, 0);
        this.pos = a ? c : q
      }
      getExtremes() {
        const b = this.logarithmic;
        return {
          min: b ? n(b.lin2log(this.min)) : this.min,
          max: b ? n(b.lin2log(this.max)) : this.max,
          dataMin: this.dataMin,
          dataMax: this.dataMax,
          userMin: this.userMin,
          userMax: this.userMax
        }
      }
      getThreshold(b) {
        var c = this.logarithmic;
        const f =
          c ? c.lin2log(this.min) : this.min;
        c = c ? c.lin2log(this.max) : this.max;
        null === b || -Infinity === b ? b = f : Infinity === b ? b = c : f > b ? b = f : c < b && (b = c);
        return this.translate(b, 0, 1, 0, 1)
      }
      autoLabelAlign(b) {
        const c = (f(b, 0) - 90 * this.side + 720) % 360;
        b = {
          align: "center"
        };
        q(this, "autoLabelAlign", b, function(b) {
          15 < c && 165 > c ? b.align = "right" : 195 < c && 345 > c && (b.align = "left")
        });
        return b.align
      }
      tickSize(b) {
        const c = this.options,
          g = f(c["tick" === b ? "tickWidth" : "minorTickWidth"], "tick" === b && this.isXAxis && !this.categories ? 1 : 0);
        let a = c["tick" === b ? "tickLength" :
            "minorTickLength"],
          l;
        g && a && ("inside" === c[b + "Position"] && (a = -a), l = [a, g]);
        b = {
          tickSize: l
        };
        q(this, "afterTickSize", b);
        return b.tickSize
      }
      labelMetrics() {
        const b = this.chart.renderer;
        var c = this.ticks;
        c = c[Object.keys(c)[0]] || {};
        return this.chart.renderer.fontMetrics(c.label || c.movedLabel || b.box)
      }
      unsquish() {
        const b = this.options.labels;
        var c = this.horiz;
        const g = this.tickInterval,
          a = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / g),
          e = b.rotation,
          q = .75 * this.labelMetrics().h,
          x = Math.max(this.max - this.min, 0),
          d =
          function(b) {
            let c = b / (a || 1);
            c = 1 < c ? Math.ceil(c) : 1;
            c * g > x && Infinity !== b && Infinity !== a && x && (c = Math.ceil(x / g));
            return n(c * g)
          };
        let h = g,
          w, k = Number.MAX_VALUE,
          z;
        if (c) {
          if (b.staggerLines || (l(e) ? z = [e] : a < b.autoRotationLimit && (z = b.autoRotation)), z) {
            let b;
            for (const f of z)
              if (f === e || f && -90 <= f && 90 >= f) c = d(Math.abs(q / Math.sin(p * f))), b = c + Math.abs(f / 360), b < k && (k = b, w = f, h = c)
          }
        } else h = d(q);
        this.autoRotation = z;
        this.labelRotation = f(w, l(e) ? e : 0);
        return b.step ? g : h
      }
      getSlotWidth(b) {
        const c = this.chart,
          f = this.horiz,
          g = this.options.labels,
          a = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
          e = c.margin[3];
        if (b && l(b.slotWidth)) return b.slotWidth;
        if (f && 2 > g.step) return g.rotation ? 0 : (this.staggerLines || 1) * this.len / a;
        if (!f) {
          b = g.style.width;
          if (void 0 !== b) return parseInt(String(b), 10);
          if (e) return e - c.spacing[3]
        }
        return .33 * c.chartWidth
      }
      renderUnsquish() {
        const b = this.chart,
          c = b.renderer,
          f = this.tickPositions,
          g = this.ticks,
          a = this.options.labels,
          l = a.style,
          e = this.horiz,
          q = this.getSlotWidth();
        var x = Math.max(1, Math.round(q - 2 * a.padding));
        const d = {},
          h = this.labelMetrics(),
          z = l.textOverflow;
        let k, m, n = 0;
        w(a.rotation) || (d.rotation = a.rotation || 0);
        f.forEach(function(b) {
          b = g[b];
          b.movedLabel && b.replaceMovedLabel();
          b && b.label && b.label.textPxLength > n && (n = b.label.textPxLength)
        });
        this.maxLabelLength = n;
        if (this.autoRotation) n > x && n > h.h ? d.rotation = this.labelRotation : this.labelRotation = 0;
        else if (q && (k = x, !z))
          for (m = "clip", x = f.length; !e && x--;) {
            var J = f[x];
            if (J = g[J].label) J.styles && "ellipsis" === J.styles.textOverflow ? J.css({
                textOverflow: "clip"
              }) : J.textPxLength > q &&
              J.css({
                width: q + "px"
              }), J.getBBox().height > this.len / f.length - (h.h - h.f) && (J.specificTextOverflow = "ellipsis")
          }
        d.rotation && (k = n > .5 * b.chartHeight ? .33 * b.chartHeight : n, z || (m = "ellipsis"));
        if (this.labelAlign = a.align || this.autoLabelAlign(this.labelRotation)) d.align = this.labelAlign;
        f.forEach(function(b) {
          const c = (b = g[b]) && b.label,
            f = l.width,
            a = {};
          c && (c.attr(d), b.shortenLabel ? b.shortenLabel() : k && !f && "nowrap" !== l.whiteSpace && (k < c.textPxLength || "SPAN" === c.element.tagName) ? (a.width = k + "px", z || (a.textOverflow = c.specificTextOverflow ||
            m), c.css(a)) : c.styles && c.styles.width && !a.width && !f && c.css({
            width: null
          }), delete c.specificTextOverflow, b.rotation = d.rotation)
        }, this);
        this.tickRotCorr = c.rotCorr(h.b, this.labelRotation || 0, 0 !== this.side)
      }
      hasData() {
        return this.series.some(function(b) {
          return b.hasData()
        }) || this.options.showEmpty && h(this.min) && h(this.max)
      }
      addTitle(b) {
        const c = this.chart.renderer,
          f = this.horiz,
          a = this.opposite,
          l = this.options.title,
          e = this.chart.styledMode;
        let q;
        this.axisTitle || ((q = l.textAlign) || (q = (f ? {
          low: "left",
          middle: "center",
          high: "right"
        } : {
          low: a ? "right" : "left",
          middle: "center",
          high: a ? "left" : "right"
        })[l.align]), this.axisTitle = c.text(l.text || "", 0, 0, l.useHTML).attr({
          zIndex: 7,
          rotation: l.rotation,
          align: q
        }).addClass("highcharts-axis-title"), e || this.axisTitle.css(g(l.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
        e || l.style.width || this.isRadial || this.axisTitle.css({
          width: this.len + "px"
        });
        this.axisTitle[b ? "show" : "hide"](b)
      }
      generateTick(b) {
        const c = this.ticks;
        c[b] ? c[b].addLabel() : c[b] = new C(this, b)
      }
      getOffset() {
        const b =
          this,
          {
            chart: g,
            horiz: a,
            options: e,
            side: x,
            ticks: d,
            tickPositions: w,
            coll: z,
            axisParent: k
          } = b,
          n = g.renderer,
          m = g.inverted && !b.isZAxis ? [1, 0, 3, 2][x] : x;
        var J = b.hasData();
        const y = e.title;
        var p = e.labels;
        const v = l(e.crossing);
        var r = g.axisOffset;
        const D = g.clipOffset,
          Q = [-1, 1, 1, -1][x],
          t = e.className;
        let S, R = 0,
          E;
        var u = 0;
        let L = 0;
        b.showAxis = S = J || e.showEmpty;
        b.staggerLines = b.horiz && p.staggerLines || void 0;
        if (!b.axisGroup) {
          const c = (b, c, f) => n.g(b).attr({
            zIndex: f
          }).addClass(`highcharts-${z.toLowerCase()}${c} ` + (this.isRadial ?
            `highcharts-radial-axis${c} ` : "") + (t || "")).add(k);
          b.gridGroup = c("grid", "-grid", e.gridZIndex);
          b.axisGroup = c("axis", "", e.zIndex);
          b.labelGroup = c("axis-labels", "-labels", p.zIndex)
        }
        J || b.isLinked ? (w.forEach(function(c) {
            b.generateTick(c)
          }), b.renderUnsquish(), b.reserveSpaceDefault = 0 === x || 2 === x || {
            1: "left",
            3: "right"
          } [x] === b.labelAlign, f(p.reserveSpace, v ? !1 : null, "center" === b.labelAlign ? !0 : null, b.reserveSpaceDefault) && w.forEach(function(b) {
            L = Math.max(d[b].getLabelSize(), L)
          }), b.staggerLines && (L *= b.staggerLines),
          b.labelOffset = L * (b.opposite ? -1 : 1)) : c(d, function(b, c) {
          b.destroy();
          delete d[c]
        });
        y && y.text && !1 !== y.enabled && (b.addTitle(S), S && !v && !1 !== y.reserveSpace && (b.titleOffset = R = b.axisTitle.getBBox()[a ? "height" : "width"], E = y.offset, u = h(E) ? 0 : f(y.margin, a ? 5 : 10)));
        b.renderLine();
        b.offset = Q * f(e.offset, r[x] ? r[x] + (e.margin || 0) : 0);
        b.tickRotCorr = b.tickRotCorr || {
          x: 0,
          y: 0
        };
        J = 0 === x ? -b.labelMetrics().h : 2 === x ? b.tickRotCorr.y : 0;
        u = Math.abs(L) + u;
        L && (u = u - J + Q * (a ? f(p.y, b.tickRotCorr.y + Q * p.distance) : f(p.x, Q * p.distance)));
        b.axisTitleMargin =
          f(E, u);
        b.getMaxLabelDimensions && (b.maxLabelDimensions = b.getMaxLabelDimensions(d, w));
        "colorAxis" !== z && (p = this.tickSize("tick"), r[x] = Math.max(r[x], (b.axisTitleMargin || 0) + R + Q * b.offset, u, w && w.length && p ? p[0] + Q * b.offset : 0), r = !b.axisLine || e.offset ? 0 : 2 * Math.floor(b.axisLine.strokeWidth() / 2), D[m] = Math.max(D[m], r));
        q(this, "afterGetOffset")
      }
      getLinePath(b) {
        const c = this.chart,
          f = this.opposite;
        var g = this.offset;
        const a = this.horiz,
          l = this.left + (f ? this.width : 0) + g;
        g = c.chartHeight - this.bottom - (f ? this.height : 0) + g;
        f &&
          (b *= -1);
        return c.renderer.crispLine([
          ["M", a ? this.left : l, a ? g : this.top],
          ["L", a ? c.chartWidth - this.right : l, a ? g : c.chartHeight - this.bottom]
        ], b)
      }
      renderLine() {
        this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
          stroke: this.options.lineColor,
          "stroke-width": this.options.lineWidth,
          zIndex: 7
        }))
      }
      getTitlePosition(b) {
        var c = this.horiz,
          f = this.left;
        const g = this.top;
        var a = this.len;
        const l = this.options.title,
          e = c ? f : g,
          x =
          this.opposite,
          d = this.offset,
          h = l.x,
          w = l.y,
          z = this.chart.renderer.fontMetrics(b);
        b = b ? Math.max(b.getBBox(!1, 0).height - z.h - 1, 0) : 0;
        a = {
          low: e + (c ? 0 : a),
          middle: e + a / 2,
          high: e + (c ? a : 0)
        } [l.align];
        f = (c ? g + this.height : f) + (c ? 1 : -1) * (x ? -1 : 1) * (this.axisTitleMargin || 0) + [-b, b, z.f, -b][this.side];
        c = {
          x: c ? a + h : f + (x ? this.width : 0) + d + h,
          y: c ? f + w - (x ? this.height : 0) + d : a + w
        };
        q(this, "afterGetTitlePosition", {
          titlePosition: c
        });
        return c
      }
      renderMinorTick(b, c) {
        const f = this.minorTicks;
        f[b] || (f[b] = new C(this, b, "minor"));
        c && f[b].isNew && f[b].render(null,
          !0);
        f[b].render(null, !1, 1)
      }
      renderTick(b, c, f) {
        const g = this.ticks;
        if (!this.isLinked || b >= this.min && b <= this.max || this.grid && this.grid.isColumn) g[b] || (g[b] = new C(this, b)), f && g[b].isNew && g[b].render(c, !0, -1), g[b].render(c)
      }
      render() {
        const b = this,
          f = b.chart,
          g = b.logarithmic,
          a = b.options,
          e = b.isLinked,
          x = b.tickPositions,
          d = b.axisTitle,
          h = b.ticks,
          w = b.minorTicks,
          z = b.alternateBands,
          k = a.stackLabels,
          n = a.alternateGridColor,
          m = a.crossing,
          J = b.tickmarkOffset,
          y = b.axisLine,
          p = b.showAxis,
          v = t(f.renderer.globalAnimation);
        let r,
          D;
        b.labelEdge.length = 0;
        b.overlap = !1;
        [h, w, z].forEach(function(b) {
          c(b, function(b) {
            b.isActive = !1
          })
        });
        if (l(m)) {
          const b = this.isXAxis ? f.yAxis[0] : f.xAxis[0],
            c = [1, -1, -1, 1][this.side];
          b && (this.offset = c * b.toPixels(m, !0))
        }
        if (b.hasData() || e) {
          const c = b.chart.hasRendered && b.old && l(b.old.min);
          b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function(f) {
            b.renderMinorTick(f, c)
          });
          x.length && (x.forEach(function(f, g) {
            b.renderTick(f, g, c)
          }), J && (0 === b.min || b.single) && (h[-1] || (h[-1] = new C(b, -1, null, !0)),
            h[-1].render(-1)));
          n && x.forEach(function(c, a) {
            D = "undefined" !== typeof x[a + 1] ? x[a + 1] + J : b.max - J;
            0 === a % 2 && c < b.max && D <= b.max + (f.polar ? -J : J) && (z[c] || (z[c] = new G.PlotLineOrBand(b)), r = c + J, z[c].options = {
              from: g ? g.lin2log(r) : r,
              to: g ? g.lin2log(D) : D,
              color: n,
              className: "highcharts-alternate-grid"
            }, z[c].render(), z[c].isActive = !0)
          });
          b._addedPlotLB || (b._addedPlotLB = !0, (a.plotLines || []).concat(a.plotBands || []).forEach(function(c) {
            b.addPlotBandOrLine(c)
          }))
        } [h, w, z].forEach(function(b) {
          const g = [],
            a = v.duration;
          c(b, function(b,
            c) {
            b.isActive || (b.render(c, !1, 0), b.isActive = !1, g.push(c))
          });
          Q(function() {
            let c = g.length;
            for (; c--;) b[g[c]] && !b[g[c]].isActive && (b[g[c]].destroy(), delete b[g[c]])
          }, b !== z && f.hasRendered && a ? a : 0)
        });
        y && (y[y.isPlaced ? "animate" : "attr"]({
          d: this.getLinePath(y.strokeWidth())
        }), y.isPlaced = !0, y[p ? "show" : "hide"](p));
        d && p && (d[d.isNew ? "attr" : "animate"](b.getTitlePosition(d)), d.isNew = !1);
        k && k.enabled && b.stacking && b.stacking.renderStackTotals();
        b.old = {
          len: b.len,
          max: b.max,
          min: b.min,
          transA: b.transA,
          userMax: b.userMax,
          userMin: b.userMin
        };
        b.isDirty = !1;
        q(this, "afterRender")
      }
      redraw() {
        this.visible && (this.render(), this.plotLinesAndBands.forEach(function(b) {
          b.render()
        }));
        this.series.forEach(function(b) {
          b.isDirty = !0
        })
      }
      getKeepProps() {
        return this.keepProps || R.keepProps
      }
      destroy(b) {
        const f = this,
          g = f.plotLinesAndBands,
          a = this.eventOptions;
        q(this, "destroy", {
          keepEvents: b
        });
        b || J(f);
        [f.ticks, f.minorTicks, f.alternateBands].forEach(function(b) {
          D(b)
        });
        if (g)
          for (b = g.length; b--;) g[b].destroy();
        "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(b) {
          f[b] &&
            (f[b] = f[b].destroy())
        });
        for (const b in f.plotLinesAndBandsGroups) f.plotLinesAndBandsGroups[b] = f.plotLinesAndBandsGroups[b].destroy();
        c(f, function(b, c) {
          -1 === f.getKeepProps().indexOf(c) && delete f[c]
        });
        this.eventOptions = a
      }
      drawCrosshair(b, c) {
        const g = this.crosshair;
        var a = f(g && g.snap, !0);
        const l = this.chart;
        let x, d = this.cross;
        q(this, "drawCrosshair", {
          e: b,
          point: c
        });
        b || (b = this.cross && this.cross.e);
        if (g && !1 !== (h(c) || !a)) {
          a ? h(c) && (x = f("colorAxis" !== this.coll ? c.crosshairPos : null, this.isXAxis ? c.plotX : this.len -
            c.plotY)) : x = b && (this.horiz ? b.chartX - this.pos : this.len - b.chartY + this.pos);
          if (h(x)) {
            var w = {
              value: c && (this.isXAxis ? c.x : f(c.stackY, c.y)),
              translatedValue: x
            };
            l.polar && e(w, {
              isCrosshair: !0,
              chartX: b && b.chartX,
              chartY: b && b.chartY,
              point: c
            });
            w = this.getPlotLinePath(w) || null
          }
          if (!h(w)) {
            this.hideCrosshair();
            return
          }
          a = this.categories && !this.isRadial;
          d || (this.cross = d = l.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (a ? "category " : "thin ") + (g.className || "")).attr({
              zIndex: f(g.zIndex, 2)
            }).add(), l.styledMode ||
            (d.attr({
              stroke: g.color || (a ? H.parse("#ccd3ff").setOpacity(.25).get() : "#cccccc"),
              "stroke-width": f(g.width, 1)
            }).css({
              "pointer-events": "none"
            }), g.dashStyle && d.attr({
              dashstyle: g.dashStyle
            })));
          d.show().attr({
            d: w
          });
          a && !g.width && d.attr({
            "stroke-width": this.transA
          });
          this.cross.e = b
        } else this.hideCrosshair();
        q(this, "afterDrawCrosshair", {
          e: b,
          point: c
        })
      }
      hideCrosshair() {
        this.cross && this.cross.hide();
        q(this, "afterHideCrosshair")
      }
      hasVerticalPanning() {
        const b = this.chart.options.chart.panning;
        return !!(b && b.enabled &&
          /y/.test(b.type))
      }
      update(b, c) {
        const a = this.chart;
        b = g(this.userOptions, b);
        this.destroy(!0);
        this.init(a, b);
        a.isDirtyBox = !0;
        f(c, !0) && a.redraw()
      }
      remove(b) {
        const c = this.chart,
          g = this.coll,
          a = this.series;
        let l = a.length;
        for (; l--;) a[l] && a[l].remove(!1);
        u(c.axes, this);
        u(c[g], this);
        c[g].forEach(function(b, c) {
          b.options.index = b.userOptions.index = c
        });
        this.destroy();
        c.isDirtyBox = !0;
        f(b, !0) && c.redraw()
      }
      setTitle(b, c) {
        this.update({
          title: b
        }, c)
      }
      setCategories(b, c) {
        this.update({
          categories: b
        }, c)
      }
    }
    R.defaultOptions = A.defaultXAxisOptions;
    R.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
    "";
    return R
  });
  M(a, "Core/Axis/DateTimeAxis.js", [a["Core/Utilities.js"]], function(a) {
    const {
      addEvent: u,
      getMagnitude: H,
      normalizeTickInterval: I,
      timeUnits: F
    } = a;
    var G;
    (function(C) {
      function B() {
        return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
      }

      function t(a) {
        "datetime" !== a.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new d(this))
      }
      const r = [];
      C.compose = function(d) {
        a.pushUnique(r, d) && (d.keepProps.push("dateTime"),
          d.prototype.getTimeTicks = B, u(d, "init", t));
        return d
      };
      class d {
        constructor(a) {
          this.axis = a
        }
        normalizeTimeTickInterval(a, d) {
          const k = d || [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1, 2]],
            ["week", [1, 2]],
            ["month", [1, 2, 3, 4, 6]],
            ["year", null]
          ];
          d = k[k.length - 1];
          let m = F[d[0]],
            n = d[1],
            h;
          for (h = 0; h < k.length && !(d = k[h], m = F[d[0]], n = d[1], k[h + 1] && a <= (m * n[n.length - 1] + F[k[h + 1][0]]) / 2); h++);
          m === F.year && a < 5 * m && (n = [1, 2, 5]);
          a = I(a / m, n,
            "year" === d[0] ? Math.max(H(a / m), 1) : 1);
          return {
            unitRange: m,
            count: a,
            unitName: d[0]
          }
        }
        getXDateFormat(a, d) {
          const {
            axis: k
          } = this, m = k.chart.time;
          return k.closestPointRange ? m.getDateFormat(k.closestPointRange, a, k.options.startOfWeek, d) || m.resolveDTLFormat(d.year).main : m.resolveDTLFormat(d.day).main
        }
      }
      C.Additions = d
    })(G || (G = {}));
    return G
  });
  M(a, "Core/Axis/LogarithmicAxis.js", [a["Core/Utilities.js"]], function(a) {
    const {
      addEvent: u,
      normalizeTickInterval: H,
      pick: I
    } = a;
    var F;
    (function(A) {
      function C(a) {
        let d = this.logarithmic;
        "logarithmic" !== a.userOptions.type ? this.logarithmic = void 0 : d || (this.logarithmic = new r(this))
      }

      function B() {
        const a = this.logarithmic;
        a && (this.lin2val = function(d) {
          return a.lin2log(d)
        }, this.val2lin = function(d) {
          return a.log2lin(d)
        })
      }
      const t = [];
      A.compose = function(d) {
        a.pushUnique(t, d) && (d.keepProps.push("logarithmic"), u(d, "init", C), u(d, "afterInit", B));
        return d
      };
      class r {
        constructor(a) {
          this.axis = a
        }
        getLogTickPositions(a, p, m, k) {
          const d = this.axis;
          var n = d.len,
            h = d.options;
          let r = [];
          k || (this.minorAutoInterval = void 0);
          if (.5 <= a) a = Math.round(a), r = d.getLinearTickPositions(a, p, m);
          else if (.08 <= a) {
            h = Math.floor(p);
            let d, v, e, q, y;
            for (n = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; h < m + 1 && !y; h++)
              for (v = n.length, d = 0; d < v && !y; d++) e = this.log2lin(this.lin2log(h) * n[d]), e > p && (!k || q <= m) && "undefined" !== typeof q && r.push(q), q > m && (y = !0), q = e
          } else p = this.lin2log(p), m = this.lin2log(m), a = k ? d.getMinorTickInterval() : h.tickInterval, a = I("auto" === a ? null : a, this.minorAutoInterval, h.tickPixelInterval / (k ? 5 : 1) * (m - p) / ((k ? n / d.tickPositions.length :
            n) || 1)), a = H(a), r = d.getLinearTickPositions(a, p, m).map(this.log2lin), k || (this.minorAutoInterval = a / 5);
          k || (d.tickInterval = a);
          return r
        }
        lin2log(a) {
          return Math.pow(10, a)
        }
        log2lin(a) {
          return Math.log(a) / Math.LN10
        }
      }
      A.Additions = r
    })(F || (F = {}));
    return F
  });
  M(a, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [a["Core/Utilities.js"]], function(a) {
    const {
      erase: u,
      extend: H,
      isNumber: I
    } = a;
    var F;
    (function(A) {
      function C(a) {
        return this.addPlotBandOrLine(a, "plotBands")
      }

      function B(a, d) {
        const h = this.userOptions;
        let k = new v(this,
          a);
        this.visible && (k = k.render());
        if (k) {
          this._addedPlotLB || (this._addedPlotLB = !0, (h.plotLines || []).concat(h.plotBands || []).forEach(a => {
            this.addPlotBandOrLine(a)
          }));
          if (d) {
            const k = h[d] || [];
            k.push(a);
            h[d] = k
          }
          this.plotLinesAndBands.push(k)
        }
        return k
      }

      function t(a) {
        return this.addPlotBandOrLine(a, "plotLines")
      }

      function r(a, d, k = this.options) {
        const h = this.getPlotLinePath({
            value: d,
            force: !0,
            acrossPanes: k.acrossPanes
          }),
          m = [],
          e = this.horiz;
        d = !I(this.min) || !I(this.max) || a < this.min && d < this.min || a > this.max && d > this.max;
        a = this.getPlotLinePath({
          value: a,
          force: !0,
          acrossPanes: k.acrossPanes
        });
        k = 1;
        let q;
        if (a && h)
          for (d && (q = a.toString() === h.toString(), k = 0), d = 0; d < a.length; d += 2) {
            const n = a[d],
              l = a[d + 1],
              w = h[d],
              g = h[d + 1];
            "M" !== n[0] && "L" !== n[0] || "M" !== l[0] && "L" !== l[0] || "M" !== w[0] && "L" !== w[0] || "M" !== g[0] && "L" !== g[0] || (e && w[1] === n[1] ? (w[1] += k, g[1] += k) : e || w[2] !== n[2] || (w[2] += k, g[2] += k), m.push(["M", n[1], n[2]], ["L", l[1], l[2]], ["L", g[1], g[2]], ["L", w[1], w[2]], ["Z"]));
            m.isFlat = q
          }
        return m
      }

      function d(a) {
        this.removePlotBandOrLine(a)
      }

      function p(a) {
        const d =
          this.plotLinesAndBands,
          k = this.options,
          m = this.userOptions;
        if (d) {
          let h = d.length;
          for (; h--;) d[h].id === a && d[h].destroy();
          [k.plotLines || [], m.plotLines || [], k.plotBands || [], m.plotBands || []].forEach(function(e) {
            for (h = e.length; h--;)(e[h] || {}).id === a && u(e, e[h])
          })
        }
      }

      function m(a) {
        this.removePlotBandOrLine(a)
      }
      const k = [];
      let v;
      A.compose = function(n, h) {
        v || (v = n);
        a.pushUnique(k, h) && H(h.prototype, {
          addPlotBand: C,
          addPlotLine: t,
          addPlotBandOrLine: B,
          getPlotBandPath: r,
          removePlotBand: d,
          removePlotLine: m,
          removePlotBandOrLine: p
        });
        return h
      }
    })(F || (F = {}));
    return F
  });
  M(a, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [a["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], a["Core/Utilities.js"]], function(a, A) {
    const {
      arrayMax: u,
      arrayMin: I,
      defined: F,
      destroyObjectProperties: G,
      erase: C,
      fireEvent: B,
      merge: t,
      objectEach: r,
      pick: d
    } = A;
    class p {
      static compose(d) {
        return a.compose(p, d)
      }
      constructor(a, d) {
        this.axis = a;
        d && (this.options = d, this.id = d.id)
      }
      render() {
        B(this, "render");
        const a = this,
          k = a.axis,
          p = k.horiz;
        var n = k.logarithmic;
        const h = a.options,
          D = h.color,
          u = d(h.zIndex, 0),
          E = h.events,
          e = {},
          q = k.chart.renderer;
        let y = h.label,
          l = a.label,
          w = h.to,
          g = h.from,
          b = h.value,
          c = a.svgElem;
        var f = [];
        const x = F(g) && F(w);
        f = F(b);
        const J = !c,
          z = {
            "class": "highcharts-plot-" + (x ? "band " : "line ") + (h.className || "")
          };
        let Q = x ? "bands" : "lines";
        n && (g = n.log2lin(g), w = n.log2lin(w), b = n.log2lin(b));
        k.chart.styledMode || (f ? (z.stroke = D || "#999999", z["stroke-width"] = d(h.width, 1), h.dashStyle && (z.dashstyle = h.dashStyle)) : x && (z.fill = D || "#e6e9ff", h.borderWidth && (z.stroke = h.borderColor, z["stroke-width"] = h.borderWidth)));
        e.zIndex = u;
        Q += "-" + u;
        (n = k.plotLinesAndBandsGroups[Q]) || (k.plotLinesAndBandsGroups[Q] = n = q.g("plot-" + Q).attr(e).add());
        J && (a.svgElem = c = q.path().attr(z).add(n));
        if (f) f = k.getPlotLinePath({
          value: b,
          lineWidth: c.strokeWidth(),
          acrossPanes: h.acrossPanes
        });
        else if (x) f = k.getPlotBandPath(g, w, h);
        else return;
        !a.eventsAdded && E && (r(E, function(b, f) {
          c.on(f, function(b) {
            E[f].apply(a, [b])
          })
        }), a.eventsAdded = !0);
        (J || !c.d) && f && f.length ? c.attr({
          d: f
        }) : c && (f ? (c.show(), c.animate({
          d: f
        })) : c.d && (c.hide(), l && (a.label = l = l.destroy())));
        y && (F(y.text) || F(y.formatter)) && f && f.length && 0 < k.width && 0 < k.height && !f.isFlat ? (y = t({
          align: p && x && "center",
          x: p ? !x && 4 : 10,
          verticalAlign: !p && x && "middle",
          y: p ? x ? 16 : 10 : x ? 6 : -4,
          rotation: p && !x && 90
        }, y), this.renderLabel(y, f, x, u)) : l && l.hide();
        return a
      }
      renderLabel(a, d, p, n) {
        const h = this.axis;
        var k = h.chart.renderer;
        let m = this.label;
        m || (this.label = m = k.text(this.getLabelText(a), 0, 0, a.useHTML).attr({
          align: a.textAlign || a.align,
          rotation: a.rotation,
          "class": "highcharts-plot-" + (p ? "band" : "line") + "-label " + (a.className || ""),
          zIndex: n
        }).add(), h.chart.styledMode || m.css(t({
          fontSize: "0.8em",
          textOverflow: "ellipsis"
        }, a.style)));
        n = d.xBounds || [d[0][1], d[1][1], p ? d[2][1] : d[0][1]];
        d = d.yBounds || [d[0][2], d[1][2], p ? d[2][2] : d[0][2]];
        p = I(n);
        k = I(d);
        m.align(a, !1, {
          x: p,
          y: k,
          width: u(n) - p,
          height: u(d) - k
        });
        m.alignValue && "left" !== m.alignValue || (a = a.clip ? h.width : h.chart.chartWidth, m.css({
          width: (90 === m.rotation ? h.height - (m.alignAttr.y - h.top) : a - (m.alignAttr.x - h.left)) + "px"
        }));
        m.show(!0)
      }
      getLabelText(a) {
        return F(a.formatter) ? a.formatter.call(this) :
          a.text
      }
      destroy() {
        C(this.axis.plotLinesAndBands, this);
        delete this.axis;
        G(this)
      }
    }
    "";
    "";
    return p
  });
  M(a, "Core/Tooltip.js", [a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Utilities.js"]], function(a, A, H, I, F) {
    const {
      format: u
    } = a, {
      doc: C,
      isSafari: B
    } = A, {
      distribute: t
    } = H, {
      addEvent: r,
      clamp: d,
      css: p,
      discardElement: m,
      extend: k,
      fireEvent: v,
      isArray: n,
      isNumber: h,
      isString: D,
      merge: L,
      pick: E,
      splat: e,
      syncTimeout: q
    } = F;
    class y {
      constructor(a,
        e) {
        this.allowShared = !0;
        this.container = void 0;
        this.crosshairs = [];
        this.distance = 0;
        this.isHidden = !0;
        this.isSticky = !1;
        this.now = {};
        this.options = {};
        this.outside = !1;
        this.chart = a;
        this.init(a, e)
      }
      bodyFormatter(a) {
        return a.map(function(a) {
          const g = a.series.tooltipOptions;
          return (g[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, g[(a.point.formatPrefix || "point") + "Format"] || "")
        })
      }
      cleanSplit(a) {
        this.chart.series.forEach(function(l) {
          const g = l && l.tt;
          g && (!g.isActive || a ? l.tt = g.destroy() :
            g.isActive = !1)
        })
      }
      defaultFormatter(a) {
        const l = this.points || e(this);
        let g;
        g = [a.tooltipFooterHeaderFormatter(l[0])];
        g = g.concat(a.bodyFormatter(l));
        g.push(a.tooltipFooterHeaderFormatter(l[0], !0));
        return g
      }
      destroy() {
        this.label && (this.label = this.label.destroy());
        this.split && (this.cleanSplit(!0), this.tt && (this.tt = this.tt.destroy()));
        this.renderer && (this.renderer = this.renderer.destroy(), m(this.container));
        F.clearTimeout(this.hideTimer);
        F.clearTimeout(this.tooltipTimeout)
      }
      getAnchor(a, q) {
        var g = this.chart;
        const b =
          g.pointer,
          c = g.inverted,
          f = g.plotTop;
        g = g.plotLeft;
        a = e(a);
        a[0].series && a[0].series.yAxis && !a[0].series.yAxis.options.reversedStacks && (a = a.slice().reverse());
        if (this.followPointer && q) "undefined" === typeof q.chartX && (q = b.normalize(q)), a = [q.chartX - g, q.chartY - f];
        else if (a[0].tooltipPos) a = a[0].tooltipPos;
        else {
          let b = 0,
            e = 0;
          a.forEach(function(c) {
            if (c = c.pos(!0)) b += c[0], e += c[1]
          });
          b /= a.length;
          e /= a.length;
          this.shared && 1 < a.length && q && (c ? b = q.chartX : e = q.chartY);
          a = [b - g, e - f]
        }
        return a.map(Math.round)
      }
      getClassName(a, e,
        g) {
        const b = a.series,
          c = b.options;
        return [this.options.className, "highcharts-label", g && "highcharts-tooltip-header", e ? "highcharts-tooltip-box" : "highcharts-tooltip", !g && "highcharts-color-" + E(a.colorIndex, b.colorIndex), c && c.className].filter(D).join(" ")
      }
      getLabel() {
        const a = this,
          e = this.chart.styledMode,
          g = this.options,
          b = this.split && this.allowShared,
          c = g.style.pointerEvents || (this.shouldStickOnContact() ? "auto" : "none");
        let f, q = this.chart.renderer;
        if (this.label) {
          var d = !this.label.hasClass("highcharts-label");
          (!b && d || b && !d) && this.destroy()
        }
        if (!this.label) {
          if (this.outside) {
            d = this.chart.options.chart.style;
            const b = I.getRendererType();
            this.container = f = A.doc.createElement("div");
            f.className = "highcharts-tooltip-container";
            p(f, {
              position: "absolute",
              top: "1px",
              pointerEvents: c,
              zIndex: Math.max(this.options.style.zIndex || 0, (d && d.zIndex || 0) + 3)
            });
            A.doc.body.appendChild(f);
            this.renderer = q = new b(f, 0, 0, d, void 0, void 0, q.styledMode)
          }
          b ? this.label = q.g("tooltip") : (this.label = q.label("", 0, 0, g.shape, void 0, void 0, g.useHTML,
            void 0, "tooltip").attr({
            padding: g.padding,
            r: g.borderRadius
          }), e || this.label.attr({
            fill: g.backgroundColor,
            "stroke-width": g.borderWidth || 0
          }).css(g.style).css({
            pointerEvents: c
          }));
          if (a.outside) {
            const b = this.label,
              {
                xSetter: c,
                ySetter: g
              } = b;
            b.xSetter = function(g) {
              c.call(b, a.distance);
              f.style.left = g + "px"
            };
            b.ySetter = function(c) {
              g.call(b, a.distance);
              f.style.top = c + "px"
            }
          }
          this.label.attr({
            zIndex: 8
          }).shadow(g.shadow).add()
        }
        return this.label
      }
      getPlayingField() {
        const {
          body: a,
          documentElement: e
        } = C, {
          chart: g,
          distance: b,
          outside: c
        } = this;
        return {
          width: c ? Math.max(a.scrollWidth, e.scrollWidth, a.offsetWidth, e.offsetWidth, e.clientWidth) - 2 * b : g.chartWidth,
          height: c ? Math.max(a.scrollHeight, e.scrollHeight, a.offsetHeight, e.offsetHeight, e.clientHeight) : g.chartHeight
        }
      }
      getPosition(a, e, g) {
        const b = this.chart,
          c = this.distance,
          f = {},
          l = b.inverted && g.h || 0,
          q = this.outside;
        var d = this.getPlayingField();
        const h = d.width,
          k = d.height,
          w = b.pointer.getChartPosition();
        d = f => {
          const l = "x" === f;
          return [f, l ? h : k, l ? a : e].concat(q ? [l ? a * w.scaleX : e * w.scaleY, l ? w.left -
            c + (g.plotX + b.plotLeft) * w.scaleX : w.top - c + (g.plotY + b.plotTop) * w.scaleY, 0, l ? h : k
          ] : [l ? a : e, l ? g.plotX + b.plotLeft : g.plotY + b.plotTop, l ? b.plotLeft : b.plotTop, l ? b.plotLeft + b.plotWidth : b.plotTop + b.plotHeight])
        };
        let m = d("y"),
          n = d("x"),
          y;
        d = !!g.negative;
        !b.polar && b.hoverSeries && b.hoverSeries.yAxis && b.hoverSeries.yAxis.reversed && (d = !d);
        const p = !this.followPointer && E(g.ttBelow, !b.inverted === d),
          r = function(b, a, g, e, d, x, h) {
            const k = q ? "y" === b ? c * w.scaleY : c * w.scaleX : c,
              z = (g - e) / 2,
              m = e < d - c,
              n = d + c + e < a,
              J = d - k - g + z;
            d = d + k - z;
            if (p && n) f[b] =
              d;
            else if (!p && m) f[b] = J;
            else if (m) f[b] = Math.min(h - e, 0 > J - l ? J : J - l);
            else if (n) f[b] = Math.max(x, d + l + g > a ? d : d + l);
            else return !1
          },
          K = function(b, a, g, e, l) {
            let d;
            l < c || l > a - c ? d = !1 : f[b] = l < g / 2 ? 1 : l > a - e / 2 ? a - e - 2 : l - g / 2;
            return d
          },
          v = function(b) {
            const c = m;
            m = n;
            n = c;
            y = b
          },
          P = function() {
            !1 !== r.apply(0, m) ? !1 !== K.apply(0, n) || y || (v(!0), P()) : y ? f.x = f.y = 0 : (v(!0), P())
          };
        (b.inverted || 1 < this.len) && v();
        P();
        return f
      }
      hide(a) {
        const e = this;
        F.clearTimeout(this.hideTimer);
        a = E(a, this.options.hideDelay);
        this.isHidden || (this.hideTimer = q(function() {
          e.getLabel().fadeOut(a ?
            void 0 : a);
          e.isHidden = !0
        }, a))
      }
      init(a, e) {
        this.chart = a;
        this.options = e;
        this.crosshairs = [];
        this.now = {
          x: 0,
          y: 0
        };
        this.isHidden = !0;
        this.split = e.split && !a.inverted && !a.polar;
        this.shared = e.shared || this.split;
        this.outside = E(e.outside, !(!a.scrollablePixelsX && !a.scrollablePixelsY))
      }
      shouldStickOnContact(a) {
        return !(this.followPointer || !this.options.stickOnContact || a && !this.chart.pointer.inClass(a.target, "highcharts-tooltip"))
      }
      move(a, e, g, b) {
        const c = this,
          f = c.now,
          l = !1 !== c.options.animation && !c.isHidden && (1 < Math.abs(a -
            f.x) || 1 < Math.abs(e - f.y)),
          d = c.followPointer || 1 < c.len;
        k(f, {
          x: l ? (2 * f.x + a) / 3 : a,
          y: l ? (f.y + e) / 2 : e,
          anchorX: d ? void 0 : l ? (2 * f.anchorX + g) / 3 : g,
          anchorY: d ? void 0 : l ? (f.anchorY + b) / 2 : b
        });
        c.getLabel().attr(f);
        c.drawTracker();
        l && (F.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
          c && c.move(a, e, g, b)
        }, 32))
      }
      refresh(a, d) {
        const g = this.chart,
          b = this.options,
          c = g.pointer,
          f = e(a),
          l = f[0],
          q = [];
        var h = b.formatter || this.defaultFormatter,
          k = this.shared;
        const w = g.styledMode;
        let m = {};
        if (b.enabled && l.series) {
          F.clearTimeout(this.hideTimer);
          this.allowShared = !(!n(a) && a.series && a.series.noSharedTooltip);
          this.followPointer = !this.split && l.series.tooltipOptions.followPointer;
          a = this.getAnchor(a, d);
          var y = a[0],
            p = a[1];
          k && this.allowShared ? (c.applyInactiveState(f), f.forEach(function(b) {
            b.setState("hover");
            q.push(b.getLabelConfig())
          }), m = {
            x: l.category,
            y: l.y
          }, m.points = q) : m = l.getLabelConfig();
          this.len = q.length;
          h = h.call(m, this);
          k = l.series;
          this.distance = E(k.tooltipOptions.distance, 16);
          if (!1 === h) this.hide();
          else {
            if (this.split && this.allowShared) this.renderSplit(h,
              f);
            else {
              let e = y,
                q = p;
              d && c.isDirectTouch && (e = d.chartX - g.plotLeft, q = d.chartY - g.plotTop);
              if (g.polar || !1 === k.options.clip || f.some(b => c.isDirectTouch || b.series.shouldShowTooltip(e, q))) d = this.getLabel(), b.style.width && !w || d.css({
                width: (this.outside ? this.getPlayingField() : g.spacingBox).width + "px"
              }), d.attr({
                text: h && h.join ? h.join("") : h
              }), d.addClass(this.getClassName(l), !0), w || d.attr({
                stroke: b.borderColor || l.color || k.color || "#666666"
              }), this.updatePosition({
                plotX: y,
                plotY: p,
                negative: l.negative,
                ttBelow: l.ttBelow,
                h: a[2] || 0
              });
              else {
                this.hide();
                return
              }
            }
            this.isHidden && this.label && this.label.attr({
              opacity: 1
            }).show();
            this.isHidden = !1
          }
          v(this, "refresh")
        }
      }
      renderSplit(a, e) {
        function g(c, a, f, g, e = !0) {
          f ? (a = X ? 0 : H, c = d(c - g / 2, P.left, P.right - g - (b.outside ? U : 0))) : (a -= F, c = e ? c - g - u : c + u, c = d(c, e ? c : P.left, P.right));
          return {
            x: c,
            y: a
          }
        }
        const b = this,
          {
            chart: c,
            chart: {
              chartWidth: f,
              chartHeight: l,
              plotHeight: q,
              plotLeft: h,
              plotTop: m,
              pointer: w,
              scrollablePixelsY: n = 0,
              scrollablePixelsX: y,
              scrollingContainer: {
                scrollLeft: p,
                scrollTop: r
              } = {
                scrollLeft: 0,
                scrollTop: 0
              },
              styledMode: v
            },
            distance: u,
            options: K,
            options: {
              positioner: Y
            }
          } = b,
          P = b.outside && "number" !== typeof y ? C.documentElement.getBoundingClientRect() : {
            left: p,
            right: p + f,
            top: r,
            bottom: r + l
          },
          L = b.getLabel(),
          T = this.renderer || c.renderer,
          X = !(!c.xAxis[0] || !c.xAxis[0].opposite),
          {
            left: U,
            top: A
          } = w.getChartPosition();
        let F = m + r,
          G = 0,
          H = q - n;
        D(a) && (a = [!1, a]);
        a = a.slice(0, e.length + 1).reduce(function(c, a, f) {
          if (!1 !== a && "" !== a) {
            f = e[f - 1] || {
              isHeader: !0,
              plotX: e[0].plotX,
              plotY: q,
              series: {}
            };
            const n = f.isHeader;
            var l = n ? b : f.series,
              x; {
              var k = f;
              a = a.toString();
              var w = l.tt;
              const {
                isHeader: c,
                series: g
              } = k;
              w || (w = {
                padding: K.padding,
                r: K.borderRadius
              }, v || (w.fill = K.backgroundColor, w["stroke-width"] = null !== (x = K.borderWidth) && void 0 !== x ? x : 1), w = T.label("", 0, 0, K[c ? "headerShape" : "shape"], void 0, void 0, K.useHTML).addClass(b.getClassName(k, !0, c)).attr(w).add(L));
              w.isActive = !0;
              w.attr({
                text: a
              });
              v || w.css(K.style).attr({
                stroke: K.borderColor || k.color || g.color || "#333333"
              });
              x = w
            }
            x = l.tt = x;
            k = x.getBBox();
            l = k.width + x.strokeWidth();
            n && (G = k.height, H += G, X && (F -= G)); {
              const {
                isHeader: b,
                plotX: c = 0,
                plotY: g = 0,
                series: e
              } = f;
              if (b) {
                a = h + c;
                var z = m + q / 2
              } else {
                const {
                  xAxis: b,
                  yAxis: f
                } = e;
                a = b.pos + d(c, -u, b.len + u);
                e.shouldShowTooltip(0, f.pos - m + g, {
                  ignoreX: !0
                }) && (z = f.pos + g)
              }
              a = d(a, P.left - u, P.right + u);
              z = {
                anchorX: a,
                anchorY: z
              }
            }
            const {
              anchorX: J,
              anchorY: y
            } = z;
            "number" === typeof y ? (z = k.height + 1, k = Y ? Y.call(b, l, z, f) : g(J, y, n, l), c.push({
              align: Y ? 0 : void 0,
              anchorX: J,
              anchorY: y,
              boxWidth: l,
              point: f,
              rank: E(k.rank, n ? 1 : 0),
              size: z,
              target: k.y,
              tt: x,
              x: k.x
            })) : x.isActive = !1
          }
          return c
        }, []);
        !Y && a.some(c => {
          var {
            outside: a
          } = b;
          a = (a ? U : 0) +
            c.anchorX;
          return a < P.left && a + c.boxWidth < P.right ? !0 : a < U - P.left + c.boxWidth && P.right - a > a
        }) && (a = a.map(b => {
          const {
            x: c,
            y: a
          } = g(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1);
          return k(b, {
            target: a,
            x: c
          })
        }));
        b.cleanSplit();
        t(a, H);
        var I = U,
          ha = U;
        a.forEach(function(c) {
          const {
            x: a,
            boxWidth: f,
            isHeader: g
          } = c;
          g || (b.outside && U + a < I && (I = U + a), !g && b.outside && I + f > ha && (ha = U + a))
        });
        a.forEach(function(c) {
          const {
            x: a,
            anchorX: f,
            anchorY: g,
            pos: e,
            point: {
              isHeader: l
            }
          } = c, d = {
            visibility: "undefined" === typeof e ? "hidden" : "inherit",
            x: a,
            y: (e || 0) + F,
            anchorX: f,
            anchorY: g
          };
          if (b.outside && a < f) {
            const b = U - I;
            0 < b && (l || (d.x = a + b, d.anchorX = f + b), l && (d.x = (ha - I) / 2, d.anchorX = f + b))
          }
          c.tt.attr(d)
        });
        const {
          container: ia,
          outside: ka,
          renderer: ja
        } = b;
        if (ka && ia && ja) {
          const {
            width: b,
            height: c,
            x: a,
            y: f
          } = L.getBBox();
          ja.setSize(b + a, c + f, !1);
          ia.style.left = I + "px";
          ia.style.top = A + "px"
        }
        B && L.attr({
          opacity: 1 === L.opacity ? .999 : 1
        })
      }
      drawTracker() {
        if (this.shouldStickOnContact()) {
          var a = this.chart,
            e = this.label,
            g = this.shared ? a.hoverPoints : a.hoverPoint;
          if (e && g) {
            var b = {
              x: 0,
              y: 0,
              width: 0,
              height: 0
            };
            g = this.getAnchor(g);
            var c = e.getBBox();
            g[0] += a.plotLeft - e.translateX;
            g[1] += a.plotTop - e.translateY;
            b.x = Math.min(0, g[0]);
            b.y = Math.min(0, g[1]);
            b.width = 0 > g[0] ? Math.max(Math.abs(g[0]), c.width - g[0]) : Math.max(Math.abs(g[0]), c.width);
            b.height = 0 > g[1] ? Math.max(Math.abs(g[1]), c.height - Math.abs(g[1])) : Math.max(Math.abs(g[1]), c.height);
            this.tracker ? this.tracker.attr(b) : (this.tracker = e.renderer.rect(b).addClass("highcharts-tracker").add(e), a.styledMode || this.tracker.attr({
              fill: "rgba(0,0,0,0)"
            }))
          }
        } else this.tracker &&
          (this.tracker = this.tracker.destroy())
      }
      styledModeFormat(a) {
        return a.replace('style="font-size: 0.8em"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"')
      }
      tooltipFooterHeaderFormatter(a, e) {
        const g = a.series,
          b = g.tooltipOptions;
        var c = g.xAxis;
        const f = c && c.dateTime;
        c = {
          isFooter: e,
          labelConfig: a
        };
        let l = b.xDateFormat,
          d = b[e ? "footerFormat" : "headerFormat"];
        v(this, "headerFormatter", c, function(c) {
          f &&
            !l && h(a.key) && (l = f.getXDateFormat(a.key, b.dateTimeLabelFormats));
          f && l && (a.point && a.point.tooltipDateKeys || ["key"]).forEach(function(b) {
            d = d.replace("{point." + b + "}", "{point." + b + ":" + l + "}")
          });
          g.chart.styledMode && (d = this.styledModeFormat(d));
          c.text = u(d, {
            point: a,
            series: g
          }, this.chart)
        });
        return c.text
      }
      update(a) {
        this.destroy();
        L(!0, this.chart.options.tooltip.userOptions, a);
        this.init(this.chart, L(!0, this.options, a))
      }
      updatePosition(a) {
        const {
          chart: e,
          distance: g,
          options: b
        } = this;
        var c = e.pointer;
        const f = this.getLabel(),
          {
            left: l,
            top: d,
            scaleX: q,
            scaleY: h
          } = c.getChartPosition();
        c = (b.positioner || this.getPosition).call(this, f.width, f.height, a);
        let k = (a.plotX || 0) + e.plotLeft;
        a = (a.plotY || 0) + e.plotTop;
        let m;
        if (this.outside) {
          b.positioner && (c.x += l - g, c.y += d - g);
          m = (b.borderWidth || 0) + 2 * g;
          this.renderer.setSize(f.width + m, f.height + m, !1);
          if (1 !== q || 1 !== h) p(this.container, {
            transform: `scale(${q}, ${h})`
          }), k *= q, a *= h;
          k += l - c.x;
          a += d - c.y
        }
        this.move(Math.round(c.x), Math.round(c.y || 0), k, a)
      }
    }(function(a) {
      const e = [];
      a.compose = function(g) {
        F.pushUnique(e,
          g) && r(g, "afterInit", function() {
          const b = this.chart;
          b.options.tooltip && (b.tooltip = new a(b, b.options.tooltip))
        })
      }
    })(y || (y = {}));
    "";
    return y
  });
  M(a, "Core/Series/Point.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Animation/AnimationUtilities.js"], a["Core/Defaults.js"], a["Core/FormatUtilities.js"], a["Core/Utilities.js"]], function(a, A, H, I, F) {
    const {
      animObject: u
    } = A, {
      defaultOptions: C
    } = H, {
      format: B
    } = I, {
      addEvent: t,
      defined: r,
      erase: d,
      extend: p,
      fireEvent: m,
      getNestedProperty: k,
      isArray: v,
      isFunction: n,
      isNumber: h,
      isObject: D,
      merge: L,
      objectEach: E,
      pick: e,
      syncTimeout: q,
      removeEvent: y,
      uniqueKey: l
    } = F;
    class w {
      constructor() {
        this.category = void 0;
        this.destroyed = !1;
        this.formatPrefix = "point";
        this.id = void 0;
        this.isNull = !1;
        this.percentage = this.options = this.name = void 0;
        this.selected = !1;
        this.total = this.shapeArgs = this.series = void 0;
        this.visible = !0;
        this.x = void 0
      }
      animateBeforeDestroy() {
        const a = this,
          b = {
            x: a.startXPos,
            opacity: 0
          },
          c = a.getGraphicalProps();
        c.singular.forEach(function(c) {
          a[c] = a[c].animate("dataLabel" === c ? {
            x: a[c].startXPos,
            y: a[c].startYPos,
            opacity: 0
          } : b)
        });
        c.plural.forEach(function(b) {
          a[b].forEach(function(b) {
            b.element && b.animate(p({
              x: a.startXPos
            }, b.startYPos ? {
              x: b.startXPos,
              y: b.startYPos
            } : {}))
          })
        })
      }
      applyOptions(a, b) {
        const c = this.series,
          f = c.options.pointValKey || c.pointValKey;
        a = w.prototype.optionsToObject.call(this, a);
        p(this, a);
        this.options = this.options ? p(this.options, a) : a;
        a.group && delete this.group;
        a.dataLabels && delete this.dataLabels;
        f && (this.y = w.prototype.getNestedProperty.call(this, f));
        this.formatPrefix = (this.isNull = this.isValid && !this.isValid()) ?
          "null" : "point";
        this.selected && (this.state = "select");
        "name" in this && "undefined" === typeof b && c.xAxis && c.xAxis.hasNames && (this.x = c.xAxis.nameToX(this));
        "undefined" === typeof this.x && c ? this.x = "undefined" === typeof b ? c.autoIncrement() : b : h(a.x) && c.options.relativeXValue && (this.x = c.autoIncrement(a.x));
        return this
      }
      destroy() {
        if (!this.destroyed) {
          const b = this;
          var a = b.series;
          const c = a.chart;
          a = a.options.dataSorting;
          const f = c.hoverPoints,
            g = u(b.series.chart.renderer.globalAnimation),
            e = () => {
              if (b.graphic || b.graphics ||
                b.dataLabel || b.dataLabels) y(b), b.destroyElements();
              for (const c in b) delete b[c]
            };
          b.legendItem && c.legend.destroyItem(b);
          f && (b.setState(), d(f, b), f.length || (c.hoverPoints = null));
          if (b === c.hoverPoint) b.onMouseOut();
          a && a.enabled ? (this.animateBeforeDestroy(), q(e, g.duration)) : e();
          c.pointCount--
        }
        this.destroyed = !0
      }
      destroyElements(a) {
        const b = this;
        a = b.getGraphicalProps(a);
        a.singular.forEach(function(c) {
          b[c] = b[c].destroy()
        });
        a.plural.forEach(function(c) {
          b[c].forEach(function(b) {
            b && b.element && b.destroy()
          });
          delete b[c]
        })
      }
      firePointEvent(a,
        b, c) {
        const f = this,
          g = this.series.options;
        (g.point.events[a] || f.options && f.options.events && f.options.events[a]) && f.importEvents();
        "click" === a && g.allowPointSelect && (c = function(b) {
          f.select && f.select(null, b.ctrlKey || b.metaKey || b.shiftKey)
        });
        m(f, a, b, c)
      }
      getClassName() {
        return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ?
          " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
      }
      getGraphicalProps(a) {
        const b = this,
          c = [],
          f = {
            singular: [],
            plural: []
          };
        let g, e;
        a = a || {
          graphic: 1,
          dataLabel: 1
        };
        a.graphic && c.push("graphic");
        a.dataLabel && c.push("dataLabel", "dataLabelPath", "dataLabelUpper", "connector");
        for (e = c.length; e--;) g = c[e], b[g] && f.singular.push(g);
        ["graphic", "dataLabel", "connector"].forEach(function(c) {
          const g = c + "s";
          a[c] && b[g] && f.plural.push(g)
        });
        return f
      }
      getLabelConfig() {
        return {
          x: this.category,
          y: this.y,
          color: this.color,
          colorIndex: this.colorIndex,
          key: this.name || this.category,
          series: this.series,
          point: this,
          percentage: this.percentage,
          total: this.total || this.stackTotal
        }
      }
      getNestedProperty(a) {
        if (a) return 0 === a.indexOf("custom.") ? k(a, this.options) : this[a]
      }
      getZone() {
        var a = this.series;
        const b = a.zones;
        a = a.zoneAxis || "y";
        let c, f = 0;
        for (c = b[f]; this[a] >= c.value;) c = b[++f];
        this.nonZonedColor || (this.nonZonedColor = this.color);
        this.color = c && c.color && !this.options.color ? c.color : this.nonZonedColor;
        return c
      }
      hasNewShapeType() {
        return (this.graphic &&
          (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
      }
      init(a, b, c) {
        this.series = a;
        this.applyOptions(b, c);
        this.id = r(this.id) ? this.id : l();
        this.resolveColor();
        a.chart.pointCount++;
        m(this, "afterInit");
        return this
      }
      isValid() {
        return null !== this.x && h(this.y)
      }
      optionsToObject(a) {
        var b = this.series;
        const c = b.options.keys,
          f = c || b.pointArrayMap || ["y"],
          g = f.length;
        let e = {},
          l = 0,
          d = 0;
        if (h(a) || null === a) e[f[0]] = a;
        else if (v(a))
          for (!c && a.length > g && (b = typeof a[0], "string" === b ? e.name = a[0] : "number" === b &&
              (e.x = a[0]), l++); d < g;) c && "undefined" === typeof a[l] || (0 < f[d].indexOf(".") ? w.prototype.setNestedProperty(e, a[l], f[d]) : e[f[d]] = a[l]), l++, d++;
        else "object" === typeof a && (e = a, a.dataLabels && (b._hasPointLabels = !0), a.marker && (b._hasPointMarkers = !0));
        return e
      }
      pos(a, b = this.plotY) {
        if (!this.destroyed) {
          const {
            plotX: c,
            series: f
          } = this, {
            chart: g,
            xAxis: e,
            yAxis: l
          } = f;
          let d = 0,
            q = 0;
          if (h(c) && h(b)) return a && (d = e ? e.pos : g.plotLeft, q = l ? l.pos : g.plotTop), g.inverted && e && l ? [l.len - b + q, e.len - c + d] : [c + d, b + q]
        }
      }
      resolveColor() {
        const a = this.series;
        var b = a.chart.styledMode;
        let c;
        var f = a.chart.options.chart.colorCount;
        delete this.nonZonedColor;
        a.options.colorByPoint ? (b || (f = a.options.colors || a.chart.options.colors, c = f[a.colorCounter], f = f.length), b = a.colorCounter, a.colorCounter++, a.colorCounter === f && (a.colorCounter = 0)) : (b || (c = a.color), b = a.colorIndex);
        this.colorIndex = e(this.options.colorIndex, b);
        this.color = e(this.options.color, c)
      }
      setNestedProperty(a, b, c) {
        c.split(".").reduce(function(c, a, g, e) {
            c[a] = e.length - 1 === g ? b : D(c[a], !0) ? c[a] : {};
            return c[a]
          },
          a);
        return a
      }
      shouldDraw() {
        return !this.isNull
      }
      tooltipFormatter(a) {
        const b = this.series,
          c = b.tooltipOptions,
          f = e(c.valueDecimals, ""),
          g = c.valuePrefix || "",
          l = c.valueSuffix || "";
        b.chart.styledMode && (a = b.chart.tooltip.styledModeFormat(a));
        (b.pointArrayMap || ["y"]).forEach(function(b) {
          b = "{point." + b;
          if (g || l) a = a.replace(RegExp(b + "}", "g"), g + b + "}" + l);
          a = a.replace(RegExp(b + "}", "g"), b + ":,." + f + "f}")
        });
        return B(a, {
          point: this,
          series: this.series
        }, b.chart)
      }
      update(a, b, c, f) {
        function g() {
          l.applyOptions(a);
          var f = q && l.hasMockGraphic;
          f = null === l.y ? !f : f;
          q && f && (l.graphic = q.destroy(), delete l.hasMockGraphic);
          D(a, !0) && (q && q.element && a && a.marker && "undefined" !== typeof a.marker.symbol && (l.graphic = q.destroy()), a && a.dataLabels && l.dataLabel && (l.dataLabel = l.dataLabel.destroy()), l.connector && (l.connector = l.connector.destroy()));
          m = l.index;
          d.updateParallelArrays(l, m);
          k.data[m] = D(k.data[m], !0) || D(a, !0) ? l.options : e(a, k.data[m]);
          d.isDirty = d.isDirtyData = !0;
          !d.fixedBox && d.hasCartesianSeries && (h.isDirtyBox = !0);
          "point" === k.legendType && (h.isDirtyLegend = !0);
          b && h.redraw(c)
        }
        const l = this,
          d = l.series,
          q = l.graphic,
          h = d.chart,
          k = d.options;
        let m;
        b = e(b, !0);
        !1 === f ? g() : l.firePointEvent("update", {
          options: a
        }, g)
      }
      remove(a, b) {
        this.series.removePoint(this.series.data.indexOf(this), a, b)
      }
      select(a, b) {
        const c = this,
          f = c.series,
          g = f.chart;
        this.selectedStaging = a = e(a, !c.selected);
        c.firePointEvent(a ? "select" : "unselect", {
          accumulate: b
        }, function() {
          c.selected = c.options.selected = a;
          f.options.data[f.data.indexOf(c)] = c.options;
          c.setState(a && "select");
          b || g.getSelectedPoints().forEach(function(b) {
            const a =
              b.series;
            b.selected && b !== c && (b.selected = b.options.selected = !1, a.options.data[a.data.indexOf(b)] = b.options, b.setState(g.hoverPoints && a.options.inactiveOtherPoints ? "inactive" : ""), b.firePointEvent("unselect"))
          })
        });
        delete this.selectedStaging
      }
      onMouseOver(a) {
        const b = this.series.chart,
          c = b.pointer;
        a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
        c.runPointActions(a, this)
      }
      onMouseOut() {
        const a = this.series.chart;
        this.firePointEvent("mouseOut");
        this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function(b) {
          b.setState()
        });
        a.hoverPoints = a.hoverPoint = null
      }
      importEvents() {
        if (!this.hasImportedEvents) {
          const a = this,
            b = L(a.series.options.point, a.options).events;
          a.events = b;
          E(b, function(b, f) {
            n(b) && t(a, f, b)
          });
          this.hasImportedEvents = !0
        }
      }
      setState(g, b) {
        const c = this.series;
        var f = this.state,
          l = c.options.states[g || "normal"] || {},
          d = C.plotOptions[c.type].marker && c.options.marker;
        const q = d && !1 === d.enabled,
          k = d && d.states && d.states[g || "normal"] || {},
          n = !1 === k.enabled,
          w = this.marker || {},
          y = c.chart,
          r = d && c.markerAttribs;
        let v = c.halo;
        var D;
        let t;
        var K = c.stateMarkerGraphic;
        g = g || "";
        if (!(g === this.state && !b || this.selected && "select" !== g || !1 === l.enabled || g && (n || q && !1 === k.enabled) || g && w.states && w.states[g] && !1 === w.states[g].enabled)) {
          this.state = g;
          r && (D = c.markerAttribs(this, g));
          if (this.graphic && !this.hasMockGraphic) {
            f && this.graphic.removeClass("highcharts-point-" + f);
            g && this.graphic.addClass("highcharts-point-" + g);
            if (!y.styledMode) {
              f = c.pointAttribs(this, g);
              t = e(y.options.chart.animation, l.animation);
              const b = f.opacity;
              c.options.inactiveOtherPoints &&
                h(b) && ((this.dataLabels || []).forEach(function(c) {
                  c && !c.hasClass("highcharts-data-label-hidden") && c.animate({
                    opacity: b
                  }, t)
                }), this.connector && this.connector.animate({
                  opacity: b
                }, t));
              this.graphic.animate(f, t)
            }
            D && this.graphic.animate(D, e(y.options.chart.animation, k.animation, d.animation));
            K && K.hide()
          } else {
            if (g && k) {
              d = w.symbol || c.symbol;
              K && K.currentSymbol !== d && (K = K.destroy());
              if (D)
                if (K) K[b ? "animate" : "attr"]({
                  x: D.x,
                  y: D.y
                });
                else d && (c.stateMarkerGraphic = K = y.renderer.symbol(d, D.x, D.y, D.width, D.height).add(c.markerGroup),
                  K.currentSymbol = d);
              !y.styledMode && K && "inactive" !== this.state && K.attr(c.pointAttribs(this, g))
            }
            K && (K[g && this.isInside ? "show" : "hide"](), K.element.point = this, K.addClass(this.getClassName(), !0))
          }
          l = l.halo;
          D = (K = this.graphic || K) && K.visibility || "inherit";
          l && l.size && K && "hidden" !== D && !this.isCluster ? (v || (c.halo = v = y.renderer.path().add(K.parentGroup)), v.show()[b ? "animate" : "attr"]({
            d: this.haloPath(l.size)
          }), v.attr({
            "class": "highcharts-halo highcharts-color-" + e(this.colorIndex, c.colorIndex) + (this.className ? " " +
              this.className : ""),
            visibility: D,
            zIndex: -1
          }), v.point = this, y.styledMode || v.attr(p({
            fill: this.color || c.color,
            "fill-opacity": l.opacity
          }, a.filterUserAttributes(l.attributes || {})))) : v && v.point && v.point.haloPath && v.animate({
            d: v.point.haloPath(0)
          }, null, v.hide);
          m(this, "afterSetState", {
            state: g
          })
        }
      }
      haloPath(a) {
        const b = this.pos();
        return b ? this.series.chart.renderer.symbols.circle(Math.floor(b[0]) - a, b[1] - a, 2 * a, 2 * a) : []
      }
    }
    "";
    return w
  });
  M(a, "Core/Pointer.js", [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]],
    function(a, A, H) {
      const {
        parse: u
      } = a, {
        charts: F,
        noop: G
      } = A, {
        addEvent: C,
        attr: B,
        css: t,
        defined: r,
        extend: d,
        find: p,
        fireEvent: m,
        isNumber: k,
        isObject: v,
        objectEach: n,
        offset: h,
        pick: D,
        splat: L
      } = H;
      class E {
        constructor(a, d) {
          this.lastValidTouch = {};
          this.pinchDown = [];
          this.runChartClick = !1;
          this.eventsToUnbind = [];
          this.chart = a;
          this.hasDragged = !1;
          this.options = d;
          this.init(a, d)
        }
        applyInactiveState(a) {
          let e = [],
            d;
          (a || []).forEach(function(a) {
            d = a.series;
            e.push(d);
            d.linkedParent && e.push(d.linkedParent);
            d.linkedSeries && (e = e.concat(d.linkedSeries));
            d.navigatorSeries && e.push(d.navigatorSeries)
          });
          this.chart.series.forEach(function(a) {
            -1 === e.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive")
          })
        }
        destroy() {
          const a = this;
          this.eventsToUnbind.forEach(a => a());
          this.eventsToUnbind = [];
          A.chartCount || (E.unbindDocumentMouseUp && (E.unbindDocumentMouseUp = E.unbindDocumentMouseUp()), E.unbindDocumentTouchEnd && (E.unbindDocumentTouchEnd = E.unbindDocumentTouchEnd()));
          clearInterval(a.tooltipTimeout);
          n(a, function(e, d) {
            a[d] =
              void 0
          })
        }
        getSelectionMarkerAttrs(a, d) {
          const e = {
            args: {
              chartX: a,
              chartY: d
            },
            attrs: {},
            shapeType: "rect"
          };
          m(this, "getSelectionMarkerAttrs", e, e => {
            const {
              chart: l,
              mouseDownX: g = 0,
              mouseDownY: b = 0,
              zoomHor: c,
              zoomVert: f
            } = this;
            e = e.attrs;
            let q;
            e.x = l.plotLeft;
            e.y = l.plotTop;
            e.width = c ? 1 : l.plotWidth;
            e.height = f ? 1 : l.plotHeight;
            c && (q = a - g, e.width = Math.abs(q), e.x = (0 < q ? 0 : q) + g);
            f && (q = d - b, e.height = Math.abs(q), e.y = (0 < q ? 0 : q) + b)
          });
          return e
        }
        drag(a) {
          const e = this.chart,
            d = e.options.chart;
          var l = e.plotLeft;
          const h = e.plotTop,
            g = e.plotWidth,
            b = e.plotHeight,
            c = this.mouseDownX || 0,
            f = this.mouseDownY || 0,
            x = v(d.panning) ? d.panning && d.panning.enabled : d.panning,
            k = d.panKey && a[d.panKey + "Key"];
          let m = a.chartX,
            n = a.chartY,
            p = this.selectionMarker;
          if (!p || !p.touch)
            if (m < l ? m = l : m > l + g && (m = l + g), n < h ? n = h : n > h + b && (n = h + b), this.hasDragged = Math.sqrt(Math.pow(c - m, 2) + Math.pow(f - n, 2)), 10 < this.hasDragged) {
              l = e.isInsidePlot(c - l, f - h, {
                visiblePlotOnly: !0
              });
              const {
                shapeType: b,
                attrs: g
              } = this.getSelectionMarkerAttrs(m, n);
              !e.hasCartesianSeries && !e.mapView || !this.zoomX && !this.zoomY ||
                !l || k || p || (this.selectionMarker = p = e.renderer[b](), p.attr({
                  "class": "highcharts-selection-marker",
                  zIndex: 7
                }).add(), e.styledMode || p.attr({
                  fill: d.selectionMarkerFill || u("#334eff").setOpacity(.25).get()
                }));
              p && p.attr(g);
              l && !p && x && e.pan(a, d.panning)
            }
        }
        dragStart(a) {
          const e = this.chart;
          e.mouseIsDown = a.type;
          e.cancelClick = !1;
          e.mouseDownX = this.mouseDownX = a.chartX;
          e.mouseDownY = this.mouseDownY = a.chartY
        }
        getSelectionBox(a) {
          const e = {
            args: {
              marker: a
            },
            result: {}
          };
          m(this, "getSelectionBox", e, e => {
            e.result = {
              x: a.attr ? +a.attr("x") : a.x,
              y: a.attr ? +a.attr("y") : a.y,
              width: a.attr ? a.attr("width") : a.width,
              height: a.attr ? a.attr("height") : a.height
            }
          });
          return e.result
        }
        drop(a) {
          const e = this,
            h = this.chart,
            l = this.hasPinched;
          if (this.selectionMarker) {
            const {
              x: q,
              y: g,
              width: b,
              height: c
            } = this.getSelectionBox(this.selectionMarker), f = {
              originalEvent: a,
              xAxis: [],
              yAxis: [],
              x: q,
              y: g,
              width: b,
              height: c
            };
            let x = !!h.mapView;
            if (this.hasDragged || l) h.axes.forEach(function(d) {
              if (d.zoomEnabled && r(d.min) && (l || e[{
                  xAxis: "zoomX",
                  yAxis: "zoomY"
                } [d.coll]]) && k(q) && k(g) && k(b) &&
                k(c)) {
                var h = d.horiz;
                const e = "touchend" === a.type ? d.minPixelPadding : 0,
                  l = d.toValue((h ? q : g) + e);
                h = d.toValue((h ? q + b : g + c) - e);
                f[d.coll].push({
                  axis: d,
                  min: Math.min(l, h),
                  max: Math.max(l, h)
                });
                x = !0
              }
            }), x && m(h, "selection", f, function(b) {
              h.zoom(d(b, l ? {
                animation: !1
              } : null))
            });
            k(h.index) && (this.selectionMarker = this.selectionMarker.destroy());
            l && this.scaleGroups()
          }
          h && k(h.index) && (t(h.container, {
            cursor: h._cursor
          }), h.cancelClick = 10 < this.hasDragged, h.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
        }
        findNearestKDPoint(a,
          d, h) {
          let e;
          a.forEach(function(a) {
            var g = !(a.noSharedTooltip && d) && 0 > a.options.findNearestPointBy.indexOf("y");
            a = a.searchPoint(h, g);
            if ((g = v(a, !0) && a.series) && !(g = !v(e, !0))) {
              {
                g = e.distX - a.distX;
                const b = e.dist - a.dist,
                  c = (a.series.group && a.series.group.zIndex) - (e.series.group && e.series.group.zIndex);
                g = 0 !== g && d ? g : 0 !== b ? b : 0 !== c ? c : e.series.index > a.series.index ? -1 : 1
              }
              g = 0 < g
            }
            g && (e = a)
          });
          return e
        }
        getChartCoordinatesFromPoint(a, d) {
          var e = a.series;
          const l = e.xAxis;
          e = e.yAxis;
          const q = a.shapeArgs;
          if (l && e) {
            let g = D(a.clientX,
                a.plotX),
              b = a.plotY || 0;
            a.isNode && q && k(q.x) && k(q.y) && (g = q.x, b = q.y);
            return d ? {
              chartX: e.len + e.pos - b,
              chartY: l.len + l.pos - g
            } : {
              chartX: g + l.pos,
              chartY: b + e.pos
            }
          }
          if (q && q.x && q.y) return {
            chartX: q.x,
            chartY: q.y
          }
        }
        getChartPosition() {
          if (this.chartPosition) return this.chartPosition;
          var {
            container: a
          } = this.chart;
          const d = h(a);
          this.chartPosition = {
            left: d.left,
            top: d.top,
            scaleX: 1,
            scaleY: 1
          };
          const k = a.offsetWidth;
          a = a.offsetHeight;
          2 < k && 2 < a && (this.chartPosition.scaleX = d.width / k, this.chartPosition.scaleY = d.height / a);
          return this.chartPosition
        }
        getCoordinates(a) {
          const e = {
            xAxis: [],
            yAxis: []
          };
          this.chart.axes.forEach(function(d) {
            e[d.isXAxis ? "xAxis" : "yAxis"].push({
              axis: d,
              value: d.toValue(a[d.horiz ? "chartX" : "chartY"])
            })
          });
          return e
        }
        getHoverData(a, d, h, l, k, g) {
          const b = [];
          l = !(!l || !a);
          const c = function(b) {
            return b.visible && !(!k && b.directTouch) && D(b.options.enableMouseTracking, !0)
          };
          let f, e = {
            chartX: g ? g.chartX : void 0,
            chartY: g ? g.chartY : void 0,
            shared: k
          };
          m(this, "beforeGetHoverData", e);
          f = d && !d.stickyTracking ? [d] : h.filter(b => b.stickyTracking && (e.filter || c)(b));
          const q = l || !g ? a : this.findNearestKDPoint(f,
            k, g);
          d = q && q.series;
          q && (k && !d.noSharedTooltip ? (f = h.filter(function(b) {
            return e.filter ? e.filter(b) : c(b) && !b.noSharedTooltip
          }), f.forEach(function(c) {
            let a = p(c.points, function(b) {
              return b.x === q.x && !b.isNull
            });
            v(a) && (c.boosted && c.boost && (a = c.boost.getPoint(a)), b.push(a))
          })) : b.push(q));
          e = {
            hoverPoint: q
          };
          m(this, "afterGetHoverData", e);
          return {
            hoverPoint: e.hoverPoint,
            hoverSeries: d,
            hoverPoints: b
          }
        }
        getPointFromEvent(a) {
          a = a.target;
          let e;
          for (; a && !e;) e = a.point, a = a.parentNode;
          return e
        }
        onTrackerMouseOut(a) {
          a = a.relatedTarget;
          const e = this.chart.hoverSeries;
          this.isDirectTouch = !1;
          if (!(!e || !a || e.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + e.index) && this.inClass(a, "highcharts-tracker"))) e.onMouseOut()
        }
        inClass(a, d) {
          let e;
          for (; a;) {
            if (e = B(a, "class")) {
              if (-1 !== e.indexOf(d)) return !0;
              if (-1 !== e.indexOf("highcharts-container")) return !1
            }
            a = a.parentElement
          }
        }
        init(a, d) {
          this.options = d;
          this.chart = a;
          this.runChartClick = !(!d.chart.events || !d.chart.events.click);
          this.pinchDown = [];
          this.lastValidTouch = {};
          this.setDOMEvents();
          m(this, "afterInit")
        }
        normalize(a, q) {
          var e = a.touches,
            l = e ? e.length ? e.item(0) : D(e.changedTouches, a.changedTouches)[0] : a;
          q || (q = this.getChartPosition());
          e = l.pageX - q.left;
          l = l.pageY - q.top;
          e /= q.scaleX;
          l /= q.scaleY;
          return d(a, {
            chartX: Math.round(e),
            chartY: Math.round(l)
          })
        }
        onContainerClick(a) {
          const e = this.chart,
            h = e.hoverPoint;
          a = this.normalize(a);
          const l = e.plotLeft,
            k = e.plotTop;
          e.cancelClick || (h && this.inClass(a.target, "highcharts-tracker") ? (m(h.series, "click", d(a, {
              point: h
            })), e.hoverPoint &&
            h.firePointEvent("click", a)) : (d(a, this.getCoordinates(a)), e.isInsidePlot(a.chartX - l, a.chartY - k, {
            visiblePlotOnly: !0
          }) && m(e, "click", a)))
        }
        onContainerMouseDown(a) {
          const e = 1 === ((a.buttons || a.button) & 1);
          a = this.normalize(a);
          if (A.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
          if ("undefined" === typeof a.button || e) this.zoomOption(a), e && a.preventDefault && a.preventDefault(), this.dragStart(a)
        }
        onContainerMouseLeave(a) {
          const e = F[D(E.hoverChartIndex, -1)];
          a = this.normalize(a);
          e && a.relatedTarget && !this.inClass(a.relatedTarget,
            "highcharts-tooltip") && (e.pointer.reset(), e.pointer.chartPosition = void 0)
        }
        onContainerMouseEnter(a) {
          delete this.chartPosition
        }
        onContainerMouseMove(a) {
          const e = this.chart,
            d = e.tooltip;
          a = this.normalize(a);
          this.setHoverChartIndex();
          ("mousedown" === e.mouseIsDown || this.touchSelect(a)) && this.drag(a);
          e.openMenu || !this.inClass(a.target, "highcharts-tracker") && !e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop, {
            visiblePlotOnly: !0
          }) || d && d.shouldStickOnContact(a) || (this.inClass(a.target, "highcharts-no-tooltip") ?
            this.reset(!1, 0) : this.runPointActions(a))
        }
        onDocumentTouchEnd(a) {
          const e = F[D(E.hoverChartIndex, -1)];
          e && e.pointer.drop(a)
        }
        onContainerTouchMove(a) {
          if (this.touchSelect(a)) this.onContainerMouseMove(a);
          else this.touch(a)
        }
        onContainerTouchStart(a) {
          if (this.touchSelect(a)) this.onContainerMouseDown(a);
          else this.zoomOption(a), this.touch(a, !0)
        }
        onDocumentMouseMove(a) {
          const e = this.chart,
            d = e.tooltip,
            l = this.chartPosition;
          a = this.normalize(a, l);
          !l || e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop, {
              visiblePlotOnly: !0
            }) ||
            d && d.shouldStickOnContact(a) || this.inClass(a.target, "highcharts-tracker") || this.reset()
        }
        onDocumentMouseUp(a) {
          const e = F[D(E.hoverChartIndex, -1)];
          e && e.pointer.drop(a)
        }
        pinch(a) {
          const e = this,
            h = e.chart,
            l = e.pinchDown,
            k = a.touches || [],
            g = k.length,
            b = e.lastValidTouch,
            c = e.hasZoom,
            f = {},
            x = 1 === g && (e.inClass(a.target, "highcharts-tracker") && h.runTrackerClick || e.runChartClick),
            n = {};
          var z = e.chart.tooltip;
          z = 1 === g && D(z && z.options.followTouchMove, !0);
          let p = e.selectionMarker;
          1 < g ? e.initiated = !0 : z && (e.initiated = !1);
          c && e.initiated &&
            !x && !1 !== a.cancelable && a.preventDefault();
          [].map.call(k, function(b) {
            return e.normalize(b)
          });
          "touchstart" === a.type ? ([].forEach.call(k, function(b, a) {
            l[a] = {
              chartX: b.chartX,
              chartY: b.chartY
            }
          }), b.x = [l[0].chartX, l[1] && l[1].chartX], b.y = [l[0].chartY, l[1] && l[1].chartY], h.axes.forEach(function(b) {
            if (b.zoomEnabled) {
              const a = h.bounds[b.horiz ? "h" : "v"],
                c = b.minPixelPadding,
                f = b.toPixels(Math.min(D(b.options.min, b.dataMin), b.dataMin)),
                g = b.toPixels(Math.max(D(b.options.max, b.dataMax), b.dataMax)),
                e = Math.max(f, g);
              a.min =
                Math.min(b.pos, Math.min(f, g) - c);
              a.max = Math.max(b.pos + b.len, e + c)
            }
          }), e.res = !0) : z ? this.runPointActions(e.normalize(a)) : l.length && (m(h, "touchpan", {
            originalEvent: a
          }, () => {
            p || (e.selectionMarker = p = d({
              destroy: G,
              touch: !0
            }, h.plotBox));
            e.pinchTranslate(l, k, f, p, n, b);
            e.hasPinched = c;
            e.scaleGroups(f, n)
          }), e.res && (e.res = !1, this.reset(!1, 0)))
        }
        pinchTranslate(a, d, h, l, k, g) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, d, h, l, k, g);
          this.zoomVert && this.pinchTranslateDirection(!1, a, d, h, l, k, g)
        }
        pinchTranslateDirection(a, d,
          h, l, k, g, b, c) {
          const f = this.chart,
            e = a ? "x" : "y",
            q = a ? "X" : "Y",
            m = "chart" + q,
            n = a ? "width" : "height",
            w = f["plot" + (a ? "Left" : "Top")],
            p = f.inverted,
            y = f.bounds[a ? "h" : "v"],
            r = 1 === d.length,
            v = d[0][m],
            D = !r && d[1][m];
          d = function() {
            "number" === typeof E && 20 < Math.abs(v - D) && (u = c || Math.abs(P - E) / Math.abs(v - D));
            K = (w - P) / u + v;
            t = f["plot" + (a ? "Width" : "Height")] / u
          };
          let t, K, u = c || 1,
            P = h[0][m],
            E = !r && h[1][m],
            L;
          d();
          h = K;
          h < y.min ? (h = y.min, L = !0) : h + t > y.max && (h = y.max - t, L = !0);
          L ? (P -= .8 * (P - b[e][0]), "number" === typeof E && (E -= .8 * (E - b[e][1])), d()) : b[e] = [P,
            E
          ];
          p || (g[e] = K - w, g[n] = t);
          g = p ? 1 / u : u;
          k[n] = t;
          k[e] = h;
          l[p ? a ? "scaleY" : "scaleX" : "scale" + q] = u;
          l["translate" + q] = g * w + (P - g * v)
        }
        reset(a, d) {
          const e = this.chart,
            l = e.hoverSeries,
            h = e.hoverPoint,
            g = e.hoverPoints,
            b = e.tooltip,
            c = b && b.shared ? g : h;
          a && c && L(c).forEach(function(b) {
            b.series.isCartesian && "undefined" === typeof b.plotX && (a = !1)
          });
          if (a) b && c && L(c).length && (b.refresh(c), b.shared && g ? g.forEach(function(b) {
            b.setState(b.state, !0);
            b.series.isCartesian && (b.series.xAxis.crosshair && b.series.xAxis.drawCrosshair(null, b), b.series.yAxis.crosshair &&
              b.series.yAxis.drawCrosshair(null, b))
          }) : h && (h.setState(h.state, !0), e.axes.forEach(function(b) {
            b.crosshair && h.series[b.coll] === b && b.drawCrosshair(null, h)
          })));
          else {
            if (h) h.onMouseOut();
            g && g.forEach(function(b) {
              b.setState()
            });
            if (l) l.onMouseOut();
            b && b.hide(d);
            this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
            e.axes.forEach(function(b) {
              b.hideCrosshair()
            });
            this.hoverX = e.hoverPoints = e.hoverPoint = null
          }
        }
        runPointActions(a, d, h) {
          const e = this.chart,
            q = e.tooltip && e.tooltip.options.enabled ? e.tooltip :
            void 0,
            g = q ? q.shared : !1;
          let b = d || e.hoverPoint,
            c = b && b.series || e.hoverSeries;
          d = this.getHoverData(b, c, e.series, (!a || "touchmove" !== a.type) && (!!d || c && c.directTouch && this.isDirectTouch), g, a);
          b = d.hoverPoint;
          c = d.hoverSeries;
          const f = d.hoverPoints;
          d = c && c.tooltipOptions.followPointer && !c.tooltipOptions.split;
          const k = g && c && !c.noSharedTooltip;
          if (b && (h || b !== e.hoverPoint || q && q.isHidden)) {
            (e.hoverPoints || []).forEach(function(b) {
              -1 === f.indexOf(b) && b.setState()
            });
            if (e.hoverSeries !== c) c.onMouseOver();
            this.applyInactiveState(f);
            (f || []).forEach(function(b) {
              b.setState("hover")
            });
            e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
            if (!b.series) return;
            e.hoverPoints = f;
            e.hoverPoint = b;
            b.firePointEvent("mouseOver", void 0, () => {
              q && b && q.refresh(k ? f : b, a)
            })
          } else d && q && !q.isHidden && (h = q.getAnchor([{}], a), e.isInsidePlot(h[0], h[1], {
            visiblePlotOnly: !0
          }) && q.updatePosition({
            plotX: h[0],
            plotY: h[1]
          }));
          this.unDocMouseMove || (this.unDocMouseMove = C(e.container.ownerDocument, "mousemove", function(b) {
              const a = F[E.hoverChartIndex];
              if (a) a.pointer.onDocumentMouseMove(b)
            }),
            this.eventsToUnbind.push(this.unDocMouseMove));
          e.axes.forEach(function(b) {
            const c = D((b.crosshair || {}).snap, !0);
            let g;
            c && ((g = e.hoverPoint) && g.series[b.coll] === b || (g = p(f, a => a.series && a.series[b.coll] === b)));
            g || !c ? b.drawCrosshair(a, g) : b.hideCrosshair()
          })
        }
        scaleGroups(a, d) {
          const e = this.chart;
          e.series.forEach(function(l) {
            const h = a || l.getPlotBox();
            l.group && (l.xAxis && l.xAxis.zoomEnabled || e.mapView) && (l.group.attr(h), l.markerGroup && (l.markerGroup.attr(h), l.markerGroup.clip(d ? e.clipRect : null)), l.dataLabelsGroup &&
              l.dataLabelsGroup.attr(h))
          });
          e.clipRect.attr(d || e.clipBox)
        }
        setDOMEvents() {
          const a = this.chart.container,
            d = a.ownerDocument;
          a.onmousedown = this.onContainerMouseDown.bind(this);
          a.onmousemove = this.onContainerMouseMove.bind(this);
          a.onclick = this.onContainerClick.bind(this);
          this.eventsToUnbind.push(C(a, "mouseenter", this.onContainerMouseEnter.bind(this)));
          this.eventsToUnbind.push(C(a, "mouseleave", this.onContainerMouseLeave.bind(this)));
          E.unbindDocumentMouseUp || (E.unbindDocumentMouseUp = C(d, "mouseup", this.onDocumentMouseUp.bind(this)));
          let h = this.chart.renderTo.parentElement;
          for (; h && "BODY" !== h.tagName;) this.eventsToUnbind.push(C(h, "scroll", () => {
            delete this.chartPosition
          })), h = h.parentElement;
          A.hasTouch && (this.eventsToUnbind.push(C(a, "touchstart", this.onContainerTouchStart.bind(this), {
            passive: !1
          })), this.eventsToUnbind.push(C(a, "touchmove", this.onContainerTouchMove.bind(this), {
            passive: !1
          })), E.unbindDocumentTouchEnd || (E.unbindDocumentTouchEnd = C(d, "touchend", this.onDocumentTouchEnd.bind(this), {
            passive: !1
          })))
        }
        setHoverChartIndex() {
          const a =
            this.chart,
            d = A.charts[D(E.hoverChartIndex, -1)];
          if (d && d !== a) d.pointer.onContainerMouseLeave({
            relatedTarget: a.container
          });
          d && d.mouseIsDown || (E.hoverChartIndex = a.index)
        }
        touch(a, d) {
          const e = this.chart;
          let l, h;
          this.setHoverChartIndex();
          1 === a.touches.length ? (a = this.normalize(a), (h = e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop, {
            visiblePlotOnly: !0
          })) && !e.openMenu ? (d && this.runPointActions(a), "touchmove" === a.type && (d = this.pinchDown, l = d[0] ? 4 <= Math.sqrt(Math.pow(d[0].chartX - a.chartX, 2) + Math.pow(d[0].chartY -
            a.chartY, 2)) : !1), D(l, !0) && this.pinch(a)) : d && this.reset()) : 2 === a.touches.length && this.pinch(a)
        }
        touchSelect(a) {
          return !(!this.chart.options.chart.zooming.singleTouch || !a.touches || 1 !== a.touches.length)
        }
        zoomOption(a) {
          var e = this.chart,
            d = e.options.chart;
          e = e.inverted;
          let l = d.zooming.type || "";
          /touch/.test(a.type) && (l = D(d.zooming.pinchType, l));
          this.zoomX = a = /x/.test(l);
          this.zoomY = d = /y/.test(l);
          this.zoomHor = a && !e || d && e;
          this.zoomVert = d && !e || a && e;
          this.hasZoom = a || d
        }
      }(function(a) {
        const e = [],
          d = [];
        a.compose = function(e) {
          H.pushUnique(d,
            e) && C(e, "beforeRender", function() {
            this.pointer = new a(this, this.options)
          })
        };
        a.dissolve = function() {
          for (let a = 0, d = e.length; a < d; ++a) e[a]();
          e.length = 0
        }
      })(E || (E = {}));
      "";
      return E
    });
  M(a, "Core/Legend/Legend.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/Series/Point.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Utilities.js"]], function(a, A, H, I, F, G) {
    const {
      animObject: u,
      setAnimation: B
    } = a, {
      format: t
    } = A, {
      marginNames: r
    } = H, {
      distribute: d
    } = F, {
      addEvent: p,
      createElement: m,
      css: k,
      defined: v,
      discardElement: n,
      find: h,
      fireEvent: D,
      isNumber: L,
      merge: E,
      pick: e,
      relativeLength: q,
      stableSort: y,
      syncTimeout: l
    } = G;
    class w {
      constructor(a, b) {
        this.allItems = [];
        this.contentGroup = this.box = void 0;
        this.display = !1;
        this.group = void 0;
        this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
        this.options = void 0;
        this.padding =
          0;
        this.pages = [];
        this.proximate = !1;
        this.scrollGroup = void 0;
        this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
        this.chart = a;
        this.init(a, b)
      }
      init(a, b) {
        this.chart = a;
        this.setOptions(b);
        b.enabled && (this.render(), p(this.chart, "endResize", function() {
          this.legend.positionCheckboxes()
        }), p(this.chart, "render", () => {
          this.proximate && (this.proximatePositions(), this.positionItems())
        }))
      }
      setOptions(a) {
        const b = e(a.padding, 8);
        this.options = a;
        this.chart.styledMode || (this.itemStyle =
          a.itemStyle, this.itemHiddenStyle = E(this.itemStyle, a.itemHiddenStyle));
        this.itemMarginTop = a.itemMarginTop;
        this.itemMarginBottom = a.itemMarginBottom;
        this.padding = b;
        this.initialItemY = b - 5;
        this.symbolWidth = e(a.symbolWidth, 16);
        this.pages = [];
        this.proximate = "proximate" === a.layout && !this.chart.inverted;
        this.baseline = void 0
      }
      update(a, b) {
        const c = this.chart;
        this.setOptions(E(!0, this.options, a));
        this.destroy();
        c.isDirtyLegend = c.isDirtyBox = !0;
        e(b, !0) && c.redraw();
        D(this, "afterUpdate")
      }
      colorizeItem(a, b) {
        const {
          group: c,
          label: f,
          line: g,
          symbol: e
        } = a.legendItem || {};
        if (c) c[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
        if (!this.chart.styledMode) {
          var d = this.options;
          const c = this.itemHiddenStyle.color;
          d = b ? d.itemStyle.color : c;
          const l = b ? a.color || c : c,
            h = a.options && a.options.marker;
          let k = {
            fill: l
          };
          f && f.css({
            fill: d
          });
          g && g.attr({
            stroke: l
          });
          e && (h && e.isMarker && (k = a.pointAttribs(), b || (k.stroke = k.fill = c)), e.attr(k))
        }
        D(this, "afterColorizeItem", {
          item: a,
          visible: b
        })
      }
      positionItems() {
        this.allItems.forEach(this.positionItem,
          this);
        this.chart.isResizing || this.positionCheckboxes()
      }
      positionItem(a) {
        const {
          group: b,
          x: c = 0,
          y: f = 0
        } = a.legendItem || {};
        var g = this.options,
          e = g.symbolPadding;
        const d = !g.rtl;
        g = a.checkbox;
        b && b.element && (e = {
          translateX: d ? c : this.legendWidth - c - 2 * e - 4,
          translateY: f
        }, b[v(b.translateY) ? "animate" : "attr"](e, void 0, () => {
          D(this, "afterPositionItem", {
            item: a
          })
        }));
        g && (g.x = c, g.y = f)
      }
      destroyItem(a) {
        const b = a.checkbox,
          c = a.legendItem || {};
        for (const b of ["group", "label", "line", "symbol"]) c[b] && (c[b] = c[b].destroy());
        b && n(b);
        a.legendItem =
          void 0
      }
      destroy() {
        for (const a of this.getAllItems()) this.destroyItem(a);
        for (const a of "clipRect up down pager nav box title group".split(" ")) this[a] && (this[a] = this[a].destroy());
        this.display = null
      }
      positionCheckboxes() {
        const a = this.group && this.group.alignAttr,
          b = this.clipHeight || this.legendHeight,
          c = this.titleHeight;
        let f;
        a && (f = a.translateY, this.allItems.forEach(function(g) {
          const e = g.checkbox;
          let d;
          e && (d = f + c + e.y + (this.scrollOffset || 0) + 3, k(e, {
            left: a.translateX + g.checkboxOffset + e.x - 20 + "px",
            top: d + "px",
            display: this.proximate ||
              d > f - 6 && d < f + b - 6 ? "" : "none"
          }))
        }, this))
      }
      renderTitle() {
        var a = this.options;
        const b = this.padding,
          c = a.title;
        let f = 0;
        c.text && (this.title || (this.title = this.chart.renderer.label(c.text, b - 3, b - 4, void 0, void 0, void 0, a.useHTML, void 0, "legend-title").attr({
          zIndex: 1
        }), this.chart.styledMode || this.title.css(c.style), this.title.add(this.group)), c.width || this.title.css({
          width: this.maxLegendWidth + "px"
        }), a = this.title.getBBox(), f = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
          translateY: f
        }));
        this.titleHeight =
          f
      }
      setText(a) {
        const b = this.options;
        a.legendItem.label.attr({
          text: b.labelFormat ? t(b.labelFormat, a, this.chart) : b.labelFormatter.call(a)
        })
      }
      renderItem(a) {
        const b = a.legendItem = a.legendItem || {};
        var c = this.chart,
          f = c.renderer;
        const g = this.options,
          d = this.symbolWidth,
          l = g.symbolPadding || 0,
          h = this.itemStyle,
          k = this.itemHiddenStyle,
          q = "horizontal" === g.layout ? e(g.itemDistance, 20) : 0,
          m = !g.rtl,
          n = !a.series,
          w = !n && a.series.drawLegendSymbol ? a.series : a;
        var p = w.options;
        const y = this.createCheckboxForItem && p && p.showCheckbox,
          K = g.useHTML,
          r = a.options.className;
        let v = b.label;
        p = d + l + q + (y ? 20 : 0);
        v || (b.group = f.g("legend-item").addClass("highcharts-" + w.type + "-series highcharts-color-" + a.colorIndex + (r ? " " + r : "") + (n ? " highcharts-series-" + a.index : "")).attr({
          zIndex: 1
        }).add(this.scrollGroup), b.label = v = f.text("", m ? d + l : -l, this.baseline || 0, K), c.styledMode || v.css(E(a.visible ? h : k)), v.attr({
          align: m ? "left" : "right",
          zIndex: 2
        }).add(b.group), this.baseline || (this.fontMetrics = f.fontMetrics(v), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop,
          v.attr("y", this.baseline), this.symbolHeight = e(g.symbolHeight, this.fontMetrics.f), g.squareSymbol && (this.symbolWidth = e(g.symbolWidth, Math.max(this.symbolHeight, 16)), p = this.symbolWidth + l + q + (y ? 20 : 0), m && v.attr("x", this.symbolWidth + l))), w.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, v, K));
        y && !a.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(a);
        this.colorizeItem(a, a.visible);
        !c.styledMode && h.width || v.css({
          width: (g.itemWidth || this.widthOption || c.spacingBox.width) - p +
            "px"
        });
        this.setText(a);
        c = v.getBBox();
        f = this.fontMetrics && this.fontMetrics.h || 0;
        a.itemWidth = a.checkboxOffset = g.itemWidth || b.labelWidth || c.width + p;
        this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
        this.totalItemWidth += a.itemWidth;
        this.itemHeight = a.itemHeight = Math.round(b.labelHeight || (c.height > 1.5 * f ? c.height : f))
      }
      layoutItem(a) {
        var b = this.options;
        const c = this.padding,
          f = "horizontal" === b.layout,
          g = a.itemHeight,
          d = this.itemMarginBottom,
          l = this.itemMarginTop,
          h = f ? e(b.itemDistance, 20) : 0,
          k = this.maxLegendWidth;
        b = b.alignColumns && this.totalItemWidth > k ? this.maxItemWidth : a.itemWidth;
        const q = a.legendItem || {};
        f && this.itemX - c + b > k && (this.itemX = c, this.lastLineHeight && (this.itemY += l + this.lastLineHeight + d), this.lastLineHeight = 0);
        this.lastItemY = l + this.itemY + d;
        this.lastLineHeight = Math.max(g, this.lastLineHeight);
        q.x = this.itemX;
        q.y = this.itemY;
        f ? this.itemX += b : (this.itemY += l + g + d, this.lastLineHeight = g);
        this.offsetWidth = this.widthOption || Math.max((f ? this.itemX - c - (a.checkbox ? 0 : h) : b) + c, this.offsetWidth)
      }
      getAllItems() {
        let a = [];
        this.chart.series.forEach(function(b) {
          const c = b && b.options;
          b && e(c.showInLegend, v(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat((b.legendItem || {}).labels || ("point" === c.legendType ? b.data : b)))
        });
        D(this, "afterGetAllItems", {
          allItems: a
        });
        return a
      }
      getAlignment() {
        const a = this.options;
        return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
      }
      adjustMargins(a, b) {
        const c = this.chart,
          f = this.options,
          g = this.getAlignment();
        g && [/(lth|ct|rth)/, /(rtv|rm|rbv)/,
          /(rbh|cb|lbh)/, /(lbv|lm|ltv)/
        ].forEach(function(d, l) {
          d.test(g) && !v(a[l]) && (c[r[l]] = Math.max(c[r[l]], c.legend[(l + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][l] * f[l % 2 ? "x" : "y"] + e(f.margin, 12) + b[l] + (c.titleOffset[l] || 0)))
        })
      }
      proximatePositions() {
        const a = this.chart,
          b = [],
          c = "left" === this.options.align;
        this.allItems.forEach(function(f) {
          var g;
          var e = c;
          let d;
          f.yAxis && (f.xAxis.options.reversed && (e = !e), f.points && (g = h(e ? f.points : f.points.slice(0).reverse(), function(b) {
              return L(b.plotY)
            })), e = this.itemMarginTop +
            f.legendItem.label.getBBox().height + this.itemMarginBottom, d = f.yAxis.top - a.plotTop, f.visible ? (g = g ? g.plotY : f.yAxis.height, g += d - .3 * e) : g = d + f.yAxis.height, b.push({
              target: g,
              size: e,
              item: f
            }))
        }, this);
        let f;
        for (const c of d(b, a.plotHeight)) f = c.item.legendItem || {}, L(c.pos) && (f.y = a.plotTop - a.spacing[0] + c.pos)
      }
      render() {
        const a = this.chart,
          b = a.renderer,
          c = this.options,
          f = this.padding;
        var e = this.getAllItems();
        let d, l = this.group,
          h = this.box;
        this.itemX = f;
        this.itemY = this.initialItemY;
        this.lastItemY = this.offsetWidth = 0;
        this.widthOption = q(c.width, a.spacingBox.width - f);
        var k = a.spacingBox.width - 2 * f - c.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (k /= 2);
        this.maxLegendWidth = this.widthOption || k;
        l || (this.group = l = b.g("legend").addClass(c.className || "").attr({
          zIndex: 7
        }).add(), this.contentGroup = b.g().attr({
          zIndex: 1
        }).add(l), this.scrollGroup = b.g().add(this.contentGroup));
        this.renderTitle();
        y(e, (b, a) => (b.options && b.options.legendIndex || 0) - (a.options && a.options.legendIndex || 0));
        c.reversed && e.reverse();
        this.allItems =
          e;
        this.display = k = !!e.length;
        this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
        e.forEach(this.renderItem, this);
        e.forEach(this.layoutItem, this);
        e = (this.widthOption || this.offsetWidth) + f;
        d = this.lastItemY + this.lastLineHeight + this.titleHeight;
        d = this.handleOverflow(d);
        d += f;
        h || (this.box = h = b.rect().addClass("highcharts-legend-box").attr({
          r: c.borderRadius
        }).add(l));
        a.styledMode || h.attr({
          stroke: c.borderColor,
          "stroke-width": c.borderWidth || 0,
          fill: c.backgroundColor || "none"
        }).shadow(c.shadow);
        if (0 < e && 0 < d) h[h.placed ? "animate" : "attr"](h.crisp.call({}, {
          x: 0,
          y: 0,
          width: e,
          height: d
        }, h.strokeWidth()));
        l[k ? "show" : "hide"]();
        a.styledMode && "none" === l.getStyle("display") && (e = d = 0);
        this.legendWidth = e;
        this.legendHeight = d;
        k && this.align();
        this.proximate || this.positionItems();
        D(this, "afterRender")
      }
      align(a = this.chart.spacingBox) {
        const b = this.chart,
          c = this.options;
        let f = a.y;
        /(lth|ct|rth)/.test(this.getAlignment()) && 0 < b.titleOffset[0] ? f += b.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < b.titleOffset[2] &&
          (f -= b.titleOffset[2]);
        f !== a.y && (a = E(a, {
          y: f
        }));
        b.hasRendered || (this.group.placed = !1);
        this.group.align(E(c, {
          width: this.legendWidth,
          height: this.legendHeight,
          verticalAlign: this.proximate ? "top" : c.verticalAlign
        }), !0, a)
      }
      handleOverflow(a) {
        const b = this,
          c = this.chart,
          f = c.renderer,
          g = this.options;
        var d = g.y;
        const l = "top" === g.verticalAlign,
          h = this.padding,
          k = g.maxHeight,
          q = g.navigation,
          m = e(q.animation, !0),
          n = q.arrowSize || 12,
          w = this.pages,
          p = this.allItems,
          y = function(a) {
            "number" === typeof a ? u.attr({
              height: a
            }) : u && (b.clipRect =
              u.destroy(), b.contentGroup.clip());
            b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + h + "px,9999px," + (h + a) + "px,0)" : "auto")
          },
          K = function(a) {
            b[a] = f.circle(0, 0, 1.3 * n).translate(n / 2, n / 2).add(t);
            c.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
            return b[a]
          };
        let v, r, D;
        d = c.spacingBox.height + (l ? -d : d) - h;
        let t = this.nav,
          u = this.clipRect;
        "horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (d /= 2);
        k && (d = Math.min(d, k));
        w.length = 0;
        a && 0 < d && a > d && !1 !== q.enabled ? (this.clipHeight = v = Math.max(d -
          20 - this.titleHeight - h, 0), this.currentPage = e(this.currentPage, 1), this.fullHeight = a, p.forEach((b, a) => {
          D = b.legendItem || {};
          b = D.y || 0;
          const c = Math.round(D.label.getBBox().height);
          let f = w.length;
          if (!f || b - w[f - 1] > v && (r || b) !== w[f - 1]) w.push(r || b), f++;
          D.pageIx = f - 1;
          r && ((p[a - 1].legendItem || {}).pageIx = f - 1);
          a === p.length - 1 && b + c - w[f - 1] > v && b > w[f - 1] && (w.push(b), D.pageIx = f);
          b !== r && (r = b)
        }), u || (u = b.clipRect = f.clipRect(0, h - 2, 9999, 0), b.contentGroup.clip(u)), y(v), t || (this.nav = t = f.g().attr({
            zIndex: 1
          }).add(this.group), this.up =
          f.symbol("triangle", 0, 0, n, n).add(t), K("upTracker").on("click", function() {
            b.scroll(-1, m)
          }), this.pager = f.text("", 15, 10).addClass("highcharts-legend-navigation"), !c.styledMode && q.style && this.pager.css(q.style), this.pager.add(t), this.down = f.symbol("triangle-down", 0, 0, n, n).add(t), K("downTracker").on("click", function() {
            b.scroll(1, m)
          })), b.scroll(0), a = d) : t && (y(), this.nav = t.destroy(), this.scrollGroup.attr({
          translateY: 1
        }), this.clipHeight = 0);
        return a
      }
      scroll(a, b) {
        const c = this.chart,
          f = this.pages,
          g = f.length,
          d =
          this.clipHeight,
          h = this.options.navigation,
          k = this.pager,
          q = this.padding;
        let m = this.currentPage + a;
        m > g && (m = g);
        0 < m && ("undefined" !== typeof b && B(b, c), this.nav.attr({
          translateX: q,
          translateY: d + this.padding + 7 + this.titleHeight,
          visibility: "inherit"
        }), [this.up, this.upTracker].forEach(function(b) {
          b.attr({
            "class": 1 === m ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
          })
        }), k.attr({
          text: m + "/" + g
        }), [this.down, this.downTracker].forEach(function(b) {
          b.attr({
            x: 18 + this.pager.getBBox().width,
            "class": m === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
          })
        }, this), c.styledMode || (this.up.attr({
          fill: 1 === m ? h.inactiveColor : h.activeColor
        }), this.upTracker.css({
          cursor: 1 === m ? "default" : "pointer"
        }), this.down.attr({
          fill: m === g ? h.inactiveColor : h.activeColor
        }), this.downTracker.css({
          cursor: m === g ? "default" : "pointer"
        })), this.scrollOffset = -f[m - 1] + this.initialItemY, this.scrollGroup.animate({
          translateY: this.scrollOffset
        }), this.currentPage = m, this.positionCheckboxes(), a = u(e(b, c.renderer.globalAnimation, !0)), l(() => {
            D(this, "afterScroll", {
              currentPage: m
            })
          },
          a.duration))
      }
      setItemEvents(a, b, c) {
        const f = this,
          g = a.legendItem || {},
          e = f.chart.renderer.boxWrapper,
          d = a instanceof I,
          l = "highcharts-legend-" + (d ? "point" : "series") + "-active",
          h = f.chart.styledMode;
        c = c ? [b, g.symbol] : [g.group];
        const k = b => {
          f.allItems.forEach(c => {
            a !== c && [c].concat(c.linkedSeries || []).forEach(a => {
              a.setState(b, !d)
            })
          })
        };
        for (const g of c)
          if (g) g.on("mouseover", function() {
            a.visible && k("inactive");
            a.setState("hover");
            a.visible && e.addClass(l);
            h || b.css(f.options.itemHoverStyle)
          }).on("mouseout", function() {
            f.chart.styledMode ||
              b.css(E(a.visible ? f.itemStyle : f.itemHiddenStyle));
            k("");
            e.removeClass(l);
            a.setState()
          }).on("click", function(b) {
            const c = function() {
              a.setVisible && a.setVisible();
              k(a.visible ? "inactive" : "")
            };
            e.removeClass(l);
            b = {
              browserEvent: b
            };
            a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : D(a, "legendItemClick", b, c)
          })
      }
      createCheckboxForItem(a) {
        a.checkbox = m("input", {
          type: "checkbox",
          className: "highcharts-legend-checkbox",
          checked: a.selected,
          defaultChecked: a.selected
        }, this.options.itemCheckboxStyle, this.chart.container);
        p(a.checkbox, "click", function(b) {
          D(a.series || a, "checkboxClick", {
            checked: b.target.checked,
            item: a
          }, function() {
            a.select()
          })
        })
      }
    }(function(a) {
      const b = [];
      a.compose = function(c) {
        G.pushUnique(b, c) && p(c, "beforeMargins", function() {
          this.legend = new a(this, this.options.legend)
        })
      }
    })(w || (w = {}));
    "";
    return w
  });
  M(a, "Core/Series/SeriesRegistry.js", [a["Core/Globals.js"], a["Core/Defaults.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]], function(a, A, H, I) {
    const {
      defaultOptions: u
    } = A, {
      extendClass: G,
      merge: C
    } = I;
    var B;
    (function(t) {
      function r(a, p) {
        const d = u.plotOptions || {},
          k = p.defaultOptions,
          v = p.prototype;
        v.type = a;
        v.pointClass || (v.pointClass = H);
        k && (d[a] = k);
        t.seriesTypes[a] = p
      }
      t.seriesTypes = a.seriesTypes;
      t.registerSeriesType = r;
      t.seriesType = function(a, p, m, k, v) {
        const d = u.plotOptions || {};
        p = p || "";
        d[a] = C(d[p], m);
        r(a, G(t.seriesTypes[p] || function() {}, k));
        t.seriesTypes[a].prototype.type = a;
        v && (t.seriesTypes[a].prototype.pointClass = G(H, v));
        return t.seriesTypes[a]
      }
    })(B || (B = {}));
    return B
  });
  M(a, "Core/Chart/Chart.js", [a["Core/Animation/AnimationUtilities.js"],
    a["Core/Axis/Axis.js"], a["Core/Defaults.js"], a["Core/FormatUtilities.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Time.js"], a["Core/Utilities.js"], a["Core/Renderer/HTML/AST.js"]
  ], function(a, A, H, I, F, G, C, B, t, r, d, p) {
    const {
      animate: m,
      animObject: k,
      setAnimation: v
    } = a, {
      defaultOptions: n,
      defaultTime: h
    } = H, {
      numberFormat: D
    } = I, {
      registerEventOptions: u
    } = F, {
      charts: E,
      doc: e,
      marginNames: q,
      svg: y,
      win: l
    } = G, {
      seriesTypes: w
    } = B, {
      addEvent: g,
      attr: b,
      cleanRecursively: c,
      createElement: f,
      css: x,
      defined: J,
      discardElement: z,
      erase: Q,
      error: S,
      extend: R,
      find: N,
      fireEvent: O,
      getStyle: ba,
      isArray: da,
      isNumber: W,
      isObject: K,
      isString: Y,
      merge: P,
      objectEach: ca,
      pick: T,
      pInt: X,
      relativeLength: U,
      removeEvent: Z,
      splat: ea,
      syncTimeout: fa,
      uniqueKey: M
    } = d;
    class aa {
      static chart(b, a, c) {
        return new aa(b, a, c)
      }
      constructor(b, a, c) {
        this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight =
          this.plotBox = this.options = this.numberFormatter = this.margin = this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
        this.sharedClips = {};
        this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
        this.getArgs(b, a, c)
      }
      getArgs(b, a, c) {
        Y(b) || b.nodeName ? (this.renderTo = b, this.init(a, c)) : this.init(b, a)
      }
      init(b, a) {
        const c =
          b.plotOptions || {};
        O(this, "init", {
          args: arguments
        }, function() {
          const f = P(n, b),
            g = f.chart;
          ca(f.plotOptions, function(b, a) {
            K(b) && (b.tooltip = c[a] && P(c[a].tooltip) || void 0)
          });
          f.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
          this.userOptions = b;
          this.margin = [];
          this.spacing = [];
          this.bounds = {
            h: {},
            v: {}
          };
          this.labelCollectors = [];
          this.callback = a;
          this.isResizing = 0;
          const e = g.zooming = g.zooming || {};
          b.chart && !b.chart.zooming && (e.resetButton = g.resetZoomButton);
          e.key = T(e.key, g.zoomKey);
          e.pinchType =
            T(e.pinchType, g.pinchType);
          e.singleTouch = T(e.singleTouch, g.zoomBySingleTouch);
          e.type = T(e.type, g.zoomType);
          this.options = f;
          this.axes = [];
          this.series = [];
          this.time = b.time && Object.keys(b.time).length ? new r(b.time) : G.time;
          this.numberFormatter = g.numberFormatter || D;
          this.styledMode = g.styledMode;
          this.hasCartesianSeries = g.showAxes;
          this.index = E.length;
          E.push(this);
          G.chartCount++;
          u(this, g);
          this.xAxis = [];
          this.yAxis = [];
          this.pointCount = this.colorCounter = this.symbolCounter = 0;
          O(this, "afterInit");
          this.firstRender()
        })
      }
      initSeries(b) {
        var a =
          this.options.chart;
        a = b.type || a.type;
        const c = w[a];
        c || S(17, !0, this, {
          missingModuleFor: a
        });
        a = new c;
        "function" === typeof a.init && a.init(this, b);
        return a
      }
      setSeriesData() {
        this.getSeriesOrderByLinks().forEach(function(b) {
          b.points || b.data || !b.enabledDataSorting || b.setData(b.options.data, !1)
        })
      }
      getSeriesOrderByLinks() {
        return this.series.concat().sort(function(b, a) {
          return b.linkedSeries.length || a.linkedSeries.length ? a.linkedSeries.length - b.linkedSeries.length : 0
        })
      }
      orderSeries(b) {
        const a = this.series;
        for (let c = b ||
            0, f = a.length; c < f; ++c) a[c] && (a[c].index = c, a[c].name = a[c].getName())
      }
      isInsidePlot(b, a, c = {}) {
        const {
          inverted: f,
          plotBox: g,
          plotLeft: e,
          plotTop: d,
          scrollablePlotBox: l
        } = this;
        var h = 0;
        let k = 0;
        c.visiblePlotOnly && this.scrollingContainer && ({
          scrollLeft: h,
          scrollTop: k
        } = this.scrollingContainer);
        const q = c.series,
          m = c.visiblePlotOnly && l || g;
        var n = c.inverted ? a : b;
        a = c.inverted ? b : a;
        b = {
          x: n,
          y: a,
          isInsidePlot: !0,
          options: c
        };
        if (!c.ignoreX) {
          const a = q && (f && !this.polar ? q.yAxis : q.xAxis) || {
            pos: e,
            len: Infinity
          };
          n = c.paneCoordinates ? a.pos +
            n : e + n;
          n >= Math.max(h + e, a.pos) && n <= Math.min(h + e + m.width, a.pos + a.len) || (b.isInsidePlot = !1)
        }!c.ignoreY && b.isInsidePlot && (h = !f && c.axis && !c.axis.isXAxis && c.axis || q && (f ? q.xAxis : q.yAxis) || {
          pos: d,
          len: Infinity
        }, c = c.paneCoordinates ? h.pos + a : d + a, c >= Math.max(k + d, h.pos) && c <= Math.min(k + d + m.height, h.pos + h.len) || (b.isInsidePlot = !1));
        O(this, "afterIsInsidePlot", b);
        return b.isInsidePlot
      }
      redraw(b) {
        O(this, "beforeRedraw");
        const a = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
          c = this.series,
          f = this.pointer,
          g = this.legend,
          e = this.userOptions.legend,
          d = this.renderer,
          l = d.isHidden(),
          h = [];
        let k, q, m = this.isDirtyBox,
          n = this.isDirtyLegend,
          x;
        d.rootFontSize = d.boxWrapper.getStyle("font-size");
        this.setResponsive && this.setResponsive(!1);
        v(this.hasRendered ? b : !1, this);
        l && this.temporaryDisplay();
        this.layOutTitles();
        for (b = c.length; b--;)
          if (x = c[b], x.options.stacking || x.options.centerInCategory)
            if (q = !0, x.isDirty) {
              k = !0;
              break
            } if (k)
          for (b = c.length; b--;) x = c[b], x.options.stacking && (x.isDirty = !0);
        c.forEach(function(b) {
          b.isDirty && ("point" === b.options.legendType ?
            ("function" === typeof b.updateTotals && b.updateTotals(), n = !0) : e && (e.labelFormatter || e.labelFormat) && (n = !0));
          b.isDirtyData && O(b, "updatedData")
        });
        n && g && g.options.enabled && (g.render(), this.isDirtyLegend = !1);
        q && this.getStacks();
        a.forEach(function(b) {
          b.updateNames();
          b.setScale()
        });
        this.getMargins();
        a.forEach(function(b) {
          b.isDirty && (m = !0)
        });
        a.forEach(function(b) {
          const a = b.min + "," + b.max;
          b.extKey !== a && (b.extKey = a, h.push(function() {
            O(b, "afterSetExtremes", R(b.eventArgs, b.getExtremes()));
            delete b.eventArgs
          }));
          (m || q) && b.redraw()
        });
        m && this.drawChartBox();
        O(this, "predraw");
        c.forEach(function(b) {
          (m || b.isDirty) && b.visible && b.redraw();
          b.isDirtyData = !1
        });
        f && f.reset(!0);
        d.draw();
        O(this, "redraw");
        O(this, "render");
        l && this.temporaryDisplay(!0);
        h.forEach(function(b) {
          b.call()
        })
      }
      get(b) {
        function a(a) {
          return a.id === b || a.options && a.options.id === b
        }
        const c = this.series;
        let f = N(this.axes, a) || N(this.series, a);
        for (let b = 0; !f && b < c.length; b++) f = N(c[b].points || [], a);
        return f
      }
      getAxes() {
        const b = this;
        var a = this.options;
        const c = a.xAxis =
          ea(a.xAxis || {});
        a = a.yAxis = ea(a.yAxis || {});
        O(this, "getAxes");
        c.forEach(function(b, a) {
          b.index = a;
          b.isX = !0
        });
        a.forEach(function(b, a) {
          b.index = a
        });
        c.concat(a).forEach(function(a) {
          new A(b, a)
        });
        O(this, "afterGetAxes")
      }
      getSelectedPoints() {
        return this.series.reduce((b, a) => {
          a.getPointsCollection().forEach(a => {
            T(a.selectedStaging, a.selected) && b.push(a)
          });
          return b
        }, [])
      }
      getSelectedSeries() {
        return this.series.filter(function(b) {
          return b.selected
        })
      }
      setTitle(b, a, c) {
        this.applyDescription("title", b);
        this.applyDescription("subtitle",
          a);
        this.applyDescription("caption", void 0);
        this.layOutTitles(c)
      }
      applyDescription(b, a) {
        const c = this;
        var f = "title" === b ? {
          color: "#333333",
          fontSize: this.options.isStock ? "1em" : "1.2em",
          fontWeight: "bold"
        } : {
          color: "#666666",
          fontSize: "0.8em"
        };
        f = this.options[b] = P(!this.styledMode && {
          style: f
        }, this.options[b], a);
        let g = this[b];
        g && a && (this[b] = g = g.destroy());
        f && !g && (g = this.renderer.text(f.text, 0, 0, f.useHTML).attr({
          align: f.align,
          "class": "highcharts-" + b,
          zIndex: f.zIndex || 4
        }).add(), g.update = function(a) {
          c[{
            title: "setTitle",
            subtitle: "setSubtitle",
            caption: "setCaption"
          } [b]](a)
        }, this.styledMode || g.css(f.style), this[b] = g)
      }
      layOutTitles(b) {
        const a = [0, 0, 0],
          c = this.renderer,
          f = this.spacingBox;
        ["title", "subtitle", "caption"].forEach(function(b) {
          const g = this[b],
            e = this.options[b],
            d = e.verticalAlign || "top";
          b = "title" === b ? "top" === d ? -3 : 0 : "top" === d ? a[0] + 2 : 0;
          if (g) {
            g.css({
              width: (e.width || f.width + (e.widthAdjust || 0)) + "px"
            });
            const l = c.fontMetrics(g).b,
              h = Math.round(g.getBBox(e.useHTML).height);
            g.align(R({
                y: "bottom" === d ? l : b + l,
                height: h
              }, e), !1,
              "spacingBox");
            e.floating || ("top" === d ? a[0] = Math.ceil(a[0] + h) : "bottom" === d && (a[2] = Math.ceil(a[2] + h)))
          }
        }, this);
        a[0] && "top" === (this.options.title.verticalAlign || "top") && (a[0] += this.options.title.margin);
        a[2] && "bottom" === this.options.caption.verticalAlign && (a[2] += this.options.caption.margin);
        const g = !this.titleOffset || this.titleOffset.join(",") !== a.join(",");
        this.titleOffset = a;
        O(this, "afterLayOutTitles");
        !this.isDirtyBox && g && (this.isDirtyBox = this.isDirtyLegend = g, this.hasRendered && T(b, !0) && this.isDirtyBox &&
          this.redraw())
      }
      getContainerBox() {
        return {
          width: ba(this.renderTo, "width", !0) || 0,
          height: ba(this.renderTo, "height", !0) || 0
        }
      }
      getChartSize() {
        var b = this.options.chart;
        const a = b.width;
        b = b.height;
        const c = this.getContainerBox();
        this.chartWidth = Math.max(0, a || c.width || 600);
        this.chartHeight = Math.max(0, U(b, this.chartWidth) || (1 < c.height ? c.height : 400));
        this.containerBox = c
      }
      temporaryDisplay(b) {
        let a = this.renderTo;
        if (b)
          for (; a && a.style;) a.hcOrigStyle && (x(a, a.hcOrigStyle), delete a.hcOrigStyle), a.hcOrigDetached && (e.body.removeChild(a),
            a.hcOrigDetached = !1), a = a.parentNode;
        else
          for (; a && a.style;) {
            e.body.contains(a) || a.parentNode || (a.hcOrigDetached = !0, e.body.appendChild(a));
            if ("none" === ba(a, "display", !1) || a.hcOricDetached) a.hcOrigStyle = {
              display: a.style.display,
              height: a.style.height,
              overflow: a.style.overflow
            }, b = {
              display: "block",
              overflow: "hidden"
            }, a !== this.renderTo && (b.height = 0), x(a, b), a.offsetWidth || a.style.setProperty("display", "block", "important");
            a = a.parentNode;
            if (a === e.body) break
          }
      }
      setClassName(b) {
        this.container.className = "highcharts-container " +
          (b || "")
      }
      getContainer() {
        const a = this.options,
          c = a.chart;
        var g = M();
        let d, l = this.renderTo;
        l || (this.renderTo = l = c.renderTo);
        Y(l) && (this.renderTo = l = e.getElementById(l));
        l || S(13, !0, this);
        var h = X(b(l, "data-highcharts-chart"));
        W(h) && E[h] && E[h].hasRendered && E[h].destroy();
        b(l, "data-highcharts-chart", this.index);
        l.innerHTML = p.emptyHTML;
        c.skipClone || l.offsetWidth || this.temporaryDisplay();
        this.getChartSize();
        h = this.chartWidth;
        const k = this.chartHeight;
        x(l, {
          overflow: "hidden"
        });
        this.styledMode || (d = R({
          position: "relative",
          overflow: "hidden",
          width: h + "px",
          height: k + "px",
          textAlign: "left",
          lineHeight: "normal",
          zIndex: 0,
          "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
          userSelect: "none",
          "touch-action": "manipulation",
          outline: "none"
        }, c.style || {}));
        this.container = g = f("div", {
          id: g
        }, d, l);
        this._cursor = g.style.cursor;
        this.renderer = new(c.renderer || !y ? C.getRendererType(c.renderer) : t)(g, h, k, void 0, c.forExport, a.exporting && a.exporting.allowHTML, this.styledMode);
        this.containerBox = this.getContainerBox();
        v(void 0, this);
        this.setClassName(c.className);
        if (this.styledMode)
          for (const b in a.defs) this.renderer.definition(a.defs[b]);
        else this.renderer.setStyle(c.style);
        this.renderer.chartIndex = this.index;
        O(this, "afterGetContainer")
      }
      getMargins(b) {
        const {
          spacing: a,
          margin: c,
          titleOffset: f
        } = this;
        this.resetMargins();
        f[0] && !J(c[0]) && (this.plotTop = Math.max(this.plotTop, f[0] + a[0]));
        f[2] && !J(c[2]) && (this.marginBottom = Math.max(this.marginBottom, f[2] + a[2]));
        this.legend && this.legend.display && this.legend.adjustMargins(c, a);
        O(this, "getMargins");
        b || this.getAxisMargins()
      }
      getAxisMargins() {
        const b =
          this,
          a = b.axisOffset = [0, 0, 0, 0],
          c = b.colorAxis,
          f = b.margin,
          g = function(b) {
            b.forEach(function(b) {
              b.visible && b.getOffset()
            })
          };
        b.hasCartesianSeries ? g(b.axes) : c && c.length && g(c);
        q.forEach(function(c, g) {
          J(f[g]) || (b[c] += a[g])
        });
        b.setChartSize()
      }
      reflow(b) {
        const a = this;
        var c = a.options.chart;
        c = J(c.width) && J(c.height);
        const f = a.containerBox,
          g = a.getContainerBox();
        delete a.pointer.chartPosition;
        if (!c && !a.isPrinting && f && g.width) {
          if (g.width !== f.width || g.height !== f.height) d.clearTimeout(a.reflowTimeout), a.reflowTimeout =
            fa(function() {
              a.container && a.setSize(void 0, void 0, !1)
            }, b ? 100 : 0);
          a.containerBox = g
        }
      }
      setReflow() {
        const b = this;
        var a = a => {
          var c;
          (null === (c = b.options) || void 0 === c ? 0 : c.chart.reflow) && b.hasLoaded && b.reflow(a)
        };
        "function" === typeof ResizeObserver ? (new ResizeObserver(a)).observe(b.renderTo) : (a = g(l, "resize", a), g(this, "destroy", a))
      }
      setSize(b, a, c) {
        const f = this,
          g = f.renderer;
        f.isResizing += 1;
        v(c, f);
        c = g.globalAnimation;
        f.oldChartHeight = f.chartHeight;
        f.oldChartWidth = f.chartWidth;
        "undefined" !== typeof b && (f.options.chart.width =
          b);
        "undefined" !== typeof a && (f.options.chart.height = a);
        f.getChartSize();
        f.styledMode || (c ? m : x)(f.container, {
          width: f.chartWidth + "px",
          height: f.chartHeight + "px"
        }, c);
        f.setChartSize(!0);
        g.setSize(f.chartWidth, f.chartHeight, c);
        f.axes.forEach(function(b) {
          b.isDirty = !0;
          b.setScale()
        });
        f.isDirtyLegend = !0;
        f.isDirtyBox = !0;
        f.layOutTitles();
        f.getMargins();
        f.redraw(c);
        f.oldChartHeight = null;
        O(f, "resize");
        fa(function() {
          f && O(f, "endResize", null, function() {
            --f.isResizing
          })
        }, k(c).duration)
      }
      setChartSize(b) {
        var a = this.inverted;
        const c = this.renderer;
        var f = this.chartWidth,
          g = this.chartHeight;
        const e = this.options.chart,
          d = this.spacing,
          l = this.clipOffset;
        let h, k, q, m;
        this.plotLeft = h = Math.round(this.plotLeft);
        this.plotTop = k = Math.round(this.plotTop);
        this.plotWidth = q = Math.max(0, Math.round(f - h - this.marginRight));
        this.plotHeight = m = Math.max(0, Math.round(g - k - this.marginBottom));
        this.plotSizeX = a ? m : q;
        this.plotSizeY = a ? q : m;
        this.plotBorderWidth = e.plotBorderWidth || 0;
        this.spacingBox = c.spacingBox = {
          x: d[3],
          y: d[0],
          width: f - d[3] - d[1],
          height: g - d[0] -
            d[2]
        };
        this.plotBox = c.plotBox = {
          x: h,
          y: k,
          width: q,
          height: m
        };
        a = 2 * Math.floor(this.plotBorderWidth / 2);
        f = Math.ceil(Math.max(a, l[3]) / 2);
        g = Math.ceil(Math.max(a, l[0]) / 2);
        this.clipBox = {
          x: f,
          y: g,
          width: Math.floor(this.plotSizeX - Math.max(a, l[1]) / 2 - f),
          height: Math.max(0, Math.floor(this.plotSizeY - Math.max(a, l[2]) / 2 - g))
        };
        b || (this.axes.forEach(function(b) {
          b.setAxisSize();
          b.setAxisTranslation()
        }), c.alignElements());
        O(this, "afterSetChartSize", {
          skipAxes: b
        })
      }
      resetMargins() {
        O(this, "resetMargins");
        const b = this,
          a = b.options.chart;
        ["margin", "spacing"].forEach(function(c) {
          const f = a[c],
            g = K(f) ? f : [f, f, f, f];
          ["Top", "Right", "Bottom", "Left"].forEach(function(f, e) {
            b[c][e] = T(a[c + f], g[e])
          })
        });
        q.forEach(function(a, c) {
          b[a] = T(b.margin[c], b.spacing[c])
        });
        b.axisOffset = [0, 0, 0, 0];
        b.clipOffset = [0, 0, 0, 0]
      }
      drawChartBox() {
        const b = this.options.chart,
          a = this.renderer,
          c = this.chartWidth,
          f = this.chartHeight,
          g = this.styledMode,
          e = this.plotBGImage;
        var d = b.backgroundColor;
        const l = b.plotBackgroundColor,
          h = b.plotBackgroundImage,
          k = this.plotLeft,
          q = this.plotTop,
          m =
          this.plotWidth,
          n = this.plotHeight,
          x = this.plotBox,
          w = this.clipRect,
          p = this.clipBox;
        let z = this.chartBackground,
          K = this.plotBackground,
          y = this.plotBorder,
          J, v, r = "animate";
        z || (this.chartBackground = z = a.rect().addClass("highcharts-background").add(), r = "attr");
        if (g) J = v = z.strokeWidth();
        else {
          J = b.borderWidth || 0;
          v = J + (b.shadow ? 8 : 0);
          d = {
            fill: d || "none"
          };
          if (J || z["stroke-width"]) d.stroke = b.borderColor, d["stroke-width"] = J;
          z.attr(d).shadow(b.shadow)
        }
        z[r]({
          x: v / 2,
          y: v / 2,
          width: c - v - J % 2,
          height: f - v - J % 2,
          r: b.borderRadius
        });
        r = "animate";
        K || (r = "attr", this.plotBackground = K = a.rect().addClass("highcharts-plot-background").add());
        K[r](x);
        g || (K.attr({
          fill: l || "none"
        }).shadow(b.plotShadow), h && (e ? (h !== e.attr("href") && e.attr("href", h), e.animate(x)) : this.plotBGImage = a.image(h, k, q, m, n).add()));
        w ? w.animate({
          width: p.width,
          height: p.height
        }) : this.clipRect = a.clipRect(p);
        r = "animate";
        y || (r = "attr", this.plotBorder = y = a.rect().addClass("highcharts-plot-border").attr({
          zIndex: 1
        }).add());
        g || y.attr({
          stroke: b.plotBorderColor,
          "stroke-width": b.plotBorderWidth ||
            0,
          fill: "none"
        });
        y[r](y.crisp({
          x: k,
          y: q,
          width: m,
          height: n
        }, -y.strokeWidth()));
        this.isDirtyBox = !1;
        O(this, "afterDrawChartBox")
      }
      propFromSeries() {
        const b = this,
          a = b.options.chart,
          c = b.options.series;
        let f, g, e;
        ["inverted", "angular", "polar"].forEach(function(d) {
          g = w[a.type];
          e = a[d] || g && g.prototype[d];
          for (f = c && c.length; !e && f--;)(g = w[c[f].type]) && g.prototype[d] && (e = !0);
          b[d] = e
        })
      }
      linkSeries(b) {
        const a = this,
          c = a.series;
        c.forEach(function(b) {
          b.linkedSeries.length = 0
        });
        c.forEach(function(b) {
          let c = b.options.linkedTo;
          Y(c) &&
            (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, c.enabledDataSorting && b.setDataSortingOptions(), b.visible = T(b.options.visible, c.options.visible, b.visible))
        });
        O(this, "afterLinkSeries", {
          isUpdating: b
        })
      }
      renderSeries() {
        this.series.forEach(function(b) {
          b.translate();
          b.render()
        })
      }
      render() {
        const b = this.axes,
          a = this.colorAxis,
          c = this.renderer,
          f = function(b) {
            b.forEach(function(b) {
              b.visible && b.render()
            })
          };
        let g = 0;
        this.setTitle();
        O(this, "beforeMargins");
        this.getStacks && this.getStacks();
        this.getMargins(!0);
        this.setChartSize();
        const e = this.plotWidth;
        b.some(function(b) {
          if (b.horiz && b.visible && b.options.labels.enabled && b.series.length) return g = 21, !0
        });
        const d = this.plotHeight = Math.max(this.plotHeight - g, 0);
        b.forEach(function(b) {
          b.setScale()
        });
        this.getAxisMargins();
        const l = 1.1 < e / this.plotWidth,
          h = 1.05 < d / this.plotHeight;
        if (l || h) b.forEach(function(b) {
          (b.horiz && l || !b.horiz && h) && b.setTickInterval(!0)
        }), this.getMargins();
        this.drawChartBox();
        this.hasCartesianSeries ?
          f(b) : a && a.length && f(a);
        this.seriesGroup || (this.seriesGroup = c.g("series-group").attr({
          zIndex: 3
        }).shadow(this.options.chart.seriesGroupShadow).add());
        this.renderSeries();
        this.addCredits();
        this.setResponsive && this.setResponsive();
        this.hasRendered = !0
      }
      addCredits(b) {
        const a = this,
          c = P(!0, this.options.credits, b);
        c.enabled && !this.credits && (this.credits = this.renderer.text(c.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
          c.href && (l.location.href = c.href)
        }).attr({
          align: c.position.align,
          zIndex: 8
        }), a.styledMode || this.credits.css(c.style), this.credits.add().align(c.position), this.credits.update = function(b) {
          a.credits = a.credits.destroy();
          a.addCredits(b)
        })
      }
      destroy() {
        const b = this,
          a = b.axes,
          c = b.series,
          f = b.container,
          g = f && f.parentNode;
        let e;
        O(b, "destroy");
        b.renderer.forExport ? Q(E, b) : E[b.index] = void 0;
        G.chartCount--;
        b.renderTo.removeAttribute("data-highcharts-chart");
        Z(b);
        for (e = a.length; e--;) a[e] = a[e].destroy();
        this.scroller && this.scroller.destroy && this.scroller.destroy();
        for (e = c.length; e--;) c[e] =
          c[e].destroy();
        "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a) {
          const c = b[a];
          c && c.destroy && (b[a] = c.destroy())
        });
        f && (f.innerHTML = p.emptyHTML, Z(f), g && z(f));
        ca(b, function(a, c) {
          delete b[c]
        })
      }
      firstRender() {
        const b = this,
          a = b.options;
        b.getContainer();
        b.resetMargins();
        b.setChartSize();
        b.propFromSeries();
        b.getAxes();
        (da(a.series) ? a.series : []).forEach(function(a) {
          b.initSeries(a)
        });
        b.linkSeries();
        b.setSeriesData();
        O(b, "beforeRender");
        b.render();
        b.pointer.getChartPosition();
        if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
        b.temporaryDisplay(!0)
      }
      onload() {
        this.callbacks.concat([this.callback]).forEach(function(b) {
          b && "undefined" !== typeof this.index && b.apply(this, [this])
        }, this);
        O(this, "load");
        O(this, "render");
        J(this.index) && this.setReflow();
        this.warnIfA11yModuleNotLoaded();
        this.hasLoaded = !0
      }
      warnIfA11yModuleNotLoaded() {
        const {
          options: b,
          title: a
        } = this;
        b && !this.accessibility && (this.renderer.boxWrapper.attr({
          role: "img",
          "aria-label": (a && a.element.textContent || "").replace(/</g, "&lt;")
        }), b.accessibility && !1 === b.accessibility.enabled || S('Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.', !1, this))
      }
      addSeries(b, a, c) {
        const f = this;
        let g;
        b && (a = T(a, !0), O(f, "addSeries", {
          options: b
        }, function() {
          g = f.initSeries(b);
          f.isDirtyLegend = !0;
          f.linkSeries();
          g.enabledDataSorting && g.setData(b.data, !1);
          O(f, "afterAddSeries", {
            series: g
          });
          a && f.redraw(c)
        }));
        return g
      }
      addAxis(b, a, c, f) {
        return this.createAxis(a ? "xAxis" : "yAxis", {
          axis: b,
          redraw: c,
          animation: f
        })
      }
      addColorAxis(b, a, c) {
        return this.createAxis("colorAxis", {
          axis: b,
          redraw: a,
          animation: c
        })
      }
      createAxis(b, a) {
        b = new A(this, P(a.axis, {
          index: this[b].length,
          isX: "xAxis" === b
        }));
        T(a.redraw, !0) && this.redraw(a.animation);
        return b
      }
      showLoading(b) {
        const a = this,
          c = a.options,
          e = c.loading,
          d = function() {
            l &&
              x(l, {
                left: a.plotLeft + "px",
                top: a.plotTop + "px",
                width: a.plotWidth + "px",
                height: a.plotHeight + "px"
              })
          };
        let l = a.loadingDiv,
          h = a.loadingSpan;
        l || (a.loadingDiv = l = f("div", {
          className: "highcharts-loading highcharts-loading-hidden"
        }, null, a.container));
        h || (a.loadingSpan = h = f("span", {
          className: "highcharts-loading-inner"
        }, null, l), g(a, "redraw", d));
        l.className = "highcharts-loading";
        p.setElementHTML(h, T(b, c.lang.loading, ""));
        a.styledMode || (x(l, R(e.style, {
          zIndex: 10
        })), x(h, e.labelStyle), a.loadingShown || (x(l, {
            opacity: 0,
            display: ""
          }),
          m(l, {
            opacity: e.style.opacity || .5
          }, {
            duration: e.showDuration || 0
          })));
        a.loadingShown = !0;
        d()
      }
      hideLoading() {
        const b = this.options,
          a = this.loadingDiv;
        a && (a.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || m(a, {
          opacity: 0
        }, {
          duration: b.loading.hideDuration || 100,
          complete: function() {
            x(a, {
              display: "none"
            })
          }
        }));
        this.loadingShown = !1
      }
      update(b, a, f, g) {
        const e = this,
          d = {
            credits: "addCredits",
            title: "setTitle",
            subtitle: "setSubtitle",
            caption: "setCaption"
          },
          l = b.isResponsiveOptions,
          k = [];
        let q, m;
        O(e, "update", {
          options: b
        });
        l || e.setResponsive(!1, !0);
        b = c(b, e.options);
        e.userOptions = P(e.userOptions, b);
        var n = b.chart;
        if (n) {
          P(!0, e.options.chart, n);
          "className" in n && e.setClassName(n.className);
          if ("inverted" in n || "polar" in n || "type" in n) {
            e.propFromSeries();
            var x = !0
          }
          "alignTicks" in n && (x = !0);
          "events" in n && u(this, n);
          ca(n, function(b, a) {
            -1 !== e.propsRequireUpdateSeries.indexOf("chart." + a) && (q = !0); - 1 !== e.propsRequireDirtyBox.indexOf(a) && (e.isDirtyBox = !0); - 1 !== e.propsRequireReflow.indexOf(a) && (l ? e.isDirtyBox = !0 : m = !0)
          });
          !e.styledMode && n.style && e.renderer.setStyle(e.options.chart.style || {})
        }!e.styledMode && b.colors && (this.options.colors = b.colors);
        b.time && (this.time === h && (this.time = new r(b.time)), P(!0, e.options.time, b.time));
        ca(b, function(a, c) {
          if (e[c] && "function" === typeof e[c].update) e[c].update(a, !1);
          else if ("function" === typeof e[d[c]]) e[d[c]](a);
          else "colors" !== c && -1 === e.collectionsWithUpdate.indexOf(c) && P(!0, e.options[c], b[c]);
          "chart" !== c && -1 !== e.propsRequireUpdateSeries.indexOf(c) && (q = !0)
        });
        this.collectionsWithUpdate.forEach(function(a) {
          let c;
          b[a] && (c = [], e[a].forEach(function(b, a) {
            b.options.isInternal || c.push(T(b.options.index, a))
          }), ea(b[a]).forEach(function(b, g) {
            const d = J(b.id);
            let l;
            d && (l = e.get(b.id));
            !l && e[a] && (l = e[a][c ? c[g] : g]) && d && J(l.options.id) && (l = void 0);
            l && l.coll === a && (l.update(b, !1), f && (l.touched = !0));
            !l && f && e.collectionsWithInit[a] && (e.collectionsWithInit[a][0].apply(e, [b].concat(e.collectionsWithInit[a][1] || []).concat([!1])).touched = !0)
          }), f && e[a].forEach(function(b) {
            b.touched || b.options.isInternal ? delete b.touched : k.push(b)
          }))
        });
        k.forEach(function(b) {
          b.chart && b.remove && b.remove(!1)
        });
        x && e.axes.forEach(function(b) {
          b.update({}, !1)
        });
        q && e.getSeriesOrderByLinks().forEach(function(b) {
          b.chart && b.update({}, !1)
        }, this);
        x = n && n.width;
        n = n && (Y(n.height) ? U(n.height, x || e.chartWidth) : n.height);
        m || W(x) && x !== e.chartWidth || W(n) && n !== e.chartHeight ? e.setSize(x, n, g) : T(a, !0) && e.redraw(g);
        O(e, "afterUpdate", {
          options: b,
          redraw: a,
          animation: g
        })
      }
      setSubtitle(b, a) {
        this.applyDescription("subtitle", b);
        this.layOutTitles(a)
      }
      setCaption(b, a) {
        this.applyDescription("caption",
          b);
        this.layOutTitles(a)
      }
      showResetZoom() {
        function b() {
          a.zoomOut()
        }
        const a = this,
          c = n.lang,
          f = a.options.chart.zooming.resetButton,
          g = f.theme,
          e = "chart" === f.relativeTo || "spacingBox" === f.relativeTo ? null : "scrollablePlotBox";
        O(this, "beforeShowResetZoom", null, function() {
          a.resetZoomButton = a.renderer.button(c.resetZoom, null, null, b, g).attr({
            align: f.position.align,
            title: c.resetZoomTitle
          }).addClass("highcharts-reset-zoom").add().align(f.position, !1, e)
        });
        O(this, "afterShowResetZoom")
      }
      zoomOut() {
        O(this, "selection", {
            resetSelection: !0
          },
          this.zoom)
      }
      zoom(b) {
        const a = this,
          c = a.pointer;
        let f = !1,
          g;
        !b || b.resetSelection ? (a.axes.forEach(function(b) {
          g = b.zoom()
        }), c.initiated = !1) : b.xAxis.concat(b.yAxis).forEach(function(b) {
          const e = b.axis;
          if (c[e.isXAxis ? "zoomX" : "zoomY"] && J(c.mouseDownX) && J(c.mouseDownY) && a.isInsidePlot(c.mouseDownX - a.plotLeft, c.mouseDownY - a.plotTop, {
              axis: e
            }) || !J(a.inverted ? c.mouseDownX : c.mouseDownY)) g = e.zoom(b.min, b.max), e.displayBtn && (f = !0)
        });
        const e = a.resetZoomButton;
        f && !e ? a.showResetZoom() : !f && K(e) && (a.resetZoomButton = e.destroy());
        g && a.redraw(T(a.options.chart.animation, b && b.animation, 100 > a.pointCount))
      }
      pan(b, a) {
        const c = this,
          f = c.hoverPoints;
        a = "object" === typeof a ? a : {
          enabled: a,
          type: "x"
        };
        const g = c.options.chart;
        g && g.panning && (g.panning = a);
        const e = a.type;
        let d;
        O(this, "pan", {
          originalEvent: b
        }, function() {
          f && f.forEach(function(b) {
            b.setState()
          });
          let a = c.xAxis;
          "xy" === e ? a = a.concat(c.yAxis) : "y" === e && (a = c.yAxis);
          const g = {};
          a.forEach(function(a) {
            if (a.options.panningEnabled && !a.options.isInternal) {
              var f = a.horiz,
                l = b[f ? "chartX" : "chartY"];
              f =
                f ? "mouseDownX" : "mouseDownY";
              var h = c[f],
                k = a.minPointOffset || 0,
                q = a.reversed && !c.inverted || !a.reversed && c.inverted ? -1 : 1,
                m = a.getExtremes(),
                n = a.toValue(h - l, !0) + k * q,
                x = a.toValue(h + a.len - l, !0) - (k * q || a.isXAxis && a.pointRangePadding || 0),
                w = x < n;
              q = a.hasVerticalPanning();
              h = w ? x : n;
              n = w ? n : x;
              var p = a.panningState;
              !q || a.isXAxis || p && !p.isDirty || a.series.forEach(function(b) {
                var a = b.getProcessedData(!0);
                a = b.getExtremes(a.yData, !0);
                p || (p = {
                  startMin: Number.MAX_VALUE,
                  startMax: -Number.MAX_VALUE
                });
                W(a.dataMin) && W(a.dataMax) && (p.startMin =
                  Math.min(T(b.options.threshold, Infinity), a.dataMin, p.startMin), p.startMax = Math.max(T(b.options.threshold, -Infinity), a.dataMax, p.startMax))
              });
              q = Math.min(T(p && p.startMin, m.dataMin), k ? m.min : a.toValue(a.toPixels(m.min) - a.minPixelPadding));
              x = Math.max(T(p && p.startMax, m.dataMax), k ? m.max : a.toValue(a.toPixels(m.max) + a.minPixelPadding));
              a.panningState = p;
              a.isOrdinal || (k = q - h, 0 < k && (n += k, h = q), k = n - x, 0 < k && (n = x, h -= k), a.series.length && h !== m.min && n !== m.max && h >= q && n <= x && (a.setExtremes(h, n, !1, !1, {
                  trigger: "pan"
                }), !c.resetZoomButton &&
                h !== q && n !== x && e.match("y") && (c.showResetZoom(), a.displayBtn = !1), d = !0), g[f] = l)
            }
          });
          ca(g, (b, a) => {
            c[a] = b
          });
          d && c.redraw(!1);
          x(c.container, {
            cursor: "move"
          })
        })
      }
    }
    R(aa.prototype, {
      callbacks: [],
      collectionsWithInit: {
        xAxis: [aa.prototype.addAxis, [!0]],
        yAxis: [aa.prototype.addAxis, [!1]],
        series: [aa.prototype.addSeries]
      },
      collectionsWithUpdate: ["xAxis", "yAxis", "series"],
      propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
      propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
      propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
    });
    "";
    return aa
  });
  M(a, "Core/Legend/LegendSymbol.js", [a["Core/Utilities.js"]], function(a) {
    const {
      extend: u,
      merge: H,
      pick: I
    } = a;
    var F;
    (function(a) {
      a.lineMarker = function(a, B) {
        B = this.legendItem = this.legendItem || {};
        var t = this.options;
        const r = a.symbolWidth,
          d = a.symbolHeight,
          p = d / 2,
          m = this.chart.renderer,
          k = B.group;
        a = a.baseline - Math.round(.3 * a.fontMetrics.b);
        let v = {},
          n = t.marker,
          h = 0;
        this.chart.styledMode || (v = {
          "stroke-width": Math.min(t.lineWidth || 0, 24)
        }, t.dashStyle ? v.dashstyle = t.dashStyle : "square" !== t.linecap && (v["stroke-linecap"] = "round"));
        B.line = m.path().addClass("highcharts-graph").attr(v).add(k);
        v["stroke-linecap"] && (h = Math.min(B.line.strokeWidth(), r) / 2);
        r && B.line.attr({
          d: [
            ["M", h, a],
            ["L", r - h, a]
          ]
        });
        n && !1 !== n.enabled && r && (t = Math.min(I(n.radius,
          p), p), 0 === this.symbol.indexOf("url") && (n = H(n, {
          width: d,
          height: d
        }), t = 0), B.symbol = B = m.symbol(this.symbol, r / 2 - t, a - t, 2 * t, 2 * t, u({
          context: "legend"
        }, n)).addClass("highcharts-point").add(k), B.isMarker = !0)
      };
      a.rectangle = function(a, u) {
        u = u.legendItem || {};
        const t = a.symbolHeight,
          r = a.options.squareSymbol;
        u.symbol = this.chart.renderer.rect(r ? (a.symbolWidth - t) / 2 : 0, a.baseline - t + 1, r ? t : a.symbolWidth, t, I(a.options.symbolRadius, t / 2)).addClass("highcharts-point").attr({
          zIndex: 3
        }).add(u.group)
      }
    })(F || (F = {}));
    return F
  });
  M(a,
    "Core/Series/SeriesDefaults.js", [],
    function() {
      return {
        lineWidth: 1,
        allowPointSelect: !1,
        crisp: !0,
        showCheckbox: !1,
        animation: {
          duration: 1E3
        },
        events: {},
        marker: {
          enabledThreshold: 2,
          lineColor: "#ffffff",
          lineWidth: 0,
          radius: 4,
          states: {
            normal: {
              animation: !0
            },
            hover: {
              animation: {
                duration: 150
              },
              enabled: !0,
              radiusPlus: 2,
              lineWidthPlus: 1
            },
            select: {
              fillColor: "#cccccc",
              lineColor: "#000000",
              lineWidth: 2
            }
          }
        },
        point: {
          events: {}
        },
        dataLabels: {
          animation: {},
          align: "center",
          borderWidth: 0,
          defer: !0,
          formatter: function() {
            const {
              numberFormatter: a
            } =
            this.series.chart;
            return "number" !== typeof this.y ? "" : a(this.y, -1)
          },
          padding: 5,
          style: {
            fontSize: "0.7em",
            fontWeight: "bold",
            color: "contrast",
            textOutline: "1px contrast"
          },
          verticalAlign: "bottom",
          x: 0,
          y: 0
        },
        cropThreshold: 300,
        opacity: 1,
        pointRange: 0,
        softThreshold: !0,
        states: {
          normal: {
            animation: !0
          },
          hover: {
            animation: {
              duration: 150
            },
            lineWidthPlus: 1,
            marker: {},
            halo: {
              size: 10,
              opacity: .25
            }
          },
          select: {
            animation: {
              duration: 0
            }
          },
          inactive: {
            animation: {
              duration: 150
            },
            opacity: .2
          }
        },
        stickyTracking: !0,
        turboThreshold: 1E3,
        findNearestPointBy: "x"
      }
    });
  M(a, "Core/Series/Series.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Defaults.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Legend/LegendSymbol.js"], a["Core/Series/Point.js"], a["Core/Series/SeriesDefaults.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function(a, A, H, I, F, G, C, B, t, r) {
    const {
      animObject: d,
      setAnimation: p
    } = a, {
      defaultOptions: m
    } = A, {
      registerEventOptions: k
    } = H, {
      hasTouch: v,
      svg: n,
      win: h
    } = I, {
      seriesTypes: D
    } = B, {
      arrayMax: u,
      arrayMin: E,
      clamp: e,
      cleanRecursively: q,
      correctFloat: y,
      defined: l,
      erase: w,
      error: g,
      extend: b,
      find: c,
      fireEvent: f,
      getNestedProperty: x,
      isArray: J,
      isNumber: z,
      isString: Q,
      merge: S,
      objectEach: R,
      pick: N,
      removeEvent: O,
      splat: ba,
      syncTimeout: da
    } = r;
    class W {
      constructor() {
        this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0
      }
      init(a, c) {
        f(this,
          "init", {
            options: c
          });
        const g = this,
          e = a.series;
        this.eventsToUnbind = [];
        g.chart = a;
        g.options = g.setOptions(c);
        c = g.options;
        g.linkedSeries = [];
        g.bindAxes();
        b(g, {
          name: c.name,
          state: "",
          visible: !1 !== c.visible,
          selected: !0 === c.selected
        });
        k(this, c);
        const d = c.events;
        if (d && d.click || c.point && c.point.events && c.point.events.click || c.allowPointSelect) a.runTrackerClick = !0;
        g.getColor();
        g.getSymbol();
        g.parallelArrays.forEach(function(b) {
          g[b + "Data"] || (g[b + "Data"] = [])
        });
        g.isCartesian && (a.hasCartesianSeries = !0);
        let l;
        e.length &&
          (l = e[e.length - 1]);
        g._i = N(l && l._i, -1) + 1;
        g.opacity = g.options.opacity;
        a.orderSeries(this.insert(e));
        c.dataSorting && c.dataSorting.enabled ? g.setDataSortingOptions() : g.points || g.data || g.setData(c.data, !1);
        f(this, "afterInit")
      }
      is(b) {
        return D[b] && this instanceof D[b]
      }
      insert(b) {
        const a = this.options.index;
        let c;
        if (z(a)) {
          for (c = b.length; c--;)
            if (a >= N(b[c].options.index, b[c]._i)) {
              b.splice(c + 1, 0, this);
              break
            } - 1 === c && b.unshift(this);
          c += 1
        } else b.push(this);
        return N(c, b.length - 1)
      }
      bindAxes() {
        const b = this,
          a = b.options,
          c = b.chart;
        let e;
        f(this, "bindAxes", null, function() {
          (b.axisTypes || []).forEach(function(f) {
            let d = 0;
            c[f].forEach(function(c) {
              e = c.options;
              if (a[f] === d && !e.isInternal || "undefined" !== typeof a[f] && a[f] === e.id || "undefined" === typeof a[f] && 0 === e.index) b.insert(c.series), b[f] = c, c.isDirty = !0;
              e.isInternal || d++
            });
            b[f] || b.optionalAxis === f || g(18, !0, c)
          })
        });
        f(this, "afterBindAxes")
      }
      updateParallelArrays(b, a, c) {
        const f = b.series,
          g = z(a) ? function(c) {
            const g = "y" === c && f.toYData ? f.toYData(b) : b[c];
            f[c + "Data"][a] = g
          } : function(b) {
            Array.prototype[a].apply(f[b +
              "Data"], c)
          };
        f.parallelArrays.forEach(g)
      }
      hasData() {
        return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
      }
      autoIncrement(b) {
        var a = this.options;
        const c = a.pointIntervalUnit,
          f = a.relativeXValue,
          g = this.chart.time;
        let e = this.xIncrement,
          d;
        e = N(e, a.pointStart, 0);
        this.pointInterval = d = N(this.pointInterval, a.pointInterval, 1);
        f && z(b) && (d *= b);
        c && (a = new g.Date(e), "day" === c ? g.set("Date", a, g.get("Date", a) + d) : "month" === c ? g.set("Month",
          a, g.get("Month", a) + d) : "year" === c && g.set("FullYear", a, g.get("FullYear", a) + d), d = a.getTime() - e);
        if (f && z(b)) return e + d;
        this.xIncrement = e + d;
        return e
      }
      setDataSortingOptions() {
        const a = this.options;
        b(this, {
          requireSorting: !1,
          sorted: !1,
          enabledDataSorting: !0,
          allowDG: !1
        });
        l(a.pointRange) || (a.pointRange = 1)
      }
      setOptions(b) {
        var a = this.chart,
          c = a.options,
          g = c.plotOptions,
          e = a.userOptions || {};
        b = S(b);
        a = a.styledMode;
        const d = {
          plotOptions: g,
          userOptions: b
        };
        f(this, "setOptions", d);
        const h = d.plotOptions[this.type],
          k = e.plotOptions || {};
        this.userOptions = d.userOptions;
        e = S(h, g.series, e.plotOptions && e.plotOptions[this.type], b);
        this.tooltipOptions = S(m.tooltip, m.plotOptions.series && m.plotOptions.series.tooltip, m.plotOptions[this.type].tooltip, c.tooltip.userOptions, g.series && g.series.tooltip, g[this.type].tooltip, b.tooltip);
        this.stickyTracking = N(b.stickyTracking, k[this.type] && k[this.type].stickyTracking, k.series && k.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : e.stickyTracking);
        null === h.marker && delete e.marker;
        this.zoneAxis = e.zoneAxis;
        g = this.zones = (e.zones || []).slice();
        !e.negativeColor && !e.negativeFillColor || e.zones || (c = {
          value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
          className: "highcharts-negative"
        }, a || (c.color = e.negativeColor, c.fillColor = e.negativeFillColor), g.push(c));
        g.length && l(g[g.length - 1].value) && g.push(a ? {} : {
          color: this.color,
          fillColor: this.fillColor
        });
        f(this, "afterSetOptions", {
          options: e
        });
        return e
      }
      getName() {
        return N(this.options.name, "Series " + (this.index + 1))
      }
      getCyclic(b, a, c) {
        const f = this.chart,
          g = this.userOptions,
          e = b + "Index",
          d = b + "Counter",
          h = c ? c.length : N(f.options.chart[b + "Count"], f[b + "Count"]);
        if (!a) {
          var k = N(g[e], g["_" + e]);
          l(k) || (f.series.length || (f[d] = 0), g["_" + e] = k = f[d] % h, f[d] += 1);
          c && (a = c[k])
        }
        "undefined" !== typeof k && (this[e] = k);
        this[b] = a
      }
      getColor() {
        this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || m.plotOptions[this.type].color, this.chart.options.colors)
      }
      getPointsCollection() {
        return (this.hasGroupedData ?
          this.points : this.data) || []
      }
      getSymbol() {
        this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
      }
      findPointIndex(b, a) {
        const f = b.id,
          g = b.x,
          e = this.points;
        var d = this.options.dataSorting,
          l;
        let h, k;
        if (f) d = this.chart.get(f), d instanceof G && (l = d);
        else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue)
          if (l = a => !a.touched && a.index === b.index, d && d.matchByName ? l = a => !a.touched && a.name === b.name : this.options.relativeXValue && (l = a => !a.touched && a.options.x === b.x), l = c(e, l),
            !l) return;
        l && (k = l && l.index, "undefined" !== typeof k && (h = !0));
        "undefined" === typeof k && z(g) && (k = this.xData.indexOf(g, a)); - 1 !== k && "undefined" !== typeof k && this.cropped && (k = k >= this.cropStart ? k - this.cropStart : k);
        !h && z(k) && e[k] && e[k].touched && (k = void 0);
        return k
      }
      updateData(b, a) {
        const c = this.options,
          f = c.dataSorting,
          g = this.points,
          e = [],
          d = this.requireSorting,
          h = b.length === g.length;
        let k, q, m, n = !0;
        this.xIncrement = null;
        b.forEach(function(b, a) {
          var q = l(b) && this.pointClass.prototype.optionsToObject.call({
              series: this
            },
            b) || {};
          const n = q.x;
          if (q.id || z(n)) {
            if (q = this.findPointIndex(q, m), -1 === q || "undefined" === typeof q ? e.push(b) : g[q] && b !== c.data[q] ? (g[q].update(b, !1, null, !1), g[q].touched = !0, d && (m = q + 1)) : g[q] && (g[q].touched = !0), !h || a !== q || f && f.enabled || this.hasDerivedData) k = !0
          } else e.push(b)
        }, this);
        if (k)
          for (b = g.length; b--;)(q = g[b]) && !q.touched && q.remove && q.remove(!1, a);
        else !h || f && f.enabled ? n = !1 : (b.forEach(function(b, a) {
          b === g[a].y || g[a].destroyed || g[a].update(b, !1, null, !1)
        }), e.length = 0);
        g.forEach(function(b) {
          b && (b.touched = !1)
        });
        if (!n) return !1;
        e.forEach(function(b) {
          this.addPoint(b, !1, null, null, !1)
        }, this);
        null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = u(this.xData), this.autoIncrement());
        return !0
      }
      setData(b, a = !0, c, f) {
        var e;
        const d = this,
          l = d.points,
          h = l && l.length || 0,
          k = d.options,
          q = d.chart,
          n = k.dataSorting,
          m = d.xAxis,
          x = k.turboThreshold,
          w = this.xData,
          p = this.yData;
        var y = d.pointArrayMap;
        y = y && y.length;
        const r = k.keys;
        let v, K = 0,
          D = 1,
          t = null;
        if (!q.options.chart.allowMutatingData) {
          k.data && delete d.options.data;
          d.userOptions.data && delete d.userOptions.data;
          var u = S(!0, b)
        }
        b = u || b || [];
        u = b.length;
        n && n.enabled && (b = this.sortData(b));
        q.options.chart.allowMutatingData && !1 !== f && u && h && !d.cropped && !d.hasGroupedData && d.visible && !d.boosted && (v = this.updateData(b, c));
        if (!v) {
          d.xIncrement = null;
          d.colorCounter = 0;
          this.parallelArrays.forEach(function(b) {
            d[b + "Data"].length = 0
          });
          if (x && u > x)
            if (t = d.getFirstValidPoint(b), z(t))
              for (c = 0; c < u; c++) w[c] = this.autoIncrement(), p[c] = b[c];
            else if (J(t))
            if (y)
              if (t.length === y)
                for (c = 0; c < u; c++) w[c] =
                  this.autoIncrement(), p[c] = b[c];
              else
                for (c = 0; c < u; c++) f = b[c], w[c] = f[0], p[c] = f.slice(1, y + 1);
          else if (r && (K = r.indexOf("x"), D = r.indexOf("y"), K = 0 <= K ? K : 0, D = 0 <= D ? D : 1), 1 === t.length && (D = 0), K === D)
            for (c = 0; c < u; c++) w[c] = this.autoIncrement(), p[c] = b[c][D];
          else
            for (c = 0; c < u; c++) f = b[c], w[c] = f[K], p[c] = f[D];
          else g(12, !1, q);
          else
            for (c = 0; c < u; c++) f = {
              series: d
            }, d.pointClass.prototype.applyOptions.apply(f, [b[c]]), d.updateParallelArrays(f, c);
          p && Q(p[0]) && g(14, !0, q);
          d.data = [];
          d.options.data = d.userOptions.data = b;
          for (c = h; c--;) null ===
            (e = l[c]) || void 0 === e ? void 0 : e.destroy();
          m && (m.minRange = m.userMinRange);
          d.isDirty = q.isDirtyBox = !0;
          d.isDirtyData = !!l;
          c = !1
        }
        "point" === k.legendType && (this.processData(), this.generatePoints());
        a && q.redraw(c)
      }
      sortData(b) {
        const a = this,
          c = a.options.dataSorting.sortKey || "y",
          f = function(b, a) {
            return l(a) && b.pointClass.prototype.optionsToObject.call({
              series: b
            }, a) || {}
          };
        b.forEach(function(c, g) {
          b[g] = f(a, c);
          b[g].index = g
        }, this);
        b.concat().sort((b, a) => {
          b = x(c, b);
          a = x(c, a);
          return a < b ? -1 : a > b ? 1 : 0
        }).forEach(function(b, a) {
          b.x =
            a
        }, this);
        a.linkedSeries && a.linkedSeries.forEach(function(a) {
          const c = a.options,
            g = c.data;
          c.dataSorting && c.dataSorting.enabled || !g || (g.forEach(function(c, e) {
            g[e] = f(a, c);
            b[e] && (g[e].x = b[e].x, g[e].index = e)
          }), a.setData(g, !1))
        });
        return b
      }
      getProcessedData(b) {
        var a = this.xAxis,
          c = this.options,
          f = c.cropThreshold;
        const e = b || this.getExtremesFromAll || c.getExtremesFromAll,
          d = this.isCartesian;
        b = a && a.val2lin;
        c = !(!a || !a.logarithmic);
        let l = 0,
          h;
        let k, q, m = this.xData,
          n = this.yData,
          x = this.requireSorting;
        var w = !1;
        const p = m.length;
        a && (w = a.getExtremes(), k = w.min, q = w.max, w = !(!a.categories || a.names.length));
        if (d && this.sorted && !e && (!f || p > f || this.forceCrop))
          if (m[p - 1] < k || m[0] > q) m = [], n = [];
          else if (this.yData && (m[0] < k || m[p - 1] > q)) {
          var z = this.cropData(this.xData, this.yData, k, q);
          m = z.xData;
          n = z.yData;
          l = z.start;
          z = !0
        }
        for (f = m.length || 1; --f;) a = c ? b(m[f]) - b(m[f - 1]) : m[f] - m[f - 1], 0 < a && ("undefined" === typeof h || a < h) ? h = a : 0 > a && x && !w && (g(15, !1, this.chart), x = !1);
        return {
          xData: m,
          yData: n,
          cropped: z,
          cropStart: l,
          closestPointRange: h
        }
      }
      processData(b) {
        const a = this.xAxis;
        if (this.isCartesian && !this.isDirty && !a.isDirty && !this.yAxis.isDirty && !b) return !1;
        b = this.getProcessedData();
        this.cropped = b.cropped;
        this.cropStart = b.cropStart;
        this.processedXData = b.xData;
        this.processedYData = b.yData;
        this.closestPointRange = this.basePointRange = b.closestPointRange;
        f(this, "afterProcessData")
      }
      cropData(b, a, c, f, g) {
        const e = b.length;
        let d, l = 0,
          h = e;
        g = N(g, this.cropShoulder);
        for (d = 0; d < e; d++)
          if (b[d] >= c) {
            l = Math.max(0, d - g);
            break
          } for (c = d; c < e; c++)
          if (b[c] > f) {
            h = c + g;
            break
          } return {
          xData: b.slice(l, h),
          yData: a.slice(l,
            h),
          start: l,
          end: h
        }
      }
      generatePoints() {
        var a = this.options;
        const c = this.processedData || a.data,
          g = this.processedXData,
          e = this.processedYData,
          d = this.pointClass,
          l = g.length,
          h = this.cropStart || 0,
          k = this.hasGroupedData,
          q = a.keys,
          m = [];
        a = a.dataGrouping && a.dataGrouping.groupAll ? h : 0;
        let n;
        let x, w, p = this.data;
        if (!p && !k) {
          var z = [];
          z.length = c.length;
          p = this.data = z
        }
        q && k && (this.options.keys = !1);
        for (w = 0; w < l; w++) z = h + w, k ? (x = (new d).init(this, [g[w]].concat(ba(e[w]))), x.dataGroup = this.groupMap[a + w], x.dataGroup.options && (x.options =
          x.dataGroup.options, b(x, x.dataGroup.options), delete x.dataLabels)) : (x = p[z]) || "undefined" === typeof c[z] || (p[z] = x = (new d).init(this, c[z], g[w])), x && (x.index = k ? a + w : z, m[w] = x);
        this.options.keys = q;
        if (p && (l !== (n = p.length) || k))
          for (w = 0; w < n; w++) w !== h || k || (w += l), p[w] && (p[w].destroyElements(), p[w].plotX = void 0);
        this.data = p;
        this.points = m;
        f(this, "afterGeneratePoints")
      }
      getXExtremes(b) {
        return {
          min: E(b),
          max: u(b)
        }
      }
      getExtremes(b, a) {
        const c = this.xAxis;
        var g = this.yAxis;
        const e = this.processedXData || this.xData,
          d = [],
          l = this.requireSorting ?
          this.cropShoulder : 0;
        g = g ? g.positiveValuesOnly : !1;
        let h, k = 0,
          q = 0,
          m = 0;
        b = b || this.stackedYData || this.processedYData || [];
        const n = b.length;
        if (c) {
          var x = c.getExtremes();
          k = x.min;
          q = x.max
        }
        for (h = 0; h < n; h++) {
          var w = e[h];
          x = b[h];
          var p = (z(x) || J(x)) && (x.length || 0 < x || !g);
          w = a || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !c || (e[h + l] || w) >= k && (e[h - l] || w) <= q;
          if (p && w)
            if (p = x.length)
              for (; p--;) z(x[p]) && (d[m++] = x[p]);
            else d[m++] = x
        }
        b = {
          activeYData: d,
          dataMin: E(d),
          dataMax: u(d)
        };
        f(this, "afterGetExtremes", {
          dataExtremes: b
        });
        return b
      }
      applyExtremes() {
        const b = this.getExtremes();
        this.dataMin = b.dataMin;
        this.dataMax = b.dataMax;
        return b
      }
      getFirstValidPoint(b) {
        const a = b.length;
        let c = 0,
          f = null;
        for (; null === f && c < a;) f = b[c], c++;
        return f
      }
      translate() {
        var b;
        this.processedXData || this.processData();
        this.generatePoints();
        const a = this.options,
          c = a.stacking,
          g = this.xAxis,
          d = g.categories,
          h = this.enabledDataSorting,
          k = this.yAxis,
          q = this.points,
          m = q.length,
          n = this.pointPlacementToXValue(),
          x = !!n,
          w = a.threshold,
          p = a.startFromThreshold ? w :
          0,
          r = this.zoneAxis || "y";
        let v, D, t, u, E = Number.MAX_VALUE;
        for (v = 0; v < m; v++) {
          const f = q[v],
            m = f.x;
          let K, O, Q = f.y,
            L = f.low;
          const P = c && (null === (b = k.stacking) || void 0 === b ? void 0 : b.stacks[(this.negStacks && Q < (p ? 0 : w) ? "-" : "") + this.stackKey]);
          D = g.translate(m, !1, !1, !1, !0, n);
          f.plotX = z(D) ? y(e(D, -1E5, 1E5)) : void 0;
          c && this.visible && P && P[m] && (u = this.getStackIndicator(u, m, this.index), !f.isNull && u.key && (K = P[m], O = K.points[u.key]), K && J(O) && (L = O[0], Q = O[1], L === p && u.key === P[m].base && (L = N(z(w) ? w : k.min)), k.positiveValuesOnly && l(L) &&
            0 >= L && (L = void 0), f.total = f.stackTotal = N(K.total), f.percentage = l(f.y) && K.total ? f.y / K.total * 100 : void 0, f.stackY = Q, this.irregularWidths || K.setOffset(this.pointXOffset || 0, this.barW || 0, void 0, void 0, void 0, this.xAxis)));
          f.yBottom = l(L) ? e(k.translate(L, !1, !0, !1, !0), -1E5, 1E5) : void 0;
          this.dataModify && (Q = this.dataModify.modifyValue(Q, v));
          let R;
          z(Q) && void 0 !== f.plotX && (R = k.translate(Q, !1, !0, !1, !0), R = z(R) ? e(R, -1E5, 1E5) : void 0);
          f.plotY = R;
          f.isInside = this.isPointInside(f);
          f.clientX = x ? y(g.translate(m, !1, !1, !1, !0,
            n)) : D;
          f.negative = f[r] < (a[r + "Threshold"] || w || 0);
          f.category = N(d && d[f.x], f.x);
          f.isNull || !1 === f.visible || ("undefined" !== typeof t && (E = Math.min(E, Math.abs(D - t))), t = D);
          f.zone = this.zones.length ? f.getZone() : void 0;
          !f.graphic && this.group && h && (f.isNew = !0)
        }
        this.closestPointRangePx = E;
        f(this, "afterTranslate")
      }
      getValidPoints(b, a, c) {
        const f = this.chart;
        return (b || this.points || []).filter(function(b) {
          const {
            plotX: g,
            plotY: e
          } = b;
          return !c && (b.isNull || !z(e)) || a && !f.isInsidePlot(g, e, {
            inverted: f.inverted
          }) ? !1 : !1 !== b.visible
        })
      }
      getClipBox() {
        const {
          chart: b,
          xAxis: a,
          yAxis: c
        } = this, f = S(b.clipBox);
        a && a.len !== b.plotSizeX && (f.width = a.len);
        c && c.len !== b.plotSizeY && (f.height = c.len);
        return f
      }
      getSharedClipKey() {
        return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0)
      }
      setClip() {
        const {
          chart: b,
          group: a,
          markerGroup: c
        } = this, f = b.sharedClips, g = b.renderer, e = this.getClipBox(), d = this.getSharedClipKey();
        let l = f[d];
        l ? l.animate(e) : f[d] = l = g.clipRect(e);
        a && a.clip(!1 === this.options.clip ? void 0 : l);
        c && c.clip()
      }
      animate(b) {
        const {
          chart: a,
          group: c,
          markerGroup: f
        } =
        this, g = a.inverted;
        var e = d(this.options.animation),
          l = [this.getSharedClipKey(), e.duration, e.easing, e.defer].join();
        let h = a.sharedClips[l],
          k = a.sharedClips[l + "m"];
        if (b && c) e = this.getClipBox(), h ? h.attr("height", e.height) : (e.width = 0, g && (e.x = a.plotHeight), h = a.renderer.clipRect(e), a.sharedClips[l] = h, k = a.renderer.clipRect({
          x: -99,
          y: -99,
          width: g ? a.plotWidth + 199 : 99,
          height: g ? 99 : a.plotHeight + 199
        }), a.sharedClips[l + "m"] = k), c.clip(h), f && f.clip(k);
        else if (h && !h.hasClass("highcharts-animating")) {
          l = this.getClipBox();
          const b =
            e.step;
          f && f.element.childNodes.length && (e.step = function(a, c) {
            b && b.apply(c, arguments);
            "width" === c.prop && k && k.element && k.attr(g ? "height" : "width", a + 99)
          });
          h.addClass("highcharts-animating").animate(l, e)
        }
      }
      afterAnimate() {
        this.setClip();
        R(this.chart.sharedClips, (b, a, c) => {
          b && !this.chart.container.querySelector(`[clip-path="url(#${b.id})"]`) && (b.destroy(), delete c[a])
        });
        this.finishedAnimating = !0;
        f(this, "afterAnimate")
      }
      drawPoints(b = this.points) {
        const a = this.chart,
          c = a.styledMode,
          {
            colorAxis: f,
            options: g
          } = this,
          e = g.marker,
          d = this[this.specialGroup || "markerGroup"],
          l = this.xAxis,
          h = N(e.enabled, !l || l.isRadial ? !0 : null, this.closestPointRangePx >= e.enabledThreshold * e.radius);
        let k, q, m, n;
        let x, w;
        if (!1 !== e.enabled || this._hasPointMarkers)
          for (k = 0; k < b.length; k++) {
            q = b[k];
            n = (m = q.graphic) ? "animate" : "attr";
            var p = q.marker || {};
            x = !!q.marker;
            if ((h && "undefined" === typeof p.enabled || p.enabled) && !q.isNull && !1 !== q.visible) {
              const b = N(p.symbol, this.symbol, "rect");
              w = this.markerAttribs(q, q.selected && "select");
              this.enabledDataSorting &&
                (q.startXPos = l.reversed ? -(w.width || 0) : l.width);
              const g = !1 !== q.isInside;
              !m && g && (0 < (w.width || 0) || q.hasImage) && (q.graphic = m = a.renderer.symbol(b, w.x, w.y, w.width, w.height, x ? p : e).add(d), this.enabledDataSorting && a.hasRendered && (m.attr({
                x: q.startXPos
              }), n = "animate"));
              m && "animate" === n && m[g ? "show" : "hide"](g).animate(w);
              if (m)
                if (p = this.pointAttribs(q, c || !q.selected ? void 0 : "select"), c) f && m.css({
                  fill: p.fill
                });
                else m[n](p);
              m && m.addClass(q.getClassName(), !0)
            } else m && (q.graphic = m.destroy())
          }
      }
      markerAttribs(b, a) {
        const c =
          this.options;
        var f = c.marker;
        const g = b.marker || {},
          e = g.symbol || f.symbol,
          d = {};
        let l = N(g.radius, f && f.radius);
        a && (f = f.states[a], a = g.states && g.states[a], l = N(a && a.radius, f && f.radius, l && l + (f && f.radiusPlus || 0)));
        b.hasImage = e && 0 === e.indexOf("url");
        b.hasImage && (l = 0);
        b = b.pos();
        z(l) && b && (d.x = b[0] - l, d.y = b[1] - l, c.crisp && (d.x = Math.floor(d.x)));
        l && (d.width = d.height = 2 * l);
        return d
      }
      pointAttribs(b, a) {
        var c = this.options.marker,
          f = b && b.options;
        const g = f && f.marker || {};
        var e = f && f.color,
          d = b && b.color;
        const l = b && b.zone && b.zone.color;
        let h = this.color;
        b = N(g.lineWidth, c.lineWidth);
        f = 1;
        h = e || l || d || h;
        e = g.fillColor || c.fillColor || h;
        d = g.lineColor || c.lineColor || h;
        a = a || "normal";
        c = c.states[a] || {};
        a = g.states && g.states[a] || {};
        b = N(a.lineWidth, c.lineWidth, b + N(a.lineWidthPlus, c.lineWidthPlus, 0));
        e = a.fillColor || c.fillColor || e;
        d = a.lineColor || c.lineColor || d;
        f = N(a.opacity, c.opacity, f);
        return {
          stroke: d,
          "stroke-width": b,
          fill: e,
          opacity: f
        }
      }
      destroy(b) {
        const a = this,
          c = a.chart,
          g = /AppleWebKit\/533/.test(h.navigator.userAgent),
          e = a.data || [];
        let d, l, k, q;
        f(a,
          "destroy", {
            keepEventsForUpdate: b
          });
        this.removeEvents(b);
        (a.axisTypes || []).forEach(function(b) {
          (q = a[b]) && q.series && (w(q.series, a), q.isDirty = q.forceRedraw = !0)
        });
        a.legendItem && a.chart.legend.destroyItem(a);
        for (l = e.length; l--;)(k = e[l]) && k.destroy && k.destroy();
        a.clips && a.clips.forEach(b => b.destroy());
        r.clearTimeout(a.animationTimeout);
        R(a, function(b, a) {
          b instanceof t && !b.survive && (d = g && "group" === a ? "hide" : "destroy", b[d]())
        });
        c.hoverSeries === a && (c.hoverSeries = void 0);
        w(c.series, a);
        c.orderSeries();
        R(a, function(c,
          f) {
          b && "hcEvents" === f || delete a[f]
        })
      }
      applyZones() {
        const b = this,
          a = this.chart,
          c = a.renderer,
          f = this.zones,
          g = this.clips || [],
          d = this.graph,
          l = this.area,
          h = Math.max(a.plotWidth, a.plotHeight),
          k = this[(this.zoneAxis || "y") + "Axis"],
          q = a.inverted;
        let m, n, x, w, p, z, y, v, r, J, D, t = !1;
        f.length && (d || l) && k && "undefined" !== typeof k.min ? (p = k.reversed, z = k.horiz, d && !this.showLine && d.hide(), l && l.hide(), w = k.getExtremes(), f.forEach(function(f, u) {
          m = p ? z ? a.plotWidth : 0 : z ? 0 : k.toPixels(w.min) || 0;
          m = e(N(n, m), 0, h);
          n = e(Math.round(k.toPixels(N(f.value,
            w.max), !0) || 0), 0, h);
          t && (m = n = k.toPixels(w.max));
          y = Math.abs(m - n);
          v = Math.min(m, n);
          r = Math.max(m, n);
          k.isXAxis ? (x = {
            x: q ? r : v,
            y: 0,
            width: y,
            height: h
          }, z || (x.x = a.plotHeight - x.x)) : (x = {
            x: 0,
            y: q ? r : v,
            width: h,
            height: y
          }, z && (x.y = a.plotWidth - x.y));
          g[u] ? g[u].animate(x) : g[u] = c.clipRect(x);
          J = b["zone-area-" + u];
          D = b["zone-graph-" + u];
          d && D && D.clip(g[u]);
          l && J && J.clip(g[u]);
          t = f.value > w.max;
          b.resetZones && 0 === n && (n = void 0)
        }), this.clips = g) : b.visible && (d && d.show(), l && l.show())
      }
      plotGroup(b, a, c, f, g) {
        let e = this[b];
        const d = !e;
        c = {
          visibility: c,
          zIndex: f || .1
        };
        "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (c.opacity = this.opacity);
        d && (this[b] = e = this.chart.renderer.g().add(g));
        e.addClass("highcharts-" + a + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (l(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (e.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
        e.attr(c)[d ? "attr" : "animate"](this.getPlotBox(a));
        return e
      }
      getPlotBox(b) {
        let a = this.xAxis,
          c = this.yAxis;
        const f = this.chart;
        b = f.inverted && !f.polar && a && !1 !== this.invertible && "series" === b;
        f.inverted && (a = c, c = this.xAxis);
        return {
          translateX: a ? a.left : f.plotLeft,
          translateY: c ? c.top : f.plotTop,
          rotation: b ? 90 : 0,
          rotationOriginX: b ? (a.len - c.len) / 2 : 0,
          rotationOriginY: b ? (a.len + c.len) / 2 : 0,
          scaleX: b ? -1 : 1,
          scaleY: 1
        }
      }
      removeEvents(b) {
        b || O(this);
        this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function(b) {
          b()
        }), this.eventsToUnbind.length = 0)
      }
      render() {
        const b = this;
        var a = b.chart;
        const c = b.options,
          g = d(c.animation),
          e = b.visible ? "inherit" : "hidden",
          l = c.zIndex,
          h = b.hasRendered;
        a = a.seriesGroup;
        let k = b.finishedAnimating ? 0 : g.duration;
        f(this, "render");
        b.plotGroup("group", "series", e, l, a);
        b.markerGroup = b.plotGroup("markerGroup", "markers", e, l, a);
        !1 !== c.clip && b.setClip();
        b.animate && k && b.animate(!0);
        b.drawGraph && (b.drawGraph(), b.applyZones());
        b.visible && b.drawPoints();
        b.drawDataLabels && b.drawDataLabels();
        b.redrawPoints && b.redrawPoints();
        b.drawTracker && !1 !== b.options.enableMouseTracking && b.drawTracker();
        b.animate && k && b.animate();
        h || (k && g.defer && (k += g.defer), b.animationTimeout = da(function() {
          b.afterAnimate()
        }, k || 0));
        b.isDirty = !1;
        b.hasRendered = !0;
        f(b, "afterRender")
      }
      redraw() {
        const b = this.isDirty || this.isDirtyData;
        this.translate();
        this.render();
        b && delete this.kdTree
      }
      searchPoint(b, a) {
        const c = this.xAxis,
          f = this.yAxis,
          g = this.chart.inverted;
        return this.searchKDTree({
          clientX: g ? c.len - b.chartY + c.pos : b.chartX - c.pos,
          plotY: g ? f.len - b.chartX + f.pos : b.chartY - f.pos
        }, a, b)
      }
      buildKDTree(b) {
        function a(b, f, g) {
          var e = b && b.length;
          let d;
          if (e) return d =
            c.kdAxisArray[f % g], b.sort(function(b, a) {
              return b[d] - a[d]
            }), e = Math.floor(e / 2), {
              point: b[e],
              left: a(b.slice(0, e), f + 1, g),
              right: a(b.slice(e + 1), f + 1, g)
            }
        }
        this.buildingKdTree = !0;
        const c = this,
          f = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
        delete c.kdTree;
        da(function() {
          c.kdTree = a(c.getValidPoints(null, !c.directTouch), f, f);
          c.buildingKdTree = !1
        }, c.options.kdNow || b && "touchstart" === b.type ? 0 : 1)
      }
      searchKDTree(b, a, c) {
        function f(b, a, c, k) {
          const q = a.point;
          var m = g.kdAxisArray[c % k];
          let n = q;
          var x = l(b[e]) && l(q[e]) ? Math.pow(b[e] -
            q[e], 2) : null;
          var w = l(b[d]) && l(q[d]) ? Math.pow(b[d] - q[d], 2) : null;
          w = (x || 0) + (w || 0);
          q.dist = l(w) ? Math.sqrt(w) : Number.MAX_VALUE;
          q.distX = l(x) ? Math.sqrt(x) : Number.MAX_VALUE;
          m = b[m] - q[m];
          w = 0 > m ? "left" : "right";
          x = 0 > m ? "right" : "left";
          a[w] && (w = f(b, a[w], c + 1, k), n = w[h] < n[h] ? w : q);
          a[x] && Math.sqrt(m * m) < n[h] && (b = f(b, a[x], c + 1, k), n = b[h] < n[h] ? b : n);
          return n
        }
        const g = this,
          e = this.kdAxisArray[0],
          d = this.kdAxisArray[1],
          h = a ? "distX" : "dist";
        a = -1 < g.options.findNearestPointBy.indexOf("y") ? 2 : 1;
        this.kdTree || this.buildingKdTree || this.buildKDTree(c);
        if (this.kdTree) return f(b, this.kdTree, a, a)
      }
      pointPlacementToXValue() {
        const {
          options: {
            pointPlacement: b,
            pointRange: a
          },
          xAxis: c
        } = this;
        let f = b;
        "between" === f && (f = c.reversed ? -.5 : .5);
        return z(f) ? f * (a || c.pointRange) : 0
      }
      isPointInside(b) {
        const {
          chart: a,
          xAxis: c,
          yAxis: f
        } = this;
        return "undefined" !== typeof b.plotY && "undefined" !== typeof b.plotX && 0 <= b.plotY && b.plotY <= (f ? f.len : a.plotHeight) && 0 <= b.plotX && b.plotX <= (c ? c.len : a.plotWidth)
      }
      drawTracker() {
        const b = this,
          a = b.options,
          c = a.trackByArea,
          g = [].concat(c ? b.areaPath : b.graphPath),
          e = b.chart,
          d = e.pointer,
          l = e.renderer,
          h = e.options.tooltip.snap,
          k = b.tracker,
          q = function(a) {
            if (e.hoverSeries !== b) b.onMouseOver()
          },
          m = "rgba(192,192,192," + (n ? .0001 : .002) + ")";
        k ? k.attr({
          d: g
        }) : b.graph && (b.tracker = l.path(g).attr({
          visibility: b.visible ? "inherit" : "hidden",
          zIndex: 2
        }).addClass(c ? "highcharts-tracker-area" : "highcharts-tracker-line").add(b.group), e.styledMode || b.tracker.attr({
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          stroke: m,
          fill: c ? m : "none",
          "stroke-width": b.graph.strokeWidth() + (c ? 0 : 2 * h)
        }), [b.tracker,
          b.markerGroup, b.dataLabelsGroup
        ].forEach(function(b) {
          if (b && (b.addClass("highcharts-tracker").on("mouseover", q).on("mouseout", function(b) {
              d.onTrackerMouseOut(b)
            }), a.cursor && !e.styledMode && b.css({
              cursor: a.cursor
            }), v)) b.on("touchstart", q)
        }));
        f(this, "afterDrawTracker")
      }
      addPoint(b, a, c, g, e) {
        const d = this.options,
          l = this.data,
          h = this.chart;
        var k = this.xAxis;
        k = k && k.hasNames && k.names;
        const q = d.data,
          m = this.xData;
        let n, x;
        a = N(a, !0);
        const w = {
          series: this
        };
        this.pointClass.prototype.applyOptions.apply(w, [b]);
        const p =
          w.x;
        x = m.length;
        if (this.requireSorting && p < m[x - 1])
          for (n = !0; x && m[x - 1] > p;) x--;
        this.updateParallelArrays(w, "splice", [x, 0, 0]);
        this.updateParallelArrays(w, x);
        k && w.name && (k[p] = w.name);
        q.splice(x, 0, b);
        if (n || this.processedData) this.data.splice(x, 0, null), this.processData();
        "point" === d.legendType && this.generatePoints();
        c && (l[0] && l[0].remove ? l[0].remove(!1) : (l.shift(), this.updateParallelArrays(w, "shift"), q.shift()));
        !1 !== e && f(this, "addPoint", {
          point: w
        });
        this.isDirtyData = this.isDirty = !0;
        a && h.redraw(g)
      }
      removePoint(b,
        a, c) {
        const f = this,
          g = f.data,
          e = g[b],
          d = f.points,
          l = f.chart,
          h = function() {
            d && d.length === g.length && d.splice(b, 1);
            g.splice(b, 1);
            f.options.data.splice(b, 1);
            f.updateParallelArrays(e || {
              series: f
            }, "splice", [b, 1]);
            e && e.destroy();
            f.isDirty = !0;
            f.isDirtyData = !0;
            a && l.redraw()
          };
        p(c, l);
        a = N(a, !0);
        e ? e.firePointEvent("remove", null, h) : h()
      }
      remove(b, a, c, g) {
        function e() {
          d.destroy(g);
          l.isDirtyLegend = l.isDirtyBox = !0;
          l.linkSeries(g);
          N(b, !0) && l.redraw(a)
        }
        const d = this,
          l = d.chart;
        !1 !== c ? f(d, "remove", null, e) : e()
      }
      update(a, c) {
        a = q(a,
          this.userOptions);
        f(this, "update", {
          options: a
        });
        const e = this,
          d = e.chart;
        var l = e.userOptions;
        const h = e.initialType || e.type;
        var k = d.options.plotOptions;
        const m = D[h].prototype;
        var n = e.finishedAnimating && {
          animation: !1
        };
        const x = {};
        let w, p = ["eventOptions", "navigatorSeries", "baseSeries"],
          z = a.type || l.type || d.options.chart.type;
        const y = !(this.hasDerivedData || z && z !== this.type || "undefined" !== typeof a.pointStart || "undefined" !== typeof a.pointInterval || "undefined" !== typeof a.relativeXValue || a.joinBy || a.mapData ||
          e.hasOptionChanged("dataGrouping") || e.hasOptionChanged("pointStart") || e.hasOptionChanged("pointInterval") || e.hasOptionChanged("pointIntervalUnit") || e.hasOptionChanged("keys"));
        z = z || h;
        y && (p.push("data", "isDirtyData", "points", "processedData", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== a.visible && p.push("area", "graph"), e.parallelArrays.forEach(function(b) {
            p.push(b + "Data")
          }),
          a.data && (a.dataSorting && b(e.options.dataSorting, a.dataSorting), this.setData(a.data, !1)));
        a = S(l, n, {
          index: "undefined" === typeof l.index ? e.index : l.index,
          pointStart: N(k && k.series && k.series.pointStart, l.pointStart, e.xData[0])
        }, !y && {
          data: e.options.data
        }, a);
        y && a.data && (a.data = e.options.data);
        p = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(p);
        p.forEach(function(b) {
          p[b] = e[b];
          delete e[b]
        });
        k = !1;
        if (D[z]) {
          if (k = z !== e.type, e.remove(!1, !1, !1, !0), k)
            if (Object.setPrototypeOf) Object.setPrototypeOf(e,
              D[z].prototype);
            else {
              n = Object.hasOwnProperty.call(e, "hcEvents") && e.hcEvents;
              for (w in m) e[w] = void 0;
              b(e, D[z].prototype);
              n ? e.hcEvents = n : delete e.hcEvents
            }
        } else g(17, !0, d, {
          missingModuleFor: z
        });
        p.forEach(function(b) {
          e[b] = p[b]
        });
        e.init(d, a);
        if (y && this.points) {
          a = e.options;
          if (!1 === a.visible) x.graphic = 1, x.dataLabel = 1;
          else if (!e._hasPointLabels) {
            const {
              marker: b,
              dataLabels: c
            } = a;
            l = l.marker || {};
            !b || !1 !== b.enabled && l.symbol === b.symbol && l.height === b.height && l.width === b.width || (x.graphic = 1);
            c && !1 === c.enabled && (x.dataLabel =
              1)
          }
          for (const b of this.points) b && b.series && (b.resolveColor(), Object.keys(x).length && b.destroyElements(x), !1 === a.showInLegend && b.legendItem && d.legend.destroyItem(b))
        }
        e.initialType = h;
        d.linkSeries();
        k && e.linkedSeries.length && (e.isDirtyData = !0);
        f(this, "afterUpdate");
        N(c, !0) && d.redraw(y ? void 0 : !1)
      }
      setName(b) {
        this.name = this.options.name = this.userOptions.name = b;
        this.chart.isDirtyLegend = !0
      }
      hasOptionChanged(b) {
        const a = this.options[b],
          c = this.chart.options.plotOptions,
          f = this.userOptions[b];
        return f ? a !== f : a !==
          N(c && c[this.type] && c[this.type][b], c && c.series && c.series[b], a)
      }
      onMouseOver() {
        const b = this.chart,
          a = b.hoverSeries;
        b.pointer.setHoverChartIndex();
        if (a && a !== this) a.onMouseOut();
        this.options.events.mouseOver && f(this, "mouseOver");
        this.setState("hover");
        b.hoverSeries = this
      }
      onMouseOut() {
        const b = this.options,
          a = this.chart,
          c = a.tooltip,
          g = a.hoverPoint;
        a.hoverSeries = null;
        if (g) g.onMouseOut();
        this && b.events.mouseOut && f(this, "mouseOut");
        !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
        a.series.forEach(function(b) {
          b.setState("",
            !0)
        })
      }
      setState(b, a) {
        const c = this;
        var f = c.options;
        const g = c.graph,
          e = f.inactiveOtherPoints,
          d = f.states,
          l = N(d[b || "normal"] && d[b || "normal"].animation, c.chart.options.chart.animation);
        let h = f.lineWidth,
          k = 0,
          q = f.opacity;
        b = b || "";
        if (c.state !== b && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function(a) {
            a && (c.state && a.removeClass("highcharts-series-" + c.state), b && a.addClass("highcharts-series-" + b))
          }), c.state = b, !c.chart.styledMode)) {
          if (d[b] && !1 === d[b].enabled) return;
          b && (h = d[b].lineWidth || h + (d[b].lineWidthPlus ||
            0), q = N(d[b].opacity, q));
          if (g && !g.dashstyle && z(h))
            for (f = {
                "stroke-width": h
              }, g.animate(f, l); c["zone-graph-" + k];) c["zone-graph-" + k].animate(f, l), k += 1;
          e || [c.group, c.markerGroup, c.dataLabelsGroup, c.labelBySeries].forEach(function(b) {
            b && b.animate({
              opacity: q
            }, l)
          })
        }
        a && e && c.points && c.setAllPointsToState(b || void 0)
      }
      setAllPointsToState(b) {
        this.points.forEach(function(a) {
          a.setState && a.setState(b)
        })
      }
      setVisible(b, a) {
        const c = this,
          g = c.chart,
          e = g.options.chart.ignoreHiddenSeries,
          d = c.visible,
          l = (c.visible = b = c.options.visible =
            c.userOptions.visible = "undefined" === typeof b ? !d : b) ? "show" : "hide";
        ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(b) {
          if (c[b]) c[b][l]()
        });
        if (g.hoverSeries === c || (g.hoverPoint && g.hoverPoint.series) === c) c.onMouseOut();
        c.legendItem && g.legend.colorizeItem(c, b);
        c.isDirty = !0;
        c.options.stacking && g.series.forEach(function(b) {
          b.options.stacking && b.visible && (b.isDirty = !0)
        });
        c.linkedSeries.forEach(function(a) {
          a.setVisible(b, !1)
        });
        e && (g.isDirtyBox = !0);
        f(c, l);
        !1 !== a && g.redraw()
      }
      show() {
        this.setVisible(!0)
      }
      hide() {
        this.setVisible(!1)
      }
      select(b) {
        this.selected =
          b = this.options.selected = "undefined" === typeof b ? !this.selected : b;
        this.checkbox && (this.checkbox.checked = b);
        f(this, b ? "select" : "unselect")
      }
      shouldShowTooltip(b, a, c = {}) {
        c.series = this;
        c.visiblePlotOnly = !0;
        return this.chart.isInsidePlot(b, a, c)
      }
      drawLegendSymbol(b, a) {
        var c;
        null === (c = F[this.options.legendSymbol || "rectangle"]) || void 0 === c ? void 0 : c.call(this, b, a)
      }
    }
    W.defaultOptions = C;
    W.types = B.seriesTypes;
    W.registerType = B.registerSeriesType;
    b(W.prototype, {
      axisTypes: ["xAxis", "yAxis"],
      coll: "series",
      colorCounter: 0,
      cropShoulder: 1,
      directTouch: !1,
      isCartesian: !0,
      kdAxisArray: ["clientX", "plotY"],
      parallelArrays: ["x", "y"],
      pointClass: G,
      requireSorting: !0,
      sorted: !0
    });
    B.series = W;
    "";
    "";
    return W
  });
  M(a, "Extensions/ScrollablePlotArea.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/Series/Series.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Utilities.js"]], function(a, A, H, I, F, G) {
    const {
      stop: u
    } = a, {
      addEvent: B,
      createElement: t,
      defined: r,
      merge: d,
      pick: p
    } = G;
    B(H, "afterSetChartSize",
      function(a) {
        var k = this.options.chart.scrollablePlotArea,
          m = k && k.minWidth;
        k = k && k.minHeight;
        let n;
        if (!this.renderer.forExport) {
          if (m) {
            if (this.scrollablePixelsX = m = Math.max(0, m - this.chartWidth)) this.scrollablePlotBox = this.renderer.scrollablePlotBox = d(this.plotBox), this.plotBox.width = this.plotWidth += m, this.inverted ? this.clipBox.height += m : this.clipBox.width += m, n = {
              1: {
                name: "right",
                value: m
              }
            }
          } else k && (this.scrollablePixelsY = m = Math.max(0, k - this.chartHeight), r(m) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox =
            d(this.plotBox), this.plotBox.height = this.plotHeight += m, this.inverted ? this.clipBox.width += m : this.clipBox.height += m, n = {
              2: {
                name: "bottom",
                value: m
              }
            }));
          n && !a.skipAxes && this.axes.forEach(function(a) {
            n[a.side] ? a.getPlotLinePath = function() {
              let d = n[a.side].name,
                h = this[d],
                k;
              this[d] = h - n[a.side].value;
              k = A.prototype.getPlotLinePath.apply(this, arguments);
              this[d] = h;
              return k
            } : (a.setAxisSize(), a.setAxisTranslation())
          })
        }
      });
    B(H, "render", function() {
      this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling &&
        this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
    });
    H.prototype.setUpScrolling = function() {
      const a = {
        WebkitOverflowScrolling: "touch",
        overflowX: "hidden",
        overflowY: "hidden"
      };
      this.scrollablePixelsX && (a.overflowX = "auto");
      this.scrollablePixelsY && (a.overflowY = "auto");
      this.scrollingParent = t("div", {
        className: "highcharts-scrolling-parent"
      }, {
        position: "relative"
      }, this.renderTo);
      this.scrollingContainer = t("div", {
        className: "highcharts-scrolling"
      }, a, this.scrollingParent);
      let d;
      B(this.scrollingContainer,
        "scroll", () => {
          this.pointer && (delete this.pointer.chartPosition, this.hoverPoint && (d = this.hoverPoint), this.pointer.runPointActions(void 0, d, !0))
        });
      this.innerContainer = t("div", {
        className: "highcharts-inner-container"
      }, null, this.scrollingContainer);
      this.innerContainer.appendChild(this.container);
      this.setUpScrolling = null
    };
    H.prototype.moveFixedElements = function() {
      let a = this.container,
        d = this.fixedRenderer,
        p = ".highcharts-breadcrumbs-group .highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
        n;
      this.scrollablePixelsX && !this.inverted ? n = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? n = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? n = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (n = ".highcharts-yaxis");
      n && p.push(`${n}:not(.highcharts-radial-axis)`, `${n}-labels:not(.highcharts-radial-axis-labels)`);
      p.forEach(function(h) {
        [].forEach.call(a.querySelectorAll(h), function(a) {
          (a.namespaceURI === d.SVG_NS ? d.box : d.box.parentNode).appendChild(a);
          a.style.pointerEvents =
            "auto"
        })
      })
    };
    H.prototype.applyFixed = function() {
      var a = !this.fixedDiv,
        d = this.options.chart,
        r = d.scrollablePlotArea,
        n = F.getRendererType();
      a ? (this.fixedDiv = t("div", {
        className: "highcharts-fixed"
      }, {
        position: "absolute",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: (d.style && d.style.zIndex || 0) + 2,
        top: 0
      }, null, !0), this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = d = new n(this.fixedDiv, this.chartWidth,
        this.chartHeight, this.options.chart.style), this.scrollableMask = d.path().attr({
        fill: this.options.chart.backgroundColor || "#fff",
        "fill-opacity": p(r.opacity, .85),
        zIndex: -1
      }).addClass("highcharts-scrollable-mask").add(), B(this, "afterShowResetZoom", this.moveFixedElements), B(this, "afterApplyDrilldown", this.moveFixedElements), B(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
      if (this.scrollableDirty || a) this.scrollableDirty = !1, this.moveFixedElements();
      d = this.chartWidth + (this.scrollablePixelsX || 0);
      n = this.chartHeight + (this.scrollablePixelsY || 0);
      u(this.container);
      this.container.style.width = d + "px";
      this.container.style.height = n + "px";
      this.renderer.boxWrapper.attr({
        width: d,
        height: n,
        viewBox: [0, 0, d, n].join(" ")
      });
      this.chartBackground.attr({
        width: d,
        height: n
      });
      this.scrollingContainer.style.height = this.chartHeight + "px";
      a && (r.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * r.scrollPositionX), r.scrollPositionY && (this.scrollingContainer.scrollTop =
        this.scrollablePixelsY * r.scrollPositionY));
      n = this.axisOffset;
      a = this.plotTop - n[0] - 1;
      r = this.plotLeft - n[3] - 1;
      d = this.plotTop + this.plotHeight + n[2] + 1;
      n = this.plotLeft + this.plotWidth + n[1] + 1;
      let h = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
        D = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
      a = this.scrollablePixelsX ? [
        ["M", 0, a],
        ["L", this.plotLeft - 1, a],
        ["L", this.plotLeft - 1, d],
        ["L", 0, d],
        ["Z"],
        ["M", h, a],
        ["L", this.chartWidth, a],
        ["L", this.chartWidth, d],
        ["L", h, d],
        ["Z"]
      ] : this.scrollablePixelsY ? [
        ["M", r, 0],
        ["L", r, this.plotTop - 1],
        ["L", n, this.plotTop - 1],
        ["L", n, 0],
        ["Z"],
        ["M", r, D],
        ["L", r, this.chartHeight],
        ["L", n, this.chartHeight],
        ["L", n, D],
        ["Z"]
      ] : [
        ["M", 0, 0]
      ];
      "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
        d: a
      })
    };
    B(A, "afterInit", function() {
      this.chart.scrollableDirty = !0
    });
    B(I, "show", function() {
      this.chart.scrollableDirty = !0
    });
    ""
  });
  M(a, "Core/Axis/Stacking/StackItem.js", [a["Core/FormatUtilities.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      format: u
    } =
    a, {
      series: F
    } = A, {
      destroyObjectProperties: G,
      fireEvent: C,
      isNumber: B,
      pick: t
    } = H;
    class r {
      constructor(a, p, m, k, r) {
        const d = a.chart.inverted,
          h = a.reversed;
        this.axis = a;
        a = this.isNegative = !!m !== !!h;
        this.options = p = p || {};
        this.x = k;
        this.cumulative = this.total = null;
        this.points = {};
        this.hasValidPoints = !1;
        this.stack = r;
        this.rightCliff = this.leftCliff = 0;
        this.alignOptions = {
          align: p.align || (d ? a ? "left" : "right" : "center"),
          verticalAlign: p.verticalAlign || (d ? "middle" : a ? "bottom" : "top"),
          y: p.y,
          x: p.x
        };
        this.textAlign = p.textAlign || (d ? a ?
          "right" : "left" : "center")
      }
      destroy() {
        G(this, this.axis)
      }
      render(a) {
        const d = this.axis.chart,
          m = this.options;
        var k = m.format;
        k = k ? u(k, this, d) : m.formatter.call(this);
        this.label ? this.label.attr({
          text: k,
          visibility: "hidden"
        }) : (this.label = d.renderer.label(k, null, void 0, m.shape, void 0, void 0, m.useHTML, !1, "stack-labels"), k = {
            r: m.borderRadius || 0,
            text: k,
            padding: t(m.padding, 5),
            visibility: "hidden"
          }, d.styledMode || (k.fill = m.backgroundColor, k.stroke = m.borderColor, k["stroke-width"] = m.borderWidth, this.label.css(m.style || {})),
          this.label.attr(k), this.label.added || this.label.add(a));
        this.label.labelrank = d.plotSizeY;
        C(this, "afterRender")
      }
      setOffset(a, p, m, k, r, n) {
        const {
          alignOptions: d,
          axis: v,
          label: u,
          options: E,
          textAlign: e
        } = this, q = v.chart;
        m = this.getStackBox({
          xOffset: a,
          width: p,
          boxBottom: m,
          boxTop: k,
          defaultX: r,
          xAxis: n
        });
        var {
          verticalAlign: y
        } = d;
        if (u && m) {
          k = u.getBBox();
          r = u.padding;
          n = "justify" === t(E.overflow, "justify");
          d.x = E.x || 0;
          d.y = E.y || 0;
          const {
            x: a,
            y: h
          } = this.adjustStackPosition({
            labelBox: k,
            verticalAlign: y,
            textAlign: e
          });
          m.x -= a;
          m.y -=
            h;
          u.align(d, !1, m);
          (y = q.isInsidePlot(u.alignAttr.x + d.x + a, u.alignAttr.y + d.y + h)) || (n = !1);
          n && F.prototype.justifyDataLabel.call(v, u, d, u.alignAttr, k, m);
          u.attr({
            x: u.alignAttr.x,
            y: u.alignAttr.y,
            rotation: E.rotation,
            rotationOriginX: k.width / 2,
            rotationOriginY: k.height / 2
          });
          t(!n && E.crop, !0) && (y = B(u.x) && B(u.y) && q.isInsidePlot(u.x - r + u.width, u.y) && q.isInsidePlot(u.x + r, u.y));
          u[y ? "show" : "hide"]()
        }
        C(this, "afterSetOffset", {
          xOffset: a,
          width: p
        })
      }
      adjustStackPosition({
        labelBox: a,
        verticalAlign: p,
        textAlign: m
      }) {
        const d = {
          bottom: 0,
          middle: 1,
          top: 2,
          right: 1,
          center: 0,
          left: -1
        };
        return {
          x: a.width / 2 + a.width / 2 * d[m],
          y: a.height / 2 * d[p]
        }
      }
      getStackBox(a) {
        var d = this.axis;
        const m = d.chart,
          {
            boxTop: k,
            defaultX: r,
            xOffset: n,
            width: h,
            boxBottom: D
          } = a;
        var u = d.stacking.usePercentage ? 100 : t(k, this.total, 0);
        u = d.toPixels(u);
        a = a.xAxis || m.xAxis[0];
        const E = t(r, a.translate(this.x)) + n;
        d = d.toPixels(D || B(d.min) && d.logarithmic && d.logarithmic.lin2log(d.min) || 0);
        d = Math.abs(u - d);
        const e = this.isNegative;
        return m.inverted ? {
          x: (e ? u : u - d) - m.plotLeft,
          y: a.height - E - h,
          width: d,
          height: h
        } : {
          x: E + a.transB - m.plotLeft,
          y: (e ? u - d : u) - m.plotTop,
          width: h,
          height: d
        }
      }
    }
    "";
    return r
  });
  M(a, "Core/Axis/Stacking/StackingAxis.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Axis/Stacking/StackItem.js"], a["Core/Utilities.js"]], function(a, A, H, I, F) {
    function u() {
      const b = this,
        a = b.inverted;
      b.yAxis.forEach(b => {
        b.stacking && b.stacking.stacks && b.hasVisibleSeries && (b.stacking.oldStacks = b.stacking.stacks)
      });
      b.series.forEach(c => {
        const f = c.xAxis && c.xAxis.options || {};
        !c.options.stacking || !0 !== c.visible && !1 !== b.options.chart.ignoreHiddenSeries || (c.stackKey = [c.type, l(c.options.stack, ""), a ? f.top : f.left, a ? f.height : f.width].join())
      })
    }

    function C() {
      const b = this.stacking;
      if (b) {
        var a = b.stacks;
        y(a, function(b, c) {
          L(b);
          a[c] = null
        });
        b && b.stackTotalGroup && b.stackTotalGroup.destroy()
      }
    }

    function B() {
      "yAxis" !== this.coll || this.stacking || (this.stacking = new w(this))
    }

    function t(b, a, f, g) {
      !D(b) || b.x !== a || g && b.stackKey !== g ? b = {
        x: a,
        index: 0,
        key: g,
        stackKey: g
      } : b.index++;
      b.key = [f, a, b.index].join();
      return b
    }

    function r() {
      const b = this,
        a = b.stackKey,
        f = b.yAxis.stacking.stacks,
        g = b.processedXData,
        e = b[b.options.stacking + "Stacker"];
      let d;
      e && [a, "-" + a].forEach(a => {
        let c = g.length;
        let l;
        for (; c--;) {
          var h = g[c];
          d = b.getStackIndicator(d, h, b.index, a);
          (l = (h = f[a] && f[a][h]) && h.points[d.key]) && e.call(b, l, h, c)
        }
      })
    }

    function d(b, a, f) {
      a = a.total ? 100 / a.total : 0;
      b[0] = h(b[0] * a);
      b[1] = h(b[1] * a);
      this.stackedYData[f] = b[1]
    }

    function p() {
      const b = this.yAxis.stacking;
      this.options.centerInCategory && (this.is("column") || this.is("columnrange")) &&
        !this.options.stacking && 1 < this.chart.series.length ? v.setStackedPoints.call(this, "group") : b && y(b.stacks, (a, f) => {
          "group" === f.slice(-5) && (y(a, b => b.destroy()), delete b.stacks[f])
        })
    }

    function m(b) {
      var a = this.chart;
      const f = b || this.options.stacking;
      if (f && (!0 === this.visible || !1 === a.options.chart.ignoreHiddenSeries)) {
        var g = this.processedXData,
          d = this.processedYData,
          k = [],
          q = d.length,
          m = this.options,
          n = m.threshold,
          w = l(m.startFromThreshold && n, 0);
        m = m.stack;
        b = b ? `${this.type},${f}` : this.stackKey;
        var p = "-" + b,
          y = this.negStacks;
        a = "group" === f ? a.yAxis[0] : this.yAxis;
        var r = a.stacking.stacks,
          v = a.stacking.oldStacks,
          u, t;
        a.stacking.stacksTouched += 1;
        for (t = 0; t < q; t++) {
          var E = g[t];
          var B = d[t];
          var L = this.getStackIndicator(L, E, this.index);
          var A = L.key;
          var C = (u = y && B < (w ? 0 : n)) ? p : b;
          r[C] || (r[C] = {});
          r[C][E] || (v[C] && v[C][E] ? (r[C][E] = v[C][E], r[C][E].total = null) : r[C][E] = new I(a, a.options.stackLabels, !!u, E, m));
          C = r[C][E];
          null !== B ? (C.points[A] = C.points[this.index] = [l(C.cumulative, w)], D(C.cumulative) || (C.base = A), C.touched = a.stacking.stacksTouched, 0 <
            L.index && !1 === this.singleStacks && (C.points[A][0] = C.points[this.index + "," + E + ",0"][0])) : C.points[A] = C.points[this.index] = null;
          "percent" === f ? (u = u ? b : p, y && r[u] && r[u][E] ? (u = r[u][E], C.total = u.total = Math.max(u.total, C.total) + Math.abs(B) || 0) : C.total = h(C.total + (Math.abs(B) || 0))) : "group" === f ? (e(B) && (B = B[0]), null !== B && (C.total = (C.total || 0) + 1)) : C.total = h(C.total + (B || 0));
          C.cumulative = "group" === f ? (C.total || 1) - 1 : h(l(C.cumulative, w) + (B || 0));
          null !== B && (C.points[A].push(C.cumulative), k[t] = C.cumulative, C.hasValidPoints = !0)
        }
        "percent" === f && (a.stacking.usePercentage = !0);
        "group" !== f && (this.stackedYData = k);
        a.stacking.oldStacks = {}
      }
    }
    const {
      getDeferredAnimation: k
    } = a, {
      series: {
        prototype: v
      }
    } = H, {
      addEvent: n,
      correctFloat: h,
      defined: D,
      destroyObjectProperties: L,
      fireEvent: E,
      isArray: e,
      isNumber: q,
      objectEach: y,
      pick: l
    } = F;
    class w {
      constructor(b) {
        this.oldStacks = {};
        this.stacks = {};
        this.stacksTouched = 0;
        this.axis = b
      }
      buildStacks() {
        const b = this.axis,
          a = b.series,
          f = b.options.reversedStacks,
          g = a.length;
        let e, d;
        this.usePercentage = !1;
        for (d = g; d--;) e =
          a[f ? d : g - d - 1], e.setStackedPoints(), e.setGroupedPoints();
        for (d = 0; d < g; d++) a[d].modifyStacks();
        E(b, "afterBuildStacks")
      }
      cleanStacks() {
        let b;
        this.oldStacks && (b = this.stacks = this.oldStacks);
        y(b, function(b) {
          y(b, function(b) {
            b.cumulative = b.total
          })
        })
      }
      resetStacks() {
        y(this.stacks, b => {
          y(b, (a, f) => {
            q(a.touched) && a.touched < this.stacksTouched ? (a.destroy(), delete b[f]) : (a.total = null, a.cumulative = null)
          })
        })
      }
      renderStackTotals() {
        var b = this.axis;
        const a = b.chart,
          f = a.renderer,
          g = this.stacks;
        b = k(a, b.options.stackLabels && b.options.stackLabels.animation ||
          !1);
        const e = this.stackTotalGroup = this.stackTotalGroup || f.g("stack-labels").attr({
          zIndex: 6,
          opacity: 0
        }).add();
        e.translate(a.plotLeft, a.plotTop);
        y(g, function(b) {
          y(b, function(b) {
            b.render(e)
          })
        });
        e.animate({
          opacity: 1
        }, b)
      }
    }
    var g;
    (function(b) {
      const a = [];
      b.compose = function(b, c, g) {
        F.pushUnique(a, b) && (n(b, "init", B), n(b, "destroy", C));
        F.pushUnique(a, c) && (c.prototype.getStacks = u);
        F.pushUnique(a, g) && (b = g.prototype, b.getStackIndicator = t, b.modifyStacks = r, b.percentStacker = d, b.setGroupedPoints = p, b.setStackedPoints =
          m)
      }
    })(g || (g = {}));
    return g
  });
  M(a, "Series/Line/LineSeries.js", [a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      defined: u,
      merge: F
    } = H;
    class G extends a {
      constructor() {
        super(...arguments);
        this.points = this.options = this.data = void 0
      }
      drawGraph() {
        const a = this,
          u = this.options,
          t = (this.gappedPath || this.getGraphPath).call(this),
          r = this.chart.styledMode;
        let d = [
          ["graph", "highcharts-graph"]
        ];
        r || d[0].push(u.lineColor || this.color || "#cccccc", u.dashStyle);
        d = a.getZonesGraphs(d);
        d.forEach(function(d, m) {
          var k = d[0];
          let p = a[k];
          const n = p ? "animate" : "attr";
          p ? (p.endX = a.preventGraphAnimation ? null : t.xMap, p.animate({
            d: t
          })) : t.length && (a[k] = p = a.chart.renderer.path(t).addClass(d[1]).attr({
            zIndex: 1
          }).add(a.group));
          p && !r && (k = {
            stroke: d[2],
            "stroke-width": u.lineWidth || 0,
            fill: a.fillGraph && a.color || "none"
          }, d[3] ? k.dashstyle = d[3] : "square" !== u.linecap && (k["stroke-linecap"] = k["stroke-linejoin"] = "round"), p[n](k).shadow(2 > m && u.shadow));
          p && (p.startX = t.xMap, p.isArea = t.isArea)
        })
      }
      getGraphPath(a, B, t) {
        const r =
          this,
          d = r.options,
          p = [],
          m = [];
        let k, v = d.step;
        a = a || r.points;
        const n = a.reversed;
        n && a.reverse();
        (v = {
          right: 1,
          center: 2
        } [v] || v && 3) && n && (v = 4 - v);
        a = this.getValidPoints(a, !1, !(d.connectNulls && !B && !t));
        a.forEach(function(h, n) {
          const D = h.plotX,
            E = h.plotY,
            e = a[n - 1],
            q = h.isNull || "number" !== typeof E;
          (h.leftCliff || e && e.rightCliff) && !t && (k = !0);
          q && !u(B) && 0 < n ? k = !d.connectNulls : q && !B ? k = !0 : (0 === n || k ? n = [
            ["M", h.plotX, h.plotY]
          ] : r.getPointSpline ? n = [r.getPointSpline(a, h, n)] : v ? (n = 1 === v ? [
            ["L", e.plotX, E]
          ] : 2 === v ? [
            ["L", (e.plotX + D) / 2,
              e.plotY
            ],
            ["L", (e.plotX + D) / 2, E]
          ] : [
            ["L", D, e.plotY]
          ], n.push(["L", D, E])) : n = [
            ["L", D, E]
          ], m.push(h.x), v && (m.push(h.x), 2 === v && m.push(h.x)), p.push.apply(p, n), k = !1)
        });
        p.xMap = m;
        return r.graphPath = p
      }
      getZonesGraphs(a) {
        this.zones.forEach(function(u, t) {
          t = ["zone-graph-" + t, "highcharts-graph highcharts-zone-graph-" + t + " " + (u.className || "")];
          this.chart.styledMode || t.push(u.color || this.color, u.dashStyle || this.options.dashStyle);
          a.push(t)
        }, this);
        return a
      }
    }
    G.defaultOptions = F(a.defaultOptions, {
      legendSymbol: "lineMarker"
    });
    A.registerSeriesType("line", G);
    "";
    return G
  });
  M(a, "Series/Area/AreaSeries.js", [a["Core/Color/Color.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      parse: u
    } = a, {
      seriesTypes: {
        line: F
      }
    } = A, {
      extend: G,
      merge: C,
      objectEach: B,
      pick: t
    } = H;
    class r extends F {
      constructor() {
        super(...arguments);
        this.points = this.options = this.data = void 0
      }
      drawGraph() {
        this.areaPath = [];
        super.drawGraph.apply(this);
        const a = this,
          p = this.areaPath,
          m = this.options,
          k = [
            ["area", "highcharts-area", this.color, m.fillColor]
          ];
        this.zones.forEach(function(d, n) {
          k.push(["zone-area-" + n, "highcharts-area highcharts-zone-area-" + n + " " + d.className, d.color || a.color, d.fillColor || m.fillColor])
        });
        k.forEach(function(d) {
          const k = d[0],
            h = {};
          let r = a[k];
          const v = r ? "animate" : "attr";
          r ? (r.endX = a.preventGraphAnimation ? null : p.xMap, r.animate({
            d: p
          })) : (h.zIndex = 0, r = a[k] = a.chart.renderer.path(p).addClass(d[1]).add(a.group), r.isArea = !0);
          a.chart.styledMode || (h.fill = t(d[3], u(d[2]).setOpacity(t(m.fillOpacity, .75)).get()));
          r[v](h);
          r.startX = p.xMap;
          r.shiftUnit =
            m.step ? 2 : 1
        })
      }
      getGraphPath(a) {
        var d = F.prototype.getGraphPath,
          m = this.options;
        const k = m.stacking,
          r = this.yAxis,
          n = [],
          h = [],
          u = this.index,
          B = r.stacking.stacks[this.stackKey],
          E = m.threshold,
          e = Math.round(r.getThreshold(m.threshold));
        m = t(m.connectNulls, "percent" === k);
        var q = function(g, b, c) {
          var f = a[g];
          g = k && B[f.x].points[u];
          const d = f[c + "Null"] || 0;
          c = f[c + "Cliff"] || 0;
          let l, q;
          f = !0;
          c || d ? (l = (d ? g[0] : g[1]) + c, q = g[0] + c, f = !!d) : !k && a[b] && a[b].isNull && (l = q = E);
          "undefined" !== typeof l && (h.push({
            plotX: y,
            plotY: null === l ? e : r.getThreshold(l),
            isNull: f,
            isCliff: !0
          }), n.push({
            plotX: y,
            plotY: null === q ? e : r.getThreshold(q),
            doCurve: !1
          }))
        };
        let y;
        a = a || this.points;
        k && (a = this.getStackPoints(a));
        for (let g = 0, b = a.length; g < b; ++g) {
          k || (a[g].leftCliff = a[g].rightCliff = a[g].leftNull = a[g].rightNull = void 0);
          var l = a[g].isNull;
          y = t(a[g].rectPlotX, a[g].plotX);
          var w = k ? t(a[g].yBottom, e) : e;
          if (!l || m) m || q(g, g - 1, "left"), l && !k && m || (h.push(a[g]), n.push({
            x: g,
            plotX: y,
            plotY: w
          })), m || q(g, g + 1, "right")
        }
        q = d.call(this, h, !0, !0);
        n.reversed = !0;
        l = d.call(this, n, !0, !0);
        (w = l[0]) && "M" ===
        w[0] && (l[0] = ["L", w[1], w[2]]);
        l = q.concat(l);
        l.length && l.push(["Z"]);
        d = d.call(this, h, !1, m);
        l.xMap = q.xMap;
        this.areaPath = l;
        return d
      }
      getStackPoints(a) {
        const d = this,
          m = [],
          k = [],
          r = this.xAxis,
          n = this.yAxis,
          h = n.stacking.stacks[this.stackKey],
          u = {},
          L = n.series,
          E = L.length,
          e = n.options.reversedStacks ? 1 : -1,
          q = L.indexOf(d);
        a = a || this.points;
        if (this.options.stacking) {
          for (let e = 0; e < a.length; e++) a[e].leftNull = a[e].rightNull = void 0, u[a[e].x] = a[e];
          B(h, function(a, e) {
            null !== a.total && k.push(e)
          });
          k.sort(function(a, e) {
            return a -
              e
          });
          const p = L.map(a => a.visible);
          k.forEach(function(a, w) {
            let g = 0,
              b, c;
            if (u[a] && !u[a].isNull) m.push(u[a]), [-1, 1].forEach(function(f) {
              const g = 1 === f ? "rightNull" : "leftNull",
                l = h[k[w + f]];
              let m = 0;
              if (l) {
                let f = q;
                for (; 0 <= f && f < E;) {
                  const k = L[f].index;
                  b = l.points[k];
                  b || (k === d.index ? u[a][g] = !0 : p[f] && (c = h[a].points[k]) && (m -= c[1] - c[0]));
                  f += e
                }
              }
              u[a][1 === f ? "rightCliff" : "leftCliff"] = m
            });
            else {
              let c = q;
              for (; 0 <= c && c < E;) {
                if (b = h[a].points[L[c].index]) {
                  g = b[1];
                  break
                }
                c += e
              }
              g = t(g, 0);
              g = n.translate(g, 0, 1, 0, 1);
              m.push({
                isNull: !0,
                plotX: r.translate(a,
                  0, 0, 0, 1),
                x: a,
                plotY: g,
                yBottom: g
              })
            }
          })
        }
        return m
      }
    }
    r.defaultOptions = C(F.defaultOptions, {
      threshold: 0,
      legendSymbol: "rectangle"
    });
    G(r.prototype, {
      singleStacks: !1
    });
    A.registerSeriesType("area", r);
    "";
    return r
  });
  M(a, "Series/Spline/SplineSeries.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A) {
    const {
      line: u
    } = a.seriesTypes, {
      merge: I,
      pick: F
    } = A;
    class G extends u {
      constructor() {
        super(...arguments);
        this.points = this.options = this.data = void 0
      }
      getPointSpline(a, u, t) {
        const r = u.plotX || 0,
          d = u.plotY ||
          0,
          p = a[t - 1];
        t = a[t + 1];
        let m, k;
        let v;
        if (p && !p.isNull && !1 !== p.doCurve && !u.isCliff && t && !t.isNull && !1 !== t.doCurve && !u.isCliff) {
          a = p.plotY || 0;
          var n = t.plotX || 0;
          t = t.plotY || 0;
          let h = 0;
          m = (1.5 * r + (p.plotX || 0)) / 2.5;
          k = (1.5 * d + a) / 2.5;
          n = (1.5 * r + n) / 2.5;
          v = (1.5 * d + t) / 2.5;
          n !== m && (h = (v - k) * (n - r) / (n - m) + d - v);
          k += h;
          v += h;
          k > a && k > d ? (k = Math.max(a, d), v = 2 * d - k) : k < a && k < d && (k = Math.min(a, d), v = 2 * d - k);
          v > t && v > d ? (v = Math.max(t, d), k = 2 * d - v) : v < t && v < d && (v = Math.min(t, d), k = 2 * d - v);
          u.rightContX = n;
          u.rightContY = v
        }
        u = ["C", F(p.rightContX, p.plotX, 0), F(p.rightContY,
          p.plotY, 0), F(m, r, 0), F(k, d, 0), r, d];
        p.rightContX = p.rightContY = void 0;
        return u
      }
    }
    G.defaultOptions = I(u.defaultOptions);
    a.registerSeriesType("spline", G);
    "";
    return G
  });
  M(a, "Series/AreaSpline/AreaSplineSeries.js", [a["Series/Spline/SplineSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      area: u,
      area: {
        prototype: F
      }
    } = A.seriesTypes, {
      extend: G,
      merge: C
    } = H;
    class B extends a {
      constructor() {
        super(...arguments);
        this.options = this.points = this.data = void 0
      }
    }
    B.defaultOptions = C(a.defaultOptions,
      u.defaultOptions);
    G(B.prototype, {
      getGraphPath: F.getGraphPath,
      getStackPoints: F.getStackPoints,
      drawGraph: F.drawGraph
    });
    A.registerSeriesType("areaspline", B);
    "";
    return B
  });
  M(a, "Series/Column/ColumnSeriesDefaults.js", [], function() {
    "";
    return {
      borderRadius: 3,
      centerInCategory: !1,
      groupPadding: .2,
      marker: null,
      pointPadding: .1,
      minPointLength: 0,
      cropThreshold: 50,
      pointRange: null,
      states: {
        hover: {
          halo: !1,
          brightness: .1
        },
        select: {
          color: "#cccccc",
          borderColor: "#000000"
        }
      },
      dataLabels: {
        align: void 0,
        verticalAlign: void 0,
        y: void 0
      },
      startFromThreshold: !0,
      stickyTracking: !1,
      tooltip: {
        distance: 6
      },
      threshold: 0,
      borderColor: "#ffffff"
    }
  });
  M(a, "Series/Column/ColumnSeries.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Color/Color.js"], a["Series/Column/ColumnSeriesDefaults.js"], a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A, H, I, F, G, C) {
    const {
      animObject: u
    } = a, {
      parse: t
    } = A, {
      hasTouch: r,
      noop: d
    } = I, {
      clamp: p,
      defined: m,
      extend: k,
      fireEvent: v,
      isArray: n,
      isNumber: h,
      merge: D,
      pick: L,
      objectEach: E
    } = C;
    class e extends F {
      constructor() {
        super(...arguments);
        this.points = this.options = this.group = this.data = this.borderWidth = void 0
      }
      animate(a) {
        const e = this,
          d = this.yAxis,
          h = d.pos,
          g = e.options,
          b = this.chart.inverted,
          c = {},
          f = b ? "translateX" : "translateY";
        let q;
        a ? (c.scaleY = .001, a = p(d.toPixels(g.threshold), h, h + d.len), b ? c.translateX = a - d.len : c.translateY = a, e.clipBox && e.setClip(), e.group.attr(c)) : (q = Number(e.group.attr(f)), e.group.animate({
          scaleY: 1
        }, k(u(e.options.animation), {
          step: function(b, a) {
            e.group &&
              (c[f] = q + a.pos * (h - q), e.group.attr(c))
          }
        })))
      }
      init(a, e) {
        super.init.apply(this, arguments);
        const d = this;
        a = d.chart;
        a.hasRendered && a.series.forEach(function(a) {
          a.type === d.type && (a.isDirty = !0)
        })
      }
      getColumnMetrics() {
        const a = this;
        var e = a.options;
        const d = a.xAxis,
          h = a.yAxis;
        var g = d.options.reversedStacks;
        g = d.reversed && !g || !d.reversed && g;
        const b = {};
        let c, f = 0;
        !1 === e.grouping ? f = 1 : a.chart.series.forEach(function(g) {
          const e = g.yAxis,
            d = g.options;
          let l;
          g.type !== a.type || !g.visible && a.chart.options.chart.ignoreHiddenSeries ||
            h.len !== e.len || h.pos !== e.pos || (d.stacking && "group" !== d.stacking ? (c = g.stackKey, "undefined" === typeof b[c] && (b[c] = f++), l = b[c]) : !1 !== d.grouping && (l = f++), g.columnIndex = l)
        });
        const k = Math.min(Math.abs(d.transA) * (d.ordinal && d.ordinal.slope || e.pointRange || d.closestPointRange || d.tickInterval || 1), d.len),
          m = k * e.groupPadding,
          n = (k - 2 * m) / (f || 1);
        e = Math.min(e.maxPointWidth || d.len, L(e.pointWidth, n * (1 - 2 * e.pointPadding)));
        a.columnMetrics = {
          width: e,
          offset: (n - e) / 2 + (m + ((a.columnIndex || 0) + (g ? 1 : 0)) * n - k / 2) * (g ? -1 : 1),
          paddedWidth: n,
          columnCount: f
        };
        return a.columnMetrics
      }
      crispCol(a, e, d, h) {
        var g = this.borderWidth,
          b = -(g % 2 ? .5 : 0);
        g = g % 2 ? .5 : 1;
        this.options.crisp && (d = Math.round(a + d) + b, a = Math.round(a) + b, d -= a);
        h = Math.round(e + h) + g;
        b = .5 >= Math.abs(e) && .5 < h;
        e = Math.round(e) + g;
        h -= e;
        b && h && (--e, h += 1);
        return {
          x: a,
          y: e,
          width: d,
          height: h
        }
      }
      adjustForMissingColumns(a, e, d, h) {
        const g = this.options.stacking;
        if (!d.isNull && 1 < h.columnCount) {
          const b = this.yAxis.options.reversedStacks;
          let c = 0,
            f = b ? 0 : -h.columnCount;
          E(this.yAxis.stacking && this.yAxis.stacking.stacks,
            a => {
              if ("number" === typeof d.x) {
                const e = a[d.x.toString()];
                e && (a = e.points[this.index], g ? (a && (c = f), e.hasValidPoints && (b ? f++ : f--)) : n(a) && (a = Object.keys(e.points).filter(b => !b.match(",") && e.points[b] && 1 < e.points[b].length).map(parseFloat).sort((b, a) => a - b), c = a.indexOf(this.index), f = a.length))
              }
            });
          a = (d.plotX || 0) + ((f - 1) * h.paddedWidth + e) / 2 - e - c * h.paddedWidth
        }
        return a
      }
      translate() {
        const a = this,
          e = a.chart,
          d = a.options;
        var k = a.dense = 2 > a.closestPointRange * a.xAxis.transA;
        k = a.borderWidth = L(d.borderWidth, k ? 0 : 1);
        const g =
          a.xAxis,
          b = a.yAxis,
          c = d.threshold,
          f = L(d.minPointLength, 5),
          n = a.getColumnMetrics(),
          r = n.width,
          z = a.pointXOffset = n.offset,
          u = a.dataMin,
          t = a.dataMax;
        let D = a.barW = Math.max(r, 1 + 2 * k),
          E = a.translatedThreshold = b.getThreshold(c);
        e.inverted && (E -= .5);
        d.pointPadding && (D = Math.ceil(D));
        F.prototype.translate.apply(a);
        a.points.forEach(function(l) {
          const k = L(l.yBottom, E);
          var q = 999 + Math.abs(k),
            x = l.plotX || 0;
          q = p(l.plotY, -q, b.len + q);
          let w = Math.min(q, k),
            y = Math.max(q, k) - w,
            J = r,
            v = x + z,
            N = D;
          f && Math.abs(y) < f && (y = f, x = !b.reversed && !l.negative ||
            b.reversed && l.negative, h(c) && h(t) && l.y === c && t <= c && (b.min || 0) < c && (u !== t || (b.max || 0) <= c) && (x = !x), w = Math.abs(w - E) > f ? k - f : E - (x ? f : 0));
          m(l.options.pointWidth) && (J = N = Math.ceil(l.options.pointWidth), v -= Math.round((J - r) / 2));
          d.centerInCategory && (v = a.adjustForMissingColumns(v, J, l, n));
          l.barX = v;
          l.pointWidth = J;
          l.tooltipPos = e.inverted ? [p(b.len + b.pos - e.plotLeft - q, b.pos - e.plotLeft, b.len + b.pos - e.plotLeft), g.len + g.pos - e.plotTop - v - N / 2, y] : [g.left - e.plotLeft + v + N / 2, p(q + b.pos - e.plotTop, b.pos - e.plotTop, b.len + b.pos - e.plotTop),
            y
          ];
          l.shapeType = a.pointClass.prototype.shapeType || "roundedRect";
          l.shapeArgs = a.crispCol(v, l.isNull ? E : w, N, l.isNull ? 0 : y)
        });
        v(this, "afterColumnTranslate")
      }
      drawGraph() {
        this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
      }
      pointAttribs(a, e) {
        const d = this.options;
        var h = this.pointAttrToOptions || {},
          g = h.stroke || "borderColor";
        const b = h["stroke-width"] || "borderWidth";
        let c, f = a && a.color || this.color,
          k = a && a[g] || d[g] || f;
        h = a && a.options.dashStyle || d.dashStyle;
        let m = a && a[b] || d[b] || this[b] || 0,
          q = L(a &&
            a.opacity, d.opacity, 1);
        a && this.zones.length && (c = a.getZone(), f = a.options.color || c && (c.color || a.nonZonedColor) || this.color, c && (k = c.borderColor || k, h = c.dashStyle || h, m = c.borderWidth || m));
        e && a && (a = D(d.states[e], a.options.states && a.options.states[e] || {}), e = a.brightness, f = a.color || "undefined" !== typeof e && t(f).brighten(a.brightness).get() || f, k = a[g] || k, m = a[b] || m, h = a.dashStyle || h, q = L(a.opacity, q));
        g = {
          fill: f,
          stroke: k,
          "stroke-width": m,
          opacity: q
        };
        h && (g.dashstyle = h);
        return g
      }
      drawPoints(a = this.points) {
        const e = this,
          d = this.chart,
          k = e.options,
          g = d.renderer,
          b = k.animationLimit || 250;
        let c;
        a.forEach(function(a) {
          let f = a.graphic,
            l = !!f,
            m = f && d.pointCount < b ? "animate" : "attr";
          if (h(a.plotY) && null !== a.y) {
            c = a.shapeArgs;
            f && a.hasNewShapeType() && (f = f.destroy());
            e.enabledDataSorting && (a.startXPos = e.xAxis.reversed ? -(c ? c.width || 0 : 0) : e.xAxis.width);
            f || (a.graphic = f = g[a.shapeType](c).add(a.group || e.group)) && e.enabledDataSorting && d.hasRendered && d.pointCount < b && (f.attr({
              x: a.startXPos
            }), l = !0, m = "animate");
            if (f && l) f[m](D(c));
            d.styledMode ||
              f[m](e.pointAttribs(a, a.selected && "select")).shadow(!1 !== a.allowShadow && k.shadow);
            f && (f.addClass(a.getClassName(), !0), f.attr({
              visibility: a.visible ? "inherit" : "hidden"
            }))
          } else f && (a.graphic = f.destroy())
        })
      }
      drawTracker(a = this.points) {
        const e = this,
          d = e.chart,
          h = d.pointer,
          g = function(b) {
            const a = h.getPointFromEvent(b);
            "undefined" !== typeof a && (h.isDirectTouch = !0, a.onMouseOver(b))
          };
        let b;
        a.forEach(function(a) {
          b = n(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
          a.graphic && (a.graphic.element.point = a);
          b.forEach(function(b) {
            b.div ?
              b.div.point = a : b.element.point = a
          })
        });
        e._hasTracking || (e.trackerGroups.forEach(function(b) {
          if (e[b]) {
            e[b].addClass("highcharts-tracker").on("mouseover", g).on("mouseout", function(b) {
              h.onTrackerMouseOut(b)
            });
            if (r) e[b].on("touchstart", g);
            !d.styledMode && e.options.cursor && e[b].css({
              cursor: e.options.cursor
            })
          }
        }), e._hasTracking = !0);
        v(this, "afterDrawTracker")
      }
      remove() {
        const a = this,
          e = a.chart;
        e.hasRendered && e.series.forEach(function(e) {
          e.type === a.type && (e.isDirty = !0)
        });
        F.prototype.remove.apply(a, arguments)
      }
    }
    e.defaultOptions =
      D(F.defaultOptions, H);
    k(e.prototype, {
      cropShoulder: 0,
      directTouch: !0,
      getSymbol: d,
      negStacks: !0,
      trackerGroups: ["group", "dataLabelsGroup"]
    });
    G.registerSeriesType("column", e);
    "";
    return e
  });
  M(a, "Core/Series/DataLabel.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/FormatUtilities.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      getDeferredAnimation: u
    } = a, {
      format: F
    } = A, {
      defined: G,
      extend: C,
      fireEvent: B,
      isArray: t,
      isString: r,
      merge: d,
      objectEach: p,
      pick: m,
      splat: k
    } = H;
    var v;
    (function(a) {
      function h(a, b, c, f,
        e) {
        const g = this.chart;
        var d = this.isCartesian && g.inverted;
        const l = this.enabledDataSorting;
        var h = a.plotX,
          k = a.plotY;
        const q = c.rotation;
        var n = c.align;
        k = G(h) && G(k) && g.isInsidePlot(h, Math.round(k), {
          inverted: d,
          paneCoordinates: !0,
          series: this
        });
        let x = "justify" === m(c.overflow, l ? "none" : "justify");
        d = this.visible && !1 !== a.visible && G(h) && (a.series.forceDL || l && !x || k || m(c.inside, !!this.options.stacking) && f && g.isInsidePlot(h, d ? f.x + 1 : f.y + f.height - 1, {
          inverted: d,
          paneCoordinates: !0,
          series: this
        }));
        h = a.pos();
        if (d && h) {
          q &&
            b.attr({
              align: n
            });
          n = b.getBBox(!0);
          var w = [0, 0];
          var p = g.renderer.fontMetrics(b).b;
          f = C({
            x: h[0],
            y: Math.round(h[1]),
            width: 0,
            height: 0
          }, f);
          C(c, {
            width: n.width,
            height: n.height
          });
          q ? (x = !1, w = g.renderer.rotCorr(p, q), p = {
            x: f.x + (c.x || 0) + f.width / 2 + w.x,
            y: f.y + (c.y || 0) + {
              top: 0,
              middle: .5,
              bottom: 1
            } [c.verticalAlign] * f.height
          }, w = [n.x - Number(b.attr("x")), n.y - Number(b.attr("y"))], l && this.xAxis && !x && this.setDataLabelStartPos(a, b, e, k, p), b[e ? "attr" : "animate"](p)) : (l && this.xAxis && !x && this.setDataLabelStartPos(a, b, e, k, f), b.align(c,
            void 0, f), p = b.alignAttr);
          if (x && 0 <= f.height) this.justifyDataLabel(b, c, p, n, f, e);
          else if (m(c.crop, !0)) {
            let {
              x: b,
              y: a
            } = p;
            b += w[0];
            a += w[1];
            d = g.isInsidePlot(b, a, {
              paneCoordinates: !0,
              series: this
            }) && g.isInsidePlot(b + n.width, a + n.height, {
              paneCoordinates: !0,
              series: this
            })
          }
          if (c.shape && !q) b[e ? "attr" : "animate"]({
            anchorX: h[0],
            anchorY: h[1]
          })
        }
        e && l && (b.placed = !1);
        d || l && !x ? b.show() : (b.hide(), b.placed = !1)
      }

      function n(a, b) {
        var c = b.filter;
        return c ? (b = c.operator, a = a[c.property], c = c.value, ">" === b && a > c || "<" === b && a < c || ">=" === b &&
          a >= c || "<=" === b && a <= c || "==" === b && a == c || "===" === b && a === c ? !0 : !1) : !0
      }

      function v() {
        return this.plotGroup("dataLabelsGroup", "data-labels", this.hasRendered ? "inherit" : "hidden", this.options.dataLabels.zIndex || 6)
      }

      function E(a) {
        const b = this.hasRendered || 0,
          c = this.initDataLabelsGroup().attr({
            opacity: +b
          });
        !b && c && (this.visible && c.show(), this.options.animation ? c.animate({
          opacity: 1
        }, a) : c.attr({
          opacity: 1
        }));
        return c
      }

      function e(a = this.points) {
        const b = this,
          c = b.chart,
          f = b.options,
          g = c.renderer,
          {
            backgroundColor: e,
            plotBackgroundColor: d
          } =
          c.options.chart,
          l = g.getContrast(r(d) && d || r(e) && e || "#000000");
        let h = f.dataLabels,
          q, w;
        var v = k(h)[0];
        const D = v.animation;
        v = v.defer ? u(c, D, b) : {
          defer: 0,
          duration: 0
        };
        h = y(y(c.options.plotOptions && c.options.plotOptions.series && c.options.plotOptions.series.dataLabels, c.options.plotOptions && c.options.plotOptions[b.type] && c.options.plotOptions[b.type].dataLabels), h);
        B(this, "drawDataLabels");
        if (t(h) || h.enabled || b._hasPointLabels) w = this.initDataLabels(v), a.forEach(a => {
          q = k(y(h, a.dlOptions || a.options && a.options.dataLabels));
          q.forEach((e, d) => {
            const h = e.enabled && (!a.isNull || a.dataLabelOnNull) && n(a, e),
              k = a.connectors ? a.connectors[d] : a.connector;
            let q, x, r = a.dataLabels ? a.dataLabels[d] : a.dataLabel,
              z = !r;
            const y = m(e.distance, a.labelDistance);
            if (h) {
              var v = a.getLabelConfig();
              var u = m(e[a.formatPrefix + "Format"], e.format);
              v = G(u) ? F(u, v, c) : (e[a.formatPrefix + "Formatter"] || e.formatter).call(v, e);
              u = e.style;
              q = e.rotation;
              c.styledMode || (u.color = m(e.color, u.color, b.color, "#000000"), "contrast" === u.color ? (a.contrastColor = g.getContrast(a.color ||
                b.color), u.color = !G(y) && e.inside || 0 > y || f.stacking ? a.contrastColor : l) : delete a.contrastColor, f.cursor && (u.cursor = f.cursor));
              x = {
                r: e.borderRadius || 0,
                rotation: q,
                padding: e.padding,
                zIndex: 1
              };
              if (!c.styledMode) {
                const {
                  backgroundColor: b,
                  borderColor: c
                } = e;
                x.fill = "auto" === b ? a.color : b;
                x.stroke = "auto" === c ? a.color : c;
                x["stroke-width"] = e.borderWidth
              }
              p(x, function(b, a) {
                "undefined" === typeof b && delete x[a]
              })
            }!r || h && G(v) && !!r.div === !!e.useHTML && (r.rotation && e.rotation || r.rotation === e.rotation) || (z = !0, a.dataLabel = r = a.dataLabel &&
              a.dataLabel.destroy(), a.dataLabels && (1 === a.dataLabels.length ? delete a.dataLabels : delete a.dataLabels[d]), d || delete a.dataLabel, k && (a.connector = a.connector.destroy(), a.connectors && (1 === a.connectors.length ? delete a.connectors : delete a.connectors[d])));
            h && G(v) ? (r ? x.text = v : (a.dataLabels = a.dataLabels || [], r = a.dataLabels[d] = q ? g.text(v, 0, 0, e.useHTML).addClass("highcharts-data-label") : g.label(v, 0, 0, e.shape, null, null, e.useHTML, null, "data-label"), d || (a.dataLabel = r), r.addClass(" highcharts-data-label-color-" +
              a.colorIndex + " " + (e.className || "") + (e.useHTML ? " highcharts-tracker" : ""))), r.options = e, r.attr(x), c.styledMode || r.css(u).shadow(e.shadow), (d = e[a.formatPrefix + "TextPath"] || e.textPath) && !e.useHTML && (r.setTextPath(a.getDataLabelPath && a.getDataLabelPath(r) || a.graphic, d), a.dataLabelPath && !d.enabled && (a.dataLabelPath = a.dataLabelPath.destroy())), r.added || r.add(w), b.alignDataLabel(a, r, e, null, z)) : r && r.hide()
          })
        });
        B(this, "afterDrawDataLabels")
      }

      function q(a, b, c, f, e, d) {
        const g = this.chart,
          l = b.align,
          h = b.verticalAlign,
          k = a.box ? 0 : a.padding || 0;
        let {
          x: m = 0,
          y: q = 0
        } = b, n, x;
        n = (c.x || 0) + k;
        0 > n && ("right" === l && 0 <= m ? (b.align = "left", b.inside = !0) : m -= n, x = !0);
        n = (c.x || 0) + f.width - k;
        n > g.plotWidth && ("left" === l && 0 >= m ? (b.align = "right", b.inside = !0) : m += g.plotWidth - n, x = !0);
        n = c.y + k;
        0 > n && ("bottom" === h && 0 <= q ? (b.verticalAlign = "top", b.inside = !0) : q -= n, x = !0);
        n = (c.y || 0) + f.height - k;
        n > g.plotHeight && ("top" === h && 0 >= q ? (b.verticalAlign = "bottom", b.inside = !0) : q += g.plotHeight - n, x = !0);
        x && (b.x = m, b.y = q, a.placed = !d, a.align(b, void 0, e));
        return x
      }

      function y(a, b) {
        let c = [],
          f;
        if (t(a) && !t(b)) c = a.map(function(a) {
          return d(a, b)
        });
        else if (t(b) && !t(a)) c = b.map(function(b) {
          return d(a, b)
        });
        else if (t(a) || t(b))
          for (f = Math.max(a.length, b.length); f--;) c[f] = d(a[f], b[f]);
        else c = d(a, b);
        return c
      }

      function l(a, b, c, f, e) {
        const g = this.chart,
          d = g.inverted,
          l = this.xAxis,
          h = l.reversed,
          k = d ? b.height / 2 : b.width / 2;
        a = (a = a.pointWidth) ? a / 2 : 0;
        b.startXPos = d ? e.x : h ? -k - a : l.width - k + a;
        b.startYPos = d ? h ? this.yAxis.height - k + a : -k - a : e.y;
        f ? "hidden" === b.visibility && (b.show(), b.attr({
            opacity: 0
          }).animate({
            opacity: 1
          })) :
          b.attr({
            opacity: 1
          }).animate({
            opacity: 0
          }, void 0, b.hide);
        g.hasRendered && (c && b.attr({
          x: b.startXPos,
          y: b.startYPos
        }), b.placed = !0)
      }
      const w = [];
      a.compose = function(a) {
        H.pushUnique(w, a) && (a = a.prototype, a.initDataLabelsGroup = v, a.initDataLabels = E, a.alignDataLabel = h, a.drawDataLabels = e, a.justifyDataLabel = q, a.setDataLabelStartPos = l)
      }
    })(v || (v = {}));
    "";
    return v
  });
  M(a, "Series/Column/ColumnDataLabel.js", [a["Core/Series/DataLabel.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      series: u
    } =
    A, {
      merge: F,
      pick: G
    } = H;
    var C;
    (function(B) {
      function t(a, p, m, k, r) {
        let d = this.chart.inverted;
        var h = a.series;
        let v = (h.xAxis ? h.xAxis.len : this.chart.plotSizeX) || 0;
        h = (h.yAxis ? h.yAxis.len : this.chart.plotSizeY) || 0;
        var t = a.dlBox || a.shapeArgs;
        let E = G(a.below, a.plotY > G(this.translatedThreshold, h)),
          e = G(m.inside, !!this.options.stacking);
        t && (k = F(t), 0 > k.y && (k.height += k.y, k.y = 0), t = k.y + k.height - h, 0 < t && t < k.height && (k.height -= t), d && (k = {
          x: h - k.y - k.height,
          y: v - k.x - k.width,
          width: k.height,
          height: k.width
        }), e || (d ? (k.x += E ? 0 : k.width,
          k.width = 0) : (k.y += E ? k.height : 0, k.height = 0)));
        m.align = G(m.align, !d || e ? "center" : E ? "right" : "left");
        m.verticalAlign = G(m.verticalAlign, d || e ? "middle" : E ? "top" : "bottom");
        u.prototype.alignDataLabel.call(this, a, p, m, k, r);
        m.inside && a.contrastColor && p.css({
          color: a.contrastColor
        })
      }
      const r = [];
      B.compose = function(d) {
        a.compose(u);
        H.pushUnique(r, d) && (d.prototype.alignDataLabel = t)
      }
    })(C || (C = {}));
    return C
  });
  M(a, "Series/Bar/BarSeries.js", [a["Series/Column/ColumnSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function(a, A, H) {
      const {
        extend: u,
        merge: F
      } = H;
      class G extends a {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0
        }
      }
      G.defaultOptions = F(a.defaultOptions, {});
      u(G.prototype, {
        inverted: !0
      });
      A.registerSeriesType("bar", G);
      "";
      return G
    });
  M(a, "Series/Scatter/ScatterSeriesDefaults.js", [], function() {
    "";
    return {
      lineWidth: 0,
      findNearestPointBy: "xy",
      jitter: {
        x: 0,
        y: 0
      },
      marker: {
        enabled: !0
      },
      tooltip: {
        headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 0.8em"> {series.name}</span><br/>',
        pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
      }
    }
  });
  M(a, "Series/Scatter/ScatterSeries.js", [a["Series/Scatter/ScatterSeriesDefaults.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      column: u,
      line: F
    } = A.seriesTypes, {
      addEvent: G,
      extend: C,
      merge: B
    } = H;
    class t extends F {
      constructor() {
        super(...arguments);
        this.points = this.options = this.data = void 0
      }
      applyJitter() {
        const a = this,
          d = this.options.jitter,
          p = this.points.length;
        d && this.points.forEach(function(m, k) {
          ["x",
            "y"
          ].forEach(function(r, n) {
            let h = "plot" + r.toUpperCase(),
              v, u;
            if (d[r] && !m.isNull) {
              var t = a[r + "Axis"];
              u = d[r] * t.transA;
              t && !t.isLog && (v = Math.max(0, m[h] - u), t = Math.min(t.len, m[h] + u), n = 1E4 * Math.sin(k + n * p), n -= Math.floor(n), m[h] = v + (t - v) * n, "x" === r && (m.clientX = m.plotX))
            }
          })
        })
      }
      drawGraph() {
        this.options.lineWidth ? super.drawGraph() : this.graph && (this.graph = this.graph.destroy())
      }
    }
    t.defaultOptions = B(F.defaultOptions, a);
    C(t.prototype, {
      drawTracker: u.prototype.drawTracker,
      sorted: !1,
      requireSorting: !1,
      noSharedTooltip: !0,
      trackerGroups: ["group",
        "markerGroup", "dataLabelsGroup"
      ],
      takeOrdinalPosition: !1
    });
    G(t, "afterTranslate", function() {
      this.applyJitter()
    });
    A.registerSeriesType("scatter", t);
    return t
  });
  M(a, "Series/CenteredUtilities.js", [a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      deg2rad: u
    } = a, {
      fireEvent: F,
      isNumber: G,
      pick: C,
      relativeLength: B
    } = H;
    var t;
    (function(a) {
      a.getCenter = function() {
        var a = this.options,
          p = this.chart;
        const m = 2 * (a.slicedOffset || 0),
          k = p.plotWidth - 2 * m,
          r = p.plotHeight - 2 * m;
        var n = a.center;
        const h = Math.min(k, r),
          u = a.thickness;
        var t = a.size;
        let E = a.innerSize || 0;
        "string" === typeof t && (t = parseFloat(t));
        "string" === typeof E && (E = parseFloat(E));
        a = [C(n[0], "50%"), C(n[1], "50%"), C(t && 0 > t ? void 0 : a.size, "100%"), C(E && 0 > E ? void 0 : a.innerSize || 0, "0%")];
        !p.angular || this instanceof A || (a[3] = 0);
        for (n = 0; 4 > n; ++n) t = a[n], p = 2 > n || 2 === n && /%$/.test(t), a[n] = B(t, [k, r, h, a[2]][n]) + (p ? m : 0);
        a[3] > a[2] && (a[3] = a[2]);
        G(u) && 2 * u < a[2] && 0 < u && (a[3] = a[2] - 2 * u);
        F(this, "afterGetCenter", {
          positions: a
        });
        return a
      };
      a.getStartAndEndRadians =
        function(a, p) {
          a = G(a) ? a : 0;
          p = G(p) && p > a && 360 > p - a ? p : a + 360;
          return {
            start: u * (a + -90),
            end: u * (p + -90)
          }
        }
    })(t || (t = {}));
    "";
    return t
  });
  M(a, "Series/Pie/PiePoint.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      setAnimation: u
    } = a, {
      addEvent: F,
      defined: G,
      extend: C,
      isNumber: B,
      pick: t,
      relativeLength: r
    } = H;
    class d extends A {
      constructor() {
        super(...arguments);
        this.series = this.options = this.labelDistance = void 0
      }
      getConnectorPath() {
        const a = this.labelPosition,
          d = this.series.options.dataLabels,
          k = this.connectorShapes;
        let r = d.connectorShape;
        k[r] && (r = k[r]);
        return r.call(this, {
          x: a.computed.x,
          y: a.computed.y,
          alignment: a.alignment
        }, a.connectorPosition, d)
      }
      getTranslate() {
        return this.sliced ? this.slicedTranslation : {
          translateX: 0,
          translateY: 0
        }
      }
      haloPath(a) {
        const d = this.shapeArgs;
        return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(d.x, d.y, d.r + a, d.r + a, {
          innerR: d.r - 1,
          start: d.start,
          end: d.end,
          borderRadius: d.borderRadius
        })
      }
      init() {
        super.init.apply(this,
          arguments);
        this.name = t(this.name, "Slice");
        const a = a => {
          this.slice("select" === a.type)
        };
        F(this, "select", a);
        F(this, "unselect", a);
        return this
      }
      isValid() {
        return B(this.y) && 0 <= this.y
      }
      setVisible(a, d) {
        const k = this.series,
          m = k.chart,
          n = k.options.ignoreHiddenPoint;
        d = t(d, n);
        a !== this.visible && (this.visible = this.options.visible = a = "undefined" === typeof a ? !this.visible : a, k.options.data[k.data.indexOf(this)] = this.options, ["graphic", "dataLabel", "connector"].forEach(d => {
            if (this[d]) this[d][a ? "show" : "hide"](a)
          }), this.legendItem &&
          m.legend.colorizeItem(this, a), a || "hover" !== this.state || this.setState(""), n && (k.isDirty = !0), d && m.redraw())
      }
      slice(a, d, k) {
        const m = this.series;
        u(k, m.chart);
        t(d, !0);
        this.sliced = this.options.sliced = G(a) ? a : !this.sliced;
        m.options.data[m.data.indexOf(this)] = this.options;
        this.graphic && this.graphic.animate(this.getTranslate())
      }
    }
    C(d.prototype, {
      connectorShapes: {
        fixedOffset: function(a, d, k) {
          const m = d.breakAt;
          d = d.touchingSliceAt;
          return [
            ["M", a.x, a.y], k.softConnector ? ["C", a.x + ("left" === a.alignment ? -5 : 5), a.y, 2 * m.x -
              d.x, 2 * m.y - d.y, m.x, m.y
            ] : ["L", m.x, m.y],
            ["L", d.x, d.y]
          ]
        },
        straight: function(a, d) {
          d = d.touchingSliceAt;
          return [
            ["M", a.x, a.y],
            ["L", d.x, d.y]
          ]
        },
        crookedLine: function(a, d, k) {
          const {
            breakAt: m,
            touchingSliceAt: n
          } = d;
          ({
            series: d
          } = this);
          const [h, p, u] = d.center, t = u / 2, e = d.chart.plotWidth, q = d.chart.plotLeft;
          d = "left" === a.alignment;
          const {
            x: y,
            y: l
          } = a;
          k.crookDistance ? (a = r(k.crookDistance, 1), a = d ? h + t + (e + q - h - t) * (1 - a) : q + (h - t) * a) : a = h + (p - l) * Math.tan((this.angle || 0) - Math.PI / 2);
          k = [
            ["M", y, l]
          ];
          (d ? a <= y && a >= m.x : a >= y && a <= m.x) && k.push(["L",
            a, l
          ]);
          k.push(["L", m.x, m.y], ["L", n.x, n.y]);
          return k
        }
      }
    });
    return d
  });
  M(a, "Series/Pie/PieSeriesDefaults.js", [], function() {
    "";
    return {
      borderRadius: 3,
      center: [null, null],
      clip: !1,
      colorByPoint: !0,
      dataLabels: {
        allowOverlap: !0,
        connectorPadding: 5,
        connectorShape: "crookedLine",
        crookDistance: void 0,
        distance: 30,
        enabled: !0,
        formatter: function() {
          return this.point.isNull ? void 0 : this.point.name
        },
        softConnector: !0,
        x: 0
      },
      fillColor: void 0,
      ignoreHiddenPoint: !0,
      inactiveOtherPoints: !0,
      legendType: "point",
      marker: null,
      size: null,
      showInLegend: !1,
      slicedOffset: 10,
      stickyTracking: !1,
      tooltip: {
        followPointer: !0
      },
      borderColor: "#ffffff",
      borderWidth: 1,
      lineWidth: void 0,
      states: {
        hover: {
          brightness: .1
        }
      }
    }
  });
  M(a, "Series/Pie/PieSeries.js", [a["Series/CenteredUtilities.js"], a["Series/Column/ColumnSeries.js"], a["Core/Globals.js"], a["Series/Pie/PiePoint.js"], a["Series/Pie/PieSeriesDefaults.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/Symbols.js"], a["Core/Utilities.js"]], function(a, A, H, I, F, G, C, B, t) {
    const {
      getStartAndEndRadians: r
    } =
    a;
    ({
      noop: H
    } = H);
    const {
      clamp: d,
      extend: p,
      fireEvent: m,
      merge: k,
      pick: u,
      relativeLength: n
    } = t;
    class h extends G {
      constructor() {
        super(...arguments);
        this.points = this.options = this.maxLabelDistance = this.data = this.center = void 0
      }
      animate(a) {
        const d = this,
          h = d.points,
          e = d.startAngleRad;
        a || h.forEach(function(a) {
          const h = a.graphic,
            l = a.shapeArgs;
          h && l && (h.attr({
            r: u(a.startR, d.center && d.center[3] / 2),
            start: e,
            end: e
          }), h.animate({
            r: l.r,
            start: l.start,
            end: l.end
          }, d.options.animation))
        })
      }
      drawEmpty() {
        const a = this.startAngleRad,
          d = this.endAngleRad,
          h = this.options;
        let e, k;
        0 === this.total && this.center ? (e = this.center[0], k = this.center[1], this.graph || (this.graph = this.chart.renderer.arc(e, k, this.center[1] / 2, 0, a, d).addClass("highcharts-empty-series").add(this.group)), this.graph.attr({
          d: B.arc(e, k, this.center[2] / 2, 0, {
            start: a,
            end: d,
            innerR: this.center[3] / 2
          })
        }), this.chart.styledMode || this.graph.attr({
          "stroke-width": h.borderWidth,
          fill: h.fillColor || "none",
          stroke: h.color || "#cccccc"
        })) : this.graph && (this.graph = this.graph.destroy())
      }
      drawPoints() {
        const a = this.chart.renderer;
        this.points.forEach(function(d) {
          d.graphic && d.hasNewShapeType() && (d.graphic = d.graphic.destroy());
          d.graphic || (d.graphic = a[d.shapeType](d.shapeArgs).add(d.series.group), d.delayedRendering = !0)
        })
      }
      generatePoints() {
        super.generatePoints();
        this.updateTotals()
      }
      getX(a, h, k) {
        const e = this.center,
          n = this.radii ? this.radii[k.index] || 0 : e[2] / 2;
        a = Math.asin(d((a - e[1]) / (n + k.labelDistance), -1, 1));
        return e[0] + (h ? -1 : 1) * Math.cos(a) * (n + k.labelDistance) + (0 < k.labelDistance ? (h ? -1 : 1) * this.options.dataLabels.padding : 0)
      }
      hasData() {
        return !!this.processedXData.length
      }
      redrawPoints() {
        const a =
          this,
          d = a.chart;
        let h, e, n, m;
        this.drawEmpty();
        a.group && !d.styledMode && a.group.shadow(a.options.shadow);
        a.points.forEach(function(l) {
          const q = {};
          e = l.graphic;
          !l.isNull && e ? (m = l.shapeArgs, h = l.getTranslate(), d.styledMode || (n = a.pointAttribs(l, l.selected && "select")), l.delayedRendering ? (e.setRadialReference(a.center).attr(m).attr(h), d.styledMode || e.attr(n).attr({
            "stroke-linejoin": "round"
          }), l.delayedRendering = !1) : (e.setRadialReference(a.center), d.styledMode || k(!0, q, n), k(!0, q, m, h), e.animate(q)), e.attr({
            visibility: l.visible ?
              "inherit" : "hidden"
          }), e.addClass(l.getClassName(), !0)) : e && (l.graphic = e.destroy())
        })
      }
      sortByAngle(a, d) {
        a.sort(function(a, e) {
          return "undefined" !== typeof a.angle && (e.angle - a.angle) * d
        })
      }
      translate(a) {
        m(this, "translate");
        this.generatePoints();
        var d = this.options;
        const h = d.slicedOffset,
          e = h + (d.borderWidth || 0);
        var k = r(d.startAngle, d.endAngle);
        const p = this.startAngleRad = k.start;
        k = (this.endAngleRad = k.end) - p;
        const l = this.points,
          w = d.dataLabels.distance;
        d = d.ignoreHiddenPoint;
        const g = l.length;
        let b, c, f, x = 0;
        a || (this.center =
          a = this.getCenter());
        for (c = 0; c < g; c++) {
          f = l[c];
          var v = p + x * k;
          !f.isValid() || d && !f.visible || (x += f.percentage / 100);
          var z = p + x * k;
          var t = {
            x: a[0],
            y: a[1],
            r: a[2] / 2,
            innerR: a[3] / 2,
            start: Math.round(1E3 * v) / 1E3,
            end: Math.round(1E3 * z) / 1E3
          };
          f.shapeType = "arc";
          f.shapeArgs = t;
          f.labelDistance = u(f.options.dataLabels && f.options.dataLabels.distance, w);
          f.labelDistance = n(f.labelDistance, t.r);
          this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, f.labelDistance);
          z = (z + v) / 2;
          z > 1.5 * Math.PI ? z -= 2 * Math.PI : z < -Math.PI / 2 && (z += 2 * Math.PI);
          f.slicedTranslation = {
            translateX: Math.round(Math.cos(z) * h),
            translateY: Math.round(Math.sin(z) * h)
          };
          t = Math.cos(z) * a[2] / 2;
          b = Math.sin(z) * a[2] / 2;
          f.tooltipPos = [a[0] + .7 * t, a[1] + .7 * b];
          f.half = z < -Math.PI / 2 || z > Math.PI / 2 ? 1 : 0;
          f.angle = z;
          v = Math.min(e, f.labelDistance / 5);
          f.labelPosition = {
            natural: {
              x: a[0] + t + Math.cos(z) * f.labelDistance,
              y: a[1] + b + Math.sin(z) * f.labelDistance
            },
            computed: {},
            alignment: 0 > f.labelDistance ? "center" : f.half ? "right" : "left",
            connectorPosition: {
              breakAt: {
                x: a[0] + t + Math.cos(z) * v,
                y: a[1] + b + Math.sin(z) * v
              },
              touchingSliceAt: {
                x: a[0] +
                  t,
                y: a[1] + b
              }
            }
          }
        }
        m(this, "afterTranslate")
      }
      updateTotals() {
        const a = this.points,
          d = a.length,
          h = this.options.ignoreHiddenPoint;
        let e, k, n = 0;
        for (e = 0; e < d; e++) k = a[e], !k.isValid() || h && !k.visible || (n += k.y);
        this.total = n;
        for (e = 0; e < d; e++) k = a[e], k.percentage = 0 < n && (k.visible || !h) ? k.y / n * 100 : 0, k.total = n
      }
    }
    h.defaultOptions = k(G.defaultOptions, F);
    p(h.prototype, {
      axisTypes: [],
      directTouch: !0,
      drawGraph: void 0,
      drawTracker: A.prototype.drawTracker,
      getCenter: a.getCenter,
      getSymbol: H,
      isCartesian: !1,
      noSharedTooltip: !0,
      pointAttribs: A.prototype.pointAttribs,
      pointClass: I,
      requireSorting: !1,
      searchPoint: H,
      trackerGroups: ["group", "dataLabelsGroup"]
    });
    C.registerSeriesType("pie", h);
    return h
  });
  M(a, "Series/Pie/PieDataLabel.js", [a["Core/Series/DataLabel.js"], a["Core/Globals.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A, H, I, F) {
    const {
      noop: u
    } = A, {
      distribute: C
    } = H, {
      series: B
    } = I, {
      arrayMax: t,
      clamp: r,
      defined: d,
      merge: p,
      pick: m,
      relativeLength: k
    } = F;
    var v;
    (function(n) {
      function h() {
        const a = this,
          e = a.data,
          l =
          a.chart,
          h = a.options.dataLabels || {},
          g = h.connectorPadding,
          b = l.plotWidth,
          c = l.plotHeight,
          f = l.plotLeft,
          k = Math.round(l.chartWidth / 3),
          n = a.center,
          r = n[2] / 2,
          u = n[1],
          v = [
            [],
            []
          ],
          D = [0, 0, 0, 0],
          E = a.dataLabelPositioners;
        let O, A, F, L, K, G, H, I, M, X, U, Z;
        a.visible && (h.enabled || a._hasPointLabels) && (e.forEach(function(a) {
          a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
            width: "auto"
          }).css({
            width: "auto",
            textOverflow: "clip"
          }), a.dataLabel.shortened = !1)
        }), B.prototype.drawDataLabels.apply(a), e.forEach(function(a) {
          a.dataLabel &&
            (a.visible ? (v[a.half].push(a), a.dataLabel._pos = null, !d(h.style.width) && !d(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > k && (a.dataLabel.css({
              width: Math.round(.7 * k) + "px"
            }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
        }), v.forEach((e, k) => {
          const q = e.length,
            x = [];
          let w, p = 0;
          if (q) {
            a.sortByAngle(e, k - .5);
            if (0 < a.maxLabelDistance) {
              var z = Math.max(0, u - r - a.maxLabelDistance);
              w = Math.min(u + r + a.maxLabelDistance, l.plotHeight);
              e.forEach(function(a) {
                0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, u - r - a.labelDistance), a.bottom = Math.min(u + r + a.labelDistance, l.plotHeight), p = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                  target: a.labelPosition.natural.y - a.top + p / 2,
                  size: p,
                  rank: a.y
                }, x.push(a.distributeBox))
              });
              z = w + p - z;
              C(x, z, z / 5)
            }
            for (U = 0; U < q; U++) {
              O = e[U];
              G = O.labelPosition;
              L = O.dataLabel;
              X = !1 === O.visible ? "hidden" : "inherit";
              M = z = G.natural.y;
              x && d(O.distributeBox) && ("undefined" === typeof O.distributeBox.pos ?
                X = "hidden" : (H = O.distributeBox.size, M = E.radialDistributionY(O)));
              delete O.positionIndex;
              if (h.justify) I = E.justify(O, r, n);
              else switch (h.alignTo) {
                case "connectors":
                  I = E.alignToConnectors(e, k, b, f);
                  break;
                case "plotEdges":
                  I = E.alignToPlotEdges(L, k, b, f);
                  break;
                default:
                  I = E.radialDistributionX(a, O, M, z)
              }
              L._attr = {
                visibility: X,
                align: G.alignment
              };
              Z = O.options.dataLabels || {};
              L._pos = {
                x: I + m(Z.x, h.x) + ({
                  left: g,
                  right: -g
                } [G.alignment] || 0),
                y: M + m(Z.y, h.y) - L.getBBox().height / 2
              };
              G && (G.computed.x = I, G.computed.y = M);
              m(h.crop, !0) &&
                (K = L.getBBox().width, z = null, I - K < g && 1 === k ? (z = Math.round(K - I + g), D[3] = Math.max(z, D[3])) : I + K > b - g && 0 === k && (z = Math.round(I + K - b + g), D[1] = Math.max(z, D[1])), 0 > M - H / 2 ? D[0] = Math.max(Math.round(-M + H / 2), D[0]) : M + H / 2 > c && (D[2] = Math.max(Math.round(M + H / 2 - c), D[2])), L.sideOverflow = z)
            }
          }
        }), 0 === t(D) || this.verifyDataLabelOverflow(D)) && (this.placeDataLabels(), this.points.forEach(function(b) {
          Z = p(h, b.options.dataLabels);
          if (A = m(Z.connectorWidth, 1)) {
            let c;
            F = b.connector;
            if ((L = b.dataLabel) && L._pos && b.visible && 0 < b.labelDistance) {
              X =
                L._attr.visibility;
              if (c = !F) b.connector = F = l.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + b.colorIndex + (b.className ? " " + b.className : "")).add(a.dataLabelsGroup), l.styledMode || F.attr({
                "stroke-width": A,
                stroke: Z.connectorColor || b.color || "#666666"
              });
              F[c ? "attr" : "animate"]({
                d: b.getConnectorPath()
              });
              F.attr("visibility", X)
            } else F && (b.connector = F.destroy())
          }
        }))
      }

      function v() {
        this.points.forEach(function(a) {
          let e = a.dataLabel,
            d;
          e && a.visible && ((d = e._pos) ? (e.sideOverflow && (e._attr.width =
            Math.max(e.getBBox().width - e.sideOverflow, 0), e.css({
              width: e._attr.width + "px",
              textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
            }), e.shortened = !0), e.attr(e._attr), e[e.moved ? "animate" : "attr"](d), e.moved = !0) : e && e.attr({
            y: -9999
          }));
          delete a.distributeBox
        }, this)
      }

      function A(a) {
        let e = this.center,
          d = this.options,
          h = d.center,
          g = d.minSize || 80,
          b, c = null !== d.size;
        c || (null !== h[0] ? b = Math.max(e[2] - Math.max(a[1], a[3]), g) : (b = Math.max(e[2] - a[1] - a[3], g), e[0] += (a[3] - a[1]) / 2), null !== h[1] ? b = r(b, g, e[2] -
          Math.max(a[0], a[2])) : (b = r(b, g, e[2] - a[0] - a[2]), e[1] += (a[0] - a[2]) / 2), b < e[2] ? (e[2] = b, e[3] = Math.min(d.thickness ? Math.max(0, b - 2 * d.thickness) : Math.max(0, k(d.innerSize || 0, b)), b), this.translate(e), this.drawDataLabels && this.drawDataLabels()) : c = !0);
        return c
      }
      const E = [],
        e = {
          radialDistributionY: function(a) {
            return a.top + a.distributeBox.pos
          },
          radialDistributionX: function(a, e, d, h) {
            return a.getX(d < e.top + 2 || d > e.bottom - 2 ? h : d, e.half, e)
          },
          justify: function(a, e, d) {
            return d[0] + (a.half ? -1 : 1) * (e + a.labelDistance)
          },
          alignToPlotEdges: function(a,
            e, d, h) {
            a = a.getBBox().width;
            return e ? a + h : d - a - h
          },
          alignToConnectors: function(a, e, d, h) {
            let g = 0,
              b;
            a.forEach(function(a) {
              b = a.dataLabel.getBBox().width;
              b > g && (g = b)
            });
            return e ? g + h : d - g - h
          }
        };
      n.compose = function(d) {
        a.compose(B);
        F.pushUnique(E, d) && (d = d.prototype, d.dataLabelPositioners = e, d.alignDataLabel = u, d.drawDataLabels = h, d.placeDataLabels = v, d.verifyDataLabelOverflow = A)
      }
    })(v || (v = {}));
    return v
  });
  M(a, "Extensions/OverlappingDataLabels.js", [a["Core/Chart/Chart.js"], a["Core/Utilities.js"]], function(a, A) {
    function u(a,
      d) {
      let p, m = !1;
      a && (p = a.newOpacity, a.oldOpacity !== p && (a.alignAttr && a.placed ? (a[p ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), m = !0, a.alignAttr.opacity = p, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, function() {
        d.styledMode || a.css({
          pointerEvents: p ? "auto" : "none"
        })
      }), F(d, "afterHideOverlappingLabel")) : a.attr({
        opacity: p
      })), a.isOld = !0);
      return m
    }
    const {
      addEvent: I,
      fireEvent: F,
      isArray: G,
      isNumber: C,
      objectEach: B,
      pick: t
    } = A;
    I(a, "render", function() {
      let a = this,
        d = [];
      (this.labelCollectors || []).forEach(function(a) {
        d =
          d.concat(a())
      });
      (this.yAxis || []).forEach(function(a) {
        a.stacking && a.options.stackLabels && !a.options.stackLabels.allowOverlap && B(a.stacking.stacks, function(a) {
          B(a, function(a) {
            a.label && d.push(a.label)
          })
        })
      });
      (this.series || []).forEach(function(p) {
        var m = p.options.dataLabels;
        p.visible && (!1 !== m.enabled || p._hasPointLabels) && (m = k => k.forEach(k => {
          k.visible && (G(k.dataLabels) ? k.dataLabels : k.dataLabel ? [k.dataLabel] : []).forEach(function(n) {
            const h = n.options;
            n.labelrank = t(h.labelrank, k.labelrank, k.shapeArgs && k.shapeArgs.height);
            h.allowOverlap ? (n.oldOpacity = n.opacity, n.newOpacity = 1, u(n, a)) : d.push(n)
          })
        }), m(p.nodes || []), m(p.points))
      });
      this.hideOverlappingLabels(d)
    });
    a.prototype.hideOverlappingLabels = function(a) {
      let d = this,
        p = a.length,
        m = d.renderer;
      var k;
      let r;
      let n, h, t, B = !1;
      var E = function(a) {
        let e, d;
        var h;
        let k = a.box ? 0 : a.padding || 0,
          g = h = 0,
          b, c;
        if (a && (!a.alignAttr || a.placed)) return e = a.alignAttr || {
            x: a.attr("x"),
            y: a.attr("y")
          }, d = a.parentGroup, a.width || (h = a.getBBox(), a.width = h.width, a.height = h.height, h = m.fontMetrics(a.element).h),
          b = a.width - 2 * k, (c = {
            left: "0",
            center: "0.5",
            right: "1"
          } [a.alignValue]) ? g = +c * b : C(a.x) && Math.round(a.x) !== a.translateX && (g = a.x - a.translateX), {
            x: e.x + (d.translateX || 0) + k - (g || 0),
            y: e.y + (d.translateY || 0) + k - h,
            width: a.width - 2 * k,
            height: a.height - 2 * k
          }
      };
      for (r = 0; r < p; r++)
        if (k = a[r]) k.oldOpacity = k.opacity, k.newOpacity = 1, k.absoluteBox = E(k);
      a.sort(function(a, d) {
        return (d.labelrank || 0) - (a.labelrank || 0)
      });
      for (r = 0; r < p; r++)
        for (h = (E = a[r]) && E.absoluteBox, k = r + 1; k < p; ++k) t = (n = a[k]) && n.absoluteBox, !h || !t || E === n || 0 === E.newOpacity ||
          0 === n.newOpacity || "hidden" === E.visibility || "hidden" === n.visibility || t.x >= h.x + h.width || t.x + t.width <= h.x || t.y >= h.y + h.height || t.y + t.height <= h.y || ((E.labelrank < n.labelrank ? E : n).newOpacity = 0);
      a.forEach(function(a) {
        u(a, d) && (B = !0)
      });
      B && F(d, "afterHideAllOverlappingLabels")
    }
  });
  M(a, "Extensions/BorderRadius.js", [a["Core/Defaults.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function(a, A, H,
    I, F, G) {
    const {
      defaultOptions: u
    } = a;
    ({
      seriesTypes: a
    } = H);
    const {
      addEvent: B,
      extend: t,
      isObject: r,
      merge: d,
      relativeLength: p
    } = G, m = {
      radius: 0,
      scope: "stack",
      where: void 0
    }, k = (a, k) => {
      r(a) || (a = {
        radius: a || 0
      });
      return d(m, k, a)
    };
    if (-1 === I.symbolCustomAttribs.indexOf("borderRadius")) {
      I.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY");
      const d = F.prototype.symbols.arc;
      F.prototype.symbols.arc = function(a, k, n, m, e = {}) {
        a = d(a, k, n, m, e);
        const {
          innerR: h = 0,
          r = n,
          start: l = 0,
          end: w = 0
        } = e;
        if (e.open || !e.borderRadius) return a;
        n = w - l;
        k = Math.sin(n / 2);
        e = Math.max(Math.min(p(e.borderRadius || 0, r - h), (r - h) / 2, r * k / (1 + k)), 0);
        n = Math.min(e, n / Math.PI * 2 * h);
        for (k = a.length - 1; k--;) {
          {
            let d = void 0,
              h = void 0,
              l = void 0;
            m = a;
            var g = k,
              b = 1 < k ? n : e,
              c = m[g],
              f = m[g + 1];
            "Z" === f[0] && (f = m[0]);
            "M" !== c[0] && "L" !== c[0] || "A" !== f[0] ? "A" !== c[0] || "M" !== f[0] && "L" !== f[0] || (l = f, h = c) : (l = c, h = f, d = !0);
            if (l && h && h.params) {
              c = h[1];
              var x = h[5];
              f = h.params;
              const {
                start: a,
                end: e,
                cx: k,
                cy: n
              } = f;
              var u = x ? c - b : c + b;
              const q = u ? Math.asin(b / u) : 0;
              x = x ? q : -q;
              u *= Math.cos(q);
              d ? (f.start = a + x, l[1] = k + u * Math.cos(a),
                l[2] = n + u * Math.sin(a), m.splice(g + 1, 0, ["A", b, b, 0, 0, 1, k + c * Math.cos(f.start), n + c * Math.sin(f.start)])) : (f.end = e - x, h[6] = k + c * Math.cos(f.end), h[7] = n + c * Math.sin(f.end), m.splice(g + 1, 0, ["A", b, b, 0, 0, 1, k + u * Math.cos(e), n + u * Math.sin(e)]));
              h[4] = Math.abs(f.end - f.start) < Math.PI ? 0 : 1
            }
          }
        }
        return a
      };
      const n = F.prototype.symbols.roundedRect;
      F.prototype.symbols.roundedRect = function(a, d, k, m, e = {}) {
        const h = n(a, d, k, m, e),
          {
            r: p = 0,
            brBoxHeight: l = m,
            brBoxY: w = d
          } = e;
        var g = d - w,
          b = w + l - (d + m);
        e = -.1 < g - p ? 0 : p;
        const c = -.1 < b - p ? 0 : p;
        var f = Math.max(e &&
          g, 0);
        const x = Math.max(c && b, 0);
        b = [a + e, d];
        g = [a + k - e, d];
        const r = [a + k, d + e],
          z = [a + k, d + m - c],
          u = [a + k - c, d + m],
          t = [a + c, d + m],
          v = [a, d + m - c],
          D = [a, d + e];
        if (f) {
          const a = Math.sqrt(Math.pow(e, 2) - Math.pow(e - f, 2));
          b[0] -= a;
          g[0] += a;
          r[1] = D[1] = d + e - f
        }
        m < e - f && (f = Math.sqrt(Math.pow(e, 2) - Math.pow(e - f - m, 2)), r[0] = z[0] = a + k - e + f, u[0] = Math.min(r[0], u[0]), t[0] = Math.max(z[0], t[0]), v[0] = D[0] = a + e - f, r[1] = D[1] = d + m);
        x && (f = Math.sqrt(Math.pow(c, 2) - Math.pow(c - x, 2)), u[0] += f, t[0] -= f, z[1] = v[1] = d + m - c + x);
        m < c - x && (m = Math.sqrt(Math.pow(c, 2) - Math.pow(c - x - m,
          2)), r[0] = z[0] = a + k - c + m, g[0] = Math.min(r[0], g[0]), b[0] = Math.max(z[0], b[0]), v[0] = D[0] = a + c - m, z[1] = v[1] = d);
        h.length = 0;
        h.push(["M", ...b], ["L", ...g], ["A", e, e, 0, 0, 1, ...r], ["L", ...z], ["A", c, c, 0, 0, 1, ...u], ["L", ...t], ["A", c, c, 0, 0, 1, ...v], ["L", ...D], ["A", e, e, 0, 0, 1, ...b], ["Z"]);
        return h
      };
      B(a.pie, "afterTranslate", function() {
        const a = k(this.options.borderRadius);
        for (const d of this.points) {
          const h = d.shapeArgs;
          h && (h.borderRadius = p(a.radius, (h.r || 0) - (h.innerR || 0)))
        }
      });
      B(A, "afterColumnTranslate", function() {
        var a, d;
        if (this.options.borderRadius &&
          (!this.chart.is3d || !this.chart.is3d())) {
          const {
            options: h,
            yAxis: v
          } = this, l = "percent" === h.stacking;
          var n = null === (d = null === (a = u.plotOptions) || void 0 === a ? void 0 : a[this.type]) || void 0 === d ? void 0 : d.borderRadius;
          a = k(h.borderRadius, r(n) ? n : {});
          d = v.options.reversed;
          for (const k of this.points)
            if ({
                shapeArgs: n
              } = k, "roundedRect" === k.shapeType && n) {
              const {
                width: g = 0,
                height: b = 0,
                y: c = 0
              } = n;
              var m = c,
                e = b;
              "stack" === a.scope && k.stackTotal && (m = v.translate(l ? 100 : k.stackTotal, !1, !0, !1, !0), e = v.translate(h.threshold || 0, !1, !0, !1, !0),
                e = this.crispCol(0, Math.min(m, e), 0, Math.abs(m - e)), m = e.y, e = e.height);
              const f = -1 === (k.negative ? -1 : 1) * (d ? -1 : 1);
              let q = a.where;
              !q && this.is("waterfall") && Math.abs((k.yBottom || 0) - (this.translatedThreshold || 0)) > this.borderWidth && (q = "all");
              q || (q = "end");
              const w = Math.min(p(a.radius, g), g / 2, "all" === q ? b / 2 : Infinity) || 0;
              "end" === q && (f && (m -= w), e += w);
              t(n, {
                brBoxHeight: e,
                brBoxY: m,
                r: w
              })
            }
        }
      }, {
        order: 9
      })
    }
    A = {
      optionsToObject: k
    };
    "";
    return A
  });
  M(a, "Core/Responsive.js", [a["Core/Utilities.js"]], function(a) {
    const {
      extend: u,
      find: H,
      isArray: I,
      isObject: F,
      merge: G,
      objectEach: C,
      pick: B,
      splat: t,
      uniqueKey: r
    } = a;
    var d;
    (function(d) {
      function m(a) {
        function d(a, k, n, l) {
          let e;
          C(a, function(a, b) {
            if (!l && -1 < h.collectionsWithUpdate.indexOf(b) && k[b])
              for (a = t(a), n[b] = [], e = 0; e < Math.max(a.length, k[b].length); e++) k[b][e] && (void 0 === a[e] ? n[b][e] = k[b][e] : (n[b][e] = {}, d(a[e], k[b][e], n[b][e], l + 1)));
            else F(a) ? (n[b] = I(a) ? [] : {}, d(a, k[b] || {}, n[b], l + 1)) : n[b] = "undefined" === typeof k[b] ? null : k[b]
          })
        }
        const h = this,
          k = {};
        d(a, this.options, k, 0);
        return k
      }

      function k(a, d) {
        const h =
          a.condition;
        (h.callback || function() {
          return this.chartWidth <= B(h.maxWidth, Number.MAX_VALUE) && this.chartHeight <= B(h.maxHeight, Number.MAX_VALUE) && this.chartWidth >= B(h.minWidth, 0) && this.chartHeight >= B(h.minHeight, 0)
        }).call(this) && d.push(a._id)
      }

      function p(a, d) {
        const h = this.options.responsive;
        var k = this.currentResponsive;
        let e = [];
        !d && h && h.rules && h.rules.forEach(a => {
          "undefined" === typeof a._id && (a._id = r());
          this.matchResponsiveRule(a, e)
        }, this);
        d = G(...e.map(a => H((h || {}).rules || [], e => e._id === a)).map(a => a && a.chartOptions));
        d.isResponsiveOptions = !0;
        e = e.toString() || void 0;
        e !== (k && k.ruleIds) && (k && this.update(k.undoOptions, a, !0), e ? (k = this.currentOptions(d), k.isResponsiveOptions = !0, this.currentResponsive = {
          ruleIds: e,
          mergedOptions: d,
          undoOptions: k
        }, this.update(d, a, !0)) : this.currentResponsive = void 0)
      }
      const n = [];
      d.compose = function(d) {
        a.pushUnique(n, d) && u(d.prototype, {
          currentOptions: m,
          matchResponsiveRule: k,
          setResponsive: p
        });
        return d
      }
    })(d || (d = {}));
    "";
    "";
    return d
  });
  M(a, "masters/highcharts.src.js", [a["Core/Globals.js"], a["Core/Utilities.js"],
    a["Core/Defaults.js"], a["Core/Animation/Fx.js"], a["Core/Animation/AnimationUtilities.js"], a["Core/Renderer/HTML/AST.js"], a["Core/FormatUtilities.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Renderer/HTML/HTMLElement.js"], a["Core/Renderer/HTML/HTMLRenderer.js"], a["Core/Axis/Axis.js"], a["Core/Axis/DateTimeAxis.js"], a["Core/Axis/LogarithmicAxis.js"], a["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"], a["Core/Axis/Tick.js"],
    a["Core/Tooltip.js"], a["Core/Series/Point.js"], a["Core/Pointer.js"], a["Core/Legend/Legend.js"], a["Core/Chart/Chart.js"], a["Core/Axis/Stacking/StackingAxis.js"], a["Core/Axis/Stacking/StackItem.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Series/Column/ColumnSeries.js"], a["Series/Column/ColumnDataLabel.js"], a["Series/Pie/PieSeries.js"], a["Series/Pie/PieDataLabel.js"], a["Core/Series/DataLabel.js"], a["Core/Responsive.js"], a["Core/Color/Color.js"], a["Core/Time.js"]
  ], function(a,
    A, H, I, F, G, C, B, t, r, d, p, m, k, v, n, h, D, L, E, e, q, y, l, w, g, b, c, f, x, J, z, Q, S) {
    a.animate = F.animate;
    a.animObject = F.animObject;
    a.getDeferredAnimation = F.getDeferredAnimation;
    a.setAnimation = F.setAnimation;
    a.stop = F.stop;
    a.timers = I.timers;
    a.AST = G;
    a.Axis = m;
    a.Chart = q;
    a.chart = q.chart;
    a.Fx = I;
    a.Legend = e;
    a.PlotLineOrBand = n;
    a.Point = L;
    a.Pointer = E;
    a.Series = w;
    a.StackItem = l;
    a.SVGElement = t;
    a.SVGRenderer = r;
    a.Tick = h;
    a.Time = S;
    a.Tooltip = D;
    a.Color = Q;
    a.color = Q.parse;
    p.compose(r);
    d.compose(t);
    E.compose(q);
    e.compose(q);
    a.defaultOptions =
      H.defaultOptions;
    a.getOptions = H.getOptions;
    a.time = H.defaultTime;
    a.setOptions = H.setOptions;
    a.dateFormat = C.dateFormat;
    a.format = C.format;
    a.numberFormat = C.numberFormat;
    a.addEvent = A.addEvent;
    a.arrayMax = A.arrayMax;
    a.arrayMin = A.arrayMin;
    a.attr = A.attr;
    a.clearTimeout = A.clearTimeout;
    a.correctFloat = A.correctFloat;
    a.createElement = A.createElement;
    a.css = A.css;
    a.defined = A.defined;
    a.destroyObjectProperties = A.destroyObjectProperties;
    a.discardElement = A.discardElement;
    a.distribute = B.distribute;
    a.erase = A.erase;
    a.error =
      A.error;
    a.extend = A.extend;
    a.extendClass = A.extendClass;
    a.find = A.find;
    a.fireEvent = A.fireEvent;
    a.getMagnitude = A.getMagnitude;
    a.getStyle = A.getStyle;
    a.inArray = A.inArray;
    a.isArray = A.isArray;
    a.isClass = A.isClass;
    a.isDOMElement = A.isDOMElement;
    a.isFunction = A.isFunction;
    a.isNumber = A.isNumber;
    a.isObject = A.isObject;
    a.isString = A.isString;
    a.keys = A.keys;
    a.merge = A.merge;
    a.normalizeTickInterval = A.normalizeTickInterval;
    a.objectEach = A.objectEach;
    a.offset = A.offset;
    a.pad = A.pad;
    a.pick = A.pick;
    a.pInt = A.pInt;
    a.relativeLength =
      A.relativeLength;
    a.removeEvent = A.removeEvent;
    a.seriesType = g.seriesType;
    a.splat = A.splat;
    a.stableSort = A.stableSort;
    a.syncTimeout = A.syncTimeout;
    a.timeUnits = A.timeUnits;
    a.uniqueKey = A.uniqueKey;
    a.useSerialIds = A.useSerialIds;
    a.wrap = A.wrap;
    c.compose(b);
    J.compose(w);
    k.compose(m);
    v.compose(m);
    x.compose(f);
    n.compose(m);
    z.compose(q);
    y.compose(m, q, w);
    D.compose(E);
    return a
  });
  M(a, "Core/Axis/BrokenAxis.js", [a["Core/Axis/Stacking/StackItem.js"], a["Core/Utilities.js"]], function(a, A) {
    const {
      addEvent: u,
      find: I,
      fireEvent: F,
      isArray: G,
      isNumber: C,
      pick: B
    } = A;
    var t;
    (function(r) {
      function d() {
        "undefined" !== typeof this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks, !1)
      }

      function p() {
        this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = !1)
      }

      function m() {
        const a = this.brokenAxis;
        if (a && a.hasBreaks) {
          const e = this.tickPositions,
            d = this.tickPositions.info,
            h = [];
          for (let d = 0; d < e.length; d++) a.isInAnyBreak(e[d]) || h.push(e[d]);
          this.tickPositions = h;
          this.tickPositions.info = d
        }
      }

      function k() {
        this.brokenAxis || (this.brokenAxis =
          new E(this))
      }

      function t() {
        const {
          isDirty: a,
          options: {
            connectNulls: d
          },
          points: h,
          xAxis: l,
          yAxis: k
        } = this;
        if (a) {
          let a = h.length;
          for (; a--;) {
            const b = h[a],
              c = !(null === b.y && !1 === d) && (l && l.brokenAxis && l.brokenAxis.isInAnyBreak(b.x, !0) || k && k.brokenAxis && k.brokenAxis.isInAnyBreak(b.y, !0));
            b.visible = c ? !1 : !1 !== b.options.visible
          }
        }
      }

      function n() {
        this.drawBreaks(this.xAxis, ["x"]);
        this.drawBreaks(this.yAxis, B(this.pointArrayMap, ["y"]))
      }

      function h(a, d) {
        const e = this,
          h = e.points;
        let k, g, b, c;
        if (a && a.brokenAxis && a.brokenAxis.hasBreaks) {
          const f =
            a.brokenAxis;
          d.forEach(function(d) {
            k = f && f.breakArray || [];
            g = a.isXAxis ? a.min : B(e.options.threshold, a.min);
            h.forEach(function(f) {
              c = B(f["stack" + d.toUpperCase()], f[d]);
              k.forEach(function(e) {
                if (C(g) && C(c)) {
                  b = !1;
                  if (g < e.from && c > e.to || g > e.from && c < e.from) b = "pointBreak";
                  else if (g < e.from && c > e.from && c < e.to || g > e.from && c > e.to && c < e.from) b = "pointInBreak";
                  b && F(a, b, {
                    point: f,
                    brk: e
                  })
                }
              })
            })
          })
        }
      }

      function D() {
        var e = this.currentDataGrouping,
          d = e && e.gapSize;
        e = this.points.slice();
        const h = this.yAxis;
        let l = this.options.gapSize,
          k = e.length - 1;
        var g;
        if (l && 0 < k)
          for ("value" !== this.options.gapUnit && (l *= this.basePointRange), d && d > l && d >= this.basePointRange && (l = d); k--;) g && !1 !== g.visible || (g = e[k + 1]), d = e[k], !1 !== g.visible && !1 !== d.visible && (g.x - d.x > l && (g = (d.x + g.x) / 2, e.splice(k + 1, 0, {
            isNull: !0,
            x: g
          }), h.stacking && this.options.stacking && (g = h.stacking.stacks[this.stackKey][g] = new a(h, h.options.stackLabels, !1, g, this.stack), g.total = 0)), g = d);
        return this.getGraphPath(e)
      }
      const H = [];
      r.compose = function(a, q) {
        A.pushUnique(H, a) && (a.keepProps.push("brokenAxis"),
          u(a, "init", k), u(a, "afterInit", d), u(a, "afterSetTickPositions", m), u(a, "afterSetOptions", p));
        if (A.pushUnique(H, q)) {
          const a = q.prototype;
          a.drawBreaks = h;
          a.gappedPath = D;
          u(q, "afterGeneratePoints", t);
          u(q, "afterRender", n)
        }
        return a
      };
      class E {
        static isInBreak(a, d) {
          const e = a.repeat || Infinity,
            h = a.from,
            k = a.to - a.from;
          d = d >= h ? (d - h) % e : e - (h - d) % e;
          return a.inclusive ? d <= k : d < k && 0 !== d
        }
        static lin2Val(a) {
          var e = this.brokenAxis;
          e = e && e.breakArray;
          if (!e || !C(a)) return a;
          let d, h;
          for (h = 0; h < e.length && !(d = e[h], d.from >= a); h++) d.to < a ?
            a += d.len : E.isInBreak(d, a) && (a += d.len);
          return a
        }
        static val2Lin(a) {
          var e = this.brokenAxis;
          e = e && e.breakArray;
          if (!e || !C(a)) return a;
          let d = a,
            h, k;
          for (k = 0; k < e.length; k++)
            if (h = e[k], h.to <= a) d -= h.len;
            else if (h.from >= a) break;
          else if (E.isInBreak(h, a)) {
            d -= a - h.from;
            break
          }
          return d
        }
        constructor(a) {
          this.hasBreaks = !1;
          this.axis = a
        }
        findBreakAt(a, d) {
          return I(d, function(e) {
            return e.from < a && a < e.to
          })
        }
        isInAnyBreak(a, d) {
          const e = this.axis,
            h = e.options.breaks || [];
          let k = h.length,
            g, b, c;
          if (k && C(a)) {
            for (; k--;) E.isInBreak(h[k], a) && (g = !0, b || (b = B(h[k].showPoints, !e.isXAxis)));
            c = g && d ? g && !b : g
          }
          return c
        }
        setBreaks(a, d) {
          const e = this,
            h = e.axis,
            k = G(a) && !!a.length;
          h.isDirty = e.hasBreaks !== k;
          e.hasBreaks = k;
          h.options.breaks = h.userOptions.breaks = a;
          h.forceRedraw = !0;
          h.series.forEach(function(a) {
            a.isDirty = !0
          });
          k || h.val2lin !== E.val2Lin || (delete h.val2lin, delete h.lin2val);
          k && (h.userOptions.ordinal = !1, h.lin2val = E.lin2Val, h.val2lin = E.val2Lin, h.setExtremes = function(a, b, c, f, d) {
            if (e.hasBreaks) {
              const c = this.options.breaks || [];
              let f;
              for (; f = e.findBreakAt(a,
                  c);) a = f.to;
              for (; f = e.findBreakAt(b, c);) b = f.from;
              b < a && (b = a)
            }
            h.constructor.prototype.setExtremes.call(this, a, b, c, f, d)
          }, h.setAxisTranslation = function() {
            h.constructor.prototype.setAxisTranslation.call(this);
            e.unitLength = void 0;
            if (e.hasBreaks) {
              const a = h.options.breaks || [],
                b = [],
                c = [],
                f = B(h.pointRangePadding, 0);
              let d = 0,
                k, l, n = h.userMin || h.min,
                m = h.userMax || h.max,
                q, p;
              a.forEach(function(a) {
                l = a.repeat || Infinity;
                C(n) && C(m) && (E.isInBreak(a, n) && (n += a.to % l - n % l), E.isInBreak(a, m) && (m -= m % l - a.from % l))
              });
              a.forEach(function(a) {
                q =
                  a.from;
                l = a.repeat || Infinity;
                if (C(n) && C(m)) {
                  for (; q - l > n;) q -= l;
                  for (; q < n;) q += l;
                  for (p = q; p < m; p += l) b.push({
                    value: p,
                    move: "in"
                  }), b.push({
                    value: p + a.to - a.from,
                    move: "out",
                    size: a.breakSize
                  })
                }
              });
              b.sort(function(a, b) {
                return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
              });
              k = 0;
              q = n;
              b.forEach(function(a) {
                k += "in" === a.move ? 1 : -1;
                1 === k && "in" === a.move && (q = a.value);
                0 === k && C(q) && (c.push({
                  from: q,
                  to: a.value,
                  len: a.value - q - (a.size || 0)
                }), d += a.value - q - (a.size || 0))
              });
              e.breakArray = c;
              C(n) && C(m) && C(h.min) &&
                (e.unitLength = m - n - d + f, F(h, "afterBreaks"), h.staticScale ? h.transA = h.staticScale : e.unitLength && (h.transA *= (m - h.min + f) / e.unitLength), f && (h.minPixelPadding = h.transA * (h.minPointOffset || 0)), h.min = n, h.max = m)
            }
          });
          B(d, !0) && h.chart.redraw()
        }
      }
      r.Additions = E
    })(t || (t = {}));
    return t
  });
  M(a, "masters/modules/broken-axis.src.js", [a["Core/Globals.js"], a["Core/Axis/BrokenAxis.js"]], function(a, A) {
    A.compose(a.Axis, a.Series)
  });
  M(a, "Extensions/DataGrouping/ApproximationRegistry.js", [], function() {
    return {}
  });
  M(a, "Extensions/DataGrouping/ApproximationDefaults.js",
    [a["Extensions/DataGrouping/ApproximationRegistry.js"], a["Core/Utilities.js"]],
    function(a, A) {
      function u(a) {
        const d = a.length;
        a = I(a);
        t(a) && d && (a = C(a / d));
        return a
      }

      function I(a) {
        let d = a.length,
          p;
        if (!d && a.hasNulls) p = null;
        else if (d)
          for (p = 0; d--;) p += a[d];
        return p
      }
      const {
        arrayMax: F,
        arrayMin: G,
        correctFloat: C,
        extend: B,
        isNumber: t
      } = A;
      A = {
        average: u,
        averages: function() {
          const a = [];
          [].forEach.call(arguments, function(d) {
            a.push(u(d))
          });
          return "undefined" === typeof a[0] ? void 0 : a
        },
        close: function(a) {
          return a.length ? a[a.length -
            1] : a.hasNulls ? null : void 0
        },
        high: function(a) {
          return a.length ? F(a) : a.hasNulls ? null : void 0
        },
        hlc: function(r, d, p) {
          r = a.high(r);
          d = a.low(d);
          p = a.close(p);
          if (t(r) || t(d) || t(p)) return [r, d, p]
        },
        low: function(a) {
          return a.length ? G(a) : a.hasNulls ? null : void 0
        },
        ohlc: function(r, d, p, m) {
          r = a.open(r);
          d = a.high(d);
          p = a.low(p);
          m = a.close(m);
          if (t(r) || t(d) || t(p) || t(m)) return [r, d, p, m]
        },
        open: function(a) {
          return a.length ? a[0] : a.hasNulls ? null : void 0
        },
        range: function(r, d) {
          r = a.low(r);
          d = a.high(d);
          if (t(r) || t(d)) return [r, d];
          if (null === r && null ===
            d) return null
        },
        sum: I
      };
      B(a, A);
      return A
    });
  M(a, "Extensions/DataGrouping/DataGroupingDefaults.js", [], function() {
    return {
      common: {
        groupPixelWidth: 2,
        dateTimeLabelFormats: {
          millisecond: ["%A, %e %b, %H:%M:%S.%L", "%A, %e %b, %H:%M:%S.%L", "-%H:%M:%S.%L"],
          second: ["%A, %e %b, %H:%M:%S", "%A, %e %b, %H:%M:%S", "-%H:%M:%S"],
          minute: ["%A, %e %b, %H:%M", "%A, %e %b, %H:%M", "-%H:%M"],
          hour: ["%A, %e %b, %H:%M", "%A, %e %b, %H:%M", "-%H:%M"],
          day: ["%A, %e %b %Y", "%A, %e %b", "-%A, %e %b %Y"],
          week: ["Week from %A, %e %b %Y", "%A, %e %b",
            "-%A, %e %b %Y"
          ],
          month: ["%B %Y", "%B", "-%B %Y"],
          year: ["%Y", "%Y", "-%Y"]
        }
      },
      seriesSpecific: {
        line: {},
        spline: {},
        area: {},
        areaspline: {},
        arearange: {},
        column: {
          groupPixelWidth: 10
        },
        columnrange: {
          groupPixelWidth: 10
        },
        candlestick: {
          groupPixelWidth: 10
        },
        ohlc: {
          groupPixelWidth: 5
        },
        hlc: {
          groupPixelWidth: 5
        },
        heikinashi: {
          groupPixelWidth: 10
        }
      },
      units: [
        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
        ["second", [1, 2, 5, 10, 15, 30]],
        ["minute", [1, 2, 5, 10, 15, 30]],
        ["hour", [1, 2, 3, 4, 6, 8, 12]],
        ["day", [1]],
        ["week", [1]],
        ["month", [1, 3, 6]],
        ["year",
          null
        ]
      ]
    }
  });
  M(a, "Extensions/DataGrouping/DataGroupingAxisComposition.js", [a["Extensions/DataGrouping/DataGroupingDefaults.js"], a["Core/Utilities.js"]], function(a, A) {
    function u(a) {
      const d = this,
        m = d.series;
      m.forEach(function(a) {
        a.groupPixelWidth = void 0
      });
      m.forEach(function(k) {
        k.groupPixelWidth = d.getGroupPixelWidth && d.getGroupPixelWidth();
        k.groupPixelWidth && (k.hasProcessed = !0);
        k.applyGrouping(!!a.hasExtremesChanged)
      })
    }

    function I() {
      const d = this.series;
      let k = d.length,
        p = 0,
        n = !1,
        h, t;
      for (; k--;)
        if (t = d[k].options.dataGrouping)
          if (p =
            Math.max(p, r(t.groupPixelWidth, a.common.groupPixelWidth)), h = (d[k].processedXData || d[k].data).length, d[k].groupPixelWidth || h > this.chart.plotSizeX / p || h && t.forced) n = !0;
      return n ? p : 0
    }

    function F() {
      this.series.forEach(function(a) {
        a.hasProcessed = !1
      })
    }

    function G(a, d) {
      let k;
      d = r(d, !0);
      a || (a = {
        forced: !1,
        units: null
      });
      if (this instanceof p)
        for (k = this.series.length; k--;) this.series[k].update({
          dataGrouping: a
        }, !1);
      else this.chart.options.series.forEach(function(d) {
        d.dataGrouping = "boolean" === typeof a ? a : t(a, d.dataGrouping)
      });
      this.ordinal && (this.ordinal.slope = void 0);
      d && this.chart.redraw()
    }
    const {
      addEvent: C,
      extend: B,
      merge: t,
      pick: r
    } = A, d = [];
    let p;
    return {
      compose: function(a) {
        p = a;
        A.pushUnique(d, a) && (C(a, "afterSetScale", F), C(a, "postProcessData", u), B(a.prototype, {
          applyGrouping: u,
          getGroupPixelWidth: I,
          setDataGrouping: G
        }))
      }
    }
  });
  M(a, "Extensions/DataGrouping/DataGroupingSeriesComposition.js", [a["Extensions/DataGrouping/ApproximationRegistry.js"], a["Extensions/DataGrouping/DataGroupingDefaults.js"], a["Core/Axis/DateTimeAxis.js"], a["Core/Defaults.js"],
    a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]
  ], function(a, A, H, I, F, G) {
    function u(a) {
      var d = this.chart,
        e = this.options.dataGrouping,
        g = !1 !== this.allowDG && e && E(e.enabled, d.options.isStock),
        b = this.visible || !d.options.chart.ignoreHiddenSeries;
      const c = this.currentDataGrouping;
      var f = !1;
      g && !this.requireSorting && (this.requireSorting = f = !0);
      a = !1 === !(this.isCartesian && !this.isDirty && !this.xAxis.isDirty && !this.yAxis.isDirty && !a) || !g;
      f && (this.requireSorting = !1);
      if (!a) {
        this.destroyGroupedData();
        a = e.groupAll ?
          this.xData : this.processedXData;
        g = e.groupAll ? this.yData : this.processedYData;
        var h = d.plotSizeX;
        f = this.xAxis;
        var k = f.options.ordinal,
          q = this.groupPixelWidth,
          p;
        let l;
        if (q && a && a.length && h) {
          this.isDirty = l = !0;
          this.points = null;
          var r = f.getExtremes();
          var t = r.min;
          r = r.max;
          k = k && f.ordinal && f.ordinal.getGroupIntervalFactor(t, r, this) || 1;
          h = f.getTimeTicks(H.Additions.prototype.normalizeTimeTickInterval(q * (r - t) / h * k, e.units || A.units), Math.min(t, a[0]), Math.max(r, a[a.length - 1]), f.options.startOfWeek, a, this.closestPointRange);
          q = m.groupData.apply(this, [a, g, h, e.approximation]);
          a = q.groupedXData;
          g = q.groupedYData;
          k = 0;
          e && e.smoothed && a.length && (e.firstAnchor = "firstPoint", e.anchor = "middle", e.lastAnchor = "lastPoint", n(32, !1, d, {
            "dataGrouping.smoothed": "use dataGrouping.anchor"
          }));
          d = a;
          var u = r,
            y = this.options.dataGrouping;
          r = this.currentDataGrouping && this.currentDataGrouping.gapSize;
          if (y && this.xData && r && this.groupMap) {
            t = d.length - 1;
            var B = y.anchor;
            const a = E(y.firstAnchor, B);
            y = E(y.lastAnchor, B);
            if (B && "start" !== B) {
              var C = r * {
                middle: .5,
                end: 1
              } [B];
              for (B = d.length - 1; B-- && 0 < B;) d[B] += C
            }
            a && "start" !== a && this.xData[0] >= d[0] && (B = this.groupMap[0].start, C = this.groupMap[0].length, D(B) && D(C) && (p = B + (C - 1)), d[0] = {
              middle: d[0] + .5 * r,
              end: d[0] + r,
              firstPoint: this.xData[0],
              lastPoint: p && this.xData[p]
            } [a]);
            y && "start" !== y && r && d[t] >= u - r && (p = this.groupMap[this.groupMap.length - 1].start, d[t] = {
              middle: d[t] + .5 * r,
              end: d[t] + r,
              firstPoint: p && this.xData[p],
              lastPoint: this.xData[this.xData.length - 1]
            } [y])
          }
          for (p = 1; p < h.length; p++) h.info.segmentStarts && -1 !== h.info.segmentStarts.indexOf(p) ||
            (k = Math.max(h[p] - h[p - 1], k));
          r = h.info;
          r.gapSize = k;
          this.closestPointRange = h.info.totalRange;
          this.groupMap = q.groupMap;
          if (b) {
            b = f;
            p = a;
            if (v(p[0]) && D(b.min) && D(b.dataMin) && p[0] < b.min) {
              if (!v(b.options.min) && b.min <= b.dataMin || b.min === b.dataMin) b.min = Math.min(p[0], b.min);
              b.dataMin = Math.min(p[0], b.dataMin)
            }
            if (v(p[p.length - 1]) && D(b.max) && D(b.dataMax) && p[p.length - 1] > b.max) {
              if (!v(b.options.max) && D(b.dataMax) && b.max >= b.dataMax || b.max === b.dataMax) b.max = Math.max(p[p.length - 1], b.max);
              b.dataMax = Math.max(p[p.length -
                1], b.dataMax)
            }
          }
          e.groupAll && (this.allGroupedData = g, e = this.cropData(a, g, f.min, f.max, 1), a = e.xData, g = e.yData, this.cropStart = e.start);
          this.processedXData = a;
          this.processedYData = g
        } else this.groupMap = null;
        this.hasGroupedData = l;
        this.currentDataGrouping = r;
        this.preventGraphAnimation = (c && c.totalRange) !== (r && r.totalRange)
      }
    }

    function B() {
      this.groupedData && (this.groupedData.forEach(function(a, d) {
        a && (this.groupedData[d] = a.destroy ? a.destroy() : null)
      }, this), this.groupedData.length = 0)
    }

    function t() {
      e.apply(this);
      this.destroyGroupedData();
      this.groupedData = this.hasGroupedData ? this.points : null
    }

    function r() {
      return this.is("arearange") ? "range" : this.is("ohlc") ? "ohlc" : this.is("hlc") ? "hlc" : this.is("column") ? "sum" : "average"
    }

    function d(d, e, h, g) {
      const b = this,
        c = b.data,
        f = b.options && b.options.data,
        k = [],
        l = [],
        n = [],
        m = d.length,
        q = !!e,
        p = [],
        r = b.pointArrayMap,
        w = r && r.length,
        t = ["x"].concat(r || ["y"]),
        u = this.options.dataGrouping && this.options.dataGrouping.groupAll;
      let y = 0,
        B = 0;
      g = "function" === typeof g ? g : g && a[g] ? a[g] : a[b.getDGApproximation && b.getDGApproximation() ||
        "average"];
      if (w)
        for (var E = r.length; E--;) p.push([]);
      else p.push([]);
      E = w || 1;
      for (let a = 0; a <= m; a++)
        if (!(d[a] < h[0])) {
          for (;
            "undefined" !== typeof h[y + 1] && d[a] >= h[y + 1] || a === m;) {
            var A = h[y];
            b.dataGroupInfo = {
              start: u ? B : b.cropStart + B,
              length: p[0].length
            };
            var C = g.apply(b, p);
            b.pointClass && !v(b.dataGroupInfo.options) && (b.dataGroupInfo.options = L(b.pointClass.prototype.optionsToObject.call({
              series: b
            }, b.options.data[b.cropStart + B])), t.forEach(function(a) {
              delete b.dataGroupInfo.options[a]
            }));
            "undefined" !== typeof C && (k.push(A),
              l.push(C), n.push(b.dataGroupInfo));
            B = a;
            for (A = 0; A < E; A++) p[A].length = 0, p[A].hasNulls = !1;
            y += 1;
            if (a === m) break
          }
          if (a === m) break;
          if (r) {
            A = b.options.dataGrouping && b.options.dataGrouping.groupAll ? a : b.cropStart + a;
            A = c && c[A] || b.pointClass.prototype.applyOptions.apply({
              series: b
            }, [f[A]]);
            for (let a = 0; a < w; a++) C = A[r[a]], D(C) ? p[a].push(C) : null === C && (p[a].hasNulls = !0)
          } else A = q ? e[a] : null, D(A) ? p[0].push(A) : null === A && (p[0].hasNulls = !0)
        } return {
        groupedXData: k,
        groupedYData: l,
        groupMap: n
      }
    }

    function p(a) {
      a = a.options;
      const d = this.type,
        e = this.chart.options.plotOptions,
        g = this.useCommonDataGrouping && A.common,
        b = A.seriesSpecific;
      let c = I.defaultOptions.plotOptions[d].dataGrouping;
      if (e && (b[d] || g)) {
        const f = this.chart.rangeSelector;
        c || (c = L(A.common, b[d]));
        a.dataGrouping = L(g, c, e.series && e.series.dataGrouping, e[d].dataGrouping, this.userOptions.dataGrouping, !a.isInternal && f && D(f.selected) && f.buttonOptions[f.selected].dataGrouping)
      }
    }
    const {
      series: {
        prototype: m
      }
    } = F, {
      addEvent: k,
      defined: v,
      error: n,
      extend: h,
      isNumber: D,
      merge: L,
      pick: E
    } = G, e = m.generatePoints,
      q = [];
    return {
      compose: function(a) {
        const e = a.prototype.pointClass;
        G.pushUnique(q, e) && k(e, "update", function() {
          if (this.dataGroup) return n(24, !1, this.series.chart), !1
        });
        G.pushUnique(q, a) && (k(a, "afterSetOptions", p), k(a, "destroy", B), h(a.prototype, {
          applyGrouping: u,
          destroyGroupedData: B,
          generatePoints: t,
          getDGApproximation: r,
          groupData: d
        }))
      },
      groupData: d
    }
  });
  M(a, "Extensions/DataGrouping/DataGrouping.js", [a["Extensions/DataGrouping/DataGroupingAxisComposition.js"], a["Extensions/DataGrouping/DataGroupingDefaults.js"],
    a["Extensions/DataGrouping/DataGroupingSeriesComposition.js"], a["Core/FormatUtilities.js"], a["Core/Utilities.js"]
  ], function(a, A, H, I, F) {
    function u(a) {
      const d = this.chart,
        k = d.time,
        p = a.labelConfig,
        n = p.series;
      var h = n.tooltipOptions,
        u = n.options.dataGrouping;
      const B = n.xAxis;
      var E = h.xDateFormat;
      let e, q, y = h[a.isFooter ? "footerFormat" : "headerFormat"];
      B && "datetime" === B.options.type && u && r(p.key) && (q = n.currentDataGrouping, u = u.dateTimeLabelFormats || A.common.dateTimeLabelFormats, q ? (h = u[q.unitName], 1 === q.count ? E =
        h[0] : (E = h[1], e = h[2])) : !E && u && B.dateTime && (E = B.dateTime.getXDateFormat(p.x, h.dateTimeLabelFormats)), E = k.dateFormat(E, p.key), e && (E += k.dateFormat(e, p.key + q.totalRange - 1)), n.chart.styledMode && (y = this.styledModeFormat(y)), a.text = C(y, {
        point: t(p.point, {
          key: E
        }),
        series: n
      }, d), a.preventDefault())
    }
    const {
      format: C
    } = I, {
      addEvent: B,
      extend: t,
      isNumber: r
    } = F, d = [];
    I = {
      compose: function(p, m, k) {
        a.compose(p);
        H.compose(m);
        k && F.pushUnique(d, k) && B(k, "headerFormatter", u)
      },
      groupData: H.groupData
    };
    "";
    "";
    return I
  });
  M(a, "masters/modules/datagrouping.src.js",
    [a["Core/Globals.js"], a["Extensions/DataGrouping/ApproximationDefaults.js"], a["Extensions/DataGrouping/ApproximationRegistry.js"], a["Extensions/DataGrouping/DataGrouping.js"]],
    function(a, A, H, I) {
      a.dataGrouping = {
        approximationDefaults: A,
        approximations: H
      };
      I.compose(a.Axis, a.Series, a.Tooltip)
    });
  M(a, "Series/DataModifyComposition.js", [a["Core/Axis/Axis.js"], a["Core/Series/Point.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function(a, A, H, I) {
    const {
      prototype: {
        tooltipFormatter: u
      }
    } = A, {
      addEvent: G,
      arrayMax: C,
      arrayMin: B,
      correctFloat: t,
      defined: r,
      isArray: d,
      isNumber: p,
      isString: m,
      pick: k
    } = I;
    var v;
    (function(a) {
      function h(a, b, d) {
        this.isXAxis || (this.series.forEach(function(c) {
          "compare" === a && "boolean" !== typeof b ? c.setCompare(b, !1) : "cumulative" !== a || m(b) || c.setCumulative(b, !1)
        }), k(d, !0) && this.chart.redraw())
      }

      function n(a) {
        const b = this,
          {
            numberFormatter: c
          } = b.series.chart,
          d = function(f) {
            a = a.replace("{point." + f + "}", (0 < b[f] && "change" === f ? "+" : "") + c(b[f], k(b.series.tooltipOptions.changeDecimals, 2)))
          };
        r(b.change) &&
          d("change");
        r(b.cumulativeSum) && d("cumulativeSum");
        return u.apply(this, [a])
      }

      function v() {
        const a = this.options.compare;
        let f;
        if ("percent" === a || "value" === a || this.options.cumulative) f = new b(this), "percent" === a || "value" === a ? f.initCompare(a) : f.initCumulative();
        this.dataModify = f
      }

      function E(a) {
        a = a.dataExtremes;
        const c = a.activeYData;
        if (this.dataModify && a) {
          let f;
          this.options.compare ? f = [this.dataModify.modifyValue(a.dataMin), this.dataModify.modifyValue(a.dataMax)] : this.options.cumulative && d(c) && 2 <= c.length &&
            (f = b.getCumulativeExtremes(c));
          f && (a.dataMin = B(f), a.dataMax = C(f))
        }
      }

      function e(a, b) {
        this.options.compare = this.userOptions.compare = a;
        this.update({}, k(b, !0));
        !this.dataModify || "value" !== a && "percent" !== a ? this.points.forEach(a => {
          delete a.change
        }) : this.dataModify.initCompare(a)
      }

      function q() {
        if (this.xAxis && this.processedYData && this.dataModify) {
          const a = this.processedXData,
            b = this.processedYData,
            d = b.length,
            e = !0 === this.options.compareStart ? 0 : 1;
          let g = -1,
            h;
          this.pointArrayMap && (g = this.pointArrayMap.indexOf(this.options.pointValKey ||
            this.pointValKey || "y"));
          for (h = 0; h < d - e; h++) {
            const c = b[h] && -1 < g ? b[h][g] : b[h];
            if (p(c) && 0 !== c && a[h + e] >= (this.xAxis.min || 0)) {
              this.dataModify.compareValue = c;
              break
            }
          }
        }
      }

      function y(a, b) {
        this.setModifier("compare", a, b)
      }

      function l(a, b) {
        a = k(a, !1);
        this.options.cumulative = this.userOptions.cumulative = a;
        this.update({}, k(b, !0));
        this.dataModify ? this.dataModify.initCumulative() : this.points.forEach(a => {
          delete a.cumulativeSum
        })
      }

      function w(a, b) {
        this.setModifier("cumulative", a, b)
      }
      const g = [];
      a.compose = function(a, b, d) {
        if (I.pushUnique(g,
            a)) {
          const b = a.prototype;
          b.setCompare = e;
          b.setCumulative = l;
          G(a, "afterInit", v);
          G(a, "afterGetExtremes", E);
          G(a, "afterProcessData", q)
        }
        I.pushUnique(g, b) && (b = b.prototype, b.setCompare = y, b.setModifier = h, b.setCumulative = w);
        I.pushUnique(g, d) && (d.prototype.tooltipFormatter = n);
        return a
      };
      class b {
        constructor(a) {
          this.series = a
        }
        modifyValue() {
          return 0
        }
        static getCumulativeExtremes(a) {
          let b = Infinity,
            c = -Infinity;
          a.reduce((a, f) => {
            f = a + f;
            b = Math.min(b, f, a);
            c = Math.max(c, f, a);
            return f
          });
          return [b, c]
        }
        initCompare(a) {
          this.modifyValue =
            function(b, c) {
              null === b && (b = 0);
              const f = this.compareValue;
              return "undefined" !== typeof b && "undefined" !== typeof f ? (b = "value" === a ? b - f : b / f * 100 - (100 === this.series.options.compareBase ? 0 : 100), "undefined" !== typeof c && (c = this.series.points[c]) && (c.change = b), b) : 0
            }
        }
        initCumulative() {
          this.modifyValue = function(a, b) {
            null === a && (a = 0);
            if (void 0 !== a && void 0 !== b) {
              const c = 0 < b ? this.series.points[b - 1] : null;
              c && c.cumulativeSum && (a = t(c.cumulativeSum + a));
              if (b = this.series.points[b]) b.cumulativeSum = a;
              return a
            }
            return 0
          }
        }
      }
      a.Additions =
        b
    })(v || (v = {}));
    "";
    return v
  });
  M(a, "Core/Axis/NavigatorAxisComposition.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, A) {
    function u() {
      this.navigatorAxis || (this.navigatorAxis = new p(this))
    }

    function I(a) {
      var d = this.chart.options,
        m = d.navigator;
      const n = this.navigatorAxis,
        h = d.chart.zooming.pinchType,
        p = d.rangeSelector;
      d = d.chart.zooming.type;
      this.isXAxis && (m && m.enabled || p && p.enabled) && ("y" === d ? a.zoomed = !1 : (!F && "xy" === d || F && "xy" === h) && this.options.range && (m = n.previousZoom, B(a.newMin) ? n.previousZoom = [this.min, this.max] : m && (a.newMin = m[0], a.newMax = m[1], n.previousZoom = void 0)));
      "undefined" !== typeof a.zoomed && a.preventDefault()
    }
    const {
      isTouchDevice: F
    } = a, {
      addEvent: G,
      correctFloat: C,
      defined: B,
      isNumber: t,
      pick: r
    } = A, d = [];
    class p {
      static compose(a) {
        A.pushUnique(d, a) && (a.keepProps.push("navigatorAxis"), G(a, "init", u), G(a, "zoom", I))
      }
      constructor(a) {
        this.axis = a
      }
      destroy() {
        this.axis = void 0
      }
      toFixedRange(a, d, p, n) {
        var h = this.axis,
          k = h.chart;
        a = r(p, h.translate(a, !0, !h.horiz));
        d = r(n, h.translate(d, !0, !h.horiz));
        k = k && k.fixedRange;
        h = (h.pointRange || 0) / 2;
        const m = k && (d - a) / k;
        B(p) || (a = C(a + h));
        B(n) || (d = C(d - h));
        .7 < m && 1.3 > m && (n ? a = d - k : d = a + k);
        t(a) && t(d) || (a = d = void 0);
        return {
          min: a,
          max: d
        }
      }
    }
    return p
  });
  M(a, "Stock/Navigator/NavigatorDefaults.js", [a["Core/Color/Color.js"], a["Core/Series/SeriesRegistry.js"]], function(a, A) {
    ({
      parse: a
    } = a);
    ({
      seriesTypes: A
    } = A);
    A = {
      height: 40,
      margin: 25,
      maskInside: !0,
      handles: {
        width: 7,
        height: 15,
        symbols: ["navigator-handle", "navigator-handle"],
        enabled: !0,
        lineWidth: 1,
        backgroundColor: "#f2f2f2",
        borderColor: "#999999"
      },
      maskFill: a("#667aff").setOpacity(.3).get(),
      outlineColor: "#999999",
      outlineWidth: 1,
      series: {
        type: "undefined" === typeof A.areaspline ? "line" : "areaspline",
        fillOpacity: .05,
        lineWidth: 1,
        compare: null,
        sonification: {
          enabled: !1
        },
        dataGrouping: {
          approximation: "average",
          enabled: !0,
          groupPixelWidth: 2,
          firstAnchor: "firstPoint",
          anchor: "middle",
          lastAnchor: "lastPoint",
          units: [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1, 2, 3, 4]],
            ["week", [1, 2, 3]],
            ["month", [1, 3, 6]],
            ["year",
              null
            ]
          ]
        },
        dataLabels: {
          enabled: !1,
          zIndex: 2
        },
        id: "highcharts-navigator-series",
        className: "highcharts-navigator-series",
        lineColor: null,
        marker: {
          enabled: !1
        },
        threshold: null
      },
      xAxis: {
        overscroll: 0,
        className: "highcharts-navigator-xaxis",
        tickLength: 0,
        lineWidth: 0,
        gridLineColor: "#e6e6e6",
        gridLineWidth: 1,
        tickPixelInterval: 200,
        labels: {
          align: "left",
          style: {
            color: "#000000",
            fontSize: "0.7em",
            opacity: .6,
            textOutline: "2px contrast"
          },
          x: 3,
          y: -4
        },
        crosshair: !1
      },
      yAxis: {
        className: "highcharts-navigator-yaxis",
        gridLineWidth: 0,
        startOnTick: !1,
        endOnTick: !1,
        minPadding: .1,
        maxPadding: .1,
        labels: {
          enabled: !1
        },
        crosshair: !1,
        title: {
          text: null
        },
        tickLength: 0,
        tickWidth: 0
      }
    };
    "";
    return A
  });
  M(a, "Stock/Navigator/NavigatorSymbols.js", [], function() {
    return {
      "navigator-handle": function(a, A, H, I, F = {}) {
        a = F.width ? F.width / 2 : H;
        A = Math.round(a / 3) + .5;
        I = F.height || I;
        return [
          ["M", -a - 1, .5],
          ["L", a, .5],
          ["L", a, I + .5],
          ["L", -a - 1, I + .5],
          ["L", -a - 1, .5],
          ["M", -A, 4],
          ["L", -A, I - 3],
          ["M", A - 1, 4],
          ["L", A - 1, I - 3]
        ]
      }
    }
  });
  M(a, "Stock/Navigator/NavigatorComposition.js", [a["Core/Defaults.js"], a["Core/Globals.js"],
    a["Core/Axis/NavigatorAxisComposition.js"], a["Stock/Navigator/NavigatorDefaults.js"], a["Stock/Navigator/NavigatorSymbols.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Utilities.js"]
  ], function(a, A, H, I, F, G, C) {
    function u() {
      this.navigator && this.navigator.setBaseSeries(null, !1)
    }

    function t() {
      var a;
      const b = this.legend,
        c = this.navigator;
      let f, d, e;
      if (c) {
        f = b && b.options;
        d = c.xAxis;
        e = c.yAxis;
        const {
          scrollbarHeight: g,
          scrollButtonSize: h
        } = c;
        this.inverted ? (c.left = c.opposite ? this.chartWidth - g - c.height : this.spacing[3] +
          g, c.top = this.plotTop + h) : (c.left = y(d.left, this.plotLeft + h), c.top = c.navigatorOptions.top || this.chartHeight - c.height - g - ((null === (a = this.scrollbar) || void 0 === a ? void 0 : a.options.margin) || 0) - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (f && "bottom" === f.verticalAlign && "proximate" !== f.layout && f.enabled && !f.floating ? b.legendHeight + y(f.margin, 10) : 0) - (this.titleOffset ? this.titleOffset[2] : 0));
        d && e && (this.inverted ? d.options.left = e.options.left = c.left : d.options.top =
          e.options.top = c.top, d.setAxisSize(), e.setAxisSize())
      }
    }

    function r(a) {
      this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new w(this), y(a.redraw, !0) && this.redraw(a.animation))
    }

    function d() {
      const a = this.options;
      if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new w(this)
    }

    function p() {
      const a = this.options,
        b = a.navigator,
        c = a.rangeSelector;
      if ((b && b.enabled || c && c.enabled) && (!D && "x" === a.chart.zooming.type || D &&
          "x" === a.chart.zooming.pinchType)) return !1
    }

    function m(a) {
      const b = a.navigator;
      b && a.xAxis[0] && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max))
    }

    function k(a) {
      const b = a.options.navigator || {},
        c = a.options.scrollbar || {};
      this.navigator || this.scroller || !b.enabled && !c.enabled || (q(!0, this.options.navigator, b), q(!0, this.options.scrollbar, c), delete a.options.navigator, delete a.options.scrollbar)
    }

    function v() {
      this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1)
    }
    const {
      defaultOptions: n,
      setOptions: h
    } = a, {
      isTouchDevice: D
    } = A, {
      getRendererType: L
    } = G, {
      addEvent: E,
      extend: e,
      merge: q,
      pick: y
    } = C, l = [];
    let w;
    return {
      compose: function(a, b, c, f) {
        H.compose(a);
        w = c;
        C.pushUnique(l, b) && (b.prototype.callbacks.push(m), E(b, "afterAddSeries", u), E(b, "afterSetChartSize", t), E(b, "afterUpdate", r), E(b, "beforeRender", d), E(b, "beforeShowResetZoom", p), E(b, "update", k));
        C.pushUnique(l, f) && E(f, "afterUpdate", v);
        C.pushUnique(l, L) && e(L().prototype.symbols, F);
        C.pushUnique(l, h) && e(n, {
          navigator: I
        })
      }
    }
  });
  M(a, "Core/Axis/ScrollbarAxis.js",
    [a["Core/Utilities.js"]],
    function(a) {
      const {
        addEvent: u,
        defined: H,
        pick: I
      } = a, F = [];
      class G {
        static compose(A, B) {
          if (!a.pushUnique(F, A)) return A;
          const t = a => {
            const d = I(a.options && a.options.min, a.min),
              p = I(a.options && a.options.max, a.max);
            return {
              axisMin: d,
              axisMax: p,
              scrollMin: H(a.dataMin) ? Math.min(d, a.min, a.dataMin, I(a.threshold, Infinity)) : d,
              scrollMax: H(a.dataMax) ? Math.max(p, a.max, a.dataMax, I(a.threshold, -Infinity)) : p
            }
          };
          u(A, "afterInit", function() {
            const a = this;
            a.options && a.options.scrollbar && a.options.scrollbar.enabled &&
              (a.options.scrollbar.vertical = !a.horiz, a.options.startOnTick = a.options.endOnTick = !1, a.scrollbar = new B(a.chart.renderer, a.options.scrollbar, a.chart), u(a.scrollbar, "changed", function(d) {
                let {
                  axisMin: p,
                  axisMax: m,
                  scrollMin: k,
                  scrollMax: r
                } = t(a);
                var n = r - k;
                let h;
                H(p) && H(m) && (a.horiz && !a.reversed || !a.horiz && a.reversed ? (h = k + n * this.to, n = k + n * this.from) : (h = k + n * (1 - this.from), n = k + n * (1 - this.to)), this.shouldUpdateExtremes(d.DOMType) ? a.setExtremes(n, h, !0, "mousemove" === d.DOMType || "touchmove" === d.DOMType ? !1 : void 0, d) :
                  this.setRange(this.from, this.to))
              }))
          });
          u(A, "afterRender", function() {
            let {
              scrollMin: a,
              scrollMax: d
            } = t(this), p = this.scrollbar;
            var m = this.axisTitleMargin + (this.titleOffset || 0),
              k = this.chart.scrollbarsOffsets;
            let v = this.options.margin || 0;
            p && (this.horiz ? (this.opposite || (k[1] += m), p.position(this.left, this.top + this.height + 2 + k[1] - (this.opposite ? v : 0), this.width, this.height), this.opposite || (k[1] += v), m = 1) : (this.opposite && (k[0] += m), p.position(p.options.opposite ? this.left + this.width + 2 + k[0] - (this.opposite ? 0 : v) : this.opposite ?
              0 : v, this.top, this.width, this.height), this.opposite && (k[0] += v), m = 0), k[m] += p.size + (p.options.margin || 0), isNaN(a) || isNaN(d) || !H(this.min) || !H(this.max) || this.min === this.max ? p.setRange(0, 1) : (k = (this.min - a) / (d - a), m = (this.max - a) / (d - a), this.horiz && !this.reversed || !this.horiz && this.reversed ? p.setRange(k, m) : p.setRange(1 - m, 1 - k)))
          });
          u(A, "afterGetOffset", function() {
            const a = this.scrollbar;
            var d = a && !a.options.opposite;
            d = this.horiz ? 2 : d ? 3 : 1;
            a && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[d] += a.size +
              (a.options.margin || 0))
          });
          return A
        }
      }
      return G
    });
  M(a, "Stock/Scrollbar/ScrollbarDefaults.js", [a["Core/Globals.js"]], function(a) {
    return {
      height: 10,
      barBorderRadius: 5,
      buttonBorderRadius: 0,
      buttonsEnabled: !1,
      liveRedraw: void 0,
      margin: void 0,
      minWidth: 6,
      opposite: !0,
      step: .2,
      zIndex: 3,
      barBackgroundColor: "#cccccc",
      barBorderWidth: 0,
      barBorderColor: "#cccccc",
      buttonArrowColor: "#333333",
      buttonBackgroundColor: "#e6e6e6",
      buttonBorderColor: "#cccccc",
      buttonBorderWidth: 1,
      rifleColor: "none",
      trackBackgroundColor: "rgba(255, 255, 255, 0.001)",
      trackBorderColor: "#cccccc",
      trackBorderRadius: 5,
      trackBorderWidth: 1
    }
  });
  M(a, "Stock/Scrollbar/Scrollbar.js", [a["Core/Defaults.js"], a["Core/Globals.js"], a["Core/Axis/ScrollbarAxis.js"], a["Stock/Scrollbar/ScrollbarDefaults.js"], a["Core/Utilities.js"]], function(a, A, H, I, F) {
    const {
      defaultOptions: u
    } = a, {
      addEvent: C,
      correctFloat: B,
      defined: t,
      destroyObjectProperties: r,
      fireEvent: d,
      merge: p,
      pick: m,
      removeEvent: k
    } = F;
    class v {
      static compose(a) {
        H.compose(a, v)
      }
      static swapXY(a, d) {
        d && a.forEach(a => {
          const d = a.length;
          let h;
          for (let e =
              0; e < d; e += 2) h = a[e + 1], "number" === typeof h && (a[e + 1] = a[e + 2], a[e + 2] = h)
        });
        return a
      }
      constructor(a, d, k) {
        this._events = [];
        this.chart = void 0;
        this.from = this.chartY = this.chartX = 0;
        this.scrollbar = this.renderer = this.options = this.group = void 0;
        this.scrollbarButtons = [];
        this.scrollbarGroup = void 0;
        this.scrollbarLeft = 0;
        this.scrollbarRifles = void 0;
        this.scrollbarStrokeWidth = 1;
        this.to = this.size = this.scrollbarTop = 0;
        this.track = void 0;
        this.trackBorderWidth = 1;
        this.userOptions = void 0;
        this.y = this.x = 0;
        this.init(a, d, k)
      }
      addEvents() {
        var a =
          this.options.inverted ? [1, 0] : [0, 1];
        const d = this.scrollbarButtons,
          k = this.scrollbarGroup.element,
          m = this.track.element,
          p = this.mouseDownHandler.bind(this),
          e = this.mouseMoveHandler.bind(this),
          q = this.mouseUpHandler.bind(this);
        a = [
          [d[a[0]].element, "click", this.buttonToMinClick.bind(this)],
          [d[a[1]].element, "click", this.buttonToMaxClick.bind(this)],
          [m, "click", this.trackClick.bind(this)],
          [k, "mousedown", p],
          [k.ownerDocument, "mousemove", e],
          [k.ownerDocument, "mouseup", q]
        ];
        A.hasTouch && a.push([k, "touchstart", p], [k.ownerDocument,
          "touchmove", e
        ], [k.ownerDocument, "touchend", q]);
        a.forEach(function(a) {
          C.apply(null, a)
        });
        this._events = a
      }
      buttonToMaxClick(a) {
        const h = (this.to - this.from) * m(this.options.step, .2);
        this.updatePosition(this.from + h, this.to + h);
        d(this, "changed", {
          from: this.from,
          to: this.to,
          trigger: "scrollbar",
          DOMEvent: a
        })
      }
      buttonToMinClick(a) {
        const h = B(this.to - this.from) * m(this.options.step, .2);
        this.updatePosition(B(this.from - h), B(this.to - h));
        d(this, "changed", {
          from: this.from,
          to: this.to,
          trigger: "scrollbar",
          DOMEvent: a
        })
      }
      cursorToScrollbarPosition(a) {
        var d =
          this.options;
        d = d.minWidth > this.calculatedWidth ? d.minWidth : 0;
        return {
          chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - d),
          chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - d)
        }
      }
      destroy() {
        const a = this,
          d = a.chart.scroller;
        a.removeEvents();
        ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function(d) {
          a[d] && a[d].destroy && (a[d] = a[d].destroy())
        });
        d && a === d.scrollbar && (d.scrollbar = null, r(d.scrollbarButtons))
      }
      drawScrollbarButton(a) {
        const d = this.renderer,
          k = this.scrollbarButtons,
          n = this.options,
          m = this.size;
        var e = d.g().add(this.group);
        k.push(e);
        n.buttonsEnabled && (e = d.rect().addClass("highcharts-scrollbar-button").add(e), this.chart.styledMode || e.attr({
            stroke: n.buttonBorderColor,
            "stroke-width": n.buttonBorderWidth,
            fill: n.buttonBackgroundColor
          }), e.attr(e.crisp({
            x: -.5,
            y: -.5,
            width: m + 1,
            height: m + 1,
            r: n.buttonBorderRadius
          }, e.strokeWidth())), a = d.path(v.swapXY([
            ["M", m / 2 + (a ? -1 : 1), m / 2 - 3],
            ["L", m / 2 + (a ? -1 : 1), m / 2 + 3],
            ["L", m / 2 + (a ? 2 : -2), m / 2]
          ], n.vertical)).addClass("highcharts-scrollbar-arrow").add(k[a]), this.chart.styledMode ||
          a.attr({
            fill: n.buttonArrowColor
          }))
      }
      init(a, d, k) {
        this.scrollbarButtons = [];
        this.renderer = a;
        this.userOptions = d;
        this.options = p(I, u.scrollbar, d);
        this.options.margin = m(this.options.margin, 10);
        this.chart = k;
        this.size = m(this.options.size, this.options.height);
        d.enabled && (this.render(), this.addEvents())
      }
      mouseDownHandler(a) {
        a = this.chart.pointer.normalize(a);
        a = this.cursorToScrollbarPosition(a);
        this.chartX = a.chartX;
        this.chartY = a.chartY;
        this.initPositions = [this.from, this.to];
        this.grabbedCenter = !0
      }
      mouseMoveHandler(a) {
        var h =
          this.chart.pointer.normalize(a),
          k = this.options.vertical ? "chartY" : "chartX";
        const m = this.initPositions || [];
        !this.grabbedCenter || a.touches && 0 === a.touches[0][k] || (h = this.cursorToScrollbarPosition(h)[k], k = this[k], k = h - k, this.hasDragged = !0, this.updatePosition(m[0] + k, m[1] + k), this.hasDragged && d(this, "changed", {
          from: this.from,
          to: this.to,
          trigger: "scrollbar",
          DOMType: a.type,
          DOMEvent: a
        }))
      }
      mouseUpHandler(a) {
        this.hasDragged && d(this, "changed", {
          from: this.from,
          to: this.to,
          trigger: "scrollbar",
          DOMType: a.type,
          DOMEvent: a
        });
        this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null
      }
      position(a, d, k, m) {
        const {
          buttonsEnabled: h,
          margin: e = 0,
          vertical: n
        } = this.options, p = this.rendered ? "animate" : "attr";
        let l = m,
          w = 0;
        this.group.show();
        this.x = a;
        this.y = d + this.trackBorderWidth;
        this.width = k;
        this.height = m;
        this.xOffset = l;
        this.yOffset = w;
        n ? (this.width = this.yOffset = k = this.size, this.xOffset = l = 0, this.yOffset = w = h ? this.size : 0, this.barWidth = m - (h ? 2 * k : 0), this.x = a += e) : (this.height = m = this.size, this.xOffset = l = h ? this.size : 0, this.barWidth = k - (h ? 2 *
          m : 0), this.y += e);
        this.group[p]({
          translateX: a,
          translateY: this.y
        });
        this.track[p]({
          width: k,
          height: m
        });
        this.scrollbarButtons[1][p]({
          translateX: n ? 0 : k - l,
          translateY: n ? m - w : 0
        })
      }
      removeEvents() {
        this._events.forEach(function(a) {
          k.apply(null, a)
        });
        this._events.length = 0
      }
      render() {
        const a = this.renderer,
          d = this.options,
          k = this.size,
          m = this.chart.styledMode,
          p = a.g("scrollbar").attr({
            zIndex: d.zIndex
          }).hide().add();
        this.group = p;
        this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
          r: d.trackBorderRadius || 0,
          height: k,
          width: k
        }).add(p);
        m || this.track.attr({
          fill: d.trackBackgroundColor,
          stroke: d.trackBorderColor,
          "stroke-width": d.trackBorderWidth
        });
        const e = this.trackBorderWidth = this.track.strokeWidth();
        this.track.attr({
          x: -e % 2 / 2,
          y: -e % 2 / 2
        });
        this.scrollbarGroup = a.g().add(p);
        this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
          height: k - e,
          width: k - e,
          r: d.barBorderRadius || 0
        }).add(this.scrollbarGroup);
        this.scrollbarRifles = a.path(v.swapXY([
          ["M", -3, k / 4],
          ["L", -3, 2 * k / 3],
          ["M", 0, k / 4],
          ["L", 0, 2 * k / 3],
          ["M", 3, k / 4],
          ["L",
            3, 2 * k / 3
          ]
        ], d.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
        m || (this.scrollbar.attr({
          fill: d.barBackgroundColor,
          stroke: d.barBorderColor,
          "stroke-width": d.barBorderWidth
        }), this.scrollbarRifles.attr({
          stroke: d.rifleColor,
          "stroke-width": 1
        }));
        this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
        this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
        this.drawScrollbarButton(0);
        this.drawScrollbarButton(1)
      }
      setRange(a, d) {
        const h = this.options,
          k = h.vertical;
        var m = h.minWidth,
          e = this.barWidth;
        const n = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
        if (t(e)) {
          var p = e * Math.min(d, 1);
          a = Math.max(a, 0);
          var l = Math.ceil(e * a);
          this.calculatedWidth = p = B(p - l);
          p < m && (l = (e - m + p) * a, p = m);
          m = Math.floor(l + this.xOffset + this.yOffset);
          e = p / 2 - .5;
          this.from = a;
          this.to = d;
          k ? (this.scrollbarGroup[n]({
              translateY: m
            }), this.scrollbar[n]({
              height: p
            }), this.scrollbarRifles[n]({
              translateY: e
            }), this.scrollbarTop = m, this.scrollbarLeft =
            0) : (this.scrollbarGroup[n]({
            translateX: m
          }), this.scrollbar[n]({
            width: p
          }), this.scrollbarRifles[n]({
            translateX: e
          }), this.scrollbarLeft = m, this.scrollbarTop = 0);
          12 >= p ? this.scrollbarRifles.hide() : this.scrollbarRifles.show();
          !1 === h.showFull && (0 >= a && 1 <= d ? this.group.hide() : this.group.show());
          this.rendered = !0
        }
      }
      shouldUpdateExtremes(a) {
        return m(this.options.liveRedraw, A.svg && !A.isTouchDevice && !this.chart.boosted) || "mouseup" === a || "touchend" === a || !t(a)
      }
      trackClick(a) {
        const h = this.chart.pointer.normalize(a),
          k = this.to -
          this.from,
          m = this.y + this.scrollbarTop,
          n = this.x + this.scrollbarLeft;
        this.options.vertical && h.chartY > m || !this.options.vertical && h.chartX > n ? this.updatePosition(this.from + k, this.to + k) : this.updatePosition(this.from - k, this.to - k);
        d(this, "changed", {
          from: this.from,
          to: this.to,
          trigger: "scrollbar",
          DOMEvent: a
        })
      }
      update(a) {
        this.destroy();
        this.init(this.chart.renderer, p(!0, this.options, a), this.chart)
      }
      updatePosition(a, d) {
        1 < d && (a = B(1 - B(d - a)), d = 1);
        0 > a && (d = B(d - a), a = 0);
        this.from = a;
        this.to = d
      }
    }
    v.defaultOptions = I;
    u.scrollbar =
      p(!0, v.defaultOptions, u.scrollbar);
    return v
  });
  M(a, "Stock/Navigator/Navigator.js", [a["Core/Axis/Axis.js"], a["Core/Defaults.js"], a["Core/Globals.js"], a["Core/Axis/NavigatorAxisComposition.js"], a["Stock/Navigator/NavigatorComposition.js"], a["Stock/Scrollbar/Scrollbar.js"], a["Core/Utilities.js"]], function(a, A, H, I, F, G, C) {
    function u(a, ...c) {
      c = [].filter.call(c, e);
      if (c.length) return Math[a].apply(0, c)
    }
    const {
      defaultOptions: t
    } = A, {
      hasTouch: r,
      isTouchDevice: d
    } = H, {
      addEvent: p,
      clamp: m,
      correctFloat: k,
      defined: v,
      destroyObjectProperties: n,
      erase: h,
      extend: D,
      find: L,
      isArray: E,
      isNumber: e,
      merge: q,
      pick: y,
      removeEvent: l,
      splat: w
    } = C;
    class g {
      static compose(a, c, f) {
        F.compose(a, c, g, f)
      }
      constructor(a) {
        this.rendered = this.range = this.outline = this.opposite = this.navigatorSize = this.navigatorSeries = this.navigatorOptions = this.navigatorGroup = this.navigatorEnabled = this.left = this.height = this.handles = this.chart = this.baseSeries = void 0;
        this.scrollbarHeight = 0;
        this.zoomedMin = this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this.scrollButtonSize =
          void 0;
        this.init(a)
      }
      drawHandle(a, c, f, d) {
        const b = this.navigatorOptions.handles.height;
        this.handles[c][d](f ? {
          translateX: Math.round(this.left + this.height / 2),
          translateY: Math.round(this.top + parseInt(a, 10) + .5 - b)
        } : {
          translateX: Math.round(this.left + parseInt(a, 10)),
          translateY: Math.round(this.top + this.height / 2 - b / 2 - 1)
        })
      }
      drawOutline(a, c, f, d) {
        const b = this.navigatorOptions.maskInside;
        var e = this.outline.strokeWidth();
        const g = e / 2;
        var h = e % 2 / 2;
        const k = this.scrollButtonSize,
          l = this.size,
          m = this.top;
        e = this.height;
        const n =
          m - g,
          q = m + e;
        let p = this.left;
        f ? (f = m + c + h, c = m + a + h, h = [
          ["M", p + e, m - k - h],
          ["L", p + e, f],
          ["L", p, f],
          ["M", p, c],
          ["L", p + e, c],
          ["L", p + e, m + l + k]
        ], b && h.push(["M", p + e, f - g], ["L", p + e, c + g])) : (p -= k, a += p + k - h, c += p + k - h, h = [
          ["M", p, n],
          ["L", a, n],
          ["L", a, q],
          ["M", c, q],
          ["L", c, n],
          ["L", p + l + 2 * k, m + g]
        ], b && h.push(["M", a - g, n], ["L", c + g, n]));
        this.outline[d]({
          d: h
        })
      }
      drawMasks(a, c, f, d) {
        const b = this.left,
          e = this.top,
          g = this.height;
        let h, k, l, m;
        f ? (l = [b, b, b], m = [e, e + a, e + c], k = [g, g, g], h = [a, c - a, this.size - c]) : (l = [b, b + a, b + c], m = [e, e, e], k = [a, c - a, this.size - c],
          h = [g, g, g]);
        this.shades.forEach((a, b) => {
          a[d]({
            x: l[b],
            y: m[b],
            width: k[b],
            height: h[b]
          })
        })
      }
      renderElements() {
        const a = this,
          c = a.navigatorOptions,
          f = c.maskInside,
          d = a.chart,
          e = d.renderer,
          g = {
            cursor: d.inverted ? "ns-resize" : "ew-resize"
          },
          h = a.navigatorGroup = e.g("navigator").attr({
            zIndex: 8,
            visibility: "hidden"
          }).add();
        [!f, f, !f].forEach((b, f) => {
          const k = e.rect().addClass("highcharts-navigator-mask" + (1 === f ? "-inside" : "-outside")).add(h);
          d.styledMode || (k.attr({
            fill: b ? c.maskFill : "rgba(0,0,0,0)"
          }), 1 === f && k.css(g));
          a.shades[f] =
            k
        });
        a.outline = e.path().addClass("highcharts-navigator-outline").add(h);
        d.styledMode || a.outline.attr({
          "stroke-width": c.outlineWidth,
          stroke: c.outlineColor
        });
        if (c.handles && c.handles.enabled) {
          const b = c.handles,
            {
              height: f,
              width: k
            } = b;
          [0, 1].forEach(c => {
            a.handles[c] = e.symbol(b.symbols[c], -k / 2 - 1, 0, k, f, b);
            d.inverted && a.handles[c].attr({
              rotation: 90,
              rotationOriginX: Math.floor(-k / 2),
              rotationOriginY: (f + k) / 2
            });
            a.handles[c].attr({
              zIndex: 7 - c
            }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left",
              "right"
            ][c]).add(h);
            d.styledMode || a.handles[c].attr({
              fill: b.backgroundColor,
              stroke: b.borderColor,
              "stroke-width": b.lineWidth
            }).css(g)
          })
        }
      }
      update(a) {
        (this.series || []).forEach(a => {
          a.baseSeries && delete a.baseSeries.navigatorSeries
        });
        this.destroy();
        q(!0, this.chart.options.navigator, a);
        this.init(this.chart)
      }
      render(a, c, f, d) {
        var b = this.chart;
        const g = this.xAxis,
          h = g.pointRange || 0;
        var l = g.navigatorAxis.fake ? b.xAxis[0] : g;
        const n = this.navigatorEnabled;
        var p = this.rendered,
          q = b.inverted;
        const x = b.xAxis[0].minRange,
          w = b.xAxis[0].options.maxRange,
          r = this.scrollButtonSize;
        let t = this.scrollbarHeight,
          u;
        if (!this.hasDragged || v(f)) {
          a = k(a - h / 2);
          c = k(c + h / 2);
          if (!e(a) || !e(c))
            if (p) f = 0, d = y(g.width, l.width);
            else return;
          this.left = y(g.left, b.plotLeft + r + (q ? b.plotWidth : 0));
          var B = this.size = u = y(g.len, (q ? b.plotHeight : b.plotWidth) - 2 * r);
          b = q ? t : u + 2 * r;
          f = y(f, g.toPixels(a, !0));
          d = y(d, g.toPixels(c, !0));
          e(f) && Infinity !== Math.abs(f) || (f = 0, d = b);
          a = g.toValue(f, !0);
          c = g.toValue(d, !0);
          var A = Math.abs(k(c - a));
          A < x ? this.grabbedLeft ? f = g.toPixels(c - x - h, !0) :
            this.grabbedRight && (d = g.toPixels(a + x + h, !0)) : v(w) && k(A - h) > w && (this.grabbedLeft ? f = g.toPixels(c - w - h, !0) : this.grabbedRight && (d = g.toPixels(a + w + h, !0)));
          this.zoomedMax = m(Math.max(f, d), 0, B);
          this.zoomedMin = m(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(f, d), 0, B);
          this.range = this.zoomedMax - this.zoomedMin;
          B = Math.round(this.zoomedMax);
          f = Math.round(this.zoomedMin);
          n && (this.navigatorGroup.attr({
            visibility: "inherit"
          }), p = p && !this.hasDragged ? "animate" : "attr", this.drawMasks(f, B, q, p), this.drawOutline(f, B,
            q, p), this.navigatorOptions.handles.enabled && (this.drawHandle(f, 0, q, p), this.drawHandle(B, 1, q, p)));
          this.scrollbar && (q ? (q = this.top - r, l = this.left - t + (n || !l.opposite ? 0 : (l.titleOffset || 0) + l.axisTitleMargin), t = u + 2 * r) : (q = this.top + (n ? this.height : -t), l = this.left - r), this.scrollbar.position(l, q, b, t), this.scrollbar.setRange(this.zoomedMin / (u || 1), this.zoomedMax / (u || 1)));
          this.rendered = !0
        }
      }
      addMouseEvents() {
        const a = this,
          c = a.chart,
          f = c.container;
        let d = [],
          e, g;
        a.mouseMoveHandler = e = function(b) {
          a.onMouseMove(b)
        };
        a.mouseUpHandler =
          g = function(b) {
            a.onMouseUp(b)
          };
        d = a.getPartsEvents("mousedown");
        d.push(p(c.renderTo, "mousemove", e), p(f.ownerDocument, "mouseup", g));
        r && (d.push(p(c.renderTo, "touchmove", e), p(f.ownerDocument, "touchend", g)), d.concat(a.getPartsEvents("touchstart")));
        a.eventsToUnbind = d;
        a.series && a.series[0] && d.push(p(a.series[0].xAxis, "foundExtremes", function() {
          c.navigator.modifyNavigatorAxisExtremes()
        }))
      }
      getPartsEvents(a) {
        const b = this,
          f = [];
        ["shades", "handles"].forEach(function(c) {
          b[c].forEach(function(d, e) {
            f.push(p(d.element,
              a,
              function(a) {
                b[c + "Mousedown"](a, e)
              }))
          })
        });
        return f
      }
      shadesMousedown(a, c) {
        a = this.chart.pointer.normalize(a);
        const b = this.chart,
          d = this.xAxis,
          e = this.zoomedMin,
          g = this.size,
          h = this.range;
        let k = this.left,
          l = a.chartX,
          m, n;
        b.inverted && (l = a.chartY, k = this.top);
        1 === c ? (this.grabbedCenter = l, this.fixedWidth = h, this.dragOffset = l - e) : (a = l - k - h / 2, 0 === c ? a = Math.max(0, a) : 2 === c && a + h >= g && (a = g - h, this.reversedExtremes ? (a -= h, n = this.getUnionExtremes().dataMin) : m = this.getUnionExtremes().dataMax), a !== e && (this.fixedWidth = h, c = d.navigatorAxis.toFixedRange(a,
          a + h, n, m), v(c.min) && b.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c.max), !0, null, {
          trigger: "navigator"
        })))
      }
      handlesMousedown(a, c) {
        this.chart.pointer.normalize(a);
        a = this.chart;
        const b = a.xAxis[0],
          d = this.reversedExtremes;
        0 === c ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = d ? b.min : b.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = d ? b.max : b.min);
        a.fixedRange = null
      }
      onMouseMove(a) {
        const b = this;
        var f = b.chart;
        const e = b.navigatorSize,
          g = b.range,
          h = b.dragOffset,
          k = f.inverted;
        let l = b.left;
        a.touches && 0 === a.touches[0].pageX || (a = f.pointer.normalize(a), f = a.chartX, k && (l = b.top, f = a.chartY), b.grabbedLeft ? (b.hasDragged = !0, b.render(0, 0, f - l, b.otherHandlePos)) : b.grabbedRight ? (b.hasDragged = !0, b.render(0, 0, b.otherHandlePos, f - l)) : b.grabbedCenter && (b.hasDragged = !0, f < h ? f = h : f > e + h - g && (f = e + h - g), b.render(0, 0, f - h, f - h + g)), b.hasDragged && b.scrollbar && y(b.scrollbar.options.liveRedraw, !d && !this.chart.boosted) && (a.DOMType = a.type, setTimeout(function() {
          b.onMouseUp(a)
        }, 0)))
      }
      onMouseUp(a) {
        var b =
          this.chart,
          f = this.xAxis,
          d = this.scrollbar;
        const g = a.DOMEvent || a,
          h = b.inverted,
          k = this.rendered && !this.hasDragged ? "animate" : "attr";
        let l, m;
        (!this.hasDragged || d && d.hasDragged) && "scrollbar" !== a.trigger || (d = this.getUnionExtremes(), this.zoomedMin === this.otherHandlePos ? l = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (m = this.fixedExtreme), this.zoomedMax === this.size && (m = this.reversedExtremes ? d.dataMin : d.dataMax), 0 === this.zoomedMin && (l = this.reversedExtremes ? d.dataMax : d.dataMin), f = f.navigatorAxis.toFixedRange(this.zoomedMin,
          this.zoomedMax, l, m), v(f.min) && b.xAxis[0].setExtremes(Math.min(f.min, f.max), Math.max(f.min, f.max), !0, this.hasDragged ? !1 : null, {
          trigger: "navigator",
          triggerOp: "navigator-drag",
          DOMEvent: g
        }));
        "mousemove" !== a.DOMType && "touchmove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null);
        this.navigatorEnabled && e(this.zoomedMin) && e(this.zoomedMax) && (b = Math.round(this.zoomedMin), a = Math.round(this.zoomedMax),
          this.shades && this.drawMasks(b, a, h, k), this.outline && this.drawOutline(b, a, h, k), this.navigatorOptions.handles.enabled && Object.keys(this.handles).length === this.handles.length && (this.drawHandle(b, 0, h, k), this.drawHandle(a, 1, h, k)))
      }
      removeEvents() {
        this.eventsToUnbind && (this.eventsToUnbind.forEach(function(a) {
          a()
        }), this.eventsToUnbind = void 0);
        this.removeBaseSeriesEvents()
      }
      removeBaseSeriesEvents() {
        const a = this.baseSeries || [];
        this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && a.forEach(function(a) {
          l(a,
            "updatedData", this.updatedDataHandler)
        }, this), a[0].xAxis && l(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
      }
      init(b) {
        var c = b.options,
          d = c.navigator || {},
          g = d.enabled,
          h = c.scrollbar || {},
          k = h.enabled;
        c = g && d.height || 0;
        var l = k && h.height || 0;
        const m = h.buttonsEnabled && l || 0;
        this.handles = [];
        this.shades = [];
        this.chart = b;
        this.setBaseSeries();
        this.height = c;
        this.scrollbarHeight = l;
        this.scrollButtonSize = m;
        this.scrollbarEnabled = k;
        this.navigatorEnabled = g;
        this.navigatorOptions = d;
        this.scrollbarOptions = h;
        this.opposite =
          y(d.opposite, !(g || !b.inverted));
        const n = this;
        g = n.baseSeries;
        h = b.xAxis.length;
        k = b.yAxis.length;
        l = g && g[0] && g[0].xAxis || b.xAxis[0] || {
          options: {}
        };
        b.isDirtyBox = !0;
        n.navigatorEnabled ? (n.xAxis = new a(b, q({
            breaks: l.options.breaks,
            ordinal: l.options.ordinal
          }, d.xAxis, {
            id: "navigator-x-axis",
            yAxis: "navigator-y-axis",
            isX: !0,
            type: "datetime",
            index: h,
            isInternal: !0,
            offset: 0,
            keepOrdinalPadding: !0,
            startOnTick: !1,
            endOnTick: !1,
            minPadding: 0,
            maxPadding: 0,
            zoomEnabled: !1
          }, b.inverted ? {
            offsets: [m, 0, -m, 0],
            width: c
          } : {
            offsets: [0,
              -m, 0, m
            ],
            height: c
          })), n.yAxis = new a(b, q(d.yAxis, {
            id: "navigator-y-axis",
            alignTicks: !1,
            offset: 0,
            index: k,
            isInternal: !0,
            reversed: y(d.yAxis && d.yAxis.reversed, b.yAxis[0] && b.yAxis[0].reversed, !1),
            zoomEnabled: !1
          }, b.inverted ? {
            width: c
          } : {
            height: c
          })), g || d.series.data ? n.updateNavigatorSeries(!1) : 0 === b.series.length && (n.unbindRedraw = p(b, "beforeRedraw", function() {
            0 < b.series.length && !n.series && (n.setBaseSeries(), n.unbindRedraw())
          })), n.reversedExtremes = b.inverted && !n.xAxis.reversed || !b.inverted && n.xAxis.reversed, n.renderElements(),
          n.addMouseEvents()) : (n.xAxis = {
          chart: b,
          navigatorAxis: {
            fake: !0
          },
          translate: function(a, c) {
            var d = b.xAxis[0];
            const f = d.getExtremes(),
              e = d.len - 2 * m,
              g = u("min", d.options.min, f.dataMin);
            d = u("max", d.options.max, f.dataMax) - g;
            return c ? a * d / e + g : e * (a - g) / d
          },
          toPixels: function(a) {
            return this.translate(a)
          },
          toValue: function(a) {
            return this.translate(a, !0)
          }
        }, n.xAxis.navigatorAxis.axis = n.xAxis, n.xAxis.navigatorAxis.toFixedRange = I.prototype.toFixedRange.bind(n.xAxis.navigatorAxis));
        b.options.scrollbar.enabled && (d = q(b.options.scrollbar, {
          vertical: b.inverted
        }), !e(d.margin) && n.navigatorEnabled && (d.margin = b.inverted ? -3 : 3), b.scrollbar = n.scrollbar = new G(b.renderer, d, b), p(n.scrollbar, "changed", function(a) {
          var b = n.size;
          const c = b * this.to;
          b *= this.from;
          n.hasDragged = n.scrollbar.hasDragged;
          n.render(0, 0, b, c);
          this.shouldUpdateExtremes(a.DOMType) && setTimeout(function() {
            n.onMouseUp(a)
          })
        }));
        n.addBaseSeriesEvents();
        n.addChartEvents()
      }
      getUnionExtremes(a) {
        const b = this.chart.xAxis[0],
          d = this.xAxis,
          e = d.options,
          g = b.options;
        let h;
        a && null === b.dataMin || (h = {
          dataMin: y(e && e.min, u("min", g.min, b.dataMin, d.dataMin, d.min)),
          dataMax: y(e && e.max, u("max", g.max, b.dataMax, d.dataMax, d.max))
        });
        return h
      }
      setBaseSeries(a, c) {
        const b = this.chart,
          d = this.baseSeries = [];
        a = a || b.options && b.options.navigator.baseSeries || (b.series.length ? L(b.series, a => !a.options.isInternal).index : 0);
        (b.series || []).forEach((b, c) => {
          b.options.isInternal || !b.options.showInNavigator && (c !== a && b.options.id !== a || !1 === b.options.showInNavigator) || d.push(b)
        });
        this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(!0,
          c)
      }
      updateNavigatorSeries(a, c) {
        const b = this,
          d = b.chart,
          e = b.baseSeries,
          g = {
            enableMouseTracking: !1,
            index: null,
            linkedTo: null,
            group: "nav",
            padXAxis: !1,
            xAxis: "navigator-x-axis",
            yAxis: "navigator-y-axis",
            showInLegend: !1,
            stacking: void 0,
            isInternal: !0,
            states: {
              inactive: {
                opacity: 1
              }
            }
          },
          h = b.series = (b.series || []).filter(a => {
            const c = a.baseSeries;
            return 0 > e.indexOf(c) ? (c && (l(c, "updatedData", b.updatedDataHandler), delete c.navigatorSeries), a.chart && a.destroy(), !1) : !0
          });
        let k, m, n = b.navigatorOptions.series,
          p;
        e && e.length &&
          e.forEach(a => {
            const f = a.navigatorSeries;
            var l = D({
              color: a.color,
              visible: a.visible
            }, E(n) ? t.navigator.series : n);
            f && !1 === b.navigatorOptions.adaptToUpdatedData || (g.name = "Navigator " + e.length, k = a.options || {}, p = k.navigatorOptions || {}, l.dataLabels = w(l.dataLabels), m = q(k, g, l, p), m.pointRange = y(l.pointRange, p.pointRange, t.plotOptions[m.type || "line"].pointRange), l = p.data || l.data, b.hasNavigatorData = b.hasNavigatorData || !!l, m.data = l || k.data && k.data.slice(0), f && f.options ? f.update(m, c) : (a.navigatorSeries = d.initSeries(m),
              a.navigatorSeries.baseSeries = a, h.push(a.navigatorSeries)))
          });
        if (n.data && (!e || !e.length) || E(n)) b.hasNavigatorData = !1, n = w(n), n.forEach((a, c) => {
          g.name = "Navigator " + (h.length + 1);
          m = q(t.navigator.series, {
            color: d.series[c] && !d.series[c].options.isInternal && d.series[c].color || d.options.colors[c] || d.options.colors[0]
          }, g, a);
          m.data = a.data;
          m.data && (b.hasNavigatorData = !0, h.push(d.initSeries(m)))
        });
        a && this.addBaseSeriesEvents()
      }
      addBaseSeriesEvents() {
        const a = this,
          c = a.baseSeries || [];
        c[0] && c[0].xAxis && c[0].eventsToUnbind.push(p(c[0].xAxis,
          "foundExtremes", this.modifyBaseAxisExtremes));
        c.forEach(b => {
          b.eventsToUnbind.push(p(b, "show", function() {
            this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1)
          }));
          b.eventsToUnbind.push(p(b, "hide", function() {
            this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
          }));
          !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && b.eventsToUnbind.push(p(b, "updatedData", this.updatedDataHandler));
          b.eventsToUnbind.push(p(b, "remove", function() {
            this.navigatorSeries && (h(a.series, this.navigatorSeries), v(this.navigatorSeries.options) &&
              this.navigatorSeries.remove(!1), delete this.navigatorSeries)
          }))
        })
      }
      getBaseSeriesMin(a) {
        return this.baseSeries.reduce(function(a, b) {
          return Math.min(a, b.xData && b.xData.length ? b.xData[0] : a)
        }, a)
      }
      modifyNavigatorAxisExtremes() {
        const a = this.xAxis;
        if ("undefined" !== typeof a.getExtremes) {
          const b = this.getUnionExtremes(!0);
          !b || b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax)
        }
      }
      modifyBaseAxisExtremes() {
        const a = this.chart.navigator;
        var c = this.getExtremes();
        const d = c.dataMin,
          g = c.dataMax;
        c = c.max -
          c.min;
        const h = a.stickToMin,
          k = a.stickToMax,
          l = y(this.options.overscroll, 0),
          m = a.series && a.series[0],
          n = !!this.setExtremes;
        let p, q;
        this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (h && (q = d, p = q + c), k && (p = g + l, h || (q = Math.max(d, p - c, a.getBaseSeriesMin(m && m.xData ? m.xData[0] : -Number.MAX_VALUE)))), n && (h || k) && e(q) && (this.min = this.userMin = q, this.max = this.userMax = p));
        a.stickToMin = a.stickToMax = null
      }
      updatedDataHandler() {
        const a = this.chart.navigator,
          c = this.navigatorSeries;
        a.stickToMax = y(this.chart.options.navigator &&
          this.chart.options.navigator.stickToMax, a.reversedExtremes ? 0 === Math.round(a.zoomedMin) : Math.round(a.zoomedMax) >= Math.round(a.size));
        a.stickToMin = a.shouldStickToMin(this, a);
        c && !a.hasNavigatorData && (c.options.pointStart = this.xData[0], c.setData(this.options.data, !1, null, !1))
      }
      shouldStickToMin(a, c) {
        c = c.getBaseSeriesMin(a.xData[0]);
        var b = a.xAxis;
        a = b.max;
        const d = b.min;
        b = b.options.range;
        return e(a) && e(d) ? b && 0 < a - c ? a - c < b : d <= c : !1
      }
      addChartEvents() {
        this.eventsToUnbind || (this.eventsToUnbind = []);
        this.eventsToUnbind.push(p(this.chart,
          "redraw",
          function() {
            const a = this.navigator,
              c = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || this.xAxis[0]);
            c && a.render(c.min, c.max)
          }), p(this.chart, "getMargins", function() {
          let a = this.navigator,
            c = a.opposite ? "plotTop" : "marginBottom";
          this.inverted && (c = a.opposite ? "marginRight" : "plotLeft");
          this[c] = (this[c] || 0) + (a.navigatorEnabled || !this.inverted ? a.height + a.scrollbarHeight : 0) + a.navigatorOptions.margin
        }))
      }
      destroy() {
        this.removeEvents();
        this.xAxis && (h(this.chart.xAxis, this.xAxis), h(this.chart.axes,
          this.xAxis));
        this.yAxis && (h(this.chart.yAxis, this.yAxis), h(this.chart.axes, this.yAxis));
        (this.series || []).forEach(a => {
          a.destroy && a.destroy()
        });
        "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(a => {
          this[a] && this[a].destroy && this[a].destroy();
          this[a] = null
        });
        [this.handles].forEach(a => {
          n(a)
        })
      }
    }
    return g
  });
  M(a, "Stock/RangeSelector/RangeSelectorDefaults.js", [], function() {
    return {
      lang: {
        rangeSelectorZoom: "Zoom",
        rangeSelectorFrom: "",
        rangeSelectorTo: "\u2192"
      },
      rangeSelector: {
        allButtonsEnabled: !1,
        buttons: void 0,
        buttonSpacing: 5,
        dropdown: "responsive",
        enabled: void 0,
        verticalAlign: "top",
        buttonTheme: {
          width: 28,
          height: 18,
          padding: 2,
          zIndex: 7
        },
        floating: !1,
        x: 0,
        y: 0,
        height: void 0,
        inputBoxBorderColor: "none",
        inputBoxHeight: 17,
        inputBoxWidth: void 0,
        inputDateFormat: "%e %b %Y",
        inputDateParser: void 0,
        inputEditDateFormat: "%Y-%m-%d",
        inputEnabled: !0,
        inputPosition: {
          align: "right",
          x: 0,
          y: 0
        },
        inputSpacing: 5,
        selected: void 0,
        buttonPosition: {
          align: "left",
          x: 0,
          y: 0
        },
        inputStyle: {
          color: "#334eff",
          cursor: "pointer",
          fontSize: "0.8em"
        },
        labelStyle: {
          color: "#666666",
          fontSize: "0.8em"
        }
      }
    }
  });
  M(a, "Stock/RangeSelector/RangeSelectorComposition.js", [a["Core/Defaults.js"], a["Stock/RangeSelector/RangeSelectorDefaults.js"], a["Core/Utilities.js"]], function(a, A, H) {
    function u() {
      const a = this.range,
        d = a.type,
        e = this.max,
        b = this.chart.time,
        c = function(a, c) {
          const f = "year" === d ? "FullYear" : "Month",
            e = new b.Date(a),
            g = b.get(f, e);
          b.set(f, e, g + c);
          g === b.get(f, e) && b.set("Date", e, 0);
          return e.getTime() -
            a
        };
      let f, h;
      D(a) ? (f = e - a, h = a) : a && (f = e + c(e, -(a.count || 1)), this.chart && (this.chart.fixedRange = e - f));
      const k = E(this.dataMin, Number.MIN_VALUE);
      D(f) || (f = k);
      f <= k && (f = k, "undefined" === typeof h && (h = c(f, a.count)), this.newMax = Math.min(f + h, E(this.dataMax, Number.MAX_VALUE)));
      D(e) ? !D(a) && a && a._offsetMin && (f += a._offsetMin) : f = void 0;
      return f
    }

    function F() {
      this.options.rangeSelector && this.options.rangeSelector.enabled && (this.rangeSelector = new y(this))
    }

    function G() {
      var a = this.axes;
      const d = this.rangeSelector;
      d && (D(d.deferredYTDClick) &&
        (d.clickButton(d.deferredYTDClick), delete d.deferredYTDClick), a.forEach(a => {
          a.updateNames();
          a.setScale()
        }), this.getAxisMargins(), d.render(), a = d.options.verticalAlign, d.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)))
    }

    function C(a) {
      let d, g, b, c;
      const f = a.rangeSelector,
        l = () => {
          f && (d = a.xAxis[0].getExtremes(), g = a.legend, c = f && f.options.verticalAlign, D(d.min) && f.render(d.min, d.max), g.display && "top" === c && c === g.options.verticalAlign && (b = L(a.spacingBox), b.y =
            "vertical" === g.options.layout ? a.plotTop : b.y + f.getHeight(), g.group.placed = !1, g.align(b)))
        };
      f && (h(e, b => b[0] === a) || e.push([a, [k(a.xAxis[0], "afterSetExtremes", function(a) {
        f && f.render(a.min, a.max)
      }), k(a, "redraw", l)]]), l())
    }

    function B() {
      for (let a = 0, d = e.length; a < d; ++a) {
        const d = e[a];
        if (d[0] === this) {
          d[1].forEach(a => a());
          e.splice(a, 1);
          break
        }
      }
    }

    function t() {
      var a = this.rangeSelector;
      a && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a))
    }

    function r() {
      var a = this.rangeSelector;
      a && !a.options.floating && (a.render(), a = a.options.verticalAlign, "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))
    }

    function d(a) {
      var d = a.options.rangeSelector;
      a = this.extraBottomMargin;
      const e = this.extraTopMargin;
      let b = this.rangeSelector;
      d && d.enabled && !v(b) && this.options.rangeSelector && (this.options.rangeSelector.enabled = !0, this.rangeSelector = b = new y(this));
      this.extraTopMargin = this.extraBottomMargin = !1;
      b && (C(this), d = d && d.verticalAlign || b.options && b.options.verticalAlign, b.options.floating ||
        ("bottom" === d ? this.extraBottomMargin = !0 : "middle" !== d && (this.extraTopMargin = !0)), this.extraBottomMargin !== a || this.extraTopMargin !== e) && (this.isDirtyBox = !0)
    }
    const {
      defaultOptions: p,
      setOptions: m
    } = a, {
      addEvent: k,
      defined: v,
      extend: n,
      find: h,
      isNumber: D,
      merge: L,
      pick: E
    } = H, e = [], q = [];
    let y;
    return {
      compose: function(a, e, g) {
        y = g;
        H.pushUnique(q, a) && (a.prototype.minFromRange = u);
        H.pushUnique(q, e) && (k(e, "afterGetContainer", F), k(e, "beforeRender", G), k(e, "destroy", B), k(e, "getMargins", t), k(e, "render", r), k(e, "update", d), e.prototype.callbacks.push(C));
        H.pushUnique(q, m) && (n(p, {
          rangeSelector: A.rangeSelector
        }), n(p.lang, A.lang))
      }
    }
  });
  M(a, "Stock/RangeSelector/RangeSelector.js", [a["Core/Axis/Axis.js"], a["Core/Defaults.js"], a["Core/Globals.js"], a["Stock/RangeSelector/RangeSelectorComposition.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function(a, A, H, I, F, G) {
    function u(a) {
      if (-1 !== a.indexOf("%L")) return "text";
      const d = "aAdewbBmoyY".split("").some(b => -1 !== a.indexOf("%" + b)),
        b = "HkIlMS".split("").some(b => -1 !== a.indexOf("%" + b));
      return d &&
        b ? "datetime-local" : d ? "date" : b ? "time" : "text"
    }
    const {
      defaultOptions: B
    } = A, {
      addEvent: t,
      createElement: r,
      css: d,
      defined: p,
      destroyObjectProperties: m,
      discardElement: k,
      extend: v,
      fireEvent: n,
      isNumber: h,
      merge: D,
      objectEach: L,
      pad: E,
      pick: e,
      pInt: q,
      splat: y
    } = G;
    class l {
      static compose(a, d) {
        I.compose(a, d, l)
      }
      constructor(a) {
        this.buttons = void 0;
        this.buttonOptions = l.prototype.defaultButtons;
        this.initialButtonGroupWidth = 0;
        this.options = void 0;
        this.chart = a;
        this.init(a)
      }
      clickButton(d, g) {
        const b = this.chart,
          c = this.buttonOptions[d],
          f = b.xAxis[0];
        var k = b.scroller && b.scroller.getUnionExtremes() || f || {},
          l = c.type;
        const m = c.dataGrouping;
        let q = k.dataMin,
          r = k.dataMax,
          w, u = f && Math.round(Math.min(f.max, e(r, f.max))),
          v;
        k = c._range;
        let B, A, E, C = !0;
        if (null !== q && null !== r) {
          b.fixedRange = k;
          this.setSelected(d);
          m && (this.forcedDataGrouping = !0, a.prototype.setDataGrouping.call(f || {
            chart: this.chart
          }, m, !1), this.frozenStates = c.preserveDataGrouping);
          if ("month" === l || "year" === l) f ? (l = {
              range: c,
              max: u,
              chart: b,
              dataMin: q,
              dataMax: r
            }, w = f.minFromRange.call(l), h(l.newMax) &&
            (u = l.newMax), C = !1) : k = c;
          else if (k) w = Math.max(u - k, q), u = Math.min(w + k, r), C = !1;
          else if ("ytd" === l)
            if (f) {
              if ("undefined" === typeof r || "undefined" === typeof q) q = Number.MAX_VALUE, r = Number.MIN_VALUE, b.series.forEach(a => {
                if (a = a.xData) q = Math.min(a[0], q), r = Math.max(a[a.length - 1], r)
              }), g = !1;
              l = this.getYTDExtremes(r, q, b.time.useUTC);
              w = B = l.min;
              u = l.max
            } else {
              this.deferredYTDClick = d;
              return
            }
          else "all" === l && f && (b.navigator && b.navigator.baseSeries[0] && (b.navigator.baseSeries[0].xAxis.options.range = void 0), w = q, u = r);
          C && c._offsetMin &&
            p(w) && (w += c._offsetMin);
          c._offsetMax && p(u) && (u += c._offsetMax);
          this.dropdown && (this.dropdown.selectedIndex = d + 1);
          f ? f.setExtremes(w, u, e(g, !0), void 0, {
            trigger: "rangeSelectorButton",
            rangeSelectorButton: c
          }) : (v = y(b.options.xAxis)[0], E = v.range, v.range = k, A = v.min, v.min = B, t(b, "load", function() {
            v.range = E;
            v.min = A
          }));
          n(this, "afterBtnClick")
        }
      }
      setSelected(a) {
        this.selected = this.options.selected = a
      }
      init(a) {
        const d = this,
          b = a.options.rangeSelector,
          c = b.buttons || d.defaultButtons.slice(),
          f = b.selected,
          e = function() {
            const a =
              d.minInput,
              b = d.maxInput;
            a && a.blur && n(a, "blur");
            b && b.blur && n(b, "blur")
          };
        d.chart = a;
        d.options = b;
        d.buttons = [];
        d.buttonOptions = c;
        this.eventsToUnbind = [];
        this.eventsToUnbind.push(t(a.container, "mousedown", e));
        this.eventsToUnbind.push(t(a, "resize", e));
        c.forEach(d.computeButtonRange);
        "undefined" !== typeof f && c[f] && this.clickButton(f, !1);
        this.eventsToUnbind.push(t(a, "load", function() {
          a.xAxis && a.xAxis[0] && t(a.xAxis[0], "setExtremes", function(b) {
            this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== b.trigger &&
              "updatedData" !== b.trigger && d.forcedDataGrouping && !d.frozenStates && this.setDataGrouping(!1, !1)
          })
        }))
      }
      updateButtonStates() {
        const a = this;
        var d = this.chart;
        const b = this.dropdown,
          c = d.xAxis[0],
          f = Math.round(c.max - c.min),
          e = !c.hasVisibleSeries,
          k = d.scroller && d.scroller.getUnionExtremes() || c,
          l = k.dataMin,
          m = k.dataMax;
        d = a.getYTDExtremes(m, l, d.time.useUTC);
        const n = d.min,
          q = d.max,
          p = a.selected,
          r = a.options.allButtonsEnabled,
          t = a.buttons;
        let u = h(p);
        a.buttonOptions.forEach((d, g) => {
          var h = d._range,
            k = d.type,
            x = d.count || 1;
          const w =
            t[g],
            v = d._offsetMax - d._offsetMin,
            z = g === p,
            y = h > m - l,
            B = h < c.minRange;
          d = 0;
          let A = !1,
            J = !1;
          h = h === f;
          ("month" === k || "year" === k) && f + 36E5 >= 864E5 * {
            month: 28,
            year: 365
          } [k] * x - v && f - 36E5 <= 864E5 * {
            month: 31,
            year: 366
          } [k] * x + v ? h = !0 : "ytd" === k ? (h = q - n + v === f, A = !z) : "all" === k && (h = c.max - c.min >= m - l, J = !z && u && h);
          k = !r && (y || B || J || e);
          x = z && h || h && !u && !A || z && a.frozenStates;
          k ? d = 3 : x && (u = !0, d = 2);
          w.state !== d && (w.setState(d), b && (b.options[g + 1].disabled = k, 2 === d && (b.selectedIndex = g + 1)), 0 === d && p === g && a.setSelected())
        })
      }
      computeButtonRange(a) {
        const d =
          a.type,
          b = a.count || 1,
          c = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5
          };
        if (c[d]) a._range = c[d] * b;
        else if ("month" === d || "year" === d) a._range = 864E5 * {
          month: 30,
          year: 365
        } [d] * b;
        a._offsetMin = e(a.offsetMin, 0);
        a._offsetMax = e(a.offsetMax, 0);
        a._range += a._offsetMax - a._offsetMin
      }
      getInputValue(a) {
        a = "min" === a ? this.minInput : this.maxInput;
        const d = this.chart.options.rangeSelector,
          b = this.chart.time;
        return a ? ("text" === a.type && d.inputDateParser || this.defaultInputDateParser)(a.value, b.useUTC, b) : 0
      }
      setInputValue(a,
        d) {
        const b = this.options,
          c = this.chart.time,
          f = "min" === a ? this.minInput : this.maxInput;
        a = "min" === a ? this.minDateBox : this.maxDateBox;
        if (f) {
          var e = f.getAttribute("data-hc-time");
          e = p(e) ? Number(e) : void 0;
          p(d) && (p(e) && f.setAttribute("data-hc-time-previous", e), f.setAttribute("data-hc-time", d), e = d);
          f.value = c.dateFormat(this.inputTypeFormats[f.type] || b.inputEditDateFormat, e);
          a && a.attr({
            text: c.dateFormat(b.inputDateFormat, e)
          })
        }
      }
      setInputExtremes(a, d, b) {
        if (a = "min" === a ? this.minInput : this.maxInput) {
          const c = this.inputTypeFormats[a.type],
            f = this.chart.time;
          c && (d = f.dateFormat(c, d), a.min !== d && (a.min = d), b = f.dateFormat(c, b), a.max !== b && (a.max = b))
        }
      }
      showInput(a) {
        const e = "min" === a ? this.minDateBox : this.maxDateBox;
        if ((a = "min" === a ? this.minInput : this.maxInput) && e && this.inputGroup) {
          const b = "text" === a.type,
            {
              translateX: c,
              translateY: f
            } = this.inputGroup,
            {
              inputBoxWidth: g
            } = this.options;
          d(a, {
            width: b ? e.width + (g ? -2 : 20) + "px" : "auto",
            height: e.height - 2 + "px",
            border: "2px solid silver"
          });
          b && g ? d(a, {
            left: c + e.x + "px",
            top: f + "px"
          }) : d(a, {
            left: Math.min(Math.round(e.x +
              c - (a.offsetWidth - e.width) / 2), this.chart.chartWidth - a.offsetWidth) + "px",
            top: f - (a.offsetHeight - e.height) / 2 + "px"
          })
        }
      }
      hideInput(a) {
        (a = "min" === a ? this.minInput : this.maxInput) && d(a, {
          top: "-9999em",
          border: 0,
          width: "1px",
          height: "1px"
        })
      }
      defaultInputDateParser(a, d, b) {
        var c = a.split("/").join("-").split(" ").join("T"); - 1 === c.indexOf("T") && (c += "T00:00");
        if (d) c += "Z";
        else {
          var e;
          if (e = H.isSafari) e = c, e = !(6 < e.length && (e.lastIndexOf("-") === e.length - 6 || e.lastIndexOf("+") === e.length - 6));
          e && (e = (new Date(c)).getTimezoneOffset() /
            60, c += 0 >= e ? `+${E(-e)}:00` : `-${E(e)}:00`)
        }
        c = Date.parse(c);
        h(c) || (a = a.split("-"), c = Date.UTC(q(a[0]), q(a[1]) - 1, q(a[2])));
        b && d && h(c) && (c += b.getTimezoneOffset(c));
        return c
      }
      drawInput(a) {
        function e() {
          const {
            maxInput: c,
            minInput: d
          } = k, e = b.xAxis[0];
          var f = b.scroller && b.scroller.xAxis ? b.scroller.xAxis : e;
          const g = f.dataMin;
          f = f.dataMax;
          let l = k.getInputValue(a);
          l !== Number(t.getAttribute("data-hc-time-previous")) && h(l) && (t.setAttribute("data-hc-time-previous", l), q && c && h(g) ? l > Number(c.getAttribute("data-hc-time")) ?
            l = void 0 : l < g && (l = g) : d && h(f) && (l < Number(d.getAttribute("data-hc-time")) ? l = void 0 : l > f && (l = f)), "undefined" !== typeof l && e.setExtremes(q ? l : e.min, q ? e.max : l, void 0, void 0, {
              trigger: "rangeSelectorInput"
            }))
        }
        const {
          chart: b,
          div: c,
          inputGroup: f
        } = this, k = this, l = b.renderer.style || {};
        var m = b.renderer;
        const n = b.options.rangeSelector,
          q = "min" === a;
        var p = B.lang[q ? "rangeSelectorFrom" : "rangeSelectorTo"] || "";
        p = m.label(p, 0).addClass("highcharts-range-label").attr({
          padding: p ? 2 : 0,
          height: p ? n.inputBoxHeight : 0
        }).add(f);
        m = m.label("",
          0).addClass("highcharts-range-input").attr({
          padding: 2,
          width: n.inputBoxWidth,
          height: n.inputBoxHeight,
          "text-align": "center"
        }).on("click", function() {
          k.showInput(a);
          k[a + "Input"].focus()
        });
        b.styledMode || m.attr({
          stroke: n.inputBoxBorderColor,
          "stroke-width": 1
        });
        m.add(f);
        const t = r("input", {
          name: a,
          className: "highcharts-range-selector"
        }, void 0, c);
        t.setAttribute("type", u(n.inputDateFormat || "%e %b %Y"));
        b.styledMode || (p.css(D(l, n.labelStyle)), m.css(D({
          color: "#333333"
        }, l, n.inputStyle)), d(t, v({
          position: "absolute",
          border: 0,
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          width: "1px",
          height: "1px",
          padding: 0,
          textAlign: "center",
          fontSize: l.fontSize,
          fontFamily: l.fontFamily,
          top: "-9999em"
        }, n.inputStyle)));
        t.onfocus = () => {
          k.showInput(a)
        };
        t.onblur = () => {
          t === H.doc.activeElement && e();
          k.hideInput(a);
          k.setInputValue(a);
          t.blur()
        };
        let w = !1;
        t.onchange = () => {
          w || (e(), k.hideInput(a), t.blur())
        };
        t.onkeypress = a => {
          13 === a.keyCode && e()
        };
        t.onkeydown = a => {
          w = !0;
          38 !== a.keyCode && 40 !== a.keyCode || e()
        };
        t.onkeyup = () => {
          w = !1
        };
        return {
          dateBox: m,
          input: t,
          label: p
        }
      }
      getPosition() {
        var a =
          this.chart;
        const d = a.options.rangeSelector;
        a = "top" === d.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
        return {
          buttonTop: a + d.buttonPosition.y,
          inputTop: a + d.inputPosition.y - 10
        }
      }
      getYTDExtremes(a, d, b) {
        const c = this.chart.time;
        var e = new c.Date(a);
        const g = c.get("FullYear", e);
        b = b ? c.Date.UTC(g, 0, 1) : +new c.Date(g, 0, 1);
        d = Math.max(d, b);
        e = e.getTime();
        return {
          max: Math.min(a || e, e),
          min: d
        }
      }
      render(a, d) {
        var b = this.chart,
          c = b.renderer;
        const f = b.container;
        var g = b.options;
        const h = g.rangeSelector,
          k = e(g.chart.style && g.chart.style.zIndex,
            0) + 1;
        g = h.inputEnabled;
        if (!1 !== h.enabled) {
          this.rendered || (this.group = c.g("range-selector-group").attr({
            zIndex: 7
          }).add(), this.div = r("div", void 0, {
            position: "relative",
            height: 0,
            zIndex: k
          }), this.buttonOptions.length && this.renderButtons(), f.parentNode && f.parentNode.insertBefore(this.div, f), g && (this.inputGroup = c.g("input-group").add(this.group), c = this.drawInput("min"), this.minDateBox = c.dateBox, this.minLabel = c.label, this.minInput = c.input, c = this.drawInput("max"), this.maxDateBox = c.dateBox, this.maxLabel = c.label,
            this.maxInput = c.input));
          if (g && (this.setInputValue("min", a), this.setInputValue("max", d), a = b.scroller && b.scroller.getUnionExtremes() || b.xAxis[0] || {}, p(a.dataMin) && p(a.dataMax) && (b = b.xAxis[0].minRange || 0, this.setInputExtremes("min", a.dataMin, Math.min(a.dataMax, this.getInputValue("max")) - b), this.setInputExtremes("max", Math.max(a.dataMin, this.getInputValue("min")) + b, a.dataMax)), this.inputGroup)) {
            let a = 0;
            [this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach(b => {
              if (b) {
                const {
                  width: c
                } = b.getBBox();
                c && (b.attr({
                  x: a
                }), a += c + h.inputSpacing)
              }
            })
          }
          this.alignElements();
          this.rendered = !0
        }
      }
      renderButtons() {
        const {
          buttons: a,
          chart: d,
          options: b
        } = this, c = B.lang, f = d.renderer, h = D(b.buttonTheme), k = h && h.states, l = h.width || 28;
        delete h.width;
        delete h.states;
        this.buttonGroup = f.g("range-selector-buttons").add(this.group);
        const m = this.dropdown = r("select", void 0, {
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          border: 0,
          top: "-9999em",
          cursor: "pointer",
          opacity: .0001
        }, this.div);
        t(m, "touchstart", () => {
          m.style.fontSize =
            "16px"
        });
        [
          [H.isMS ? "mouseover" : "mouseenter"],
          [H.isMS ? "mouseout" : "mouseleave"],
          ["change", "click"]
        ].forEach(([b, c]) => {
          t(m, b, () => {
            const d = a[this.currentButtonIndex()];
            d && n(d.element, c || b)
          })
        });
        this.zoomText = f.label(c && c.rangeSelectorZoom || "", 0).attr({
          padding: b.buttonTheme.padding,
          height: b.buttonTheme.height,
          paddingLeft: 0,
          paddingRight: 0
        }).add(this.buttonGroup);
        this.chart.styledMode || (this.zoomText.css(b.labelStyle), h["stroke-width"] = e(h["stroke-width"], 0));
        r("option", {
          textContent: this.zoomText.textStr,
          disabled: !0
        }, void 0, m);
        this.buttonOptions.forEach((b, c) => {
          r("option", {
            textContent: b.title || b.text
          }, void 0, m);
          a[c] = f.button(b.text, 0, 0, a => {
            const d = b.events && b.events.click;
            let e;
            d && (e = d.call(b, a));
            !1 !== e && this.clickButton(c);
            this.isActive = !0
          }, h, k && k.hover, k && k.select, k && k.disabled).attr({
            "text-align": "center",
            width: l
          }).add(this.buttonGroup);
          b.title && a[c].attr("title", b.title)
        })
      }
      alignElements() {
        const {
          buttonGroup: a,
          buttons: d,
          chart: b,
          group: c,
          inputGroup: f,
          options: h,
          zoomText: k
        } = this;
        var l = b.options;
        const m =
          l.exporting && !1 !== l.exporting.enabled && l.navigation && l.navigation.buttonOptions,
          {
            buttonPosition: n,
            inputPosition: p,
            verticalAlign: q
          } = h;
        l = (a, c) => m && this.titleCollision(b) && "top" === q && "right" === c.align && c.y - a.getBBox().height - 12 < (m.y || 0) + (m.height || 0) + b.spacing[0] ? -40 : 0;
        var r = b.plotLeft;
        if (c && n && p) {
          var t = n.x - b.spacing[3];
          if (a) {
            this.positionButtons();
            if (!this.initialButtonGroupWidth) {
              let a = 0;
              k && (a += k.getBBox().width + 5);
              d.forEach((b, c) => {
                a += b.width;
                c !== d.length - 1 && (a += h.buttonSpacing)
              });
              this.initialButtonGroupWidth =
                a
            }
            r -= b.spacing[3];
            this.updateButtonStates();
            var u = l(a, n);
            this.alignButtonGroup(u);
            c.placed = a.placed = b.hasLoaded
          }
          u = 0;
          f && (u = l(f, p), "left" === p.align ? t = r : "right" === p.align && (t = -Math.max(b.axisOffset[1], -u)), f.align({
            y: p.y,
            width: f.getBBox().width,
            align: p.align,
            x: p.x + t - 2
          }, !0, b.spacingBox), f.placed = b.hasLoaded);
          this.handleCollision(u);
          c.align({
            verticalAlign: q
          }, !0, b.spacingBox);
          l = c.alignAttr.translateY;
          r = c.getBBox().height + 20;
          t = 0;
          "bottom" === q && (t = (t = b.legend && b.legend.options) && "bottom" === t.verticalAlign &&
            t.enabled && !t.floating ? b.legend.legendHeight + e(t.margin, 10) : 0, r = r + t - 20, t = l - r - (h.floating ? 0 : h.y) - (b.titleOffset ? b.titleOffset[2] : 0) - 10);
          if ("top" === q) h.floating && (t = 0), b.titleOffset && b.titleOffset[0] && (t = b.titleOffset[0]), t += b.margin[0] - b.spacing[0] || 0;
          else if ("middle" === q)
            if (p.y === n.y) t = l;
            else if (p.y || n.y) t = 0 > p.y || 0 > n.y ? t - Math.min(p.y, n.y) : l - r;
          c.translate(h.x, h.y + Math.floor(t));
          const {
            minInput: g,
            maxInput: m,
            dropdown: x
          } = this;
          h.inputEnabled && g && m && (g.style.marginTop = c.translateY + "px", m.style.marginTop =
            c.translateY + "px");
          x && (x.style.marginTop = c.translateY + "px")
        }
      }
      alignButtonGroup(a, d) {
        const {
          chart: b,
          options: c,
          buttonGroup: f
        } = this, {
          buttonPosition: g
        } = c, h = b.plotLeft - b.spacing[3];
        let k = g.x - b.spacing[3];
        "right" === g.align ? k += a - h : "center" === g.align && (k -= h / 2);
        f && f.align({
          y: g.y,
          width: e(d, this.initialButtonGroupWidth),
          align: g.align,
          x: k
        }, !0, b.spacingBox)
      }
      positionButtons() {
        const {
          buttons: a,
          chart: d,
          options: b,
          zoomText: c
        } = this, f = d.hasLoaded ? "animate" : "attr", {
          buttonPosition: h
        } = b, k = d.plotLeft;
        let l = k;
        c && "hidden" !==
          c.visibility && (c[f]({
            x: e(k + h.x, k)
          }), l += h.x + c.getBBox().width + 5);
        for (let c = 0, d = this.buttonOptions.length; c < d; ++c)
          if ("hidden" !== a[c].visibility) a[c][f]({
            x: l
          }), l += a[c].width + b.buttonSpacing;
          else a[c][f]({
            x: k
          })
      }
      handleCollision(a) {
        const {
          chart: d,
          buttonGroup: b,
          inputGroup: c
        } = this, {
          buttonPosition: e,
          dropdown: h,
          inputPosition: k
        } = this.options, l = () => {
          let a = 0;
          this.buttons.forEach(b => {
            b = b.getBBox();
            b.width > a && (a = b.width)
          });
          return a
        }, m = d => {
          if (c && b) {
            const f = c.alignAttr.translateX + c.alignOptions.x - a + c.getBBox().x +
              2,
              g = c.alignOptions.width,
              h = b.alignAttr.translateX + b.getBBox().x;
            return h + d > f && f + g > h && e.y < k.y + c.getBBox().height
          }
          return !1
        }, n = () => {
          c && b && c.attr({
            translateX: c.alignAttr.translateX + (d.axisOffset[1] >= -a ? 0 : -a),
            translateY: c.alignAttr.translateY + b.getBBox().height + 10
          })
        };
        if (b) {
          if ("always" === h) {
            this.collapseButtons(a);
            m(l()) && n();
            return
          }
          "never" === h && this.expandButtons()
        }
        c && b ? k.align === e.align || m(this.initialButtonGroupWidth + 20) ? "responsive" === h ? (this.collapseButtons(a), m(l()) && n()) : n() : "responsive" === h && this.expandButtons() :
          b && "responsive" === h && (this.initialButtonGroupWidth > d.plotWidth ? this.collapseButtons(a) : this.expandButtons())
      }
      collapseButtons(a) {
        const {
          buttons: d,
          buttonOptions: b,
          chart: c,
          dropdown: f,
          options: h,
          zoomText: k
        } = this, l = c.userOptions.rangeSelector && c.userOptions.rangeSelector.buttonTheme || {}, m = a => ({
          text: a ? `${a} \u25be` : "\u25be",
          width: "auto",
          paddingLeft: e(h.buttonTheme.paddingLeft, l.padding, 8),
          paddingRight: e(h.buttonTheme.paddingRight, l.padding, 8)
        });
        k && k.hide();
        let n = !1;
        b.forEach((a, b) => {
          b = d[b];
          2 !== b.state ? b.hide() :
            (b.show(), b.attr(m(a.text)), n = !0)
        });
        n || (f && (f.selectedIndex = 0), d[0].show(), d[0].attr(m(this.zoomText && this.zoomText.textStr)));
        const {
          align: p
        } = h.buttonPosition;
        this.positionButtons();
        "right" !== p && "center" !== p || this.alignButtonGroup(a, d[this.currentButtonIndex()].getBBox().width);
        this.showDropdown()
      }
      expandButtons() {
        const {
          buttons: a,
          buttonOptions: d,
          options: b,
          zoomText: c
        } = this;
        this.hideDropdown();
        c && c.show();
        d.forEach((c, d) => {
          d = a[d];
          d.show();
          d.attr({
            text: c.text,
            width: b.buttonTheme.width || 28,
            paddingLeft: e(b.buttonTheme.paddingLeft,
              "unset"),
            paddingRight: e(b.buttonTheme.paddingRight, "unset")
          });
          2 > d.state && d.setState(0)
        });
        this.positionButtons()
      }
      currentButtonIndex() {
        const {
          dropdown: a
        } = this;
        return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0
      }
      showDropdown() {
        const {
          buttonGroup: a,
          buttons: e,
          chart: b,
          dropdown: c
        } = this;
        if (a && c) {
          const {
            translateX: f,
            translateY: g
          } = a, h = e[this.currentButtonIndex()].getBBox();
          d(c, {
            left: b.plotLeft + f + "px",
            top: g + .5 + "px",
            width: h.width + "px",
            height: h.height + "px"
          });
          this.hasVisibleDropdown = !0
        }
      }
      hideDropdown() {
        const {
          dropdown: a
        } =
        this;
        a && (d(a, {
          top: "-9999em",
          width: "1px",
          height: "1px"
        }), this.hasVisibleDropdown = !1)
      }
      getHeight() {
        var a = this.options,
          d = this.group;
        const b = a.y,
          c = a.buttonPosition.y,
          e = a.inputPosition.y;
        if (a.height) return a.height;
        this.alignElements();
        a = d ? d.getBBox(!0).height + 13 + b : 0;
        d = Math.min(e, c);
        if (0 > e && 0 > c || 0 < e && 0 < c) a += Math.abs(d);
        return a
      }
      titleCollision(a) {
        return !(a.options.title.text || a.options.subtitle.text)
      }
      update(a) {
        const d = this.chart;
        D(!0, d.options.rangeSelector, a);
        this.destroy();
        this.init(d);
        this.render()
      }
      destroy() {
        const a =
          this,
          d = a.minInput,
          b = a.maxInput;
        a.eventsToUnbind && (a.eventsToUnbind.forEach(a => a()), a.eventsToUnbind = void 0);
        m(a.buttons);
        d && (d.onfocus = d.onblur = d.onchange = null);
        b && (b.onfocus = b.onblur = b.onchange = null);
        L(a, function(b, d) {
          b && "chart" !== d && (b instanceof F ? b.destroy() : b instanceof V.HTMLElement && k(b));
          b !== l.prototype[d] && (a[d] = null)
        }, this)
      }
    }
    v(l.prototype, {
      defaultButtons: [{
        type: "month",
        count: 1,
        text: "1m",
        title: "View 1 month"
      }, {
        type: "month",
        count: 3,
        text: "3m",
        title: "View 3 months"
      }, {
        type: "month",
        count: 6,
        text: "6m",
        title: "View 6 months"
      }, {
        type: "ytd",
        text: "YTD",
        title: "View year to date"
      }, {
        type: "year",
        count: 1,
        text: "1y",
        title: "View 1 year"
      }, {
        type: "all",
        text: "All",
        title: "View all"
      }],
      inputTypeFormats: {
        "datetime-local": "%Y-%m-%dT%H:%M:%S",
        date: "%Y-%m-%d",
        time: "%H:%M:%S"
      }
    });
    "";
    return l
  });
  M(a, "Core/Axis/OrdinalAxis.js", [a["Core/Axis/Axis.js"], a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function(a, A, H, I) {
    const {
      addEvent: u,
      correctFloat: G,
      css: C,
      defined: B,
      error: t,
      pick: r,
      timeUnits: d
    } = I, p = [];
    var m;
    (function(a) {
      function k(a, c, e, g, h = [], k = 0, l) {
        const b = {},
          f = this.options.tickPixelInterval;
        var m = this.chart.time,
          n = [],
          p;
        let q;
        let r;
        var x = 0;
        let u = [],
          v = -Number.MAX_VALUE;
        if (!this.options.ordinal && !this.options.breaks || !h || 3 > h.length || "undefined" === typeof c) return m.getTimeTicks.apply(m, arguments);
        const w = h.length;
        for (p = 0; p < w; p++) {
          r = p && h[p - 1] > e;
          h[p] < c && (x = p);
          if (p === w - 1 || h[p + 1] - h[p] > 5 * k || r) {
            if (h[p] > v) {
              for (q = m.getTimeTicks(a, h[x], h[p], g); q.length && q[0] <= v;) q.shift();
              q.length && (v = q[q.length - 1]);
              n.push(u.length);
              u = u.concat(q)
            }
            x = p + 1
          }
          if (r) break
        }
        if (q) {
          h = q.info;
          if (l && h.unitRange <= d.hour) {
            p = u.length - 1;
            for (x = 1; x < p; x++)
              if (m.dateFormat("%d", u[x]) !== m.dateFormat("%d", u[x - 1])) {
                b[u[x]] = "day";
                var z = !0
              } z && (b[u[0]] = "day");
            h.higherRanks = b
          }
          h.segmentStarts = n;
          u.info = h
        } else t(12, !1, this.chart);
        if (l && B(f)) {
          x = u.length;
          m = [];
          z = [];
          let a;
          for (p = x; p--;) n = this.translate(u[p]), a && (z[p] = a - n), m[p] = a = n;
          z.sort();
          z = z[Math.floor(z.length / 2)];
          z < .6 * f && (z = null);
          p = u[x - 1] > e ? x - 1 : x;
          for (a = void 0; p--;) n = m[p], x = Math.abs(a - n), a && x < .8 * f && (null === z || x <
            .8 * z) ? (b[u[p]] && !b[u[p + 1]] ? (x = p + 1, a = n) : x = p, u.splice(x, 1)) : a = n
        }
        return u
      }

      function m(a) {
        const b = this.ordinal.positions;
        if (!b) return a;
        let d = b.length - 1,
          e;
        0 > a ? a = b[0] : a > d ? a = b[d] : (d = Math.floor(a), e = a - d);
        return "undefined" !== typeof e && "undefined" !== typeof b[d] ? b[d] + (e ? e * (b[d + 1] - b[d]) : 0) : a
      }

      function h(a) {
        var b = this.ordinal,
          d = b.positions;
        if (!d) return a;
        var e = (a - (this.old ? this.old.min : this.min)) * (this.old ? this.old.transA : this.transA) + this.minPixelPadding;
        0 < e && e < this.left + this.len || (b.extendedOrdinalPositions ||
          (b.extendedOrdinalPositions = b.getExtendedPositions()), d = b.extendedOrdinalPositions);
        if (d && d.length) {
          a = b.getIndexOfPoint(e, d);
          b = G(a % 1);
          if (0 <= a && a < d.length - 1) return d[Math.floor(a)] + b * (d[Math.ceil(a)] - d[Math.floor(a)]);
          b = d.length;
          e = d[0];
          d = d[b - 1];
          const c = (d - e) / (b - 1);
          return 0 > a ? e + c * a : d + c * (a - b)
        }
        return a
      }

      function D(b, c) {
        const d = a.Additions.findIndexOf(b, c, !0);
        return b[d] === c ? d : d + (c - b[d]) / (b[d + 1] - b[d])
      }

      function F() {
        this.ordinal || (this.ordinal = new a.Additions(this))
      }

      function E() {
        this.isXAxis && B(this.options.overscroll) &&
          this.max === this.dataMax && (!this.chart.mouseIsDown || this.isInternal) && (!this.eventArgs || this.eventArgs && "navigator" !== this.eventArgs.trigger) && (this.max += this.options.overscroll, !this.isInternal && B(this.userMin) && (this.min += this.options.overscroll))
      }

      function e() {
        this.horiz && !this.isDirty && (this.isDirty = this.isOrdinal && this.chart.navigator && !this.chart.navigator.adaptToUpdatedData)
      }

      function q() {
        this.ordinal && (this.ordinal.beforeSetTickPositions(), this.tickInterval = this.ordinal.postProcessTickInterval(this.tickInterval))
      }

      function y(a) {
        const b = this.xAxis[0],
          d = b.options.overscroll,
          e = a.originalEvent.chartX,
          g = this.options.chart.panning;
        let h = !1;
        if (g && "y" !== g.type && b.options.ordinal && b.series.length) {
          var k = this.mouseDownX;
          const a = b.getExtremes(),
            c = a.dataMax,
            f = a.min,
            g = a.max;
          var l = this.hoverPoints,
            m = b.closestPointRange || b.ordinal && b.ordinal.overscrollPointsRange;
          k = (k - e) / (b.translationSlope * (b.ordinal.slope || m));
          m = b.ordinal.getExtendedPositions();
          var n = {
            ordinal: {
              positions: m,
              extendedOrdinalPositions: m
            }
          };
          m = b.index2val;
          const p =
            b.val2lin;
          let q;
          n.ordinal.positions ? 1 < Math.abs(k) && (l && l.forEach(function(a) {
            a.setState()
          }), 0 > k ? (l = n, q = b.ordinal.positions ? b : n) : (l = b.ordinal.positions ? b : n, q = n), n = q.ordinal.positions, c > n[n.length - 1] && n.push(c), this.fixedRange = g - f, k = b.navigatorAxis.toFixedRange(void 0, void 0, m.apply(l, [p.apply(l, [f, !0]) + k]), m.apply(q, [p.apply(q, [g, !0]) + k])), k.min >= Math.min(a.dataMin, f) && k.max <= Math.max(c, g) + d && b.setExtremes(k.min, k.max, !0, !1, {
            trigger: "pan"
          }), this.mouseDownX = e, C(this.container, {
            cursor: "move"
          })) : h = !0
        } else h = !0;
        h || g && /y/.test(g.type) ? d && (b.max = b.dataMax + d) : a.preventDefault()
      }

      function l() {
        const a = this.xAxis;
        a && a.options.ordinal && (delete a.ordinal.index, delete a.ordinal.extendedOrdinalPositions)
      }

      function w(a, c) {
        const b = this.ordinal;
        var d = b.positions;
        let e = b.slope,
          g = b.extendedOrdinalPositions;
        if (!d) return a;
        var h = d.length;
        if (d[0] <= a && d[h - 1] >= a) a = D(d, a);
        else {
          g || (g = b.getExtendedPositions && b.getExtendedPositions(), b.extendedOrdinalPositions = g);
          if (!g || !g.length) return a;
          h = g.length;
          e || (e = (g[h - 1] - g[0]) / h);
          d = D(g,
            d[0]);
          a = a >= g[0] && a <= g[h - 1] ? D(g, a) - d : a < g[0] ? -d - (g[0] - a) / e : (a - g[h - 1]) / e + h - d
        }
        return c ? a : e * (a || 0) + b.offset
      }
      a.compose = function(a, c, d) {
        if (I.pushUnique(p, a)) {
          const b = a.prototype;
          b.getTimeTicks = k;
          b.index2val = m;
          b.lin2val = h;
          b.val2lin = w;
          b.ordinal2lin = b.val2lin;
          u(a, "afterInit", F);
          u(a, "foundExtremes", E);
          u(a, "afterSetScale", e);
          u(a, "initialAxisTranslation", q)
        }
        I.pushUnique(p, d) && u(d, "pan", y);
        I.pushUnique(p, c) && u(c, "updatedData", l);
        return a
      };
      class g {
        constructor(a) {
          this.index = {};
          this.axis = a
        }
        beforeSetTickPositions() {
          const a =
            this.axis,
            c = a.ordinal;
          var d = a.getExtremes();
          const e = d.min;
          var g = d.max;
          const h = a.isXAxis && !!a.options.breaks;
          d = a.options.ordinal;
          const k = a.chart.options.chart.ignoreHiddenSeries;
          let l, m;
          var n;
          let p = [],
            q = Number.MAX_VALUE,
            t = !1,
            u = !1,
            v = !1;
          if (d || h) {
            let b = 0;
            a.series.forEach(function(a, c) {
              m = [];
              0 < c && "highcharts-navigator-series" !== a.options.id && 1 < a.processedXData.length && (u = b !== a.processedXData[1] - a.processedXData[0]);
              b = a.processedXData[1] - a.processedXData[0];
              a.boosted && (v = a.boosted);
              if (!(k && !1 === a.visible ||
                  !1 === a.takeOrdinalPosition && !h) && (p = p.concat(a.processedXData), l = p.length, p.sort(function(a, b) {
                  return a - b
                }), q = Math.min(q, r(a.closestPointRange, q)), l)) {
                for (c = 0; c < l - 1;) p[c] !== p[c + 1] && m.push(p[c + 1]), c++;
                m[0] !== p[0] && m.unshift(p[0]);
                p = m
              }
            });
            u && v && (p.pop(), p.shift());
            l = p.length;
            if (2 < l) {
              var w = p[1] - p[0];
              for (n = l - 1; n-- && !t;) p[n + 1] - p[n] !== w && (t = !0);
              !a.options.keepOrdinalPadding && (p[0] - e > w || g - p[p.length - 1] > w) && (t = !0)
            } else a.options.overscroll && (2 === l ? q = p[1] - p[0] : 1 === l ? (q = a.options.overscroll, p = [p[0], p[0] + q]) :
              q = c.overscrollPointsRange);
            t || a.forceOrdinal ? (a.options.overscroll && (c.overscrollPointsRange = q, p = p.concat(c.getOverscrollPositions())), c.positions = p, w = a.ordinal2lin(Math.max(e, p[0]), !0), n = Math.max(a.ordinal2lin(Math.min(g, p[p.length - 1]), !0), 1), c.slope = g = (g - e) / (n - w), c.offset = e - w * g) : (c.overscrollPointsRange = r(a.closestPointRange, c.overscrollPointsRange), c.positions = a.ordinal.slope = c.offset = void 0)
          }
          a.isOrdinal = d && t;
          c.groupIntervalFactor = null
        }
        static findIndexOf(a, c, d) {
          let b = 0,
            e = a.length - 1,
            f;
          for (; b < e;) f =
            Math.ceil((b + e) / 2), a[f] <= c ? b = f : e = f - 1;
          return a[b] === c ? b : d ? b : -1
        }
        getExtendedPositions() {
          const a = this,
            c = a.axis,
            d = c.constructor.prototype,
            e = c.chart,
            g = c.series[0].currentDataGrouping,
            h = g ? g.count + g.unitName : "raw",
            k = c.options.overscroll,
            l = c.getExtremes();
          let m, n = void 0,
            p = a.index;
          p || (p = a.index = {});
          p[h] || (m = {
            series: [],
            chart: e,
            forceOrdinal: !1,
            getExtremes: function() {
              return {
                min: l.dataMin,
                max: l.dataMax + k
              }
            },
            getGroupPixelWidth: d.getGroupPixelWidth,
            getTimeTicks: d.getTimeTicks,
            options: {
              ordinal: !0
            },
            ordinal: {
              getGroupIntervalFactor: this.getGroupIntervalFactor
            },
            ordinal2lin: d.ordinal2lin,
            getIndexOfPoint: d.getIndexOfPoint,
            val2lin: d.val2lin
          }, m.ordinal.axis = m, c.series.forEach(function(b) {
            n = {
              xAxis: m,
              xData: b.xData.slice(),
              chart: e,
              destroyGroupedData: A.noop,
              getProcessedData: H.prototype.getProcessedData,
              applyGrouping: H.prototype.applyGrouping
            };
            n.xData = n.xData.concat(a.getOverscrollPositions());
            n.options = {
              dataGrouping: g ? {
                firstAnchor: "firstPoint",
                anchor: "middle",
                lastAnchor: "lastPoint",
                enabled: !0,
                forced: !0,
                approximation: "open",
                units: [
                  [g.unitName, [g.count]]
                ]
              } : {
                enabled: !1
              }
            };
            m.series.push(n);
            b.processData.apply(n)
          }), n.closestPointRange !== n.basePointRange && n.currentDataGrouping && (m.forceOrdinal = !0), c.ordinal.beforeSetTickPositions.apply({
            axis: m
          }), p[h] = m.ordinal.positions);
          return p[h]
        }
        getGroupIntervalFactor(a, c, d) {
          d = d.processedXData;
          const b = d.length;
          var e = [];
          var f = this.groupIntervalFactor;
          if (!f) {
            for (f = 0; f < b - 1; f++) e[f] = d[f + 1] - d[f];
            e.sort(function(a, b) {
              return a - b
            });
            e = e[Math.floor(b / 2)];
            a = Math.max(a, d[0]);
            c = Math.min(c, d[b - 1]);
            this.groupIntervalFactor = f = b * e / (c - a)
          }
          return f
        }
        getIndexOfPoint(a,
          c) {
          const b = this.axis,
            d = this.positions ? this.positions[0] : 0;
          let e = b.series[0].points && b.series[0].points[0] && b.series[0].points[0].plotX || b.minPixelPadding;
          1 < b.series.length && b.series.forEach(function(a) {
            a.points && B(a.points[0]) && B(a.points[0].plotX) && a.points[0].plotX < e && a.points[0].plotX >= r(b.min, -Infinity) && (e = a.points[0].plotX)
          });
          a = (a - e) / (b.translationSlope * (this.slope || b.closestPointRange || this.overscrollPointsRange));
          return g.findIndexOf(c, d) + a
        }
        getOverscrollPositions() {
          const a = this.axis,
            c = a.options.overscroll,
            d = this.overscrollPointsRange,
            e = [];
          let g = a.dataMax;
          if (B(d))
            for (; g <= a.dataMax + c;) g += d, e.push(g);
          return e
        }
        postProcessTickInterval(a) {
          const b = this.axis,
            d = this.slope;
          return d ? b.options.breaks ? b.closestPointRange || a : a / (d / b.closestPointRange) : a
        }
      }
      a.Additions = g
    })(m || (m = {}));
    return m
  });
  M(a, "Series/HLC/HLCPoint.js", [a["Core/Series/SeriesRegistry.js"]], function(a) {
    ({
      column: {
        prototype: {
          pointClass: a
        }
      }
    } = a.seriesTypes);
    class u extends a {
      constructor() {
        super(...arguments);
        this.series = this.plotClose = this.options = this.low =
          this.high = this.close = void 0
      }
    }
    return u
  });
  M(a, "Series/HLC/HLCSeriesDefaults.js", [], function() {
    "";
    return {
      lineWidth: 1,
      tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'
      },
      threshold: null,
      states: {
        hover: {
          lineWidth: 3
        }
      },
      stickyTracking: !0
    }
  });
  M(a, "Series/HLC/HLCSeries.js", [a["Series/HLC/HLCPoint.js"], a["Series/HLC/HLCSeriesDefaults.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function(a, A, H, I) {
      const {
        column: u
      } = H.seriesTypes, {
        extend: G,
        merge: C
      } = I;
      class B extends u {
        constructor() {
          super(...arguments);
          this.yData = this.points = this.options = this.data = void 0
        }
        extendStem(a, r, d) {
          const p = a[0];
          a = a[1];
          "number" === typeof p[2] && (p[2] = Math.max(d + r, p[2]));
          "number" === typeof a[2] && (a[2] = Math.min(d - r, a[2]))
        }
        getPointPath(a, r) {
          r = r.strokeWidth();
          const d = a.series,
            p = r % 2 / 2,
            m = Math.round(a.plotX) - p,
            k = Math.round(a.shapeArgs.width / 2),
            t = [
              ["M", m, Math.round(a.yBottom)],
              ["L", m, Math.round(a.plotHigh)]
            ];
          null !==
            a.close && (a = Math.round(a.plotClose) + p, t.push(["M", m, a], ["L", m + k, a]), d.extendStem(t, r / 2, a));
          return t
        }
        drawSinglePoint(a) {
          var r = a.series;
          const d = r.chart;
          let p = a.graphic;
          "undefined" !== typeof a.plotY && (p || (a.graphic = p = d.renderer.path().add(r.group)), d.styledMode || p.attr(r.pointAttribs(a, a.selected && "select")), r = r.getPointPath(a, p), p[p ? "animate" : "attr"]({
            d: r
          }).addClass(a.getClassName(), !0))
        }
        drawPoints() {
          this.points.forEach(this.drawSinglePoint)
        }
        init() {
          super.init.apply(this, arguments);
          this.options.stacking =
            void 0
        }
        pointAttribs(a, r) {
          a = super.pointAttribs.call(this, a, r);
          delete a.fill;
          return a
        }
        toYData(a) {
          return [a.high, a.low, a.close]
        }
        translate() {
          const a = this,
            r = a.yAxis,
            d = this.pointArrayMap && this.pointArrayMap.slice() || [],
            p = d.map(a => `plot${a.charAt(0).toUpperCase()+a.slice(1)}`);
          p.push("yBottom");
          d.push("low");
          super.translate.apply(a);
          a.points.forEach(function(m) {
            d.forEach(function(d, t) {
              d = m[d];
              null !== d && (a.dataModify && (d = a.dataModify.modifyValue(d)), m[p[t]] = r.toPixels(d, !0))
            });
            m.tooltipPos[1] = m.plotHigh + r.pos -
              a.chart.plotTop
          })
        }
      }
      B.defaultOptions = C(u.defaultOptions, A);
      G(B.prototype, {
        pointClass: a,
        animate: null,
        directTouch: !1,
        pointArrayMap: ["high", "low", "close"],
        pointAttrToOptions: {
          stroke: "color",
          "stroke-width": "lineWidth"
        },
        pointValKey: "close"
      });
      H.registerSeriesType("hlc", B);
      return B
    });
  M(a, "Series/OHLC/OHLCPoint.js", [a["Core/Series/SeriesRegistry.js"]], function(a) {
    ({
      seriesTypes: {
        hlc: a
      }
    } = a);
    class u extends a.prototype.pointClass {
      constructor() {
        super(...arguments);
        this.series = this.plotOpen = this.options = this.open =
          void 0
      }
      getClassName() {
        return super.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
      }
      resolveUpColor() {
        this.open < this.close && !this.options.color && this.series.options.upColor && (this.color = this.series.options.upColor)
      }
      resolveColor() {
        super.resolveColor();
        this.resolveUpColor()
      }
      getZone() {
        const a = super.getZone();
        this.resolveUpColor();
        return a
      }
      applyOptions() {
        super.applyOptions.apply(this, arguments);
        this.resolveColor && this.resolveColor();
        return this
      }
    }
    return u
  });
  M(a, "Series/OHLC/OHLCSeriesDefaults.js", [], function() {
    "";
    return {
      tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'
      }
    }
  });
  M(a, "Series/OHLC/OHLCSeries.js", [a["Series/OHLC/OHLCPoint.js"], a["Series/OHLC/OHLCSeriesDefaults.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A, H, I) {
    function u(a) {
      a = a.options;
      const d = a.dataGrouping;
      d && a.useOhlcData &&
        "highcharts-navigator-series" !== a.id && (d.approximation = "ohlc")
    }

    function G(a) {
      a = a.options;
      a.useOhlcData && "highcharts-navigator-series" !== a.id && t(this, {
        pointValKey: p.prototype.pointValKey,
        pointArrayMap: p.prototype.pointArrayMap,
        toYData: p.prototype.toYData
      })
    }
    const {
      seriesTypes: {
        hlc: C
      }
    } = H, {
      addEvent: B,
      extend: t,
      merge: r
    } = I, d = [];
    class p extends C {
      constructor() {
        super(...arguments);
        this.points = this.options = this.data = void 0
      }
      static compose(a, ...k) {
        I.pushUnique(d, a) && (B(a, "afterSetOptions", u), B(a, "init", G))
      }
      getPointPath(a,
        d) {
        const k = super.getPointPath(a, d);
        d = d.strokeWidth();
        const m = d % 2 / 2,
          h = Math.round(a.plotX) - m,
          p = Math.round(a.shapeArgs.width / 2);
        null !== a.open && (a = Math.round(a.plotOpen) + m, k.push(["M", h, a], ["L", h - p, a]), super.extendStem(k, d / 2, a));
        return k
      }
      pointAttribs(a, d) {
        d = super.pointAttribs.call(this, a, d);
        const k = this.options;
        delete d.fill;
        !a.options.color && k.upColor && a.open < a.close && (d.stroke = k.upColor);
        return d
      }
      toYData(a) {
        return [a.open, a.high, a.low, a.close]
      }
    }
    p.defaultOptions = r(C.defaultOptions, A);
    t(p.prototype, {
      pointClass: a,
      pointArrayMap: ["open", "high", "low", "close"]
    });
    H.registerSeriesType("ohlc", p);
    return p
  });
  M(a, "Series/Candlestick/CandlestickSeriesDefaults.js", [a["Core/Defaults.js"], a["Core/Utilities.js"]], function(a, A) {
    "";
    return {
      states: {
        hover: {
          lineWidth: 2
        }
      },
      threshold: null,
      lineColor: "#000000",
      lineWidth: 1,
      upColor: "#ffffff",
      stickyTracking: !0
    }
  });
  M(a, "Series/Candlestick/CandlestickSeries.js", [a["Series/Candlestick/CandlestickSeriesDefaults.js"], a["Core/Defaults.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function(a, A, H, I) {
      ({
        defaultOptions: A
      } = A);
      const {
        column: u,
        ohlc: G
      } = H.seriesTypes;
      ({
        merge: I
      } = I);
      class C extends G {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0
        }
        pointAttribs(a, t) {
          const r = u.prototype.pointAttribs.call(this, a, t),
            d = this.options,
            p = a.open < a.close,
            m = d.lineColor || this.color,
            k = a.color || this.color;
          r["stroke-width"] = d.lineWidth;
          r.fill = a.options.color || (p ? d.upColor || k : k);
          r.stroke = a.options.lineColor || (p ? d.upLineColor || m : m);
          t && (a = d.states[t], r.fill = a.color || r.fill, r.stroke =
            a.lineColor || r.stroke, r["stroke-width"] = a.lineWidth || r["stroke-width"]);
          return r
        }
        drawPoints() {
          var a = this.points;
          const t = this.chart,
            r = this.yAxis.reversed;
          for (const k of a) {
            a = k.graphic;
            var d = void 0,
              p = void 0;
            let u, n;
            var m = void 0;
            let h, A;
            const B = !a;
            "undefined" !== typeof k.plotY && (a || (k.graphic = a = t.renderer.path().add(this.group)), this.chart.styledMode || a.attr(this.pointAttribs(k, k.selected && "select")).shadow(this.options.shadow), m = a.strokeWidth() % 2 / 2, h = Math.round(k.plotX) - m, d = k.plotOpen, p = k.plotClose,
              u = Math.min(d, p), d = Math.max(d, p), A = Math.round(k.shapeArgs.width / 2), p = r ? d !== k.yBottom : Math.round(u) !== Math.round(k.plotHigh), n = r ? Math.round(u) !== Math.round(k.plotHigh) : d !== k.yBottom, u = Math.round(u) + m, d = Math.round(d) + m, m = [], m.push(["M", h - A, d], ["L", h - A, u], ["L", h + A, u], ["L", h + A, d], ["Z"], ["M", h, u], ["L", h, p ? Math.round(r ? k.yBottom : k.plotHigh) : u], ["M", h, d], ["L", h, n ? Math.round(r ? k.plotHigh : k.yBottom) : d]), a[B ? "attr" : "animate"]({
                d: m
              }).addClass(k.getClassName(), !0))
          }
        }
      }
      C.defaultOptions = I(G.defaultOptions, A.plotOptions, {
        tooltip: G.defaultOptions.tooltip
      }, a);
      H.registerSeriesType("candlestick", C);
      return C
    });
  M(a, "Series/Flags/FlagsPoint.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, A) {
    ({
      column: {
        prototype: {
          pointClass: a
        }
      }
    } = a.seriesTypes);
    const {
      isNumber: u
    } = A;
    class I extends a {
      constructor() {
        super(...arguments);
        this.series = this.options = void 0;
        this.ttBelow = !1
      }
      isValid() {
        return u(this.y) || "undefined" === typeof this.y
      }
      hasNewShapeType() {
        const a = this.options.shape || this.series.options.shape;
        return this.graphic &&
          a && a !== this.graphic.symbolKey
      }
    }
    return I
  });
  M(a, "Series/Flags/FlagsSeriesDefaults.js", [], function() {
    "";
    return {
      pointRange: 0,
      allowOverlapX: !1,
      shape: "flag",
      stackDistance: 12,
      textAlign: "center",
      tooltip: {
        pointFormat: "{point.text}"
      },
      threshold: null,
      y: -30,
      fillColor: "#ffffff",
      lineWidth: 1,
      states: {
        hover: {
          lineColor: "#000000",
          fillColor: "#ccd3ff"
        }
      },
      style: {
        fontSize: "0.7em",
        fontWeight: "bold"
      }
    }
  });
  M(a, "Series/Flags/FlagsSymbols.js", [a["Core/Renderer/RendererRegistry.js"]], function(a) {
    var u;
    (function(u) {
      function A(a, u,
        t, r, d) {
        const p = d && d.anchorX || a;
        d = d && d.anchorY || u;
        const m = this.circle(p - 1, d - 1, 2, 2);
        m.push(["M", p, d], ["L", a, u + r], ["L", a, u], ["L", a + t, u], ["L", a + t, u + r], ["L", a, u + r], ["Z"]);
        return m
      }

      function F(a, u) {
        a[u + "pin"] = function(t, r, d, p, m) {
          const k = m && m.anchorX;
          m = m && m.anchorY;
          let v;
          "circle" === u && p > d && (t -= Math.round((p - d) / 2), d = p);
          v = a[u](t, r, d, p);
          if (k && m) {
            let n = k;
            "circle" === u ? n = t + d / 2 : (t = v[0], d = v[1], "M" === t[0] && "L" === d[0] && (n = (t[1] + d[1]) / 2));
            v.push(["M", n, r > m ? r : r + p], ["L", k, m]);
            v = v.concat(a.circle(k - 1, m - 1, 2, 2))
          }
          return v
        }
      }
      const G = [];
      u.compose = function(u) {
        -1 === G.indexOf(u) && (G.push(u), u = u.prototype.symbols, u.flag = A, F(u, "circle"), F(u, "square"));
        u = a.getRendererType();
        G.indexOf(u) && G.push(u)
      }
    })(u || (u = {}));
    return u
  });
  M(a, "Series/OnSeriesComposition.js", [a["Series/Column/ColumnSeries.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function(a, A, H) {
    const {
      prototype: u
    } = a, {
      prototype: F
    } = A, {
      defined: G,
      stableSort: C
    } = H;
    var B;
    (function(a) {
      function r(a) {
        return F.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) ||
          this, a)
      }

      function d() {
        u.translate.apply(this);
        const a = this;
        var d = a.options,
          p = a.chart;
        const n = a.points;
        var h = d.onSeries;
        const r = (h = h && p.get(h)) && h.options.step,
          t = h && h.points,
          A = p.inverted,
          e = a.xAxis,
          q = a.yAxis;
        p = n.length - 1;
        let y;
        d = d.onKey || "y";
        let l = t && t.length,
          w = 0,
          g, b, c, f;
        if (h && h.visible && l) {
          w = (h.pointXOffset || 0) + (h.barW || 0) / 2;
          var x = h.currentDataGrouping;
          b = t[l - 1].x + (x ? x.totalRange : 0);
          C(n, (a, b) => a.x - b.x);
          for (d = "plot" + d[0].toUpperCase() + d.substr(1); l-- && n[p] && !(g = t[l], x = n[p], x.y = g.y, g.x <= x.x && "undefined" !==
              typeof g[d] && (x.x <= b && (x.plotY = g[d], g.x < x.x && !r && (c = t[l + 1]) && "undefined" !== typeof c[d] && (f = (x.x - g.x) / (c.x - g.x), x.plotY += f * (c[d] - g[d]), x.y += f * (c.y - g.y))), p--, l++, 0 > p)););
        }
        n.forEach((b, c) => {
          let d;
          b.plotX += w;
          if ("undefined" === typeof b.plotY || A) 0 <= b.plotX && b.plotX <= e.len ? A ? (b.plotY = e.translate(b.x, 0, 1, 0, 1), b.plotX = G(b.y) ? q.translate(b.y, 0, 0, 0, 1) : 0) : b.plotY = (e.opposite ? 0 : a.yAxis.len) + e.offset : b.shapeArgs = {};
          (y = n[c - 1]) && y.plotX === b.plotX && ("undefined" === typeof y.stackIndex && (y.stackIndex = 0), d = y.stackIndex +
            1);
          b.stackIndex = d
        });
        this.onSeries = h
      }
      const p = [];
      a.compose = function(a) {
        if (H.pushUnique(p, a)) {
          const k = a.prototype;
          k.getPlotBox = r;
          k.translate = d
        }
        return a
      };
      a.getPlotBox = r;
      a.translate = d
    })(B || (B = {}));
    return B
  });
  M(a, "Series/Flags/FlagsSeries.js", [a["Series/Flags/FlagsPoint.js"], a["Series/Flags/FlagsSeriesDefaults.js"], a["Series/Flags/FlagsSymbols.js"], a["Core/Globals.js"], a["Series/OnSeriesComposition.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGElement.js"],
    a["Core/Utilities.js"]
  ], function(a, A, H, I, F, G, C, B, t) {
    ({
      noop: I
    } = I);
    const {
      distribute: r
    } = G, {
      series: d,
      seriesTypes: {
        column: p
      }
    } = C, {
      addEvent: m,
      defined: k,
      extend: u,
      merge: n,
      objectEach: h,
      wrap: D
    } = t;
    class L extends p {
      constructor() {
        super(...arguments);
        this.points = this.options = this.data = void 0
      }
      animate(a) {
        a && this.setClip()
      }
      drawPoints() {
        var a = this.points,
          d = this.chart;
        const m = d.renderer,
          p = d.inverted,
          l = this.options,
          t = l.y,
          g = this.yAxis,
          b = {},
          c = [];
        let f, u;
        let v, z;
        let A, C, F;
        for (v = a.length; v--;) {
          z = a[v];
          C = (p ? z.plotY : z.plotX) >
            this.xAxis.len;
          f = z.plotX;
          var G = z.stackIndex;
          var H = z.options.shape || l.shape;
          u = z.plotY;
          "undefined" !== typeof u && (u = z.plotY + t - ("undefined" !== typeof G && G * l.stackDistance));
          z.anchorX = G ? void 0 : z.plotX;
          A = G ? void 0 : z.plotY;
          F = "flag" !== H;
          G = z.graphic;
          "undefined" !== typeof u && 0 <= f && !C ? (G && z.hasNewShapeType() && (G = G.destroy()), G || (G = z.graphic = m.label("", null, null, H, null, null, l.useHTML).addClass("highcharts-point").add(this.markerGroup), z.graphic.div && (z.graphic.div.point = z), G.isNew = !0), G.attr({
            align: F ? "center" : "left",
            width: l.width,
            height: l.height,
            "text-align": l.textAlign
          }), d.styledMode || G.attr(this.pointAttribs(z)).css(n(l.style, z.style)).shadow(l.shadow), 0 < f && (f -= G.strokeWidth() % 2), H = {
            y: u,
            anchorY: A
          }, l.allowOverlapX && (H.x = f, H.anchorX = z.anchorX), G.attr({
            text: z.options.title || l.title || "A"
          })[G.isNew ? "attr" : "animate"](H), l.allowOverlapX || (b[z.plotX] ? b[z.plotX].size = Math.max(b[z.plotX].size, G.width) : b[z.plotX] = {
            align: F ? .5 : 0,
            size: G.width,
            target: f,
            anchorX: f
          }), z.tooltipPos = [f, u + g.pos - d.plotTop]) : G && (z.graphic = G.destroy())
        }
        if (!l.allowOverlapX) {
          let e =
            100;
          h(b, function(a) {
            a.plotX = a.anchorX;
            c.push(a);
            e = Math.max(a.size, e)
          });
          r(c, p ? g.len : this.xAxis.len, e);
          for (const c of a) d = c.plotX, (d = (a = c.graphic) && b[d]) && a && (k(d.pos) ? a[a.isNew ? "attr" : "animate"]({
            x: d.pos + (d.align || 0) * d.size,
            anchorX: c.anchorX
          }).show().isNew = !1 : a.hide().isNew = !0)
        }
        l.useHTML && this.markerGroup && D(this.markerGroup, "on", function(a) {
          return B.prototype.on.apply(a.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
        })
      }
      drawTracker() {
        const a = this.points;
        super.drawTracker();
        for (const d of a) {
          const e =
            d.graphic;
          e && (d.unbindMouseOver && d.unbindMouseOver(), d.unbindMouseOver = m(e.element, "mouseover", function() {
            0 < d.stackIndex && !d.raised && (d._y = e.y, e.attr({
              y: d._y - 8
            }), d.raised = !0);
            for (const e of a) e !== d && e.raised && e.graphic && (e.graphic.attr({
              y: e._y
            }), e.raised = !1)
          }))
        }
      }
      pointAttribs(a, d) {
        const e = this.options,
          h = a && a.color || this.color;
        let k = e.lineColor,
          m = a && a.lineWidth;
        a = a && a.fillColor || e.fillColor;
        d && (a = e.states[d].fillColor, k = e.states[d].lineColor, m = e.states[d].lineWidth);
        return {
          fill: a || h,
          stroke: k || h,
          "stroke-width": m ||
            e.lineWidth || 0
        }
      }
      setClip() {
        d.prototype.setClip.apply(this, arguments);
        !1 !== this.options.clip && this.sharedClipKey && this.markerGroup && this.markerGroup.clip(this.chart.sharedClips[this.sharedClipKey])
      }
    }
    L.compose = H.compose;
    L.defaultOptions = n(p.defaultOptions, A);
    F.compose(L);
    u(L.prototype, {
      allowDG: !1,
      forceCrop: !0,
      invertible: !1,
      noSharedTooltip: !0,
      pointClass: a,
      sorted: !1,
      takeOrdinalPosition: !1,
      trackerGroups: ["markerGroup"],
      buildKDTree: I,
      init: d.prototype.init
    });
    C.registerSeriesType("flags", L);
    "";
    return L
  });
  M(a, "Core/Chart/StockChart.js", [a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/FormatUtilities.js"], a["Core/Defaults.js"], a["Stock/Navigator/NavigatorDefaults.js"], a["Stock/RangeSelector/RangeSelectorDefaults.js"], a["Stock/Scrollbar/ScrollbarDefaults.js"], a["Core/Series/Series.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function(a, A, H, I, F, G, C, B, t, r) {
    function d(a, b) {
      return "xAxis" === a ? {
        minPadding: 0,
        maxPadding: 0,
        overscroll: 0,
        ordinal: !0,
        title: {
          text: null
        },
        labels: {
          overflow: "justify"
        },
        showLastLabel: !0
      } : "yAxis" === a ? {
        labels: {
          y: -2
        },
        opposite: y(b.opposite, !0),
        showLastLabel: !(!b.categories && "category" !== b.type),
        title: {
          text: null
        }
      } : {}
    }

    function p(a, b) {
      return "xAxis" === a ? (a = {
        type: "datetime",
        categories: void 0
      }, y(b.navigator && b.navigator.enabled, F.enabled, !0) && (a.startOnTick = !1, a.endOnTick = !1), a) : {}
    }
    const {
      format: m
    } = H, {
      getOptions: k
    } = I, {
      addEvent: u,
      clamp: n,
      defined: h,
      extend: D,
      find: L,
      isNumber: E,
      isString: e,
      merge: q,
      pick: y,
      splat: l
    } = r;
    class w extends A {
      init(a, b) {
        const c = k(),
          e = a.xAxis,
          g = a.yAxis;
        var h =
          y(a.navigator && a.navigator.enabled, F.enabled, !0);
        a.xAxis = a.yAxis = void 0;
        h = q({
          chart: {
            panning: {
              enabled: !0,
              type: "x"
            },
            zooming: {
              pinchType: "x"
            }
          },
          navigator: {
            enabled: h
          },
          scrollbar: {
            enabled: y(C.enabled, !0)
          },
          rangeSelector: {
            enabled: y(G.rangeSelector.enabled, !0)
          },
          title: {
            text: null
          },
          tooltip: {
            split: y(c.tooltip.split, !0),
            crosshairs: !0
          },
          legend: {
            enabled: !1
          }
        }, a, {
          isStock: !0
        });
        a.xAxis = e;
        a.yAxis = g;
        h.xAxis = l(a.xAxis || {}).map(function(b, e) {
          return q(d("xAxis", b), c.xAxis, c.xAxis && c.xAxis[e], b, p("xAxis", a))
        });
        h.yAxis = l(a.yAxis || {}).map(function(a, b) {
          return q(d("yAxis", a), c.yAxis, c.yAxis && c.yAxis[b], a)
        });
        super.init(h, b)
      }
      createAxis(a, b) {
        b.axis = q(d(a, b.axis), b.axis, p(a, this.userOptions));
        return super.createAxis(a, b)
      }
    }(function(a) {
      a.stockChart = function(b, c, d) {
        return new a(b, c, d)
      }
    })(w || (w = {}));
    u(B, "setOptions", function(a) {
      let b;
      this.chart.options.isStock && (this.is("column") || this.is("columnrange") ? b = {
        borderWidth: 0,
        shadow: !1
      } : this.is("scatter") || this.is("sma") || (b = {
        marker: {
          enabled: !1,
          radius: 2
        }
      }), b && (a.plotOptions[this.type] = q(a.plotOptions[this.type],
        b)))
    });
    u(a, "autoLabelAlign", function(a) {
      const {
        chart: b,
        options: c
      } = this, d = b._labelPanes = b._labelPanes || {}, e = c.labels;
      if (b.options.isStock && "yAxis" === this.coll) {
        const b = c.top + "," + c.height;
        !d[b] && e.enabled && (15 === e.distance && 1 === this.side && (e.distance = 0), "undefined" === typeof e.align && (e.align = "right"), d[b] = this, a.align = "right", a.preventDefault())
      }
    });
    u(a, "destroy", function() {
      const a = this.chart,
        b = this.options && this.options.top + "," + this.options.height;
      b && a._labelPanes && a._labelPanes[b] === this && delete a._labelPanes[b]
    });
    u(a, "getPlotLinePath", function(a) {
      function b(a) {
        const b = "xAxis" === a ? "yAxis" : "xAxis";
        a = c.options[b];
        return E(a) ? [g[b][a]] : e(a) ? [g.get(a)] : d.map(function(a) {
          return a[b]
        })
      }
      let c = this,
        d = this.isLinked && !this.series ? this.linkedParent.series : this.series,
        g = c.chart,
        k = g.renderer,
        l = c.left,
        m = c.top,
        p, q, r, t, u = [],
        v = [],
        w, A, B = a.translatedValue,
        C = a.value,
        D = a.force,
        F;
      if (g.options.isStock && !1 !== a.acrossPanes && "xAxis" === c.coll || "yAxis" === c.coll) a.preventDefault(), v = b(c.coll), w = c.isXAxis ? g.yAxis : g.xAxis, w.forEach(function(a) {
        if (h(a.options.id) ?
          -1 === a.options.id.indexOf("navigator") : 1) {
          var b = a.isXAxis ? "yAxis" : "xAxis";
          b = h(a.options[b]) ? g[b][a.options[b]] : g[b][0];
          c === b && v.push(a)
        }
      }), A = v.length ? [] : [c.isXAxis ? g.yAxis[0] : g.xAxis[0]], v.forEach(function(a) {
        -1 !== A.indexOf(a) || L(A, function(b) {
          return b.pos === a.pos && b.len === a.len
        }) || A.push(a)
      }), F = y(B, c.translate(C, void 0, void 0, a.old)), E(F) && (c.horiz ? A.forEach(function(a) {
        let b;
        q = a.pos;
        t = q + a.len;
        p = r = Math.round(F + c.transB);
        "pass" !== D && (p < l || p > l + c.width) && (D ? p = r = n(p, l, l + c.width) : b = !0);
        b || u.push(["M",
          p, q
        ], ["L", r, t])
      }) : A.forEach(function(a) {
        let b;
        p = a.pos;
        r = p + a.len;
        q = t = Math.round(m + c.height - F);
        "pass" !== D && (q < m || q > m + c.height) && (D ? q = t = n(q, m, m + c.height) : b = !0);
        b || u.push(["M", p, q], ["L", r, t])
      })), a.path = 0 < u.length ? k.crispPolyLine(u, a.lineWidth || 1) : null
    });
    t.prototype.crispPolyLine = function(a, b) {
      for (let c = 0; c < a.length; c += 2) {
        const d = a[c],
          e = a[c + 1];
        d[1] === e[1] && (d[1] = e[1] = Math.round(d[1]) - b % 2 / 2);
        d[2] === e[2] && (d[2] = e[2] = Math.round(d[2]) + b % 2 / 2)
      }
      return a
    };
    u(a, "afterHideCrosshair", function() {
      this.crossLabel && (this.crossLabel =
        this.crossLabel.hide())
    });
    u(a, "afterDrawCrosshair", function(a) {
      var b, c;
      if (this.crosshair && this.crosshair.label && this.crosshair.label.enabled && this.cross && E(this.min) && E(this.max)) {
        var d = this.chart,
          e = this.logarithmic,
          g = this.crosshair.label,
          h = this.horiz,
          k = this.opposite,
          l = this.left,
          n = this.top,
          p = this.width,
          q = this.crossLabel,
          r = g.format,
          t = "",
          u = "inside" === this.options.tickPosition,
          v = !1 !== this.crosshair.snap,
          w = 0,
          A = a.e || this.cross && this.cross.e;
        a = a.point;
        var B = this.min,
          C = this.max;
        e && (B = e.lin2log(B), C = e.lin2log(C));
        e = h ? "center" : k ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
        q || (q = this.crossLabel = d.renderer.label("", 0, void 0, g.shape || "callout").addClass("highcharts-crosshair-label highcharts-color-" + (a && a.series ? a.series.colorIndex : this.series[0] && this.series[0].colorIndex)).attr({
          align: g.align || e,
          padding: y(g.padding, 8),
          r: y(g.borderRadius, 3),
          zIndex: 2
        }).add(this.labelGroup), d.styledMode || q.attr({
          fill: g.backgroundColor || a && a.series && a.series.color || "#666666",
          stroke: g.borderColor ||
            "",
          "stroke-width": g.borderWidth || 0
        }).css(D({
          color: "#ffffff",
          fontWeight: "normal",
          fontSize: "0.7em",
          textAlign: "center"
        }, g.style || {})));
        h ? (p = v ? (a.plotX || 0) + l : A.chartX, n += k ? 0 : this.height) : (p = l + this.offset + (k ? p : 0), n = v ? (a.plotY || 0) + n : A.chartY);
        r || g.formatter || (this.dateTime && (t = "%b %d, %Y"), r = "{value" + (t ? ":" + t : "") + "}");
        t = v ? this.isXAxis ? a.x : a.y : this.toValue(h ? A.chartX : A.chartY);
        v = a && a.series ? a.series.isPointInside(a) : E(t) && t > B && t < C;
        A = "";
        r ? A = m(r, {
          value: t
        }, d) : g.formatter && E(t) && (A = g.formatter.call(this, t));
        q.attr({
          text: A,
          x: p,
          y: n,
          visibility: v ? "inherit" : "hidden"
        });
        g = q.getBBox();
        !E(q.x) || h || k || (p = q.x - g.width / 2);
        if (E(q.y))
          if (h) {
            if (u && !k || !u && k) n = q.y - g.height
          } else n = q.y - g.height / 2;
        h ? (b = l - g.x, c = l + this.width - g.x) : (b = "left" === this.labelAlign ? l : 0, c = "right" === this.labelAlign ? l + this.width : d.chartWidth);
        q.translateX < b && (w = b - q.translateX);
        q.translateX + g.width >= c && (w = -(q.translateX + g.width - c));
        q.attr({
          x: p + w,
          y: n,
          anchorX: h ? p : this.opposite ? 0 : d.chartWidth,
          anchorY: h ? this.opposite ? d.chartHeight : 0 : n + g.height / 2
        })
      }
    });
    B.prototype.forceCropping =
      function() {
        const a = this.chart,
          b = this.options.dataGrouping;
        return !1 !== this.allowDG && b && y(b.enabled, a.options.isStock)
      };
    u(A, "update", function(a) {
      a = a.options;
      "scrollbar" in a && this.navigator && (q(!0, this.options.scrollbar, a.scrollbar), this.navigator.update({}), delete a.scrollbar)
    });
    return w
  });
  M(a, "masters/modules/stock.src.js", [a["Core/Globals.js"], a["Series/DataModifyComposition.js"], a["Stock/Navigator/Navigator.js"], a["Stock/RangeSelector/RangeSelector.js"], a["Stock/Scrollbar/Scrollbar.js"], a["Core/Axis/OrdinalAxis.js"],
    a["Series/OHLC/OHLCSeries.js"], a["Series/Flags/FlagsSeries.js"], a["Core/Chart/StockChart.js"]
  ], function(a, A, H, I, F, G, C, B, t) {
    a.Navigator = H;
    a.RangeSelector = I;
    a.Scrollbar = F;
    a.StockChart = a.stockChart = t.stockChart;
    A.compose(a.Series, a.Axis, a.Point);
    B.compose(a.Renderer);
    H.compose(a.Axis, a.Chart, a.Series);
    C.compose(a.Series);
    G.compose(a.Axis, a.Series, a.Chart);
    I.compose(a.Axis, a.Chart);
    F.compose(a.Axis)
  });
  M(a, "masters/highstock.src.js", [a["masters/highcharts.src.js"]], function(a) {
    a.product = "Highstock";
    return a
  });
  a["masters/highstock.src.js"]._modules = a;
  return a["masters/highstock.src.js"]
});
//# sourceMappingURL=highstock.js.map