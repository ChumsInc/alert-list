import {BasicAlert, ContextFilter, ContextFilterFunction, ErrorAlert} from "./alert-types";

export function isErrorAlert(alert: BasicAlert | ErrorAlert): alert is ErrorAlert {
    return (alert as ErrorAlert).id !== undefined;
}

export function isFilterFunction(fn: ContextFilter): fn is ContextFilterFunction {
    return typeof fn === "function";
}
