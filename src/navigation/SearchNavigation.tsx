import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Detail from '../screens/Detail';
import Search from '../screens/Search';
import KeywordSearch from '../components/search/KeywordSearch';

const Stack = createNativeStackNavigator();

export default function SearchNavigation() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,}}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="KeywordSearchScreen" component={KeywordSearch} />


      <Stack.Screen name="Detail" component={Detail} />
      
    </Stack.Navigator>
  );
}