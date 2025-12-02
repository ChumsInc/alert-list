import { createEntityAdapter as m, createSlice as f, isRejected as p, isFulfilled as x } from "@reduxjs/toolkit";
import { jsxs as s, jsx as c } from "react/jsx-runtime";
import { Alert as a, Badge as A } from "react-bootstrap";
import y from "numeral";
const o = m({
  selectId: (t) => t.id,
  sortComparer: (t, e) => t.id - e.id
}), i = o.getSelectors(), g = {
  nextId: 0
}, u = f({
  name: "alerts",
  initialState: o.getInitialState(g),
  reducers: {
    addAlert: (t, e) => {
      if (e.payload.context) {
        const [r] = i.selectAll(t).filter((l) => l.context === e.payload.context);
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
        const [r] = i.selectAll(t).filter((l) => l.context === e.payload.context);
        if (r) {
          o.removeOne(t, r.id);
          return;
        }
      }
    }
  },
  extraReducers: (t) => {
    t.addMatcher(p, (e, r) => {
      const l = r.type.replace("/rejected", ""), [d] = i.selectAll(e).filter((n) => n.context === l);
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
    }).addMatcher(x, (e, r) => {
      const l = r.type.replace("/fulfilled", ""), [d] = i.selectAll(e).filter((n) => n.context === l);
      if (d) {
        o.removeOne(e, d.id);
        return;
      }
    });
  },
  selectors: {
    selectAllAlerts: (t) => i.selectAll(t),
    selectAlertById: (t, e) => i.selectById(t, e),
    selectAlertByContext: (t, e) => {
      const [r] = i.selectAll(t).filter((l) => l.context === e);
      return r ?? null;
    }
  }
}), {
  addAlert: C,
  dismissAlert: j
} = u.actions, {
  selectAllAlerts: E,
  selectAlertById: w,
  selectAlertByContext: k
} = u.selectors;
function I({ context: t, count: e, badgeProps: r, children: l, ...d }) {
  return r?.pill, /* @__PURE__ */ s(a, { ...d, children: [
    !!t && /* @__PURE__ */ s(a.Heading, { children: [
      t,
      e > 1 && /* @__PURE__ */ c(A, { bg: d.variant, pill: !0, className: "ms-1", ...r, children: y(e).format("0,0") })
    ] }),
    l
  ] });
}
function M(t) {
  return t.id !== void 0;
}
function v(t) {
  return typeof t == "function";
}
function R({ list: t, contextFilter: e, onDismiss: r, alertProps: l, badgeProps: d }) {
  return /* @__PURE__ */ c("div", { children: t.filter((n) => !e || (v(e) ? e(n) : n.context === e)).map((n) => /* @__PURE__ */ c(
    I,
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
export {
  R as AlertList,
  C as addAlert,
  o as alertsAdapter,
  g as alertsExtraState,
  u as alertsSlice,
  j as dismissAlert,
  M as isErrorAlert,
  v as isFilterFunction,
  k as selectAlertByContext,
  w as selectAlertById,
  E as selectAllAlerts
};
