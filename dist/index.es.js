import { jsx as W, jsxs as et } from "react/jsx-runtime";
import he from "classnames";
import * as X from "react";
import pe, { useRef as $e, useState as Rr, useCallback as Z, useContext as Pr, useMemo as Mr, useEffect as Ht } from "react";
import be from "react-dom";
function Nr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Gt(e) {
  return Nr(e) && "type" in e && typeof e.type == "string";
}
var Xt = Symbol.for("immer-nothing"), _t = Symbol.for("immer-draftable"), G = Symbol.for("immer-state"), Ar = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function K(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const r = Ar[e], n = typeof r == "function" ? r.apply(null, t) : r;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Ee = Object.getPrototypeOf;
function te(e) {
  return !!e && !!e[G];
}
function oe(e) {
  return e ? Zt(e) || Array.isArray(e) || !!e[_t] || !!e.constructor?.[_t] || we(e) || Be(e) : !1;
}
var Dr = Object.prototype.constructor.toString(), xt = /* @__PURE__ */ new WeakMap();
function Zt(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  if (t === null || t === Object.prototype)
    return !0;
  const r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  if (r === Object)
    return !0;
  if (typeof r != "function")
    return !1;
  let n = xt.get(r);
  return n === void 0 && (n = Function.toString.call(r), xt.set(r, n)), n === Dr;
}
function je(e, t, r = !0) {
  ze(e) === 0 ? (r ? Reflect.ownKeys(e) : Object.keys(e)).forEach((o) => {
    t(o, e[o], e);
  }) : e.forEach((n, o) => t(o, n, e));
}
function ze(e) {
  const t = e[G];
  return t ? t.type_ : Array.isArray(e) ? 1 : we(e) ? 2 : Be(e) ? 3 : 0;
}
function tt(e, t) {
  return ze(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Jt(e, t, r) {
  const n = ze(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function Ir(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function we(e) {
  return e instanceof Map;
}
function Be(e) {
  return e instanceof Set;
}
function fe(e) {
  return e.copy_ || e.base_;
}
function rt(e, t) {
  if (we(e))
    return new Map(e);
  if (Be(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const r = Zt(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[G];
    let o = Reflect.ownKeys(n);
    for (let s = 0; s < o.length; s++) {
      const c = o[s], u = n[c];
      u.writable === !1 && (u.writable = !0, u.configurable = !0), (u.get || u.set) && (n[c] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: u.enumerable,
        value: e[c]
      });
    }
    return Object.create(Ee(e), n);
  } else {
    const n = Ee(e);
    if (n !== null && r)
      return { ...e };
    const o = Object.create(n);
    return Object.assign(o, e);
  }
}
function pt(e, t = !1) {
  return Le(e) || te(e) || !oe(e) || (ze(e) > 1 && Object.defineProperties(e, {
    set: Te,
    add: Te,
    clear: Te,
    delete: Te
  }), Object.freeze(e), t && Object.values(e).forEach((r) => pt(r, !0))), e;
}
function jr() {
  K(2);
}
var Te = {
  value: jr
};
function Le(e) {
  return e === null || typeof e != "object" ? !0 : Object.isFrozen(e);
}
var kr = {};
function ye(e) {
  const t = kr[e];
  return t || K(0, e), t;
}
var _e;
function Qt() {
  return _e;
}
function Fr(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function wt(e, t) {
  t && (ye("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function nt(e) {
  ot(e), e.drafts_.forEach($r), e.drafts_ = null;
}
function ot(e) {
  e === _e && (_e = e.parent_);
}
function Ot(e) {
  return _e = Fr(_e, e);
}
function $r(e) {
  const t = e[G];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function St(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e !== void 0 && e !== r ? (r[G].modified_ && (nt(t), K(4)), oe(e) && (e = ke(t, e), t.parent_ || Fe(t, e)), t.patches_ && ye("Patches").generateReplacementPatches_(
    r[G].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = ke(t, r, []), nt(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Xt ? e : void 0;
}
function ke(e, t, r) {
  if (Le(t))
    return t;
  const n = e.immer_.shouldUseStrictIteration(), o = t[G];
  if (!o)
    return je(
      t,
      (s, c) => Tt(e, o, t, s, c, r),
      n
    ), t;
  if (o.scope_ !== e)
    return t;
  if (!o.modified_)
    return Fe(e, o.base_, !0), o.base_;
  if (!o.finalized_) {
    o.finalized_ = !0, o.scope_.unfinalizedDrafts_--;
    const s = o.copy_;
    let c = s, u = !1;
    o.type_ === 3 && (c = new Set(s), s.clear(), u = !0), je(
      c,
      (v, i) => Tt(
        e,
        o,
        s,
        v,
        i,
        r,
        u
      ),
      n
    ), Fe(e, s, !1), r && e.patches_ && ye("Patches").generatePatches_(
      o,
      r,
      e.patches_,
      e.inversePatches_
    );
  }
  return o.copy_;
}
function Tt(e, t, r, n, o, s, c) {
  if (o == null || typeof o != "object" && !c)
    return;
  const u = Le(o);
  if (!(u && !c)) {
    if (process.env.NODE_ENV !== "production" && o === r && K(5), te(o)) {
      const v = s && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
      !tt(t.assigned_, n) ? s.concat(n) : void 0, i = ke(e, o, v);
      if (Jt(r, n, i), te(i))
        e.canAutoFreeze_ = !1;
      else
        return;
    } else c && r.add(o);
    if (oe(o) && !u) {
      if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1 || t && t.base_ && t.base_[n] === o && u)
        return;
      ke(e, o), (!t || !t.scope_.parent_) && typeof n != "symbol" && (we(r) ? r.has(n) : Object.prototype.propertyIsEnumerable.call(r, n)) && Fe(e, o);
    }
  }
}
function Fe(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && pt(t, r);
}
function zr(e, t) {
  const r = Array.isArray(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : Qt(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let o = n, s = yt;
  r && (o = [n], s = xe);
  const { revoke: c, proxy: u } = Proxy.revocable(o, s);
  return n.draft_ = u, n.revoke_ = c, u;
}
var yt = {
  get(e, t) {
    if (t === G)
      return e;
    const r = fe(e);
    if (!tt(r, t))
      return Br(e, r, t);
    const n = r[t];
    return e.finalized_ || !oe(n) ? n : n === We(e.base_, t) ? (Ye(e), e.copy_[t] = st(n, e)) : n;
  },
  has(e, t) {
    return t in fe(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(fe(e));
  },
  set(e, t, r) {
    const n = er(fe(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const o = We(fe(e), t), s = o?.[G];
      if (s && s.base_ === r)
        return e.copy_[t] = r, e.assigned_[t] = !1, !0;
      if (Ir(r, o) && (r !== void 0 || tt(e.base_, t)))
        return !0;
      Ye(e), it(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return We(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Ye(e), it(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = fe(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: r[t]
    };
  },
  defineProperty() {
    K(11);
  },
  getPrototypeOf(e) {
    return Ee(e.base_);
  },
  setPrototypeOf() {
    K(12);
  }
}, xe = {};
je(yt, (e, t) => {
  xe[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
xe.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && K(13), xe.set.call(this, e, t, void 0);
};
xe.set = function(e, t, r) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && K(14), yt.set.call(this, e[0], t, r, e[0]);
};
function We(e, t) {
  const r = e[G];
  return (r ? fe(r) : e)[t];
}
function Br(e, t, r) {
  const n = er(t, r);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function er(e, t) {
  if (!(t in e))
    return;
  let r = Ee(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = Ee(r);
  }
}
function it(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && it(e.parent_));
}
function Ye(e) {
  e.copy_ || (e.copy_ = rt(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var Lr = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !0, this.produce = (t, r, n) => {
      if (typeof t == "function" && typeof r != "function") {
        const s = r;
        r = t;
        const c = this;
        return function(v = s, ...i) {
          return c.produce(v, (a) => r.call(this, a, ...i));
        };
      }
      typeof r != "function" && K(6), n !== void 0 && typeof n != "function" && K(7);
      let o;
      if (oe(t)) {
        const s = Ot(this), c = st(t, void 0);
        let u = !0;
        try {
          o = r(c), u = !1;
        } finally {
          u ? nt(s) : ot(s);
        }
        return wt(s, n), St(o, s);
      } else if (!t || typeof t != "object") {
        if (o = r(t), o === void 0 && (o = t), o === Xt && (o = void 0), this.autoFreeze_ && pt(o, !0), n) {
          const s = [], c = [];
          ye("Patches").generateReplacementPatches_(t, o, s, c), n(s, c);
        }
        return o;
      } else
        K(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (typeof t == "function")
        return (c, ...u) => this.produceWithPatches(c, (v) => t(v, ...u));
      let n, o;
      return [this.produce(t, r, (c, u) => {
        n = c, o = u;
      }), n, o];
    }, typeof e?.autoFreeze == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof e?.useStrictShallowCopy == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy), typeof e?.useStrictIteration == "boolean" && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    oe(e) || K(8), te(e) && (e = ht(e));
    const t = Ot(this), r = st(e, void 0);
    return r[G].isManual_ = !0, ot(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[G];
    (!r || !r.isManual_) && K(9);
    const { scope_: n } = r;
    return wt(n, t), St(void 0, n);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const o = t[r];
      if (o.path.length === 0 && o.op === "replace") {
        e = o.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const n = ye("Patches").applyPatches_;
    return te(e) ? n(e, t) : this.produce(
      e,
      (o) => n(o, t)
    );
  }
};
function st(e, t) {
  const r = we(e) ? ye("MapSet").proxyMap_(e, t) : Be(e) ? ye("MapSet").proxySet_(e, t) : zr(e, t);
  return (t ? t.scope_ : Qt()).drafts_.push(r), r;
}
function ht(e) {
  return te(e) || K(10, e), tr(e);
}
function tr(e) {
  if (!oe(e) || Le(e))
    return e;
  const t = e[G];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = rt(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = rt(e, !0);
  return je(
    r,
    (o, s) => {
      Jt(r, o, tr(s));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var qr = new Lr(), mt = qr.produce, Ur = (e, t, r) => {
  if (t.length === 1 && t[0] === r) {
    let n = !1;
    try {
      const o = {};
      e(o) === o && (n = !0);
    } catch {
    }
    if (n) {
      let o;
      try {
        throw new Error();
      } catch (s) {
        ({ stack: o } = s);
      }
      console.warn(
        `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
        { stack: o }
      );
    }
  }
}, Vr = (e, t, r) => {
  const { memoize: n, memoizeOptions: o } = t, { inputSelectorResults: s, inputSelectorResultsCopy: c } = e, u = n(() => ({}), ...o);
  if (!(u.apply(null, s) === u.apply(null, c))) {
    let i;
    try {
      throw new Error();
    } catch (a) {
      ({ stack: i } = a);
    }
    console.warn(
      `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
      {
        arguments: r,
        firstInputs: s,
        secondInputs: c,
        stack: i
      }
    );
  }
}, Wr = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function Yr(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function Kr(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function Hr(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var Ct = (e) => Array.isArray(e) ? e : [e];
function Gr(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return Hr(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function Rt(e, t) {
  const r = [], { length: n } = e;
  for (let o = 0; o < n; o++)
    r.push(e[o].apply(null, t));
  return r;
}
var Xr = (e, t) => {
  const { identityFunctionCheck: r, inputStabilityCheck: n } = {
    ...Wr,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: r === "always" || r === "once" && e,
      run: Ur
    },
    inputStabilityCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: Vr
    }
  };
}, Zr = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, Jr = typeof WeakRef < "u" ? WeakRef : Zr, Qr = 0, Pt = 1;
function Ce() {
  return {
    s: Qr,
    v: void 0,
    o: null,
    p: null
  };
}
function vt(e, t = {}) {
  let r = Ce();
  const { resultEqualityCheck: n } = t;
  let o, s = 0;
  function c() {
    let u = r;
    const { length: v } = arguments;
    for (let f = 0, p = v; f < p; f++) {
      const d = arguments[f];
      if (typeof d == "function" || typeof d == "object" && d !== null) {
        let l = u.o;
        l === null && (u.o = l = /* @__PURE__ */ new WeakMap());
        const y = l.get(d);
        y === void 0 ? (u = Ce(), l.set(d, u)) : u = y;
      } else {
        let l = u.p;
        l === null && (u.p = l = /* @__PURE__ */ new Map());
        const y = l.get(d);
        y === void 0 ? (u = Ce(), l.set(d, u)) : u = y;
      }
    }
    const i = u;
    let a;
    if (u.s === Pt)
      a = u.v;
    else if (a = e.apply(null, arguments), s++, n) {
      const f = o?.deref?.() ?? o;
      f != null && n(f, a) && (a = f, s !== 0 && s--), o = typeof a == "object" && a !== null || typeof a == "function" ? new Jr(a) : a;
    }
    return i.s = Pt, i.v = a, a;
  }
  return c.clearCache = () => {
    r = Ce(), c.resetResultsCount();
  }, c.resultsCount = () => s, c.resetResultsCount = () => {
    s = 0;
  }, c;
}
function rr(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...o) => {
    let s = 0, c = 0, u, v = {}, i = o.pop();
    typeof i == "object" && (v = i, i = o.pop()), Yr(
      i,
      `createSelector expects an output function after the inputs, but received: [${typeof i}]`
    );
    const a = {
      ...r,
      ...v
    }, {
      memoize: f,
      memoizeOptions: p = [],
      argsMemoize: d = vt,
      argsMemoizeOptions: l = [],
      devModeChecks: y = {}
    } = a, h = Ct(p), b = Ct(l), w = Gr(o), E = f(function() {
      return s++, i.apply(
        null,
        arguments
      );
    }, ...h);
    let _ = !0;
    const m = d(function() {
      c++;
      const S = Rt(
        w,
        arguments
      );
      if (u = E.apply(null, S), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: R, inputStabilityCheck: F } = Xr(_, y);
        if (R.shouldRun && R.run(
          i,
          S,
          u
        ), F.shouldRun) {
          const L = Rt(
            w,
            arguments
          );
          F.run(
            { inputSelectorResults: S, inputSelectorResultsCopy: L },
            { memoize: f, memoizeOptions: h },
            arguments
          );
        }
        _ && (_ = !1);
      }
      return u;
    }, ...b);
    return Object.assign(m, {
      resultFunc: i,
      memoizedResultFunc: E,
      dependencies: w,
      dependencyRecomputations: () => c,
      resetDependencyRecomputations: () => {
        c = 0;
      },
      lastResult: () => u,
      recomputations: () => s,
      resetRecomputations: () => {
        s = 0;
      },
      memoize: f,
      argsMemoize: d
    });
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var en = /* @__PURE__ */ rr(vt), tn = Object.assign(
  (e, t = en) => {
    Kr(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const r = Object.keys(e), n = r.map(
      (s) => e[s]
    );
    return t(
      n,
      (...s) => s.reduce((c, u, v) => (c[r[v]] = u, c), {})
    );
  },
  { withTypes: () => tn }
), rn = (...e) => {
  const t = rr(...e), r = Object.assign((...n) => {
    const o = t(...n), s = (c, ...u) => o(te(c) ? ht(c) : c, ...u);
    return Object.assign(s, o), s;
  }, {
    withTypes: () => r
  });
  return r;
}, nn = /* @__PURE__ */ rn(vt), on = (e) => e && typeof e.match == "function";
function Mt(e, t) {
  function r(...n) {
    if (t) {
      let o = t(...n);
      if (!o)
        throw new Error(process.env.NODE_ENV === "production" ? U(0) : "prepareAction did not return an object");
      return {
        type: e,
        payload: o.payload,
        ..."meta" in o && {
          meta: o.meta
        },
        ..."error" in o && {
          error: o.error
        }
      };
    }
    return {
      type: e,
      payload: n[0]
    };
  }
  return r.toString = () => `${e}`, r.type = e, r.match = (n) => Gt(n) && n.type === e, r;
}
function sn(e) {
  return Gt(e) && Object.keys(e).every(an);
}
function an(e) {
  return ["type", "payload", "error", "meta"].indexOf(e) > -1;
}
function Nt(e) {
  return oe(e) ? mt(e, () => {
  }) : e;
}
function Re(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function nr(e) {
  const t = {}, r = [];
  let n;
  const o = {
    addCase(s, c) {
      if (process.env.NODE_ENV !== "production") {
        if (r.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? U(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (n)
          throw new Error(process.env.NODE_ENV === "production" ? U(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const u = typeof s == "string" ? s : s.type;
      if (!u)
        throw new Error(process.env.NODE_ENV === "production" ? U(28) : "`builder.addCase` cannot be called with an empty action type");
      if (u in t)
        throw new Error(process.env.NODE_ENV === "production" ? U(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${u}'`);
      return t[u] = c, o;
    },
    addAsyncThunk(s, c) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? U(43) : "`builder.addAsyncThunk` should only be called before calling `builder.addDefaultCase`");
      return c.pending && (t[s.pending.type] = c.pending), c.rejected && (t[s.rejected.type] = c.rejected), c.fulfilled && (t[s.fulfilled.type] = c.fulfilled), c.settled && r.push({
        matcher: s.settled,
        reducer: c.settled
      }), o;
    },
    addMatcher(s, c) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? U(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return r.push({
        matcher: s,
        reducer: c
      }), o;
    },
    addDefaultCase(s) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? U(31) : "`builder.addDefaultCase` can only be called once");
      return n = s, o;
    }
  };
  return e(o), [t, r, n];
}
function cn(e) {
  return typeof e == "function";
}
function un(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? U(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [r, n, o] = nr(t), s;
  if (cn(e))
    s = () => Nt(e());
  else {
    const u = Nt(e);
    s = () => u;
  }
  function c(u = s(), v) {
    let i = [r[v.type], ...n.filter(({
      matcher: a
    }) => a(v)).map(({
      reducer: a
    }) => a)];
    return i.filter((a) => !!a).length === 0 && (i = [o]), i.reduce((a, f) => {
      if (f)
        if (te(a)) {
          const d = f(a, v);
          return d === void 0 ? a : d;
        } else {
          if (oe(a))
            return mt(a, (p) => f(p, v));
          {
            const p = f(a, v);
            if (p === void 0) {
              if (a === null)
                return a;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return p;
          }
        }
      return a;
    }, u);
  }
  return c.getInitialState = s, c;
}
var fn = (e, t) => on(e) ? e.match(t) : e(t);
function or(...e) {
  return (t) => e.some((r) => fn(r, t));
}
function ir(e, t) {
  if (!e || !e.meta) return !1;
  const r = typeof e.meta.requestId == "string", n = t.indexOf(e.meta.requestStatus) > -1;
  return r && n;
}
function sr(e) {
  return typeof e[0] == "function" && "pending" in e[0] && "fulfilled" in e[0] && "rejected" in e[0];
}
function ar(...e) {
  return e.length === 0 ? (t) => ir(t, ["rejected"]) : sr(e) ? or(...e.map((t) => t.rejected)) : ar()(e[0]);
}
function cr(...e) {
  return e.length === 0 ? (t) => ir(t, ["fulfilled"]) : sr(e) ? or(...e.map((t) => t.fulfilled)) : cr()(e[0]);
}
var ln = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function dn(e, t) {
  return `${e}/${t}`;
}
function pn({
  creators: e
} = {}) {
  const t = e?.asyncThunk?.[ln];
  return function(n) {
    const {
      name: o,
      reducerPath: s = o
    } = n;
    if (!o)
      throw new Error(process.env.NODE_ENV === "production" ? U(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && n.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const c = (typeof n.reducers == "function" ? n.reducers(mn()) : n.reducers) || {}, u = Object.keys(c), v = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, i = {
      addCase(E, _) {
        const m = typeof E == "string" ? E : E.type;
        if (!m)
          throw new Error(process.env.NODE_ENV === "production" ? U(12) : "`context.addCase` cannot be called with an empty action type");
        if (m in v.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? U(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + m);
        return v.sliceCaseReducersByType[m] = _, i;
      },
      addMatcher(E, _) {
        return v.sliceMatchers.push({
          matcher: E,
          reducer: _
        }), i;
      },
      exposeAction(E, _) {
        return v.actionCreators[E] = _, i;
      },
      exposeCaseReducer(E, _) {
        return v.sliceCaseReducersByName[E] = _, i;
      }
    };
    u.forEach((E) => {
      const _ = c[E], m = {
        reducerName: E,
        type: dn(o, E),
        createNotation: typeof n.reducers == "function"
      };
      bn(_) ? En(m, _, i, t) : vn(m, _, i);
    });
    function a() {
      if (process.env.NODE_ENV !== "production" && typeof n.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? U(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [E = {}, _ = [], m = void 0] = typeof n.extraReducers == "function" ? nr(n.extraReducers) : [n.extraReducers], C = {
        ...E,
        ...v.sliceCaseReducersByType
      };
      return un(n.initialState, (S) => {
        for (let R in C)
          S.addCase(R, C[R]);
        for (let R of v.sliceMatchers)
          S.addMatcher(R.matcher, R.reducer);
        for (let R of _)
          S.addMatcher(R.matcher, R.reducer);
        m && S.addDefaultCase(m);
      });
    }
    const f = (E) => E, p = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new WeakMap();
    let l;
    function y(E, _) {
      return l || (l = a()), l(E, _);
    }
    function h() {
      return l || (l = a()), l.getInitialState();
    }
    function b(E, _ = !1) {
      function m(S) {
        let R = S[E];
        if (typeof R > "u") {
          if (_)
            R = Re(d, m, h);
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? U(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return R;
      }
      function C(S = f) {
        const R = Re(p, _, () => /* @__PURE__ */ new WeakMap());
        return Re(R, S, () => {
          const F = {};
          for (const [L, V] of Object.entries(n.selectors ?? {}))
            F[L] = yn(V, S, () => Re(d, S, h), _);
          return F;
        });
      }
      return {
        reducerPath: E,
        getSelectors: C,
        get selectors() {
          return C(m);
        },
        selectSlice: m
      };
    }
    const w = {
      name: o,
      reducer: y,
      actions: v.actionCreators,
      caseReducers: v.sliceCaseReducersByName,
      getInitialState: h,
      ...b(s),
      injectInto(E, {
        reducerPath: _,
        ...m
      } = {}) {
        const C = _ ?? s;
        return E.inject({
          reducerPath: C,
          reducer: y
        }, m), {
          ...w,
          ...b(C, !0)
        };
      }
    };
    return w;
  };
}
function yn(e, t, r, n) {
  function o(s, ...c) {
    let u = t(s);
    if (typeof u > "u") {
      if (n)
        u = r();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? U(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(u, ...c);
  }
  return o.unwrapped = e, o;
}
var hn = /* @__PURE__ */ pn();
function mn() {
  function e(t, r) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...r
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...r) {
          return t(...r);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, r) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: r
      };
    },
    asyncThunk: e
  };
}
function vn({
  type: e,
  reducerName: t,
  createNotation: r
}, n, o) {
  let s, c;
  if ("reducer" in n) {
    if (r && !gn(n))
      throw new Error(process.env.NODE_ENV === "production" ? U(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    s = n.reducer, c = n.prepare;
  } else
    s = n;
  o.addCase(e, s).exposeCaseReducer(t, s).exposeAction(t, c ? Mt(e, c) : Mt(e));
}
function bn(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function gn(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function En({
  type: e,
  reducerName: t
}, r, n, o) {
  if (!o)
    throw new Error(process.env.NODE_ENV === "production" ? U(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: s,
    fulfilled: c,
    pending: u,
    rejected: v,
    settled: i,
    options: a
  } = r, f = o(e, s, a);
  n.exposeAction(t, f), c && n.addCase(f.fulfilled, c), u && n.addCase(f.pending, u), v && n.addCase(f.rejected, v), i && n.addMatcher(f.settled, i), n.exposeCaseReducer(t, {
    fulfilled: c || Pe,
    pending: u || Pe,
    rejected: v || Pe,
    settled: i || Pe
  });
}
function Pe() {
}
function _n() {
  return {
    ids: [],
    entities: {}
  };
}
function xn(e) {
  function t(r = {}, n) {
    const o = Object.assign(_n(), r);
    return n ? e.setAll(o, n) : o;
  }
  return {
    getInitialState: t
  };
}
function wn() {
  function e(t, r = {}) {
    const {
      createSelector: n = nn
    } = r, o = (f) => f.ids, s = (f) => f.entities, c = n(o, s, (f, p) => f.map((d) => p[d])), u = (f, p) => p, v = (f, p) => f[p], i = n(o, (f) => f.length);
    if (!t)
      return {
        selectIds: o,
        selectEntities: s,
        selectAll: c,
        selectTotal: i,
        selectById: n(s, u, v)
      };
    const a = n(t, s);
    return {
      selectIds: n(t, o),
      selectEntities: a,
      selectAll: n(t, c),
      selectTotal: n(t, i),
      selectById: n(a, u, v)
    };
  }
  return {
    getSelectors: e
  };
}
var On = te;
function Sn(e) {
  const t = q((r, n) => e(n));
  return function(n) {
    return t(n, void 0);
  };
}
function q(e) {
  return function(r, n) {
    function o(c) {
      return sn(c);
    }
    const s = (c) => {
      o(n) ? e(n.payload, c) : e(n, c);
    };
    return On(r) ? (s(r), r) : mt(r, s);
  };
}
function ve(e, t) {
  const r = t(e);
  return process.env.NODE_ENV !== "production" && r === void 0 && console.warn("The entity passed to the `selectId` implementation returned undefined.", "You should probably provide your own `selectId` implementation.", "The entity that was passed:", e, "The `selectId` implementation:", t.toString()), r;
}
function ae(e) {
  return Array.isArray(e) || (e = Object.values(e)), e;
}
function De(e) {
  return te(e) ? ht(e) : e;
}
function ur(e, t, r) {
  e = ae(e);
  const n = De(r.ids), o = new Set(n), s = [], c = /* @__PURE__ */ new Set([]), u = [];
  for (const v of e) {
    const i = ve(v, t);
    o.has(i) || c.has(i) ? u.push({
      id: i,
      changes: v
    }) : (c.add(i), s.push(v));
  }
  return [s, u, n];
}
function fr(e) {
  function t(l, y) {
    const h = ve(l, e);
    h in y.entities || (y.ids.push(h), y.entities[h] = l);
  }
  function r(l, y) {
    l = ae(l);
    for (const h of l)
      t(h, y);
  }
  function n(l, y) {
    const h = ve(l, e);
    h in y.entities || y.ids.push(h), y.entities[h] = l;
  }
  function o(l, y) {
    l = ae(l);
    for (const h of l)
      n(h, y);
  }
  function s(l, y) {
    l = ae(l), y.ids = [], y.entities = {}, r(l, y);
  }
  function c(l, y) {
    return u([l], y);
  }
  function u(l, y) {
    let h = !1;
    l.forEach((b) => {
      b in y.entities && (delete y.entities[b], h = !0);
    }), h && (y.ids = y.ids.filter((b) => b in y.entities));
  }
  function v(l) {
    Object.assign(l, {
      ids: [],
      entities: {}
    });
  }
  function i(l, y, h) {
    const b = h.entities[y.id];
    if (b === void 0)
      return !1;
    const w = Object.assign({}, b, y.changes), E = ve(w, e), _ = E !== y.id;
    return _ && (l[y.id] = E, delete h.entities[y.id]), h.entities[E] = w, _;
  }
  function a(l, y) {
    return f([l], y);
  }
  function f(l, y) {
    const h = {}, b = {};
    l.forEach((E) => {
      E.id in y.entities && (b[E.id] = {
        id: E.id,
        // Spreads ignore falsy values, so this works even if there isn't
        // an existing update already at this key
        changes: {
          ...b[E.id]?.changes,
          ...E.changes
        }
      });
    }), l = Object.values(b), l.length > 0 && l.filter((_) => i(h, _, y)).length > 0 && (y.ids = Object.values(y.entities).map((_) => ve(_, e)));
  }
  function p(l, y) {
    return d([l], y);
  }
  function d(l, y) {
    const [h, b] = ur(l, e, y);
    r(h, y), f(b, y);
  }
  return {
    removeAll: Sn(v),
    addOne: q(t),
    addMany: q(r),
    setOne: q(n),
    setMany: q(o),
    setAll: q(s),
    updateOne: q(a),
    updateMany: q(f),
    upsertOne: q(p),
    upsertMany: q(d),
    removeOne: q(c),
    removeMany: q(u)
  };
}
function Tn(e, t, r) {
  let n = 0, o = e.length;
  for (; n < o; ) {
    let s = n + o >>> 1;
    const c = e[s];
    r(t, c) >= 0 ? n = s + 1 : o = s;
  }
  return n;
}
function Cn(e, t, r) {
  const n = Tn(e, t, r);
  return e.splice(n, 0, t), e;
}
function Rn(e, t) {
  const {
    removeOne: r,
    removeMany: n,
    removeAll: o
  } = fr(e);
  function s(h, b) {
    return c([h], b);
  }
  function c(h, b, w) {
    h = ae(h);
    const E = new Set(w ?? De(b.ids)), _ = /* @__PURE__ */ new Set(), m = h.filter((C) => {
      const S = ve(C, e), R = !_.has(S);
      return R && _.add(S), !E.has(S) && R;
    });
    m.length !== 0 && y(b, m);
  }
  function u(h, b) {
    return v([h], b);
  }
  function v(h, b) {
    let w = {};
    if (h = ae(h), h.length !== 0) {
      for (const E of h) {
        const _ = e(E);
        w[_] = E, delete b.entities[_];
      }
      h = ae(w), y(b, h);
    }
  }
  function i(h, b) {
    h = ae(h), b.entities = {}, b.ids = [], c(h, b, []);
  }
  function a(h, b) {
    return f([h], b);
  }
  function f(h, b) {
    let w = !1, E = !1;
    for (let _ of h) {
      const m = b.entities[_.id];
      if (!m)
        continue;
      w = !0, Object.assign(m, _.changes);
      const C = e(m);
      if (_.id !== C) {
        E = !0, delete b.entities[_.id];
        const S = b.ids.indexOf(_.id);
        b.ids[S] = C, b.entities[C] = m;
      }
    }
    w && y(b, [], w, E);
  }
  function p(h, b) {
    return d([h], b);
  }
  function d(h, b) {
    const [w, E, _] = ur(h, e, b);
    w.length && c(w, b, _), E.length && f(E, b);
  }
  function l(h, b) {
    if (h.length !== b.length)
      return !1;
    for (let w = 0; w < h.length; w++)
      if (h[w] !== b[w])
        return !1;
    return !0;
  }
  const y = (h, b, w, E) => {
    const _ = De(h.entities), m = De(h.ids), C = h.entities;
    let S = m;
    E && (S = new Set(m));
    let R = [];
    for (const V of S) {
      const re = _[V];
      re && R.push(re);
    }
    const F = R.length === 0;
    for (const V of b)
      C[e(V)] = V, F || Cn(R, V, t);
    F ? R = b.slice().sort(t) : w && R.sort(t);
    const L = R.map(e);
    l(m, L) || (h.ids = L);
  };
  return {
    removeOne: r,
    removeMany: n,
    removeAll: o,
    addOne: q(s),
    updateOne: q(a),
    upsertOne: q(p),
    setOne: q(u),
    setMany: q(v),
    setAll: q(i),
    addMany: q(c),
    updateMany: q(f),
    upsertMany: q(d)
  };
}
function Pn(e = {}) {
  const {
    selectId: t,
    sortComparer: r
  } = {
    sortComparer: !1,
    selectId: (c) => c.id,
    ...e
  }, n = r ? Rn(t, r) : fr(t), o = xn(n), s = wn();
  return {
    selectId: t,
    sortComparer: r,
    ...o,
    ...s,
    ...n
  };
}
function U(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const ee = Pn({
  selectId: (e) => e.id,
  sortComparer: (e, t) => e.id - t.id
}), ue = ee.getSelectors(), Mn = {
  nextId: 0
}, lr = hn({
  name: "alerts",
  initialState: ee.getInitialState(Mn),
  reducers: {
    addAlert: (e, t) => {
      if (t.payload.context) {
        const [r] = ue.selectAll(e).filter((n) => n.context === t.payload.context);
        if (r) {
          ee.updateOne(e, { id: r.id, changes: { count: r.count + 1 } });
          return;
        }
      }
      e.nextId += 1, ee.addOne(e, {
        variant: "warning",
        ...t.payload,
        message: t.payload.message ?? "Unknown error",
        count: 1,
        id: e.nextId
      });
    },
    addError: (e, t) => {
      e.nextId += 1, ee.addOne(e, {
        ...t.payload,
        message: `[${t.payload.name ?? "Unknown"}] ${t.payload.message}`,
        count: 1,
        id: e.nextId
      });
    },
    dismissAlert: (e, t) => {
      if (t.payload.id) {
        ee.removeOne(e, t.payload.id);
        return;
      }
      if (t.payload.context) {
        const [r] = ue.selectAll(e).filter((n) => n.context === t.payload.context);
        if (r) {
          ee.removeOne(e, r.id);
          return;
        }
      }
    }
  },
  extraReducers: (e) => {
    e.addMatcher(ar, (t, r) => {
      const n = r.type.replace("/rejected", ""), [o] = ue.selectAll(t).filter((s) => s.context === n);
      if (o) {
        ee.updateOne(t, { id: o.id, changes: { count: o.count + 1 } });
        return;
      }
      t.nextId += 1, ee.addOne(t, {
        context: n,
        variant: "danger",
        message: r.error.message ?? "",
        id: t.nextId,
        count: 1
      });
    }).addMatcher(cr, (t, r) => {
      const n = r.type.replace("/fulfilled", ""), [o] = ue.selectAll(t).filter((s) => s.context === n);
      if (o) {
        ee.removeOne(t, o.id);
        return;
      }
    });
  },
  selectors: {
    selectAllAlerts: (e) => ue.selectAll(e),
    selectAlertById: (e, t) => ue.selectById(e, t),
    selectAlertByContext: (e, t) => {
      const [r] = ue.selectAll(e).filter((n) => n.context === t);
      return r ?? null;
    }
  }
}), {
  addAlert: Lo,
  dismissAlert: qo
} = lr.actions, {
  selectAllAlerts: Uo,
  selectAlertById: Vo,
  selectAlertByContext: Wo
} = lr.selectors;
function at() {
  return at = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, at.apply(null, arguments);
}
function dr(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function pr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function At(e) {
  return "default" + e.charAt(0).toUpperCase() + e.substr(1);
}
function Nn(e) {
  var t = An(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function An(e, t) {
  if (typeof e != "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function Dn(e, t, r) {
  var n = $e(e !== void 0), o = Rr(t), s = o[0], c = o[1], u = e !== void 0, v = n.current;
  return n.current = u, !u && v && s !== t && c(t), [u ? e : s, Z(function(i) {
    for (var a = arguments.length, f = new Array(a > 1 ? a - 1 : 0), p = 1; p < a; p++)
      f[p - 1] = arguments[p];
    r && r.apply(void 0, [i].concat(f)), c(i);
  }, [r])];
}
function In(e, t) {
  return Object.keys(t).reduce(function(r, n) {
    var o, s = r, c = s[At(n)], u = s[n], v = dr(s, [At(n), n].map(Nn)), i = t[n], a = Dn(u, c, e[i]), f = a[0], p = a[1];
    return at({}, v, (o = {}, o[n] = f, o[i] = p, o));
  }, e);
}
function ct(e, t) {
  return ct = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, ct(e, t);
}
function jn(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, ct(e, t);
}
const kn = ["xxl", "xl", "lg", "md", "sm", "xs"], Fn = "xs", yr = /* @__PURE__ */ X.createContext({
  prefixes: {},
  breakpoints: kn,
  minBreakpoint: Fn
}), {
  Consumer: Yo,
  Provider: Ko
} = yr;
function qe(e, t) {
  const {
    prefixes: r
  } = Pr(yr);
  return e || r[t] || t;
}
function $n(e) {
  return e && e.ownerDocument || document;
}
function zn(e) {
  var t = $n(e);
  return t && t.defaultView || window;
}
function Bn(e, t) {
  return zn(e).getComputedStyle(e, t);
}
var Ln = /([A-Z])/g;
function qn(e) {
  return e.replace(Ln, "-$1").toLowerCase();
}
var Un = /^ms-/;
function Me(e) {
  return qn(e).replace(Un, "-ms-");
}
var Vn = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function Wn(e) {
  return !!(e && Vn.test(e));
}
function hr(e, t) {
  var r = "", n = "";
  if (typeof t == "string")
    return e.style.getPropertyValue(Me(t)) || Bn(e).getPropertyValue(Me(t));
  Object.keys(t).forEach(function(o) {
    var s = t[o];
    !s && s !== 0 ? e.style.removeProperty(Me(o)) : Wn(o) ? n += o + "(" + s + ") " : r += Me(o) + ": " + s + ";";
  }), n && (r += "transform: " + n + ";"), e.style.cssText += ";" + r;
}
var Ne = { exports: {} }, Ae = { exports: {} }, $ = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dt;
function Yn() {
  if (Dt) return $;
  Dt = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, c = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, v = e ? Symbol.for("react.async_mode") : 60111, i = e ? Symbol.for("react.concurrent_mode") : 60111, a = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, l = e ? Symbol.for("react.lazy") : 60116, y = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, b = e ? Symbol.for("react.responder") : 60118, w = e ? Symbol.for("react.scope") : 60119;
  function E(m) {
    if (typeof m == "object" && m !== null) {
      var C = m.$$typeof;
      switch (C) {
        case t:
          switch (m = m.type, m) {
            case v:
            case i:
            case n:
            case s:
            case o:
            case f:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case u:
                case a:
                case l:
                case d:
                case c:
                  return m;
                default:
                  return C;
              }
          }
        case r:
          return C;
      }
    }
  }
  function _(m) {
    return E(m) === i;
  }
  return $.AsyncMode = v, $.ConcurrentMode = i, $.ContextConsumer = u, $.ContextProvider = c, $.Element = t, $.ForwardRef = a, $.Fragment = n, $.Lazy = l, $.Memo = d, $.Portal = r, $.Profiler = s, $.StrictMode = o, $.Suspense = f, $.isAsyncMode = function(m) {
    return _(m) || E(m) === v;
  }, $.isConcurrentMode = _, $.isContextConsumer = function(m) {
    return E(m) === u;
  }, $.isContextProvider = function(m) {
    return E(m) === c;
  }, $.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === t;
  }, $.isForwardRef = function(m) {
    return E(m) === a;
  }, $.isFragment = function(m) {
    return E(m) === n;
  }, $.isLazy = function(m) {
    return E(m) === l;
  }, $.isMemo = function(m) {
    return E(m) === d;
  }, $.isPortal = function(m) {
    return E(m) === r;
  }, $.isProfiler = function(m) {
    return E(m) === s;
  }, $.isStrictMode = function(m) {
    return E(m) === o;
  }, $.isSuspense = function(m) {
    return E(m) === f;
  }, $.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === n || m === i || m === s || m === o || m === f || m === p || typeof m == "object" && m !== null && (m.$$typeof === l || m.$$typeof === d || m.$$typeof === c || m.$$typeof === u || m.$$typeof === a || m.$$typeof === h || m.$$typeof === b || m.$$typeof === w || m.$$typeof === y);
  }, $.typeOf = E, $;
}
var z = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var It;
function Kn() {
  return It || (It = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, c = e ? Symbol.for("react.provider") : 60109, u = e ? Symbol.for("react.context") : 60110, v = e ? Symbol.for("react.async_mode") : 60111, i = e ? Symbol.for("react.concurrent_mode") : 60111, a = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, l = e ? Symbol.for("react.lazy") : 60116, y = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, b = e ? Symbol.for("react.responder") : 60118, w = e ? Symbol.for("react.scope") : 60119;
    function E(x) {
      return typeof x == "string" || typeof x == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      x === n || x === i || x === s || x === o || x === f || x === p || typeof x == "object" && x !== null && (x.$$typeof === l || x.$$typeof === d || x.$$typeof === c || x.$$typeof === u || x.$$typeof === a || x.$$typeof === h || x.$$typeof === b || x.$$typeof === w || x.$$typeof === y);
    }
    function _(x) {
      if (typeof x == "object" && x !== null) {
        var Q = x.$$typeof;
        switch (Q) {
          case t:
            var Se = x.type;
            switch (Se) {
              case v:
              case i:
              case n:
              case s:
              case o:
              case f:
                return Se;
              default:
                var Et = Se && Se.$$typeof;
                switch (Et) {
                  case u:
                  case a:
                  case l:
                  case d:
                  case c:
                    return Et;
                  default:
                    return Q;
                }
            }
          case r:
            return Q;
        }
      }
    }
    var m = v, C = i, S = u, R = c, F = t, L = a, V = n, re = l, H = d, ne = r, Ue = s, J = o, ce = f, Oe = !1;
    function Ve(x) {
      return Oe || (Oe = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), g(x) || _(x) === v;
    }
    function g(x) {
      return _(x) === i;
    }
    function O(x) {
      return _(x) === u;
    }
    function D(x) {
      return _(x) === c;
    }
    function N(x) {
      return typeof x == "object" && x !== null && x.$$typeof === t;
    }
    function P(x) {
      return _(x) === a;
    }
    function I(x) {
      return _(x) === n;
    }
    function M(x) {
      return _(x) === l;
    }
    function A(x) {
      return _(x) === d;
    }
    function j(x) {
      return _(x) === r;
    }
    function B(x) {
      return _(x) === s;
    }
    function k(x) {
      return _(x) === o;
    }
    function Y(x) {
      return _(x) === f;
    }
    z.AsyncMode = m, z.ConcurrentMode = C, z.ContextConsumer = S, z.ContextProvider = R, z.Element = F, z.ForwardRef = L, z.Fragment = V, z.Lazy = re, z.Memo = H, z.Portal = ne, z.Profiler = Ue, z.StrictMode = J, z.Suspense = ce, z.isAsyncMode = Ve, z.isConcurrentMode = g, z.isContextConsumer = O, z.isContextProvider = D, z.isElement = N, z.isForwardRef = P, z.isFragment = I, z.isLazy = M, z.isMemo = A, z.isPortal = j, z.isProfiler = B, z.isStrictMode = k, z.isSuspense = Y, z.isValidElementType = E, z.typeOf = _;
  })()), z;
}
var jt;
function mr() {
  return jt || (jt = 1, process.env.NODE_ENV === "production" ? Ae.exports = Yn() : Ae.exports = Kn()), Ae.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ke, kt;
function Hn() {
  if (kt) return Ke;
  kt = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(s) {
    if (s == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(s);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var s = new String("abc");
      if (s[5] = "de", Object.getOwnPropertyNames(s)[0] === "5")
        return !1;
      for (var c = {}, u = 0; u < 10; u++)
        c["_" + String.fromCharCode(u)] = u;
      var v = Object.getOwnPropertyNames(c).map(function(a) {
        return c[a];
      });
      if (v.join("") !== "0123456789")
        return !1;
      var i = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(a) {
        i[a] = a;
      }), Object.keys(Object.assign({}, i)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Ke = o() ? Object.assign : function(s, c) {
    for (var u, v = n(s), i, a = 1; a < arguments.length; a++) {
      u = Object(arguments[a]);
      for (var f in u)
        t.call(u, f) && (v[f] = u[f]);
      if (e) {
        i = e(u);
        for (var p = 0; p < i.length; p++)
          r.call(u, i[p]) && (v[i[p]] = u[i[p]]);
      }
    }
    return v;
  }, Ke;
}
var He, Ft;
function bt() {
  if (Ft) return He;
  Ft = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return He = e, He;
}
var Ge, $t;
function vr() {
  return $t || ($t = 1, Ge = Function.call.bind(Object.prototype.hasOwnProperty)), Ge;
}
var Xe, zt;
function Gn() {
  if (zt) return Xe;
  zt = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = /* @__PURE__ */ bt(), r = {}, n = /* @__PURE__ */ vr();
    e = function(s) {
      var c = "Warning: " + s;
      typeof console < "u" && console.error(c);
      try {
        throw new Error(c);
      } catch {
      }
    };
  }
  function o(s, c, u, v, i) {
    if (process.env.NODE_ENV !== "production") {
      for (var a in s)
        if (n(s, a)) {
          var f;
          try {
            if (typeof s[a] != "function") {
              var p = Error(
                (v || "React class") + ": " + u + " type `" + a + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[a] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw p.name = "Invariant Violation", p;
            }
            f = s[a](c, a, v, u, null, t);
          } catch (l) {
            f = l;
          }
          if (f && !(f instanceof Error) && e(
            (v || "React class") + ": type specification of " + u + " `" + a + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in r)) {
            r[f.message] = !0;
            var d = i ? i() : "";
            e(
              "Failed " + u + " type: " + f.message + (d ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, Xe = o, Xe;
}
var Ze, Bt;
function Xn() {
  if (Bt) return Ze;
  Bt = 1;
  var e = mr(), t = Hn(), r = /* @__PURE__ */ bt(), n = /* @__PURE__ */ vr(), o = /* @__PURE__ */ Gn(), s = function() {
  };
  process.env.NODE_ENV !== "production" && (s = function(u) {
    var v = "Warning: " + u;
    typeof console < "u" && console.error(v);
    try {
      throw new Error(v);
    } catch {
    }
  });
  function c() {
    return null;
  }
  return Ze = function(u, v) {
    var i = typeof Symbol == "function" && Symbol.iterator, a = "@@iterator";
    function f(g) {
      var O = g && (i && g[i] || g[a]);
      if (typeof O == "function")
        return O;
    }
    var p = "<<anonymous>>", d = {
      array: b("array"),
      bigint: b("bigint"),
      bool: b("boolean"),
      func: b("function"),
      number: b("number"),
      object: b("object"),
      string: b("string"),
      symbol: b("symbol"),
      any: w(),
      arrayOf: E,
      element: _(),
      elementType: m(),
      instanceOf: C,
      node: L(),
      objectOf: R,
      oneOf: S,
      oneOfType: F,
      shape: re,
      exact: H
    };
    function l(g, O) {
      return g === O ? g !== 0 || 1 / g === 1 / O : g !== g && O !== O;
    }
    function y(g, O) {
      this.message = g, this.data = O && typeof O == "object" ? O : {}, this.stack = "";
    }
    y.prototype = Error.prototype;
    function h(g) {
      if (process.env.NODE_ENV !== "production")
        var O = {}, D = 0;
      function N(I, M, A, j, B, k, Y) {
        if (j = j || p, k = k || A, Y !== r) {
          if (v) {
            var x = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw x.name = "Invariant Violation", x;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Q = j + ":" + A;
            !O[Q] && // Avoid spamming the console because they are often not actionable except for lib authors
            D < 3 && (s(
              "You are manually calling a React.PropTypes validation function for the `" + k + "` prop on `" + j + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), O[Q] = !0, D++);
          }
        }
        return M[A] == null ? I ? M[A] === null ? new y("The " + B + " `" + k + "` is marked as required " + ("in `" + j + "`, but its value is `null`.")) : new y("The " + B + " `" + k + "` is marked as required in " + ("`" + j + "`, but its value is `undefined`.")) : null : g(M, A, j, B, k);
      }
      var P = N.bind(null, !1);
      return P.isRequired = N.bind(null, !0), P;
    }
    function b(g) {
      function O(D, N, P, I, M, A) {
        var j = D[N], B = J(j);
        if (B !== g) {
          var k = ce(j);
          return new y(
            "Invalid " + I + " `" + M + "` of type " + ("`" + k + "` supplied to `" + P + "`, expected ") + ("`" + g + "`."),
            { expectedType: g }
          );
        }
        return null;
      }
      return h(O);
    }
    function w() {
      return h(c);
    }
    function E(g) {
      function O(D, N, P, I, M) {
        if (typeof g != "function")
          return new y("Property `" + M + "` of component `" + P + "` has invalid PropType notation inside arrayOf.");
        var A = D[N];
        if (!Array.isArray(A)) {
          var j = J(A);
          return new y("Invalid " + I + " `" + M + "` of type " + ("`" + j + "` supplied to `" + P + "`, expected an array."));
        }
        for (var B = 0; B < A.length; B++) {
          var k = g(A, B, P, I, M + "[" + B + "]", r);
          if (k instanceof Error)
            return k;
        }
        return null;
      }
      return h(O);
    }
    function _() {
      function g(O, D, N, P, I) {
        var M = O[D];
        if (!u(M)) {
          var A = J(M);
          return new y("Invalid " + P + " `" + I + "` of type " + ("`" + A + "` supplied to `" + N + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(g);
    }
    function m() {
      function g(O, D, N, P, I) {
        var M = O[D];
        if (!e.isValidElementType(M)) {
          var A = J(M);
          return new y("Invalid " + P + " `" + I + "` of type " + ("`" + A + "` supplied to `" + N + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(g);
    }
    function C(g) {
      function O(D, N, P, I, M) {
        if (!(D[N] instanceof g)) {
          var A = g.name || p, j = Ve(D[N]);
          return new y("Invalid " + I + " `" + M + "` of type " + ("`" + j + "` supplied to `" + P + "`, expected ") + ("instance of `" + A + "`."));
        }
        return null;
      }
      return h(O);
    }
    function S(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? s(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : s("Invalid argument supplied to oneOf, expected an array.")), c;
      function O(D, N, P, I, M) {
        for (var A = D[N], j = 0; j < g.length; j++)
          if (l(A, g[j]))
            return null;
        var B = JSON.stringify(g, function(Y, x) {
          var Q = ce(x);
          return Q === "symbol" ? String(x) : x;
        });
        return new y("Invalid " + I + " `" + M + "` of value `" + String(A) + "` " + ("supplied to `" + P + "`, expected one of " + B + "."));
      }
      return h(O);
    }
    function R(g) {
      function O(D, N, P, I, M) {
        if (typeof g != "function")
          return new y("Property `" + M + "` of component `" + P + "` has invalid PropType notation inside objectOf.");
        var A = D[N], j = J(A);
        if (j !== "object")
          return new y("Invalid " + I + " `" + M + "` of type " + ("`" + j + "` supplied to `" + P + "`, expected an object."));
        for (var B in A)
          if (n(A, B)) {
            var k = g(A, B, P, I, M + "." + B, r);
            if (k instanceof Error)
              return k;
          }
        return null;
      }
      return h(O);
    }
    function F(g) {
      if (!Array.isArray(g))
        return process.env.NODE_ENV !== "production" && s("Invalid argument supplied to oneOfType, expected an instance of array."), c;
      for (var O = 0; O < g.length; O++) {
        var D = g[O];
        if (typeof D != "function")
          return s(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Oe(D) + " at index " + O + "."
          ), c;
      }
      function N(P, I, M, A, j) {
        for (var B = [], k = 0; k < g.length; k++) {
          var Y = g[k], x = Y(P, I, M, A, j, r);
          if (x == null)
            return null;
          x.data && n(x.data, "expectedType") && B.push(x.data.expectedType);
        }
        var Q = B.length > 0 ? ", expected one of type [" + B.join(", ") + "]" : "";
        return new y("Invalid " + A + " `" + j + "` supplied to " + ("`" + M + "`" + Q + "."));
      }
      return h(N);
    }
    function L() {
      function g(O, D, N, P, I) {
        return ne(O[D]) ? null : new y("Invalid " + P + " `" + I + "` supplied to " + ("`" + N + "`, expected a ReactNode."));
      }
      return h(g);
    }
    function V(g, O, D, N, P) {
      return new y(
        (g || "React class") + ": " + O + " type `" + D + "." + N + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + P + "`."
      );
    }
    function re(g) {
      function O(D, N, P, I, M) {
        var A = D[N], j = J(A);
        if (j !== "object")
          return new y("Invalid " + I + " `" + M + "` of type `" + j + "` " + ("supplied to `" + P + "`, expected `object`."));
        for (var B in g) {
          var k = g[B];
          if (typeof k != "function")
            return V(P, I, M, B, ce(k));
          var Y = k(A, B, P, I, M + "." + B, r);
          if (Y)
            return Y;
        }
        return null;
      }
      return h(O);
    }
    function H(g) {
      function O(D, N, P, I, M) {
        var A = D[N], j = J(A);
        if (j !== "object")
          return new y("Invalid " + I + " `" + M + "` of type `" + j + "` " + ("supplied to `" + P + "`, expected `object`."));
        var B = t({}, D[N], g);
        for (var k in B) {
          var Y = g[k];
          if (n(g, k) && typeof Y != "function")
            return V(P, I, M, k, ce(Y));
          if (!Y)
            return new y(
              "Invalid " + I + " `" + M + "` key `" + k + "` supplied to `" + P + "`.\nBad object: " + JSON.stringify(D[N], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(g), null, "  ")
            );
          var x = Y(A, k, P, I, M + "." + k, r);
          if (x)
            return x;
        }
        return null;
      }
      return h(O);
    }
    function ne(g) {
      switch (typeof g) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !g;
        case "object":
          if (Array.isArray(g))
            return g.every(ne);
          if (g === null || u(g))
            return !0;
          var O = f(g);
          if (O) {
            var D = O.call(g), N;
            if (O !== g.entries) {
              for (; !(N = D.next()).done; )
                if (!ne(N.value))
                  return !1;
            } else
              for (; !(N = D.next()).done; ) {
                var P = N.value;
                if (P && !ne(P[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function Ue(g, O) {
      return g === "symbol" ? !0 : O ? O["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && O instanceof Symbol : !1;
    }
    function J(g) {
      var O = typeof g;
      return Array.isArray(g) ? "array" : g instanceof RegExp ? "object" : Ue(O, g) ? "symbol" : O;
    }
    function ce(g) {
      if (typeof g > "u" || g === null)
        return "" + g;
      var O = J(g);
      if (O === "object") {
        if (g instanceof Date)
          return "date";
        if (g instanceof RegExp)
          return "regexp";
      }
      return O;
    }
    function Oe(g) {
      var O = ce(g);
      switch (O) {
        case "array":
        case "object":
          return "an " + O;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + O;
        default:
          return O;
      }
    }
    function Ve(g) {
      return !g.constructor || !g.constructor.name ? p : g.constructor.name;
    }
    return d.checkPropTypes = o, d.resetWarningCache = o.resetWarningCache, d.PropTypes = d, d;
  }, Ze;
}
var Je, Lt;
function Zn() {
  if (Lt) return Je;
  Lt = 1;
  var e = /* @__PURE__ */ bt();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, Je = function() {
    function n(c, u, v, i, a, f) {
      if (f !== e) {
        var p = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw p.name = "Invariant Violation", p;
      }
    }
    n.isRequired = n;
    function o() {
      return n;
    }
    var s = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: o,
      element: n,
      elementType: n,
      instanceOf: o,
      node: n,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return s.PropTypes = s, s;
  }, Je;
}
var qt;
function Jn() {
  if (qt) return Ne.exports;
  if (qt = 1, process.env.NODE_ENV !== "production") {
    var e = mr(), t = !0;
    Ne.exports = /* @__PURE__ */ Xn()(e.isElement, t);
  } else
    Ne.exports = /* @__PURE__ */ Zn()();
  return Ne.exports;
}
var Qn = /* @__PURE__ */ Jn();
const T = /* @__PURE__ */ pr(Qn), Ut = {
  disabled: !1
};
var eo = process.env.NODE_ENV !== "production" ? T.oneOfType([T.number, T.shape({
  enter: T.number,
  exit: T.number,
  appear: T.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && T.oneOfType([T.string, T.shape({
  enter: T.string,
  exit: T.string,
  active: T.string
}), T.shape({
  enter: T.string,
  enterDone: T.string,
  enterActive: T.string,
  exit: T.string,
  exitDone: T.string,
  exitActive: T.string
})]);
const br = pe.createContext(null);
var to = function(t) {
  return t.scrollTop;
}, ge = "unmounted", le = "exited", se = "entering", de = "entered", ut = "exiting", ie = /* @__PURE__ */ (function(e) {
  jn(t, e);
  function t(n, o) {
    var s;
    s = e.call(this, n, o) || this;
    var c = o, u = c && !c.isMounting ? n.enter : n.appear, v;
    return s.appearStatus = null, n.in ? u ? (v = le, s.appearStatus = se) : v = de : n.unmountOnExit || n.mountOnEnter ? v = ge : v = le, s.state = {
      status: v
    }, s.nextCallback = null, s;
  }
  t.getDerivedStateFromProps = function(o, s) {
    var c = o.in;
    return c && s.status === ge ? {
      status: le
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(o) {
    var s = null;
    if (o !== this.props) {
      var c = this.state.status;
      this.props.in ? c !== se && c !== de && (s = se) : (c === se || c === de) && (s = ut);
    }
    this.updateStatus(!1, s);
  }, r.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, r.getTimeouts = function() {
    var o = this.props.timeout, s, c, u;
    return s = c = u = o, o != null && typeof o != "number" && (s = o.exit, c = o.enter, u = o.appear !== void 0 ? o.appear : c), {
      exit: s,
      enter: c,
      appear: u
    };
  }, r.updateStatus = function(o, s) {
    if (o === void 0 && (o = !1), s !== null)
      if (this.cancelNextCallback(), s === se) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var c = this.props.nodeRef ? this.props.nodeRef.current : be.findDOMNode(this);
          c && to(c);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === le && this.setState({
      status: ge
    });
  }, r.performEnter = function(o) {
    var s = this, c = this.props.enter, u = this.context ? this.context.isMounting : o, v = this.props.nodeRef ? [u] : [be.findDOMNode(this), u], i = v[0], a = v[1], f = this.getTimeouts(), p = u ? f.appear : f.enter;
    if (!o && !c || Ut.disabled) {
      this.safeSetState({
        status: de
      }, function() {
        s.props.onEntered(i);
      });
      return;
    }
    this.props.onEnter(i, a), this.safeSetState({
      status: se
    }, function() {
      s.props.onEntering(i, a), s.onTransitionEnd(p, function() {
        s.safeSetState({
          status: de
        }, function() {
          s.props.onEntered(i, a);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, s = this.props.exit, c = this.getTimeouts(), u = this.props.nodeRef ? void 0 : be.findDOMNode(this);
    if (!s || Ut.disabled) {
      this.safeSetState({
        status: le
      }, function() {
        o.props.onExited(u);
      });
      return;
    }
    this.props.onExit(u), this.safeSetState({
      status: ut
    }, function() {
      o.props.onExiting(u), o.onTransitionEnd(c.exit, function() {
        o.safeSetState({
          status: le
        }, function() {
          o.props.onExited(u);
        });
      });
    });
  }, r.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, r.safeSetState = function(o, s) {
    s = this.setNextCallback(s), this.setState(o, s);
  }, r.setNextCallback = function(o) {
    var s = this, c = !0;
    return this.nextCallback = function(u) {
      c && (c = !1, s.nextCallback = null, o(u));
    }, this.nextCallback.cancel = function() {
      c = !1;
    }, this.nextCallback;
  }, r.onTransitionEnd = function(o, s) {
    this.setNextCallback(s);
    var c = this.props.nodeRef ? this.props.nodeRef.current : be.findDOMNode(this), u = o == null && !this.props.addEndListener;
    if (!c || u) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var v = this.props.nodeRef ? [this.nextCallback] : [c, this.nextCallback], i = v[0], a = v[1];
      this.props.addEndListener(i, a);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, r.render = function() {
    var o = this.state.status;
    if (o === ge)
      return null;
    var s = this.props, c = s.children;
    s.in, s.mountOnEnter, s.unmountOnExit, s.appear, s.enter, s.exit, s.timeout, s.addEndListener, s.onEnter, s.onEntering, s.onEntered, s.onExit, s.onExiting, s.onExited, s.nodeRef;
    var u = dr(s, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ pe.createElement(br.Provider, {
        value: null
      }, typeof c == "function" ? c(o, u) : pe.cloneElement(pe.Children.only(c), u))
    );
  }, t;
})(pe.Component);
ie.contextType = br;
ie.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: T.shape({
    current: typeof Element > "u" ? T.any : function(e, t, r, n, o, s) {
      var c = e[t];
      return T.instanceOf(c && "ownerDocument" in c ? c.ownerDocument.defaultView.Element : Element)(e, t, r, n, o, s);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: T.oneOfType([T.func.isRequired, T.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: T.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: T.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: T.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: T.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: T.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: T.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function(t) {
    var r = eo;
    t.addEndListener || (r = r.isRequired);
    for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++)
      o[s - 1] = arguments[s];
    return r.apply(void 0, [t].concat(o));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: T.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: T.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: T.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: T.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: T.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: T.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: T.func
} : {};
function me() {
}
ie.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: me,
  onEntering: me,
  onEntered: me,
  onExit: me,
  onExiting: me,
  onExited: me
};
ie.UNMOUNTED = ge;
ie.EXITED = le;
ie.ENTERING = se;
ie.ENTERED = de;
ie.EXITING = ut;
function ro() {
  const e = X.version.split(".");
  return {
    major: +e[0],
    minor: +e[1],
    patch: +e[2]
  };
}
function no(e) {
  if (!e || typeof e == "function")
    return null;
  const {
    major: t
  } = ro();
  return t >= 19 ? e.props.ref : e.ref;
}
const oo = !!(typeof window < "u" && window.document && window.document.createElement);
var ft = !1, lt = !1;
try {
  var Qe = {
    get passive() {
      return ft = !0;
    },
    get once() {
      return lt = ft = !0;
    }
  };
  oo && (window.addEventListener("test", Qe, Qe), window.removeEventListener("test", Qe, !0));
} catch {
}
function io(e, t, r, n) {
  if (n && typeof n != "boolean" && !lt) {
    var o = n.once, s = n.capture, c = r;
    !lt && o && (c = r.__once || function u(v) {
      this.removeEventListener(t, u, s), r.call(this, v);
    }, r.__once = c), e.addEventListener(t, c, ft ? n : s);
  }
  e.addEventListener(t, r, n);
}
function so(e, t, r, n) {
  var o = n && typeof n != "boolean" ? n.capture : n;
  e.removeEventListener(t, r, o), r.__once && e.removeEventListener(t, r.__once, o);
}
function gr(e, t, r, n) {
  return io(e, t, r, n), function() {
    so(e, t, r, n);
  };
}
function ao(e, t, r, n) {
  if (n === void 0 && (n = !0), e) {
    var o = document.createEvent("HTMLEvents");
    o.initEvent(t, r, n), e.dispatchEvent(o);
  }
}
function co(e) {
  var t = hr(e, "transitionDuration") || "", r = t.indexOf("ms") === -1 ? 1e3 : 1;
  return parseFloat(t) * r;
}
function uo(e, t, r) {
  r === void 0 && (r = 5);
  var n = !1, o = setTimeout(function() {
    n || ao(e, "transitionend", !0);
  }, t + r), s = gr(e, "transitionend", function() {
    n = !0;
  }, {
    once: !0
  });
  return function() {
    clearTimeout(o), s();
  };
}
function fo(e, t, r, n) {
  r == null && (r = co(e) || 0);
  var o = uo(e, r, n), s = gr(e, "transitionend", t);
  return function() {
    o(), s();
  };
}
function Vt(e, t) {
  const r = hr(e, t) || "", n = r.indexOf("ms") === -1 ? 1e3 : 1;
  return parseFloat(r) * n;
}
function lo(e, t) {
  const r = Vt(e, "transitionDuration"), n = Vt(e, "transitionDelay"), o = fo(e, (s) => {
    s.target === e && (o(), t(s));
  }, r + n);
}
function po(e) {
  e.offsetHeight;
}
const Wt = (e) => !e || typeof e == "function" ? e : (t) => {
  e.current = t;
};
function yo(e, t) {
  const r = Wt(e), n = Wt(t);
  return (o) => {
    r && r(o), n && n(o);
  };
}
function ho(e, t) {
  return Mr(() => yo(e, t), [e, t]);
}
function mo(e) {
  return e && "setState" in e ? be.findDOMNode(e) : e ?? null;
}
const Er = /* @__PURE__ */ pe.forwardRef(({
  onEnter: e,
  onEntering: t,
  onEntered: r,
  onExit: n,
  onExiting: o,
  onExited: s,
  addEndListener: c,
  children: u,
  childRef: v,
  ...i
}, a) => {
  const f = $e(null), p = ho(f, v), d = (C) => {
    p(mo(C));
  }, l = (C) => (S) => {
    C && f.current && C(f.current, S);
  }, y = Z(l(e), [e]), h = Z(l(t), [t]), b = Z(l(r), [r]), w = Z(l(n), [n]), E = Z(l(o), [o]), _ = Z(l(s), [s]), m = Z(l(c), [c]);
  return /* @__PURE__ */ W(ie, {
    ref: a,
    ...i,
    onEnter: y,
    onEntered: b,
    onEntering: h,
    onExit: w,
    onExited: _,
    onExiting: E,
    addEndListener: m,
    nodeRef: f,
    children: typeof u == "function" ? (C, S) => (
      // TODO: Types for RTG missing innerProps, so need to cast.
      u(C, {
        ...S,
        ref: d
      })
    ) : /* @__PURE__ */ pe.cloneElement(u, {
      ref: d
    })
  });
});
Er.displayName = "TransitionWrapper";
function vo(e) {
  const t = $e(e);
  return Ht(() => {
    t.current = e;
  }, [e]), t;
}
function bo(e) {
  const t = vo(e);
  return Z(function(...r) {
    return t.current && t.current(...r);
  }, [t]);
}
const go = ((e) => (
  // eslint-disable-next-line react/display-name
  /* @__PURE__ */ X.forwardRef((t, r) => /* @__PURE__ */ W("div", {
    ...t,
    ref: r,
    className: he(t.className, e)
  }))
)), _r = go("h4");
_r.displayName = "DivStyledAsH4";
const xr = /* @__PURE__ */ X.forwardRef(({
  className: e,
  bsPrefix: t,
  as: r = _r,
  ...n
}, o) => (t = qe(t, "alert-heading"), /* @__PURE__ */ W(r, {
  ref: o,
  className: he(e, t),
  ...n
})));
xr.displayName = "AlertHeading";
function Eo(e) {
  const t = $e(e);
  return Ht(() => {
    t.current = e;
  }, [e]), t;
}
function _o(e) {
  const t = Eo(e);
  return Z(function(...r) {
    return t.current && t.current(...r);
  }, [t]);
}
const xo = ["as", "disabled"];
function wo(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) >= 0) continue;
    r[n] = e[n];
  }
  return r;
}
function Oo(e) {
  return !e || e.trim() === "#";
}
function wr({
  tagName: e,
  disabled: t,
  href: r,
  target: n,
  rel: o,
  role: s,
  onClick: c,
  tabIndex: u = 0,
  type: v
}) {
  e || (r != null || n != null || o != null ? e = "a" : e = "button");
  const i = {
    tagName: e
  };
  if (e === "button")
    return [{
      type: v || "button",
      disabled: t
    }, i];
  const a = (p) => {
    if ((t || e === "a" && Oo(r)) && p.preventDefault(), t) {
      p.stopPropagation();
      return;
    }
    c?.(p);
  }, f = (p) => {
    p.key === " " && (p.preventDefault(), a(p));
  };
  return e === "a" && (r || (r = "#"), t && (r = void 0)), [{
    role: s ?? "button",
    // explicitly undefined so that it overrides the props disabled in a spread
    // e.g. <Tag {...props} {...hookProps} />
    disabled: void 0,
    tabIndex: t ? void 0 : u,
    href: r,
    target: e === "a" ? n : void 0,
    "aria-disabled": t || void 0,
    rel: e === "a" ? o : void 0,
    onClick: a,
    onKeyDown: f
  }, i];
}
const So = /* @__PURE__ */ X.forwardRef((e, t) => {
  let {
    as: r,
    disabled: n
  } = e, o = wo(e, xo);
  const [s, {
    tagName: c
  }] = wr(Object.assign({
    tagName: r,
    disabled: n
  }, o));
  return /* @__PURE__ */ W(c, Object.assign({}, o, s, {
    ref: t
  }));
});
So.displayName = "Button";
const To = ["onKeyDown"];
function Co(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) >= 0) continue;
    r[n] = e[n];
  }
  return r;
}
function Ro(e) {
  return !e || e.trim() === "#";
}
const Or = /* @__PURE__ */ X.forwardRef((e, t) => {
  let {
    onKeyDown: r
  } = e, n = Co(e, To);
  const [o] = wr(Object.assign({
    tagName: "a"
  }, n)), s = _o((c) => {
    o.onKeyDown(c), r?.(c);
  });
  return Ro(n.href) || n.role === "button" ? /* @__PURE__ */ W("a", Object.assign({
    ref: t
  }, n, o, {
    onKeyDown: s
  })) : /* @__PURE__ */ W("a", Object.assign({
    ref: t
  }, n, {
    onKeyDown: r
  }));
});
Or.displayName = "Anchor";
const Sr = /* @__PURE__ */ X.forwardRef(({
  className: e,
  bsPrefix: t,
  as: r = Or,
  ...n
}, o) => (t = qe(t, "alert-link"), /* @__PURE__ */ W(r, {
  ref: o,
  className: he(e, t),
  ...n
})));
Sr.displayName = "AlertLink";
const Po = {
  [se]: "show",
  [de]: "show"
}, dt = /* @__PURE__ */ X.forwardRef(({
  className: e,
  children: t,
  transitionClasses: r = {},
  onEnter: n,
  ...o
}, s) => {
  const c = {
    in: !1,
    timeout: 300,
    mountOnEnter: !1,
    unmountOnExit: !1,
    appear: !1,
    ...o
  }, u = Z((v, i) => {
    po(v), n?.(v, i);
  }, [n]);
  return /* @__PURE__ */ W(Er, {
    ref: s,
    addEndListener: lo,
    ...c,
    onEnter: u,
    childRef: no(t),
    children: (v, i) => /* @__PURE__ */ X.cloneElement(t, {
      ...i,
      className: he("fade", e, t.props.className, Po[v], r[v])
    })
  });
});
dt.displayName = "Fade";
const Mo = {
  /** An accessible label indicating the relevant information about the Close Button. */
  "aria-label": T.string,
  /** A callback fired after the Close Button is clicked. */
  onClick: T.func,
  /**
   * Render different color variant for the button.
   *
   * Omitting this will render the default dark color.
   */
  variant: T.oneOf(["white"])
}, gt = /* @__PURE__ */ X.forwardRef(({
  className: e,
  variant: t,
  "aria-label": r = "Close",
  ...n
}, o) => /* @__PURE__ */ W("button", {
  ref: o,
  type: "button",
  className: he("btn-close", t && `btn-close-${t}`, e),
  "aria-label": r,
  ...n
}));
gt.displayName = "CloseButton";
gt.propTypes = Mo;
const Tr = /* @__PURE__ */ X.forwardRef((e, t) => {
  const {
    bsPrefix: r,
    show: n = !0,
    closeLabel: o = "Close alert",
    closeVariant: s,
    className: c,
    children: u,
    variant: v = "primary",
    onClose: i,
    dismissible: a,
    transition: f = dt,
    ...p
  } = In(e, {
    show: "onClose"
  }), d = qe(r, "alert"), l = bo((b) => {
    i && i(!1, b);
  }), y = f === !0 ? dt : f, h = /* @__PURE__ */ et("div", {
    role: "alert",
    ...y ? void 0 : p,
    ref: t,
    className: he(c, d, v && `${d}-${v}`, a && `${d}-dismissible`),
    children: [a && /* @__PURE__ */ W(gt, {
      onClick: l,
      "aria-label": o,
      variant: s
    }), u]
  });
  return y ? /* @__PURE__ */ W(y, {
    unmountOnExit: !0,
    ...p,
    ref: void 0,
    in: n,
    children: h
  }) : n ? h : null;
});
Tr.displayName = "Alert";
const Yt = Object.assign(Tr, {
  Link: Sr,
  Heading: xr
}), Cr = /* @__PURE__ */ X.forwardRef(({
  bsPrefix: e,
  bg: t = "primary",
  pill: r = !1,
  text: n,
  className: o,
  as: s = "span",
  ...c
}, u) => {
  const v = qe(e, "badge");
  return /* @__PURE__ */ W(s, {
    ref: u,
    ...c,
    className: he(o, v, r && "rounded-pill", n && `text-${n}`, t && `bg-${t}`)
  });
});
Cr.displayName = "Badge";
var Ie = { exports: {} };
/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
var No = Ie.exports, Kt;
function Ao() {
  return Kt || (Kt = 1, (function(e) {
    (function(t, r) {
      e.exports ? e.exports = r() : t.numeral = r();
    })(No, function() {
      var t, r, n = "2.0.6", o = {}, s = {}, c = {
        currentLocale: "en",
        zeroFormat: null,
        nullFormat: null,
        defaultFormat: "0,0",
        scalePercentBy100: !0
      }, u = {
        currentLocale: c.currentLocale,
        zeroFormat: c.zeroFormat,
        nullFormat: c.nullFormat,
        defaultFormat: c.defaultFormat,
        scalePercentBy100: c.scalePercentBy100
      };
      function v(i, a) {
        this._input = i, this._value = a;
      }
      return t = function(i) {
        var a, f, p, d;
        if (t.isNumeral(i))
          a = i.value();
        else if (i === 0 || typeof i > "u")
          a = 0;
        else if (i === null || r.isNaN(i))
          a = null;
        else if (typeof i == "string")
          if (u.zeroFormat && i === u.zeroFormat)
            a = 0;
          else if (u.nullFormat && i === u.nullFormat || !i.replace(/[^0-9]+/g, "").length)
            a = null;
          else {
            for (f in o)
              if (d = typeof o[f].regexps.unformat == "function" ? o[f].regexps.unformat() : o[f].regexps.unformat, d && i.match(d)) {
                p = o[f].unformat;
                break;
              }
            p = p || t._.stringToNumber, a = p(i);
          }
        else
          a = Number(i) || null;
        return new v(i, a);
      }, t.version = n, t.isNumeral = function(i) {
        return i instanceof v;
      }, t._ = r = {
        // formats numbers separators, decimals places, signs, abbreviations
        numberToFormat: function(i, a, f) {
          var p = s[t.options.currentLocale], d = !1, l = !1, y = 0, h = "", b = 1e12, w = 1e9, E = 1e6, _ = 1e3, m = "", C = !1, S, R, F, L, V, re, H;
          if (i = i || 0, R = Math.abs(i), t._.includes(a, "(") ? (d = !0, a = a.replace(/[\(|\)]/g, "")) : (t._.includes(a, "+") || t._.includes(a, "-")) && (V = t._.includes(a, "+") ? a.indexOf("+") : i < 0 ? a.indexOf("-") : -1, a = a.replace(/[\+|\-]/g, "")), t._.includes(a, "a") && (S = a.match(/a(k|m|b|t)?/), S = S ? S[1] : !1, t._.includes(a, " a") && (h = " "), a = a.replace(new RegExp(h + "a[kmbt]?"), ""), R >= b && !S || S === "t" ? (h += p.abbreviations.trillion, i = i / b) : R < b && R >= w && !S || S === "b" ? (h += p.abbreviations.billion, i = i / w) : R < w && R >= E && !S || S === "m" ? (h += p.abbreviations.million, i = i / E) : (R < E && R >= _ && !S || S === "k") && (h += p.abbreviations.thousand, i = i / _)), t._.includes(a, "[.]") && (l = !0, a = a.replace("[.]", ".")), F = i.toString().split(".")[0], L = a.split(".")[1], re = a.indexOf(","), y = (a.split(".")[0].split(",")[0].match(/0/g) || []).length, L ? (t._.includes(L, "[") ? (L = L.replace("]", ""), L = L.split("["), m = t._.toFixed(i, L[0].length + L[1].length, f, L[1].length)) : m = t._.toFixed(i, L.length, f), F = m.split(".")[0], t._.includes(m, ".") ? m = p.delimiters.decimal + m.split(".")[1] : m = "", l && Number(m.slice(1)) === 0 && (m = "")) : F = t._.toFixed(i, 0, f), h && !S && Number(F) >= 1e3 && h !== p.abbreviations.trillion)
            switch (F = String(Number(F) / 1e3), h) {
              case p.abbreviations.thousand:
                h = p.abbreviations.million;
                break;
              case p.abbreviations.million:
                h = p.abbreviations.billion;
                break;
              case p.abbreviations.billion:
                h = p.abbreviations.trillion;
                break;
            }
          if (t._.includes(F, "-") && (F = F.slice(1), C = !0), F.length < y)
            for (var ne = y - F.length; ne > 0; ne--)
              F = "0" + F;
          return re > -1 && (F = F.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + p.delimiters.thousands)), a.indexOf(".") === 0 && (F = ""), H = F + m + (h || ""), d ? H = (d && C ? "(" : "") + H + (d && C ? ")" : "") : V >= 0 ? H = V === 0 ? (C ? "-" : "+") + H : H + (C ? "-" : "+") : C && (H = "-" + H), H;
        },
        // unformats numbers separators, decimals places, signs, abbreviations
        stringToNumber: function(i) {
          var a = s[u.currentLocale], f = i, p = {
            thousand: 3,
            million: 6,
            billion: 9,
            trillion: 12
          }, d, l, y;
          if (u.zeroFormat && i === u.zeroFormat)
            l = 0;
          else if (u.nullFormat && i === u.nullFormat || !i.replace(/[^0-9]+/g, "").length)
            l = null;
          else {
            l = 1, a.delimiters.decimal !== "." && (i = i.replace(/\./g, "").replace(a.delimiters.decimal, "."));
            for (d in p)
              if (y = new RegExp("[^a-zA-Z]" + a.abbreviations[d] + "(?:\\)|(\\" + a.currency.symbol + ")?(?:\\))?)?$"), f.match(y)) {
                l *= Math.pow(10, p[d]);
                break;
              }
            l *= (i.split("-").length + Math.min(i.split("(").length - 1, i.split(")").length - 1)) % 2 ? 1 : -1, i = i.replace(/[^0-9\.]+/g, ""), l *= Number(i);
          }
          return l;
        },
        isNaN: function(i) {
          return typeof i == "number" && isNaN(i);
        },
        includes: function(i, a) {
          return i.indexOf(a) !== -1;
        },
        insert: function(i, a, f) {
          return i.slice(0, f) + a + i.slice(f);
        },
        reduce: function(i, a) {
          if (this === null)
            throw new TypeError("Array.prototype.reduce called on null or undefined");
          if (typeof a != "function")
            throw new TypeError(a + " is not a function");
          var f = Object(i), p = f.length >>> 0, d = 0, l;
          if (arguments.length === 3)
            l = arguments[2];
          else {
            for (; d < p && !(d in f); )
              d++;
            if (d >= p)
              throw new TypeError("Reduce of empty array with no initial value");
            l = f[d++];
          }
          for (; d < p; d++)
            d in f && (l = a(l, f[d], d, f));
          return l;
        },
        /**
         * Computes the multiplier necessary to make x >= 1,
         * effectively eliminating miscalculations caused by
         * finite precision.
         */
        multiplier: function(i) {
          var a = i.toString().split(".");
          return a.length < 2 ? 1 : Math.pow(10, a[1].length);
        },
        /**
         * Given a variable number of arguments, returns the maximum
         * multiplier that must be used to normalize an operation involving
         * all of them.
         */
        correctionFactor: function() {
          var i = Array.prototype.slice.call(arguments);
          return i.reduce(function(a, f) {
            var p = r.multiplier(f);
            return a > p ? a : p;
          }, 1);
        },
        /**
         * Implementation of toFixed() that treats floats more like decimals
         *
         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
         * problems for accounting- and finance-related software.
         */
        toFixed: function(i, a, f, p) {
          var d = i.toString().split("."), l = a - (p || 0), y, h, b, w;
          return d.length === 2 ? y = Math.min(Math.max(d[1].length, l), a) : y = l, b = Math.pow(10, y), w = (f(i + "e+" + y) / b).toFixed(y), p > a - y && (h = new RegExp("\\.?0{1," + (p - (a - y)) + "}$"), w = w.replace(h, "")), w;
        }
      }, t.options = u, t.formats = o, t.locales = s, t.locale = function(i) {
        return i && (u.currentLocale = i.toLowerCase()), u.currentLocale;
      }, t.localeData = function(i) {
        if (!i)
          return s[u.currentLocale];
        if (i = i.toLowerCase(), !s[i])
          throw new Error("Unknown locale : " + i);
        return s[i];
      }, t.reset = function() {
        for (var i in c)
          u[i] = c[i];
      }, t.zeroFormat = function(i) {
        u.zeroFormat = typeof i == "string" ? i : null;
      }, t.nullFormat = function(i) {
        u.nullFormat = typeof i == "string" ? i : null;
      }, t.defaultFormat = function(i) {
        u.defaultFormat = typeof i == "string" ? i : "0.0";
      }, t.register = function(i, a, f) {
        if (a = a.toLowerCase(), this[i + "s"][a])
          throw new TypeError(a + " " + i + " already registered.");
        return this[i + "s"][a] = f, f;
      }, t.validate = function(i, a) {
        var f, p, d, l, y, h, b, w;
        if (typeof i != "string" && (i += "", console.warn && console.warn("Numeral.js: Value is not string. It has been co-erced to: ", i)), i = i.trim(), i.match(/^\d+$/))
          return !0;
        if (i === "")
          return !1;
        try {
          b = t.localeData(a);
        } catch {
          b = t.localeData(t.locale());
        }
        return d = b.currency.symbol, y = b.abbreviations, f = b.delimiters.decimal, b.delimiters.thousands === "." ? p = "\\." : p = b.delimiters.thousands, w = i.match(/^[^\d]+/), w !== null && (i = i.substr(1), w[0] !== d) || (w = i.match(/[^\d]+$/), w !== null && (i = i.slice(0, -1), w[0] !== y.thousand && w[0] !== y.million && w[0] !== y.billion && w[0] !== y.trillion)) ? !1 : (h = new RegExp(p + "{2}"), i.match(/[^\d.,]/g) ? !1 : (l = i.split(f), l.length > 2 ? !1 : l.length < 2 ? !!l[0].match(/^\d+.*\d$/) && !l[0].match(h) : l[0].length === 1 ? !!l[0].match(/^\d+$/) && !l[0].match(h) && !!l[1].match(/^\d+$/) : !!l[0].match(/^\d+.*\d$/) && !l[0].match(h) && !!l[1].match(/^\d+$/)));
      }, t.fn = v.prototype = {
        clone: function() {
          return t(this);
        },
        format: function(i, a) {
          var f = this._value, p = i || u.defaultFormat, d, l, y;
          if (a = a || Math.round, f === 0 && u.zeroFormat !== null)
            l = u.zeroFormat;
          else if (f === null && u.nullFormat !== null)
            l = u.nullFormat;
          else {
            for (d in o)
              if (p.match(o[d].regexps.format)) {
                y = o[d].format;
                break;
              }
            y = y || t._.numberToFormat, l = y(f, p, a);
          }
          return l;
        },
        value: function() {
          return this._value;
        },
        input: function() {
          return this._input;
        },
        set: function(i) {
          return this._value = Number(i), this;
        },
        add: function(i) {
          var a = r.correctionFactor.call(null, this._value, i);
          function f(p, d, l, y) {
            return p + Math.round(a * d);
          }
          return this._value = r.reduce([this._value, i], f, 0) / a, this;
        },
        subtract: function(i) {
          var a = r.correctionFactor.call(null, this._value, i);
          function f(p, d, l, y) {
            return p - Math.round(a * d);
          }
          return this._value = r.reduce([i], f, Math.round(this._value * a)) / a, this;
        },
        multiply: function(i) {
          function a(f, p, d, l) {
            var y = r.correctionFactor(f, p);
            return Math.round(f * y) * Math.round(p * y) / Math.round(y * y);
          }
          return this._value = r.reduce([this._value, i], a, 1), this;
        },
        divide: function(i) {
          function a(f, p, d, l) {
            var y = r.correctionFactor(f, p);
            return Math.round(f * y) / Math.round(p * y);
          }
          return this._value = r.reduce([this._value, i], a), this;
        },
        difference: function(i) {
          return Math.abs(t(this._value).subtract(i).value());
        }
      }, t.register("locale", "en", {
        delimiters: {
          thousands: ",",
          decimal: "."
        },
        abbreviations: {
          thousand: "k",
          million: "m",
          billion: "b",
          trillion: "t"
        },
        ordinal: function(i) {
          var a = i % 10;
          return ~~(i % 100 / 10) === 1 ? "th" : a === 1 ? "st" : a === 2 ? "nd" : a === 3 ? "rd" : "th";
        },
        currency: {
          symbol: "$"
        }
      }), (function() {
        t.register("format", "bps", {
          regexps: {
            format: /(BPS)/,
            unformat: /(BPS)/
          },
          format: function(i, a, f) {
            var p = t._.includes(a, " BPS") ? " " : "", d;
            return i = i * 1e4, a = a.replace(/\s?BPS/, ""), d = t._.numberToFormat(i, a, f), t._.includes(d, ")") ? (d = d.split(""), d.splice(-1, 0, p + "BPS"), d = d.join("")) : d = d + p + "BPS", d;
          },
          unformat: function(i) {
            return +(t._.stringToNumber(i) * 1e-4).toFixed(15);
          }
        });
      })(), (function() {
        var i = {
          base: 1e3,
          suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        }, a = {
          base: 1024,
          suffixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
        }, f = i.suffixes.concat(a.suffixes.filter(function(d) {
          return i.suffixes.indexOf(d) < 0;
        })), p = f.join("|");
        p = "(" + p.replace("B", "B(?!PS)") + ")", t.register("format", "bytes", {
          regexps: {
            format: /([0\s]i?b)/,
            unformat: new RegExp(p)
          },
          format: function(d, l, y) {
            var h, b = t._.includes(l, "ib") ? a : i, w = t._.includes(l, " b") || t._.includes(l, " ib") ? " " : "", E, _, m;
            for (l = l.replace(/\s?i?b/, ""), E = 0; E <= b.suffixes.length; E++)
              if (_ = Math.pow(b.base, E), m = Math.pow(b.base, E + 1), d === null || d === 0 || d >= _ && d < m) {
                w += b.suffixes[E], _ > 0 && (d = d / _);
                break;
              }
            return h = t._.numberToFormat(d, l, y), h + w;
          },
          unformat: function(d) {
            var l = t._.stringToNumber(d), y, h;
            if (l) {
              for (y = i.suffixes.length - 1; y >= 0; y--) {
                if (t._.includes(d, i.suffixes[y])) {
                  h = Math.pow(i.base, y);
                  break;
                }
                if (t._.includes(d, a.suffixes[y])) {
                  h = Math.pow(a.base, y);
                  break;
                }
              }
              l *= h || 1;
            }
            return l;
          }
        });
      })(), (function() {
        t.register("format", "currency", {
          regexps: {
            format: /(\$)/
          },
          format: function(i, a, f) {
            var p = t.locales[t.options.currentLocale], d = {
              before: a.match(/^([\+|\-|\(|\s|\$]*)/)[0],
              after: a.match(/([\+|\-|\)|\s|\$]*)$/)[0]
            }, l, y, h;
            for (a = a.replace(/\s?\$\s?/, ""), l = t._.numberToFormat(i, a, f), i >= 0 ? (d.before = d.before.replace(/[\-\(]/, ""), d.after = d.after.replace(/[\-\)]/, "")) : i < 0 && !t._.includes(d.before, "-") && !t._.includes(d.before, "(") && (d.before = "-" + d.before), h = 0; h < d.before.length; h++)
              switch (y = d.before[h], y) {
                case "$":
                  l = t._.insert(l, p.currency.symbol, h);
                  break;
                case " ":
                  l = t._.insert(l, " ", h + p.currency.symbol.length - 1);
                  break;
              }
            for (h = d.after.length - 1; h >= 0; h--)
              switch (y = d.after[h], y) {
                case "$":
                  l = h === d.after.length - 1 ? l + p.currency.symbol : t._.insert(l, p.currency.symbol, -(d.after.length - (1 + h)));
                  break;
                case " ":
                  l = h === d.after.length - 1 ? l + " " : t._.insert(l, " ", -(d.after.length - (1 + h) + p.currency.symbol.length - 1));
                  break;
              }
            return l;
          }
        });
      })(), (function() {
        t.register("format", "exponential", {
          regexps: {
            format: /(e\+|e-)/,
            unformat: /(e\+|e-)/
          },
          format: function(i, a, f) {
            var p, d = typeof i == "number" && !t._.isNaN(i) ? i.toExponential() : "0e+0", l = d.split("e");
            return a = a.replace(/e[\+|\-]{1}0/, ""), p = t._.numberToFormat(Number(l[0]), a, f), p + "e" + l[1];
          },
          unformat: function(i) {
            var a = t._.includes(i, "e+") ? i.split("e+") : i.split("e-"), f = Number(a[0]), p = Number(a[1]);
            p = t._.includes(i, "e-") ? p *= -1 : p;
            function d(l, y, h, b) {
              var w = t._.correctionFactor(l, y), E = l * w * (y * w) / (w * w);
              return E;
            }
            return t._.reduce([f, Math.pow(10, p)], d, 1);
          }
        });
      })(), (function() {
        t.register("format", "ordinal", {
          regexps: {
            format: /(o)/
          },
          format: function(i, a, f) {
            var p = t.locales[t.options.currentLocale], d, l = t._.includes(a, " o") ? " " : "";
            return a = a.replace(/\s?o/, ""), l += p.ordinal(i), d = t._.numberToFormat(i, a, f), d + l;
          }
        });
      })(), (function() {
        t.register("format", "percentage", {
          regexps: {
            format: /(%)/,
            unformat: /(%)/
          },
          format: function(i, a, f) {
            var p = t._.includes(a, " %") ? " " : "", d;
            return t.options.scalePercentBy100 && (i = i * 100), a = a.replace(/\s?\%/, ""), d = t._.numberToFormat(i, a, f), t._.includes(d, ")") ? (d = d.split(""), d.splice(-1, 0, p + "%"), d = d.join("")) : d = d + p + "%", d;
          },
          unformat: function(i) {
            var a = t._.stringToNumber(i);
            return t.options.scalePercentBy100 ? a * 0.01 : a;
          }
        });
      })(), (function() {
        t.register("format", "time", {
          regexps: {
            format: /(:)/,
            unformat: /(:)/
          },
          format: function(i, a, f) {
            var p = Math.floor(i / 60 / 60), d = Math.floor((i - p * 60 * 60) / 60), l = Math.round(i - p * 60 * 60 - d * 60);
            return p + ":" + (d < 10 ? "0" + d : d) + ":" + (l < 10 ? "0" + l : l);
          },
          unformat: function(i) {
            var a = i.split(":"), f = 0;
            return a.length === 3 ? (f = f + Number(a[0]) * 60 * 60, f = f + Number(a[1]) * 60, f = f + Number(a[2])) : a.length === 2 && (f = f + Number(a[0]) * 60, f = f + Number(a[1])), Number(f);
          }
        });
      })(), t;
    });
  })(Ie)), Ie.exports;
}
var Do = Ao();
const Io = /* @__PURE__ */ pr(Do);
function jo({ context: e, count: t, badgeProps: r, children: n, ...o }) {
  return r?.pill, /* @__PURE__ */ et(Yt, { ...o, children: [
    !!e && /* @__PURE__ */ et(Yt.Heading, { children: [
      e,
      t > 1 && /* @__PURE__ */ W(Cr, { bg: o.variant, pill: !0, className: "ms-1", ...r, children: Io(t).format("0,0") })
    ] }),
    n
  ] });
}
function Ho(e) {
  return e.id !== void 0;
}
function ko(e) {
  return typeof e == "function";
}
function Go({ list: e, contextFilter: t, onDismiss: r, alertProps: n, badgeProps: o }) {
  return /* @__PURE__ */ W("div", { children: e.filter((s) => !t || (ko(t) ? t(s) : s.context === t)).map((s) => /* @__PURE__ */ W(
    jo,
    {
      ...n,
      badgeProps: o,
      variant: s.variant,
      dismissible: !0,
      onClose: () => r(s),
      context: s.context,
      count: s.count,
      children: s.message
    },
    s.id
  )) });
}
export {
  Go as AlertList,
  Lo as addAlert,
  ee as alertsAdapter,
  Mn as alertsExtraState,
  lr as alertsSlice,
  qo as dismissAlert,
  Ho as isErrorAlert,
  ko as isFilterFunction,
  Wo as selectAlertByContext,
  Vo as selectAlertById,
  Uo as selectAllAlerts
};
