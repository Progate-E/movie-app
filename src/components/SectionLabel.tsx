import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
interface SectionLabelProps {
  label: string
}

export default function SectionLabel(
  props: SectionLabelProps,
): React.ReactElement {
  return (
    <View style={styles.container}>
      <View style={styles.thatThingOnTheLeft}></View>
      <Text variant="headlineMedium" style={styles.fontExtraBold}>
        {props.label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thatThingOnTheLeft: {
    width: 20,
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#3495ff',
    marginRight: 12,
  },
  fontExtraBold: {
    fontWeight: '900',
  },
})
