import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Divider } from "react-native-elements";
import About from "../components/restaurant-details/About";
import MenuItems from "../components/restaurant-details/MenuItems";
import ViewCart from "../components/restaurant-details/ViewCart";

export default function RestaurantDetail({ route, navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems restaurantName={route.params.name} />
      <ViewCart navigation={navigation} restaurantName={route.params.name} />
      <StatusBar backgroundColor="transparent" style="light" />
    </View>
  );
}
