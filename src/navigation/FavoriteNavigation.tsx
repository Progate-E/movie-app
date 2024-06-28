import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { NavProps } from '../global/types'
import AllMovies from '../screens/AllMovies'
import Detail from '../screens/Detail'
import Favorites from '../screens/Favorites'

const Stack = createNativeStackNavigator()

export default function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
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
