import type {Variant} from "react-bootstrap/types";

export interface BasicAlert {
    title?: string,
    message?: string,
    context?: string,
    canDismiss?: boolean,
}

export interface ErrorAlert {
    id: number;
    variant?: Variant
    context?: string;
    message: string;
    count: number;
}

export type StyledErrorAlert = ErrorAlert

export type ContextFilterFunction = (alerts: StyledErrorAlert) => boolean;
export type ContextFilter = string | ContextFilterFunction;
