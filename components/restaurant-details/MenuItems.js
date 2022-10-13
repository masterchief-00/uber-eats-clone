import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";



export default function MenuItems({ restaurantName,hideCheckBox,foods }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.selectedItems.items);
  const [orderedFoods,setOrderedFoods]=useState({})

  const isFoodInCart = (food, cartItems) => (
    Boolean(cartItems.find((item) => item.title === food.title))
  );

  const selectItem = (item, checkBoxValue) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkBoxValue: checkBoxValue,
      },
    });
  };

  useEffect(()=>{
    // setOrderedFoods(foods)
    console.log(foods)
  },[])


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index} style={{ marginVertical: 10 }}>
          <View style={styles.menuItemStyle}>
            {hideCheckBox? (<></>) : (<BouncyCheckbox
              fillColor="green"
              iconStyle={{
                borderColor: "lightgrey",
                marginRight: 10,
              }}
              onPress={(checkBoxValue) => selectItem(food, checkBoxValue)}
              isChecked={isFoodInCart(food, cartItems)} 
            />)}
            <FoodInfo foods={food} />
            <FoodImage foods={food} />
          </View>
          <Divider
            width={0.8}
            style={{ marginHorizontal: 20, marginVertical: 10 }}
            orientation="vertical"
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 19,
    fontWeight: "600",
  },
});

const FoodInfo = (props) => (
  <View
    style={{
      width: 200,
      justifyContent: "space-evenly",
    }}
  >
    <Text style={styles.titleText}>{props.foods.title}</Text>
    <Text style={{ fontSize: 15 }}>{props.foods.description}</Text>
    <Text style={{ fontSize: 15 }}>{props.foods.price}</Text>
  </View>
);

const FoodImage = (props) => (
  <Image
    source={{ uri: props.foods.image }}
    style={{ width: 90, height: 90, borderRadius: 8 }}
  />
);
