import type {Variant} from "react-bootstrap/types";

export interface BasicAlert {
    title?: string,
    message?: string,
    context?: string,
    canDismiss?: boolean,
}

export interface ErrorAlert {
    id: number;
    context?: string;
    message: string;
    count: number;
}

export interface StyledErrorAlert extends ErrorAlert {
    variant?: Variant
}

export type ContextFilterFunction = (alerts: StyledErrorAlert) => boolean;
export type ContextFilter = string | ContextFilterFunction;
