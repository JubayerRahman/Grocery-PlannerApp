import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome6 } from '@expo/vector-icons';
import { Link } from 'expo-router';

const History = () => {
  const [HistoryList, SetHistoryList] = useState([])

  useEffect(()=>{
    LoadData()
  })

      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const ListDate = day+"/"+ month+ "/" + year

  const LoadData = async()=>{
    try {
      const data = await AsyncStorage.getItem("@groceryData")
      if (data != null) {
        const JsonData = JSON.parse(data)

        // checking the completed List
        // const CompleteArray = JsonData.filter(item => item.status == "completed")
        // setting the data into state
        SetHistoryList(JsonData)

        // console.log(CompleteArray);
      }
      else{
        console.log("No data found");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView className="bg-primaryBG h-full">
      <View className="h-full justify-center p-[10px]  items-center">
        <Text className="text-white mt-[50px] text-3xl"></Text>
        <View className="flex-row ">
          <View className="bg-yellow-400 h-full w-[4px]"></View>
          <View className="ml-[-30px] w-[100%]">
          {
            HistoryList.length>0 ?
            
              HistoryList.map((list, index)=>
              <View key={index} className=" mb-[5px] p-[10px] rounded-xl flex-row items-center">
                <View className="bg-primaryBG p-[5px]">
                  <FontAwesome6 name="clock-rotate-left" size={30} color="white" />
                </View>
                <View className="bg-white p-[10px] rounded-xl w-[80%] ml-[20px]">
                  <Text className="text-xl text-primaryBG">{list.date}</Text>
                  <Text className={`${list.status === "completed"? "bg-yellow-200 w-[70%] p-[10px] rounded-xl mt-[10px] text-[16px] text-primaryBG": "bg-orange-500 w-[70%] p-[10px] rounded-xl mt-[10px] text-[16px] text-white"}`}>Status: {list.status}</Text>
                  {/* Divider */}
                   <View className="bg-yellow-400 h-[2px] rounded-xl mt-[10px] mb-[10px] "></View>
                  
                  <Text className="text-xl text-primaryBG">Budget: {list.budget}</Text>
                  {/* Divider */}
                   <View className="bg-yellow-400 h-[2px] rounded-xl mt-[10px] mb-[10px] "></View>
                  <View  className="flex-row flex-wrap mt-[10px]">
                  {list.list.map((item, index)=>
                    <Text key={index} className="text-[18px]">{index + 1}) {item} </Text>
                    )}
                  </View>
                </View>
              </View>)
              :
              <View className="ml-[40px]">
                <Text className="text-xl text-white text-center">No History Available Now</Text>
                <Link href="Operations" className='text-xl text-white bg-orange-400 p-[10px] rounded-xl text-center mt-[20px]'>Check operations</Link>
              </View>
          }
          
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default History