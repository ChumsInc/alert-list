"use client";
import React from 'react';
import ContextAlert from "./ContextAlert.js";
import type {ContextFilter, StyledErrorAlert} from "./alert-types";
import {isFilterFunction} from "./utils.js";
import {AlertProps} from 'react-bootstrap/Alert'


export interface AlertListProps {
    list: StyledErrorAlert[];
    contextFilter?: ContextFilter;
    onDismiss: (alert: StyledErrorAlert) => void;
    alertProps?: AlertProps;
}

export default function AlertList({list, contextFilter, onDismiss, alertProps}: AlertListProps) {
    return (
        <div>
            {list
                .filter(errorAlert => !contextFilter
                    || (
                        isFilterFunction(contextFilter)
                            ? contextFilter(errorAlert)
                            : errorAlert.context === contextFilter
                    ))
                .map(alert => (
                    <ContextAlert key={alert.id} {...alertProps}
                                  variant={alert.variant} dismissible
                                  onClose={() => onDismiss(alert)}
                                  context={alert.context} count={alert.count}>
                        {alert.message}
                    </ContextAlert>
                ))}
        </div>
    )
}
