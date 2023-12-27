import { CSSProperties, useMemo } from 'react';

/**
 * Custom hook to create dynamic styling using Tailwind and CSS.
 * @param initialClasses Initial TailwindCSS styling to include.
 * @param initialStyles Initial CSS styling to include.
 * @param tailwindDynamics An array of objects containing conditions and results for TailwindCSS classes.
 * @param tailwindDynamics.condition The condition to evaluate for applying TailwindCSS classes.
 * @param tailwindDynamics.result The result to apply if the condition is true.
 * @param [tailwindDynamics.result.true] The TailwindCSS classes to apply when the condition is true.
 * @param [tailwindDynamics.result.false] Optional TailwindCSS classes to apply when the condition is false (if result is an object).
 * @param cssDynamics An array of objects containing conditions and results for CSS properties.
 * @param cssDynamics.cssProperty The CSS property to modify based on conditions.
 * @param cssDynamics.condition The condition to evaluate for applying CSS properties.
 * @param cssDynamics.result The result to apply if the condition is true.
 * @param [cssDynamics.result.true] The CSS value to apply when the condition is true.
 * @param [cssDynamics.result.false] Optional CSS value to apply when the condition is false (if result is an object).
 * @returns An array containing TailwindCSS classes and CSS properties based on conditions.
 */
export default function useStyle(
  initialClasses?: string,
  initialStyles?: CSSProperties,
  tailwindDynamics?: {
    condition: boolean;
    result: { true: string; false?: string } | string;
  }[],
  cssDynamics?: {
    cssProperty: keyof CSSProperties;
    condition: boolean;
    result: { true: string; false?: string } | string;
  }[]
) {
  // Generate Tailwind classes based on conditions
  const tailwind = useMemo(() => {
    // If dynamics exists
    if (tailwindDynamics && tailwindDynamics.length > 0) {
      return (
        initialClasses +
        ' ' +
        tailwindDynamics
          .map((dynamic) => {
            // Return true or false Tailwind classes based on condition
            if (typeof dynamic.result === 'string' && dynamic.condition) {
              return dynamic.result;
            } else if (typeof dynamic.result === 'object') {
              return dynamic.condition ? dynamic.result.true : dynamic.result.false || '';
            }
            return '';
          })
          .join(' ')
      );
    }

    // Return classes if no dynamics provided
    return initialClasses || '';
  }, [initialClasses, tailwindDynamics]);

  // Merge CSS properties based on conditions
  const css = useMemo(() => {
    // If dynamics exists
    if (cssDynamics && cssDynamics.length > 0) {
      return cssDynamics.reduce(
        (merged, dynamic) => {
          // Apply CSS properties based on conditions
          if (dynamic.condition) {
            return {
              ...merged,
              [dynamic.cssProperty]:
                typeof dynamic.result === 'object' ? dynamic.result.true : dynamic.result,
            };
          } else if (
            !dynamic.condition &&
            typeof dynamic.result === 'object' &&
            dynamic.result.false
          ) {
            return { ...merged, [dynamic.cssProperty]: dynamic.result.false };
          }
          return merged;
        },
        { ...initialStyles }
      );
    }

    // Return styles if no dynamics provided
    return initialStyles || {};
  }, [initialStyles, cssDynamics]);

  return [tailwind, css] as const;
}
