import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Operations = () => {
  const [groceryList, setGroceryList] = useState([]);
  const [listExpand, setListExpand] = useState(false);
  const [listInBottom, setListInBottom] = useState([]);
  const [bottomBudget, setBottomBudget] = useState('');
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [bottomListBuyIndex, setBottomListBuyIndex] = useState("");
  const [buyCount, setBuyCount] = useState(0);
  const [buyBarWidth, setBuyBarWidth] = useState(0);
  const [targetIndex, setTargetIndex] = useState();

  const SheetSnapPoint = ['40%', '60%'];

  useEffect(() => {
    loadData();
  }, []);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const listDate = `${day}/${month}/${year}`;

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem("@groceryData");
      if (data !== null) {
        const parsedData = JSON.parse(data);
        console.log(parsedData);

        // Checking the Uncompleted List
        // const unCompleteArray = parsedData.filter((item) => item.status == "uncomplete");
        // Setting the data into state
        // console.log(unCompleteArray);
        setGroceryList(parsedData);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFunction = async (index) => {
    // Getting the DataBase
    const data = await AsyncStorage.getItem("@groceryData");
    if (data != null) {
      const jsonData = JSON.parse(data);

      // Making new DataBase
      const newJsonData = jsonData.filter((item, i) => i !== index);

      // Saving the Data Again to the Database
      await AsyncStorage.setItem("@groceryData", JSON.stringify(newJsonData));

      // Update the state
      loadData();
      console.log(newJsonData);
    }
  };

  // BottomSheetFunction
  const openBottomSheet = (index, list, budget) => {
    setIsOpen(true);
    sheetRef.current?.expand();
    setListInBottom(list);
    setBottomBudget(budget);
    setTargetIndex(index);
  };

  const buiedFunction = (index) => {
    setBottomListBuyIndex(index);
    setBuyCount(buyCount + 1);
    const percentage = ((buyCount / listInBottom.length) * 100).toFixed(0);
    setBuyBarWidth(percentage);
  };

  // Completing the shopping Function
  const completeFunction = async () => {
    const data = await AsyncStorage.getItem("@groceryData");

    if (data != null) {
      const jsonData = JSON.parse(data);
      const updateData = jsonData.filter((item, i) => i == targetIndex);
      const otherData = jsonData.filter((item, i) => i !== targetIndex);
      if (updateData.length > 0) {
        updateData[0].status = "completed";
      }

      const allData = [updateData[0], ...otherData];

      // Saving the Data
      await AsyncStorage.setItem('@groceryData', JSON.stringify(allData));
      loadData();
      Alert.alert("Shopping Completed !!!");
      sheetRef.current?.close();
      console.log(allData);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1 h-full">
      <ScrollView className="bg-primaryBG">
        <View className="justify-start min-h-[700px] p-[10px] items-center ">
          <Text className="text-white mt-[50px] text-3xl"></Text>
          {
            groceryList.length > 0 ?
              groceryList.map((list, index) =>
                <View key={index} className={"bg-white mb-[5px] w-full p-[10px] rounded-xl flex-row flex-wrap items-center justify-between"}>
                  <View className="w-[70%]">
                    <Text className="text-xl">Budget: {list.budget}</Text>
                    <Text className="text-xl">Listed: {listDate === list.date ? "Today" : list.date}</Text>
                  </View>
                  <TouchableOpacity onPress={() => openBottomSheet(index, list.list, list.budget)}><AntDesign name="playcircleo" size={40} color="black" /></TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteFunction(index)}>
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
            onChange={(index) => setIsOpen(index !== -1)}
          >
            <BottomSheetScrollView>
              <View className="p-[10px] mb-[50px]">
                <Text className="text-black text-2xl mb-[20px] text-center">Lets begin your Shppping:</Text>
                <Text className="text-xl mb-[10px]">Budget:{bottomBudget}</Text>
                <View className="relative">
                  <View className="w-full h-[8px] rounded-xl bg-primaryBG"></View>
                  <View style={{ width: `${buyBarWidth}%` }} className=" h-[8px] rounded-xl bg-yellow-200 absolute"></View>
                </View>
                {
                  listInBottom.map((list, index) =>
                    <View key={index} className={`${bottomListBuyIndex === index ? "bg-green-400 p-[10px] w-full flex-row justify-between rounded-xl" : "border-b-[2px] p-[10px] flex-row items-center justify-between w-full border-yellow-200"}`}>
                      <Text className="text-[18px]" key={index}>{index + 1}) {list}</Text>
                      <View className="flex-row items-center gap-4">
                        <TouchableOpacity onPress={() => buiedFunction(index)}><AntDesign name="check" size={24} color="green" /></TouchableOpacity>
                      </View>
                    </View>)
                }
                <TouchableOpacity>
                  <Text onPress={completeFunction} className="text-center text-xl bg-yellow-200 text-primaryBG p-[10px] mt-[10px] rounded-xl">Complete</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export default Operations;
