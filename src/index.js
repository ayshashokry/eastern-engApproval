import React, { Suspense, Fragment, lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from "./reportWebVitals";

import Loader from "./containers/Loader";
/* Redux Connections */
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./redux/reducers/rootReducer";
const store = createStore(rootReducer);
const App = lazy(() => import("./App"));

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <Fragment>
      <ConfigProvider direction="rtl">
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </Fragment>
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
