import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { ErrorAlert } from './types.ts';
export declare const alertsAdapter: import('@reduxjs/toolkit').EntityAdapter<ErrorAlert, number>;
export interface AlertsExtraState {
    nextId: number;
}
declare const alertsSlice: import('@reduxjs/toolkit').Slice<import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState, {
    addAlert: (state: import('immer').WritableDraft<import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState>, action: PayloadAction<Partial<ErrorAlert & Pick<ErrorAlert, "message">>>) => void;
    addError: (state: import('immer').WritableDraft<import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState>, action: PayloadAction<Error | SerializedError>) => void;
    dismissAlert: (state: import('immer').WritableDraft<import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState>, action: PayloadAction<Partial<Pick<ErrorAlert, "id" | "context">>>) => void;
}, "alerts", "alerts", {
    selectAllAlerts: (state: import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState) => ErrorAlert[];
    selectAlertById: (state: import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState, id: number) => {
        id: number;
        variant?: import('react-bootstrap/esm/types.js').Variant | undefined;
        context?: string | undefined;
        message: string;
        count: number;
    };
    selectAlertByContext: (state: import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState, context: string) => ErrorAlert;
}>;
export declare const addAlert: import('@reduxjs/toolkit').ActionCreatorWithPayload<Partial<ErrorAlert & Pick<ErrorAlert, "message">>, "alerts/addAlert">, dismissAlert: import('@reduxjs/toolkit').ActionCreatorWithPayload<Partial<Pick<ErrorAlert, "id" | "context">>, "alerts/dismissAlert">;
export declare const selectAllAlerts: import('reselect').Selector<{
    alerts: import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState;
}, ErrorAlert[], []> & {
    unwrapped: (state: import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState) => ErrorAlert[];
}, selectAlertById: import('reselect').Selector<{
    alerts: import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState;
}, {
    id: number;
    variant?: import('react-bootstrap/esm/types.js').Variant | undefined;
    context?: string | undefined;
    message: string;
    count: number;
}, [id: number]> & {
    unwrapped: (state: import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState, id: number) => {
        id: number;
        variant?: import('react-bootstrap/esm/types.js').Variant | undefined;
        context?: string | undefined;
        message: string;
        count: number;
    };
}, selectAlertByContext: import('reselect').Selector<{
    alerts: import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState;
}, ErrorAlert, [context: string]> & {
    unwrapped: (state: import('@reduxjs/toolkit').EntityState<ErrorAlert, number> & AlertsExtraState, context: string) => ErrorAlert;
};
export default alertsSlice;
