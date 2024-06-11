import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useNavigation } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';

const Operations = () => {
  const [groceryList, SetGroceryList] = useState([])
  const [listExpand, setListExpand] = useState(false)
  const [ListinBottom, setListInBottom] = useState([])
  const [bottomBudget, setBottomBudget] = useState('')
  const sheetRef = useRef(null)
  const [isOpen, setisOpen] = useState(true)
  const [bottomListbuyIndex, setBottomListBuyIndex] = useState("")
  const [buyCount, SetBuyCount] = useState(0)
  const [buyBarWidth, setBuyBarWidth] = useState(0)

  const SheetSnapPoint = ['40%', '60%' , '90%']


  useEffect(()=>{
    loadData()
  })

      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const ListDate = day+"/"+ month+ "/" + year

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem("@groceryData");
      if (data !== null) {
        const parsedData = JSON.parse(data);
        // console.log(parsedData);

        // checking the Uncompleted List
        const unCompleteArray = parsedData.filter(item => item.status === "uncomplete")
        // setting the data into state
        SetGroceryList(unCompleteArray)

      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const DeleteFunction = async(index)=>{
    // getting the DataBase
    const data = await AsyncStorage.getItem("@groceryData")
    if (data != null) {
      const JsonData = JSON.parse(data)

      // Making new DataBase
      const NewJsonData = JsonData.filter((item, i) => i !== index);

      // Saving the Data Again to the Ddatabase
      await AsyncStorage.setItem("@groceryData", JSON.stringify(NewJsonData))
      
    console.log(NewJsonData);
    }
  }

  // BottomSheetFunction
  const OpenBottomSheet = (list, budget)=>{
    setisOpen(true)
    sheetRef.current?.expand()
    setListInBottom(list)
    setBottomBudget(budget)
  }

  const BuiedFunction = (index)=>{
    setBottomListBuyIndex(index);
    SetBuyCount(buyCount + 1)
    const Percentage = ((buyCount / ListinBottom.length)* 100).toFixed(0)
    setBuyBarWidth(Percentage)
  }

  const CompleteFunction = async ()=>{
    const data = await AsyncStorage.getItem("@groceryData");

    if (data != null) {
      
      const JSONdata = JSON.parse(data)
      const UpdateData = JSONdata.filter(item => item.list === ListinBottom ? {...item,  status: 'completed'}: item)

      // saving the Data
      await AsyncStorage.setItem('@groceryData',JSON.stringify(UpdateData))
      Alert.alert("Shopping Completed !!!")
      sheetRef.current?.close()
    }
  }

  
  return (
    <GestureHandlerRootView className="flex-1 h-full">
    <ScrollView className="bg-primaryBG">
      <View className="justify-start min-h-[700px] p-[10px] items-center ">
        <Text className="text-white mt-[50px] text-3xl"></Text>
        {
          groceryList.length > 0 ?
          groceryList.map((list, index)=>
          <View key={index} className={"bg-white mb-[5px] w-full p-[10px] rounded-xl flex-row flex-wrap items-center justify-between"}>
            <View className="w-[70%]">
              <Text className="text-xl">Budget: {list.budget}</Text>
              <Text className="text-xl">Listed: {ListDate === list.date ? "Today" : list.date}</Text>  
            </View>       
            <TouchableOpacity onPress={()=>OpenBottomSheet(list.list, list.budget)}><AntDesign name="playcircleo" size={40} color="black" /></TouchableOpacity>  
            <TouchableOpacity onPress={()=>DeleteFunction(index)}>
            <AntDesign name="delete" size={40} color="black" />       
            </TouchableOpacity> 
          </View>)
          :
          <View>
            <Text className="text-xl text-white text-center">No operations Available Now</Text>
            <Link href="Form" className='text-xl text-white bg-orange-400 p-[10px] rounded-xl text-center mt-[20px]'>Make a List</Link>
          </View>
        }
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={SheetSnapPoint}
          enablePanDownToClose={true}
          onChange={(index) => setisOpen(index !== -1)}
          >
          <BottomSheetScrollView>
            <View className="p-[10px] mb-[50px]">
              <Text className="text-black text-2xl mb-[20px] text-center">Lets begin your Shppping:</Text>
              <Text className="text-xl mb-[10px]">Budget:{bottomBudget}</Text>
              <View className="relative">
                <View className="w-full h-[8px] rounded-xl bg-primaryBG"></View>
                <View style={{width:`${buyBarWidth}%`}} className=" h-[8px] rounded-xl bg-yellow-200 absolute"></View>
              </View>
              {
                ListinBottom.map((list, index)=>
                <View key={index} className={`${bottomListbuyIndex ===index? "bg-green-400 p-[10px] w-full flex-row justify-between rounded-xl" :"border-b-[2px] p-[10px] flex-row items-center justify-between w-full border-yellow-200"}`}>
                  <Text className="text-[18px]" key={index}>{index +1}) {list}</Text>
                  <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={()=>BuiedFunction(index)}><AntDesign name="check" size={24} color="green" /></TouchableOpacity>
                  </View>
                </View>)
              }
              <TouchableOpacity>
                <Text onPress={CompleteFunction} className="text-center text-xl bg-yellow-200 text-primaryBG p-[10px] mt-[10px] rounded-xl">Complete</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
          </BottomSheet>
      </View>
          
    </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Operations