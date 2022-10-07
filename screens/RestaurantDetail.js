import { View, Text } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import About from "../components/restaurant-details/About";
import MenuItems from "../components/restaurant-details/MenuItems";

export default function RestaurantDetail() {
  return (
    <View style={{flex:1}}>
      <About />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems />
    </View>
  );
}
