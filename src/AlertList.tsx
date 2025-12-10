import ContextAlert from "./ContextAlert.js";
import type {ContextFilter, ErrorAlert} from "./types.ts";
import {isFilterFunction} from "./utils.js";
import type {AlertProps} from 'react-bootstrap/Alert'
import type {BadgeProps} from 'react-bootstrap/Badge'


export interface AlertListProps {
    list: ErrorAlert[];
    contextFilter?: ContextFilter;
    onDismiss: (alert: ErrorAlert) => void;
    alertProps?: AlertProps;
    badgeProps?: BadgeProps;
}

function AlertList({list, contextFilter, onDismiss, alertProps, badgeProps}: AlertListProps) {
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
                    <ContextAlert key={alert.id} {...alertProps} badgeProps={badgeProps}
                                  variant={alert.variant} dismissible
                                  onClose={() => onDismiss(alert)}
                                  context={alert.context} count={alert.count}>
                        {alert.message}
                    </ContextAlert>
                ))}
        </div>
    )
}
AlertList.displayName = 'AlertList';
export default AlertList;
