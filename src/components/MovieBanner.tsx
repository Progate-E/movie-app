import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { ReactElement } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import TextTicker from 'react-native-text-ticker'
interface MovieHeaderProps {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date: string
  certification: string
  status?: string
  landscape?: boolean
  isFavorite: boolean
  onFavoritePress: () => void
  height: number
}

const certificationColors = new Map([
  [
    'R',
    {
      backgroundColor: '#FF0000',
      fontColor: '#FFFFFF',
    },
  ],
  [
    'PG',
    {
      backgroundColor: '#FFA500',
      fontColor: '#000000',
    },
  ],
  [
    'NC-17',
    {
      backgroundColor: '#FF0000',
      fontColor: '#FFFFFF',
    },
  ],
  [
    'G',
    {
      backgroundColor: '#008000',
      fontColor: '#FFFFFF',
    },
  ],
  [
    'NR',
    {
      backgroundColor: '#000000',
      fontColor: '#FFFFFF',
    },
  ],
  [
    'PG-13',
    {
      backgroundColor: '#FF0000',
      fontColor: '#FFFFFF',
    },
  ],
])

export default function MovieBanner(props: MovieHeaderProps): ReactElement {
  const color = certificationColors.get(props.certification)
  return (
    <View
      style={[
        styles.container,
        {
          height: props.height,
        },
      ]}
    >
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w300${props.landscape ? props.backdrop_path : props.poster_path}`,
        }}
      >
        <Text
          variant="labelLarge"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: color?.backgroundColor,
            padding: 10,
            borderBottomLeftRadius: 10,
            color: color?.fontColor,
          }}
        >
          {props.certification}
        </Text>
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.8)']}
          locations={[0.6, 0.8]}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <View style={styles.titleAndRating}>
              <TextTicker scrollSpeed={30} bounce={false}>
                <Text
                  variant="titleLarge"
                  style={styles.title}
                  numberOfLines={1}
                >
                  {props.title}
                </Text>
              </TextTicker>
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
            </View>
            <IconButton
              icon={props.isFavorite ? 'heart' : 'heart-outline'}
              iconColor="#C80036"
              size={35}
              onPress={props.onFavoritePress}
              animated
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    color: 'white',
    marginBottom: 5,
    fontWeight: '900',
  },
  gradient: {
    justifyContent: 'flex-end',
    height: '100%',
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
  titleAndRating: {
    flex: 2,
  },
})
