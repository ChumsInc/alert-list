import { createEntityAdapter as p, createSlice as f, isRejected as x, isFulfilled as A } from "@reduxjs/toolkit";
import { jsxs as c, jsx as i } from "react/jsx-runtime";
import { Alert as a, Badge as y } from "react-bootstrap";
import g from "numeral";
const o = p({
  selectId: (t) => t.id,
  sortComparer: (t, e) => t.id - e.id
}), s = o.getSelectors(), I = {
  nextId: 0
}, u = f({
  name: "alerts",
  initialState: o.getInitialState(I),
  reducers: {
    addAlert: (t, e) => {
      if (e.payload.context) {
        const [r] = s.selectAll(t).filter((l) => l.context === e.payload.context);
        if (r) {
          o.updateOne(t, { id: r.id, changes: { count: r.count + 1 } });
          return;
        }
      }
      t.nextId += 1, o.addOne(t, {
        variant: "warning",
        ...e.payload,
        message: e.payload.message ?? "Unknown error",
        count: 1,
        id: t.nextId
      });
    },
    addError: (t, e) => {
      t.nextId += 1, o.addOne(t, {
        ...e.payload,
        message: `[${e.payload.name ?? "Unknown"}] ${e.payload.message}`,
        count: 1,
        id: t.nextId
      });
    },
    dismissAlert: (t, e) => {
      if (e.payload.id) {
        o.removeOne(t, e.payload.id);
        return;
      }
      if (e.payload.context) {
        const [r] = s.selectAll(t).filter((l) => l.context === e.payload.context);
        if (r) {
          o.removeOne(t, r.id);
          return;
        }
      }
    }
  },
  extraReducers: (t) => {
    t.addMatcher(x, (e, r) => {
      const l = r.type.replace("/rejected", ""), [d] = s.selectAll(e).filter((n) => n.context === l);
      if (d) {
        o.updateOne(e, { id: d.id, changes: { count: d.count + 1 } });
        return;
      }
      e.nextId += 1, o.addOne(e, {
        context: l,
        variant: "danger",
        message: r.error.message ?? "",
        id: e.nextId,
        count: 1
      });
    }).addMatcher(A, (e, r) => {
      const l = r.type.replace("/fulfilled", ""), [d] = s.selectAll(e).filter((n) => n.context === l);
      if (d) {
        o.removeOne(e, d.id);
        return;
      }
    });
  },
  selectors: {
    selectAllAlerts: (t) => s.selectAll(t),
    selectAlertById: (t, e) => s.selectById(t, e),
    selectAlertByContext: (t, e) => {
      const [r] = s.selectAll(t).filter((l) => l.context === e);
      return r ?? null;
    }
  }
}), {
  addAlert: j,
  dismissAlert: E
} = u.actions, {
  selectAllAlerts: w,
  selectAlertById: N,
  selectAlertByContext: b
} = u.selectors;
function m({ context: t, count: e, badgeProps: r, children: l, ...d }) {
  return /* @__PURE__ */ c(a, { ...d, children: [
    !!t && /* @__PURE__ */ c(a.Heading, { children: [
      t,
      e > 1 && /* @__PURE__ */ i(y, { bg: d.variant, pill: !0, className: "ms-1", ...r, children: g(e).format("0,0") })
    ] }),
    l
  ] });
}
m.displayName = "ContextAlert";
function k(t) {
  return t.id !== void 0;
}
function v(t) {
  return typeof t == "function";
}
function h({ list: t, contextFilter: e, onDismiss: r, alertProps: l, badgeProps: d }) {
  return /* @__PURE__ */ i("div", { children: t.filter((n) => !e || (v(e) ? e(n) : n.context === e)).map((n) => /* @__PURE__ */ i(
    m,
    {
      ...l,
      badgeProps: d,
      variant: n.variant,
      dismissible: !0,
      onClose: () => r(n),
      context: n.context,
      count: n.count,
      children: n.message
    },
    n.id
  )) });
}
h.displayName = "AlertList";
export {
  h as AlertList,
  j as addAlert,
  o as alertsAdapter,
  u as alertsSlice,
  E as dismissAlert,
  k as isErrorAlert,
  v as isFilterFunction,
  b as selectAlertByContext,
  N as selectAlertById,
  w as selectAllAlerts
};
