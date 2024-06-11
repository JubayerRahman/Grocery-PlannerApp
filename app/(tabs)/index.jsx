import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const Index = () => {
  return (
    <ScrollView className="bg-primaryBG ">

      <View className="flex-1 h-full items-center justify-center mt-[150px]">
      <Text className="text-white text-6xl text-center font-[600] leading-[70px]">Welcome to </Text>
      <Text className="text-white text-4xl text-center font-[600] leading-[40px]">Grocery Planner</Text>
      <Text className="text-white text-base mt-[20px] mb-[20px]">It will help you with your groceries. Let's begin !!</Text>
      <View  className="mt-[30px] mb-[50px]">

        {/* List making screen Link */}
        <View className="flex-row w-full justify-evenly">
          <View className="h-[100px] w-[50%] border-r-[2px] items-center justify-center border-orange-400">
          <Link href="Form" className='p-[10px] text-white text-center text-2xl flex-row items-center'>
            Make a list <Entypo name="list" size={30} color="orange" />
          </Link>
          </View>
        </View>

        {/* Divider */}
        <View className="bg-yellow-400 h-[2px] rounded-xl "></View>

        {/* Operations Screen link */}
        <View className="flex-row w-full justify-start">
          <View className="h-[100px] w-[50%] border-l-[4px] items-center justify-center border-orange-400">
          <Link href="Operations" className='p-[10px] text-white text-center text-2xl'>
            <FontAwesome5 name="play" size={30} color="orange" /> Operation
          </Link>
          </View>
        </View>

        {/* Divider */}
        <View className="bg-yellow-400 h-[4px] "></View>

        {/* History screen Link */}
        <View className="flex-row w-full justify-evenly">
          <View className="h-[100px] w-[50%] border-r-[2px] items-center justify-center border-orange-400">
          <Link href="History" className='p-[10px] text-white text-center text-2xl'>
            History <Fontisto name="clock" size={30} color="orange" />
          </Link>
          </View>
        </View>
        
        {/* Divider */}
        <View className="bg-yellow-400 h-[2px] rounded-xl "></View>

        {/* Creator Screen link */}
        <View className="flex-row w-full justify-start">
          <View className="h-[100px] w-[50%] border-l-[4px] items-center justify-center border-orange-400">
          <Link href="https://jobayerportfolio2.netlify.app/" className='p-[10px] text-white text-center text-2xl'>
          <Entypo name="code" size={30} color="orange" /> Developer
          </Link>
          </View>
        </View>
      </View>

      </View>
      
    </ScrollView>
  )
}

export default Index