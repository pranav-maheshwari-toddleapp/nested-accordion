// App.js
import React, { useState } from "react";
import Accordion from "./Accordion";
import AccordionWithDND from "./AccordionWithDND";

function App() {
  const [state, setState] = useState("Accordion with DND");
  const toggleState = () => {
    setState(state === "Accordion" ? "Accordion with DND" : "Accordion");
  };

  return (
    <div className="App">
      <h3>{state}</h3>
      <button onClick={toggleState}>Toggle</button>
      <br />
      <br />
      {state === "Accordion" ? <Accordion /> : <AccordionWithDND />}
    </div>
  );
}

export default App;
