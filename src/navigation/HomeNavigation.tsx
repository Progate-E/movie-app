import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { NavProps } from '../global/types'
import AllMovies from '../screens/AllMovies'
import Detail from '../screens/Detail'
import Home from '../screens/Home'
const Stack = createNativeStackNavigator()

export default function HomeNavigation(): React.ReactElement {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
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
