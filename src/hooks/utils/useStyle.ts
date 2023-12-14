import { CSSProperties, useMemo } from 'react';

/**
 * Custom hook to create dynamic styling using Tailwind and CSS.
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
