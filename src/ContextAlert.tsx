import React, {ReactNode} from 'react';
import {Alert, type AlertProps, Badge, type BadgeProps} from 'react-bootstrap'
import numeral from "numeral";
import {StyledErrorAlert} from "./alert-types.js";

export interface ContextAlertProps extends Pick<StyledErrorAlert, 'context' | 'count'>, AlertProps {
    badgeProps?: BadgeProps
    children?: ReactNode;
}

export default function ContextAlert({context, count, badgeProps, children, ...alertProps}: ContextAlertProps) {
    const pill = badgeProps?.pill ?? undefined;
    return (
        <Alert {...alertProps}>
            {!!context && (
                <Alert.Heading>
                    {context}
                    {count > 1 && (
                        <Badge bg={alertProps.variant} pill className="ms-1" {...badgeProps} >{numeral(count).format('0,0')}</Badge>
                    )}
                </Alert.Heading>
            )}
            {children}
        </Alert>
    )
}
