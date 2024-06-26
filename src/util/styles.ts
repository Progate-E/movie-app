import { Platform, StatusBar, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  NotchHelper: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})

export default styles
