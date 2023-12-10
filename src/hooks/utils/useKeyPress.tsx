import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Custom hook to handle keyboard shortcuts.
 * @see https://devtrium.com/posts/how-keyboard-shortcut
 */
export default function useKeyPress(
  keys: string[],
  callback: (event: KeyboardEvent) => void,
  node: Node | null = null
) {
  const [heldKeys, setHeldKeys] = useState<string[]>([]);
  // implement the callback ref pattern
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // handle what happens on key press
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      setHeldKeys([...heldKeys, event.key.toLowerCase()]);
      if (keys.every((key) => heldKeys.includes(key.toLowerCase()))) {
        // check if one of the key is part of the ones we want
        callbackRef.current(event);
        handleKeyUp(event);
      }
    },
    [keys]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const index = heldKeys.indexOf(event.key.toLowerCase());
      index > -1 && setHeldKeys(heldKeys.splice(index, 1));
    },
    [keys]
  );

  useEffect(() => {
    // target is either the provided node or the document
    const targetNode = node ?? document;
    // attach the event listener
    targetNode && targetNode.addEventListener('keydown', handleKeyDown as EventListener);
    targetNode && targetNode.addEventListener('keyup', handleKeyUp as EventListener);
    // remove the event listener
    return () => {
      if (targetNode) {
        targetNode.removeEventListener('keydown', handleKeyDown as EventListener);
        targetNode.removeEventListener('keyup', handleKeyUp as EventListener);
      }
    };
  }, [handleKeyDown, node]);
}
