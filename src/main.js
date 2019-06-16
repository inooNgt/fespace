import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import App from "./pages/App";

render(
    <Provider>
        <App>app child</App>
    </Provider>,
    document.getElementById("app")
);

console.log("new App", new App());
