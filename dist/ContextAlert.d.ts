import type { ReactNode } from 'react';
import { type AlertProps, type BadgeProps } from 'react-bootstrap';
import type { ErrorAlert } from "./types.ts";
export interface ContextAlertProps extends Pick<ErrorAlert, 'context' | 'count'>, AlertProps {
    badgeProps?: BadgeProps;
    children?: ReactNode;
}
declare function ContextAlert({ context, count, badgeProps, children, ...alertProps }: ContextAlertProps): import("react/jsx-runtime").JSX.Element;
declare namespace ContextAlert {
    var displayName: string;
}
export default ContextAlert;
