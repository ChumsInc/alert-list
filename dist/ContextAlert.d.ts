import React from 'react';
import { AlertProps } from 'react-bootstrap/Alert';
import { StyledErrorAlert } from "./alert-types";
export interface ContextAlertProps extends Pick<StyledErrorAlert, 'context' | 'count'>, AlertProps {
    children?: React.ReactNode;
}
export default function ContextAlert({ context, count, children, ...alertProps }: ContextAlertProps): import("react/jsx-runtime").JSX.Element;
