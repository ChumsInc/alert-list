import type {ReactNode} from 'react';
import {Alert, type AlertProps, Badge, type BadgeProps} from 'react-bootstrap'
import numeral from "numeral";
import type {ErrorAlert} from "./types.ts";

export interface ContextAlertProps extends Pick<ErrorAlert, 'context' | 'count'>, AlertProps {
    badgeProps?: BadgeProps
    children?: ReactNode;
}

function ContextAlert({context, count, badgeProps, children, ...alertProps}: ContextAlertProps) {
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
ContextAlert.displayName = 'ContextAlert';
export default ContextAlert;
