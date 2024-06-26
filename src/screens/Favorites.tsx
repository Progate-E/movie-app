import React from 'react'
import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Favorites(): React.ReactElement {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text
          style={{
            fontSize: 50,
            fontWeight: '900',
          }}
        >
          Favorites!!
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}
