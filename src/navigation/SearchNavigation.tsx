import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Detail from '../screens/Detail'
import KeywordSearch from '../components/search/KeywordSearch'
import Search from '../screens/Search'

const Stack = createNativeStackNavigator()

export default function SearchNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
       <Stack.Screen name="KeywordSearch" component={KeywordSearch} />
       <Stack.Screen name="Detail" component={Detail} />
      
    </Stack.Navigator>
  )
}
