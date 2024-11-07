import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs>
        <Tabs.Screen name='index' options={{headerShown: false, tabBarIcon: () => (<Text>🏠</Text>), tabBarLabel: () => null}}></Tabs.Screen>
        <Tabs.Screen name='views' options={{headerShown: false, tabBarIcon: () => (<Text>📷</Text>), tabBarLabel: () => null}}></Tabs.Screen>
        <Tabs.Screen name='camera' options={{headerShown: false, tabBarIcon: () => (<Text>📊</Text>), tabBarLabel: () => null}}></Tabs.Screen>
      </Tabs>
  );
}
