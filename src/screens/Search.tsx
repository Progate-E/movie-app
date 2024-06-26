import React from 'react'
import { ScrollView, Text } from 'react-native'
import styles from '../util/styles'

export default function Search(): React.ReactElement {
  return (
    <ScrollView style={styles.NotchHelper}>
      <Text
        style={{
          fontSize: 50,
          fontWeight: '900',
        }}
      >
        Search!!
      </Text>
    </ScrollView>
  )
}
