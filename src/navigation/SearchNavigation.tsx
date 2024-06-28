import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import KeywordSearch from '../components/search/KeywordSearch'
import { NavProps } from '../global/types'
import AllMovies from '../screens/AllMovies'
import Detail from '../screens/Detail'
import Search from '../screens/Search'

const Stack = createNativeStackNavigator()

export default function SearchNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="KeywordSearchScreen" component={KeywordSearch} />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={({ route }) => ({
          title: (route.params as NavProps).title,
        })}
      />
      <Stack.Screen
        name="AllMovies"
        component={AllMovies}
        options={({ route }) => ({
          title: (route.params as NavProps).title,
        })}
      />
    </Stack.Navigator>
  )
}
