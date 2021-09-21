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
import { shortcutKeys } from "shortcut-keys";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const windowElement = shortcutKeys(window);

    windowElement.add("control+shift+j", () => setCount((c) => c + 1));
    windowElement.add("shift+k", () => setCount((c) => c - 1));
    windowElement.add(["control+j", "control+k"], () => setCount((c) => c + 4));

    return () => {
      windowElement.remove();
    }
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
      <p><code>control + shift + J</code> count + 1</p>
      <p><code>shift + K</code> count + 2</p>
      <p><code>control + J</code> count + 4</p>
      <p><code>control + K</code> count + 4</p>
      <h3>Count: {count}</h3>
    </div>
  );
}

export default App;
```

### Functions description
### **add(shortcut, handler, options)** - Add event to element
- **shortcut** *{String or String[]} Required* - Shortcut to trigger action. Example: "control+h" or ["control+h", "control+shift+h"]
- **handler** *{Function} Required* - Action triggered when shortcut is triggered. Example: () => console.log("hello");
- **options** *{Object} Optional* - Extra settings.
    - **description** *{String}* Event description,
    - **multiPlatform** *{boolean} Required* - when true, control and command are enabled together
    - **prevent** *{boolean} Required* - when true, activates event.preventDefault()

### **remove(shortcut)** - Remove exists event to element
- **shortcut** *Optional* - Shortcut to trigger action. Example: "control+h" or ["control+h", "control+shift+h"]. When there is no data, all element events will be removed.
    
### **list()** - List all events of element
 Return object with all active event information. Example: 
 ```.js
  {
    "control+h": {
      "options": {
        "description": "",
        "multiPlatform": true,
        "prevent": true
      }
    }
  }
```