/**
 * Custom hook which handles theme switching.
 */
export default function useTheme() {
  const changeTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  return { changeTheme };
}
