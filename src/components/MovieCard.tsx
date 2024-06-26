import { FontAwesome } from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { DimensionValue, ImageBackground, View } from 'react-native'
import { Card, Text } from 'react-native-paper'

interface MovieCardProps {
  id: number
  title: string
  poster_path: string
  popularity: number
  vote_average: number
  overview: string
  release_date: string
  backdrop_path: string
  landscape?: boolean
  width?: DimensionValue
  height?: DimensionValue
  unPressable?: boolean
}

export default function MovieCard(props: MovieCardProps): React.ReactElement {
  const navigation = useNavigation()

  return (
    <Card
      onPress={() => {
        if (props.unPressable) return
        navigation.dispatch(
          StackActions.push('Detail', {
            title: props.title,
            id: props.id,
          }),
        )
      }}
      mode="elevated"
      style={{
        width: props.width || (props.landscape ? 250 : 150),
        height: props.height || (props.landscape ? 175 : 200),
        margin: 5,
      }}
    >
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w300${props.landscape ? props.poster_path : props.backdrop_path}`,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        >
          <Card.Title
            title={props.title}
            titleStyle={{
              color: 'white',
              marginBottom: 0,
              fontWeight: '900',
            }}
            style={{
              padding: 0,
              margin: 0,
            }}
          />
          <Card.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 0,
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            >
              <FontAwesome
                name="star"
                color={'gold'}
                size={20}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '900',
                  color: 'gold',
                }}
              >
                {props.vote_average.toPrecision(2)}
              </Text>
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '900',
              }}
            >
              {new Date(props.release_date).getFullYear()}
            </Text>
          </Card.Content>
        </View>
      </ImageBackground>
    </Card>
  )
}
