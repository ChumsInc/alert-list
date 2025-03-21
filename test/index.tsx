import React from 'react';
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import store from "./configureStore";
import App from "./App";

const container = document.getElementById('app');
const root = createRoot(container!);


root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
