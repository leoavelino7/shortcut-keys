import shortcutKeys from "./shortcut-keys";

function App() {  
  
  const handleAdd = () => {
    shortcutKeys.add(['enter'], () => console.log('My  Enter event!!!'), 'enter event')
    shortcutKeys.add(['space'], () => console.log('My  space event!!!'), 'space event')
    shortcutKeys.add('k', () => console.log('My K event!!!'), 'k event')
    shortcutKeys.add('shift+j', () => console.log('My shift+j event!!!'), 'CRTL+j event')
  }

  return (
    <div>
      <button onClick={handleAdd}>add</button>
    </div>
  );
}

export default App;