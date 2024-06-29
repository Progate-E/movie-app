import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { DimensionValue, ImageBackground, StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import ConfirmationDialog from './ConfirmationDialog'

interface MovieCardProps {
  id: number
  title: string
  poster_path: string
  popularity: number
  vote_average: number
  overview: string
  release_date: string
  backdrop_path: string
  adult: boolean
  status?: string
  landscape?: boolean
  width?: DimensionValue
  height?: DimensionValue
  onPress: () => void
}

export default function MovieCard(props: MovieCardProps): React.ReactElement {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)
  return (
    <View>
      {dialogVisible && (
        <ConfirmationDialog
          titleText={`${props.title} is an adult movie`}
          contentText="Do you wish to continue?"
          visible={dialogVisible}
          onConfirm={() => {
            setDialogVisible(false)
            props.onPress()
          }}
          onCancel={() => setDialogVisible(false)}
        />
      )}
      <Card
        onPress={() => {
          if (props.adult) {
            setDialogVisible(true)
            return
          }
          props.onPress()
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
          imageStyle={styles.imageBackgroundImage}
        >
          {props.adult && (
            <Text variant="labelLarge" style={styles.adultMark}>
              18+
            </Text>
          )}
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
                {(props.release_date &&
                  new Date(props.release_date).getFullYear()) ||
                  props.status ||
                  'Unknown'}
              </Text>
            </Card.Content>
          </View>
        </ImageBackground>
      </Card>
    </View>
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
  imageBackgroundImage: {
    borderRadius: 10,
  },
  cardData: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  adultMark: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    color: 'white',
  },
})
