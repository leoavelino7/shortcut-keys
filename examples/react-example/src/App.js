import "./App.css";
import { useEffect, useReducer } from "react";

const initialState = {
  isShow: true,
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "show":
      return { ...state, isShow: true };
    case "hide":
      return { ...state, isShow: false };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const windowElement = window.shortcutKeys(window);

    windowElement.add("control+shift+r", () => dispatch({ type: "reset" }));
    windowElement.add("control+h", () => dispatch({ type: "hide" }));
    windowElement.add("control+s", () => dispatch({ type: "show" }));
    windowElement.add("arrowUp", () => dispatch({ type: "increment" }));
    windowElement.add("arrowDown", () => dispatch({ type: "decrement" }));

    return () => {
      windowElement.remove();
    };
  }, []);

  return (
    <div className="container">
      <h1>Press hotkeys to perform actions</h1>

      <h2> {state.isShow ? `Count: ${state.count}` : "-"}</h2>

      <div className="container">
        <button onClick={() => dispatch({ type: "reset" })}>
          <code>CTRL + Shift + R</code> / <code>Command + Shift + R</code> -
          Reset
        </button>

        <button onClick={() => dispatch({ type: "hide" })}>
          <code>CTRL + H</code> / <code>Command + H</code> - Hide count
        </button>
        <button onClick={() => dispatch({ type: "show" })}>
          <code>CTRL + S</code> / <code>Command + S</code> - Show count
        </button>

        <button onClick={() => dispatch({ type: "increment" })}>
          <code>Arrow Up</code> - Increment count
        </button>
        <button onClick={() => dispatch({ type: "decrement" })}>
          <code>Arrow Down</code> - Decrement count
        </button>
      </div>
    </div>
  );
}

export default App;
