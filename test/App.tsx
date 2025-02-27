import React from 'react';
import {useAppDispatch, useAppSelector} from "./configureStore";
import {addAlert, AlertList, dismissAlert, ErrorAlert, selectAllAlerts} from "../src";
import {Button} from "react-bootstrap";

export default function App() {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectAllAlerts);

    const onDispatchAlert = () => {
        dispatch(addAlert({message: 'This is a test', context: 'TEST', variant: 'danger'}));
    }

    const onDismiss = (alert:ErrorAlert) => {
        dispatch(dismissAlert(alert))
    }
    return (
        <div>
            <Button type="button" variant="secondary" onClick={onDispatchAlert}>Dispatch alert</Button>
            <AlertList list={list} onDismiss={onDismiss} alertProps={{className: 'my-1'}} />
        </div>
    )
}
