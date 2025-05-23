import React from 'react';
import Alert, {AlertProps} from 'react-bootstrap/Alert'
import Badge from "react-bootstrap/Badge";
import numeral from "numeral";
import {StyledErrorAlert} from "./alert-types";

export interface ContextAlertProps extends Pick<StyledErrorAlert, 'context' | 'count'>, AlertProps {
    children?: React.ReactNode;
}

export default function ContextAlert({context, count, children, ...alertProps}: ContextAlertProps) {
    return (
        <Alert {...alertProps}>
            {!!context && (
                <Alert.Heading>
                    {context}
                    {count > 1 && (
                        <Badge bg={alertProps.variant} pill className="ms-1">{numeral(count).format('0,0')}</Badge>
                    )}
                </Alert.Heading>
            )}
            {children}
        </Alert>
    )
}
