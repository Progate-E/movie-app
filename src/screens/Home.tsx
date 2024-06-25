import { ParamListBase } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

export default function Home({
  navigation,
}: NativeStackScreenProps<ParamListBase>): React.ReactElement {
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
        HOME!!
      </Text>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? 'violet' : 'pink',
          width: 200,
          paddingVertical: 10,
          borderRadius: 10,
        })}
        onPress={() => {
          navigation.navigate('Detail')
        }}
      >
        <Text
          style={{
            textAlign: 'center',
          }}
        >
          To Detail!
        </Text>
      </Pressable>
    </View>
  )
}
