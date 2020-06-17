import "reflect-metadata";
import "./index.scss";
import React                  from "react";
import ReactDOM               from "react-dom";
import { BrowserRouter }      from "react-router-dom";
import * as serviceWorker     from "./serviceWorker";
import { Provider }           from "mobx-react";
import Container              from "typedi";
import { ApplicationStore }   from "./Store/ApplicationStore";
import Layout                 from "./Layout/Layout";

const applicationStore = Container.get(ApplicationStore);

(async () => {
  await applicationStore.initStorage();

  const webaApp = (
    <Provider {...applicationStore.getStores()}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );

  ReactDOM.render(webaApp, document.getElementById("root") as HTMLElement);
})();

ReactDOM.render((<div> Loading... </div>), document.getElementById("root") as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
