import { ChangeEvent } from 'react';

/**
 * Custom hook which validates the value from an input element before running callback.
 */
export default function useInputValidation() {
  const validateNumberInput = (
    type: 'number' | 'float',
    event: ChangeEvent<HTMLInputElement>,
    callback: (value: string) => void
  ) => {
    event.preventDefault();
    const { value, min, max, defaultValue } = event.target;

    // Parse all values
    const parsedValue = type === 'float' ? parseFloat(value) : parseInt(value);
    const parsedMin = min ? (type === 'float' ? parseFloat(min) : parseInt(min)) : null;
    const parsedMax = max ? (type === 'float' ? parseFloat(max) : parseInt(max)) : null;
    const parsedDefault =
      type === 'float' ? parseFloat(defaultValue) : parseInt(defaultValue);

    if (isNaN(parsedValue)) {
      callback(parsedDefault.toString());
    } else {
      // Makes sure we don't go over set values
      if (
        (parsedMin === null || parsedValue >= parsedMin) &&
        (parsedMax === null || parsedValue <= parsedMax)
      ) {
        callback(parsedValue.toString());
      }
    }
  };

  return { validateNumberInput };
}
