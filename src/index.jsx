import React from "react";
import ReactDOM from "react-dom";
import style from "./main.css";
import styleScss from "./main.scss";

const App = () => {
  return (
    <div>
      <p className="colored">Howdy!</p>
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("root"));
