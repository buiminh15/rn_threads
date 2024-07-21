import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React, { useContext, useMemo } from 'react';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Colors from '@/constants/Colors';
import { ThemeExtensionContext } from '@/context/theme-extension-context';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: Readonly<{
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}>) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { themeColor } = useContext(ThemeExtensionContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[themeColor ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <CustomTabBarIcon name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <CustomTabBarIcon name="search" color={color} />,
        }}
      />
    </Tabs>
  );
}

const CustomTabBarIcon = ({ name, color }: Readonly<{ color: string, name: React.ComponentProps<typeof FontAwesome>["name"]; }>): JSX.Element => {
  return <TabBarIcon name={name} color={color} />;
};