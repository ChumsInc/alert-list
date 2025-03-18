import { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { StyledErrorAlert } from "./alert-types";
export declare const alertsAdapter: import("@reduxjs/toolkit").EntityAdapter<StyledErrorAlert, number>;
export interface AlertsExtraState {
    nextId: number;
}
export declare const alertsExtraState: AlertsExtraState;
declare const alertsSlice: import("@reduxjs/toolkit").Slice<import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState, {
    addAlert: (state: import("immer").WritableDraft<import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState>, action: PayloadAction<Partial<StyledErrorAlert & Pick<StyledErrorAlert, "message">>>) => void;
    addError: (state: import("immer").WritableDraft<import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState>, action: PayloadAction<Error | SerializedError>) => void;
    dismissAlert: (state: import("immer").WritableDraft<import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState>, action: PayloadAction<Partial<Pick<StyledErrorAlert, "id" | "context">>>) => void;
}, "alerts", "alerts", {
    selectAllAlerts: (state: import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState) => StyledErrorAlert[];
    selectAlertById: (state: import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState, id: number) => {
        variant?: import("react-bootstrap/esm/types").Variant | undefined;
        id: number;
        context?: string | undefined;
        message: string;
        count: number;
    };
    selectAlertByContext: (state: import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState, context: string) => StyledErrorAlert;
}>;
export declare const addAlert: import("@reduxjs/toolkit").ActionCreatorWithPayload<Partial<StyledErrorAlert & Pick<StyledErrorAlert, "message">>, "alerts/addAlert">, dismissAlert: import("@reduxjs/toolkit").ActionCreatorWithPayload<Partial<Pick<StyledErrorAlert, "context" | "id">>, "alerts/dismissAlert">;
export declare const selectAllAlerts: import("reselect").Selector<{
    alerts: import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState;
}, StyledErrorAlert[], []> & {
    unwrapped: (state: import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState) => StyledErrorAlert[];
}, selectAlertById: import("reselect").Selector<{
    alerts: import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState;
}, {
    variant?: import("react-bootstrap/esm/types").Variant | undefined;
    id: number;
    context?: string | undefined;
    message: string;
    count: number;
}, [id: number]> & {
    unwrapped: (state: import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState, id: number) => {
        variant?: import("react-bootstrap/esm/types").Variant | undefined;
        id: number;
        context?: string | undefined;
        message: string;
        count: number;
    };
}, selectAlertByContext: import("reselect").Selector<{
    alerts: import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState;
}, StyledErrorAlert, [context: string]> & {
    unwrapped: (state: import("@reduxjs/toolkit").EntityState<StyledErrorAlert, number> & AlertsExtraState, context: string) => StyledErrorAlert;
};
export default alertsSlice;
