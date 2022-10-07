import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabs() {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <MenuItem icon="home" text="Home" />
      <MenuItem icon="search" text="Browse" />
      <MenuItem icon="shopping-bag" text="Grocery" />
      <MenuItem icon="receipt" text="Orders" />
      <MenuItem icon="user" text="Account" />
    </View>
  );
}

const MenuItem = (props) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{ marginBottom: 3, alignSelf: "center" }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
