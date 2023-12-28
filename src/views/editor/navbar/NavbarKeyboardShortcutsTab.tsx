/**
 * Component which lists all keyboard shortcuts.
 * @param props A object containing component properties.
 * @param props.keys The keys to display.
 * @param props.text The text to show above the keys.
 */
function KeyboardShortcut(props: { text: string; keys: string[] }) {
  return (
    <div className='text-center bg-base-200 p-2 rounded-md'>
      <div className='mb-2 font-bold'> {props.text} </div>
      {props.keys.map((key, index) => (
        <>
          <kbd className='kbd m-1'> {key} </kbd>
          {index !== props.keys.length - 1 && ' + '}
        </>
      ))}
    </div>
  );
}

/**
 * Displays a list of keyboard shorcuts.
 */
function NavbarKeyboardShortcutsTab() {
  return (
    <>
      <div className='grid grid-cols-4 gap-2'>
        <KeyboardShortcut text='Switch Frame' keys={['Ctrl', '1-8']} />
        <KeyboardShortcut text='Delete selected frame' keys={['Delete']} />
        <KeyboardShortcut text='Reset frame mods' keys={['Shift', 'r']} />
        <KeyboardShortcut text='Move selected frame up' keys={['Shift', 'Ctrl', '▲']} />
        <KeyboardShortcut text='Move selected frame down' keys={['Shift', 'Ctrl', '▼']} />
        <KeyboardShortcut text='Switch to previous sequence' keys={['Ctrl', '9']} />
        <KeyboardShortcut text='Switch to previous sequence' keys={['Ctrl', '0']} />
        <KeyboardShortcut
          text='Move selected sequence down'
          keys={['Shift', 'Ctrl', '▶︎']}
        />
        <KeyboardShortcut
          text='Move selected sequence up'
          keys={['Shift', 'Ctrl', '◀︎︎']}
        />
        <KeyboardShortcut text='Quick Save' keys={['Shift', 's']} />
        <KeyboardShortcut text='Quick Load' keys={['Shift', 'l']} />
        <KeyboardShortcut text='Quick Export' keys={['Shift', 'e']} />
      </div>
    </>
  );
}

export default NavbarKeyboardShortcutsTab;
