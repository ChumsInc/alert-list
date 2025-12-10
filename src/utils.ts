import type {BasicAlert, ContextFilter, ContextFilterFunction, ErrorAlert} from "./types.ts";

export function isErrorAlert(alert: BasicAlert | ErrorAlert): alert is ErrorAlert {
    return (alert as ErrorAlert).id !== undefined;
}

export function isFilterFunction(fn: ContextFilter): fn is ContextFilterFunction {
    return typeof fn === "function";
}
