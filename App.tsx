import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import BottomNavigation from './src/navigation/BottomNavigation'

const queryClient = new QueryClient()
export default function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <BottomNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
