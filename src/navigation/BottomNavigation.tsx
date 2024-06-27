import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Search from '../screens/Search'
import FavoriteNavigation from './FavoriteNavigation'
import HomeNavigation from './HomeNavigation'

const Tab = createBottomTabNavigator()
export default function BottomNavigation(): React.ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="home" size={28} color={color} />
          },
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="search" size={28} color={color} />
          },
        }}
      />
      <Tab.Screen
        name="FavoritesNavigation"
        component={FavoriteNavigation}
        options={{
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="star" size={28} color={color} />
          },
          tabBarLabel: 'Favorites',
        }}
      />
    </Tab.Navigator>
  )
}
