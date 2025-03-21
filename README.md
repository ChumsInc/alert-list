![Chums Logo](https://intranet.chums.com/images/chums/chums-badge-120x120.png)

# CHUMS AlertList
A strongly-typed Alert slice and reducer for Chums Apps

## Usage
### Configuration the Store

```ts
import {alertsSlice} from "@chumsinc/alert-list";

const rootReducer = combineReducers({
  // ... other reducers/slices
  [alertsSlice.reducerPath]: alertsSlice.reducer,
  // ... other reducers/slices
});

```

### Usage in the app
```tsx
import React from 'react';
import {useAppDispatch, useAppSelector} from "./configureStore";
import {addAlert, AlertList, dismissAlert, ErrorAlert, selectAllAlerts} from "@chumsinc/alert-list";
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

```

