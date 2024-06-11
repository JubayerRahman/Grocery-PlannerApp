import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

const Index = () => {
  return (
    <View className="flex-1 h-full bg-green-700">
      {/* <Stack>
        <Stack.Screen name='(tabs)' options={{headerShown:false}} />
      </Stack> */}
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
  },
});