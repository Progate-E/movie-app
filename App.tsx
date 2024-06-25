import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import BottomNavigation from './src/components/BottomNavigation'

export default function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  )
}
