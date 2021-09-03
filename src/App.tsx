import { useEffect, useState } from "react";
import shortcutKeys from "./shortcut-keys";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    shortcutKeys.add(["enter", "space"], () => setCount(0));
    shortcutKeys.add(["a"], () => setCount((c) => c + 1));
    shortcutKeys.add(["s"], () => setCount((c) => c - 1));
    shortcutKeys.add("k", () => setCount((c) => c + 2));
    shortcutKeys.add("shift+j", () => setCount((c) => c * 2));
    shortcutKeys.add("shift+k", () => setCount((c) => c / 2));
    shortcutKeys.add(["ctrl+j", "ctrl+k"], () => setCount((c) => c + 4));
  }, []);

  return (
    <div>
      <h1>Events activated</h1>
      <p>
        <span className="code">Enter</span> - Count = 0
      </p>
      <p>
        <span className="code">A</span> - Add 1
      </p>
      <p>
        <span className="code">S</span> - Sub 1
      </p>
      <p>
        <span className="code">SHIFT + J</span> - Multiply by 2
      </p>
      <p>
        <span className="code">SHIFT + K</span> - Divide by 2
      </p>
      <p>
        <span className="code">CTRL + J</span> - Add 4
      </p>
      <p>
        <span className="code">CTRL + K</span> - Add 4
      </p>
      <h3>Count: {count}</h3>
    </div>
  );
}

export default App;
