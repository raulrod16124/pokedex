import { View } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper'

export const HomeScreen = () => {
  return (
    <View>
      <Text variant='displaySmall'>HomeScreen</Text>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  )
}