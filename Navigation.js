import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import OrderCompleted from "./screens/OrderCompleted";

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Restaurant Details" component={RestaurantDetail} />
        <Stack.Screen name="Order completed" component={OrderCompleted} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
