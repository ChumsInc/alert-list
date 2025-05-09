import type { BasicAlert, ContextFilter, ContextFilterFunction, ErrorAlert } from "./alert-types";
export declare function isErrorAlert(alert: BasicAlert | ErrorAlert): alert is ErrorAlert;
export declare function isFilterFunction(fn: ContextFilter): fn is ContextFilterFunction;
