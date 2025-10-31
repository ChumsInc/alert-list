import { ReactNode } from 'react';
import { AlertProps, BadgeProps } from 'react-bootstrap';
import { StyledErrorAlert } from './alert-types.js';
export interface ContextAlertProps extends Pick<StyledErrorAlert, 'context' | 'count'>, AlertProps {
    badgeProps?: BadgeProps;
    children?: ReactNode;
}
export default function ContextAlert({ context, count, badgeProps, children, ...alertProps }: ContextAlertProps): import("react/jsx-runtime").JSX.Element;
