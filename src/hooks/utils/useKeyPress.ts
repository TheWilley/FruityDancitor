import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

type ModifierKey = 'Alt' | 'Control' | 'Shift' | 'Meta';

/**
 * Custom hook to handle keyboard shortcuts.
 * @param keys The key combination which triggers `callback`
 * @param callback A callback function which triggers based on `keys`.
 * @param modifiers An array of modifier keys (ctrl, shift, alt, meta) to be pressed along with regular keys.
 * @param node The target element on which keystrokes will be checked.
 * @see https://devtrium.com/posts/how-keyboard-shortcut
 */
export default function useKeyPress(
  keys: string[],
  modifiers: ModifierKey[] = [],
  callback: (event: KeyboardEvent) => void,
  node: Node | null = null
) {
  // implement the callback ref pattern
  const callbackRef = useRef(callback);

  // Set callback upon load
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // To prevent special keys to be registered
  const normalKeys = keys.filter(
    (key) => !modifiers.includes(<ModifierKey>key.toLowerCase())
  );

  // To get the correct key
  const getEventKey = (key: ModifierKey) => {
    switch (key) {
      case 'Alt': {
        return 'altKey';
      }
      case 'Control': {
        return 'ctrlKey';
      }
      case 'Shift': {
        return 'shiftKey';
      }
      case 'Meta': {
        return 'metaKey';
      }
    }
  };

  // handle what happens on key press
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const modifierKeysPressed = modifiers.every(
        (modifier) => event[getEventKey(modifier) as keyof KeyboardEvent]
      );

      if (
        modifierKeysPressed &&
        normalKeys.some((key) => event.key.toLowerCase() === key.toLowerCase())
      ) {
        callbackRef.current(event);
      }
    },
    [keys, modifiers]
  );

  useEffect(() => {
    // target is either the provided node or the document
    const targetNode = node ?? document;
    // attach the event listener
    targetNode && targetNode.addEventListener('keydown', handleKeyDown as EventListener);
    // remove the event listener
    return () => {
      if (targetNode) {
        targetNode.removeEventListener('keydown', handleKeyDown as EventListener);
      }
    };
  }, [handleKeyDown, node]);
}
