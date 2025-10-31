import { ContextFilter, StyledErrorAlert } from './alert-types.d.ts';
import { AlertProps } from 'react-bootstrap/Alert';
import { BadgeProps } from 'react-bootstrap/Badge';
export interface AlertListProps {
    list: StyledErrorAlert[];
    contextFilter?: ContextFilter;
    onDismiss: (alert: StyledErrorAlert) => void;
    alertProps?: AlertProps;
    badgeProps?: BadgeProps;
}
export default function AlertList({ list, contextFilter, onDismiss, alertProps, badgeProps }: AlertListProps): import("react/jsx-runtime").JSX.Element;
