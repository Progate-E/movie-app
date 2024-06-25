import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Favorites from '../screens/Favorites'
import Home from '../screens/Home'
import Search from '../screens/Search'

const Tab = createBottomTabNavigator()
export default function BottomNavigation(): React.ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return <Feather name="home" size={28} color={color} />
          },
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
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color }) => {
            return <AntDesign name="star" size={28} color={color} />
          },
        }}
      />
    </Tab.Navigator>
  )
}
