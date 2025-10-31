import { BasicAlert, ContextFilter, ContextFilterFunction, ErrorAlert } from './alert-types.d.ts';
export declare function isErrorAlert(alert: BasicAlert | ErrorAlert): alert is ErrorAlert;
export declare function isFilterFunction(fn: ContextFilter): fn is ContextFilterFunction;
