import React from "react";
import ReactDOM from "react-dom";
import style from "./main.css";
import styleScss from "./main.scss";
import { hot } from 'react-hot-loader'

const App = () => {
  return (
    <div>
      <p className="colored">Howdy yo!</p>
    </div>
  );
};

export default hot(module)(App)
ReactDOM.render(<App />, document.getElementById("root"));
