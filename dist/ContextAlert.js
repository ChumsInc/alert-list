import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Alert from 'react-bootstrap/Alert';
import Badge from "react-bootstrap/Badge";
import numeral from "numeral";
export default function ContextAlert({ context, count, children, ...alertProps }) {
    return (_jsxs(Alert, { ...alertProps, children: [!!context && (_jsxs(Alert.Heading, { children: [context, count > 1 && (_jsx(Badge, { bg: alertProps.variant, className: "ms-1", children: numeral(count).format('0,0') }))] })), children] }));
}
//# sourceMappingURL=ContextAlert.js.map