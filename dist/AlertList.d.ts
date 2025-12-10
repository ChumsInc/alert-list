import { ContextFilter, ErrorAlert } from './types.ts';
import { AlertProps } from 'react-bootstrap/Alert';
import { BadgeProps } from 'react-bootstrap/Badge';
export interface AlertListProps {
    list: ErrorAlert[];
    contextFilter?: ContextFilter;
    onDismiss: (alert: ErrorAlert) => void;
    alertProps?: AlertProps;
    badgeProps?: BadgeProps;
}
declare function AlertList({ list, contextFilter, onDismiss, alertProps, badgeProps }: AlertListProps): import("react/jsx-runtime").JSX.Element;
declare namespace AlertList {
    var displayName: string;
}
export default AlertList;
