import { TouchableOpacity, View, Text, ScrollView, TextInput, Alert, Modal } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = () => {

  const [budget, setBudget] = useState("")
  const [groceryItem, setGroceryItem] = useState("")
  const [groceryList, setGroceryList] = useState([])
  const [ModalShow,   setModalShow] = useState(false)

  const settingListFunction = (event)=>{
    event.preventDefault()
    if (groceryItem === "" || groceryItem === " ") {
      Alert.alert("দয়া করে পণ্যের নাম লিখুন")
    }
    else{
      const newList = [...groceryList, groceryItem]
      setGroceryList(newList)
      setGroceryItem("");
      }
    }


      const SaveFunction = ()=>{
        if (budget === "" || budget === " ") {
          Alert.alert("অনুগ্রহ করে প্রথমে আপনার বাজেট লিখুন")
        }
        else{
          setModalShow(!ModalShow)
          // Alert.alert("আপনি কি নিশ্চিত?")
          // for now only
          // setGroceryList([])
        }
      }

      const DeleteItemFunction = ( item)=>{
        const newArray = groceryList.filter(items =>  items != item)
        setGroceryList(newArray)
      }

      const ModalShowFunction = () =>{
        setModalShow(!ModalShow)
      }

      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const ListDate = day+"/"+ month+ "/" + year

      const FinalSaveFunction = async ()=>{
        console.log(groceryList, budget, ListDate);
        try {
          const groceryData = {
            list: groceryList,
            budget: budget,
            status: "uncomplete",
            date: ListDate
          }

          // adding the data into the AsyncStorage

          // Checking the database first
          const existingData = await AsyncStorage.getItem("@groceryData")
          let newDatabase = existingData != null ?  JSON.parse(existingData) : []

          // Ensure newDatabase is an array
          if (!Array.isArray(newDatabase)) {
            newDatabase = [];
          }

          // adding the new grocery list 
          newDatabase.push(groceryData)

          // Saving the data
          await AsyncStorage.setItem("@groceryData", JSON.stringify(newDatabase))
          Alert.alert("আপনার তালিকা সফলভাবে সংরক্ষিত হয়েছে. কেনাকাটা শুরু করা যাক")

          // lets clear the states
          setGroceryList([])
          setBudget('')
          setModalShow(!ModalShow)

        } catch (error) {
          console.log(error);
          Alert.alert("ডেটা সংরক্ষণ করতে ব্যর্থ হয়েছে 😢");
        }
        
      }


      

  return (
    <ScrollView className="bg-primaryBG h-full">
      <View className="h-full justify-center p-[10px]">

        {/* budget Box */}

        <View className="bg-white mt-[50px] ml-[10px] mr-[10px] p-[10px] rounded-xl shadow-inner">
          <Text className="text-primaryBG text-xl font-[700]">Your Budget</Text>
          <TextInput placeholder='0.00/=' keyboardType='number-pad' className="border-2 mt-[10px] mb-[10px] border-yellow-400 p-[10px] rounded-xl" value={budget} onChangeText={(text)=>setBudget(text)}/>
        </View>

        {/* making list section */}

        <Text className="text-yellow-300 text-2xl font-[600] text-center mt-[50px]">Make grocery list:</Text>

        {/*list input section  */}
        <View className="bg-white mt-[20px] ml-[10px] mr-[10px] p-[10px] rounded-xl shadow-inner flex-row justify-between items-center">
          
          <TextInput 
          value={groceryItem} 
          onChangeText={(text)=>setGroceryItem(text)} 
          onSubmitEditing={settingListFunction} 
          placeholder='itme name' 
          keyboardType='default'
          blurOnSubmit={false} 
          className="border-2 mt-[10px] mb-[10px] border-yellow-400 p-[10px] rounded-xl w-[70%]"/>

           <TouchableOpacity className="bg-yellow-400 p-[10px] rounded-xl  w-[28%]">
            <Text onPress={(event)=>settingListFunction(event)} className=" text-[18px] font-[600] text-white text-center border-yellow-400 border-2">
            <Entypo name="plus" size={18} color="white" />
              Add
            </Text>
          </TouchableOpacity>
        </View>

        {/* Grocery List Setion */}
        {
          groceryList? 
          <View className={`${groceryList.length>0 ?"bg-white mt-[20px] ml-[10px] mr-[10px] p-[10px] rounded-xl shadow-inner" : "hidden"}`}>
          {/* // <View className="bg-white mt-[20px] ml-[10px] mr-[10px] p-[10px] rounded-xl shadow-inner"> */}
            {
              groceryList.map((item, index)=> 
                <View key={index} className="border-b-[2px] border-yellow-400 pb-[5px] flex-row justify-between items-center">
                  <Text className="text-xl" >{index + 1}) {item}</Text>
                  <Entypo onPress={()=>DeleteItemFunction(item)} name="squared-cross" size={30} color="red" />
                </View>
            )
            }
            <Text className="text-center text-xl bg-yellow-400 p-[10px] text-white rounded-xl mt-[10px]" onPress={SaveFunction}>Save list</Text>
          </View>: <Text></Text>
        }

      </View>
      <Modal animationType='slide' transparent={true} visible={ModalShow}>
        <ScrollView>
        <TouchableOpacity className="mt-[50px] justify-end ml-auto pr-[10px]" onPress={ModalShowFunction}>
            <View className="bg-primaryBG p-[0px] bg-opacity-40 rounded">
              <Entypo onPress={ModalShowFunction} name="squared-cross" size={40} color="red" />
            </View>
            </TouchableOpacity>
          <ScrollView className="bg-white w-[85%] mx-auto p-[10px] h-[400px] mt-[5px] rounded-xl relative border-[4px] border-yellow-400">
            <View className=" justify-between flex-col mb-[40px]">
            <Text className="text-center text-2xl">Grocery Summary:</Text>
            <View className="bg-yellow-400 h-[3px] w-[80%] rounded-xl mx-auto mt-[10px]"></View>
            <Text className="text-xl text-center mt-[10px] font-[600]">Shopping Budget: {budget} <FontAwesome6 name="bangladeshi-taka-sign" size={20} color="black" /></Text>
            <Text className="text-2xl mt-[15px]">Total Items: {groceryList.length}</Text>
            <Text className="text-[14px] leading-4 mt-[20px]">You have to buy {groceryList.length} items with this budget {budget}৳. This is the final summary. Check the list below and if everything is ok, hit the save button. Happy Shopping <Text className="text-xl">😉😉</Text> </Text>
            {
              groceryList.map((item, index)=> <Text className="text-[18px]" key={index}>{index+1}) {item}</Text>)
            }
            <TouchableOpacity>
              <Text 
              onPress={FinalSaveFunction}
              className="bg-primaryBG border-[4px] border-yellow-400 mt-[10px] text-center p-[10px] rounded-xl text-white text-xl">Save</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </ScrollView>
      </Modal>
    </ScrollView>
  )
}

export default Form