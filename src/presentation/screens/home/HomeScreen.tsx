import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

export const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  )
}