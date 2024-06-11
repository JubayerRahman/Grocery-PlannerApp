import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Slot, Stack, useNavigation } from 'expo-router';
import Index from './Index';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
  return (
    <View className="flex-1 h-full bg-[#28282B]">
        <Slot/>
        <StatusBar style='light'/>
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%",
    },
  });
