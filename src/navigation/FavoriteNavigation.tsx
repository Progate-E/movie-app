import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Detail from '../screens/Detail'
import Favorites from '../screens/Favorites'

const Stack = createNativeStackNavigator()
interface Props {
  title: string
}

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
          title: (route.params as Props).title,
        })}
      />
    </Stack.Navigator>
  )
}
