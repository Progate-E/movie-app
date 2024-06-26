import { FontAwesome } from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { DimensionValue, ImageBackground, StyleSheet, View } from 'react-native'
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
      style={[
        styles.m5,
        props.landscape ? styles.landscape : styles.portrait,
        props.width && { width: props.width },
        props.height && { height: props.height },
      ]}
    >
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w300${props.landscape ? props.backdrop_path : props.poster_path}`,
        }}
        style={styles.imageBackground}
      >
        <View style={styles.cardData}>
          <Card.Title title={props.title} titleStyle={styles.cardTitle} />
          <Card.Content style={styles.cardContent}>
            <View style={styles.rating}>
              <FontAwesome
                name="star"
                color={'gold'}
                size={20}
                style={styles.starIcon}
              />
              <Text style={styles.ratingText}>
                {props.vote_average.toPrecision(2)}
              </Text>
            </View>
            <Text style={styles.releaseYear}>
              {new Date(props.release_date).getFullYear()}
            </Text>
          </Card.Content>
        </View>
      </ImageBackground>
    </Card>
  )
}

const styles = StyleSheet.create({
  portrait: {
    width: 150,
    height: 200,
  },
  landscape: {
    width: 250,
    height: 175,
  },
  m5: {
    margin: 5,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  cardData: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  cardTitle: {
    color: 'white',
    marginBottom: 0,
    fontWeight: '900',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  starIcon: {
    marginRight: 5,
  },
  ratingText: {
    color: 'gold',
    fontSize: 15,
    fontWeight: '900',
  },
  releaseYear: {
    color: 'white',
    fontSize: 15,
    fontWeight: '900',
  },
})
