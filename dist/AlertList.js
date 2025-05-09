"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import ContextAlert from "./ContextAlert";
import { isFilterFunction } from "./utils";
export default function AlertList({ list, contextFilter, onDismiss, alertProps }) {
    return (_jsx("div", { children: list
            .filter(errorAlert => !contextFilter
            || (isFilterFunction(contextFilter)
                ? contextFilter(errorAlert)
                : errorAlert.context === contextFilter))
            .map(alert => (_jsx(ContextAlert, { ...alertProps, variant: alert.variant, dismissible: true, onClose: () => onDismiss(alert), context: alert.context, count: alert.count, children: alert.message }, alert.id))) }));
}
//# sourceMappingURL=AlertList.js.map