import {
    createEntityAdapter,
    createSlice,
    isFulfilled,
    isRejected,
    PayloadAction,
    SerializedError
} from "@reduxjs/toolkit";
import {StyledErrorAlert} from "./alert-types";

export const alertsAdapter = createEntityAdapter<StyledErrorAlert, number>({
    selectId: (alert) => alert.id,
    sortComparer: (a, b) => a.id - b.id,
});

const alertsSelectors = alertsAdapter.getSelectors();


export interface AlertsExtraState {
    nextId: number;
}

export const alertsExtraState: AlertsExtraState = {
    nextId: 0,
}

const alertsSlice = createSlice({
    name: 'alerts',
    initialState: alertsAdapter.getInitialState(alertsExtraState),
    reducers: {
        addAlert: (state, action: PayloadAction<Partial<StyledErrorAlert & Pick<StyledErrorAlert, 'message'>>>) => {
            if (action.payload.context) {
                const [alert] = alertsSelectors.selectAll(state).filter((alert) => alert.context === action.payload.context);
                if (alert) {
                    alertsAdapter.updateOne(state, {id: alert.id, changes: {count: alert.count + 1}})
                    return;
                }
            }
            state.nextId += 1;
            alertsAdapter.addOne(state, {
                ...action.payload,
                message: action.payload.message ?? 'Unknown error',
                count: 1,
                id: state.nextId
            });
        },
        addError: (state, action: PayloadAction<Error | SerializedError>) => {
            state.nextId += 1;
            alertsAdapter.addOne(state, {
                ...action.payload,
                message: `[${action.payload.name ?? 'Unknown'}] ${action.payload.message}`,
                count: 1,
                id: state.nextId
            });
        },
        dismissAlert: (state, action: PayloadAction<Partial<Pick<StyledErrorAlert, 'id' | 'context'>>>) => {
            if (action.payload.id) {
                alertsAdapter.removeOne(state, action.payload.id);
                return;
            }
            if (action.payload.context) {
                const [alert] = alertsSelectors.selectAll(state).filter((alert) => alert.context === action.payload.context);
                if (alert) {
                    alertsAdapter.removeOne(state, alert.id);
                    return;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isRejected, (state, action) => {
                const context = action.type.replace('/rejected', '');
                const [alert] = alertsSelectors.selectAll(state).filter((alert) => alert.context === context);
                if (alert) {
                    alertsAdapter.updateOne(state, {id: alert.id, changes: {count: alert.count + 1}})
                    return;
                }
                state.nextId += 1;
                alertsAdapter.addOne(state, {context, message: action.error.message ?? '', id: state.nextId, count: 1});
            })
            .addMatcher(isFulfilled, (state, action) => {
                const context = action.type.replace('/fulfilled', '');
                const [alert] = alertsSelectors.selectAll(state).filter((alert) => alert.context === context);
                if (alert) {
                    alertsAdapter.removeOne(state, alert.id);
                    return;
                }
            })

    },
    selectors: {
        selectAllAlerts: (state) => alertsSelectors.selectAll(state),
        selectAlertById: (state, id: number) => alertsSelectors.selectById(state, id),
        selectAlertByContext: (state, context: string) => {
            const [alert] = alertsSelectors.selectAll(state).filter((alert) => alert.context === context);
            return alert ?? null;
        }
    }
})

export const {
    addAlert,
    dismissAlert
} = alertsSlice.actions;

export const {
    selectAllAlerts,
    selectAlertById,
    selectAlertByContext,
} = alertsSlice.selectors

export default alertsSlice;
