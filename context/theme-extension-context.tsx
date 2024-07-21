import { ThemeExtension } from "@/types/threads";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { createContext, useMemo, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

export const ThemeExtensionContext = createContext<ThemeExtension>({} as ThemeExtension);

export const ThemeExtensionProvider = ({ children }: Readonly<React.PropsWithChildren>): JSX.Element => {
  const colorScheme = useColorScheme();
  const [themeColor, setThemeColor] = useState<ColorSchemeName>(colorScheme);

  const themeColorProviderValue = useMemo(() => ({ themeColor, setThemeColor }), [themeColor, setThemeColor]);

  return <ThemeExtensionContext.Provider value={themeColorProviderValue}>
    <ThemeProvider value={themeColor === 'dark' ? DarkTheme : DefaultTheme}>
      {children}
    </ThemeProvider>

  </ThemeExtensionContext.Provider>;
};