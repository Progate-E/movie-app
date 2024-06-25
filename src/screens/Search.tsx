import React from 'react'
import { Text, View } from 'react-native'

export default function Search(): React.ReactElement {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 50,
          fontWeight: '900',
        }}
      >
        Search!!
      </Text>
    </View>
  )
}
