/**
 * Returns a list of keyboard shortcuts.
 */
export function getKeyboardShortcuts() {
  return [
    {
      displayedShortcut: 'Ctrl + 0',
      functionalShortcut: 'control+0',
      description: 'Select the next sequence',
    },
    {
      displayedShortcut: 'Ctrl + 9',
      functionalShortcut: 'control+9',
      description: 'Select the previous sequence',
    },
    {
      displayedShortcut: 'Ctrl + Shift + ▶︎',
      functionalShortcut: 'control+shift+arrowright',
      description: 'Move the selected sequence down',
    },
    {
      displayedShortcut: 'Ctrl + Shift + ◀︎',
      functionalShortcut: 'control+shift+arrowleft',
      description: 'Move the selected sequence up',
    },
    {
      displayedShortcut: 'Shift + e',
      functionalShortcut: 'shift+e',
      description: 'Quick export project',
    },
    {
      displayedShortcut: 'Shift + r',
      functionalShortcut: 'shift+r',
      description: 'Reset frame mods values',
    },
    {
      displayedShortcut: 'Delete',
      functionalShortcut: 'delete',
      description: 'Delete selected frame',
    },
    {
      displayedShortcut: 'Ctrl + Shift + ▼',
      functionalShortcut: 'control+shift+arrowdown',
      description: 'Move the selected frame down',
    },
    {
      displayedShortcut: 'Ctrl + Shift + ▲',
      functionalShortcut: 'control+shift+arrowup',
      description: 'Move the selected frame up',
    },
    {
      displayedShortcut: 'shift + s',
      functionalShortcut: 'shift+s',
      description: 'Save the project',
    },
    {
      displayedShortcut: 'shift + l',
      functionalShortcut: 'shift+l',
      description: 'Load a project',
    },
  ];
}
