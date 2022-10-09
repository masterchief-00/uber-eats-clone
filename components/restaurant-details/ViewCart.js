import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function ViewCart(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        position: "absolute",
        bottom: 20,
        zIndex: 999,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: "black",
            alignItems: "center",
            padding: 13,
            borderRadius: 30,
            width: 270,
            position: "relative",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>View cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
