import type { ContextFilter, StyledErrorAlert } from "./alert-types";
import { AlertProps } from 'react-bootstrap/Alert';
export interface AlertListProps {
    list: StyledErrorAlert[];
    contextFilter?: ContextFilter;
    onDismiss: (alert: StyledErrorAlert) => void;
    alertProps?: AlertProps;
}
export default function AlertList({ list, contextFilter, onDismiss, alertProps }: AlertListProps): import("react/jsx-runtime").JSX.Element;
