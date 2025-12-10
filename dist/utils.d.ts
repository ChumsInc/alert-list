import { BasicAlert, ContextFilter, ContextFilterFunction, ErrorAlert } from './types.ts';
export declare function isErrorAlert(alert: BasicAlert | ErrorAlert): alert is ErrorAlert;
export declare function isFilterFunction(fn: ContextFilter): fn is ContextFilterFunction;
