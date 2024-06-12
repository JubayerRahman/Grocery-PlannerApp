import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';

const TabIcons = ({name, icon, focused})=>{
  return(
    <View className="items-center w-full">
      <View className={`${focused?"bg-yellow-200 p-[5px] w-[80%] rounded-xl items-center": "p-[5px] w-[80%] rounded-xl items-center"}`}>
        <AntDesign name={icon} size={24} color={`${focused?"#28282B": "white"}`} />
      </View>
      <Text className={`${focused? "block text-white": "hidden"}`}>{name}</Text>
    </View>
  )
}

const Layout = () => {
  return (
    <View className="flex-1 bg-[#28282B]">
      <Tabs 
      screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,
        tabBarStyle:{
          backgroundColor:"#28282B",
          height:75
        }
      }}
      >
        <Tabs.Screen name='index' 
        options={{
          tabBarIcon: ({focused})=>(
            <TabIcons
            name= "Home"
            icon="home"
            focused={focused}
            />
          )
        }}/>
        <Tabs.Screen name='Form' options={{
          tabBarIcon: ({focused})=>(
            <TabIcons
            name= "Form"
            icon="form"
            focused={focused}
            />
          )
        }}/>
        <Tabs.Screen name='Operations'options={{
          tabBarIcon: ({focused})=>(
            <TabIcons
            name= "Operation"
            icon="play"
            focused={focused}
            />
          )
        }}/>
        <Tabs.Screen name='History'options={{
          tabBarIcon: ({focused})=>(
            <TabIcons
            name= "History"
            icon="clockcircle"
            focused={focused}
            />
          )
        }}/>
      </Tabs>
    </View>
  )
}

export default Layout