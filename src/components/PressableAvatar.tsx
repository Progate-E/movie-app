import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Avatar, Text, Tooltip } from 'react-native-paper'

interface AvatarProps {
  name: string
  image_url: string
  height?: number
  width?: number
  onPress: () => void
}

export default function PressableAvatar(
  props: AvatarProps,
): React.ReactElement {
  return (
    <Tooltip title={props.name}>
      <Pressable
        onPress={props.onPress}
        style={[
          styles.container,
          {
            width: props.width,
            height: props.height,
          },
        ]}
      >
        <Avatar.Image
          size={70}
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${props.image_url}`,
          }}
        />
        <Text
          variant="labelLarge"
          style={styles.text}
          numberOfLines={1}
          ellipsizeMode="clip"
        >
          {props.name}
        </Text>
      </Pressable>
    </Tooltip>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
  },
  image: {
    backgroundColor: '#007aff',
  },
  text: {
    width: '100%',
    textAlign: 'center',
  },
})
