shortcut-keys
===========

[![NPM version](https://badgen.net/npm/v/shortcut-keys)](https://www.npmjs.com/package/shortcut-keys)
[![NPM Weekly Downloads](https://badgen.net/npm/dw/shortcut-keys)](https://www.npmjs.com/package/shortcut-keys)
[![License](https://badgen.net/npm/license/shortcut-keys)](https://www.npmjs.com/package/shortcut-keys)

- [x] SSR support

A simple Javascript utility to create keyboard shortcuts

Install with [npm](https://www.npmjs.com/), or [Yarn](https://yarnpkg.com/):

```bash
# via npm
npm install shortcut-keys

# or Yarn (note that it will automatically save the package to your `dependencies` in `package.json`)
yarn add shortcut-keys
```

### Usage with React.js

```tsx
import { useEffect, useState } from "react";
import shortcutKeys from "shortcut-keys";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    shortcutKeys.add("shift+j", () => setCount((c) => c + 1));
    shortcutKeys.add("shift+k", () => setCount((c) => c - 1));
    shortcutKeys.add(["control+j", "control+k"], () => setCount((c) => c + 4));
  }, []);
  
  return (
    <div>
      <style>{"\
        code{\
          background:#161414;\
          color: #eee;\
          width: fit-content;\
          padding: 4px 7px;\
          border-radius: 4px;\
          font-size: 14px;\
        }\
      "}</style>
        
      <h1>Events</h1>
      <p><code>shift + J</code> count + 1</p>
      <p><code>shift + K</code> count + 2</p>
      <p><code>control + J</code> count + 4</p>
      <p><code>control + K</code> count + 4</p>
      <h3>Count: {count}</h3>
    </div>
  );
}

export default App;
```