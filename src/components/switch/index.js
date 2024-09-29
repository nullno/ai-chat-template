!(function(t, e) {
  //   if ('object' == typeof exports && 'object' == typeof module)
  module.exports = e(require('vue'));
  //   else if ('function' == typeof define && define.amd) define(['vue'], e);
  //   else {
  //     var n,
  //       i = 'object' == typeof exports ? e(require('vue')) : e(t.Vue);
  //     for (n in i) ('object' == typeof exports ? exports : t)[n] = i[n];
  //   }
})(window, function(t) {
  return (
    (n = {
      1: function(e, n) {
        e.exports = t;
      },
      103: function(t, e, n) {
        'use strict';
        n.r(e);
        var i = n(7),
          o = n(22),
          r =
            ((i = {
              name: 'TySwitch',
              mixins: [
                ('input',
                {
                  methods: {
                    focus: function() {
                      this.$refs.input.focus();
                    }
                  }
                }),
                o.a,
                i.a
              ],
              inject: { elForm: { default: '' } },
              props: {
                value: { type: [Boolean, String, Number], default: !1 },
                disabled: { type: Boolean, default: !1 },
                width: { type: Number, default: 40 },
                activeIconClass: { type: String, default: '' },
                inactiveIconClass: { type: String, default: '' },
                activeText: String,
                inactiveText: String,
                activeColor: { type: String, default: '' },
                inactiveColor: { type: String, default: '' },
                activeValue: { type: [Boolean, String, Number], default: !0 },
                inactiveValue: { type: [Boolean, String, Number], default: !1 },
                name: { type: String, default: '' },
                validateEvent: { type: Boolean, default: !0 },
                id: String
              },
              data: function() {
                return { coreWidth: this.width };
              },
              created: function() {
                ~[this.activeValue, this.inactiveValue].indexOf(this.value) ||
                  this.$emit('input', this.inactiveValue);
              },
              computed: {
                checked: function() {
                  return this.value === this.activeValue;
                },
                switchDisabled: function() {
                  return this.disabled || (this.elForm || {}).disabled;
                }
              },
              watch: {
                checked: function() {
                  (this.$refs.input.checked = this.checked),
                    (this.activeColor || this.inactiveColor) &&
                      this.setBackgroundColor(),
                    this.validateEvent &&
                      this.dispatch('ElFormItem', 'el.form.change', [
                        this.value
                      ]);
                }
              },
              methods: {
                handleChange: function(t) {
                  var e = this,
                    n = this.checked ? this.inactiveValue : this.activeValue;
                  this.$emit('input', n),
                    this.$emit('change', n),
                    this.$nextTick(function() {
                      e.$refs.input.checked = e.checked;
                    });
                },
                setBackgroundColor: function() {
                  var t = this.checked ? this.activeColor : this.inactiveColor;
                  (this.$refs.core.style.borderColor = t),
                    (this.$refs.core.style.backgroundColor = t);
                },
                switchValue: function() {
                  this.switchDisabled || this.handleChange();
                },
                getMigratingConfig: function() {
                  return {
                    props: {
                      'on-color': 'on-color is renamed to active-color.',
                      'off-color': 'off-color is renamed to inactive-color.',
                      'on-text': 'on-text is renamed to active-text.',
                      'off-text': 'off-text is renamed to inactive-text.',
                      'on-value': 'on-value is renamed to active-value.',
                      'off-value': 'off-value is renamed to inactive-value.',
                      'on-icon-class':
                        'on-icon-class is renamed to active-icon-class.',
                      'off-icon-class':
                        'off-icon-class is renamed to inactive-icon-class.'
                    }
                  };
                }
              },
              mounted: function() {
                (this.coreWidth = this.width || 40),
                  (this.activeColor || this.inactiveColor) &&
                    this.setBackgroundColor(),
                  (this.$refs.input.checked = this.checked);
              }
            }),
            (n = n(2)),
            Object(n.a)(
              i,
              function() {
                var t = this,
                  e = t.$createElement;
                return (e = t._self._c || e)(
                  'div',
                  {
                    staticClass: 'ty-switch',
                    class: {
                      'is-disabled': t.switchDisabled,
                      'is-checked': t.checked
                    },
                    attrs: {
                      role: 'switch',
                      'aria-checked': t.checked,
                      'aria-disabled': t.switchDisabled
                    },
                    on: {
                      click: function(e) {
                        return (
                          e.preventDefault(),
                          t.switchValue.apply(null, arguments)
                        );
                      }
                    }
                  },
                  [
                    e('input', {
                      ref: 'input',
                      staticClass: 'ty-switch__input',
                      attrs: {
                        type: 'checkbox',
                        id: t.id,
                        name: t.name,
                        'true-value': t.activeValue,
                        'false-value': t.inactiveValue,
                        disabled: t.switchDisabled
                      },
                      on: {
                        change: t.handleChange,
                        keydown: function(e) {
                          return !e.type.indexOf('key') &&
                            t._k(e.keyCode, 'enter', 13, e.key, 'Enter')
                            ? null
                            : t.switchValue.apply(null, arguments);
                        }
                      }
                    }),
                    t._v(' '),
                    t.inactiveIconClass || t.inactiveText
                      ? e(
                          'span',
                          {
                            class: [
                              'ty-switch__label',
                              'ty-switch__labty--left',
                              t.checked ? '' : 'is-active'
                            ]
                          },
                          [
                            t.inactiveIconClass
                              ? e('i', { class: [t.inactiveIconClass] })
                              : t._e(),
                            t._v(' '),
                            !t.inactiveIconClass && t.inactiveText
                              ? e(
                                  'span',
                                  { attrs: { 'aria-hidden': t.checked } },
                                  [t._v(t._s(t.inactiveText))]
                                )
                              : t._e()
                          ]
                        )
                      : t._e(),
                    t._v(' '),
                    e('span', {
                      ref: 'core',
                      staticClass: 'ty-switch__core',
                      style: { width: t.coreWidth + 'px' }
                    }),
                    t._v(' '),
                    t.activeIconClass || t.activeText
                      ? e(
                          'span',
                          {
                            class: [
                              'ty-switch__label',
                              'ty-switch__labty--right',
                              t.checked ? 'is-active' : ''
                            ]
                          },
                          [
                            t.activeIconClass
                              ? e('i', { class: [t.activeIconClass] })
                              : t._e(),
                            t._v(' '),
                            !t.activeIconClass && t.activeText
                              ? e(
                                  'span',
                                  { attrs: { 'aria-hidden': !t.checked } },
                                  [t._v(t._s(t.activeText))]
                                )
                              : t._e()
                          ]
                        )
                      : t._e()
                  ]
                );
              },
              [],
              !1,
              null,
              null,
              null
            ).exports);
        (r.install = function(t) {
          t.component(r.name, r);
        }),
          (e.default = r);
      },
      2: function(t, e, n) {
        'use strict';
        function i(t, e, n, i, o, r, c, a) {
          var s,
            u,
            l = typeof (t = t || {}).default;
          l =
            'function' ==
            typeof (t = 'object' == l || 'function' == l ? t.default : t)
              ? t.options
              : t;
          return (
            e && ((l.render = e), (l.staticRenderFns = n), (l._compiled = !0)),
            i && (l.functional = !0),
            r && (l._scopeId = r),
            c
              ? ((s = function(t) {
                  (t =
                    t ||
                    (this.$vnode && this.$vnode.ssrContext) ||
                    (this.parent &&
                      this.parent.$vnode &&
                      this.parent.$vnode.ssrContext)) ||
                    'undefined' == typeof __VUE_SSR_CONTEXT__,
                    o && o.call(this, t),
                    t &&
                      t._registeredComponents &&
                      t._registeredComponents.add(c);
                }),
                (l._ssrRegister = s))
              : o &&
                (s = a
                  ? function() {
                      o.call(this, this.$root.$options.shadowRoot);
                    }
                  : o),
            s &&
              (l.functional
                ? ((l._injectStyles = s),
                  (u = l.render),
                  (l.render = function(t, e) {
                    return s.call(e), u(t, e);
                  }))
                : ((a = l.beforeCreate),
                  (l.beforeCreate = a ? [].concat(a, s) : [s]))),
            { exports: t, options: l }
          );
        }
        n.d(e, 'a', function() {
          return i;
        });
      },
      22: function(t, e, n) {
        'use strict';
        n(6),
          (e.a = {
            mounted: function() {},
            methods: {
              getMigratingConfig: function() {
                return { props: {}, events: {} };
              }
            }
          });
      },
      5: function(t, e) {
        function n(e) {
          return (
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? (t.exports = function(t) {
                  return typeof t;
                })
              : (t.exports = function(t) {
                  return t &&
                    'function' == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                }),
            (t.exports.default = t.exports),
            (t.exports.__esModule = !0),
            n(e)
          );
        }
        (t.exports = n),
          (t.exports.default = t.exports),
          (t.exports.__esModule = !0);
      },
      6: function(t, e, n) {
        'use strict';
        n.d(e, 'e', function() {
          return o;
        }),
          n.d(e, 'g', function() {
            return r;
          }),
          n.d(e, 'd', function() {
            return c;
          }),
          n.d(e, 'b', function() {
            return a;
          }),
          n.d(e, 'a', function() {
            return s;
          }),
          n.d(e, 'c', function() {
            return u;
          }),
          n.d(e, 'f', function() {
            return l;
          }),
          (e = n(5)),
          (e = n(1));
        var i = Object.prototype.hasOwnProperty;
        function o(t, e) {
          return i.call(t, e);
        }
        function r(t) {
          for (var e = {}, n = 0; n < t.length; n++)
            t[n] &&
              (function(t, e) {
                for (var n in e) t[n] = e[n];
              })(e, t[n]);
          return e;
        }
        var c = function() {
            return Math.floor(1e4 * Math.random());
          },
          a = function(t, e) {
            for (var n = 0; n !== t.length; ++n) if (e(t[n])) return n;
            return -1;
          },
          s = function(t, e) {
            return -1 !== (e = a(t, e)) ? t[e] : void 0;
          },
          u = function(t) {
            return Array.isArray(t) ? t : t ? [t] : [];
          },
          l = function(t) {
            var e = /([^-])([A-Z])/g;
            return t
              .replace(e, '$1-$2')
              .replace(e, '$1-$2')
              .toLowerCase();
          };
      },
      7: function(t, e, n) {
        'use strict';
        function i(t, e, n) {
          this.$children.forEach(function(o) {
            o.$options.componentName === t
              ? o.$emit.apply(o, [e].concat(n))
              : i.apply(o, [t, e].concat([n]));
          });
        }
        e.a = {
          methods: {
            dispatch: function(t, e, n) {
              for (
                var i = this.$parent || this.$root,
                  o = i.$options.componentName;
                i && (!o || o !== t);

              )
                (i = i.$parent) && (o = i.$options.componentName);
              i && i.$emit.apply(i, [e].concat(n));
            },
            broadcast: function(t, e, n) {
              i.call(this, t, e, n);
            }
          }
        };
      }
    }),
    (i = {}),
    (e.m = n),
    (e.c = i),
    (e.d = function(t, n, i) {
      e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: i });
    }),
    (e.r = function(t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (e.t = function(t, n) {
      if ((1 & n && (t = e(t)), 8 & n)) return t;
      if (4 & n && 'object' == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (
        (e.r(i),
        Object.defineProperty(i, 'default', { enumerable: !0, value: t }),
        2 & n && 'string' != typeof t)
      )
        for (var o in t)
          e.d(
            i,
            o,
            function(e) {
              return t[e];
            }.bind(null, o)
          );
      return i;
    }),
    (e.n = function(t) {
      var n =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return e.d(n, 'a', n), n;
    }),
    (e.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (e.p = '/lib/'),
    e((e.s = 103))
  );
  function e(t) {
    if (i[t]) return i[t].exports;
    var o = (i[t] = { i: t, l: !1, exports: {} });
    return n[t].call(o.exports, o, o.exports, e), (o.l = !0), o.exports;
  }
  var n, i;
});
